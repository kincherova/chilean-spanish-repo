
/*
  # Add Flashcards for Module 2: At the Airport

  Adds flashcard sets for each of the 4 units in the "At the Airport" module.
  Each unit gets 9 flashcards matching the phrases introduced in the intro page.
*/

-- Unit 1: Immigration & Passport Control
INSERT INTO flashcards (id, unit_id, spanish_text, english_text, order_index) VALUES
  (gen_random_uuid(), 'f564bca0-10c9-4a5f-88b8-47c221534217', '¿Cuál es el motivo de su visita?', 'What is the purpose of your visit?', 1),
  (gen_random_uuid(), 'f564bca0-10c9-4a5f-88b8-47c221534217', 'Turismo', 'Tourism', 2),
  (gen_random_uuid(), 'f564bca0-10c9-4a5f-88b8-47c221534217', '¿Cuánto tiempo va a estar en Chile?', 'How long will you be in Chile?', 3),
  (gen_random_uuid(), 'f564bca0-10c9-4a5f-88b8-47c221534217', 'Dos semanas', 'Two weeks', 4),
  (gen_random_uuid(), 'f564bca0-10c9-4a5f-88b8-47c221534217', '¿Tiene algo que declarar?', 'Do you have anything to declare?', 5),
  (gen_random_uuid(), 'f564bca0-10c9-4a5f-88b8-47c221534217', 'No, nada', 'No, nothing', 6),
  (gen_random_uuid(), 'f564bca0-10c9-4a5f-88b8-47c221534217', '¿Dónde se va a hospedar?', 'Where will you be staying?', 7),
  (gen_random_uuid(), 'f564bca0-10c9-4a5f-88b8-47c221534217', 'En un hotel', 'In a hotel', 8),
  (gen_random_uuid(), 'f564bca0-10c9-4a5f-88b8-47c221534217', 'Aquí tiene mi pasaporte', 'Here is my passport', 9);

-- Unit 2: Customs
INSERT INTO flashcards (id, unit_id, spanish_text, english_text, order_index) VALUES
  (gen_random_uuid(), 'b2a9fe6e-aa13-4be4-b4ab-df9aed9ff243', '¿Tiene algo que declarar?', 'Do you have anything to declare?', 1),
  (gen_random_uuid(), 'b2a9fe6e-aa13-4be4-b4ab-df9aed9ff243', 'No tengo nada que declarar', 'I have nothing to declare', 2),
  (gen_random_uuid(), 'b2a9fe6e-aa13-4be4-b4ab-df9aed9ff243', '¿Puede abrir su maleta, por favor?', 'Can you open your suitcase, please?', 3),
  (gen_random_uuid(), 'b2a9fe6e-aa13-4be4-b4ab-df9aed9ff243', 'Claro, con gusto', 'Of course, gladly', 4),
  (gen_random_uuid(), 'b2a9fe6e-aa13-4be4-b4ab-df9aed9ff243', '¿Trae frutas o verduras?', 'Are you bringing fruits or vegetables?', 5),
  (gen_random_uuid(), 'b2a9fe6e-aa13-4be4-b4ab-df9aed9ff243', 'No, no traigo', 'No, I''m not bringing any', 6),
  (gen_random_uuid(), 'b2a9fe6e-aa13-4be4-b4ab-df9aed9ff243', '¿Es para uso personal?', 'Is it for personal use?', 7),
  (gen_random_uuid(), 'b2a9fe6e-aa13-4be4-b4ab-df9aed9ff243', 'Sí, es para uso personal', 'Yes, it''s for personal use', 8),
  (gen_random_uuid(), 'b2a9fe6e-aa13-4be4-b4ab-df9aed9ff243', 'Puede pasar', 'You may proceed', 9);

-- Unit 3: Finding the Exit, Taxi & Uber Zone
INSERT INTO flashcards (id, unit_id, spanish_text, english_text, order_index) VALUES
  (gen_random_uuid(), 'b7851190-3e90-45d1-8a44-4dd977a21101', '¿Dónde está la salida?', 'Where is the exit?', 1),
  (gen_random_uuid(), 'b7851190-3e90-45d1-8a44-4dd977a21101', '¿Dónde están los taxis?', 'Where are the taxis?', 2),
  (gen_random_uuid(), 'b7851190-3e90-45d1-8a44-4dd977a21101', '¿Dónde se toma el Uber?', 'Where do you take the Uber?', 3),
  (gen_random_uuid(), 'b7851190-3e90-45d1-8a44-4dd977a21101', 'Siga recto', 'Go straight', 4),
  (gen_random_uuid(), 'b7851190-3e90-45d1-8a44-4dd977a21101', 'A la derecha', 'To the right', 5),
  (gen_random_uuid(), 'b7851190-3e90-45d1-8a44-4dd977a21101', 'A la izquierda', 'To the left', 6),
  (gen_random_uuid(), 'b7851190-3e90-45d1-8a44-4dd977a21101', 'En la planta baja', 'On the ground floor', 7),
  (gen_random_uuid(), 'b7851190-3e90-45d1-8a44-4dd977a21101', 'Afuera del terminal', 'Outside the terminal', 8),
  (gen_random_uuid(), 'b7851190-3e90-45d1-8a44-4dd977a21101', '¿Está lejos?', 'Is it far?', 9);

-- Unit 4: Asking for Help at the Airport
INSERT INTO flashcards (id, unit_id, spanish_text, english_text, order_index) VALUES
  (gen_random_uuid(), 'd2aaa7f4-b1c7-41dc-8815-e0101727a1cb', 'Disculpe, ¿me puede ayudar?', 'Excuse me, can you help me?', 1),
  (gen_random_uuid(), 'd2aaa7f4-b1c7-41dc-8815-e0101727a1cb', 'No encuentro mi maleta', 'I can''t find my suitcase', 2),
  (gen_random_uuid(), 'd2aaa7f4-b1c7-41dc-8815-e0101727a1cb', 'Perdí mi equipaje', 'I lost my luggage', 3),
  (gen_random_uuid(), 'd2aaa7f4-b1c7-41dc-8815-e0101727a1cb', '¿Dónde está la oficina de equipaje perdido?', 'Where is the lost luggage office?', 4),
  (gen_random_uuid(), 'd2aaa7f4-b1c7-41dc-8815-e0101727a1cb', 'No entiendo', 'I don''t understand', 5),
  (gen_random_uuid(), 'd2aaa7f4-b1c7-41dc-8815-e0101727a1cb', '¿Puede repetir más despacio?', 'Can you repeat more slowly?', 6),
  (gen_random_uuid(), 'd2aaa7f4-b1c7-41dc-8815-e0101727a1cb', '¿Habla inglés?', 'Do you speak English?', 7),
  (gen_random_uuid(), 'd2aaa7f4-b1c7-41dc-8815-e0101727a1cb', 'Necesito ayuda', 'I need help', 8),
  (gen_random_uuid(), 'd2aaa7f4-b1c7-41dc-8815-e0101727a1cb', '¿Dónde está la información?', 'Where is the information desk?', 9);
