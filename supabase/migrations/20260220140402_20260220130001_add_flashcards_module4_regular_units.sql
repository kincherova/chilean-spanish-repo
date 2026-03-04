/*
  # Module 4: Flashcards for 4 Regular Units

  Adds flashcards for each of the 4 standard units in the
  "☕ Cafes & restaurants" module.

  ## Unit IDs
  - Unit 1 (Arriving & Getting a Table):     c1337693-7182-4906-af05-176ce1559953
  - Unit 2 (Reading the Menu & Ordering):    e13c2f8a-0a79-4724-b7fb-f710205594cf
  - Unit 3 (Asking Questions & Clarifying):  27a02602-8ae9-4fcf-af9c-cfc4dbb88bbe
  - Unit 4 (Paying the Bill & Tipping):      3d29e691-752c-4519-9898-d4574b9b872d
*/

-- Unit 1: Arriving & Getting a Table
INSERT INTO flashcards (id, unit_id, spanish_text, english_text, order_index) VALUES
  (gen_random_uuid(), 'c1337693-7182-4906-af05-176ce1559953', 'Hola, ¿hay mesa?', 'Hi, is there a table?', 1),
  (gen_random_uuid(), 'c1337693-7182-4906-af05-176ce1559953', '¿Mesa para uno?', 'Table for one?', 2),
  (gen_random_uuid(), 'c1337693-7182-4906-af05-176ce1559953', '¿Está abierto?', 'Are you open?', 3),
  (gen_random_uuid(), 'c1337693-7182-4906-af05-176ce1559953', '¿Tiene reserva?', 'Do you have a reservation?', 4),
  (gen_random_uuid(), 'c1337693-7182-4906-af05-176ce1559953', '¿Nos sentamos acá?', 'Can we sit here?', 5),
  (gen_random_uuid(), 'c1337693-7182-4906-af05-176ce1559953', '¿Dónde está el baño?', 'Where is the bathroom?', 6),
  (gen_random_uuid(), 'c1337693-7182-4906-af05-176ce1559953', 'Por acá', 'This way', 7),
  (gen_random_uuid(), 'c1337693-7182-4906-af05-176ce1559953', 'Ahora le atienden', 'Someone will attend to you now', 8),
  (gen_random_uuid(), 'c1337693-7182-4906-af05-176ce1559953', 'Gracias, muy amable', 'Thank you, very kind', 9);

-- Unit 2: Reading the Menu & Ordering
INSERT INTO flashcards (id, unit_id, spanish_text, english_text, order_index) VALUES
  (gen_random_uuid(), 'e13c2f8a-0a79-4724-b7fb-f710205594cf', '¿La carta, por favor?', 'The menu, please?', 1),
  (gen_random_uuid(), 'e13c2f8a-0a79-4724-b7fb-f710205594cf', '¿Tienen menú?', 'Do you have a set menu?', 2),
  (gen_random_uuid(), 'e13c2f8a-0a79-4724-b7fb-f710205594cf', 'Quiero…', 'I want…', 3),
  (gen_random_uuid(), 'e13c2f8a-0a79-4724-b7fb-f710205594cf', '¿Qué me recomienda?', 'What do you recommend?', 4),
  (gen_random_uuid(), 'e13c2f8a-0a79-4724-b7fb-f710205594cf', '¡Sin picante, por favor!', 'Without spice, please!', 5),
  (gen_random_uuid(), 'e13c2f8a-0a79-4724-b7fb-f710205594cf', 'Eso no más', 'That''s all / Nothing else', 6),
  (gen_random_uuid(), 'e13c2f8a-0a79-4724-b7fb-f710205594cf', 'Se lo traigo altiro', 'I''ll bring it right away', 7),
  (gen_random_uuid(), 'e13c2f8a-0a79-4724-b7fb-f710205594cf', 'Muy rico', 'Very tasty / Delicious', 8),
  (gen_random_uuid(), 'e13c2f8a-0a79-4724-b7fb-f710205594cf', 'Salud!', 'Cheers!', 9);

-- Unit 3: Asking Questions & Clarifying
INSERT INTO flashcards (id, unit_id, spanish_text, english_text, order_index) VALUES
  (gen_random_uuid(), '27a02602-8ae9-4fcf-af9c-cfc4dbb88bbe', '¿Qué significa…?', 'What does … mean?', 1),
  (gen_random_uuid(), '27a02602-8ae9-4fcf-af9c-cfc4dbb88bbe', '¿Qué incluye?', 'What does it include?', 2),
  (gen_random_uuid(), '27a02602-8ae9-4fcf-af9c-cfc4dbb88bbe', '¿Qué es?', 'What is it?', 3),
  (gen_random_uuid(), '27a02602-8ae9-4fcf-af9c-cfc4dbb88bbe', '¿Con qué viene?', 'What does it come with?', 4),
  (gen_random_uuid(), '27a02602-8ae9-4fcf-af9c-cfc4dbb88bbe', 'Falta algo', 'Something is missing', 5),
  (gen_random_uuid(), '27a02602-8ae9-4fcf-af9c-cfc4dbb88bbe', 'Esto no es lo que pedí', 'This is not what I ordered', 6),
  (gen_random_uuid(), '27a02602-8ae9-4fcf-af9c-cfc4dbb88bbe', 'Pedí otra cosa', 'I ordered something else', 7),
  (gen_random_uuid(), '27a02602-8ae9-4fcf-af9c-cfc4dbb88bbe', 'Está bien igual', 'It''s fine anyway', 8);

-- Unit 4: Paying the Bill & Tipping
INSERT INTO flashcards (id, unit_id, spanish_text, english_text, order_index) VALUES
  (gen_random_uuid(), '3d29e691-752c-4519-9898-d4574b9b872d', '¿La cuenta, por favor?', 'The bill, please?', 1),
  (gen_random_uuid(), '3d29e691-752c-4519-9898-d4574b9b872d', '¿Todo junto o separado?', 'All together or separate?', 2),
  (gen_random_uuid(), '3d29e691-752c-4519-9898-d4574b9b872d', 'Pago en efectivo', 'I''ll pay cash', 3),
  (gen_random_uuid(), '3d29e691-752c-4519-9898-d4574b9b872d', '¿Hay un cajero cerca?', 'Is there an ATM nearby?', 4),
  (gen_random_uuid(), '3d29e691-752c-4519-9898-d4574b9b872d', '¿Débito o crédito?', 'Debit or credit?', 5),
  (gen_random_uuid(), '3d29e691-752c-4519-9898-d4574b9b872d', '¿En cuotas?', 'In installments?', 6),
  (gen_random_uuid(), '3d29e691-752c-4519-9898-d4574b9b872d', '¿Desea agregar la propina?', 'Would you like to add the gratuity?', 7),
  (gen_random_uuid(), '3d29e691-752c-4519-9898-d4574b9b872d', 'Sí, diez por ciento', 'Yes, ten percent', 8),
  (gen_random_uuid(), '3d29e691-752c-4519-9898-d4574b9b872d', 'No, sin propina', 'No, without tip', 9);
