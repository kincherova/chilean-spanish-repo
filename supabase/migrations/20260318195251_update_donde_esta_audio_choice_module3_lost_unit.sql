
/*
  # Update "¿Dónde está…?" in audio_choice section of "If you get lost" unit (Module 3)

  1. Changes
    - In audio_choice items (page index 3, item index 5): replace option "¿Dónde está…?" with "¿Dónde está?"
*/

UPDATE lessons
SET content = jsonb_set(
  content,
  '{pages,3,items,5,options,3}',
  '"¿Dónde está?"'
)
WHERE id = '559b72d2-1ef8-448d-87d2-d1627a8be90e';
