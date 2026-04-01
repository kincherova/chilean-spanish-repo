/*
  # Module 6 - People Unit Fixes

  ## Changes

  ### 1. Flashcard English text updates
  - "Cabro / Cabra": add male/female clarification → "Kid / Young person (male: cabro, female: cabra)"
  - "Weon / Weona": fix accent and add male/female clarification → spanish_text updated to "Weón / Weona", english_text updated

  ### 2. Lesson content updates (all 4 Module 6 lessons)
  - Replace "Weon" with "Weón" in phrase lists and multiple choice phrase fields
  - Remove "phrase" field from all "Do you recognize it?" multiple choice items
    so only the question is shown as the heading (no redundant word heading)

  ### 3. Affected lessons
  - ddff48a8 People, Relationships & Everyday Life
  - a38caf8b Reactions, Feelings & Everyday Expressions
  - 97c9b671 Social Life & Parties
  - c10a1900 Swearing & Rude Language
*/

-- 1. Update flashcard for Cabro / Cabra
UPDATE flashcards
SET english_text = 'Kid / Young person (male: cabro, female: cabra)'
WHERE id = 'bb656156-425b-47fb-beda-47beab2915a6';

-- 2. Update flashcard for Weon / Weona: fix accent on spanish text + update english
UPDATE flashcards
SET
  spanish_text = 'Weón / Weona',
  english_text = 'Dude / mate (male: weón, female: weona — very common, can be affectionate or rude depending on tone)'
WHERE id = '1c5f3535-aff1-48ff-8a48-16be951379ac';

-- 3. People, Relationships & Everyday Life lesson
-- Fix "Weon / Weona" → "Weón / Weona" in phrase_list
-- Fix "Weon" → "Weón" in multiple_choice phrase
-- Remove phrase from all Do you recognize it? multiple_choice items
UPDATE lessons
SET content = jsonb_set(
  content,
  '{pages}',
  (
    SELECT jsonb_agg(
      CASE
        -- phrase_list page: fix Weon / Weona
        WHEN page->>'type' = 'phrase_list' THEN
          jsonb_set(
            page,
            '{phrases}',
            (
              SELECT jsonb_agg(
                CASE
                  WHEN phrase->>'spanish' = 'Weon / Weona' THEN
                    jsonb_set(phrase, '{spanish}', '"Weón / Weona"')
                  ELSE phrase
                END
              )
              FROM jsonb_array_elements(page->'phrases') AS phrase
            )
          )
        -- multiple_choice page: fix Weon phrase, remove phrase from all items
        WHEN page->>'type' = 'multiple_choice' THEN
          jsonb_set(
            page,
            '{items}',
            (
              SELECT jsonb_agg(
                CASE
                  WHEN item->>'phrase' = 'Weon' THEN
                    (item - 'phrase') || '{"phrase": "Weón"}'::jsonb
                  ELSE
                    item - 'phrase'
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
WHERE id = 'ddff48a8-1933-410e-be7e-67960074188f';

-- 4. Reactions, Feelings & Everyday Expressions lesson
-- Remove phrase from all Do you recognize it? multiple_choice items
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
              SELECT jsonb_agg(item - 'phrase')
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

-- 5. Social Life & Parties lesson
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
              SELECT jsonb_agg(item - 'phrase')
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

-- 6. Swearing & Rude Language lesson
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
              SELECT jsonb_agg(item - 'phrase')
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
