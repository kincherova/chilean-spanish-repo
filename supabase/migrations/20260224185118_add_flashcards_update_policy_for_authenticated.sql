
/*
  # Add UPDATE policy to flashcards table

  ## Summary
  The flashcards table only had a SELECT policy. Authenticated admins need
  to be able to update the audio_url column when uploading vocabulary audio.
  This adds an UPDATE policy for authenticated users.
*/

CREATE POLICY "Authenticated users can update flashcards"
  ON flashcards
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
