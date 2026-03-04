/*
  # Add flashcards for Module 5 - Shops & Paying (all 5 units)

  ## Unit IDs
  - Unit 1 (Making Enquiries): a46374a2-4b77-47e8-af31-9b542598a30b
  - Unit 2 (Conversations at the Counter): 54b64069-6729-4a3c-bc6c-959f7f003d02
  - Unit 3 (Shopping for Food): bbc96119-59f1-460b-9364-b61bd4262ba0
  - Unit 4 (Shopping for Clothes): 5f278f69-deaf-42d0-b49b-3216f5493b39
  - Unit 5 (Shopping at a Street Market): 3dd0dc72-0582-4e0a-810d-60a7fc8264de

  ## Notes
  - Flashcards match the intro phrases for each unit
  - order_index is sequential per unit
*/

-- Unit 1: Making Enquiries When Shopping
INSERT INTO flashcards (id, unit_id, spanish_text, english_text, order_index) VALUES
  (gen_random_uuid(), 'a46374a2-4b77-47e8-af31-9b542598a30b', '¿Me puede ayudar?', 'Can you help me?', 1),
  (gen_random_uuid(), 'a46374a2-4b77-47e8-af31-9b542598a30b', '¿Trabaja aquí?', 'Do you work here?', 2),
  (gen_random_uuid(), 'a46374a2-4b77-47e8-af31-9b542598a30b', 'Busco…', 'I''m looking for…', 3),
  (gen_random_uuid(), 'a46374a2-4b77-47e8-af31-9b542598a30b', '¿Tiene…?', 'Do you have…?', 4),
  (gen_random_uuid(), 'a46374a2-4b77-47e8-af31-9b542598a30b', '¿Hay uno más barato?', 'Is there a cheaper one?', 5),
  (gen_random_uuid(), 'a46374a2-4b77-47e8-af31-9b542598a30b', '¿Es chileno?', 'Is it Chilean?', 6),
  (gen_random_uuid(), 'a46374a2-4b77-47e8-af31-9b542598a30b', '¿Cuánto sale?', 'How much is it? (Chilean)', 7),
  (gen_random_uuid(), 'a46374a2-4b77-47e8-af31-9b542598a30b', '¿Cuánto es?', 'How much is it?', 8),
  (gen_random_uuid(), 'a46374a2-4b77-47e8-af31-9b542598a30b', '¿Incluye IVA?', 'Does it include tax?', 9),
  (gen_random_uuid(), 'a46374a2-4b77-47e8-af31-9b542598a30b', 'Está agotado', 'It''s out of stock', 10),
  (gen_random_uuid(), 'a46374a2-4b77-47e8-af31-9b542598a30b', 'No me queda', 'I don''t have any left (Chilean)', 11),
  (gen_random_uuid(), 'a46374a2-4b77-47e8-af31-9b542598a30b', 'Queda uno', 'There''s one left', 12),
  (gen_random_uuid(), 'a46374a2-4b77-47e8-af31-9b542598a30b', 'Solo queda este', 'Only this one is left', 13),
  (gen_random_uuid(), 'a46374a2-4b77-47e8-af31-9b542598a30b', '¿Va a llevar algo más?', 'Will you be taking anything else?', 14);

-- Unit 2: Conversations at the Counter
INSERT INTO flashcards (id, unit_id, spanish_text, english_text, order_index) VALUES
  (gen_random_uuid(), '54b64069-6729-4a3c-bc6c-959f7f003d02', '¿Dónde pago?', 'Where do I pay?', 1),
  (gen_random_uuid(), '54b64069-6729-4a3c-bc6c-959f7f003d02', '¿Puedo pagar aquí?', 'Can I pay here?', 2),
  (gen_random_uuid(), '54b64069-6729-4a3c-bc6c-959f7f003d02', 'En la caja, por favor', 'At the till, please', 3),
  (gen_random_uuid(), '54b64069-6729-4a3c-bc6c-959f7f003d02', '¿Cuánto es en total?', 'How much is it in total?', 4),
  (gen_random_uuid(), '54b64069-6729-4a3c-bc6c-959f7f003d02', '¿Efectivo o tarjeta?', 'Cash or card?', 5),
  (gen_random_uuid(), '54b64069-6729-4a3c-bc6c-959f7f003d02', '¿Débito o crédito?', 'Debit or credit?', 6),
  (gen_random_uuid(), '54b64069-6729-4a3c-bc6c-959f7f003d02', '¿En cuotas?', 'In installments?', 7),
  (gen_random_uuid(), '54b64069-6729-4a3c-bc6c-959f7f003d02', '¿Necesita la boleta?', 'Do you need the receipt?', 8),
  (gen_random_uuid(), '54b64069-6729-4a3c-bc6c-959f7f003d02', '¿Está bien el precio?', 'Is the price correct?', 9),
  (gen_random_uuid(), '54b64069-6729-4a3c-bc6c-959f7f003d02', 'Creo que hay un error', 'I think there''s a mistake', 10),
  (gen_random_uuid(), '54b64069-6729-4a3c-bc6c-959f7f003d02', 'Quiero devolver esto', 'I want to return this', 11),
  (gen_random_uuid(), '54b64069-6729-4a3c-bc6c-959f7f003d02', '¿Puedo devolverlo?', 'Can I return it?', 12),
  (gen_random_uuid(), '54b64069-6729-4a3c-bc6c-959f7f003d02', 'Quiero cambiar esto', 'I want to exchange this', 13),
  (gen_random_uuid(), '54b64069-6729-4a3c-bc6c-959f7f003d02', '¿Puedo cambiarlo?', 'Can I exchange it?', 14),
  (gen_random_uuid(), '54b64069-6729-4a3c-bc6c-959f7f003d02', 'Está malo', 'It''s faulty / broken', 15);

-- Unit 3: Shopping for Food
INSERT INTO flashcards (id, unit_id, spanish_text, english_text, order_index) VALUES
  (gen_random_uuid(), 'bbc96119-59f1-460b-9364-b61bd4262ba0', '¿Me puede ayudar?', 'Can you help me?', 1),
  (gen_random_uuid(), 'bbc96119-59f1-460b-9364-b61bd4262ba0', '¿Dónde está…?', 'Where is…?', 2),
  (gen_random_uuid(), 'bbc96119-59f1-460b-9364-b61bd4262ba0', '¿En qué pasillo está…?', 'Which aisle is… in?', 3),
  (gen_random_uuid(), 'bbc96119-59f1-460b-9364-b61bd4262ba0', 'Busco…', 'I''m looking for…', 4),
  (gen_random_uuid(), 'bbc96119-59f1-460b-9364-b61bd4262ba0', '¿Tiene…?', 'Do you have…?', 5),
  (gen_random_uuid(), 'bbc96119-59f1-460b-9364-b61bd4262ba0', '¿Hay…?', 'Is there…?', 6),
  (gen_random_uuid(), 'bbc96119-59f1-460b-9364-b61bd4262ba0', 'No, no hay', 'No, there isn''t any', 7),
  (gen_random_uuid(), 'bbc96119-59f1-460b-9364-b61bd4262ba0', 'No me queda', 'I don''t have any left (Chilean)', 8),
  (gen_random_uuid(), 'bbc96119-59f1-460b-9364-b61bd4262ba0', 'Está agotado', 'It''s out of stock', 9),
  (gen_random_uuid(), 'bbc96119-59f1-460b-9364-b61bd4262ba0', 'Queda poco', 'There''s not much left', 10),
  (gen_random_uuid(), 'bbc96119-59f1-460b-9364-b61bd4262ba0', 'Solo queda este', 'Only this one is left', 11),
  (gen_random_uuid(), 'bbc96119-59f1-460b-9364-b61bd4262ba0', 'Hay más atrás', 'There''s more in the back', 12),
  (gen_random_uuid(), 'bbc96119-59f1-460b-9364-b61bd4262ba0', '¿Hay más?', 'Is there more?', 13),
  (gen_random_uuid(), 'bbc96119-59f1-460b-9364-b61bd4262ba0', '¿Cuánto queda?', 'How much is left?', 14),
  (gen_random_uuid(), 'bbc96119-59f1-460b-9364-b61bd4262ba0', 'Precio por kilo', 'Price per kilo', 15),
  (gen_random_uuid(), 'bbc96119-59f1-460b-9364-b61bd4262ba0', 'Precio por unidad', 'Price per unit', 16),
  (gen_random_uuid(), 'bbc96119-59f1-460b-9364-b61bd4262ba0', 'Promoción', 'Promotion / on offer', 17),
  (gen_random_uuid(), 'bbc96119-59f1-460b-9364-b61bd4262ba0', '¿Me da una bolsa, por favor?', 'Can you give me a bag, please?', 18);

-- Unit 4: Shopping for Clothes
INSERT INTO flashcards (id, unit_id, spanish_text, english_text, order_index) VALUES
  (gen_random_uuid(), '5f278f69-deaf-42d0-b49b-3216f5493b39', '¿Tiene esto?', 'Do you have this?', 1),
  (gen_random_uuid(), '5f278f69-deaf-42d0-b49b-3216f5493b39', '¿Tiene otro color?', 'Do you have another colour?', 2),
  (gen_random_uuid(), '5f278f69-deaf-42d0-b49b-3216f5493b39', '¿Qué talla es?', 'What size is it?', 3),
  (gen_random_uuid(), '5f278f69-deaf-42d0-b49b-3216f5493b39', '¿Tienen una talla más grande?', 'Do you have a bigger size?', 4),
  (gen_random_uuid(), '5f278f69-deaf-42d0-b49b-3216f5493b39', '¿Tienen una talla más chica?', 'Do you have a smaller size?', 5),
  (gen_random_uuid(), '5f278f69-deaf-42d0-b49b-3216f5493b39', 'Talla S / M / L / XL', 'Size S / M / L / XL', 6),
  (gen_random_uuid(), '5f278f69-deaf-42d0-b49b-3216f5493b39', '¿Me lo puedo probar?', 'Can I try it on?', 7),
  (gen_random_uuid(), '5f278f69-deaf-42d0-b49b-3216f5493b39', '¿Dónde están los probadores?', 'Where are the fitting rooms?', 8),
  (gen_random_uuid(), '5f278f69-deaf-42d0-b49b-3216f5493b39', 'Me lo llevo', 'I''ll take it', 9);

-- Unit 5: Shopping at a Street Market
INSERT INTO flashcards (id, unit_id, spanish_text, english_text, order_index) VALUES
  (gen_random_uuid(), '3dd0dc72-0582-4e0a-810d-60a7fc8264de', '¿Qué es esto?', 'What is this?', 1),
  (gen_random_uuid(), '3dd0dc72-0582-4e0a-810d-60a7fc8264de', '¿Es de hoy?', 'Is it from today? (is it fresh?)', 2),
  (gen_random_uuid(), '3dd0dc72-0582-4e0a-810d-60a7fc8264de', 'Está fresquito', 'It''s nice and fresh (Chilean)', 3),
  (gen_random_uuid(), '3dd0dc72-0582-4e0a-810d-60a7fc8264de', '¿Cuánto es?', 'How much is it?', 4),
  (gen_random_uuid(), '3dd0dc72-0582-4e0a-810d-60a7fc8264de', 'Está caro', 'It''s expensive', 5),
  (gen_random_uuid(), '3dd0dc72-0582-4e0a-810d-60a7fc8264de', 'Está barato', 'It''s cheap', 6),
  (gen_random_uuid(), '3dd0dc72-0582-4e0a-810d-60a7fc8264de', '¿Me da…?', 'Can you give me…?', 7),
  (gen_random_uuid(), '3dd0dc72-0582-4e0a-810d-60a7fc8264de', '¿Me hace precio?', 'Can you give me a better price? (Chilean)', 8),
  (gen_random_uuid(), '3dd0dc72-0582-4e0a-810d-60a7fc8264de', '¿Acepta tarjeta?', 'Do you accept card?', 9),
  (gen_random_uuid(), '3dd0dc72-0582-4e0a-810d-60a7fc8264de', '¿Solo efectivo?', 'Cash only?', 10),
  (gen_random_uuid(), '3dd0dc72-0582-4e0a-810d-60a7fc8264de', 'No tengo sencillo', 'I don''t have change (Chilean)', 11),
  (gen_random_uuid(), '3dd0dc72-0582-4e0a-810d-60a7fc8264de', '¿Tiene cambio?', 'Do you have change?', 12),
  (gen_random_uuid(), '3dd0dc72-0582-4e0a-810d-60a7fc8264de', '¿Me da el vuelto?', 'Can you give me the change?', 13),
  (gen_random_uuid(), '3dd0dc72-0582-4e0a-810d-60a7fc8264de', 'A luca', 'At a thousand pesos (Chilean)', 14),
  (gen_random_uuid(), '3dd0dc72-0582-4e0a-810d-60a7fc8264de', 'Está filete', 'It''s great quality (Chilean slang)', 15);
