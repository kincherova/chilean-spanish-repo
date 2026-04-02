/*
  # Fix Module 6 Unit 1 Multiple Choice - Remove Slash Answers

  ## Changes
  - Unit 1: People, Relationships & Everyday Life (ddff48a8)
    - "Dude / mate (casual)" → "Dude (casual)"
    - "That woman / girl" → "That woman"
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
                jsonb_set(
                  item,
                  '{options}',
                  (
                    SELECT jsonb_agg(
                      CASE
                        WHEN opt::text = '"Dude / mate (casual)"' THEN '"Dude (casual)"'::jsonb
                        WHEN opt::text = '"That woman / girl"' THEN '"That woman"'::jsonb
                        ELSE opt
                      END
                    )
                    FROM jsonb_array_elements(item->'options') AS opt
                  )
                )
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
