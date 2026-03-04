/*
  # Add audio_url to flashcards table

  ## Changes
  - Adds an `audio_url` column (nullable text) to the `flashcards` table
  - This allows admins to attach pronunciation audio to individual vocabulary flashcard words
  - Used by vocabulary ("Key vocabulary") units in the Cafes & Restaurants module and future modules

  ## Column
  - `audio_url` (text, nullable) — public URL to an audio file stored in the audio-lessons bucket
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'flashcards' AND column_name = 'audio_url'
  ) THEN
    ALTER TABLE flashcards ADD COLUMN audio_url text;
  END IF;
END $$;
