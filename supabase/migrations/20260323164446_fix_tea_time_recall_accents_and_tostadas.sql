
/*
  # Fix Tea Time lesson: accent marks and translation

  1. Changes
    - In the recall section: "Jamon" -> "Jamón", "Sandwich" -> "Sándwich", "Toast" -> "Toast (plural)"
    - In the multiple_choice section: phrase "Jamon" -> "Jamón", phrase "Tostadas" answer options updated
    - Also fix "Toast" answer option in multiple_choice items for Tostadas
*/

UPDATE lessons
SET content = jsonb_set(
  jsonb_set(
    jsonb_set(
      content,
      '{pages,3,items}',
      (
        SELECT jsonb_agg(
          CASE
            WHEN item->>'spanish' = 'Jamon' THEN jsonb_set(item, '{spanish}', '"Jamón"')
            WHEN item->>'spanish' = 'Sandwich' THEN jsonb_set(item, '{spanish}', '"Sándwich"')
            WHEN item->>'english' = 'Toast' THEN jsonb_set(item, '{english}', '"Toast (plural)"')
            ELSE item
          END
        )
        FROM jsonb_array_elements(content->'pages'->3->'items') item
      )
    ),
    '{pages,1,items}',
    (
      SELECT jsonb_agg(
        CASE
          WHEN item->>'phrase' = 'Jamon' THEN jsonb_set(item, '{phrase}', '"Jamón"')
          WHEN item->>'phrase' = 'Tostadas' THEN
            jsonb_set(
              item,
              '{options}',
              '["Sandwich", "Toast (plural)", "Cake", "Empanada"]'
            )
          ELSE item
        END
      )
      FROM jsonb_array_elements(content->'pages'->1->'items') item
    )
  ),
  '{pages,0,phrases}',
  (
    SELECT jsonb_agg(
      CASE
        WHEN phrase->>'english' = 'Toast' THEN jsonb_set(phrase, '{english}', '"Toast (plural)"')
        ELSE phrase
      END
    )
    FROM jsonb_array_elements(content->'pages'->0->'phrases') phrase
  )
)
WHERE id = '1b73ff99-ad18-45c0-839c-459663bc8fa9';
