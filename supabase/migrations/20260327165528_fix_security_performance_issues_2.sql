
/*
  # Fix Security and Performance Issues

  1. Add covering indexes for foreign keys
     - analytics_events.user_id
     - payments.user_id

  2. Fix RLS policy to use (select auth.uid()) instead of auth.uid()
     - analytics_events "Authenticated users can view own events"

  3. Drop unused indexes
     - quiz_questions_unit_id_idx
     - user_quiz_attempts_quiz_question_id_idx
     - user_quiz_attempts_user_id_idx
     - analytics_events_event_idx
     - analytics_events_created_at_idx

  4. Fix "Always True" INSERT policy on analytics_events
     - Replace unrestricted INSERT with a policy that only allows inserting
       rows where the user_id matches the authenticated user, or allows anon
       inserts only for rows with null user_id
*/

-- Add index on analytics_events.user_id (foreign key)
CREATE INDEX IF NOT EXISTS analytics_events_user_id_idx ON public.analytics_events (user_id);

-- Add index on payments.user_id (foreign key)
CREATE INDEX IF NOT EXISTS payments_user_id_idx ON public.payments (user_id);

-- Fix RLS policy to use (select auth.uid()) for better performance
DROP POLICY IF EXISTS "Authenticated users can view own events" ON public.analytics_events;

CREATE POLICY "Authenticated users can view own events"
  ON public.analytics_events
  FOR SELECT
  TO authenticated
  USING (user_id = (SELECT auth.uid()));

-- Drop unused indexes
DROP INDEX IF EXISTS public.quiz_questions_unit_id_idx;
DROP INDEX IF EXISTS public.user_quiz_attempts_quiz_question_id_idx;
DROP INDEX IF EXISTS public.user_quiz_attempts_user_id_idx;
DROP INDEX IF EXISTS public.analytics_events_event_idx;
DROP INDEX IF EXISTS public.analytics_events_created_at_idx;

-- Fix "Always True" INSERT policy on analytics_events
-- Replace with a policy that restricts inserts to valid rows:
-- authenticated users can only insert rows with their own user_id
-- anon users can insert rows where user_id is null
DROP POLICY IF EXISTS "Anyone can insert analytics events" ON public.analytics_events;

CREATE POLICY "Authenticated users can insert own events"
  ON public.analytics_events
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY "Anon users can insert events without user_id"
  ON public.analytics_events
  FOR INSERT
  TO anon
  WITH CHECK (user_id IS NULL);
