/*
  # Fix analytics_events RLS policies

  ## Problem
  Multiple migrations created duplicate and overlapping INSERT policies on analytics_events,
  which were causing inserts to fail silently for both anonymous and authenticated users.
  The table has zero rows despite the app calling trackEvent().

  ## Changes
  - Drop all existing INSERT policies on analytics_events
  - Create a single clean INSERT policy that allows:
    - Anonymous users to insert with user_id = null
    - Authenticated users to insert with their own user_id or null
  - Keep the SELECT policy for authenticated users unchanged
*/

DO $$
BEGIN
  -- Drop all existing INSERT policies
  DROP POLICY IF EXISTS "Anon users can insert analytics events without user_id" ON public.analytics_events;
  DROP POLICY IF EXISTS "Anon users can insert events without user_id" ON public.analytics_events;
  DROP POLICY IF EXISTS "Anyone can insert analytics events" ON public.analytics_events;
  DROP POLICY IF EXISTS "Authenticated users can insert own analytics events" ON public.analytics_events;
  DROP POLICY IF EXISTS "Authenticated users can insert own events" ON public.analytics_events;
  DROP POLICY IF EXISTS "Authenticated users can view own events" ON public.analytics_events;
END $$;

-- Single clean INSERT policy: anon users insert with null user_id
CREATE POLICY "Anon can insert events with null user_id"
  ON public.analytics_events
  FOR INSERT
  TO anon
  WITH CHECK (user_id IS NULL);

-- Single clean INSERT policy: authenticated users insert with own user_id or null
CREATE POLICY "Authenticated can insert own events"
  ON public.analytics_events
  FOR INSERT
  TO authenticated
  WITH CHECK (
    user_id IS NULL OR user_id = (SELECT auth.uid())
  );

-- SELECT: authenticated users can only read their own events
CREATE POLICY "Authenticated can view own events"
  ON public.analytics_events
  FOR SELECT
  TO authenticated
  USING ((SELECT auth.uid()) = user_id);
