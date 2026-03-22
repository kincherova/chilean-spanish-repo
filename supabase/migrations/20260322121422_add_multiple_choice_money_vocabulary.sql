/*
  # Add multiple-choice exercise to Words Related to Money unit

  Inserts a multiple_choice page between the phrase_list and flashcards pages
  in the "Words Related to Money" vocabulary unit of the Cafes & Restaurants module.
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
        "phrase": "La cuenta",
        "question": "What does \"la cuenta\" mean?",
        "options": ["The receipt", "The tip", "The bill / The check", "Cash"],
        "correctAnswer": 2
      },
      {
        "phrase": "Propina",
        "question": "What does \"propina\" mean?",
        "options": ["Cash", "Card", "Receipt", "Tip / Gratuity"],
        "correctAnswer": 3
      },
      {
        "phrase": "Efectivo",
        "question": "What does \"efectivo\" mean?",
        "options": ["Card", "Debit", "Cash", "Credit"],
        "correctAnswer": 2
      },
      {
        "phrase": "La plata",
        "question": "What does \"la plata\" mean in Chilean slang?",
        "options": ["The receipt", "Money", "The change", "The tip"],
        "correctAnswer": 1
      },
      {
        "phrase": "Cuotas",
        "question": "What does \"cuotas\" mean?",
        "options": ["Cash", "Credit", "Receipt", "Installments (paying in parts)"],
        "correctAnswer": 3
      },
      {
        "phrase": "La boleta",
        "question": "What does \"la boleta\" mean?",
        "options": ["The bill", "The tip", "The receipt", "Cash"],
        "correctAnswer": 2
      },
      {
        "phrase": "Tarjeta",
        "question": "What does \"tarjeta\" mean?",
        "options": ["Cash", "Card", "Debit", "Receipt"],
        "correctAnswer": 1
      },
      {
        "phrase": "El cambio",
        "question": "What does \"el cambio\" mean?",
        "options": ["The bill", "The tip", "The installment", "The change (money back)"],
        "correctAnswer": 3
      }
    ]
  }'::jsonb;

  SELECT content->'pages' INTO current_pages
  FROM lessons WHERE id = 'f3bc7a2a-3aee-48e3-b689-4a285a9448f5';

  new_pages := (current_pages->0) || jsonb_build_array(new_page) || (current_pages->1);

  UPDATE lessons
  SET content = jsonb_set(content, '{pages}', new_pages)
  WHERE id = 'f3bc7a2a-3aee-48e3-b689-4a285a9448f5';
END $$;
