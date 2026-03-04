/*
  # Update Unit 3 Finding the Exit - phrase corrections

  - Replace "Siga recto" with "Sigue derecho" in lesson and flashcard
  - Replace "Afuera del terminal" with "Por allá" in lesson and flashcard
*/

UPDATE lessons
SET content = replace(
  replace(content::text, 'Siga recto', 'Sigue derecho'),
  'Afuera del terminal', 'Por allá'
)::jsonb
WHERE id = '388e7589-7f4d-402d-907c-543988cac82a';

UPDATE flashcards
SET spanish_text = 'Sigue derecho', english_text = 'Go straight'
WHERE id = '9246af05-c41c-41eb-b2ac-4db0c23fbc03';

UPDATE flashcards
SET spanish_text = 'Por allá', english_text = 'Over there / That way'
WHERE id = 'da84ea19-17fd-4860-be27-3cd8bc0c637c';
