/*
  # Replace "Visitar familia" with "Visita familiar" in Immigration lesson

  Updates all occurrences of "Visitar familia" / "Visitar familia." in the
  Immigration & Passport Control lesson content (intro phrases, multiple choice, audio choice).
*/

UPDATE lessons
SET content = replace(content::text, 'Visitar familia', 'Visita familiar')::jsonb
WHERE id = '2fb0c3a3-a14c-43fc-8d9d-b1cc0f5de872';
