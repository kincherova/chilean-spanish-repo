/*
  # Update Unit 2 Customs - replace "Claro, con gusto" with "Por supuesto"

  Replaces the phrase in the lesson content (intro, multiple_choice, audio_choice,
  dialogue, recap pages) and in the flashcard.
*/

UPDATE lessons
SET content = replace(content::text, 'Claro, con gusto', 'Por supuesto')::jsonb
WHERE id = '9b1071aa-b319-4246-a5f2-fef355de8863';

UPDATE flashcards
SET spanish_text = 'Por supuesto', english_text = 'Of course'
WHERE id = '8ced28e1-ea65-4bd9-b7e9-fcb161737c14';
