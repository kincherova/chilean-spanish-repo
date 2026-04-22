/*
  # Remove broad SELECT policy on audio-lessons storage bucket

  ## Problem
  The "Public can view audio files" SELECT policy on storage.objects allows any
  client to LIST all files in the audio-lessons bucket, exposing the full file
  inventory to the public.

  ## Fix
  Drop the SELECT policy entirely. The bucket is already public, so direct
  object URLs continue to work without any RLS SELECT policy — Supabase serves
  public bucket files via their URL regardless. Removing the policy only
  prevents unauthenticated clients from calling the storage LIST API to
  enumerate all files.
*/

DROP POLICY IF EXISTS "Public can view audio files" ON storage.objects;
