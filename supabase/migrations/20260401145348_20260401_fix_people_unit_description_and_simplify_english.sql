/*
  # Fix People unit: simplify flashcard/phrase English text and add tip to unit description

  Changes:
  1. Unit description updated to include a grammar tip about -o/-a endings
  2. Flashcard English text simplified (remove male/female bracketed notes)
  3. Lesson phrase list English text simplified to match
*/

-- 1. Update unit description with tip
UPDATE units
SET description = 'The words Chileans use to talk about people around them — friends, partners, strangers, and everyone in between.

Tip: In Spanish, most words ending in -o refer to a male (pololo — boyfriend, niño — boy), while words ending in -a refer to a female (polola — girlfriend, niña — girl). So cabro means a young guy, cabra a young woman — and the same rule applies to weón/weona and many other words in this unit.'
WHERE id = '6c14a552-8414-43b6-a2a0-e5d61590938e';

-- 2. Simplify flashcard English text
UPDATE flashcards
SET english_text = 'Kid / Young person'
WHERE id = 'bb656156-425b-47fb-beda-47beab2915a6';

UPDATE flashcards
SET english_text = 'Dude / mate (very common — can be affectionate or rude depending on tone)'
WHERE id = '1c5f3535-aff1-48ff-8a48-16be951379ac';

-- 3. Simplify phrase list English text in lesson content
UPDATE lessons
SET content = jsonb_set(
  content,
  '{pages}',
  (
    SELECT jsonb_agg(
      CASE
        WHEN page->>'type' = 'phrase_list' THEN
          jsonb_set(
            page,
            '{phrases}',
            (
              SELECT jsonb_agg(
                CASE
                  WHEN phrase->>'spanish' = 'Cabro / Cabra' THEN
                    jsonb_set(phrase, '{english}', '"Kid / Young person"')
                  WHEN phrase->>'spanish' = 'Weón / Weona' THEN
                    jsonb_set(phrase, '{english}', '"Dude / mate (very common — can be affectionate or rude depending on tone)"')
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
WHERE id = 'ddff48a8-1933-410e-be7e-67960074188f';
