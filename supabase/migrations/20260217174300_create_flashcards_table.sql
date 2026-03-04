/*
  # Create Flashcards System

  ## Overview
  Creates tables for flashcards with Spanish/English pairs and user-specific tagging system
  for tracking practice needs and mastery.

  ## New Tables

  ### `flashcards`
  - `id` (uuid, primary key) - Unique identifier
  - `unit_id` (uuid, foreign key) - Associated unit
  - `spanish_text` (text) - Spanish side of flashcard
  - `english_text` (text) - English translation
  - `order_index` (integer) - Display order within unit
  - `created_at` (timestamptz) - Creation timestamp

  ### `user_flashcard_tags`
  - `id` (uuid, primary key) - Unique identifier
  - `user_id` (uuid, foreign key) - Reference to auth.users
  - `flashcard_id` (uuid, foreign key) - Reference to flashcard
  - `tag` (text) - Tag value: 'needs_practice' or 'mastered'
  - `created_at` (timestamptz) - When tag was added
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  - Enable RLS on all tables
  - Public read access for flashcards
  - Users can only read/write their own tags
*/

-- Create flashcards table
CREATE TABLE IF NOT EXISTS flashcards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  unit_id uuid NOT NULL REFERENCES units(id) ON DELETE CASCADE,
  spanish_text text NOT NULL,
  english_text text NOT NULL,
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create user_flashcard_tags table
CREATE TABLE IF NOT EXISTS user_flashcard_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  flashcard_id uuid NOT NULL REFERENCES flashcards(id) ON DELETE CASCADE,
  tag text NOT NULL CHECK (tag IN ('needs_practice', 'mastered')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, flashcard_id)
);

-- Enable RLS
ALTER TABLE flashcards ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_flashcard_tags ENABLE ROW LEVEL SECURITY;

-- RLS Policies for flashcards (public read access)
CREATE POLICY "Anyone can view flashcards"
  ON flashcards FOR SELECT
  TO public
  USING (true);

-- RLS Policies for user_flashcard_tags
CREATE POLICY "Users can view own flashcard tags"
  ON user_flashcard_tags FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own flashcard tags"
  ON user_flashcard_tags FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own flashcard tags"
  ON user_flashcard_tags FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own flashcard tags"
  ON user_flashcard_tags FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_flashcards_unit_id ON flashcards(unit_id);
CREATE INDEX IF NOT EXISTS idx_user_flashcard_tags_user_id ON user_flashcard_tags(user_id);
CREATE INDEX IF NOT EXISTS idx_user_flashcard_tags_flashcard_id ON user_flashcard_tags(flashcard_id);
