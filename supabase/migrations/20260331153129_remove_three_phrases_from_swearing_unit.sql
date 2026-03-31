/*
  # Remove 3 phrases from Swearing & Rude Language unit

  Removes the following from phrase_list, multiple_choice pages, and flashcards:
  - "Huevón / Huevona"
  - "Te hiciste el weon"
  - "Se rajó"
*/

UPDATE lessons
SET content = jsonb_set(
  content,
  '{pages}',
  (
    SELECT jsonb_agg(
      CASE
        WHEN page->>'type' = 'phrase_list' THEN
          jsonb_set(
            page,
            '{phrases}',
            (
              SELECT jsonb_agg(phrase)
              FROM jsonb_array_elements(page->'phrases') AS phrase
              WHERE phrase->>'spanish' NOT IN ('Huevón / Huevona', 'Te hiciste el weon', 'Se rajó')
            )
          )
        WHEN page->>'type' = 'multiple_choice' THEN
          jsonb_set(
            page,
            '{items}',
            (
              SELECT jsonb_agg(item)
              FROM jsonb_array_elements(page->'items') AS item
              WHERE item->>'phrase' NOT IN ('Huevón / Huevona', 'Huevón', 'Te hiciste el weon', 'Se rajó')
            )
          )
        ELSE page
      END
    )
    FROM jsonb_array_elements(content->'pages') AS page
  )
)
WHERE id = 'c10a1900-c4d0-4eb0-8934-c93a353d8607';

DELETE FROM flashcards
WHERE id IN (
  'f90cc556-c2ec-41ab-86e6-1dede5155199',
  '0239dbed-be4f-43b1-8f9e-5a670402bd33',
  '59fbdfe8-01f3-443c-9db1-12ede850e1ea'
);
