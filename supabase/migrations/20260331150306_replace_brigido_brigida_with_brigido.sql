/*
  # Replace "Brígido / Brígida" with "Brígido"

  Updates the spanish_text in the flashcards table and the phrase_list content
  in the lessons table to use "Brígido" instead of "Brígido / Brígida".
*/

UPDATE flashcards
SET spanish_text = 'Brígido'
WHERE spanish_text = 'Brígido / Brígida';

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
              SELECT jsonb_agg(
                CASE
                  WHEN phrase->>'spanish' = 'Brígido / Brígida' THEN
                    jsonb_set(phrase, '{spanish}', '"Brígido"')
                  ELSE phrase
                END
              )
              FROM jsonb_array_elements(page->'phrases') AS phrase
            )
          )
        ELSE page
      END
    )
    FROM jsonb_array_elements(content->'pages') AS page
  )
)
WHERE id = 'a38caf8b-6fb2-4d92-82ef-eefcfc0f6afe';
