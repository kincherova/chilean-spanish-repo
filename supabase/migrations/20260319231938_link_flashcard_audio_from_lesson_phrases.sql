
/*
  # Link flashcard audio from lesson phrase recordings

  ## Summary
  Updates flashcard audio_url values using the real human-recorded audio
  that was uploaded to lesson phrase pages. Matches by exact Spanish text.

  ## Changes
  - Updates `audio_url` on 228 flashcards that currently have no audio
  - Source audio comes from lesson `content->pages->phrases->audioUrl` fields
  - Only updates flashcards where audio_url IS NULL (won't overwrite existing)
*/

WITH phrase_audio AS (
  SELECT DISTINCT ON (phrase->>'spanish')
    phrase->>'spanish' AS spanish_text,
    phrase->>'audioUrl' AS audio_url
  FROM lessons,
    jsonb_array_elements(content->'pages') AS page,
    jsonb_array_elements(page->'phrases') AS phrase
  WHERE phrase->>'audioUrl' IS NOT NULL
    AND phrase->>'audioUrl' != ''
  ORDER BY phrase->>'spanish', (phrase->>'audioUrl') DESC
)
UPDATE flashcards f
SET audio_url = pa.audio_url
FROM phrase_audio pa
WHERE pa.spanish_text = f.spanish_text
  AND f.audio_url IS NULL;
