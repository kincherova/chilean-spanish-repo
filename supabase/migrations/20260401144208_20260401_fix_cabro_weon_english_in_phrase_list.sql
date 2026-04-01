/*
  # Fix English text for Cabro/Cabra and Weón/Weona in lesson phrase list

  The phrase_list page in the People lesson stores its own copy of the English
  translation. Update it to include male/female clarification, matching the
  flashcard records.

  Changes:
  - "Cabro / Cabra": "Young person (informal)" → "Kid / Young person (male: cabro, female: cabra)"
  - "Weón / Weona": old text → "Dude / mate (male: weón, female: weona — very common, can be affectionate or rude depending on tone)"
*/

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
                    jsonb_set(phrase, '{english}', '"Kid / Young person (male: cabro, female: cabra)"')
                  WHEN phrase->>'spanish' = 'Weón / Weona' THEN
                    jsonb_set(phrase, '{english}', '"Dude / mate (male: weón, female: weona — very common, can be affectionate or rude depending on tone)"')
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
