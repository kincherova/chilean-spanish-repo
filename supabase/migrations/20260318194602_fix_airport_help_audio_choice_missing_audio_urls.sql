
/*
  # Fix missing audioUrl in "Asking for Help at the Airport" audio_choice items

  The "Hear and React" exercise in the "Asking for Help at the Airport" unit had 3 questions
  with no audioUrl, making the audio button non-functional. This migration adds the correct
  audio URLs (already uploaded) to those items.

  Items fixed:
  - "Perdí mi equipaje" (item index 2)
  - "¿Habla inglés?" (item index 3)
  - "Necesito ayuda" (item index 6)
*/

UPDATE lessons
SET content = jsonb_set(
  content,
  '{pages}',
  (
    SELECT jsonb_agg(
      CASE
        WHEN page->>'type' = 'audio_choice'
        THEN jsonb_set(
          page,
          '{items}',
          (
            SELECT jsonb_agg(
              CASE
                WHEN (item->>'correctAnswer')::int = 3
                  AND item->>'audioUrl' IS NULL
                  AND item->'options'->>3 = 'Perdí mi equipaje'
                THEN item || jsonb_build_object('audioUrl', 'https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/6b9fedb4-caf9-4c1c-b0fa-ff7f182d3f11_2_1772547556559.mp3')

                WHEN (item->>'correctAnswer')::int = 1
                  AND item->>'audioUrl' IS NULL
                  AND item->'options'->>1 = '¿Habla inglés?'
                THEN item || jsonb_build_object('audioUrl', 'https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/6b9fedb4-caf9-4c1c-b0fa-ff7f182d3f11_6_1772547586123.mp3')

                WHEN (item->>'correctAnswer')::int = 1
                  AND item->>'audioUrl' IS NULL
                  AND item->'options'->>1 = 'Necesito ayuda'
                THEN item || jsonb_build_object('audioUrl', 'https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/6b9fedb4-caf9-4c1c-b0fa-ff7f182d3f11_7_1772547592232.mp3')

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
WHERE id = '6b9fedb4-caf9-4c1c-b0fa-ff7f182d3f11';
