
/*
  # Add Flashcards for Module 3: Taxi/Uber Chat

  Adds flashcard sets for each of the 5 units in the "Taxi/Uber Chat" module.
  Each unit gets flashcards matching the core phrases introduced in the intro page.

  ## Units
  1. If you get lost… (aa81b2e7-6310-403f-87d5-994f45349bfc)
  2. Useful vocabulary (3e7c07ad-0514-4da6-8f46-74d0b9741fa7)
  3. Understanding Directions on the Street (65c8f7bd-fd77-463b-a18b-5456971eaa69)
  4. Small talk in a taxi (bf45d7d5-257f-44fa-9b40-4ec99368862d)
  5. Solving problems in a taxi (7302f804-f6a3-4bfa-a039-1208e2c2fe07)
*/

-- Unit 1: If you get lost…
INSERT INTO flashcards (id, unit_id, spanish_text, english_text, order_index) VALUES
  (gen_random_uuid(), 'aa81b2e7-6310-403f-87d5-994f45349bfc', 'Hola, disculpa', 'Hi, excuse me', 1),
  (gen_random_uuid(), 'aa81b2e7-6310-403f-87d5-994f45349bfc', 'Me perdí.', 'I got lost.', 2),
  (gen_random_uuid(), 'aa81b2e7-6310-403f-87d5-994f45349bfc', 'Estoy buscando… [place]', 'I''m looking for… [place]', 3),
  (gen_random_uuid(), 'aa81b2e7-6310-403f-87d5-994f45349bfc', '¿Dónde está…?', 'Where is…?', 4),
  (gen_random_uuid(), 'aa81b2e7-6310-403f-87d5-994f45349bfc', '¿Cómo llego a…?', 'How do I get to…?', 5),
  (gen_random_uuid(), 'aa81b2e7-6310-403f-87d5-994f45349bfc', '¿Para ir a…?', 'How do I go to…?', 6),
  (gen_random_uuid(), 'aa81b2e7-6310-403f-87d5-994f45349bfc', 'De nuevo, por favor.', 'Again, please.', 7),
  (gen_random_uuid(), 'aa81b2e7-6310-403f-87d5-994f45349bfc', 'Muchas gracias, te pasaste.', 'Thank you so much, you were great.', 8);

-- Unit 2: Useful vocabulary
INSERT INTO flashcards (id, unit_id, spanish_text, english_text, order_index) VALUES
  (gen_random_uuid(), '3e7c07ad-0514-4da6-8f46-74d0b9741fa7', 'el metro', 'the metro / subway', 1),
  (gen_random_uuid(), '3e7c07ad-0514-4da6-8f46-74d0b9741fa7', 'el taco', 'traffic jam', 2),
  (gen_random_uuid(), '3e7c07ad-0514-4da6-8f46-74d0b9741fa7', 'el semáforo', 'the traffic light', 3),
  (gen_random_uuid(), '3e7c07ad-0514-4da6-8f46-74d0b9741fa7', 'Ahí mismo', 'right there', 4),
  (gen_random_uuid(), '3e7c07ad-0514-4da6-8f46-74d0b9741fa7', 'Más allá', 'farther away', 5),
  (gen_random_uuid(), '3e7c07ad-0514-4da6-8f46-74d0b9741fa7', 'Al frente', 'straight ahead / across', 6),
  (gen_random_uuid(), '3e7c07ad-0514-4da6-8f46-74d0b9741fa7', 'En la esquina', 'on the corner', 7),
  (gen_random_uuid(), '3e7c07ad-0514-4da6-8f46-74d0b9741fa7', 'Al lado de', 'next to / beside', 8),
  (gen_random_uuid(), '3e7c07ad-0514-4da6-8f46-74d0b9741fa7', 'Cerca', 'close / nearby', 9),
  (gen_random_uuid(), '3e7c07ad-0514-4da6-8f46-74d0b9741fa7', 'Lejos', 'far', 10);

-- Unit 3: Understanding Directions on the Street
INSERT INTO flashcards (id, unit_id, spanish_text, english_text, order_index) VALUES
  (gen_random_uuid(), '65c8f7bd-fd77-463b-a18b-5456971eaa69', '¿A dónde vai?', 'Where are you going? (Chilean)', 1),
  (gen_random_uuid(), '65c8f7bd-fd77-463b-a18b-5456971eaa69', 'Está al lado.', 'It''s right next to it. (Chilean: can mean ''nearby'')', 2),
  (gen_random_uuid(), '65c8f7bd-fd77-463b-a18b-5456971eaa69', 'Toma un Uber.', 'Take an Uber.', 3),
  (gen_random_uuid(), '65c8f7bd-fd77-463b-a18b-5456971eaa69', 'Sigue derecho.', 'Go straight.', 4),
  (gen_random_uuid(), '65c8f7bd-fd77-463b-a18b-5456971eaa69', 'Dobla a la derecha.', 'Turn right.', 5),
  (gen_random_uuid(), '65c8f7bd-fd77-463b-a18b-5456971eaa69', 'Dobla a la izquierda.', 'Turn left.', 6),
  (gen_random_uuid(), '65c8f7bd-fd77-463b-a18b-5456971eaa69', 'Camina un poco.', 'Walk a little.', 7),
  (gen_random_uuid(), '65c8f7bd-fd77-463b-a18b-5456971eaa69', 'Cruza al tiro.', 'Cross right now / straight away. (Chilean)', 8);

-- Unit 4: Small talk in a taxi
INSERT INTO flashcards (id, unit_id, spanish_text, english_text, order_index) VALUES
  (gen_random_uuid(), 'bf45d7d5-257f-44fa-9b40-4ec99368862d', 'Buenas.', 'Hello / Good day.', 1),
  (gen_random_uuid(), 'bf45d7d5-257f-44fa-9b40-4ec99368862d', '¿Me puede llevar a… [place]?', 'Can you take me to… [place]?', 2),
  (gen_random_uuid(), 'bf45d7d5-257f-44fa-9b40-4ec99368862d', 'Aquí le muestro.', 'Let me show you here (showing phone).', 3),
  (gen_random_uuid(), 'bf45d7d5-257f-44fa-9b40-4ec99368862d', 'Hay mucho taco.', 'There''s a lot of traffic.', 4),
  (gen_random_uuid(), 'bf45d7d5-257f-44fa-9b40-4ec99368862d', 'Siempre hay taco acá.', 'There''s always traffic here.', 5),
  (gen_random_uuid(), 'bf45d7d5-257f-44fa-9b40-4ec99368862d', 'Está helado.', 'It''s freezing. (Chilean)', 6),
  (gen_random_uuid(), 'bf45d7d5-257f-44fa-9b40-4ec99368862d', 'No pasa nada.', 'No worries / It''s fine.', 7),
  (gen_random_uuid(), 'bf45d7d5-257f-44fa-9b40-4ec99368862d', 'Hace calor hoy.', 'It''s hot today.', 8);

-- Unit 5: Solving problems in a taxi
INSERT INTO flashcards (id, unit_id, spanish_text, english_text, order_index) VALUES
  (gen_random_uuid(), '7302f804-f6a3-4bfa-a039-1208e2c2fe07', '¿Vamos bien?', 'Are we going the right way?', 1),
  (gen_random_uuid(), '7302f804-f6a3-4bfa-a039-1208e2c2fe07', 'Se pasó.', 'You passed it. (Chilean)', 2),
  (gen_random_uuid(), '7302f804-f6a3-4bfa-a039-1208e2c2fe07', 'Era atrás.', 'It was back there. (Chilean)', 3),
  (gen_random_uuid(), '7302f804-f6a3-4bfa-a039-1208e2c2fe07', 'No es por ahí.', 'It''s not that way.', 4),
  (gen_random_uuid(), '7302f804-f6a3-4bfa-a039-1208e2c2fe07', 'No te preocupes.', 'Don''t worry.', 5),
  (gen_random_uuid(), '7302f804-f6a3-4bfa-a039-1208e2c2fe07', 'Es mucha plata.', 'That''s a lot of money. (Chilean)', 6),
  (gen_random_uuid(), '7302f804-f6a3-4bfa-a039-1208e2c2fe07', 'No tengo efectivo.', 'I don''t have cash.', 7),
  (gen_random_uuid(), '7302f804-f6a3-4bfa-a039-1208e2c2fe07', '¿Se puede pagar con tarjeta?', 'Can I pay by card?', 8);
