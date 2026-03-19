
/*
  # Update flashcard "¿Me puede llevar a… [place]?"

  Removes the "[place]" placeholder from the spanish_text to match audio recording.
*/

UPDATE flashcards
SET spanish_text = '¿Me puede llevar a…?',
    english_text = 'Can you take me to…?'
WHERE id = '7fb435c4-3bc8-4680-b63e-2575d3813807';
