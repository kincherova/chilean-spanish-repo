/*
  # Module 4: Cafes & Restaurants — 4 Regular Units

  Adds 4 standard units (each with 7 pages: overview, intro, multiple_choice,
  audio_choice, flashcards, dialogue, recap) to the existing
  "☕ Cafes & restaurants" module (order_index 4).

  ## New Units
  1. Arriving & Getting a Table (order_index 1)
  2. Reading the Menu & Ordering (order_index 2)
  3. Asking Questions & Clarifying (order_index 3)
  4. Paying the Bill & Tipping (order_index 4)

  ## Security
  - No new tables; uses existing RLS policies on modules, units, lessons
*/

-- ─── UNIT 1: Arriving & Getting a Table ──────────────────────────────────────

WITH mod AS (SELECT id FROM modules WHERE title = '☕ Cafes & restaurants'),
new_unit AS (
  INSERT INTO units (id, module_id, title, description, order_index, estimated_minutes)
  SELECT gen_random_uuid(), mod.id, 'Arriving & Getting a Table', 'Walk in confidently, ask for a table, and get settled in a Chilean restaurant or café.', 1, 12
  FROM mod
  RETURNING id
)
INSERT INTO lessons (id, unit_id, title, type, order_index, content)
SELECT
  gen_random_uuid(),
  new_unit.id,
  'Arriving & Getting a Table',
  'standard',
  1,
  '{
    "pages": [
      {
        "type": "overview",
        "title": "What You''ll Learn",
        "goal": "By the end of this unit, you''ll be able to walk into a café or restaurant, ask for a table, check if it''s open, find out where the bathroom is, and respond to basic host greetings.",
        "cultural_note": "In Chile, you usually wait to be seated, especially in restaurants. In small cafés, it''s normal to ask ''¿Hay mesa?'' and sit where they tell you. If a staff member says ''al tiro'' or ''un ratito'', it usually means soon — not exactly now."
      },
      {
        "type": "intro",
        "title": "Arriving & Getting a Table",
        "subtitle": "Phrases for walking in and getting settled",
        "phrases": [
          { "spanish": "Hola, ¿hay mesa?", "english": "Hi, is there a table?", "reply": "", "isChilean": false },
          { "spanish": "¿Mesa para uno?", "english": "Table for one?", "reply": "", "isChilean": false },
          { "spanish": "¿Está abierto?", "english": "Are you open?", "reply": "", "isChilean": false },
          { "spanish": "¿Está cerrado?", "english": "Are you closed?", "reply": "", "isChilean": false },
          { "spanish": "¿Tiene reserva?", "english": "Do you have a reservation?", "reply": "", "isChilean": false },
          { "spanish": "¿Nos sentamos acá?", "english": "Can we sit here?", "reply": "", "isChilean": false },
          { "spanish": "¿Aquí está bien?", "english": "Is here okay?", "reply": "", "isChilean": false },
          { "spanish": "¿Dónde está el baño?", "english": "Where is the bathroom?", "reply": "", "isChilean": false },
          { "spanish": "Un momento, por favor", "english": "One moment, please", "reply": "", "isChilean": false },
          { "spanish": "Pase, por favor", "english": "Come in / This way, please", "reply": "", "isChilean": false },
          { "spanish": "Por acá", "english": "This way", "reply": "", "isChilean": false },
          { "spanish": "Ahora le atienden", "english": "Someone will attend to you now", "reply": "", "isChilean": false },
          { "spanish": "Gracias, muy amable", "english": "Thank you, very kind", "reply": "", "isChilean": false }
        ]
      },
      {
        "type": "multiple_choice",
        "title": "This or That",
        "items": [
          {
            "phrase": "Hola, ¿hay mesa?",
            "question": "What are you asking?",
            "options": ["Is the restaurant good?", "Is there a table available?", "Can I see the menu?", "Is there a reservation?"],
            "correctAnswer": 1
          },
          {
            "phrase": "¿Tiene reserva?",
            "question": "Who would say this?",
            "options": ["A tourist asking for the menu.", "A host asking if you have a reservation.", "A waiter asking what you want.", "A customer asking for the bill."],
            "correctAnswer": 1
          },
          {
            "phrase": "¿Dónde está el baño?",
            "question": "What does this ask?",
            "options": ["Where is the kitchen?", "Where is the exit?", "Where is the bathroom?", "Where is the table?"],
            "correctAnswer": 2
          },
          {
            "phrase": "Por acá",
            "question": "What does this mean?",
            "options": ["Over there.", "This way.", "Sit down.", "Come back."],
            "correctAnswer": 1
          },
          {
            "phrase": "Ahora le atienden",
            "question": "What does this mean?",
            "options": ["We are closed.", "Come back later.", "Someone will attend to you now.", "The table is ready."],
            "correctAnswer": 2
          },
          {
            "phrase": "¿Está abierto?",
            "question": "What are you checking?",
            "options": ["If the food is good.", "If they have a table.", "If the place is open.", "If you need a reservation."],
            "correctAnswer": 2
          },
          {
            "phrase": "¿Nos sentamos acá?",
            "question": "What are you asking?",
            "options": ["Can we see the menu?", "Can we sit here?", "Is this table taken?", "Is there space inside?"],
            "correctAnswer": 1
          },
          {
            "phrase": "Pase, por favor",
            "question": "What does this mean?",
            "options": ["Wait outside.", "Go to the bar.", "Come in / This way, please.", "Please be quiet."],
            "correctAnswer": 2
          },
          {
            "phrase": "Gracias, muy amable",
            "question": "What does ''muy amable'' mean?",
            "options": ["Very welcome.", "Very kind.", "Very good.", "Very close."],
            "correctAnswer": 1
          }
        ]
      },
      {
        "type": "audio_choice",
        "title": "Hear and React",
        "items": [
          { "question": "What phrase do you hear?", "options": ["¿Hay mesa?", "¿Tiene reserva?", "Por acá", "¿Está abierto?"], "correctAnswer": 0 },
          { "question": "What phrase do you hear?", "options": ["Pase, por favor", "Ahora le atienden", "Un momento, por favor", "Por acá"], "correctAnswer": 2 },
          { "question": "What phrase do you hear?", "options": ["¿Dónde está el baño?", "¿Aquí está bien?", "¿Nos sentamos acá?", "¿Mesa para uno?"], "correctAnswer": 3 },
          { "question": "What phrase do you hear?", "options": ["¿Está cerrado?", "¿Está abierto?", "Pase, por favor", "Por acá"], "correctAnswer": 0 },
          { "question": "What phrase do you hear?", "options": ["Ahora le atienden", "Por acá", "Gracias, muy amable", "Un momento, por favor"], "correctAnswer": 2 },
          { "question": "What phrase do you hear?", "options": ["¿Nos sentamos acá?", "¿Aquí está bien?", "¿Tiene reserva?", "¿Hay mesa?"], "correctAnswer": 1 },
          { "question": "What phrase do you hear?", "options": ["Por acá", "Pase, por favor", "Ahora le atienden", "Un momento, por favor"], "correctAnswer": 1 },
          { "question": "What phrase do you hear?", "options": ["¿Mesa para uno?", "¿Hay mesa?", "¿Está abierto?", "¿Dónde está el baño?"], "correctAnswer": 3 },
          { "question": "What phrase do you hear?", "options": ["Gracias, muy amable", "Por acá", "Pase, por favor", "Ahora le atienden"], "correctAnswer": 0 }
        ]
      },
      {
        "type": "flashcards",
        "title": "Test Your Memory",
        "dialogue": null
      },
      {
        "type": "dialogue",
        "title": "Read a Real Conversation",
        "subtitle": "A tourist arriving at a restaurant in Santiago",
        "dialogue": [
          { "speaker": "tourist", "spanish": "Hola, ¿está abierto?" },
          { "speaker": "local", "spanish": "Sí, pase, por favor." },
          { "speaker": "tourist", "spanish": "¿Hay mesa para dos?" },
          { "speaker": "local", "spanish": "¿Tiene reserva?" },
          { "speaker": "tourist", "spanish": "No, no tengo reserva." },
          { "speaker": "local", "spanish": "No hay problema. Por acá." },
          { "speaker": "tourist", "spanish": "¿Aquí está bien?" },
          { "speaker": "local", "spanish": "Claro, ahora le atienden." },
          { "speaker": "tourist", "spanish": "Gracias, muy amable. ¿Dónde está el baño?" },
          { "speaker": "local", "spanish": "Al fondo, a la derecha." }
        ]
      },
      {
        "type": "recap",
        "title": "Well done!",
        "dialogue": [
          { "speaker": "tourist", "name": "Alex (Tourist)", "spanish": "Hola, ¿está abierto?" },
          { "speaker": "local", "name": "Host", "spanish": "Sí, pase, por favor." },
          { "speaker": "tourist", "name": "Alex (Tourist)", "spanish": "¿Hay mesa para dos?" },
          { "speaker": "local", "name": "Host", "spanish": "¿Tiene reserva?" },
          { "speaker": "tourist", "name": "Alex (Tourist)", "spanish": "No, no tengo reserva." },
          { "speaker": "local", "name": "Host", "spanish": "No hay problema. Por acá." },
          { "speaker": "tourist", "name": "Alex (Tourist)", "spanish": "¿Aquí está bien?" },
          { "speaker": "local", "name": "Host", "spanish": "Claro, ahora le atienden." },
          { "speaker": "tourist", "name": "Alex (Tourist)", "spanish": "Gracias, muy amable. ¿Dónde está el baño?" },
          { "speaker": "local", "name": "Host", "spanish": "Al fondo, a la derecha." }
        ]
      }
    ]
  }'::jsonb
FROM new_unit;

-- ─── UNIT 2: Reading the Menu & Ordering ─────────────────────────────────────

WITH mod AS (SELECT id FROM modules WHERE title = '☕ Cafes & restaurants'),
new_unit AS (
  INSERT INTO units (id, module_id, title, description, order_index, estimated_minutes)
  SELECT gen_random_uuid(), mod.id, 'Reading the Menu & Ordering', 'Ask for the menu, say what you want, share dietary needs, and understand what the waiter asks you.', 2, 12
  FROM mod
  RETURNING id
)
INSERT INTO lessons (id, unit_id, title, type, order_index, content)
SELECT
  gen_random_uuid(),
  new_unit.id,
  'Reading the Menu & Ordering',
  'standard',
  1,
  '{
    "pages": [
      {
        "type": "overview",
        "title": "What You''ll Learn",
        "goal": "By the end of this unit, you''ll be able to ask for the menu, express hunger or thirst, order food and drinks, mention dietary restrictions, and respond to common waiter questions.",
        "cultural_note": "Many places offer a ''menú del día'' or ''menú ejecutivo'' at lunchtime. It''s cheaper and usually includes a main dish, a drink, and sometimes dessert. If you''re not sure what to order, asking ''¿Qué me recomienda?'' is very common here."
      },
      {
        "type": "intro",
        "title": "Reading the Menu & Ordering",
        "subtitle": "Phrases for looking at the menu and placing your order",
        "phrases": [
          { "spanish": "¿La carta, por favor?", "english": "The menu, please?", "reply": "", "isChilean": false },
          { "spanish": "¿Hay carta en inglés?", "english": "Is there a menu in English?", "reply": "", "isChilean": false },
          { "spanish": "Tengo hambre", "english": "I''m hungry", "reply": "", "isChilean": false },
          { "spanish": "Tengo sed", "english": "I''m thirsty", "reply": "", "isChilean": false },
          { "spanish": "¿Tienen menú?", "english": "Do you have a set menu? (executive lunch)", "reply": "", "isChilean": true },
          { "spanish": "Quiero…", "english": "I want…", "reply": "", "isChilean": false },
          { "spanish": "¿Es para compartir?", "english": "Is it to share?", "reply": "", "isChilean": false },
          { "spanish": "¿Qué quiere para tomar?", "english": "What do you want to drink?", "reply": "", "isChilean": false },
          { "spanish": "¿Qué me recomienda?", "english": "What do you recommend?", "reply": "", "isChilean": false },
          { "spanish": "Soy vegetariano / Soy vegetariana", "english": "I''m vegetarian (m/f)", "reply": "", "isChilean": false },
          { "spanish": "Soy alérgico / Soy alérgica", "english": "I''m allergic (m/f)", "reply": "", "isChilean": false },
          { "spanish": "¡Sin picante, por favor!", "english": "Without spice, please!", "reply": "", "isChilean": false },
          { "spanish": "¿Le traigo algo más?", "english": "Can I bring you anything else?", "reply": "", "isChilean": false },
          { "spanish": "Eso no más", "english": "That''s all / Nothing else", "reply": "", "isChilean": true },
          { "spanish": "Se lo traigo altiro", "english": "I''ll bring it right away", "reply": "", "isChilean": true },
          { "spanish": "Muy rico", "english": "Very tasty / Delicious", "reply": "", "isChilean": true },
          { "spanish": "Salud!", "english": "Cheers!", "reply": "", "isChilean": false }
        ]
      },
      {
        "type": "multiple_choice",
        "title": "This or That",
        "items": [
          {
            "phrase": "¿La carta, por favor?",
            "question": "What are you asking for?",
            "options": ["The bill.", "The menu.", "A recommendation.", "The set lunch."],
            "correctAnswer": 1
          },
          {
            "phrase": "¿Tienen menú?",
            "question": "What kind of ''menú'' are you asking about in Chilean context?",
            "options": ["The printed menu.", "A children''s menu.", "A set executive lunch.", "A drinks menu."],
            "correctAnswer": 2
          },
          {
            "phrase": "Eso no más",
            "question": "What does this Chilean expression mean?",
            "options": ["That''s great!", "That''s all / Nothing else.", "One more please.", "That''s enough for now."],
            "correctAnswer": 1
          },
          {
            "phrase": "Se lo traigo altiro",
            "question": "What does ''altiro'' indicate?",
            "options": ["Much later.", "Right away.", "When it''s ready.", "After a while."],
            "correctAnswer": 1
          },
          {
            "phrase": "¿Qué me recomienda?",
            "question": "What are you asking the waiter?",
            "options": ["What is the price?", "What do you recommend?", "What is the special?", "What comes with it?"],
            "correctAnswer": 1
          },
          {
            "phrase": "¿Le traigo algo más?",
            "question": "What is the waiter offering?",
            "options": ["The bill.", "Another table.", "Anything else.", "A recommendation."],
            "correctAnswer": 2
          },
          {
            "phrase": "Muy rico",
            "question": "What does this mean?",
            "options": ["Very expensive.", "Very popular.", "Very tasty.", "Very big."],
            "correctAnswer": 2
          },
          {
            "phrase": "Soy vegetariano",
            "question": "Why would you say this?",
            "options": ["To order a specific dish.", "To tell the waiter your dietary preference.", "To ask what comes with a dish.", "To ask for the menu."],
            "correctAnswer": 1
          },
          {
            "phrase": "¿Qué quiere para tomar?",
            "question": "What is the waiter asking?",
            "options": ["What do you want to eat?", "What do you want to drink?", "What would you like for dessert?", "What time do you want to order?"],
            "correctAnswer": 1
          }
        ]
      },
      {
        "type": "audio_choice",
        "title": "Hear and React",
        "items": [
          { "question": "What phrase do you hear?", "options": ["¿La carta, por favor?", "Tengo hambre", "Quiero…", "¿Tienen menú?"], "correctAnswer": 0 },
          { "question": "What phrase do you hear?", "options": ["Se lo traigo altiro", "¿Le traigo algo más?", "Eso no más", "Muy rico"], "correctAnswer": 1 },
          { "question": "What phrase do you hear?", "options": ["Tengo sed", "Tengo hambre", "Salud!", "Muy rico"], "correctAnswer": 0 },
          { "question": "What phrase do you hear?", "options": ["¿Qué me recomienda?", "¿Es para compartir?", "¿Qué quiere para tomar?", "¿Hay carta en inglés?"], "correctAnswer": 2 },
          { "question": "What phrase do you hear?", "options": ["Eso no más", "Muy rico", "Se lo traigo altiro", "Salud!"], "correctAnswer": 3 },
          { "question": "What phrase do you hear?", "options": ["Soy vegetariano", "¡Sin picante, por favor!", "Soy alérgico", "Quiero…"], "correctAnswer": 1 },
          { "question": "What phrase do you hear?", "options": ["¿Tienen menú?", "¿La carta, por favor?", "¿Hay carta en inglés?", "¿Qué me recomienda?"], "correctAnswer": 2 },
          { "question": "What phrase do you hear?", "options": ["¿Es para compartir?", "Quiero…", "Tengo hambre", "Eso no más"], "correctAnswer": 1 },
          { "question": "What phrase do you hear?", "options": ["Muy rico", "Se lo traigo altiro", "Eso no más", "Salud!"], "correctAnswer": 1 }
        ]
      },
      {
        "type": "flashcards",
        "title": "Test Your Memory",
        "dialogue": null
      },
      {
        "type": "dialogue",
        "title": "Read a Real Conversation",
        "subtitle": "A tourist ordering lunch at a Santiago restaurant",
        "dialogue": [
          { "speaker": "tourist", "spanish": "Hola, ¿la carta, por favor?" },
          { "speaker": "local", "spanish": "Claro, aquí tiene. ¿Tienen menú hoy?" },
          { "speaker": "tourist", "spanish": "Sí, hay menú ejecutivo. ¿Qué quiere para tomar?" },
          { "speaker": "local", "spanish": "Agua sin gas, por favor." },
          { "speaker": "tourist", "spanish": "¿Qué me recomienda?" },
          { "speaker": "local", "spanish": "El lomo está muy rico hoy." },
          { "speaker": "tourist", "spanish": "Quiero el lomo. ¡Sin picante, por favor! Soy alérgico." },
          { "speaker": "local", "spanish": "Sin problema. Se lo traigo altiro." },
          { "speaker": "tourist", "spanish": "¿Le traigo algo más?" },
          { "speaker": "local", "spanish": "Eso no más, gracias. Salud!" }
        ]
      },
      {
        "type": "recap",
        "title": "Well done!",
        "dialogue": [
          { "speaker": "tourist", "name": "Alex (Tourist)", "spanish": "Hola, ¿la carta, por favor?" },
          { "speaker": "local", "name": "Waiter", "spanish": "Claro, aquí tiene. ¿Tienen menú hoy?" },
          { "speaker": "tourist", "name": "Alex (Tourist)", "spanish": "Sí, hay menú ejecutivo. ¿Qué quiere para tomar?" },
          { "speaker": "local", "name": "Waiter", "spanish": "Agua sin gas, por favor." },
          { "speaker": "tourist", "name": "Alex (Tourist)", "spanish": "¿Qué me recomienda?" },
          { "speaker": "local", "name": "Waiter", "spanish": "El lomo está muy rico hoy." },
          { "speaker": "tourist", "name": "Alex (Tourist)", "spanish": "Quiero el lomo. ¡Sin picante, por favor! Soy alérgico." },
          { "speaker": "local", "name": "Waiter", "spanish": "Sin problema. Se lo traigo altiro." },
          { "speaker": "tourist", "name": "Alex (Tourist)", "spanish": "¿Le traigo algo más?" },
          { "speaker": "local", "name": "Waiter", "spanish": "Eso no más, gracias. Salud!" }
        ]
      }
    ]
  }'::jsonb
FROM new_unit;

-- ─── UNIT 3: Asking Questions & Clarifying ───────────────────────────────────

WITH mod AS (SELECT id FROM modules WHERE title = '☕ Cafes & restaurants'),
new_unit AS (
  INSERT INTO units (id, module_id, title, description, order_index, estimated_minutes)
  SELECT gen_random_uuid(), mod.id, 'Asking Questions & Clarifying', 'Ask what''s in a dish, clarify your order, and handle mistakes without stress.', 3, 12
  FROM mod
  RETURNING id
)
INSERT INTO lessons (id, unit_id, title, type, order_index, content)
SELECT
  gen_random_uuid(),
  new_unit.id,
  'Asking Questions & Clarifying',
  'standard',
  1,
  '{
    "pages": [
      {
        "type": "overview",
        "title": "What You''ll Learn",
        "goal": "By the end of this unit, you''ll be able to ask what a dish is, what comes with it, point out if something is missing or wrong, and stay calm when it doesn''t go perfectly.",
        "cultural_note": "Asking questions about food is totally normal in Chile. You can ask what something is or what it comes with and it won''t sound rude. Short questions are fine — you don''t need full, long sentences."
      },
      {
        "type": "intro",
        "title": "Asking Questions & Clarifying",
        "subtitle": "Phrases for understanding your order and fixing mistakes",
        "phrases": [
          { "spanish": "¿Qué significa…?", "english": "What does … mean?", "reply": "", "isChilean": false },
          { "spanish": "¿Qué incluye?", "english": "What does it include? (a dish)", "reply": "", "isChilean": false },
          { "spanish": "¿Qué es?", "english": "What is it? (a dish)", "reply": "", "isChilean": false },
          { "spanish": "¿Con qué viene?", "english": "What does it come with? (side dish)", "reply": "", "isChilean": false },
          { "spanish": "Entonces…", "english": "So… / Then…", "reply": "", "isChilean": false },
          { "spanish": "Falta algo", "english": "Something is missing", "reply": "", "isChilean": false },
          { "spanish": "Esto no es lo que pedí", "english": "This is not what I ordered", "reply": "", "isChilean": false },
          { "spanish": "Pedí otra cosa", "english": "I ordered something else", "reply": "", "isChilean": false },
          { "spanish": "Está bien igual", "english": "It''s fine anyway (I''ll keep it)", "reply": "", "isChilean": true }
        ]
      },
      {
        "type": "multiple_choice",
        "title": "This or That",
        "items": [
          {
            "phrase": "¿Qué incluye?",
            "question": "When would you use this?",
            "options": ["To ask the price of a dish.", "To ask what a dish comes with.", "To ask if the dish is spicy.", "To ask for a recommendation."],
            "correctAnswer": 1
          },
          {
            "phrase": "¿Con qué viene?",
            "question": "What are you asking about?",
            "options": ["The price.", "The main ingredient.", "The side dish.", "The portion size."],
            "correctAnswer": 2
          },
          {
            "phrase": "Falta algo",
            "question": "What does this mean?",
            "options": ["It''s all here.", "Something is missing.", "I ordered too much.", "Everything is wrong."],
            "correctAnswer": 1
          },
          {
            "phrase": "Esto no es lo que pedí",
            "question": "What are you telling the waiter?",
            "options": ["This is delicious.", "This is not what I ordered.", "I don''t want this anymore.", "This is too expensive."],
            "correctAnswer": 1
          },
          {
            "phrase": "Está bien igual",
            "question": "What does this Chilean expression mean?",
            "options": ["It''s not okay at all.", "I''ll complain later.", "It''s fine anyway, I''ll keep it.", "Everything is the same."],
            "correctAnswer": 2
          },
          {
            "phrase": "¿Qué significa…?",
            "question": "What are you asking?",
            "options": ["What does … mean?", "What is the price of…?", "What does … come with?", "What is … made of?"],
            "correctAnswer": 0
          },
          {
            "phrase": "Pedí otra cosa",
            "question": "What are you saying?",
            "options": ["I want more.", "I ordered something else.", "I don''t want to order.", "I ordered this."],
            "correctAnswer": 1
          },
          {
            "phrase": "¿Qué es?",
            "question": "When would you use this at a restaurant?",
            "options": ["To ask how much something costs.", "To ask what a dish on the menu is.", "To ask if something is spicy.", "To ask for the bill."],
            "correctAnswer": 1
          },
          {
            "phrase": "Entonces…",
            "question": "What role does this word play in conversation?",
            "options": ["It ends a sentence.", "It signals a question.", "It connects or summarizes: ''so…'' or ''then…''", "It expresses surprise."],
            "correctAnswer": 2
          }
        ]
      },
      {
        "type": "audio_choice",
        "title": "Hear and React",
        "items": [
          { "question": "What phrase do you hear?", "options": ["¿Qué es?", "¿Qué incluye?", "¿Con qué viene?", "¿Qué significa…?"], "correctAnswer": 3 },
          { "question": "What phrase do you hear?", "options": ["Falta algo", "Pedí otra cosa", "Está bien igual", "Esto no es lo que pedí"], "correctAnswer": 0 },
          { "question": "What phrase do you hear?", "options": ["¿Qué incluye?", "¿Con qué viene?", "¿Qué es?", "Entonces…"], "correctAnswer": 2 },
          { "question": "What phrase do you hear?", "options": ["Está bien igual", "Esto no es lo que pedí", "Pedí otra cosa", "Falta algo"], "correctAnswer": 1 },
          { "question": "What phrase do you hear?", "options": ["Entonces…", "¿Qué significa…?", "¿Qué incluye?", "¿Con qué viene?"], "correctAnswer": 3 },
          { "question": "What phrase do you hear?", "options": ["Pedí otra cosa", "Falta algo", "Está bien igual", "Esto no es lo que pedí"], "correctAnswer": 2 },
          { "question": "What phrase do you hear?", "options": ["¿Qué es?", "Entonces…", "¿Qué significa…?", "¿Qué incluye?"], "correctAnswer": 1 },
          { "question": "What phrase do you hear?", "options": ["Esto no es lo que pedí", "Pedí otra cosa", "¿Con qué viene?", "Falta algo"], "correctAnswer": 3 },
          { "question": "What phrase do you hear?", "options": ["¿Qué incluye?", "¿Qué es?", "Está bien igual", "Entonces…"], "correctAnswer": 0 }
        ]
      },
      {
        "type": "flashcards",
        "title": "Test Your Memory",
        "dialogue": null
      },
      {
        "type": "dialogue",
        "title": "Read a Real Conversation",
        "subtitle": "A tourist clarifying their order at a restaurant",
        "dialogue": [
          { "speaker": "tourist", "spanish": "¿Qué es el ''churrasco''?" },
          { "speaker": "local", "spanish": "Es un sándwich con carne." },
          { "speaker": "tourist", "spanish": "¿Con qué viene?" },
          { "speaker": "local", "spanish": "Viene con papas fritas." },
          { "speaker": "tourist", "spanish": "Entonces quiero eso." },
          { "speaker": "local", "spanish": "Perfecto." },
          { "speaker": "tourist", "spanish": "Espera… esto no es lo que pedí. Pedí el churrasco." },
          { "speaker": "local", "spanish": "¡Lo siento! Ahora se lo cambio." },
          { "speaker": "tourist", "spanish": "Está bien igual, no hay problema." }
        ]
      },
      {
        "type": "recap",
        "title": "Well done!",
        "dialogue": [
          { "speaker": "tourist", "name": "Alex (Tourist)", "spanish": "¿Qué es el ''churrasco''?" },
          { "speaker": "local", "name": "Waiter", "spanish": "Es un sándwich con carne." },
          { "speaker": "tourist", "name": "Alex (Tourist)", "spanish": "¿Con qué viene?" },
          { "speaker": "local", "name": "Waiter", "spanish": "Viene con papas fritas." },
          { "speaker": "tourist", "name": "Alex (Tourist)", "spanish": "Entonces quiero eso." },
          { "speaker": "local", "name": "Waiter", "spanish": "Perfecto." },
          { "speaker": "tourist", "name": "Alex (Tourist)", "spanish": "Espera… esto no es lo que pedí. Pedí el churrasco." },
          { "speaker": "local", "name": "Waiter", "spanish": "¡Lo siento! Ahora se lo cambio." },
          { "speaker": "tourist", "name": "Alex (Tourist)", "spanish": "Está bien igual, no hay problema." }
        ]
      }
    ]
  }'::jsonb
FROM new_unit;

-- ─── UNIT 4: Paying the Bill & Tipping ───────────────────────────────────────

WITH mod AS (SELECT id FROM modules WHERE title = '☕ Cafes & restaurants'),
new_unit AS (
  INSERT INTO units (id, module_id, title, description, order_index, estimated_minutes)
  SELECT gen_random_uuid(), mod.id, 'Paying the Bill & Tipping', 'Ask for the bill, choose how to pay, and handle tipping the Chilean way.', 4, 12
  FROM mod
  RETURNING id
)
INSERT INTO lessons (id, unit_id, title, type, order_index, content)
SELECT
  gen_random_uuid(),
  new_unit.id,
  'Paying the Bill & Tipping',
  'standard',
  1,
  '{
    "pages": [
      {
        "type": "overview",
        "title": "What You''ll Learn",
        "goal": "By the end of this unit, you''ll be able to ask for the bill, say how you want to pay, understand payment questions from staff, and navigate tipping culture in Chile.",
        "cultural_note": "In Chile, tipping is usually suggested, not automatic. When you pay, they''ll often ask ''¿Desea agregar la propina?'' — usually it''s 10%. Paying by card is very common, and you might hear ''¿Débito o crédito?''. Paying in cuotas (installments) is normal here, even in restaurants."
      },
      {
        "type": "intro",
        "title": "Paying the Bill & Tipping",
        "subtitle": "Phrases for settling the bill the Chilean way",
        "phrases": [
          { "spanish": "¿La cuenta, por favor?", "english": "The bill, please?", "reply": "", "isChilean": false },
          { "spanish": "¿Todo junto o separado?", "english": "All together or separate?", "reply": "", "isChilean": false },
          { "spanish": "¿Paga con tarjeta?", "english": "Are you paying by card?", "reply": "", "isChilean": false },
          { "spanish": "Pago en efectivo", "english": "I''ll pay cash", "reply": "", "isChilean": false },
          { "spanish": "¿Hay un cajero cerca?", "english": "Is there an ATM nearby?", "reply": "", "isChilean": false },
          { "spanish": "¿Débito o crédito?", "english": "Debit or credit?", "reply": "", "isChilean": true },
          { "spanish": "¿En cuotas?", "english": "In installments?", "reply": "", "isChilean": true },
          { "spanish": "¿Desea agregar la propina?", "english": "Would you like to add the gratuity?", "reply": "", "isChilean": true },
          { "spanish": "Sí, diez por ciento", "english": "Yes, ten percent", "reply": "", "isChilean": false },
          { "spanish": "No, sin propina", "english": "No, without tip", "reply": "", "isChilean": false }
        ]
      },
      {
        "type": "multiple_choice",
        "title": "This or That",
        "items": [
          {
            "phrase": "¿La cuenta, por favor?",
            "question": "What are you asking for?",
            "options": ["The menu.", "The receipt.", "The bill.", "The tip."],
            "correctAnswer": 2
          },
          {
            "phrase": "¿Todo junto o separado?",
            "question": "What is the waiter asking?",
            "options": ["Do you want dessert?", "Will you pay all together or separately?", "Are you finished?", "Do you want more?"],
            "correctAnswer": 1
          },
          {
            "phrase": "¿Desea agregar la propina?",
            "question": "What are you being asked?",
            "options": ["Do you want a receipt?", "Would you like to pay by card?", "Would you like to add the gratuity?", "Do you have cash?"],
            "correctAnswer": 2
          },
          {
            "phrase": "¿En cuotas?",
            "question": "What does this Chilean option mean?",
            "options": ["Cash payment.", "By debit card.", "In installments.", "All at once."],
            "correctAnswer": 2
          },
          {
            "phrase": "Pago en efectivo",
            "question": "What does ''efectivo'' mean?",
            "options": ["card", "cash", "debit", "transfer"],
            "correctAnswer": 1
          },
          {
            "phrase": "¿Hay un cajero cerca?",
            "question": "What are you looking for?",
            "options": ["A restaurant nearby.", "A supermarket.", "An ATM nearby.", "A taxi."],
            "correctAnswer": 2
          },
          {
            "phrase": "¿Débito o crédito?",
            "question": "When would you hear this?",
            "options": ["When ordering food.", "When asking for a menu.", "When choosing how to pay by card.", "When asking for the bill."],
            "correctAnswer": 2
          },
          {
            "phrase": "Sí, diez por ciento",
            "question": "What are you agreeing to?",
            "options": ["Pay a 10% service charge.", "Divide the bill 10 ways.", "Leave no tip.", "Pay 10 pesos extra."],
            "correctAnswer": 0
          },
          {
            "phrase": "¿Paga con tarjeta?",
            "question": "What is the waiter asking?",
            "options": ["Will you pay cash?", "Are you paying by card?", "Do you have change?", "Are you splitting the bill?"],
            "correctAnswer": 1
          }
        ]
      },
      {
        "type": "audio_choice",
        "title": "Hear and React",
        "items": [
          { "question": "What phrase do you hear?", "options": ["¿La cuenta, por favor?", "Pago en efectivo", "¿Débito o crédito?", "No, sin propina"], "correctAnswer": 0 },
          { "question": "What phrase do you hear?", "options": ["¿En cuotas?", "¿Débito o crédito?", "¿Desea agregar la propina?", "¿Todo junto o separado?"], "correctAnswer": 2 },
          { "question": "What phrase do you hear?", "options": ["Sí, diez por ciento", "No, sin propina", "Pago en efectivo", "¿Paga con tarjeta?"], "correctAnswer": 1 },
          { "question": "What phrase do you hear?", "options": ["¿Hay un cajero cerca?", "¿La cuenta, por favor?", "¿Todo junto o separado?", "¿En cuotas?"], "correctAnswer": 3 },
          { "question": "What phrase do you hear?", "options": ["¿Débito o crédito?", "¿Desea agregar la propina?", "¿En cuotas?", "Pago en efectivo"], "correctAnswer": 0 },
          { "question": "What phrase do you hear?", "options": ["No, sin propina", "Sí, diez por ciento", "¿La cuenta, por favor?", "¿Paga con tarjeta?"], "correctAnswer": 3 },
          { "question": "What phrase do you hear?", "options": ["¿Todo junto o separado?", "¿Hay un cajero cerca?", "Pago en efectivo", "¿Desea agregar la propina?"], "correctAnswer": 1 },
          { "question": "What phrase do you hear?", "options": ["¿En cuotas?", "¿Débito o crédito?", "Sí, diez por ciento", "¿La cuenta, por favor?"], "correctAnswer": 2 },
          { "question": "What phrase do you hear?", "options": ["Pago en efectivo", "No, sin propina", "¿Hay un cajero cerca?", "¿Todo junto o separado?"], "correctAnswer": 0 }
        ]
      },
      {
        "type": "flashcards",
        "title": "Test Your Memory",
        "dialogue": null
      },
      {
        "type": "dialogue",
        "title": "Read a Real Conversation",
        "subtitle": "A tourist paying the bill at a Santiago restaurant",
        "dialogue": [
          { "speaker": "tourist", "spanish": "¿La cuenta, por favor?" },
          { "speaker": "local", "spanish": "Claro. ¿Todo junto o separado?" },
          { "speaker": "tourist", "spanish": "Todo junto." },
          { "speaker": "local", "spanish": "Son doce mil pesos. ¿Paga con tarjeta?" },
          { "speaker": "tourist", "spanish": "Sí. ¿Débito o crédito?" },
          { "speaker": "local", "spanish": "Ambos. ¿En cuotas?" },
          { "speaker": "tourist", "spanish": "No, pago de una vez." },
          { "speaker": "local", "spanish": "¿Desea agregar la propina?" },
          { "speaker": "tourist", "spanish": "Sí, diez por ciento. Estuvo muy rico todo." }
        ]
      },
      {
        "type": "recap",
        "title": "Well done!",
        "dialogue": [
          { "speaker": "tourist", "name": "Alex (Tourist)", "spanish": "¿La cuenta, por favor?" },
          { "speaker": "local", "name": "Waiter", "spanish": "Claro. ¿Todo junto o separado?" },
          { "speaker": "tourist", "name": "Alex (Tourist)", "spanish": "Todo junto." },
          { "speaker": "local", "name": "Waiter", "spanish": "Son doce mil pesos. ¿Paga con tarjeta?" },
          { "speaker": "tourist", "name": "Alex (Tourist)", "spanish": "Sí. ¿Débito o crédito?" },
          { "speaker": "local", "name": "Waiter", "spanish": "Ambos. ¿En cuotas?" },
          { "speaker": "tourist", "name": "Alex (Tourist)", "spanish": "No, pago de una vez." },
          { "speaker": "local", "name": "Waiter", "spanish": "¿Desea agregar la propina?" },
          { "speaker": "tourist", "name": "Alex (Tourist)", "spanish": "Sí, diez por ciento. Estuvo muy rico todo." }
        ]
      }
    ]
  }'::jsonb
FROM new_unit;
