/*
  # Add multiple-choice exercise to Food & Drinks unit

  Inserts a multiple_choice page between the phrase_list and flashcards pages
  in the "Food & Drinks" vocabulary unit of the Cafes & Restaurants module.
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
        "phrase": "Almuerzo",
        "question": "What does \"almuerzo\" mean?",
        "options": ["Breakfast", "Dinner", "Lunch", "Dessert"],
        "correctAnswer": 2
      },
      {
        "phrase": "Carne",
        "question": "What does \"carne\" mean?",
        "options": ["Fish", "Chicken", "Meat", "Rice"],
        "correctAnswer": 2
      },
      {
        "phrase": "Pescado",
        "question": "What does \"pescado\" mean?",
        "options": ["Chicken", "Fish", "Meat", "Bread"],
        "correctAnswer": 1
      },
      {
        "phrase": "Postre",
        "question": "What does \"postre\" mean?",
        "options": ["Side dish", "Dessert", "Juice", "Pasta"],
        "correctAnswer": 1
      },
      {
        "phrase": "Bebida",
        "question": "What does \"bebida\" mean in Chile?",
        "options": ["Beer", "Wine", "Juice", "Soda / Soft drink"],
        "correctAnswer": 3
      },
      {
        "phrase": "Picante",
        "question": "What does \"picante\" mean?",
        "options": ["Salty", "Sweet", "Spicy", "Sour"],
        "correctAnswer": 2
      },
      {
        "phrase": "Desayuno",
        "question": "What does \"desayuno\" mean?",
        "options": ["Lunch", "Dinner", "Breakfast", "Side dish"],
        "correctAnswer": 2
      },
      {
        "phrase": "Pollo",
        "question": "What does \"pollo\" mean?",
        "options": ["Fish", "Meat", "Cheese", "Chicken"],
        "correctAnswer": 3
      },
      {
        "phrase": "Cerveza",
        "question": "What does \"cerveza\" mean?",
        "options": ["Wine", "Juice", "Beer", "Soda"],
        "correctAnswer": 2
      },
      {
        "phrase": "Dulce",
        "question": "What does \"dulce\" mean?",
        "options": ["Salty", "Spicy", "Sweet", "Sour"],
        "correctAnswer": 2
      }
    ]
  }'::jsonb;

  SELECT content->'pages' INTO current_pages
  FROM lessons WHERE id = 'b192f8cf-8d12-4864-abea-799fbf5ed202';

  new_pages := (current_pages->0) || jsonb_build_array(new_page) || (current_pages->1);

  UPDATE lessons
  SET content = jsonb_set(content, '{pages}', new_pages)
  WHERE id = 'b192f8cf-8d12-4864-abea-799fbf5ed202';
END $$;
