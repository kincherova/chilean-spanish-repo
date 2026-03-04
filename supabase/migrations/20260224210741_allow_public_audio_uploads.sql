/*
  # Allow public uploads to audio-lessons storage bucket

  ## Changes
  - Drop the existing INSERT policy that requires authentication
  - Add a new INSERT policy that allows anyone (public) to upload audio files
  - This supports the admin audio upload page being used without sign-in
*/

DROP POLICY IF EXISTS "Authenticated users can upload audio files" ON storage.objects;

CREATE POLICY "Anyone can upload audio files"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'audio-lessons');
