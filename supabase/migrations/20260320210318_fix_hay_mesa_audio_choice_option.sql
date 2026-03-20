/*
  # Fix "¿Hay mesa?" → "Hola, ¿hay mesa?" in audio_choice options

  Updates the audio_choice item in the "Arriving & Getting a Table" lesson
  where the answer option was missing the greeting "Hola,".
*/

UPDATE lessons
SET content = jsonb_set(
  content,
  '{pages}',
  (
    SELECT jsonb_agg(
      CASE
        WHEN page->>'type' = 'audio_choice' THEN
          jsonb_set(
            page,
            '{items}',
            (
              SELECT jsonb_agg(
                CASE
                  WHEN item->>'audioUrl' LIKE '%99a90297%_0_%' THEN
                    jsonb_set(
                      item,
                      '{options}',
                      (
                        SELECT jsonb_agg(
                          CASE
                            WHEN opt = '"¿Hay mesa?"' THEN '"Hola, ¿hay mesa?"'::jsonb
                            ELSE opt
                          END
                        )
                        FROM jsonb_array_elements(item->'options') AS opt
                      )
                    )
                  ELSE item
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
WHERE id = '99a90297-c089-4573-9aba-aadc2b6db587';
