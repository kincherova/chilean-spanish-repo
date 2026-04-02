/*
  # Fix Module 6 Multiple Choice - Remove Slash Answers

  ## Summary
  In the "Do you recognize it?" exercise, correct answers that contain two phrases
  separated by "/" (e.g. "What a drag / That's a shame") are too obvious since they
  are the only options with two phrases. This migration trims each such correct answer
  down to a single best-fitting phrase.

  ## Changes by lesson

  ### Unit 1 - People, Relationships & Everyday Life (ddff48a8)
  No slash corrections needed in correct answers.

  ### Unit 2 - Reactions, Feelings & Everyday Expressions (a38caf8b)
  - "That's cool / awesome" → "That's cool"
  - "It's boring / dull" → "It's boring"
  - "Never mind / It's fine" → "Never mind"
  - "Something intense / shocking" → "Something intense"
  - "What a drag / That's a shame" → "What a drag"
  - "What the heck / what's going on" → "What the heck"
  - "A problem / hassle" → "A hassle"
  - "Low-key / discreet" → "Low-key"

  ### Unit 3 - Social Life & Parties (97c9b671)
  - "A party / night out" → "A party"
  - "A lot / loads" → "A lot"

  ### Unit 4 - Swearing & Rude Language (c10a1900)
  - "It all fell apart / went to sh*t" → "It all went to sh*t"
  - "You're screwed / you messed up" → "You're screwed"
  - "What the f*** / holy sh*t (strong exclamation)" → "What the f*** (strong exclamation)"
*/

-- Unit 2: Reactions, Feelings & Everyday Expressions
UPDATE lessons
SET content = jsonb_set(
  content,
  '{pages}',
  (
    SELECT jsonb_agg(
      CASE
        WHEN page->>'type' = 'multiple_choice' THEN
          jsonb_set(
            page,
            '{items}',
            (
              SELECT jsonb_agg(
                jsonb_set(
                  item,
                  '{options}',
                  (
                    SELECT jsonb_agg(
                      CASE
                        WHEN opt::text = '"That''s cool / awesome"' THEN '"That''s cool"'::jsonb
                        WHEN opt::text = '"It''s boring / dull"' THEN '"It''s boring"'::jsonb
                        WHEN opt::text = '"Never mind / It''s fine"' THEN '"Never mind"'::jsonb
                        WHEN opt::text = '"Something intense / shocking"' THEN '"Something intense"'::jsonb
                        WHEN opt::text = '"What a drag / That''s a shame"' THEN '"What a drag"'::jsonb
                        WHEN opt::text = '"What the heck / what''s going on"' THEN '"What the heck"'::jsonb
                        WHEN opt::text = '"A problem / hassle"' THEN '"A hassle"'::jsonb
                        WHEN opt::text = '"Low-key / discreet"' THEN '"Low-key"'::jsonb
                        ELSE opt
                      END
                    )
                    FROM jsonb_array_elements(item->'options') AS opt
                  )
                )
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
WHERE id = 'a38caf8b-6fb2-4d92-82ef-eefcfc0f6afe';

-- Unit 3: Social Life & Parties
UPDATE lessons
SET content = jsonb_set(
  content,
  '{pages}',
  (
    SELECT jsonb_agg(
      CASE
        WHEN page->>'type' = 'multiple_choice' THEN
          jsonb_set(
            page,
            '{items}',
            (
              SELECT jsonb_agg(
                jsonb_set(
                  item,
                  '{options}',
                  (
                    SELECT jsonb_agg(
                      CASE
                        WHEN opt::text = '"A party / night out"' THEN '"A party"'::jsonb
                        WHEN opt::text = '"A lot / loads"' THEN '"A lot"'::jsonb
                        ELSE opt
                      END
                    )
                    FROM jsonb_array_elements(item->'options') AS opt
                  )
                )
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
WHERE id = '97c9b671-24ec-4f4c-a7c0-8ea0162d7cba';

-- Unit 4: Swearing & Rude Language
UPDATE lessons
SET content = jsonb_set(
  content,
  '{pages}',
  (
    SELECT jsonb_agg(
      CASE
        WHEN page->>'type' = 'multiple_choice' THEN
          jsonb_set(
            page,
            '{items}',
            (
              SELECT jsonb_agg(
                jsonb_set(
                  item,
                  '{options}',
                  (
                    SELECT jsonb_agg(
                      CASE
                        WHEN opt::text = '"It all fell apart / went to sh*t"' THEN '"It all went to sh*t"'::jsonb
                        WHEN opt::text = '"You''re screwed / you messed up"' THEN '"You''re screwed"'::jsonb
                        WHEN opt::text = '"What the f*** / holy sh*t (strong exclamation)"' THEN '"What the f*** (strong exclamation)"'::jsonb
                        ELSE opt
                      END
                    )
                    FROM jsonb_array_elements(item->'options') AS opt
                  )
                )
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
WHERE id = 'c10a1900-c4d0-4eb0-8934-c93a353d8607';
