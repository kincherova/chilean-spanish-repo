
/*
  # Remove "bacán" from Module 6 Unit 1 recall exercise

  Removes the 11th recall item "Cool / Awesome (also a person) — Bacán" from the
  People, Relationships & Everyday Life lesson, as the word does not belong to this unit.
*/

UPDATE lessons
SET content = jsonb_set(
  content,
  '{pages}',
  (
    SELECT jsonb_agg(
      CASE
        WHEN page->>'type' = 'recall'
        THEN jsonb_set(
          page,
          '{items}',
          (
            SELECT jsonb_agg(item)
            FROM jsonb_array_elements(page->'items') AS item
            WHERE item->>'spanish' != 'Bacán'
          )
        )
        ELSE page
      END
    )
    FROM jsonb_array_elements(content->'pages') AS page
  )
)
WHERE id = 'ddff48a8-1933-410e-be7e-67960074188f';
