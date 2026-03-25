/*
  # Update Tranquilo/Tranquila English translation

  Updates the English translation for "Tranquilo / Tranquila" to clarify that
  the male/female forms address the gender of the person being spoken to.

  1. Updated flashcard english_text
  2. Updated lesson intro phrase english field
*/

UPDATE flashcards
SET english_text = '(Talking to male/female) It''s okay / No worries'
WHERE spanish_text = 'Tranquilo / Tranquila'
  AND english_text = 'It''s okay / No worries';

UPDATE lessons
SET content = jsonb_set(
  content,
  '{pages}',
  (
    SELECT jsonb_agg(
      CASE
        WHEN page->>'type' = 'intro' THEN
          jsonb_set(
            page,
            '{phrases}',
            (
              SELECT jsonb_agg(
                CASE
                  WHEN phrase->>'spanish' = 'Tranquilo / Tranquila'
                    AND phrase->>'english' = 'It''s okay / No worries'
                  THEN jsonb_set(phrase, '{english}', '"(Talking to male/female) It''s okay / No worries"')
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
WHERE id = 'f3d352c1-aa17-46d0-8ae9-d75548e4a8f4';
