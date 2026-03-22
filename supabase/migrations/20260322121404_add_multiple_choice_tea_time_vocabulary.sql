/*
  # Add multiple-choice exercise to Tea Time (Once) unit

  Inserts a multiple_choice page between the phrase_list and flashcards pages
  in the "Tea Time (Once)" vocabulary unit of the Cafes & Restaurants module.
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
        "phrase": "Once",
        "question": "What does \"once\" mean in Chile?",
        "options": ["Eleven o clock", "A light evening meal / tea time", "Lunch", "Breakfast"],
        "correctAnswer": 1
      },
      {
        "phrase": "Palta",
        "question": "What does \"palta\" mean in Chile?",
        "options": ["Ham", "Cheese", "Avocado", "Egg"],
        "correctAnswer": 2
      },
      {
        "phrase": "Queque",
        "question": "What does \"queque\" mean in Chile?",
        "options": ["Sandwich", "Pastry", "Cake / Pound cake", "Toast"],
        "correctAnswer": 2
      },
      {
        "phrase": "Tostadas",
        "question": "What does \"tostadas\" mean?",
        "options": ["Sandwich", "Toast", "Cake", "Empanada"],
        "correctAnswer": 1
      },
      {
        "phrase": "Empanada",
        "question": "What does \"empanada\" mean?",
        "options": ["Cake", "Sandwich", "Stuffed pastry", "Toast"],
        "correctAnswer": 2
      },
      {
        "phrase": "Pastel",
        "question": "What does \"pastel\" mean?",
        "options": ["Sandwich", "Cake / Pastry", "Egg", "Ham"],
        "correctAnswer": 1
      },
      {
        "phrase": "Jamon",
        "question": "What does \"jamon\" mean?",
        "options": ["Cheese", "Ham", "Egg", "Avocado"],
        "correctAnswer": 1
      },
      {
        "phrase": "Torta",
        "question": "What does \"torta\" mean?",
        "options": ["Sandwich", "Toast", "Cake (layered)", "Empanada"],
        "correctAnswer": 2
      }
    ]
  }'::jsonb;

  SELECT content->'pages' INTO current_pages
  FROM lessons WHERE id = '1b73ff99-ad18-45c0-839c-459663bc8fa9';

  new_pages := (current_pages->0) || jsonb_build_array(new_page) || (current_pages->1);

  UPDATE lessons
  SET content = jsonb_set(content, '{pages}', new_pages)
  WHERE id = '1b73ff99-ad18-45c0-839c-459663bc8fa9';
END $$;
