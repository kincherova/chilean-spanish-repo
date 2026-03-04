/*
  # Update flashcard phrase in "Polite exits / endings" unit

  ## Changes
  - Replace "Gracias, que esté bien" with "Gracias, que estés bien" in flashcards table
*/

UPDATE flashcards
SET spanish_text = 'Gracias, que estés bien'
WHERE spanish_text = 'Gracias, que esté bien';
