/*
  # Create Audio Storage Bucket

  1. Storage
    - Creates `audio-lessons` bucket for storing MP3 lesson files
    - Bucket is public for read access
    
  2. Security
    - Enables public read access to all audio files
    - Authenticated users can upload files (for future admin features)
    - File path structure: {language}/{unit_id}/{lesson_id}.mp3
    
  3. Notes
    - Files will be manually uploaded through Supabase Dashboard
    - Public access allows students to stream audio without authentication
*/

-- Create the audio-lessons bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'audio-lessons',
  'audio-lessons',
  true,
  10485760, -- 10MB limit per file
  ARRAY['audio/mpeg', 'audio/mp3']
)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to all audio files
CREATE POLICY "Public can view audio files"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'audio-lessons');

-- Allow authenticated users to upload audio files (for future admin features)
CREATE POLICY "Authenticated users can upload audio files"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'audio-lessons');

-- Allow authenticated users to update audio files
CREATE POLICY "Authenticated users can update audio files"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'audio-lessons')
  WITH CHECK (bucket_id = 'audio-lessons');

-- Allow authenticated users to delete audio files
CREATE POLICY "Authenticated users can delete audio files"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'audio-lessons');