/*
  # Link newly uploaded audio files to lesson phrases

  ## Changes
  1. Polite exits / endings (b571fe41):
     - Add audioUrl to intro phrase index 7: "Chao"
     - Add audioUrl to intro phrase index 8: "Nos vemos"
     - Add audioUrl to audio_choice item for "Chao" (currently missing)
     - Add audioUrl to audio_choice item for "Nos vemos" (currently missing)

  2. Understanding informal comments (f3d352c1):
     - Fix intro phrase for "Al tiro" to use the correct _1_ audio file

  3. Immigration & Passport Control (2fb0c3a3):
     - Fix intro phrase for "De Estados Unidos." to use the correct _1_ audio file
*/

-- 1. Polite exits: add audio to "Chao" (index 7) and "Nos vemos" (index 8) in intro phrases
UPDATE lessons
SET content = jsonb_set(
  jsonb_set(
    content,
    '{pages,1,phrases,7,audioUrl}',
    '"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/b571fe41-04ba-4d44-b316-eb2772458160_7_1771967655876.mp3"'
  ),
  '{pages,1,phrases,8,audioUrl}',
  '"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/b571fe41-04ba-4d44-b316-eb2772458160_8_1771967665761.mp3"'
)
WHERE id = 'b571fe41-04ba-4d44-b316-eb2772458160';

-- 2. Polite exits: add audioUrl to audio_choice items for "Chao" (item 6) and "Nos vemos" (item 7)
UPDATE lessons
SET content = jsonb_set(
  jsonb_set(
    content,
    '{pages,3,items,6,audioUrl}',
    '"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/b571fe41-04ba-4d44-b316-eb2772458160_7_1771967655876.mp3"'
  ),
  '{pages,3,items,7,audioUrl}',
  '"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/b571fe41-04ba-4d44-b316-eb2772458160_8_1771967665761.mp3"'
)
WHERE id = 'b571fe41-04ba-4d44-b316-eb2772458160';

-- 3. Informal comments: fix "Al tiro" intro phrase audioUrl to use _1_ file
UPDATE lessons
SET content = jsonb_set(
  content,
  '{pages,1,phrases,1,audioUrl}',
  '"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/f3d352c1-aa17-46d0-8ae9-d75548e4a8f4_1_1771967469944.mp3"'
)
WHERE id = 'f3d352c1-aa17-46d0-8ae9-d75548e4a8f4';

-- 4. Immigration: fix "De Estados Unidos." intro phrase audioUrl to use _1_ file
UPDATE lessons
SET content = jsonb_set(
  content,
  '{pages,1,phrases,1,audioUrl}',
  '"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/2fb0c3a3-a14c-43fc-8d9d-b1cc0f5de872_1_1771968041223.mp3"'
)
WHERE id = '2fb0c3a3-a14c-43fc-8d9d-b1cc0f5de872';
