/*
  # Update phrase in "Polite exits / endings" lesson

  ## Changes
  - Replace "Gracias, que esté bien" with "Gracias, que estés bien" everywhere in the lesson content
  - This affects the intro phrases, multiple_choice, and audio_choice sections
*/

UPDATE lessons
SET content = replace(content::text, 'Gracias, que esté bien', 'Gracias, que estés bien')::jsonb
WHERE id = 'b571fe41-04ba-4d44-b316-eb2772458160';
