/*
  # Fix all audio_choice items in Immigration & Passport Control lesson

  ## Issues found and fixed
  - Item 2 (index 2): audio is "Tres semanas." (_5_), correctAnswer was 0 ("Diez días.") — fixed to 2
  - Item 3 (index 3): audio is "Con amigos." (_14_), correctAnswer was 3 ("De Estados Unidos.") — fixed to 0
  - Item 5 (index 5): duplicate of item 1 (both use "Turismo." _8_ audio) — changed to "Diez días." (_4_) with correct answer 0
  - Item 8 (index 8): duplicate of item 3 (both use "Con amigos." _14_ audio) — changed to "Visita familiar." (_10_) with correct answer 2
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
                  WHEN (item_idx - 1) = 2 THEN
                    jsonb_set(item, '{correctAnswer}', '2')
                  WHEN (item_idx - 1) = 3 THEN
                    jsonb_set(item, '{correctAnswer}', '0')
                  WHEN (item_idx - 1) = 5 THEN
                    item || jsonb_build_object(
                      'audioUrl', 'https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/2fb0c3a3-a14c-43fc-8d9d-b1cc0f5de872_4_1771886702650.mp3',
                      'options', '["Diez días.", "Tres semanas.", "Un mes.", "De Argentina."]'::jsonb,
                      'correctAnswer', 0
                    )
                  WHEN (item_idx - 1) = 8 THEN
                    item || jsonb_build_object(
                      'audioUrl', 'https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/2fb0c3a3-a14c-43fc-8d9d-b1cc0f5de872_10_1771886746033.mp3',
                      'options', '["Turismo.", "Trabajo.", "Visita familiar.", "Con amigos."]'::jsonb,
                      'correctAnswer', 2
                    )
                  ELSE item
                END
              )
              FROM jsonb_array_elements(page->'items') WITH ORDINALITY AS t(item, item_idx)
            )
          )
        ELSE page
      END
    )
    FROM jsonb_array_elements(content->'pages') AS page
  )
)
WHERE id = '2fb0c3a3-a14c-43fc-8d9d-b1cc0f5de872';
