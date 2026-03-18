
/*
  # Update "¿Dónde está…?" phrase in "If you get lost" unit (Module 3)

  1. Changes
    - In the intro phrases: replace spanish "¿Dónde está…?" with "¿Dónde está?" and english "Where is…?" with "Where is?"
    - In the multiple_choice items: replace phrase "¿Dónde está…?" with "¿Dónde está?" and the correct answer option "Where is…?" with "Where is?"
*/

UPDATE lessons
SET content = jsonb_set(
  jsonb_set(
    content,
    '{pages,1,phrases,5,spanish}',
    '"¿Dónde está?"'
  ),
  '{pages,1,phrases,5,english}',
  '"Where is?"'
)
WHERE id = '559b72d2-1ef8-448d-87d2-d1627a8be90e';

UPDATE lessons
SET content = jsonb_set(
  jsonb_set(
    content,
    '{pages,2,items,2,phrase}',
    '"¿Dónde está?"'
  ),
  '{pages,2,items,2,options,2}',
  '"Where is?"'
)
WHERE id = '559b72d2-1ef8-448d-87d2-d1627a8be90e';
