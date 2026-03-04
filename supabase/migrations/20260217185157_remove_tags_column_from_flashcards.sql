/*
  # Remove tags column from flashcards table

  1. Changes
    - Remove the `tags` column from `flashcards` table
    - This column is not needed as we use the `user_flashcard_tags` table for user-specific tagging
  
  2. Reason
    - The tags column was not user-specific and would apply to all users
    - We already have a proper user_flashcard_tags table for tracking user-specific tags
*/

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'flashcards' AND column_name = 'tags'
  ) THEN
    ALTER TABLE flashcards DROP COLUMN tags;
  END IF;
END $$;