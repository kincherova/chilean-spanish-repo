
/*
  # Fix Money vocabulary lesson: accent marks in recall and quiz

  1. Changes
    - Recall section: "Debito" -> "Débito", "Credito" -> "Crédito"
    - Multiple choice: phrases updated to match corrected spellings
*/

UPDATE lessons
SET content = jsonb_set(
  content,
  '{pages,3,items}',
  (
    SELECT jsonb_agg(
      CASE
        WHEN item->>'spanish' = 'Debito' THEN jsonb_set(item, '{spanish}', '"Débito"')
        WHEN item->>'spanish' = 'Credito' THEN jsonb_set(item, '{spanish}', '"Crédito"')
        ELSE item
      END
    )
    FROM jsonb_array_elements(content->'pages'->3->'items') item
  )
)
WHERE id = 'f3bc7a2a-3aee-48e3-b689-4a285a9448f5';
