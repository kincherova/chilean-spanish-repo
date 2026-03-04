
/*
  # Link Uploaded Audio Files to Lesson Content

  ## Summary
  Audio files were uploaded to the 'audio-lessons' storage bucket via the AdminAudio page,
  but the corresponding audioUrl fields in the lessons' content JSON were not persisted.

  This migration reads the uploaded audio filenames from storage, derives the public URLs,
  and updates each affected lesson's content JSON to include the correct audioUrl on each phrase.

  ## Affected Lessons
  - 2fb0c3a3: Immigration & Passport Control (phrases 0-14)
  - 9b1071aa: Customs (phrases 0-8)
  - b571fe41: Polite exits / endings (phrases 0-6)
  - 388e7589: Finding the Exit, Taxi & Uber Zone (phrases 0-8)
  - 6b9fedb4: Asking for Help at the Airport (phrases 0-1, 3-5)
  - 9b6ef049: Asking for clarification (phrases 0-7)
  - f3d352c1: Understanding informal comments (phrases 4-11)
*/

DO $$
DECLARE
  base_url text := 'https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/';
  v_lesson_id uuid;
  v_content jsonb;
  v_pages jsonb;
  v_page jsonb;
  v_phrases jsonb;
  v_phrase jsonb;
  v_new_phrases jsonb;
  v_new_pages jsonb;
  v_audio_name text;
  v_audio_url text;
  v_page_idx int;
  v_phrase_idx int;
  v_found_page bool;
BEGIN

  FOR v_lesson_id IN
    SELECT unnest(ARRAY[
      '2fb0c3a3-a14c-43fc-8d9d-b1cc0f5de872'::uuid,
      '9b1071aa-b319-4246-a5f2-fef355de8863'::uuid,
      'b571fe41-04ba-4d44-b316-eb2772458160'::uuid,
      '388e7589-7f4d-402d-907c-543988cac82a'::uuid,
      '6b9fedb4-caf9-4c1c-b0fa-ff7f182d3f11'::uuid,
      '9b6ef049-e5d9-4a82-a191-760989f48a03'::uuid,
      'f3d352c1-aa17-46d0-8ae9-d75548e4a8f4'::uuid
    ])
  LOOP
    SELECT content INTO v_content FROM lessons WHERE id = v_lesson_id;
    IF v_content IS NULL THEN CONTINUE; END IF;

    v_pages := v_content->'pages';
    v_new_pages := '[]'::jsonb;
    v_found_page := false;

    FOR v_page_idx IN 0..jsonb_array_length(v_pages)-1 LOOP
      v_page := v_pages->v_page_idx;

      IF NOT v_found_page AND v_page ? 'phrases' AND jsonb_array_length(v_page->'phrases') > 0 THEN
        v_found_page := true;
        v_phrases := v_page->'phrases';
        v_new_phrases := '[]'::jsonb;

        FOR v_phrase_idx IN 0..jsonb_array_length(v_phrases)-1 LOOP
          v_phrase := v_phrases->v_phrase_idx;

          SELECT name INTO v_audio_name
          FROM storage.objects
          WHERE bucket_id = 'audio-lessons'
            AND name LIKE 'phrases/' || v_lesson_id::text || '_' || v_phrase_idx || '_%'
          ORDER BY created_at DESC
          LIMIT 1;

          IF v_audio_name IS NOT NULL THEN
            v_audio_url := base_url || v_audio_name;
            v_phrase := v_phrase || jsonb_build_object('audioUrl', v_audio_url);
          END IF;

          v_new_phrases := v_new_phrases || jsonb_build_array(v_phrase);
        END LOOP;

        v_page := jsonb_set(v_page, '{phrases}', v_new_phrases);
      END IF;

      v_new_pages := v_new_pages || jsonb_build_array(v_page);
    END LOOP;

    UPDATE lessons
    SET content = jsonb_set(v_content, '{pages}', v_new_pages)
    WHERE id = v_lesson_id;

  END LOOP;

END $$;
