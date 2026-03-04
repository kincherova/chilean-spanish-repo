
/*
  # Link Audio Choice Quiz Items to Phrase Audio URLs

  ## Summary
  The audio_choice quiz pages need audioUrl on each item so the user can hear
  the phrase and pick the correct answer. Each item's audio corresponds to the
  phrase whose Spanish text matches the correct option in that item.

  This migration matches each audio_choice item's correct answer text to the
  intro-page phrases (which now have audioUrl), and copies that URL onto the item.

  ## Affected Lessons
  - 2fb0c3a3: Immigration & Passport Control
  - 9b1071aa: Customs
  - b571fe41: Polite exits / endings
  - 388e7589: Finding the Exit, Taxi & Uber Zone
  - 6b9fedb4: Asking for Help at the Airport
  - 9b6ef049: Asking for clarification
*/

DO $$
DECLARE
  v_lesson_id uuid;
  v_content jsonb;
  v_pages jsonb;
  v_page jsonb;
  v_items jsonb;
  v_item jsonb;
  v_new_items jsonb;
  v_new_pages jsonb;
  v_phrases jsonb;
  v_phrase jsonb;
  v_correct_answer int;
  v_correct_text text;
  v_audio_url text;
  v_page_idx int;
  v_item_idx int;
  v_phrase_idx int;
  v_found_audio bool;
BEGIN

  FOR v_lesson_id IN
    SELECT unnest(ARRAY[
      '2fb0c3a3-a14c-43fc-8d9d-b1cc0f5de872'::uuid,
      '9b1071aa-b319-4246-a5f2-fef355de8863'::uuid,
      'b571fe41-04ba-4d44-b316-eb2772458160'::uuid,
      '388e7589-7f4d-402d-907c-543988cac82a'::uuid,
      '6b9fedb4-caf9-4c1c-b0fa-ff7f182d3f11'::uuid,
      '9b6ef049-e5d9-4a82-a191-760989f48a03'::uuid
    ])
  LOOP
    SELECT content INTO v_content FROM lessons WHERE id = v_lesson_id;
    IF v_content IS NULL THEN CONTINUE; END IF;

    v_pages := v_content->'pages';

    -- Collect intro-page phrases (first page with phrases)
    v_phrases := NULL;
    FOR v_page_idx IN 0..jsonb_array_length(v_pages)-1 LOOP
      v_page := v_pages->v_page_idx;
      IF v_page ? 'phrases' AND jsonb_array_length(v_page->'phrases') > 0 THEN
        v_phrases := v_page->'phrases';
        EXIT;
      END IF;
    END LOOP;

    IF v_phrases IS NULL THEN CONTINUE; END IF;

    -- Now update audio_choice pages
    v_new_pages := '[]'::jsonb;

    FOR v_page_idx IN 0..jsonb_array_length(v_pages)-1 LOOP
      v_page := v_pages->v_page_idx;

      IF v_page->>'type' = 'audio_choice' AND v_page ? 'items' THEN
        v_items := v_page->'items';
        v_new_items := '[]'::jsonb;

        FOR v_item_idx IN 0..jsonb_array_length(v_items)-1 LOOP
          v_item := v_items->v_item_idx;
          v_correct_answer := (v_item->>'correctAnswer')::int;
          v_correct_text := v_item->'options'->>v_correct_answer;

          -- Find matching phrase by spanish text
          v_audio_url := NULL;
          v_found_audio := false;

          FOR v_phrase_idx IN 0..jsonb_array_length(v_phrases)-1 LOOP
            v_phrase := v_phrases->v_phrase_idx;
            IF v_phrase->>'spanish' = v_correct_text AND v_phrase ? 'audioUrl' THEN
              v_audio_url := v_phrase->>'audioUrl';
              v_found_audio := true;
              EXIT;
            END IF;
          END LOOP;

          IF v_found_audio THEN
            v_item := v_item || jsonb_build_object('audioUrl', v_audio_url);
          END IF;

          v_new_items := v_new_items || jsonb_build_array(v_item);
        END LOOP;

        v_page := jsonb_set(v_page, '{items}', v_new_items);
      END IF;

      v_new_pages := v_new_pages || jsonb_build_array(v_page);
    END LOOP;

    UPDATE lessons
    SET content = jsonb_set(v_content, '{pages}', v_new_pages)
    WHERE id = v_lesson_id;

  END LOOP;

END $$;
