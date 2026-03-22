/*
  # Add recall (typing) exercise to all 5 vocabulary units in Cafes & Restaurants module

  Appends a "recall" page at the end of each vocabulary lesson, after the flashcards page.
  The recall exercise asks users to type the Spanish word from memory given the English prompt.
  Answers are matched case-insensitively in the front-end.

  Units updated:
  - Restaurant Vocabulary (f246954a)
  - Cafe Vocabulary (ac12b29e)
  - Food & Drinks (b192f8cf)
  - Tea Time (Once) (1b73ff99)
  - Words Related to Money (f3bc7a2a)
*/

-- Restaurant Vocabulary
DO $$
DECLARE
  new_page jsonb;
  current_pages jsonb;
BEGIN
  new_page := '{
    "type": "recall",
    "title": "Recall",
    "items": [
      { "english": "Table", "spanish": "Mesa" },
      { "english": "Chair", "spanish": "Silla" },
      { "english": "Bar / Counter", "spanish": "Barra" },
      { "english": "Window", "spanish": "Ventana" },
      { "english": "Terrace / Outdoor seating", "spanish": "Terraza" },
      { "english": "Inside", "spanish": "Adentro" },
      { "english": "Outside", "spanish": "Afuera" },
      { "english": "Bathroom", "spanish": "Baño" },
      { "english": "Fork", "spanish": "Tenedor" },
      { "english": "Knife", "spanish": "Cuchillo" },
      { "english": "Spoon", "spanish": "Cuchara" },
      { "english": "Glass", "spanish": "Vaso" },
      { "english": "Plate / Dish", "spanish": "Plato" }
    ]
  }'::jsonb;

  SELECT content->'pages' INTO current_pages
  FROM lessons WHERE id = 'f246954a-1e1a-444d-b8f3-32c9e3296f4b';

  UPDATE lessons
  SET content = jsonb_set(content, '{pages}', current_pages || jsonb_build_array(new_page))
  WHERE id = 'f246954a-1e1a-444d-b8f3-32c9e3296f4b';
END $$;

-- Cafe Vocabulary
DO $$
DECLARE
  new_page jsonb;
  current_pages jsonb;
BEGIN
  new_page := '{
    "type": "recall",
    "title": "Recall",
    "items": [
      { "english": "Espresso with a little milk", "spanish": "Cortado" },
      { "english": "Large coffee", "spanish": "Cafe grande" },
      { "english": "Small coffee", "spanish": "Cafe chico" },
      { "english": "With sugar", "spanish": "Con azucar" },
      { "english": "Without sugar", "spanish": "Sin azucar" },
      { "english": "With milk", "spanish": "Con leche" },
      { "english": "Without milk", "spanish": "Sin leche" },
      { "english": "Sparkling water", "spanish": "Agua con gas" },
      { "english": "Still water", "spanish": "Agua sin gas" }
    ]
  }'::jsonb;

  SELECT content->'pages' INTO current_pages
  FROM lessons WHERE id = 'ac12b29e-d1b4-4fc0-aa62-7230b6d3af43';

  UPDATE lessons
  SET content = jsonb_set(content, '{pages}', current_pages || jsonb_build_array(new_page))
  WHERE id = 'ac12b29e-d1b4-4fc0-aa62-7230b6d3af43';
END $$;

-- Food & Drinks
DO $$
DECLARE
  new_page jsonb;
  current_pages jsonb;
BEGIN
  new_page := '{
    "type": "recall",
    "title": "Recall",
    "items": [
      { "english": "Breakfast", "spanish": "Desayuno" },
      { "english": "Lunch", "spanish": "Almuerzo" },
      { "english": "Dinner", "spanish": "Cena" },
      { "english": "Bread", "spanish": "Pan" },
      { "english": "Meat", "spanish": "Carne" },
      { "english": "Fish", "spanish": "Pescado" },
      { "english": "Chicken", "spanish": "Pollo" },
      { "english": "Cheese", "spanish": "Queso" },
      { "english": "Rice", "spanish": "Arroz" },
      { "english": "Spicy", "spanish": "Picante" },
      { "english": "Salty", "spanish": "Salado" },
      { "english": "Sweet", "spanish": "Dulce" },
      { "english": "Dessert", "spanish": "Postre" },
      { "english": "Juice", "spanish": "Jugo" },
      { "english": "Beer", "spanish": "Cerveza" },
      { "english": "Wine", "spanish": "Vino" }
    ]
  }'::jsonb;

  SELECT content->'pages' INTO current_pages
  FROM lessons WHERE id = 'b192f8cf-8d12-4864-abea-799fbf5ed202';

  UPDATE lessons
  SET content = jsonb_set(content, '{pages}', current_pages || jsonb_build_array(new_page))
  WHERE id = 'b192f8cf-8d12-4864-abea-799fbf5ed202';
END $$;

-- Tea Time (Once)
DO $$
DECLARE
  new_page jsonb;
  current_pages jsonb;
BEGIN
  new_page := '{
    "type": "recall",
    "title": "Recall",
    "items": [
      { "english": "Light evening meal / tea time", "spanish": "Once" },
      { "english": "Toast", "spanish": "Tostadas" },
      { "english": "Avocado (Chilean)", "spanish": "Palta" },
      { "english": "Cheese", "spanish": "Queso" },
      { "english": "Ham", "spanish": "Jamon" },
      { "english": "Egg", "spanish": "Huevo" },
      { "english": "Cake / Pastry", "spanish": "Pastel" },
      { "english": "Cake (layered)", "spanish": "Torta" },
      { "english": "Cake / Pound cake (Chilean)", "spanish": "Queque" },
      { "english": "Sandwich", "spanish": "Sandwich" },
      { "english": "Stuffed pastry", "spanish": "Empanada" }
    ]
  }'::jsonb;

  SELECT content->'pages' INTO current_pages
  FROM lessons WHERE id = '1b73ff99-ad18-45c0-839c-459663bc8fa9';

  UPDATE lessons
  SET content = jsonb_set(content, '{pages}', current_pages || jsonb_build_array(new_page))
  WHERE id = '1b73ff99-ad18-45c0-839c-459663bc8fa9';
END $$;

-- Words Related to Money
DO $$
DECLARE
  new_page jsonb;
  current_pages jsonb;
BEGIN
  new_page := '{
    "type": "recall",
    "title": "Recall",
    "items": [
      { "english": "The bill / The check", "spanish": "La cuenta" },
      { "english": "The receipt", "spanish": "La boleta" },
      { "english": "Tip / Gratuity", "spanish": "Propina" },
      { "english": "Card", "spanish": "Tarjeta" },
      { "english": "Debit", "spanish": "Debito" },
      { "english": "Credit", "spanish": "Credito" },
      { "english": "Installments", "spanish": "Cuotas" },
      { "english": "Cash", "spanish": "Efectivo" },
      { "english": "Money (Chilean slang)", "spanish": "La plata" },
      { "english": "The change (money back)", "spanish": "El cambio" }
    ]
  }'::jsonb;

  SELECT content->'pages' INTO current_pages
  FROM lessons WHERE id = 'f3bc7a2a-3aee-48e3-b689-4a285a9448f5';

  UPDATE lessons
  SET content = jsonb_set(content, '{pages}', current_pages || jsonb_build_array(new_page))
  WHERE id = 'f3bc7a2a-3aee-48e3-b689-4a285a9448f5';
END $$;
