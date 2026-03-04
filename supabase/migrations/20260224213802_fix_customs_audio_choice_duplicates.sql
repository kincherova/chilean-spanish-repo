/*
  # Fix duplicate audio clips in Customs lesson "Hear and React" page

  ## Issues
  - Item 8 (index 7): duplicate of item 4 (index 3) — both used "No tengo nada que declarar" (_1_)
    Fixed: changed to "No, no traigo" (_5_) with matching correctAnswer
  - Item 9 (index 8): duplicate of item 6 (index 5) — both used "¿Es para uso personal?" (_6_)
    Fixed: changed to "Por supuesto" (_3_) with matching correctAnswer

  Now all 9 audio_choice items use unique audio clips covering all phrases in the lesson.
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
                  -- Index 7: was duplicate of index 3 (_1_ audio). Replace with "No, no traigo" (_5_)
                  WHEN (item_idx - 1) = 7 THEN
                    item || jsonb_build_object(
                      'audioUrl', 'https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/9b1071aa-b319-4246-a5f2-fef355de8863_5_1771886940511.mp3',
                      'options', '["¿Puede abrir su maleta, por favor?", "No tengo nada que declarar", "No, no traigo", "Sí, es para uso personal"]'::jsonb,
                      'correctAnswer', 2
                    )
                  -- Index 8: was duplicate of index 5 (_6_ audio). Replace with "Por supuesto" (_3_)
                  WHEN (item_idx - 1) = 8 THEN
                    item || jsonb_build_object(
                      'audioUrl', 'https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/9b1071aa-b319-4246-a5f2-fef355de8863_3_1771886926651.mp3',
                      'options', '["No, no traigo", "Por supuesto", "Puede pasar", "¿Tiene algo que declarar?"]'::jsonb,
                      'correctAnswer', 1
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
WHERE id = '9b1071aa-b319-4246-a5f2-fef355de8863';
