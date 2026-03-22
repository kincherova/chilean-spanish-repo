/*
  # Add multiple-choice exercise to Cafe Vocabulary unit

  Inserts a multiple_choice page between the phrase_list and flashcards pages
  in the "Cafe Vocabulary" vocabulary unit of the Cafes & Restaurants module.
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
        "phrase": "Cortado",
        "question": "What does \"cortado\" mean?",
        "options": ["Large coffee", "Small coffee", "Espresso with a little milk", "Coffee with sugar"],
        "correctAnswer": 2
      },
      {
        "phrase": "Cafe grande",
        "question": "What does \"cafe grande\" mean?",
        "options": ["Small coffee", "Coffee with milk", "Cortado", "Large coffee"],
        "correctAnswer": 3
      },
      {
        "phrase": "Sin azucar",
        "question": "What does \"sin azucar\" mean?",
        "options": ["With sugar", "Without milk", "Without sugar", "With milk"],
        "correctAnswer": 2
      },
      {
        "phrase": "Con leche",
        "question": "What does \"con leche\" mean?",
        "options": ["Without milk", "With sugar", "Sparkling water", "With milk"],
        "correctAnswer": 3
      },
      {
        "phrase": "Agua con gas",
        "question": "What does \"agua con gas\" mean?",
        "options": ["Still water", "Coffee with gas", "Sparkling water", "Cold water"],
        "correctAnswer": 2
      },
      {
        "phrase": "Cafe chico",
        "question": "What does \"cafe chico\" mean?",
        "options": ["Large coffee", "Small coffee", "Cortado", "Coffee without milk"],
        "correctAnswer": 1
      },
      {
        "phrase": "Agua sin gas",
        "question": "What does \"agua sin gas\" mean?",
        "options": ["Sparkling water", "Still water", "Cold water", "Water with sugar"],
        "correctAnswer": 1
      },
      {
        "phrase": "Con azucar",
        "question": "What does \"con azucar\" mean?",
        "options": ["Without sugar", "With milk", "With sugar", "Without milk"],
        "correctAnswer": 2
      }
    ]
  }'::jsonb;

  SELECT content->'pages' INTO current_pages
  FROM lessons WHERE id = 'ac12b29e-d1b4-4fc0-aa62-7230b6d3af43';

  new_pages := (current_pages->0) || jsonb_build_array(new_page) || (current_pages->1);

  UPDATE lessons
  SET content = jsonb_set(content, '{pages}', new_pages)
  WHERE id = 'ac12b29e-d1b4-4fc0-aa62-7230b6d3af43';
END $$;
