
/*
  # Fix Security and Performance Issues

  ## Summary
  Addresses all security and performance warnings from the Supabase linter.

  ## Changes

  ### 1. Add missing indexes for foreign keys
  - `quiz_questions.unit_id` — covers `quiz_questions_unit_id_fkey`
  - `user_quiz_attempts.quiz_question_id` — covers `user_quiz_attempts_quiz_question_id_fkey`
  - `user_quiz_attempts.user_id` — covers `user_quiz_attempts_user_id_fkey`

  ### 2. Remove duplicate UPDATE policies on `flashcards` and `lessons`
  - Drop the older "Admins can update flashcards" and "Admins can update lessons" duplicates
  - Keep "Admin users can update flashcards" and "Admin users can update lessons"

  ### 3. Fix auth RLS initialization plan (wrap auth calls in SELECT)
  - Update remaining UPDATE policies on `flashcards` and `lessons` to use `(select auth.jwt())`
  - Update `payments` SELECT policy to use `(select auth.uid())`

  ### 4. Drop unused indexes on `payments`
  - `payments_user_id_idx` — flagged as unused; the RLS policy covers access via auth.uid()
  - `payments_mp_preference_id_idx` — unused
  - `payments_mp_payment_id_idx` — unused

  ### 5. Add RLS policies for `access_codes`
  - Table has RLS enabled but no policies — add SELECT policy for authenticated users
    and an INSERT/UPDATE policy restricted to admins
*/

-- 1. Add indexes for unindexed foreign keys
CREATE INDEX IF NOT EXISTS quiz_questions_unit_id_idx ON public.quiz_questions (unit_id);
CREATE INDEX IF NOT EXISTS user_quiz_attempts_quiz_question_id_idx ON public.user_quiz_attempts (quiz_question_id);
CREATE INDEX IF NOT EXISTS user_quiz_attempts_user_id_idx ON public.user_quiz_attempts (user_id);

-- 2. Drop duplicate UPDATE policies
DROP POLICY IF EXISTS "Admins can update flashcards" ON public.flashcards;
DROP POLICY IF EXISTS "Admins can update lessons" ON public.lessons;

-- 3a. Fix auth.jwt() in flashcards UPDATE policy
DROP POLICY IF EXISTS "Admin users can update flashcards" ON public.flashcards;
CREATE POLICY "Admin users can update flashcards"
  ON public.flashcards
  FOR UPDATE
  TO authenticated
  USING (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');

-- 3b. Fix auth.jwt() in lessons UPDATE policy
DROP POLICY IF EXISTS "Admin users can update lessons" ON public.lessons;
CREATE POLICY "Admin users can update lessons"
  ON public.lessons
  FOR UPDATE
  TO authenticated
  USING (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');

-- 3c. Fix auth.uid() in payments SELECT policy
DROP POLICY IF EXISTS "Users can view own payments" ON public.payments;
CREATE POLICY "Users can view own payments"
  ON public.payments
  FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

-- 4. Drop unused indexes on payments
DROP INDEX IF EXISTS public.payments_user_id_idx;
DROP INDEX IF EXISTS public.payments_mp_preference_id_idx;
DROP INDEX IF EXISTS public.payments_mp_payment_id_idx;

-- 5. Add policies for access_codes (RLS enabled but no policies)
CREATE POLICY "Authenticated users can view access codes"
  ON public.access_codes
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert access codes"
  ON public.access_codes
  FOR INSERT
  TO authenticated
  WITH CHECK (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can update access codes"
  ON public.access_codes
  FOR UPDATE
  TO authenticated
  USING (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin')
  WITH CHECK (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');

CREATE POLICY "Admins can delete access codes"
  ON public.access_codes
  FOR DELETE
  TO authenticated
  USING (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');
