/*
  # Remove "De una" from Reactions, Feelings & Everyday Expressions unit

  - Removes "De una" phrase from the phrase_list page
  - Removes "De una" question from the multiple_choice page
  - Deletes the "De una" flashcard
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
              SELECT jsonb_agg(phrase)
              FROM jsonb_array_elements(page->'phrases') AS phrase
              WHERE phrase->>'spanish' != 'De una'
            )
          )
        WHEN page->>'type' = 'multiple_choice' THEN
          jsonb_set(
            page,
            '{items}',
            (
              SELECT jsonb_agg(item)
              FROM jsonb_array_elements(page->'items') AS item
              WHERE item->>'phrase' != 'De una'
            )
          )
        ELSE page
      END
    )
    FROM jsonb_array_elements(content->'pages') AS page
  )
)
WHERE id = 'a38caf8b-6fb2-4d92-82ef-eefcfc0f6afe';

DELETE FROM flashcards WHERE id = '246134c9-eb53-4323-bcdb-6e777504a958';
