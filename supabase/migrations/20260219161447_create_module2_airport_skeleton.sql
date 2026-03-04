
/*
  # Module 2: At the Airport — Skeleton

  Creates module 2 "At the Airport" with 4 units and one skeleton lesson per unit,
  mirroring the 7-page structure from Module 1. All content uses placeholder phrases
  relevant to each unit's focus area. Audio, flashcards, and real dialogue content
  will be filled in later.

  ## New Module
  - "At the Airport" (order_index: 2, replaces existing slot — existing module 2 shifts)

  ## New Units
  1. Immigration & Passport Control
  2. Customs
  3. Finding the Exit, Taxi & Uber Zone
  4. Asking for Help at the Airport

  ## New Lessons (one per unit)
  Each lesson has 7 pages:
  1. overview
  2. intro (phrase list)
  3. multiple_choice
  4. audio_choice
  5. flashcards
  6. dialogue
  7. recap
*/

-- Shift existing modules with order_index >= 2 up by 1
UPDATE modules SET order_index = order_index + 1 WHERE order_index >= 2;

-- Insert Module 2
INSERT INTO modules (id, title, description, order_index)
VALUES (
  gen_random_uuid(),
  '✈️ At the Airport',
  'Navigate immigration, customs, and finding your way out of the airport.',
  2
);

-- ─── UNIT 1: Immigration & Passport Control ─────────────────────────────────

WITH new_module AS (SELECT id FROM modules WHERE title = '✈️ At the Airport'),
new_unit AS (
  INSERT INTO units (id, module_id, title, description, order_index)
  SELECT gen_random_uuid(), new_module.id, 'Immigration & Passport Control', 'Understand official questions and give short, correct answers at the immigration counter.', 1
  FROM new_module
  RETURNING id
)
INSERT INTO lessons (id, unit_id, title, type, order_index, content)
SELECT
  gen_random_uuid(),
  new_unit.id,
  'Immigration & Passport Control',
  'standard',
  1,
  '{
    "pages": [
      {
        "type": "overview",
        "title": "What You''ll Learn",
        "goal": "By the end of this unit, you''ll be able to understand the questions an immigration officer may ask you, and give short, correct answers.",
        "cultural_note": "Chilean immigration officers are generally professional and calm. Answering briefly and clearly is all you need — a simple sí, no, or a short phrase is always enough."
      },
      {
        "type": "intro",
        "title": "Key Phrases at Immigration",
        "subtitle": "Phrases you''ll hear and need to say at passport control",
        "phrases": [
          {"spanish": "¿Cuál es el motivo de su visita?", "english": "What is the purpose of your visit?", "reply": "", "isChilean": false},
          {"spanish": "Turismo", "english": "Tourism", "reply": "", "isChilean": false},
          {"spanish": "¿Cuánto tiempo va a estar en Chile?", "english": "How long will you be in Chile?", "reply": "", "isChilean": false},
          {"spanish": "Dos semanas", "english": "Two weeks", "reply": "", "isChilean": false},
          {"spanish": "¿Tiene algo que declarar?", "english": "Do you have anything to declare?", "reply": "", "isChilean": false},
          {"spanish": "No, nada", "english": "No, nothing", "reply": "", "isChilean": false},
          {"spanish": "¿Dónde se va a hospedar?", "english": "Where will you be staying?", "reply": "", "isChilean": false},
          {"spanish": "En un hotel", "english": "In a hotel", "reply": "", "isChilean": false},
          {"spanish": "Aquí tiene mi pasaporte", "english": "Here is my passport", "reply": "", "isChilean": false}
        ]
      },
      {
        "type": "multiple_choice",
        "title": "This or That",
        "items": [
          {"phrase": "¿Cuál es el motivo de su visita?", "question": "What does it mean?", "options": ["How long will you stay?", "What is the purpose of your visit?", "Where will you be staying?", "Do you have anything to declare?"], "correctAnswer": 1},
          {"phrase": "Turismo", "question": "What does it mean?", "options": ["Business", "Tourism", "Study", "Transit"], "correctAnswer": 1},
          {"phrase": "¿Cuánto tiempo va a estar en Chile?", "question": "What does it mean?", "options": ["What is the purpose of your visit?", "Where will you be staying?", "How long will you be in Chile?", "Do you have anything to declare?"], "correctAnswer": 2},
          {"phrase": "¿Tiene algo que declarar?", "question": "What does it mean?", "options": ["How long will you stay?", "Where will you be staying?", "What is the purpose of your visit?", "Do you have anything to declare?"], "correctAnswer": 3},
          {"phrase": "¿Dónde se va a hospedar?", "question": "What does it mean?", "options": ["Do you have anything to declare?", "Where will you be staying?", "How long will you be in Chile?", "What is the purpose of your visit?"], "correctAnswer": 1},
          {"phrase": "En un hotel", "question": "What does it mean?", "options": ["In a hostel", "At a friend''s", "In a hotel", "In an Airbnb"], "correctAnswer": 2},
          {"phrase": "Aquí tiene mi pasaporte", "question": "What does it mean?", "options": ["I lost my passport.", "My passport is expired.", "Here is my passport.", "I need my passport."], "correctAnswer": 2},
          {"phrase": "No, nada", "question": "What does it mean?", "options": ["Yes, everything.", "No, nothing.", "Just a little.", "I don''t know."], "correctAnswer": 1},
          {"phrase": "Dos semanas", "question": "What does it mean?", "options": ["Two days", "Two months", "Two weeks", "Two hours"], "correctAnswer": 2}
        ]
      },
      {
        "type": "audio_choice",
        "title": "Hear and React",
        "items": [
          {"question": "What phrase do you hear?", "options": ["¿Cuál es el motivo de su visita?", "Turismo", "¿Dónde se va a hospedar?", "No, nada"], "correctAnswer": 0},
          {"question": "What phrase do you hear?", "options": ["En un hotel", "Dos semanas", "Turismo", "No, nada"], "correctAnswer": 2},
          {"question": "What phrase do you hear?", "options": ["¿Cuánto tiempo va a estar en Chile?", "¿Tiene algo que declarar?", "Aquí tiene mi pasaporte", "Turismo"], "correctAnswer": 1},
          {"question": "What phrase do you hear?", "options": ["No, nada", "En un hotel", "Dos semanas", "¿Dónde se va a hospedar?"], "correctAnswer": 3},
          {"question": "What phrase do you hear?", "options": ["Turismo", "Aquí tiene mi pasaporte", "¿Cuál es el motivo de su visita?", "En un hotel"], "correctAnswer": 1},
          {"question": "What phrase do you hear?", "options": ["¿Dónde se va a hospedar?", "No, nada", "Dos semanas", "¿Cuánto tiempo va a estar en Chile?"], "correctAnswer": 2},
          {"question": "What phrase do you hear?", "options": ["Aquí tiene mi pasaporte", "Turismo", "¿Tiene algo que declarar?", "En un hotel"], "correctAnswer": 0},
          {"question": "What phrase do you hear?", "options": ["Dos semanas", "¿Cuál es el motivo de su visita?", "No, nada", "Turismo"], "correctAnswer": 0},
          {"question": "What phrase do you hear?", "options": ["En un hotel", "¿Cuánto tiempo va a estar en Chile?", "Turismo", "Dos semanas"], "correctAnswer": 3}
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
        "subtitle": "A tourist going through passport control",
        "dialogue": [
          {"speaker": "local", "spanish": "Buenas tardes. ¿Pasaporte, por favor?"},
          {"speaker": "tourist", "spanish": "Aquí tiene mi pasaporte."},
          {"speaker": "local", "spanish": "¿Cuál es el motivo de su visita?"},
          {"speaker": "tourist", "spanish": "Turismo."},
          {"speaker": "local", "spanish": "¿Cuánto tiempo va a estar en Chile?"},
          {"speaker": "tourist", "spanish": "Dos semanas."},
          {"speaker": "local", "spanish": "¿Dónde se va a hospedar?"},
          {"speaker": "tourist", "spanish": "En un hotel en Santiago."},
          {"speaker": "local", "spanish": "Perfecto. Bienvenido a Chile."}
        ]
      },
      {
        "type": "recap",
        "title": "You''re Doing Great!",
        "dialogue": [
          {"speaker": "local", "name": "Officer (Immigration)", "spanish": "Buenas tardes. ¿Pasaporte, por favor?"},
          {"speaker": "tourist", "name": "Michael (Tourist)", "spanish": "Aquí tiene mi pasaporte."},
          {"speaker": "local", "name": "Officer (Immigration)", "spanish": "¿Cuál es el motivo de su visita?"},
          {"speaker": "tourist", "name": "Michael (Tourist)", "spanish": "Turismo."},
          {"speaker": "local", "name": "Officer (Immigration)", "spanish": "¿Cuánto tiempo va a estar en Chile?"},
          {"speaker": "tourist", "name": "Michael (Tourist)", "spanish": "Dos semanas."},
          {"speaker": "local", "name": "Officer (Immigration)", "spanish": "¿Dónde se va a hospedar?"},
          {"speaker": "tourist", "name": "Michael (Tourist)", "spanish": "En un hotel en Santiago."},
          {"speaker": "local", "name": "Officer (Immigration)", "spanish": "Perfecto. Bienvenido a Chile."}
        ]
      }
    ]
  }'::jsonb
FROM new_unit;

-- ─── UNIT 2: Customs ────────────────────────────────────────────────────────

WITH new_module AS (SELECT id FROM modules WHERE title = '✈️ At the Airport'),
new_unit AS (
  INSERT INTO units (id, module_id, title, description, order_index)
  SELECT gen_random_uuid(), new_module.id, 'Customs', 'Understand what customs officers say and know how to respond correctly.', 2
  FROM new_module
  RETURNING id
)
INSERT INTO lessons (id, unit_id, title, type, order_index, content)
SELECT
  gen_random_uuid(),
  new_unit.id,
  'Customs',
  'standard',
  1,
  '{
    "pages": [
      {
        "type": "overview",
        "title": "What You''ll Learn",
        "goal": "By the end of this unit, you''ll understand what customs officers ask and be able to respond confidently.",
        "cultural_note": "Chilean customs can be strict about food and plant products. Having a simple, honest answer ready makes the process smooth and stress-free."
      },
      {
        "type": "intro",
        "title": "Key Phrases at Customs",
        "subtitle": "Phrases you''ll hear and need to say at the customs checkpoint",
        "phrases": [
          {"spanish": "¿Tiene algo que declarar?", "english": "Do you have anything to declare?", "reply": "", "isChilean": false},
          {"spanish": "No tengo nada que declarar", "english": "I have nothing to declare", "reply": "", "isChilean": false},
          {"spanish": "¿Puede abrir su maleta, por favor?", "english": "Can you open your suitcase, please?", "reply": "", "isChilean": false},
          {"spanish": "Claro, con gusto", "english": "Of course, gladly", "reply": "", "isChilean": false},
          {"spanish": "¿Trae frutas o verduras?", "english": "Are you bringing fruits or vegetables?", "reply": "", "isChilean": false},
          {"spanish": "No, no traigo", "english": "No, I''m not bringing any", "reply": "", "isChilean": false},
          {"spanish": "¿Es para uso personal?", "english": "Is it for personal use?", "reply": "", "isChilean": false},
          {"spanish": "Sí, es para uso personal", "english": "Yes, it''s for personal use", "reply": "", "isChilean": false},
          {"spanish": "Puede pasar", "english": "You may proceed", "reply": "", "isChilean": false}
        ]
      },
      {
        "type": "multiple_choice",
        "title": "This or That",
        "items": [
          {"phrase": "¿Tiene algo que declarar?", "question": "What does it mean?", "options": ["Can you open your suitcase?", "Do you have anything to declare?", "Is it for personal use?", "Are you bringing fruits?"], "correctAnswer": 1},
          {"phrase": "No tengo nada que declarar", "question": "What does it mean?", "options": ["I have a lot to declare.", "I forgot to declare something.", "I have nothing to declare.", "I need to declare this."], "correctAnswer": 2},
          {"phrase": "¿Puede abrir su maleta, por favor?", "question": "What does it mean?", "options": ["Where is your suitcase?", "Can you open your suitcase, please?", "Is this your suitcase?", "How many suitcases do you have?"], "correctAnswer": 1},
          {"phrase": "¿Trae frutas o verduras?", "question": "What does it mean?", "options": ["Do you like fruit?", "Are you bringing fruits or vegetables?", "Did you buy food?", "Is this food?"], "correctAnswer": 1},
          {"phrase": "Claro, con gusto", "question": "What does it mean?", "options": ["No problem.", "Of course, gladly.", "Wait a moment.", "I don''t understand."], "correctAnswer": 1},
          {"phrase": "¿Es para uso personal?", "question": "What does it mean?", "options": ["Is this yours?", "Did you buy this?", "Is it for personal use?", "Is this a gift?"], "correctAnswer": 2},
          {"phrase": "Puede pasar", "question": "What does it mean?", "options": ["Stop here.", "Come back later.", "You may proceed.", "Open your bag."], "correctAnswer": 2},
          {"phrase": "No, no traigo", "question": "What does it mean?", "options": ["Yes, I have some.", "I forgot.", "No, I''m not bringing any.", "I don''t know."], "correctAnswer": 2},
          {"phrase": "Sí, es para uso personal", "question": "What does it mean?", "options": ["No, it''s for sale.", "Yes, it''s for personal use.", "It''s a gift.", "I don''t know."], "correctAnswer": 1}
        ]
      },
      {
        "type": "audio_choice",
        "title": "Hear and React",
        "items": [
          {"question": "What phrase do you hear?", "options": ["¿Tiene algo que declarar?", "Puede pasar", "¿Trae frutas o verduras?", "Claro, con gusto"], "correctAnswer": 0},
          {"question": "What phrase do you hear?", "options": ["No tengo nada que declarar", "Sí, es para uso personal", "No, no traigo", "Puede pasar"], "correctAnswer": 3},
          {"question": "What phrase do you hear?", "options": ["¿Es para uso personal?", "¿Puede abrir su maleta, por favor?", "Claro, con gusto", "¿Trae frutas o verduras?"], "correctAnswer": 1},
          {"question": "What phrase do you hear?", "options": ["Puede pasar", "No, no traigo", "Sí, es para uso personal", "No tengo nada que declarar"], "correctAnswer": 3},
          {"question": "What phrase do you hear?", "options": ["¿Tiene algo que declarar?", "Claro, con gusto", "¿Trae frutas o verduras?", "¿Puede abrir su maleta, por favor?"], "correctAnswer": 2},
          {"question": "What phrase do you hear?", "options": ["No, no traigo", "¿Es para uso personal?", "No tengo nada que declarar", "Puede pasar"], "correctAnswer": 1},
          {"question": "What phrase do you hear?", "options": ["Sí, es para uso personal", "¿Tiene algo que declarar?", "Claro, con gusto", "No, no traigo"], "correctAnswer": 0},
          {"question": "What phrase do you hear?", "options": ["¿Puede abrir su maleta, por favor?", "No tengo nada que declarar", "¿Trae frutas o verduras?", "Sí, es para uso personal"], "correctAnswer": 1},
          {"question": "What phrase do you hear?", "options": ["Claro, con gusto", "Puede pasar", "¿Es para uso personal?", "¿Tiene algo que declarar?"], "correctAnswer": 2}
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
        "subtitle": "A tourist going through customs",
        "dialogue": [
          {"speaker": "local", "spanish": "Buenas tardes. ¿Tiene algo que declarar?"},
          {"speaker": "tourist", "spanish": "No tengo nada que declarar."},
          {"speaker": "local", "spanish": "¿Trae frutas o verduras?"},
          {"speaker": "tourist", "spanish": "No, no traigo."},
          {"speaker": "local", "spanish": "¿Puede abrir su maleta, por favor?"},
          {"speaker": "tourist", "spanish": "Claro, con gusto."},
          {"speaker": "local", "spanish": "¿Esto es para uso personal?"},
          {"speaker": "tourist", "spanish": "Sí, es para uso personal."},
          {"speaker": "local", "spanish": "Perfecto. Puede pasar."}
        ]
      },
      {
        "type": "recap",
        "title": "You''re Doing Great!",
        "dialogue": [
          {"speaker": "local", "name": "Officer (Customs)", "spanish": "Buenas tardes. ¿Tiene algo que declarar?"},
          {"speaker": "tourist", "name": "Michael (Tourist)", "spanish": "No tengo nada que declarar."},
          {"speaker": "local", "name": "Officer (Customs)", "spanish": "¿Trae frutas o verduras?"},
          {"speaker": "tourist", "name": "Michael (Tourist)", "spanish": "No, no traigo."},
          {"speaker": "local", "name": "Officer (Customs)", "spanish": "¿Puede abrir su maleta, por favor?"},
          {"speaker": "tourist", "name": "Michael (Tourist)", "spanish": "Claro, con gusto."},
          {"speaker": "local", "name": "Officer (Customs)", "spanish": "¿Esto es para uso personal?"},
          {"speaker": "tourist", "name": "Michael (Tourist)", "spanish": "Sí, es para uso personal."},
          {"speaker": "local", "name": "Officer (Customs)", "spanish": "Perfecto. Puede pasar."}
        ]
      }
    ]
  }'::jsonb
FROM new_unit;

-- ─── UNIT 3: Finding the Exit, Taxi & Uber Zone ──────────────────────────────

WITH new_module AS (SELECT id FROM modules WHERE title = '✈️ At the Airport'),
new_unit AS (
  INSERT INTO units (id, module_id, title, description, order_index)
  SELECT gen_random_uuid(), new_module.id, 'Finding the Exit, Taxi & Uber Zone', 'Learn how to ask for directions and find your way to a taxi or Uber at the airport.', 3
  FROM new_module
  RETURNING id
)
INSERT INTO lessons (id, unit_id, title, type, order_index, content)
SELECT
  gen_random_uuid(),
  new_unit.id,
  'Finding the Exit, Taxi & Uber Zone',
  'standard',
  1,
  '{
    "pages": [
      {
        "type": "overview",
        "title": "What You''ll Learn",
        "goal": "By the end of this unit, you''ll be able to ask where the exit, taxi stand, and Uber pickup zone are — and understand the answers.",
        "cultural_note": "At Chilean airports, official taxis are clearly marked. Uber also operates and is popular. Asking airport staff is always a safe bet — they''re used to helping tourists."
      },
      {
        "type": "intro",
        "title": "Key Phrases for Getting Out",
        "subtitle": "Phrases for finding your way to transportation",
        "phrases": [
          {"spanish": "¿Dónde está la salida?", "english": "Where is the exit?", "reply": "", "isChilean": false},
          {"spanish": "¿Dónde están los taxis?", "english": "Where are the taxis?", "reply": "", "isChilean": false},
          {"spanish": "¿Dónde se toma el Uber?", "english": "Where do you take the Uber?", "reply": "", "isChilean": false},
          {"spanish": "Siga recto", "english": "Go straight", "reply": "", "isChilean": false},
          {"spanish": "A la derecha", "english": "To the right", "reply": "", "isChilean": false},
          {"spanish": "A la izquierda", "english": "To the left", "reply": "", "isChilean": false},
          {"spanish": "En la planta baja", "english": "On the ground floor", "reply": "", "isChilean": false},
          {"spanish": "Afuera del terminal", "english": "Outside the terminal", "reply": "", "isChilean": false},
          {"spanish": "¿Está lejos?", "english": "Is it far?", "reply": "", "isChilean": false}
        ]
      },
      {
        "type": "multiple_choice",
        "title": "This or That",
        "items": [
          {"phrase": "¿Dónde está la salida?", "question": "What does it mean?", "options": ["Where is the entrance?", "Where is the exit?", "Where are the taxis?", "Where is the bathroom?"], "correctAnswer": 1},
          {"phrase": "¿Dónde están los taxis?", "question": "What does it mean?", "options": ["Where are the taxis?", "Where is the bus?", "Where is the metro?", "Where is the Uber?"], "correctAnswer": 0},
          {"phrase": "¿Dónde se toma el Uber?", "question": "What does it mean?", "options": ["Where are the taxis?", "Where is the exit?", "Where do you take the Uber?", "How do I get an Uber?"], "correctAnswer": 2},
          {"phrase": "Siga recto", "question": "What does it mean?", "options": ["Turn right.", "Turn left.", "Go straight.", "Go back."], "correctAnswer": 2},
          {"phrase": "A la derecha", "question": "What does it mean?", "options": ["To the left", "Straight ahead", "To the right", "Behind you"], "correctAnswer": 2},
          {"phrase": "A la izquierda", "question": "What does it mean?", "options": ["To the right", "To the left", "Straight ahead", "Go back"], "correctAnswer": 1},
          {"phrase": "En la planta baja", "question": "What does it mean?", "options": ["On the top floor", "On the ground floor", "In the basement", "On the second floor"], "correctAnswer": 1},
          {"phrase": "Afuera del terminal", "question": "What does it mean?", "options": ["Inside the terminal", "On the second floor", "Outside the terminal", "Near the gate"], "correctAnswer": 2},
          {"phrase": "¿Está lejos?", "question": "What does it mean?", "options": ["Is it on the left?", "Is it close?", "Is it far?", "Is it outside?"], "correctAnswer": 2}
        ]
      },
      {
        "type": "audio_choice",
        "title": "Hear and React",
        "items": [
          {"question": "What phrase do you hear?", "options": ["¿Dónde está la salida?", "Siga recto", "A la derecha", "¿Está lejos?"], "correctAnswer": 0},
          {"question": "What phrase do you hear?", "options": ["En la planta baja", "¿Dónde están los taxis?", "A la izquierda", "Afuera del terminal"], "correctAnswer": 1},
          {"question": "What phrase do you hear?", "options": ["Siga recto", "A la derecha", "¿Dónde se toma el Uber?", "En la planta baja"], "correctAnswer": 2},
          {"question": "What phrase do you hear?", "options": ["A la izquierda", "Afuera del terminal", "¿Está lejos?", "Siga recto"], "correctAnswer": 3},
          {"question": "What phrase do you hear?", "options": ["¿Dónde está la salida?", "En la planta baja", "¿Dónde están los taxis?", "A la derecha"], "correctAnswer": 1},
          {"question": "What phrase do you hear?", "options": ["A la derecha", "¿Dónde se toma el Uber?", "Siga recto", "A la izquierda"], "correctAnswer": 3},
          {"question": "What phrase do you hear?", "options": ["Afuera del terminal", "¿Está lejos?", "En la planta baja", "¿Dónde está la salida?"], "correctAnswer": 0},
          {"question": "What phrase do you hear?", "options": ["¿Dónde están los taxis?", "A la izquierda", "Afuera del terminal", "¿Dónde se toma el Uber?"], "correctAnswer": 2},
          {"question": "What phrase do you hear?", "options": ["Siga recto", "¿Está lejos?", "A la derecha", "En la planta baja"], "correctAnswer": 1}
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
        "subtitle": "A tourist asking for directions at the airport",
        "dialogue": [
          {"speaker": "tourist", "spanish": "Disculpe, ¿dónde está la salida?"},
          {"speaker": "local", "spanish": "Siga recto y luego a la derecha."},
          {"speaker": "tourist", "spanish": "¿Y los taxis?"},
          {"speaker": "local", "spanish": "Afuera del terminal, a la izquierda."},
          {"speaker": "tourist", "spanish": "¿Dónde se toma el Uber?"},
          {"speaker": "local", "spanish": "En la planta baja, salida B."},
          {"speaker": "tourist", "spanish": "¿Está lejos?"},
          {"speaker": "local", "spanish": "No, está cerca. Unos cinco minutos."},
          {"speaker": "tourist", "spanish": "Muchas gracias."}
        ]
      },
      {
        "type": "recap",
        "title": "You''re Doing Great!",
        "dialogue": [
          {"speaker": "tourist", "name": "Michael (Tourist)", "spanish": "Disculpe, ¿dónde está la salida?"},
          {"speaker": "local", "name": "Airport Staff", "spanish": "Siga recto y luego a la derecha."},
          {"speaker": "tourist", "name": "Michael (Tourist)", "spanish": "¿Y los taxis?"},
          {"speaker": "local", "name": "Airport Staff", "spanish": "Afuera del terminal, a la izquierda."},
          {"speaker": "tourist", "name": "Michael (Tourist)", "spanish": "¿Dónde se toma el Uber?"},
          {"speaker": "local", "name": "Airport Staff", "spanish": "En la planta baja, salida B."},
          {"speaker": "tourist", "name": "Michael (Tourist)", "spanish": "¿Está lejos?"},
          {"speaker": "local", "name": "Airport Staff", "spanish": "No, está cerca. Unos cinco minutos."},
          {"speaker": "tourist", "name": "Michael (Tourist)", "spanish": "Muchas gracias."}
        ]
      }
    ]
  }'::jsonb
FROM new_unit;

-- ─── UNIT 4: Asking for Help at the Airport ──────────────────────────────────

WITH new_module AS (SELECT id FROM modules WHERE title = '✈️ At the Airport'),
new_unit AS (
  INSERT INTO units (id, module_id, title, description, order_index)
  SELECT gen_random_uuid(), new_module.id, 'Asking for Help at the Airport', 'Get help politely when things don''t go as planned.', 4
  FROM new_module
  RETURNING id
)
INSERT INTO lessons (id, unit_id, title, type, order_index, content)
SELECT
  gen_random_uuid(),
  new_unit.id,
  'Asking for Help at the Airport',
  'standard',
  1,
  '{
    "pages": [
      {
        "type": "overview",
        "title": "What You''ll Learn",
        "goal": "By the end of this unit, you''ll be able to ask for help politely when things go wrong at the airport — lost luggage, confusion, or needing assistance.",
        "cultural_note": "Chileans are generally helpful and patient with tourists. Saying ''disculpe'' (excuse me) before asking is always appreciated and makes interactions warmer."
      },
      {
        "type": "intro",
        "title": "Key Phrases for Asking Help",
        "subtitle": "Phrases for when you need assistance at the airport",
        "phrases": [
          {"spanish": "Disculpe, ¿me puede ayudar?", "english": "Excuse me, can you help me?", "reply": "", "isChilean": false},
          {"spanish": "No encuentro mi maleta", "english": "I can''t find my suitcase", "reply": "", "isChilean": false},
          {"spanish": "Perdí mi equipaje", "english": "I lost my luggage", "reply": "", "isChilean": false},
          {"spanish": "¿Dónde está la oficina de equipaje perdido?", "english": "Where is the lost luggage office?", "reply": "", "isChilean": false},
          {"spanish": "No entiendo", "english": "I don''t understand", "reply": "", "isChilean": false},
          {"spanish": "¿Puede repetir más despacio?", "english": "Can you repeat more slowly?", "reply": "", "isChilean": false},
          {"spanish": "¿Habla inglés?", "english": "Do you speak English?", "reply": "", "isChilean": false},
          {"spanish": "Necesito ayuda", "english": "I need help", "reply": "", "isChilean": false},
          {"spanish": "¿Dónde está la información?", "english": "Where is the information desk?", "reply": "", "isChilean": false}
        ]
      },
      {
        "type": "multiple_choice",
        "title": "This or That",
        "items": [
          {"phrase": "Disculpe, ¿me puede ayudar?", "question": "What does it mean?", "options": ["Thank you for your help.", "Excuse me, can you help me?", "I need help, please.", "Sorry, I don''t speak Spanish."], "correctAnswer": 1},
          {"phrase": "No encuentro mi maleta", "question": "What does it mean?", "options": ["My suitcase is broken.", "I lost my luggage.", "I can''t find my suitcase.", "Where is my suitcase?"], "correctAnswer": 2},
          {"phrase": "Perdí mi equipaje", "question": "What does it mean?", "options": ["I can''t find my suitcase.", "I lost my luggage.", "My luggage is damaged.", "Where is the luggage?"], "correctAnswer": 1},
          {"phrase": "¿Dónde está la oficina de equipaje perdido?", "question": "What does it mean?", "options": ["Where is the luggage carousel?", "Where is the lost luggage office?", "Where can I buy a suitcase?", "Where is the exit?"], "correctAnswer": 1},
          {"phrase": "No entiendo", "question": "What does it mean?", "options": ["I don''t speak Spanish.", "Can you repeat?", "I don''t understand.", "I need help."], "correctAnswer": 2},
          {"phrase": "¿Puede repetir más despacio?", "question": "What does it mean?", "options": ["Can you speak louder?", "Can you write that down?", "Can you translate that?", "Can you repeat more slowly?"], "correctAnswer": 3},
          {"phrase": "¿Habla inglés?", "question": "What does it mean?", "options": ["Do you speak French?", "Do you understand English?", "Do you speak English?", "Is there an English speaker?"], "correctAnswer": 2},
          {"phrase": "Necesito ayuda", "question": "What does it mean?", "options": ["Can you help me?", "I need help.", "Where is the help desk?", "Thank you for helping."], "correctAnswer": 1},
          {"phrase": "¿Dónde está la información?", "question": "What does it mean?", "options": ["Where is the exit?", "Where is the information desk?", "Where is the office?", "Where can I get help?"], "correctAnswer": 1}
        ]
      },
      {
        "type": "audio_choice",
        "title": "Hear and React",
        "items": [
          {"question": "What phrase do you hear?", "options": ["Disculpe, ¿me puede ayudar?", "Necesito ayuda", "¿Habla inglés?", "No entiendo"], "correctAnswer": 0},
          {"question": "What phrase do you hear?", "options": ["Perdí mi equipaje", "¿Puede repetir más despacio?", "No encuentro mi maleta", "¿Dónde está la información?"], "correctAnswer": 2},
          {"question": "What phrase do you hear?", "options": ["¿Dónde está la oficina de equipaje perdido?", "No entiendo", "Necesito ayuda", "Perdí mi equipaje"], "correctAnswer": 3},
          {"question": "What phrase do you hear?", "options": ["No entiendo", "¿Habla inglés?", "¿Dónde está la información?", "Disculpe, ¿me puede ayudar?"], "correctAnswer": 1},
          {"question": "What phrase do you hear?", "options": ["¿Puede repetir más despacio?", "No encuentro mi maleta", "Perdí mi equipaje", "¿Dónde está la oficina de equipaje perdido?"], "correctAnswer": 0},
          {"question": "What phrase do you hear?", "options": ["Necesito ayuda", "Disculpe, ¿me puede ayudar?", "No entiendo", "¿Habla inglés?"], "correctAnswer": 3},
          {"question": "What phrase do you hear?", "options": ["¿Dónde está la información?", "¿Dónde está la oficina de equipaje perdido?", "No encuentro mi maleta", "¿Puede repetir más despacio?"], "correctAnswer": 1},
          {"question": "What phrase do you hear?", "options": ["No entiendo", "Necesito ayuda", "¿Habla inglés?", "Disculpe, ¿me puede ayudar?"], "correctAnswer": 1},
          {"question": "What phrase do you hear?", "options": ["Perdí mi equipaje", "¿Dónde está la información?", "No encuentro mi maleta", "¿Puede repetir más despacio?"], "correctAnswer": 3}
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
        "subtitle": "A tourist asking for help at the airport",
        "dialogue": [
          {"speaker": "tourist", "spanish": "Disculpe, ¿me puede ayudar?"},
          {"speaker": "local", "spanish": "Claro, ¿qué necesita?"},
          {"speaker": "tourist", "spanish": "No encuentro mi maleta."},
          {"speaker": "local", "spanish": "¿En qué vuelo llegó?"},
          {"speaker": "tourist", "spanish": "No entiendo. ¿Puede repetir más despacio?"},
          {"speaker": "local", "spanish": "¿En qué... vuelo... llegó?"},
          {"speaker": "tourist", "spanish": "Ah, vuelo desde Buenos Aires."},
          {"speaker": "local", "spanish": "La oficina de equipaje perdido está a la derecha."},
          {"speaker": "tourist", "spanish": "Muchas gracias."}
        ]
      },
      {
        "type": "recap",
        "title": "You''re Doing Great!",
        "dialogue": [
          {"speaker": "tourist", "name": "Michael (Tourist)", "spanish": "Disculpe, ¿me puede ayudar?"},
          {"speaker": "local", "name": "Airport Staff", "spanish": "Claro, ¿qué necesita?"},
          {"speaker": "tourist", "name": "Michael (Tourist)", "spanish": "No encuentro mi maleta."},
          {"speaker": "local", "name": "Airport Staff", "spanish": "¿En qué vuelo llegó?"},
          {"speaker": "tourist", "name": "Michael (Tourist)", "spanish": "No entiendo. ¿Puede repetir más despacio?"},
          {"speaker": "local", "name": "Airport Staff", "spanish": "¿En qué... vuelo... llegó?"},
          {"speaker": "tourist", "name": "Michael (Tourist)", "spanish": "Ah, vuelo desde Buenos Aires."},
          {"speaker": "local", "name": "Airport Staff", "spanish": "La oficina de equipaje perdido está a la derecha."},
          {"speaker": "tourist", "name": "Michael (Tourist)", "spanish": "Muchas gracias."}
        ]
      }
    ]
  }'::jsonb
FROM new_unit;
