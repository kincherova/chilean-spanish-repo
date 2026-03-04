/*
  # Fix Security and Performance Issues

  ## Changes Made

  1. **Add Missing Indexes on Foreign Keys**
     - Add index on `quiz_questions.unit_id` for better join performance
     - Add index on `user_quiz_attempts.quiz_question_id` for better join performance
     - Add index on `user_quiz_attempts.user_id` for better user-specific queries

  2. **Optimize RLS Policies with Auth Function Initialization**
     - Update all RLS policies to use `(select auth.uid())` instead of `auth.uid()`
     - This prevents re-evaluation of auth functions for each row, improving query performance at scale
     - Applies to tables: user_profiles, user_progress, user_flashcard_tags, user_quiz_attempts

  ## Performance Impact
  - Foreign key indexes will significantly improve join performance and query optimization
  - RLS policy optimization will reduce CPU usage and improve response times for queries with many rows

  ## Security Notes
  - All existing security policies remain intact, only performance optimization applied
  - No changes to data access permissions or authentication logic
*/

-- Add indexes on foreign keys for better query performance
CREATE INDEX IF NOT EXISTS idx_quiz_questions_unit_id ON public.quiz_questions(unit_id);
CREATE INDEX IF NOT EXISTS idx_user_quiz_attempts_quiz_question_id ON public.user_quiz_attempts(quiz_question_id);
CREATE INDEX IF NOT EXISTS idx_user_quiz_attempts_user_id ON public.user_quiz_attempts(user_id);

-- Drop existing RLS policies for user_profiles
DROP POLICY IF EXISTS "Users can view own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.user_profiles;

-- Recreate user_profiles policies with optimized auth function calls
CREATE POLICY "Users can view own profile"
  ON public.user_profiles
  FOR SELECT
  TO authenticated
  USING (id = (select auth.uid()));

CREATE POLICY "Users can insert own profile"
  ON public.user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (id = (select auth.uid()));

CREATE POLICY "Users can update own profile"
  ON public.user_profiles
  FOR UPDATE
  TO authenticated
  USING (id = (select auth.uid()))
  WITH CHECK (id = (select auth.uid()));

-- Drop existing RLS policies for user_progress
DROP POLICY IF EXISTS "Users can view own progress" ON public.user_progress;
DROP POLICY IF EXISTS "Users can insert own progress" ON public.user_progress;
DROP POLICY IF EXISTS "Users can update own progress" ON public.user_progress;

-- Recreate user_progress policies with optimized auth function calls
CREATE POLICY "Users can view own progress"
  ON public.user_progress
  FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

CREATE POLICY "Users can insert own progress"
  ON public.user_progress
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can update own progress"
  ON public.user_progress
  FOR UPDATE
  TO authenticated
  USING (user_id = (select auth.uid()))
  WITH CHECK (user_id = (select auth.uid()));

-- Drop existing RLS policies for user_flashcard_tags
DROP POLICY IF EXISTS "Users can view own flashcard tags" ON public.user_flashcard_tags;
DROP POLICY IF EXISTS "Users can insert own flashcard tags" ON public.user_flashcard_tags;
DROP POLICY IF EXISTS "Users can update own flashcard tags" ON public.user_flashcard_tags;
DROP POLICY IF EXISTS "Users can delete own flashcard tags" ON public.user_flashcard_tags;

-- Recreate user_flashcard_tags policies with optimized auth function calls
CREATE POLICY "Users can view own flashcard tags"
  ON public.user_flashcard_tags
  FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

CREATE POLICY "Users can insert own flashcard tags"
  ON public.user_flashcard_tags
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can update own flashcard tags"
  ON public.user_flashcard_tags
  FOR UPDATE
  TO authenticated
  USING (user_id = (select auth.uid()))
  WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can delete own flashcard tags"
  ON public.user_flashcard_tags
  FOR DELETE
  TO authenticated
  USING (user_id = (select auth.uid()));

-- Drop existing RLS policies for user_quiz_attempts
DROP POLICY IF EXISTS "Users can view own quiz attempts" ON public.user_quiz_attempts;
DROP POLICY IF EXISTS "Users can insert own quiz attempts" ON public.user_quiz_attempts;

-- Recreate user_quiz_attempts policies with optimized auth function calls
CREATE POLICY "Users can view own quiz attempts"
  ON public.user_quiz_attempts
  FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

CREATE POLICY "Users can insert own quiz attempts"
  ON public.user_quiz_attempts
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (select auth.uid()));