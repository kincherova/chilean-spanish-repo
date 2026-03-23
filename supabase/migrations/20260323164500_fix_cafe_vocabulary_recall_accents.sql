
/*
  # Fix Café Vocabulary lesson: accent marks in recall and quiz

  1. Changes
    - Recall section: "Cafe grande" -> "Café grande", "Cafe chico" -> "Café chico",
      "Con azucar" -> "Con azúcar", "Sin azucar" -> "Sin azúcar"
    - Multiple choice: phrases updated to match corrected spellings
*/

UPDATE lessons
SET content = jsonb_set(
  content,
  '{pages,3,items}',
  (
    SELECT jsonb_agg(
      CASE
        WHEN item->>'spanish' = 'Cafe grande' THEN jsonb_set(item, '{spanish}', '"Café grande"')
        WHEN item->>'spanish' = 'Cafe chico' THEN jsonb_set(item, '{spanish}', '"Café chico"')
        WHEN item->>'spanish' = 'Con azucar' THEN jsonb_set(item, '{spanish}', '"Con azúcar"')
        WHEN item->>'spanish' = 'Sin azucar' THEN jsonb_set(item, '{spanish}', '"Sin azúcar"')
        ELSE item
      END
    )
    FROM jsonb_array_elements(content->'pages'->3->'items') item
  )
)
WHERE id = 'ac12b29e-d1b4-4fc0-aa62-7230b6d3af43';

UPDATE lessons
SET content = jsonb_set(
  content,
  '{pages,1,items}',
  (
    SELECT jsonb_agg(
      CASE
        WHEN item->>'phrase' = 'Cafe grande' THEN jsonb_set(item, '{phrase}', '"Café grande"')
        WHEN item->>'phrase' = 'Cafe chico' THEN jsonb_set(item, '{phrase}', '"Café chico"')
        WHEN item->>'phrase' = 'Con azucar' THEN jsonb_set(item, '{phrase}', '"Con azúcar"')
        WHEN item->>'phrase' = 'Sin azucar' THEN jsonb_set(item, '{phrase}', '"Sin azúcar"')
        ELSE item
      END
    )
    FROM jsonb_array_elements(content->'pages'->1->'items') item
  )
)
WHERE id = 'ac12b29e-d1b4-4fc0-aa62-7230b6d3af43';
