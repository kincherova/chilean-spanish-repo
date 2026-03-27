/*
  # Fix Security and Performance Issues

  ## Changes

  1. Add covering indexes for foreign keys
     - `analytics_events.user_id` foreign key index
     - `payments.user_id` foreign key index

  2. Fix RLS policy to use subquery for auth functions (performance optimization)
     - Replace `auth.uid()` with `(select auth.uid())` in analytics_events SELECT policy

  3. Fix INSERT policy that allows unrestricted access
     - Replace always-true WITH CHECK with proper check that allows anonymous events
       (null user_id) or authenticated users inserting their own events

  4. Drop unused indexes to reduce write overhead
     - `quiz_questions_unit_id_idx`
     - `user_quiz_attempts_quiz_question_id_idx`
     - `user_quiz_attempts_user_id_idx`
     - `analytics_events_event_idx`
     - `analytics_events_created_at_idx`
*/

-- Add covering index for analytics_events.user_id foreign key
CREATE INDEX IF NOT EXISTS analytics_events_user_id_idx
  ON public.analytics_events (user_id);

-- Add covering index for payments.user_id foreign key
CREATE INDEX IF NOT EXISTS payments_user_id_idx
  ON public.payments (user_id);

-- Fix RLS SELECT policy to use subquery for better performance
DROP POLICY IF EXISTS "Authenticated users can view own events" ON public.analytics_events;

CREATE POLICY "Authenticated users can view own events"
  ON public.analytics_events
  FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

-- Fix INSERT policy to not be always-true
DROP POLICY IF EXISTS "Anyone can insert analytics events" ON public.analytics_events;

CREATE POLICY "Anyone can insert analytics events"
  ON public.analytics_events
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    user_id IS NULL OR user_id = (select auth.uid())
  );

-- Drop unused indexes
DROP INDEX IF EXISTS public.quiz_questions_unit_id_idx;
DROP INDEX IF EXISTS public.user_quiz_attempts_quiz_question_id_idx;
DROP INDEX IF EXISTS public.user_quiz_attempts_user_id_idx;
DROP INDEX IF EXISTS public.analytics_events_event_idx;
DROP INDEX IF EXISTS public.analytics_events_created_at_idx;
