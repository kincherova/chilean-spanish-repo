/*
  # Module 4: 5 Vocabulary Units

  Adds 5 "vocabulary-only" units to the "☕ Cafes & restaurants" module.
  Each unit has exactly 2 pages: a phrase_list page and a flashcards page.
  These are simpler than the standard 7-page units.

  ## New Vocabulary Units (order_index 5–9)
  5. Restaurant Vocabulary
  6. Café Vocabulary
  7. Food & Drinks
  8. Tea Time (Once)
  9. Words Related to Money

  ## Security
  - No new tables; uses existing RLS policies on modules, units, lessons
*/

-- ─── VOCAB UNIT 5: Restaurant Vocabulary ─────────────────────────────────────

WITH mod AS (SELECT id FROM modules WHERE title = '☕ Cafes & restaurants'),
new_unit AS (
  INSERT INTO units (id, module_id, title, description, order_index, estimated_minutes)
  SELECT gen_random_uuid(), mod.id, 'Restaurant Vocabulary', 'Essential words you''ll see and hear inside any Chilean restaurant — from furniture to cutlery.', 5, 6
  FROM mod
  RETURNING id
)
INSERT INTO lessons (id, unit_id, title, type, order_index, content)
SELECT
  gen_random_uuid(),
  new_unit.id,
  'Restaurant Vocabulary',
  'standard',
  1,
  '{
    "pages": [
      {
        "type": "phrase_list",
        "title": "Restaurant Vocabulary",
        "subtitle": "Words for places, furniture, and things you''ll find in a restaurant",
        "phrases": [
          { "spanish": "Mesa", "english": "Table", "reply": "", "isChilean": false },
          { "spanish": "Silla", "english": "Chair", "reply": "", "isChilean": false },
          { "spanish": "Barra", "english": "Bar / Counter", "reply": "", "isChilean": false },
          { "spanish": "Ventana", "english": "Window", "reply": "", "isChilean": false },
          { "spanish": "Terraza", "english": "Terrace / Outdoor seating", "reply": "", "isChilean": false },
          { "spanish": "Adentro", "english": "Inside", "reply": "", "isChilean": false },
          { "spanish": "Afuera", "english": "Outside", "reply": "", "isChilean": false },
          { "spanish": "Baño", "english": "Bathroom", "reply": "", "isChilean": false },
          { "spanish": "Tenedor", "english": "Fork", "reply": "", "isChilean": false },
          { "spanish": "Cuchillo", "english": "Knife", "reply": "", "isChilean": false },
          { "spanish": "Cuchara", "english": "Spoon", "reply": "", "isChilean": false },
          { "spanish": "Vaso", "english": "Glass", "reply": "", "isChilean": false },
          { "spanish": "Plato", "english": "Plate / Dish", "reply": "", "isChilean": false }
        ]
      },
      {
        "type": "flashcards",
        "title": "Test Your Memory",
        "dialogue": null
      }
    ]
  }'::jsonb
FROM new_unit;

-- ─── VOCAB UNIT 6: Café Vocabulary ───────────────────────────────────────────

WITH mod AS (SELECT id FROM modules WHERE title = '☕ Cafes & restaurants'),
new_unit AS (
  INSERT INTO units (id, module_id, title, description, order_index, estimated_minutes)
  SELECT gen_random_uuid(), mod.id, 'Café Vocabulary', 'Order coffee and drinks like a local — know your cortado from your café grande.', 6, 6
  FROM mod
  RETURNING id
)
INSERT INTO lessons (id, unit_id, title, type, order_index, content)
SELECT
  gen_random_uuid(),
  new_unit.id,
  'Café Vocabulary',
  'standard',
  1,
  '{
    "pages": [
      {
        "type": "phrase_list",
        "title": "Café Vocabulary",
        "subtitle": "Coffee and drink words you''ll need at any Chilean café",
        "phrases": [
          { "spanish": "Cortado", "english": "Cortado (espresso with a little milk)", "reply": "", "isChilean": false },
          { "spanish": "Café grande", "english": "Large coffee", "reply": "", "isChilean": false },
          { "spanish": "Café chico", "english": "Small coffee", "reply": "", "isChilean": false },
          { "spanish": "Con azúcar", "english": "With sugar", "reply": "", "isChilean": false },
          { "spanish": "Sin azúcar", "english": "Without sugar", "reply": "", "isChilean": false },
          { "spanish": "Con leche", "english": "With milk", "reply": "", "isChilean": false },
          { "spanish": "Sin leche", "english": "Without milk", "reply": "", "isChilean": false },
          { "spanish": "Agua con gas", "english": "Sparkling water", "reply": "", "isChilean": false },
          { "spanish": "Agua sin gas", "english": "Still water", "reply": "", "isChilean": false }
        ]
      },
      {
        "type": "flashcards",
        "title": "Test Your Memory",
        "dialogue": null
      }
    ]
  }'::jsonb
FROM new_unit;

-- ─── VOCAB UNIT 7: Food & Drinks ──────────────────────────────────────────────

WITH mod AS (SELECT id FROM modules WHERE title = '☕ Cafes & restaurants'),
new_unit AS (
  INSERT INTO units (id, module_id, title, description, order_index, estimated_minutes)
  SELECT gen_random_uuid(), mod.id, 'Food & Drinks', 'Core food and drink vocabulary — meals, ingredients, flavours, and common items on a Chilean menu.', 7, 6
  FROM mod
  RETURNING id
)
INSERT INTO lessons (id, unit_id, title, type, order_index, content)
SELECT
  gen_random_uuid(),
  new_unit.id,
  'Food & Drinks',
  'standard',
  1,
  '{
    "pages": [
      {
        "type": "phrase_list",
        "title": "Food & Drinks",
        "subtitle": "Meals, ingredients, flavours, and drinks you''ll find on any Chilean menu",
        "phrases": [
          { "spanish": "Desayuno", "english": "Breakfast", "reply": "", "isChilean": false },
          { "spanish": "Almuerzo", "english": "Lunch", "reply": "", "isChilean": false },
          { "spanish": "Cena", "english": "Dinner", "reply": "", "isChilean": false },
          { "spanish": "Pan", "english": "Bread", "reply": "", "isChilean": false },
          { "spanish": "Carne", "english": "Meat", "reply": "", "isChilean": false },
          { "spanish": "Pescado", "english": "Fish", "reply": "", "isChilean": false },
          { "spanish": "Pollo", "english": "Chicken", "reply": "", "isChilean": false },
          { "spanish": "Queso", "english": "Cheese", "reply": "", "isChilean": false },
          { "spanish": "Arroz", "english": "Rice", "reply": "", "isChilean": false },
          { "spanish": "Pasta", "english": "Pasta", "reply": "", "isChilean": false },
          { "spanish": "Papas", "english": "Potatoes (Chilean: also fries)", "reply": "", "isChilean": true },
          { "spanish": "Picante", "english": "Spicy", "reply": "", "isChilean": false },
          { "spanish": "Salado", "english": "Salty", "reply": "", "isChilean": false },
          { "spanish": "Dulce", "english": "Sweet", "reply": "", "isChilean": false },
          { "spanish": "Acompañamiento", "english": "Side dish", "reply": "", "isChilean": false },
          { "spanish": "Postre", "english": "Dessert", "reply": "", "isChilean": false },
          { "spanish": "Jugo", "english": "Juice", "reply": "", "isChilean": false },
          { "spanish": "Cerveza", "english": "Beer", "reply": "", "isChilean": false },
          { "spanish": "Vino", "english": "Wine", "reply": "", "isChilean": false },
          { "spanish": "Bebida", "english": "Soda / Soft drink", "reply": "", "isChilean": true }
        ]
      },
      {
        "type": "flashcards",
        "title": "Test Your Memory",
        "dialogue": null
      }
    ]
  }'::jsonb
FROM new_unit;

-- ─── VOCAB UNIT 8: Tea Time (Once) ───────────────────────────────────────────

WITH mod AS (SELECT id FROM modules WHERE title = '☕ Cafes & restaurants'),
new_unit AS (
  INSERT INTO units (id, module_id, title, description, order_index, estimated_minutes)
  SELECT gen_random_uuid(), mod.id, 'Tea Time (Once)', 'Learn the vocabulary for ''once'' — the Chilean light evening meal, similar to British tea time.', 8, 6
  FROM mod
  RETURNING id
)
INSERT INTO lessons (id, unit_id, title, type, order_index, content)
SELECT
  gen_random_uuid(),
  new_unit.id,
  'Tea Time (Once)',
  'standard',
  1,
  '{
    "pages": [
      {
        "type": "phrase_list",
        "title": "Tea Time (Once)",
        "subtitle": "Words for the Chilean ''once'' — a light evening meal with tea, toast, and snacks",
        "phrases": [
          { "spanish": "Once", "english": "Light evening meal / tea time (Chilean tradition)", "reply": "", "isChilean": true },
          { "spanish": "Tostadas", "english": "Toast", "reply": "", "isChilean": false },
          { "spanish": "Palta", "english": "Avocado (Chilean word)", "reply": "", "isChilean": true },
          { "spanish": "Queso", "english": "Cheese", "reply": "", "isChilean": false },
          { "spanish": "Jamón", "english": "Ham", "reply": "", "isChilean": false },
          { "spanish": "Huevo", "english": "Egg", "reply": "", "isChilean": false },
          { "spanish": "Pastel", "english": "Cake / Pastry", "reply": "", "isChilean": false },
          { "spanish": "Torta", "english": "Cake (layered)", "reply": "", "isChilean": false },
          { "spanish": "Queque", "english": "Cake / Pound cake (Chilean word)", "reply": "", "isChilean": true },
          { "spanish": "Sándwich", "english": "Sandwich", "reply": "", "isChilean": false },
          { "spanish": "Empanada", "english": "Empanada (stuffed pastry)", "reply": "", "isChilean": false }
        ]
      },
      {
        "type": "flashcards",
        "title": "Test Your Memory",
        "dialogue": null
      }
    ]
  }'::jsonb
FROM new_unit;

-- ─── VOCAB UNIT 9: Words Related to Money ────────────────────────────────────

WITH mod AS (SELECT id FROM modules WHERE title = '☕ Cafes & restaurants'),
new_unit AS (
  INSERT INTO units (id, module_id, title, description, order_index, estimated_minutes)
  SELECT gen_random_uuid(), mod.id, 'Words Related to Money', 'All the payment vocabulary you need — from ''la cuenta'' to ''cuotas''.', 9, 6
  FROM mod
  RETURNING id
)
INSERT INTO lessons (id, unit_id, title, type, order_index, content)
SELECT
  gen_random_uuid(),
  new_unit.id,
  'Words Related to Money',
  'standard',
  1,
  '{
    "pages": [
      {
        "type": "phrase_list",
        "title": "Words Related to Money",
        "subtitle": "Payment vocabulary you''ll hear at restaurants, cafés, and shops",
        "phrases": [
          { "spanish": "La cuenta", "english": "The bill / The check", "reply": "", "isChilean": false },
          { "spanish": "La boleta", "english": "The receipt", "reply": "", "isChilean": false },
          { "spanish": "Propina", "english": "Tip / Gratuity", "reply": "", "isChilean": true },
          { "spanish": "Tarjeta", "english": "Card", "reply": "", "isChilean": false },
          { "spanish": "Débito", "english": "Debit", "reply": "", "isChilean": false },
          { "spanish": "Crédito", "english": "Credit", "reply": "", "isChilean": false },
          { "spanish": "Cuotas", "english": "Installments (paying in parts)", "reply": "", "isChilean": true },
          { "spanish": "Efectivo", "english": "Cash", "reply": "", "isChilean": false },
          { "spanish": "La plata", "english": "Money (Chilean slang)", "reply": "", "isChilean": true },
          { "spanish": "El cambio", "english": "The change (money back)", "reply": "", "isChilean": false }
        ]
      },
      {
        "type": "flashcards",
        "title": "Test Your Memory",
        "dialogue": null
      }
    ]
  }'::jsonb
FROM new_unit;
