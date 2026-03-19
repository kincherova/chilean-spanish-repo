
/*
  # Update flashcard texts to match uploaded audio files

  Updates 6 flashcard entries so their spanish_text and english_text match
  the actual audio recordings that exist in storage. This allows audio URLs
  to be linked to these flashcards.

  Changes:
  - "¿Puede repetir más despacio?" → "¿Puede repetir más lento?"
  - "Visitar familia." → "Visita familiar." (english: "Family visit.")
  - "Estoy buscando… [place]" → "Estoy buscando…" (english: "I'm looking for…")
  - "¿Dónde está…?" (×2) → "¿Dónde está?" (english: "Where is it?")
  - "Ahora le atienden" → "Ahora la atienden" (english: "Someone will help you now.")
*/

UPDATE flashcards
SET spanish_text = '¿Puede repetir más lento?',
    english_text = 'Can you repeat more slowly?'
WHERE id = 'bedba171-e591-4ae0-9282-a46994eeefdf';

UPDATE flashcards
SET spanish_text = 'Visita familiar.',
    english_text = 'Family visit.'
WHERE id = 'a91b56a5-1e4c-4742-b4b3-c175c3635cd4';

UPDATE flashcards
SET spanish_text = 'Estoy buscando…',
    english_text = 'I''m looking for…'
WHERE id = '48dec4ac-3776-498f-97ea-8f59be391fe2';

UPDATE flashcards
SET spanish_text = '¿Dónde está?',
    english_text = 'Where is it?'
WHERE id = 'e9ee80f6-8b5c-4121-8224-704cd45c0b4b';

UPDATE flashcards
SET spanish_text = '¿Dónde está?',
    english_text = 'Where is it?'
WHERE id = '2debc04e-2442-43c6-8780-eb8e2e52c88a';

UPDATE flashcards
SET spanish_text = 'Ahora la atienden',
    english_text = 'Someone will help you now.'
WHERE id = '4c38bba9-9de6-4499-9825-2ba4d9a9d436';
