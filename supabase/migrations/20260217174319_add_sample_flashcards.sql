/*
  # Add Sample Flashcards

  ## Overview
  Adds sample flashcards with Spanish phrases and English translations
  for the "Understanding questions" unit.

  ## Data
  - Adds 10 common Spanish question phrases with English translations
  - Associated with the first unit in the database
*/

-- Add sample flashcards for the "Understanding questions" unit
INSERT INTO flashcards (unit_id, spanish_text, english_text, order_index)
SELECT 
  id as unit_id,
  spanish,
  english,
  idx
FROM (
  SELECT id FROM units WHERE title = 'Understanding questions' LIMIT 1
) u
CROSS JOIN LATERAL (
  VALUES
    ('¿Cómo estás?', 'How are you?', 1),
    ('¿Qué tal?', 'What''s up? / How''s it going?', 2),
    ('¿De dónde eres?', 'Where are you from?', 3),
    ('¿Cuánto cuesta?', 'How much does it cost?', 4),
    ('¿Dónde está el baño?', 'Where is the bathroom?', 5),
    ('¿Hablas inglés?', 'Do you speak English?', 6),
    ('¿Me puedes ayudar?', 'Can you help me?', 7),
    ('¿Qué hora es?', 'What time is it?', 8),
    ('¿Cómo te llamas?', 'What''s your name?', 9),
    ('¿Por qué?', 'Why?', 10)
) AS flashcard_data(spanish, english, idx);
