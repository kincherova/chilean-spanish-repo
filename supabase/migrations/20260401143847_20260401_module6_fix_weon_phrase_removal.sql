/*
  # Module 6 - Fix Weón phrase field not removed + update question text

  ## Changes
  - Remove remaining "phrase" field from the Weón multiple choice item
    in the People, Relationships & Everyday Life lesson
  - Update the question text that still referenced lowercase "weon"
    to use the accented "weón"
*/

UPDATE lessons
SET content = jsonb_set(
  content,
  '{pages}',
  (
    SELECT jsonb_agg(
      CASE
        WHEN page->>'type' = 'multiple_choice' THEN
          jsonb_set(
            page,
            '{items}',
            (
              SELECT jsonb_agg(
                CASE
                  -- fix question text that still says "weon" and remove phrase
                  WHEN (item->>'question') LIKE '%"weon"%' OR (item->>'question') LIKE '% weon %' OR (item->>'question') LIKE '%call you "weon"%' THEN
                    (item - 'phrase') || jsonb_build_object(
                      'question',
                      replace(item->>'question', '"weon"', '"weón"')
                    )
                  ELSE
                    item - 'phrase'
                END
              )
              FROM jsonb_array_elements(page->'items') AS item
            )
          )
        ELSE page
      END
    )
    FROM jsonb_array_elements(content->'pages') AS page
  )
)
WHERE id = 'ddff48a8-1933-410e-be7e-67960074188f';
