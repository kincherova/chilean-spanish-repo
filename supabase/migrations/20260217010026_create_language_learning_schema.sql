/*
  # Survival Chilean Spanish - Language Learning Schema

  ## Overview
  Creates the complete database schema for a language learning application
  with modules, units, lessons, and user progress tracking.

  ## New Tables

  ### `modules`
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - Module name (e.g., "Survival Basics")
  - `description` (text) - Brief description of what this module covers
  - `order_index` (integer) - Display order
  - `icon` (text) - Icon identifier for UI
  - `created_at` (timestamptz) - Creation timestamp

  ### `units`
  - `id` (uuid, primary key) - Unique identifier
  - `module_id` (uuid, foreign key) - Parent module
  - `title` (text) - Unit name (e.g., "Greetings & Introductions")
  - `description` (text) - What learners will accomplish
  - `order_index` (integer) - Display order within module
  - `estimated_minutes` (integer) - Time to complete
  - `created_at` (timestamptz) - Creation timestamp

  ### `lessons`
  - `id` (uuid, primary key) - Unique identifier
  - `unit_id` (uuid, foreign key) - Parent unit
  - `title` (text) - Lesson name
  - `type` (text) - Lesson type: 'vocabulary', 'dialogue', 'practice', 'cultural'
  - `content` (jsonb) - Lesson content (flexible structure for different lesson types)
  - `order_index` (integer) - Display order within unit
  - `created_at` (timestamptz) - Creation timestamp

  ### `user_progress`
  - `id` (uuid, primary key) - Unique identifier
  - `user_id` (uuid, foreign key) - Reference to auth.users
  - `lesson_id` (uuid, foreign key) - Completed lesson
  - `completed_at` (timestamptz) - When lesson was completed
  - `score` (integer, nullable) - Optional score for practice lessons

  ### `user_profiles`
  - `id` (uuid, primary key) - Matches auth.users id
  - `name` (text) - User's display name
  - `email` (text) - User's email
  - `onboarding_completed` (boolean) - Whether user has seen onboarding
  - `created_at` (timestamptz) - Profile creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  - Enable RLS on all tables
  - Authenticated users can read all learning content (modules, units, lessons)
  - Users can only read/write their own progress and profile data
  - Public access for modules/units/lessons to allow browsing before auth
*/

-- Create modules table
CREATE TABLE IF NOT EXISTS modules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  order_index integer NOT NULL DEFAULT 0,
  icon text DEFAULT 'book',
  created_at timestamptz DEFAULT now()
);

-- Create units table
CREATE TABLE IF NOT EXISTS units (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id uuid NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  order_index integer NOT NULL DEFAULT 0,
  estimated_minutes integer DEFAULT 10,
  created_at timestamptz DEFAULT now()
);

-- Create lessons table
CREATE TABLE IF NOT EXISTS lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  unit_id uuid NOT NULL REFERENCES units(id) ON DELETE CASCADE,
  title text NOT NULL,
  type text NOT NULL DEFAULT 'vocabulary',
  content jsonb NOT NULL DEFAULT '{}',
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  onboarding_completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user_progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id uuid NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  completed_at timestamptz DEFAULT now(),
  score integer,
  UNIQUE(user_id, lesson_id)
);

-- Enable RLS on all tables
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE units ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies for modules (public read access)
CREATE POLICY "Anyone can view modules"
  ON modules FOR SELECT
  TO public
  USING (true);

-- RLS Policies for units (public read access)
CREATE POLICY "Anyone can view units"
  ON units FOR SELECT
  TO public
  USING (true);

-- RLS Policies for lessons (public read access)
CREATE POLICY "Anyone can view lessons"
  ON lessons FOR SELECT
  TO public
  USING (true);

-- RLS Policies for user_profiles
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- RLS Policies for user_progress
CREATE POLICY "Users can view own progress"
  ON user_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON user_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON user_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_units_module_id ON units(module_id);
CREATE INDEX IF NOT EXISTS idx_lessons_unit_id ON lessons(unit_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_lesson_id ON user_progress(lesson_id);
