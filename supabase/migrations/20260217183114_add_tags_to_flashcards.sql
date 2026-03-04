/*
  # Add tags column to flashcards table

  1. Changes
    - Add `tags` column to `flashcards` table as a text array
    - Default value is an empty array
    - This will allow users to tag flashcards with labels like "needs practice" or "mastered"
  
  2. Security
    - No RLS changes needed - existing policies still apply
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'flashcards' AND column_name = 'tags'
  ) THEN
    ALTER TABLE flashcards ADD COLUMN tags text[] DEFAULT '{}';
  END IF;
END $$;