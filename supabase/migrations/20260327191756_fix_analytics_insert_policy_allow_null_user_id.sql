/*
  # Fix analytics_events INSERT policies

  ## Problem
  The authenticated INSERT policy requires user_id = auth.uid(), but trackEvent()
  always inserts with user_id = null (we only care about event counts, not which
  user triggered them). This silently blocks all inserts from authenticated users
  visiting the landing page.

  ## Changes
  - Drop the overly-strict authenticated INSERT policy
  - Replace with one that allows null user_id OR own user_id (matches anon behavior)
*/

DROP POLICY IF EXISTS "Authenticated users can insert own events" ON public.analytics_events;
DROP POLICY IF EXISTS "Authenticated can insert own events" ON public.analytics_events;
DROP POLICY IF EXISTS "Anyone can insert analytics events" ON public.analytics_events;

CREATE POLICY "Authenticated can insert events"
  ON public.analytics_events
  FOR INSERT
  TO authenticated
  WITH CHECK (
    user_id IS NULL OR user_id = (SELECT auth.uid())
  );
