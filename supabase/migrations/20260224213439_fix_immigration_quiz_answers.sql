/*
  # Fix Immigration lesson quiz correctAnswer mismatches and duplicate audio items

  ## Changes
  - Multiple choice: All correctAnswers verified correct (no changes needed)
  - Audio choice item 4: correctAnswer was 3 ("De Estados Unidos.") but audio is "Con amigos." — fixed to 0
  - Audio choice item 6: was a duplicate of item 2 (both use Turismo audio) — changed to use "Trabajo." audio (_9_)
  - Audio choice item 9: was a duplicate of item 4 (both use Con amigos. audio _14_) — changed to use "De Argentina." audio (_2_) with correct answer 0
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
                  -- Item 4 (index 3): audio is "Con amigos." (_14_), correctAnswer was 3 ("De Estados Unidos."), fix to 0
                  WHEN item_idx = 3 THEN
                    jsonb_set(item, '{correctAnswer}', '0')
                  -- Item 6 (index 5): duplicate of item 2, change to "Trabajo." audio (_9_) with correctAnswer 2 ("Trabajo.")
                  WHEN item_idx = 5 THEN
                    item
                    || jsonb_build_object(
                      'audioUrl', 'https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/2fb0c3a3-a14c-43fc-8d9d-b1cc0f5de872_9_1771886732295.mp3',
                      'options', '["Turismo.", "Con amigos.", "Trabajo.", "En un hotel."]'::jsonb,
                      'correctAnswer', 2
                    )
                  -- Item 9 (index 8): duplicate audio _14_, change to "De Argentina." audio (_2_) with correctAnswer 0
                  WHEN item_idx = 8 THEN
                    item
                    || jsonb_build_object(
                      'audioUrl', 'https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/2fb0c3a3-a14c-43fc-8d9d-b1cc0f5de872_2_1771886689080.mp3',
                      'options', '["De Argentina.", "De Estados Unidos.", "Visita familiar.", "Trabajo."]'::jsonb,
                      'correctAnswer', 0
                    )
                  ELSE item
                END
              )
              FROM jsonb_array_elements(page->'items') WITH ORDINALITY AS t(item, item_idx)
              -- ordinality is 1-based, subtract 1 for 0-based index
              WHERE TRUE
            )
          )
        ELSE page
      END
    )
    FROM jsonb_array_elements(content->'pages') AS page
  )
)
WHERE id = '2fb0c3a3-a14c-43fc-8d9d-b1cc0f5de872';
