
/*
  # Module 3: Taxi/Uber Chat — Full Content

  Creates Module 3 "Taxi/Uber Chat" with 5 units and one fully-populated lesson per unit.
  Shifts any existing modules with order_index >= 3 up by 1.

  ## New Module
  - "Taxi/Uber Chat" (order_index: 3)
  - Description: Get around Santiago confidently — ask for directions, chat with drivers, and handle any bumps along the way.

  ## New Units (5 total)
  1. If you get lost… — Asking strangers for help and directions
  2. Useful vocabulary (places, prepositions…) — Location words and transport vocabulary
  3. Understanding Directions on the Street — Receiving and following directions
  4. Small talk in a taxi — Chatting with taxi/Uber drivers
  5. Solving problems in a taxi — Handling mistakes, payment, and awkward moments

  ## Lesson Structure (7 pages each)
  1. overview
  2. intro (phrase list)
  3. multiple_choice
  4. audio_choice
  5. flashcards
  6. dialogue
  7. recap

  ## Security
  - No new tables; uses existing RLS policies on modules, units, lessons
*/

-- Shift existing modules with order_index >= 3 up by 1
UPDATE modules SET order_index = order_index + 1 WHERE order_index >= 3;

-- Insert Module 3
INSERT INTO modules (id, title, description, order_index)
VALUES (
  gen_random_uuid(),
  '🚕 Taxi/Uber Chat',
  'Get around Santiago confidently — ask for directions, chat with drivers, and handle any bumps along the way.',
  3
);

-- ─── UNIT 1: If you get lost… ────────────────────────────────────────────────

WITH new_module AS (SELECT id FROM modules WHERE title = '🚕 Taxi/Uber Chat'),
new_unit AS (
  INSERT INTO units (id, module_id, title, description, order_index, estimated_minutes)
  SELECT gen_random_uuid(), new_module.id, 'If you get lost…', 'Ask strangers for help and get your bearings when you don''t know where you are.', 1, 12
  FROM new_module
  RETURNING id
)
INSERT INTO lessons (id, unit_id, title, type, order_index, content)
SELECT
  gen_random_uuid(),
  new_unit.id,
  'If you get lost…',
  'standard',
  1,
  '{
    "pages": [
      {
        "type": "overview",
        "title": "What You''ll Learn",
        "goal": "By the end of this unit, you''ll be able to stop someone on the street, say you''re lost, and ask for directions to a specific place.",
        "cultural_note": "On the street, people in Chile are usually helpful, even if they look busy. If you start with ''Disculpa'', most people will stop and try to help. Don''t worry if the explanation is fast — just say ''De nuevo, por favor''."
      },
      {
        "type": "intro",
        "title": "If you get lost…",
        "subtitle": "Phrases to ask for help when you don''t know where you are",
        "phrases": [
          { "spanish": "Hola, disculpa", "english": "Hi, excuse me", "reply": "", "isChilean": false },
          { "spanish": "Hola, una pregunta", "english": "Hi, I have a question", "reply": "", "isChilean": false },
          { "spanish": "Me perdí.", "english": "I got lost.", "reply": "", "isChilean": false },
          { "spanish": "Estoy buscando… [place]", "english": "I''m looking for… [place]", "reply": "", "isChilean": false },
          { "spanish": "¿Dónde está…?", "english": "Where is…?", "reply": "", "isChilean": false },
          { "spanish": "¿Cómo llego a…?", "english": "How do I get to…?", "reply": "", "isChilean": false },
          { "spanish": "¿Para ir a…?", "english": "How do I go to…?", "reply": "", "isChilean": false },
          { "spanish": "De nuevo, por favor.", "english": "Again, please.", "reply": "", "isChilean": false },
          { "spanish": "Muchas gracias, te pasaste.", "english": "Thank you so much, you were great.", "reply": "", "isChilean": true }
        ]
      },
      {
        "type": "multiple_choice",
        "title": "This or That",
        "items": [
          {
            "phrase": "Me perdí.",
            "question": "What does this phrase mean?",
            "options": ["I''m looking for something.", "I got lost.", "I need help.", "Where is the exit?"],
            "correctAnswer": 1
          },
          {
            "phrase": "Hola, disculpa",
            "question": "When would you use this?",
            "options": ["To say goodbye.", "To thank someone.", "To get someone''s attention politely.", "To ask for directions."],
            "correctAnswer": 2
          },
          {
            "phrase": "¿Dónde está…?",
            "question": "What does it mean?",
            "options": ["How do I get to…?", "I''m looking for…", "Where is…?", "Can you help me?"],
            "correctAnswer": 2
          },
          {
            "phrase": "¿Cómo llego a…?",
            "question": "What does this ask?",
            "options": ["Where is…?", "How do I get to…?", "How far is…?", "Is it close?"],
            "correctAnswer": 1
          },
          {
            "phrase": "De nuevo, por favor.",
            "question": "What does this request mean?",
            "options": ["Speak more slowly, please.", "Again, please.", "I don''t understand.", "Can you write that down?"],
            "correctAnswer": 1
          },
          {
            "phrase": "Estoy buscando… [place]",
            "question": "What does this mean?",
            "options": ["I got lost.", "I need directions.", "I''m looking for… [place]", "Where is… [place]?"],
            "correctAnswer": 2
          },
          {
            "phrase": "Muchas gracias, te pasaste.",
            "question": "What does this Chilean expression mean?",
            "options": ["You went the wrong way.", "Thank you so much, you were great.", "You passed by.", "Thanks, that''s enough."],
            "correctAnswer": 1
          },
          {
            "phrase": "¿Para ir a…?",
            "question": "What does this mean?",
            "options": ["Is it far to…?", "Where is…?", "How do I go to…?", "Can I walk to…?"],
            "correctAnswer": 2
          },
          {
            "phrase": "Hola, una pregunta",
            "question": "What are you signaling when you say this?",
            "options": ["That you are lost.", "That you want to ask something.", "That you need a taxi.", "That you don''t understand."],
            "correctAnswer": 1
          }
        ]
      },
      {
        "type": "audio_choice",
        "title": "Hear and React",
        "items": [
          { "question": "What phrase do you hear?", "options": ["Me perdí.", "Hola, disculpa", "De nuevo, por favor.", "¿Dónde está…?"], "correctAnswer": 1 },
          { "question": "What phrase do you hear?", "options": ["Hola, una pregunta", "Me perdí.", "¿Cómo llego a…?", "Estoy buscando…"], "correctAnswer": 1 },
          { "question": "What phrase do you hear?", "options": ["¿Para ir a…?", "De nuevo, por favor.", "Me perdí.", "¿Dónde está…?"], "correctAnswer": 2 },
          { "question": "What phrase do you hear?", "options": ["Estoy buscando…", "¿Cómo llego a…?", "Muchas gracias, te pasaste.", "Hola, disculpa"], "correctAnswer": 2 },
          { "question": "What phrase do you hear?", "options": ["De nuevo, por favor.", "¿Para ir a…?", "Me perdí.", "Hola, una pregunta"], "correctAnswer": 0 },
          { "question": "What phrase do you hear?", "options": ["¿Dónde está…?", "Estoy buscando…", "Hola, disculpa", "¿Cómo llego a…?"], "correctAnswer": 3 },
          { "question": "What phrase do you hear?", "options": ["Muchas gracias, te pasaste.", "Me perdí.", "¿Para ir a…?", "De nuevo, por favor."], "correctAnswer": 0 },
          { "question": "What phrase do you hear?", "options": ["¿Cómo llego a…?", "Hola, disculpa", "Estoy buscando…", "¿Dónde está…?"], "correctAnswer": 3 },
          { "question": "What phrase do you hear?", "options": ["Hola, una pregunta", "Muchas gracias, te pasaste.", "De nuevo, por favor.", "Me perdí."], "correctAnswer": 3 }
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
        "subtitle": "A tourist asking a local for directions on the street",
        "dialogue": [
          { "speaker": "tourist", "spanish": "Hola, disculpa. Me perdí." },
          { "speaker": "local", "spanish": "¿A dónde quieres ir?" },
          { "speaker": "tourist", "spanish": "Estoy buscando el metro." },
          { "speaker": "local", "spanish": "Ah, está ahí mismo. Sigue derecho dos cuadras." },
          { "speaker": "tourist", "spanish": "¿Cómo llego a la plaza?" },
          { "speaker": "local", "spanish": "La plaza está un poco más allá, a la derecha." },
          { "speaker": "tourist", "spanish": "De nuevo, por favor." },
          { "speaker": "local", "spanish": "A la de-re-cha, después del semáforo." },
          { "speaker": "tourist", "spanish": "Muchas gracias, te pasaste." }
        ]
      },
      {
        "type": "recap",
        "title": "You''re Doing Great!",
        "dialogue": [
          { "speaker": "tourist", "name": "Alex (Tourist)", "spanish": "Hola, disculpa. Me perdí." },
          { "speaker": "local", "name": "Local", "spanish": "¿A dónde quieres ir?" },
          { "speaker": "tourist", "name": "Alex (Tourist)", "spanish": "Estoy buscando el metro." },
          { "speaker": "local", "name": "Local", "spanish": "Ah, está ahí mismo. Sigue derecho dos cuadras." },
          { "speaker": "tourist", "name": "Alex (Tourist)", "spanish": "¿Cómo llego a la plaza?" },
          { "speaker": "local", "name": "Local", "spanish": "La plaza está un poco más allá, a la derecha." },
          { "speaker": "tourist", "name": "Alex (Tourist)", "spanish": "De nuevo, por favor." },
          { "speaker": "local", "name": "Local", "spanish": "A la de-re-cha, después del semáforo." },
          { "speaker": "tourist", "name": "Alex (Tourist)", "spanish": "Muchas gracias, te pasaste." }
        ]
      }
    ]
  }'::jsonb
FROM new_unit;

-- ─── UNIT 2: Useful vocabulary ───────────────────────────────────────────────

WITH new_module AS (SELECT id FROM modules WHERE title = '🚕 Taxi/Uber Chat'),
new_unit AS (
  INSERT INTO units (id, module_id, title, description, order_index, estimated_minutes)
  SELECT gen_random_uuid(), new_module.id, 'Useful vocabulary', 'Learn the key location words and transport vocabulary you''ll need to give and follow directions.', 2, 12
  FROM new_module
  RETURNING id
)
INSERT INTO lessons (id, unit_id, title, type, order_index, content)
SELECT
  gen_random_uuid(),
  new_unit.id,
  'Useful vocabulary',
  'standard',
  1,
  '{
    "pages": [
      {
        "type": "overview",
        "title": "What You''ll Learn",
        "goal": "By the end of this unit, you''ll know the core vocabulary for places, transport, and spatial directions — the building blocks of every direction conversation in Chile.",
        "cultural_note": "Chileans give directions using landmarks, not street names. You''ll hear things like ''en la esquina'', ''al frente'', or ''por allá'' more than exact addresses. Knowing these words helps more than knowing the map."
      },
      {
        "type": "intro",
        "title": "Useful vocabulary (places, prepositions…)",
        "subtitle": "Words for places, transport, and directions",
        "phrases": [
          { "spanish": "el metro", "english": "the metro / subway", "reply": "", "isChilean": false },
          { "spanish": "la parada de micro número…", "english": "bus stop number…", "reply": "", "isChilean": true },
          { "spanish": "la plaza", "english": "the town square / plaza", "reply": "", "isChilean": false },
          { "spanish": "la calle [street name]", "english": "the street [street name]", "reply": "", "isChilean": false },
          { "spanish": "la avenida [avenue name]", "english": "the avenue [avenue name]", "reply": "", "isChilean": false },
          { "spanish": "el semáforo", "english": "the traffic light", "reply": "", "isChilean": false },
          { "spanish": "el taco", "english": "traffic jam", "reply": "", "isChilean": true },
          { "spanish": "Ahí mismo", "english": "right there", "reply": "", "isChilean": false },
          { "spanish": "Más allá", "english": "farther away", "reply": "", "isChilean": false },
          { "spanish": "Al frente", "english": "straight ahead / across", "reply": "", "isChilean": false },
          { "spanish": "Cerca", "english": "close / nearby", "reply": "", "isChilean": false },
          { "spanish": "Lejos", "english": "far", "reply": "", "isChilean": false },
          { "spanish": "En la esquina", "english": "on the corner", "reply": "", "isChilean": false },
          { "spanish": "Al lado de", "english": "next to / beside", "reply": "", "isChilean": false },
          { "spanish": "a diez minutos", "english": "ten minutes away", "reply": "", "isChilean": false }
        ]
      },
      {
        "type": "multiple_choice",
        "title": "This or That",
        "items": [
          {
            "phrase": "el taco",
            "question": "What does this Chilean word mean?",
            "options": ["a type of food", "traffic jam", "the bus stop", "a street corner"],
            "correctAnswer": 1
          },
          {
            "phrase": "el semáforo",
            "question": "What does it mean?",
            "options": ["the crosswalk", "the traffic light", "the intersection", "the sign"],
            "correctAnswer": 1
          },
          {
            "phrase": "Ahí mismo",
            "question": "What does this mean?",
            "options": ["a little farther", "right there", "far away", "on the corner"],
            "correctAnswer": 1
          },
          {
            "phrase": "En la esquina",
            "question": "What does it mean?",
            "options": ["on the avenue", "in the plaza", "on the corner", "on the street"],
            "correctAnswer": 2
          },
          {
            "phrase": "Al lado de",
            "question": "What does it mean?",
            "options": ["across from", "far from", "next to / beside", "near the corner"],
            "correctAnswer": 2
          },
          {
            "phrase": "Más allá",
            "question": "What does this mean?",
            "options": ["right here", "farther away", "very close", "on the left"],
            "correctAnswer": 1
          },
          {
            "phrase": "la parada de micro número…",
            "question": "What is a ''micro'' in Chile?",
            "options": ["a small taxi", "a bus", "a minivan", "the metro"],
            "correctAnswer": 1
          },
          {
            "phrase": "Al frente",
            "question": "What does it mean?",
            "options": ["to the right", "to the left", "straight ahead / across", "behind you"],
            "correctAnswer": 2
          },
          {
            "phrase": "a diez minutos",
            "question": "What does this phrase describe?",
            "options": ["a time limit", "distance by car only", "how far away something is", "how long to wait"],
            "correctAnswer": 2
          }
        ]
      },
      {
        "type": "audio_choice",
        "title": "Hear and React",
        "items": [
          { "question": "What phrase do you hear?", "options": ["el metro", "la plaza", "el taco", "el semáforo"], "correctAnswer": 2 },
          { "question": "What phrase do you hear?", "options": ["Cerca", "Lejos", "Ahí mismo", "Al frente"], "correctAnswer": 0 },
          { "question": "What phrase do you hear?", "options": ["En la esquina", "Al lado de", "Más allá", "a diez minutos"], "correctAnswer": 3 },
          { "question": "What phrase do you hear?", "options": ["la avenida", "la calle", "la plaza", "el metro"], "correctAnswer": 1 },
          { "question": "What phrase do you hear?", "options": ["Al frente", "En la esquina", "Ahí mismo", "Más allá"], "correctAnswer": 1 },
          { "question": "What phrase do you hear?", "options": ["el semáforo", "la parada de micro", "el taco", "la plaza"], "correctAnswer": 0 },
          { "question": "What phrase do you hear?", "options": ["Más allá", "Cerca", "Al lado de", "Lejos"], "correctAnswer": 3 },
          { "question": "What phrase do you hear?", "options": ["a diez minutos", "Al frente", "En la esquina", "Ahí mismo"], "correctAnswer": 0 },
          { "question": "What phrase do you hear?", "options": ["Al lado de", "la avenida", "el metro", "En la esquina"], "correctAnswer": 0 }
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
        "subtitle": "A tourist trying to find the bus and the plaza",
        "dialogue": [
          { "speaker": "tourist", "spanish": "Disculpa, ¿la plaza está lejos?" },
          { "speaker": "local", "spanish": "No, está cerca. Al frente, en la esquina." },
          { "speaker": "tourist", "spanish": "¿Y la parada de micro?" },
          { "speaker": "local", "spanish": "Más allá, al lado de la farmacia." },
          { "speaker": "tourist", "spanish": "¿Cuánto camino?" },
          { "speaker": "local", "spanish": "A diez minutos. Pero hay taco ahora." },
          { "speaker": "tourist", "spanish": "¿El metro está ahí mismo?" },
          { "speaker": "local", "spanish": "Sí, ahí mismo, en la avenida." }
        ]
      },
      {
        "type": "recap",
        "title": "You''re Doing Great!",
        "dialogue": [
          { "speaker": "tourist", "name": "Alex (Tourist)", "spanish": "Disculpa, ¿la plaza está lejos?" },
          { "speaker": "local", "name": "Local", "spanish": "No, está cerca. Al frente, en la esquina." },
          { "speaker": "tourist", "name": "Alex (Tourist)", "spanish": "¿Y la parada de micro?" },
          { "speaker": "local", "name": "Local", "spanish": "Más allá, al lado de la farmacia." },
          { "speaker": "tourist", "name": "Alex (Tourist)", "spanish": "¿Cuánto camino?" },
          { "speaker": "local", "name": "Local", "spanish": "A diez minutos. Pero hay taco ahora." },
          { "speaker": "tourist", "name": "Alex (Tourist)", "spanish": "¿El metro está ahí mismo?" },
          { "speaker": "local", "name": "Local", "spanish": "Sí, ahí mismo, en la avenida." }
        ]
      }
    ]
  }'::jsonb
FROM new_unit;

-- ─── UNIT 3: Understanding Directions on the Street ──────────────────────────

WITH new_module AS (SELECT id FROM modules WHERE title = '🚕 Taxi/Uber Chat'),
new_unit AS (
  INSERT INTO units (id, module_id, title, description, order_index, estimated_minutes)
  SELECT gen_random_uuid(), new_module.id, 'Understanding Directions on the Street', 'Understand what people say when they give you directions — including Chilean expressions.', 3, 12
  FROM new_module
  RETURNING id
)
INSERT INTO lessons (id, unit_id, title, type, order_index, content)
SELECT
  gen_random_uuid(),
  new_unit.id,
  'Understanding Directions on the Street',
  'standard',
  1,
  '{
    "pages": [
      {
        "type": "overview",
        "title": "What You''ll Learn",
        "goal": "By the end of this unit, you''ll understand the phrases Chileans use when giving directions — including a few local expressions you won''t find in a textbook.",
        "cultural_note": "Directions in Chile are often approximate. People may say ''al lado'' or ''cerquita'' (which means very close) — that doesn''t always mean right next door. It''s okay to double-check with ''¿Aquí?'' or ''¿Por acá?'' while walking."
      },
      {
        "type": "intro",
        "title": "Understanding Directions on the Street",
        "subtitle": "What locals say when they point you the way",
        "phrases": [
          { "spanish": "¿A dónde vai?", "english": "Where are you going? (Chilean informal)", "reply": "", "isChilean": true },
          { "spanish": "Está al lado.", "english": "It''s right next to it. (Chilean: can mean ''nearby'')", "reply": "", "isChilean": true },
          { "spanish": "Está lejos.", "english": "It''s far.", "reply": "", "isChilean": false },
          { "spanish": "Toma un Uber.", "english": "Take an Uber.", "reply": "", "isChilean": false },
          { "spanish": "Sigue derecho.", "english": "Go straight.", "reply": "", "isChilean": false },
          { "spanish": "Dobla a la derecha.", "english": "Turn right.", "reply": "", "isChilean": false },
          { "spanish": "Dobla a la izquierda.", "english": "Turn left.", "reply": "", "isChilean": false },
          { "spanish": "Camina un poco.", "english": "Walk a little.", "reply": "", "isChilean": false },
          { "spanish": "Cruza al tiro.", "english": "Cross right now / straight away. (Chilean)", "reply": "", "isChilean": true }
        ]
      },
      {
        "type": "multiple_choice",
        "title": "This or That",
        "items": [
          {
            "phrase": "¿A dónde vai?",
            "question": "What does this Chilean phrase mean?",
            "options": ["Where do you come from?", "Where are you going?", "How do you get there?", "Where is it?"],
            "correctAnswer": 1
          },
          {
            "phrase": "Sigue derecho.",
            "question": "What does it mean?",
            "options": ["Turn right.", "Go back.", "Go straight.", "Turn left."],
            "correctAnswer": 2
          },
          {
            "phrase": "Dobla a la derecha.",
            "question": "What does it mean?",
            "options": ["Turn left.", "Turn right.", "Go straight.", "Cross the street."],
            "correctAnswer": 1
          },
          {
            "phrase": "Cruza al tiro.",
            "question": "What does this Chilean expression mean?",
            "options": ["Cross when it''s safe.", "Don''t cross yet.", "Cross right now / straight away.", "Cross at the light."],
            "correctAnswer": 2
          },
          {
            "phrase": "Está al lado.",
            "question": "What should you keep in mind about this phrase in Chile?",
            "options": ["It always means exactly next door.", "It can mean ''nearby'' — not always right next door.", "It means it is very far.", "It means you need to turn."],
            "correctAnswer": 1
          },
          {
            "phrase": "Camina un poco.",
            "question": "What does this mean?",
            "options": ["Stop walking.", "Walk a lot.", "Walk a little.", "Walk fast."],
            "correctAnswer": 2
          },
          {
            "phrase": "Toma un Uber.",
            "question": "What is being suggested?",
            "options": ["Call a friend.", "Take the metro.", "Take a taxi.", "Take an Uber."],
            "correctAnswer": 3
          },
          {
            "phrase": "Dobla a la izquierda.",
            "question": "What does it mean?",
            "options": ["Turn right.", "Go straight.", "Turn left.", "Cross the street."],
            "correctAnswer": 2
          },
          {
            "phrase": "Está lejos.",
            "question": "What does this mean?",
            "options": ["It''s close.", "It''s right there.", "It''s far.", "It''s on the corner."],
            "correctAnswer": 2
          }
        ]
      },
      {
        "type": "audio_choice",
        "title": "Hear and React",
        "items": [
          { "question": "What phrase do you hear?", "options": ["Sigue derecho.", "Dobla a la derecha.", "Camina un poco.", "Cruza al tiro."], "correctAnswer": 0 },
          { "question": "What phrase do you hear?", "options": ["Está lejos.", "Toma un Uber.", "¿A dónde vai?", "Está al lado."], "correctAnswer": 2 },
          { "question": "What phrase do you hear?", "options": ["Dobla a la izquierda.", "Cruza al tiro.", "Sigue derecho.", "Camina un poco."], "correctAnswer": 3 },
          { "question": "What phrase do you hear?", "options": ["Toma un Uber.", "Está al lado.", "Dobla a la derecha.", "Está lejos."], "correctAnswer": 1 },
          { "question": "What phrase do you hear?", "options": ["Cruza al tiro.", "Dobla a la izquierda.", "¿A dónde vai?", "Sigue derecho."], "correctAnswer": 1 },
          { "question": "What phrase do you hear?", "options": ["Camina un poco.", "Está lejos.", "Dobla a la derecha.", "Toma un Uber."], "correctAnswer": 2 },
          { "question": "What phrase do you hear?", "options": ["Está al lado.", "Sigue derecho.", "Cruza al tiro.", "¿A dónde vai?"], "correctAnswer": 2 },
          { "question": "What phrase do you hear?", "options": ["Dobla a la izquierda.", "Camina un poco.", "Toma un Uber.", "Está lejos."], "correctAnswer": 0 },
          { "question": "What phrase do you hear?", "options": ["¿A dónde vai?", "Cruza al tiro.", "Está al lado.", "Dobla a la derecha."], "correctAnswer": 3 }
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
        "subtitle": "A local helping a tourist find a restaurant",
        "dialogue": [
          { "speaker": "local", "spanish": "¿A dónde vai?" },
          { "speaker": "tourist", "spanish": "Estoy buscando el restaurante en la calle Loreto." },
          { "speaker": "local", "spanish": "Está lejos. Toma un Uber mejor." },
          { "speaker": "tourist", "spanish": "¿No puedo caminar?" },
          { "speaker": "local", "spanish": "Puedes, pero está a veinte minutos. Sigue derecho, dobla a la derecha en el semáforo." },
          { "speaker": "tourist", "spanish": "¿Y después?" },
          { "speaker": "local", "spanish": "Camina un poco más, dobla a la izquierda y cruza al tiro." },
          { "speaker": "tourist", "spanish": "Muchas gracias, te pasaste." }
        ]
      },
      {
        "type": "recap",
        "title": "You''re Doing Great!",
        "dialogue": [
          { "speaker": "local", "name": "Local", "spanish": "¿A dónde vai?" },
          { "speaker": "tourist", "name": "Alex (Tourist)", "spanish": "Estoy buscando el restaurante en la calle Loreto." },
          { "speaker": "local", "name": "Local", "spanish": "Está lejos. Toma un Uber mejor." },
          { "speaker": "tourist", "name": "Alex (Tourist)", "spanish": "¿No puedo caminar?" },
          { "speaker": "local", "name": "Local", "spanish": "Puedes, pero está a veinte minutos. Sigue derecho, dobla a la derecha en el semáforo." },
          { "speaker": "tourist", "name": "Alex (Tourist)", "spanish": "¿Y después?" },
          { "speaker": "local", "name": "Local", "spanish": "Camina un poco más, dobla a la izquierda y cruza al tiro." },
          { "speaker": "tourist", "name": "Alex (Tourist)", "spanish": "Muchas gracias, te pasaste." }
        ]
      }
    ]
  }'::jsonb
FROM new_unit;

-- ─── UNIT 4: Small talk in a taxi ────────────────────────────────────────────

WITH new_module AS (SELECT id FROM modules WHERE title = '🚕 Taxi/Uber Chat'),
new_unit AS (
  INSERT INTO units (id, module_id, title, description, order_index, estimated_minutes)
  SELECT gen_random_uuid(), new_module.id, 'Small talk in a taxi', 'Handle the opening of a taxi or Uber ride — give your destination and keep conversation light.', 4, 12
  FROM new_module
  RETURNING id
)
INSERT INTO lessons (id, unit_id, title, type, order_index, content)
SELECT
  gen_random_uuid(),
  new_unit.id,
  'Small talk in a taxi',
  'standard',
  1,
  '{
    "pages": [
      {
        "type": "overview",
        "title": "What You''ll Learn",
        "goal": "By the end of this unit, you''ll be able to greet a driver, give your destination, and handle typical small talk about the weather, traffic, and your stay in Chile.",
        "cultural_note": "Taxi and Uber drivers often talk — a little or a lot. You don''t have to keep the conversation going if you don''t want to. Short replies like ''sí'', ''todo bien'', or ''más o menos'' are completely fine. Silence is not rude here."
      },
      {
        "type": "intro",
        "title": "Small talk in a taxi",
        "subtitle": "Phrases for greeting the driver and chatting on the way",
        "phrases": [
          { "spanish": "Buenas.", "english": "Hello / Good day. (short greeting)", "reply": "", "isChilean": false },
          { "spanish": "¿Para dónde va?", "english": "Where are you going?", "reply": "", "isChilean": false },
          { "spanish": "¿A dónde?", "english": "Where to?", "reply": "", "isChilean": false },
          { "spanish": "¿A qué dirección?", "english": "What address?", "reply": "", "isChilean": false },
          { "spanish": "¿Me puede llevar a… [place/address]?", "english": "Can you take me to… [place/address]?", "reply": "", "isChilean": false },
          { "spanish": "Aquí le muestro.", "english": "Let me show you here (showing phone).", "reply": "", "isChilean": false },
          { "spanish": "¿Cuánto tiempo te quedas en Chile?", "english": "How long are you staying in Chile?", "reply": "", "isChilean": false },
          { "spanish": "¿Vacaciones?", "english": "Vacation?", "reply": "", "isChilean": false },
          { "spanish": "¿Trabajo?", "english": "Work?", "reply": "", "isChilean": false },
          { "spanish": "Hace calor hoy.", "english": "It''s hot today.", "reply": "", "isChilean": false },
          { "spanish": "Hace frío hoy.", "english": "It''s cold today.", "reply": "", "isChilean": false },
          { "spanish": "Está helado.", "english": "It''s freezing. (Chilean expression)", "reply": "", "isChilean": true },
          { "spanish": "Hay mucho taco.", "english": "There''s a lot of traffic.", "reply": "", "isChilean": true },
          { "spanish": "Siempre hay taco acá.", "english": "There''s always traffic here.", "reply": "", "isChilean": true },
          { "spanish": "No pasa nada.", "english": "No worries / It''s fine.", "reply": "", "isChilean": false }
        ]
      },
      {
        "type": "multiple_choice",
        "title": "This or That",
        "items": [
          {
            "phrase": "Hay mucho taco.",
            "question": "What does ''taco'' mean in this Chilean context?",
            "options": ["a type of food", "traffic jam", "the taxi meter", "a long wait"],
            "correctAnswer": 1
          },
          {
            "phrase": "Está helado.",
            "question": "What does this Chilean expression mean?",
            "options": ["It''s raining.", "It''s very hot.", "It''s freezing.", "It''s windy."],
            "correctAnswer": 2
          },
          {
            "phrase": "¿Me puede llevar a… [place]?",
            "question": "What are you asking?",
            "options": ["How much does it cost to go to…?", "Can you take me to… [place]?", "Is it far to…?", "Do you know where… is?"],
            "correctAnswer": 1
          },
          {
            "phrase": "Aquí le muestro.",
            "question": "What are you doing when you say this?",
            "options": ["Asking for help.", "Showing something on your phone.", "Saying goodbye.", "Paying the driver."],
            "correctAnswer": 1
          },
          {
            "phrase": "No pasa nada.",
            "question": "What does this mean?",
            "options": ["Something happened.", "I don''t understand.", "No worries / It''s fine.", "Nothing is working."],
            "correctAnswer": 2
          },
          {
            "phrase": "¿Para dónde va?",
            "question": "When would you hear this?",
            "options": ["When a driver asks where you are going.", "When someone asks if you are lost.", "When someone asks how long you are staying.", "When a driver asks your name."],
            "correctAnswer": 0
          },
          {
            "phrase": "Siempre hay taco acá.",
            "question": "What is the driver commenting on?",
            "options": ["The food here.", "The frequent traffic in this area.", "That they are always busy.", "The long distance."],
            "correctAnswer": 1
          },
          {
            "phrase": "Buenas.",
            "question": "What is this?",
            "options": ["A farewell.", "A complaint.", "A short informal greeting.", "A way to ask for help."],
            "correctAnswer": 2
          },
          {
            "phrase": "¿Cuánto tiempo te quedas en Chile?",
            "question": "What is the driver asking?",
            "options": ["How long are you staying in Chile?", "Where are you from?", "What are you doing here?", "When are you leaving?"],
            "correctAnswer": 0
          }
        ]
      },
      {
        "type": "audio_choice",
        "title": "Hear and React",
        "items": [
          { "question": "What phrase do you hear?", "options": ["Buenas.", "¿Para dónde va?", "Hay mucho taco.", "No pasa nada."], "correctAnswer": 1 },
          { "question": "What phrase do you hear?", "options": ["Hace calor hoy.", "Está helado.", "Hace frío hoy.", "Siempre hay taco acá."], "correctAnswer": 1 },
          { "question": "What phrase do you hear?", "options": ["¿Vacaciones?", "¿Trabajo?", "¿A qué dirección?", "¿A dónde?"], "correctAnswer": 0 },
          { "question": "What phrase do you hear?", "options": ["No pasa nada.", "Aquí le muestro.", "Buenas.", "¿Me puede llevar a…?"], "correctAnswer": 3 },
          { "question": "What phrase do you hear?", "options": ["Hay mucho taco.", "Siempre hay taco acá.", "Está helado.", "Hace frío hoy."], "correctAnswer": 0 },
          { "question": "What phrase do you hear?", "options": ["¿Cuánto tiempo te quedas en Chile?", "¿Para dónde va?", "¿A dónde?", "¿A qué dirección?"], "correctAnswer": 3 },
          { "question": "What phrase do you hear?", "options": ["Hace calor hoy.", "No pasa nada.", "Buenas.", "Aquí le muestro."], "correctAnswer": 0 },
          { "question": "What phrase do you hear?", "options": ["¿Trabajo?", "¿Vacaciones?", "Buenas.", "¿Para dónde va?"], "correctAnswer": 1 },
          { "question": "What phrase do you hear?", "options": ["Siempre hay taco acá.", "No pasa nada.", "Hay mucho taco.", "Está helado."], "correctAnswer": 1 }
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
        "subtitle": "A tourist getting into a taxi in Santiago",
        "dialogue": [
          { "speaker": "local", "spanish": "Buenas. ¿Para dónde va?" },
          { "speaker": "tourist", "spanish": "¿Me puede llevar a la Plaza de Armas?" },
          { "speaker": "local", "spanish": "Claro. ¿Cuánto tiempo lleva en Chile?" },
          { "speaker": "tourist", "spanish": "Tres días. Estoy de vacaciones." },
          { "speaker": "local", "spanish": "¡Qué bueno! Hay mucho taco hoy, igual llegamos." },
          { "speaker": "tourist", "spanish": "No pasa nada." },
          { "speaker": "local", "spanish": "Siempre hay taco acá a esta hora." },
          { "speaker": "tourist", "spanish": "Hace calor hoy, ¿verdad?" },
          { "speaker": "local", "spanish": "Sí, está bien caliente. Bienvenido a Santiago." }
        ]
      },
      {
        "type": "recap",
        "title": "You''re Doing Great!",
        "dialogue": [
          { "speaker": "local", "name": "Driver", "spanish": "Buenas. ¿Para dónde va?" },
          { "speaker": "tourist", "name": "Alex (Tourist)", "spanish": "¿Me puede llevar a la Plaza de Armas?" },
          { "speaker": "local", "name": "Driver", "spanish": "Claro. ¿Cuánto tiempo lleva en Chile?" },
          { "speaker": "tourist", "name": "Alex (Tourist)", "spanish": "Tres días. Estoy de vacaciones." },
          { "speaker": "local", "name": "Driver", "spanish": "¡Qué bueno! Hay mucho taco hoy, igual llegamos." },
          { "speaker": "tourist", "name": "Alex (Tourist)", "spanish": "No pasa nada." },
          { "speaker": "local", "name": "Driver", "spanish": "Siempre hay taco acá a esta hora." },
          { "speaker": "tourist", "name": "Alex (Tourist)", "spanish": "Hace calor hoy, ¿verdad?" },
          { "speaker": "local", "name": "Driver", "spanish": "Sí, está bien caliente. Bienvenido a Santiago." }
        ]
      }
    ]
  }'::jsonb
FROM new_unit;

-- ─── UNIT 5: Solving problems in a taxi ──────────────────────────────────────

WITH new_module AS (SELECT id FROM modules WHERE title = '🚕 Taxi/Uber Chat'),
new_unit AS (
  INSERT INTO units (id, module_id, title, description, order_index, estimated_minutes)
  SELECT gen_random_uuid(), new_module.id, 'Solving problems in a taxi', 'Handle mix-ups, wrong turns, and payment questions without stress.', 5, 12
  FROM new_module
  RETURNING id
)
INSERT INTO lessons (id, unit_id, title, type, order_index, content)
SELECT
  gen_random_uuid(),
  new_unit.id,
  'Solving problems in a taxi',
  'standard',
  1,
  '{
    "pages": [
      {
        "type": "overview",
        "title": "What You''ll Learn",
        "goal": "By the end of this unit, you''ll be able to speak up if the driver goes the wrong way, ask about payment, and handle awkward taxi moments calmly.",
        "cultural_note": "If you take a street taxi (not Uber), it''s good to have efectivo (cash), as not all accept cards. Uber almost always works with cards. If something feels off, staying calm and asking simple questions works better than arguing."
      },
      {
        "type": "intro",
        "title": "Solving problems in a taxi",
        "subtitle": "Phrases for when things don''t go as planned",
        "phrases": [
          { "spanish": "¿Vamos bien?", "english": "Are we going the right way?", "reply": "", "isChilean": false },
          { "spanish": "¿Está seguro?", "english": "Are you sure?", "reply": "", "isChilean": false },
          { "spanish": "Se pasó.", "english": "You passed it. (Chilean)", "reply": "", "isChilean": true },
          { "spanish": "Era atrás.", "english": "It was back there. (Chilean)", "reply": "", "isChilean": true },
          { "spanish": "No es por ahí.", "english": "It''s not that way.", "reply": "", "isChilean": false },
          { "spanish": "No te preocupes.", "english": "Don''t worry.", "reply": "", "isChilean": false },
          { "spanish": "Es muy caro.", "english": "It''s very expensive.", "reply": "", "isChilean": false },
          { "spanish": "Es mucha plata.", "english": "That''s a lot of money. (Chilean)", "reply": "", "isChilean": true },
          { "spanish": "No tengo efectivo.", "english": "I don''t have cash.", "reply": "", "isChilean": false },
          { "spanish": "¿Se puede pagar con tarjeta?", "english": "Can I pay by card?", "reply": "", "isChilean": false }
        ]
      },
      {
        "type": "multiple_choice",
        "title": "This or That",
        "items": [
          {
            "phrase": "Se pasó.",
            "question": "What does this Chilean phrase mean?",
            "options": ["You went too fast.", "You passed it.", "You made a wrong turn.", "You are lost."],
            "correctAnswer": 1
          },
          {
            "phrase": "Era atrás.",
            "question": "What does this Chilean phrase mean?",
            "options": ["It''s ahead.", "Turn back now.", "It was back there.", "I went the wrong way."],
            "correctAnswer": 2
          },
          {
            "phrase": "¿Vamos bien?",
            "question": "What are you checking?",
            "options": ["Whether the driver is okay.", "Whether you are going the right way.", "Whether it is far.", "Whether you can pay by card."],
            "correctAnswer": 1
          },
          {
            "phrase": "Es mucha plata.",
            "question": "What does ''plata'' mean in Chilean slang?",
            "options": ["silver", "the plate", "money", "the price"],
            "correctAnswer": 2
          },
          {
            "phrase": "¿Se puede pagar con tarjeta?",
            "question": "What are you asking?",
            "options": ["How much does it cost?", "Can I pay by card?", "Do you have change?", "Is cash required?"],
            "correctAnswer": 1
          },
          {
            "phrase": "No es por ahí.",
            "question": "What does this mean?",
            "options": ["We are almost there.", "It''s not that way.", "It''s far from here.", "We passed it."],
            "correctAnswer": 1
          },
          {
            "phrase": "No te preocupes.",
            "question": "What does this mean?",
            "options": ["Don''t worry.", "Be careful.", "I don''t understand.", "It''s not a problem."],
            "correctAnswer": 0
          },
          {
            "phrase": "No tengo efectivo.",
            "question": "What does ''efectivo'' mean?",
            "options": ["card", "cash", "change", "coins"],
            "correctAnswer": 1
          },
          {
            "phrase": "¿Está seguro?",
            "question": "What are you expressing doubt about?",
            "options": ["Whether it is safe.", "Whether the driver is right.", "Whether it is expensive.", "Whether you can pay."],
            "correctAnswer": 1
          }
        ]
      },
      {
        "type": "audio_choice",
        "title": "Hear and React",
        "items": [
          { "question": "What phrase do you hear?", "options": ["¿Vamos bien?", "Se pasó.", "No es por ahí.", "Era atrás."], "correctAnswer": 0 },
          { "question": "What phrase do you hear?", "options": ["No te preocupes.", "Es muy caro.", "¿Está seguro?", "Es mucha plata."], "correctAnswer": 2 },
          { "question": "What phrase do you hear?", "options": ["Era atrás.", "Se pasó.", "¿Vamos bien?", "No es por ahí."], "correctAnswer": 1 },
          { "question": "What phrase do you hear?", "options": ["¿Se puede pagar con tarjeta?", "No tengo efectivo.", "Es mucha plata.", "Es muy caro."], "correctAnswer": 3 },
          { "question": "What phrase do you hear?", "options": ["No es por ahí.", "Era atrás.", "Se pasó.", "¿Está seguro?"], "correctAnswer": 0 },
          { "question": "What phrase do you hear?", "options": ["Es muy caro.", "No tengo efectivo.", "¿Se puede pagar con tarjeta?", "Es mucha plata."], "correctAnswer": 1 },
          { "question": "What phrase do you hear?", "options": ["¿Vamos bien?", "No te preocupes.", "Era atrás.", "Se pasó."], "correctAnswer": 3 },
          { "question": "What phrase do you hear?", "options": ["Es mucha plata.", "¿Está seguro?", "No es por ahí.", "No te preocupes."], "correctAnswer": 3 },
          { "question": "What phrase do you hear?", "options": ["No tengo efectivo.", "¿Se puede pagar con tarjeta?", "Es muy caro.", "¿Vamos bien?"], "correctAnswer": 1 }
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
        "subtitle": "A tourist dealing with a wrong turn and paying in a taxi",
        "dialogue": [
          { "speaker": "tourist", "spanish": "¿Vamos bien?" },
          { "speaker": "local", "spanish": "Sí, vamos bien." },
          { "speaker": "tourist", "spanish": "Espera… no es por ahí. Se pasó." },
          { "speaker": "local", "spanish": "Ah, era atrás. Lo siento." },
          { "speaker": "tourist", "spanish": "¿Está seguro de la ruta?" },
          { "speaker": "local", "spanish": "No te preocupes, doy la vuelta ahora." },
          { "speaker": "tourist", "spanish": "¿Cuánto es?" },
          { "speaker": "local", "spanish": "Cinco mil pesos." },
          { "speaker": "tourist", "spanish": "No tengo efectivo. ¿Se puede pagar con tarjeta?" },
          { "speaker": "local", "spanish": "Sí, sin problema." }
        ]
      },
      {
        "type": "recap",
        "title": "You''re Doing Great!",
        "dialogue": [
          { "speaker": "tourist", "name": "Alex (Tourist)", "spanish": "¿Vamos bien?" },
          { "speaker": "local", "name": "Driver", "spanish": "Sí, vamos bien." },
          { "speaker": "tourist", "name": "Alex (Tourist)", "spanish": "Espera… no es por ahí. Se pasó." },
          { "speaker": "local", "name": "Driver", "spanish": "Ah, era atrás. Lo siento." },
          { "speaker": "tourist", "name": "Alex (Tourist)", "spanish": "¿Está seguro de la ruta?" },
          { "speaker": "local", "name": "Driver", "spanish": "No te preocupes, doy la vuelta ahora." },
          { "speaker": "tourist", "name": "Alex (Tourist)", "spanish": "¿Cuánto es?" },
          { "speaker": "local", "name": "Driver", "spanish": "Cinco mil pesos." },
          { "speaker": "tourist", "name": "Alex (Tourist)", "spanish": "No tengo efectivo. ¿Se puede pagar con tarjeta?" },
          { "speaker": "local", "name": "Driver", "spanish": "Sí, sin problema." }
        ]
      }
    ]
  }'::jsonb
FROM new_unit;
