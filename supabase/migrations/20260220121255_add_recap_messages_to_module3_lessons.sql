/*
  # Add recap messages to Module 3 (Moving around the city) lesson recap pages

  Each lesson's recap page (page index 6, type "recap") gets a custom
  "message" field so the frontend can display a unit-specific congratulations text.

  1. Unit 1 - If you get lost…
  2. Unit 2 - Useful vocabulary
  3. Unit 3 - Understanding Directions on the Street
  4. Unit 4 - Small talk in a taxi
  5. Unit 5 - Solving problems in a taxi
*/

UPDATE lessons
SET content = jsonb_set(
  content,
  '{pages,6,message}',
  '"¡Felicidades! 🥳 You''ve just learned what to say if you get lost in Chile. Now let''s move to the next unit where we''ll learn some useful vocabulary for places, transport, and spatial directions."'
)
WHERE id = '559b72d2-1ef8-448d-87d2-d1627a8be90e';

UPDATE lessons
SET content = jsonb_set(
  content,
  '{pages,6,message}',
  '"¡Felicidades! 🥳 You''ve just learned some of the most common vocabulary for places, transport, and spatial directions. Now let''s move to the next unit where we''ll learn to understand directions on the street."'
)
WHERE id = 'c01a8596-938f-48a7-b4cd-022c19e9ddcc';

UPDATE lessons
SET content = jsonb_set(
  content,
  '{pages,6,message}',
  '"¡Felicidades! 🥳 You''ve just learned how to understand directions on the street. Now let''s move to the next unit where we''ll practice to make a small talk in a taxi."'
)
WHERE id = 'd15a8429-9736-4224-acb2-3cbe4f590178';

UPDATE lessons
SET content = jsonb_set(
  content,
  '{pages,6,message}',
  '"¡Felicidades! 🥳 You''ve just learned some of the most common you can hear and say in a taxi in Chile. Now let''s move to the next unit where we''ll learn how to deal with taxi problems."'
)
WHERE id = '436b0dcc-fcf1-43b8-aacf-a5ec291eba23';

UPDATE lessons
SET content = jsonb_set(
  content,
  '{pages,6,message}',
  '"¡Felicidades! 🥳 You''ve just learned some phrases that will help you to deal with problems in a taxi. That''s all for this module. You''re ready for the next one!"'
)
WHERE id = '872cd827-8736-4cce-943b-d7696029e394';
