
/*
  # Fix missing audio URLs on 7 flashcards

  ## Problem
  Previous migrations that linked lesson phrase audio to flashcards used exact
  text matching. Several flashcards were skipped because of minor text differences
  (extra spaces, different ellipsis characters) between the flashcard spanish_text
  and the lesson phrase spanish text.

  ## Changes
  - Updates audio_url on 7 flashcards using the known audio file URLs that are
    already uploaded and linked in the corresponding lesson phrases.

  ## Affected flashcards
  1. "Visita familiar." — Immigration & Passport Control (phrase index 10)
  2. "¿Puede repetir más lento?" — Asking for Help at the Airport (phrase index 5)
  3. "Estoy buscando…" — If you get lost… (phrase index 4)
  4. "¿Dónde está?" — If you get lost… (phrase index 5)
  5. "¿Me puede llevar a…?" — Small talk in a taxi (phrase index 4)
  6. "Ahora la atienden" — Arriving & Getting a Table (phrase index 11)
  7. "¿Dónde está?" — Shopping for Food (phrase index 1)
*/

UPDATE flashcards
SET audio_url = 'https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/2fb0c3a3-a14c-43fc-8d9d-b1cc0f5de872_10_1771886746033.mp3'
WHERE spanish_text = 'Visita familiar.'
  AND unit_id = (
    SELECT u.id FROM units u
    JOIN modules m ON u.module_id = m.id
    WHERE u.title = 'Immigration & Passport Control'
    AND m.title ILIKE '%Airport%'
    LIMIT 1
  );

UPDATE flashcards
SET audio_url = 'https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/6b9fedb4-caf9-4c1c-b0fa-ff7f182d3f11_5_1771887252499.mp3'
WHERE spanish_text = '¿Puede repetir más lento?'
  AND unit_id = (
    SELECT id FROM units WHERE title = 'Asking for Help at the Airport' LIMIT 1
  );

UPDATE flashcards
SET audio_url = 'https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/559b72d2-1ef8-448d-87d2-d1627a8be90e_4_1772547753857.mp3'
WHERE spanish_text = 'Estoy buscando…'
  AND unit_id = (
    SELECT id FROM units WHERE title = 'If you get lost…' LIMIT 1
  );

UPDATE flashcards
SET audio_url = 'https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/559b72d2-1ef8-448d-87d2-d1627a8be90e_5_1772547759357.mp3'
WHERE spanish_text = '¿Dónde está?'
  AND unit_id = (
    SELECT id FROM units WHERE title = 'If you get lost…' LIMIT 1
  );

UPDATE flashcards
SET audio_url = 'https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/436b0dcc-fcf1-43b8-aacf-a5ec291eba23_4_1772548164200.mp3'
WHERE spanish_text = '¿Me puede llevar a…?'
  AND unit_id = (
    SELECT id FROM units WHERE title = 'Small talk in a taxi' LIMIT 1
  );

UPDATE flashcards
SET audio_url = 'https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/99a90297-c089-4573-9aba-aadc2b6db587_11_1772548549284.mp3'
WHERE spanish_text = 'Ahora la atienden'
  AND unit_id = (
    SELECT id FROM units WHERE title = 'Arriving & Getting a Table' LIMIT 1
  );

UPDATE flashcards
SET audio_url = 'https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/592a478a-04b9-4e30-8a89-23e1610e9cc2_1_1772548786466.mp3'
WHERE spanish_text = '¿Dónde está?'
  AND unit_id = (
    SELECT id FROM units WHERE title = 'Shopping for Food' LIMIT 1
  );
