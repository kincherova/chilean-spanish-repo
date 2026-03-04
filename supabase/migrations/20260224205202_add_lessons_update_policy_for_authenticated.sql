/*
  # Add UPDATE policy for lessons table

  ## Problem
  The lessons table only has a SELECT policy. Authenticated users (admins)
  cannot update lesson content, which breaks the audio upload admin page
  when it tries to save audio URLs back to lessons.

  ## Changes
  - Add UPDATE policy on `lessons` for authenticated users
*/

CREATE POLICY "Authenticated users can update lessons"
  ON lessons
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
