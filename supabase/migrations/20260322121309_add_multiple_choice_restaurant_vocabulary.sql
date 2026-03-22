/*
  # Add multiple-choice exercise to Restaurant Vocabulary unit

  Inserts a multiple_choice page between the phrase_list and flashcards pages
  in the "Restaurant Vocabulary" vocabulary unit of the Cafes & Restaurants module.

  Questions use the format: "What does [Spanish word] mean?"
  with 4 options drawn from vocabulary in the same unit.
*/

DO $$
DECLARE
  new_page jsonb;
  current_pages jsonb;
  new_pages jsonb;
BEGIN
  new_page := '{
    "type": "multiple_choice",
    "title": "Quick Quiz",
    "items": [
      {
        "phrase": "Mesa",
        "question": "What does \"mesa\" mean?",
        "options": ["Chair", "Table", "Glass", "Plate"],
        "correctAnswer": 1
      },
      {
        "phrase": "Tenedor",
        "question": "What does \"tenedor\" mean?",
        "options": ["Knife", "Spoon", "Fork", "Glass"],
        "correctAnswer": 2
      },
      {
        "phrase": "Cuchillo",
        "question": "What does \"cuchillo\" mean?",
        "options": ["Spoon", "Fork", "Plate", "Knife"],
        "correctAnswer": 3
      },
      {
        "phrase": "Baño",
        "question": "What does \"baño\" mean?",
        "options": ["Kitchen", "Bathroom", "Bar", "Window"],
        "correctAnswer": 1
      },
      {
        "phrase": "Terraza",
        "question": "What does \"terraza\" mean?",
        "options": ["Inside", "Bar / Counter", "Terrace / Outdoor seating", "Window"],
        "correctAnswer": 2
      },
      {
        "phrase": "Vaso",
        "question": "What does \"vaso\" mean?",
        "options": ["Plate", "Spoon", "Fork", "Glass"],
        "correctAnswer": 3
      },
      {
        "phrase": "Silla",
        "question": "What does \"silla\" mean?",
        "options": ["Table", "Chair", "Bar / Counter", "Window"],
        "correctAnswer": 1
      },
      {
        "phrase": "Adentro",
        "question": "What does \"adentro\" mean?",
        "options": ["Outside", "Inside", "This way", "The terrace"],
        "correctAnswer": 1
      },
      {
        "phrase": "Plato",
        "question": "What does \"plato\" mean?",
        "options": ["Glass", "Spoon", "Plate / Dish", "Fork"],
        "correctAnswer": 2
      },
      {
        "phrase": "Barra",
        "question": "What does \"barra\" mean?",
        "options": ["Window", "Terrace", "Chair", "Bar / Counter"],
        "correctAnswer": 3
      }
    ]
  }'::jsonb;

  SELECT content->'pages' INTO current_pages
  FROM lessons WHERE id = 'f246954a-1e1a-444d-b8f3-32c9e3296f4b';

  new_pages := (current_pages->0) || jsonb_build_array(new_page) || (current_pages->1);

  UPDATE lessons
  SET content = jsonb_set(content, '{pages}', new_pages)
  WHERE id = 'f246954a-1e1a-444d-b8f3-32c9e3296f4b';
END $$;
