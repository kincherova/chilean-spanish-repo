/*
  # Create analytics_events table

  ## Summary
  Tracks key funnel events for the landing page at /chileanspanish:
  - landing_page_view: someone opens the link
  - checkout_initiated: someone clicks the buy/upgrade button
  - purchase_completed: a payment is approved

  ## New Tables
  - `analytics_events`
    - `id` (uuid, primary key)
    - `event` (text) - event name e.g. 'landing_page_view'
    - `user_id` (uuid, nullable) - the authenticated user if available
    - `metadata` (jsonb, nullable) - any extra context
    - `created_at` (timestamptz)

  ## Security
  - RLS enabled
  - Anyone (including anonymous) can INSERT events — this is intentional so
    unauthenticated visitors can be counted
  - Only the service role (used by admin queries) can SELECT all rows
  - Authenticated users can only select their own events
*/

CREATE TABLE IF NOT EXISTS analytics_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event text NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS analytics_events_event_idx ON analytics_events(event);
CREATE INDEX IF NOT EXISTS analytics_events_created_at_idx ON analytics_events(created_at);

ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert analytics events"
  ON analytics_events
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view own events"
  ON analytics_events
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);
