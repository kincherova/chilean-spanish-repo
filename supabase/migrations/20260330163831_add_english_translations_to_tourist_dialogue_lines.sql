/*
  # Add English translations to tourist dialogue lines

  All dialogue pages have tourist lines with null English text, causing
  "Tap to see your reply" to show instead of an actual English translation.
  This migration updates each lesson's content JSONB to populate the English
  field for every tourist line in every dialogue page.
*/

-- Helper function to update tourist lines in a dialogue array
CREATE OR REPLACE FUNCTION update_tourist_english(
  dialogue jsonb,
  spanish_text text,
  english_text text
) RETURNS jsonb AS $$
  SELECT jsonb_agg(
    CASE
      WHEN (line->>'spanish') = spanish_text AND (line->>'speaker') NOT IN ('local', 'waiter')
        THEN jsonb_set(line, '{english}', to_jsonb(english_text))
      ELSE line
    END
  )
  FROM jsonb_array_elements(dialogue) AS line;
$$ LANGUAGE sql IMMUTABLE;

-- Helper: update a specific dialogue page in a lesson's pages array
CREATE OR REPLACE FUNCTION patch_lesson_dialogue(
  lesson_id uuid,
  spanish_text text,
  english_text text
) RETURNS void AS $$
DECLARE
  new_pages jsonb;
BEGIN
  SELECT jsonb_agg(
    CASE
      WHEN page->>'type' = 'dialogue'
        THEN jsonb_set(page, '{dialogue}', update_tourist_english(page->'dialogue', spanish_text, english_text))
      ELSE page
    END
  )
  INTO new_pages
  FROM jsonb_array_elements((SELECT content->'pages' FROM lessons WHERE id = lesson_id)) AS page;

  UPDATE lessons SET content = jsonb_set(content, '{pages}', new_pages) WHERE id = lesson_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- Arriving & Getting a Table (99a90297-c089-4573-9aba-aadc2b6db587)
-- ============================================================
SELECT patch_lesson_dialogue('99a90297-c089-4573-9aba-aadc2b6db587', 'Hola, ¿está abierto?', 'Hi, are you open?');
SELECT patch_lesson_dialogue('99a90297-c089-4573-9aba-aadc2b6db587', '¿Hay mesa para dos?', 'Is there a table for two?');
SELECT patch_lesson_dialogue('99a90297-c089-4573-9aba-aadc2b6db587', 'No, no tengo reserva.', 'No, I don''t have a reservation.');
SELECT patch_lesson_dialogue('99a90297-c089-4573-9aba-aadc2b6db587', '¿Aquí está bien?', 'Is here okay?');
SELECT patch_lesson_dialogue('99a90297-c089-4573-9aba-aadc2b6db587', 'Gracias, muy amable. ¿Dónde está el baño?', 'Thanks, very kind. Where is the bathroom?');

-- ============================================================
-- Asking for clarification (9b6ef049-e5d9-4a82-a191-760989f48a03)
-- ============================================================
SELECT patch_lesson_dialogue('9b6ef049-e5d9-4a82-a191-760989f48a03', 'No entendí. ¿Puedes repetir, por favor?', 'I didn''t understand. Can you repeat, please?');
SELECT patch_lesson_dialogue('9b6ef049-e5d9-4a82-a191-760989f48a03', 'Ah, de Canadá.', 'Ah, from Canada.');
SELECT patch_lesson_dialogue('9b6ef049-e5d9-4a82-a191-760989f48a03', '¡Qué bueno!', 'How great!');
SELECT patch_lesson_dialogue('9b6ef049-e5d9-4a82-a191-760989f48a03', '¿Cómo? ¡Disculpa! ¿Qué significa eso?', 'Sorry? Excuse me! What does that mean?');
SELECT patch_lesson_dialogue('9b6ef049-e5d9-4a82-a191-760989f48a03', 'Ah, sí, primera vez. ¡Me gusta Chile!', 'Ah yes, first time. I like Chile!');

-- ============================================================
-- Asking for Help at the Airport (6b9fedb4-caf9-4c1c-b0fa-ff7f182d3f11)
-- ============================================================
SELECT patch_lesson_dialogue('6b9fedb4-caf9-4c1c-b0fa-ff7f182d3f11', 'Disculpe, ¿me puede ayudar?', 'Excuse me, can you help me?');
SELECT patch_lesson_dialogue('6b9fedb4-caf9-4c1c-b0fa-ff7f182d3f11', 'No encuentro mi maleta.', 'I can''t find my suitcase.');
SELECT patch_lesson_dialogue('6b9fedb4-caf9-4c1c-b0fa-ff7f182d3f11', 'No entiendo. ¿Puede repetir más lento?', 'I don''t understand. Can you repeat more slowly?');
SELECT patch_lesson_dialogue('6b9fedb4-caf9-4c1c-b0fa-ff7f182d3f11', 'Ah, vuelo desde Buenos Aires.', 'Ah, flight from Buenos Aires.');
SELECT patch_lesson_dialogue('6b9fedb4-caf9-4c1c-b0fa-ff7f182d3f11', 'Muchas gracias.', 'Thank you very much.');

-- ============================================================
-- Asking Questions & Clarifying (b14e0cec-5fee-4e24-b464-f5625df88490)
-- ============================================================
SELECT patch_lesson_dialogue('b14e0cec-5fee-4e24-b464-f5625df88490', '¿Qué es el ''churrasco''?', 'What is the ''churrasco''?');
SELECT patch_lesson_dialogue('b14e0cec-5fee-4e24-b464-f5625df88490', '¿Con qué viene?', 'What does it come with?');
SELECT patch_lesson_dialogue('b14e0cec-5fee-4e24-b464-f5625df88490', 'Entonces quiero un churrasco.', 'Then I want a churrasco.');
SELECT patch_lesson_dialogue('b14e0cec-5fee-4e24-b464-f5625df88490', 'Espera… esto no es lo que pedí. Pedí el churrasco.', 'Wait… this isn''t what I ordered. I ordered the churrasco.');
SELECT patch_lesson_dialogue('b14e0cec-5fee-4e24-b464-f5625df88490', 'Está bien igual, no hay problema.', 'It''s fine anyway, no problem.');

-- ============================================================
-- Conversations at the Counter (cd1fab9f-86fd-4f16-abcf-d9700d0f1afb)
-- ============================================================
SELECT patch_lesson_dialogue('cd1fab9f-86fd-4f16-abcf-d9700d0f1afb', 'Disculpa, quiero devolver esto.', 'Excuse me, I want to return this.');
SELECT patch_lesson_dialogue('cd1fab9f-86fd-4f16-abcf-d9700d0f1afb', 'Sí, aquí tiene.', 'Yes, here you go.');
SELECT patch_lesson_dialogue('cd1fab9f-86fd-4f16-abcf-d9700d0f1afb', 'Quiero cambiarlo, por favor.', 'I want to exchange it, please.');
SELECT patch_lesson_dialogue('cd1fab9f-86fd-4f16-abcf-d9700d0f1afb', 'Sí, aquí está.', 'Yes, here it is.');

-- ============================================================
-- Customs (9b1071aa-b319-4246-a5f2-fef355de8863)
-- ============================================================
SELECT patch_lesson_dialogue('9b1071aa-b319-4246-a5f2-fef355de8863', 'No tengo nada que declarar.', 'I have nothing to declare.');
SELECT patch_lesson_dialogue('9b1071aa-b319-4246-a5f2-fef355de8863', 'Turismo.', 'Tourism.');
SELECT patch_lesson_dialogue('9b1071aa-b319-4246-a5f2-fef355de8863', 'Sí, es para uso personal.', 'Yes, it''s for personal use.');
SELECT patch_lesson_dialogue('9b1071aa-b319-4246-a5f2-fef355de8863', 'No, no traigo.', 'No, I''m not bringing any.');
SELECT patch_lesson_dialogue('9b1071aa-b319-4246-a5f2-fef355de8863', 'Por supuesto.', 'Of course.');

-- ============================================================
-- Finding the Exit, Taxi & Uber Zone (388e7589-7f4d-402d-907c-543988cac82a)
-- ============================================================
SELECT patch_lesson_dialogue('388e7589-7f4d-402d-907c-543988cac82a', 'Disculpe, ¿dónde está la salida?', 'Excuse me, where is the exit?');
SELECT patch_lesson_dialogue('388e7589-7f4d-402d-907c-543988cac82a', 'Derecho. A la derecha. Gracias. ¿Y los taxis?', 'Straight ahead. To the right. Thanks. And the taxis?');
SELECT patch_lesson_dialogue('388e7589-7f4d-402d-907c-543988cac82a', 'Disculpe, ¿dónde se toma el Uber?', 'Excuse me, where do you take an Uber?');
SELECT patch_lesson_dialogue('388e7589-7f4d-402d-907c-543988cac82a', '¿Está lejos?', 'Is it far?');
SELECT patch_lesson_dialogue('388e7589-7f4d-402d-907c-543988cac82a', 'Muchas gracias.', 'Thank you very much.');

-- ============================================================
-- Giving short answers (c84ad507-2640-46ae-b6f1-ff586e63f483)
-- ============================================================
SELECT patch_lesson_dialogue('c84ad507-2640-46ae-b6f1-ff586e63f483', 'Más o menos.', 'More or less.');
SELECT patch_lesson_dialogue('c84ad507-2640-46ae-b6f1-ff586e63f483', 'Sí, gracias. ¿Farmacia?', 'Yes, thanks. Pharmacy?');
SELECT patch_lesson_dialogue('c84ad507-2640-46ae-b6f1-ff586e63f483', 'Perfecto, muchas gracias.', 'Perfect, thank you very much.');
SELECT patch_lesson_dialogue('c84ad507-2640-46ae-b6f1-ff586e63f483', 'Chao.', 'Bye.');

-- ============================================================
-- If you get lost… (559b72d2-1ef8-448d-87d2-d1627a8be90e)
-- ============================================================
SELECT patch_lesson_dialogue('559b72d2-1ef8-448d-87d2-d1627a8be90e', 'Hola, disculpa. Me perdí.', 'Hi, excuse me. I''m lost.');
SELECT patch_lesson_dialogue('559b72d2-1ef8-448d-87d2-d1627a8be90e', 'Estoy buscando el metro.', 'I''m looking for the metro.');
SELECT patch_lesson_dialogue('559b72d2-1ef8-448d-87d2-d1627a8be90e', '¿Cómo llego a la plaza?', 'How do I get to the plaza?');
SELECT patch_lesson_dialogue('559b72d2-1ef8-448d-87d2-d1627a8be90e', 'De nuevo, por favor.', 'Again, please.');
SELECT patch_lesson_dialogue('559b72d2-1ef8-448d-87d2-d1627a8be90e', 'Muchas gracias, te pasaste.', 'Thank you so much, you''re the best.');

-- ============================================================
-- Immigration & Passport Control (2fb0c3a3-a14c-43fc-8d9d-b1cc0f5de872)
-- ============================================================
SELECT patch_lesson_dialogue('2fb0c3a3-a14c-43fc-8d9d-b1cc0f5de872', 'Aquí tiene.', 'Here you go.');
SELECT patch_lesson_dialogue('2fb0c3a3-a14c-43fc-8d9d-b1cc0f5de872', 'Turismo.', 'Tourism.');
SELECT patch_lesson_dialogue('2fb0c3a3-a14c-43fc-8d9d-b1cc0f5de872', 'De Estados Unidos.', 'From the United States.');
SELECT patch_lesson_dialogue('2fb0c3a3-a14c-43fc-8d9d-b1cc0f5de872', 'Aquí le muestro. (shows phone) En un hotel en Santiago.', 'Let me show you. (shows phone) At a hotel in Santiago.');
SELECT patch_lesson_dialogue('2fb0c3a3-a14c-43fc-8d9d-b1cc0f5de872', 'Tres semanas.', 'Three weeks.');

-- ============================================================
-- Making Enquiries When Shopping (b81ae613-577a-4bc8-b6a8-b87d8b97021a)
-- ============================================================
SELECT patch_lesson_dialogue('b81ae613-577a-4bc8-b6a8-b87d8b97021a', 'Disculpa, ¿trabaja aquí?', 'Excuse me, do you work here?');
SELECT patch_lesson_dialogue('b81ae613-577a-4bc8-b6a8-b87d8b97021a', 'La M. ¿Cuánto sale?', 'The M. How much is it?');
SELECT patch_lesson_dialogue('b81ae613-577a-4bc8-b6a8-b87d8b97021a', '¿Hay una más grande?', 'Is there a bigger one?');
SELECT patch_lesson_dialogue('b81ae613-577a-4bc8-b6a8-b87d8b97021a', 'Entonces, no. Muchas gracias.', 'Then no. Thank you very much.');

-- ============================================================
-- Paying the Bill & Tipping (59bde145-4031-4f76-9de4-b0bd4a0fdd12)
-- ============================================================
SELECT patch_lesson_dialogue('59bde145-4031-4f76-9de4-b0bd4a0fdd12', '¿La cuenta, por favor?', 'The bill, please?');
SELECT patch_lesson_dialogue('59bde145-4031-4f76-9de4-b0bd4a0fdd12', 'Sí, por favor.', 'Yes, please.');
SELECT patch_lesson_dialogue('59bde145-4031-4f76-9de4-b0bd4a0fdd12', 'Todo junto.', 'All together.');
SELECT patch_lesson_dialogue('59bde145-4031-4f76-9de4-b0bd4a0fdd12', 'Crédito, por favor.', 'Credit, please.');
SELECT patch_lesson_dialogue('59bde145-4031-4f76-9de4-b0bd4a0fdd12', 'No, sin cuotas.', 'No, no installments.');
SELECT patch_lesson_dialogue('59bde145-4031-4f76-9de4-b0bd4a0fdd12', 'Sí, claro, diez por ciento.', 'Yes, of course, ten percent.');
SELECT patch_lesson_dialogue('59bde145-4031-4f76-9de4-b0bd4a0fdd12', 'Chao, gracias.', 'Bye, thanks.');

-- ============================================================
-- Polite exits / endings (b571fe41-04ba-4d44-b316-eb2772458160)
-- ============================================================
SELECT patch_lesson_dialogue('b571fe41-04ba-4d44-b316-eb2772458160', 'Nada más, gracias.', 'Nothing else, thanks.');
SELECT patch_lesson_dialogue('b571fe41-04ba-4d44-b316-eb2772458160', 'No, gracias. Eso sería todo.', 'No, thanks. That''ll be all.');
SELECT patch_lesson_dialogue('b571fe41-04ba-4d44-b316-eb2772458160', 'Listo, gracias.', 'Done, thanks.');
SELECT patch_lesson_dialogue('b571fe41-04ba-4d44-b316-eb2772458160', 'Muchas gracias, hasta luego.', 'Thank you very much, goodbye.');

-- ============================================================
-- Reading the Menu & Ordering (d202400c-8040-4ad8-986c-784d3b98b31a)
-- ============================================================
SELECT patch_lesson_dialogue('d202400c-8040-4ad8-986c-784d3b98b31a', 'Hola, ¿la carta, por favor?', 'Hi, the menu, please?');
SELECT patch_lesson_dialogue('d202400c-8040-4ad8-986c-784d3b98b31a', '¿Tienen menú hoy?', 'Do you have a set menu today?');
SELECT patch_lesson_dialogue('d202400c-8040-4ad8-986c-784d3b98b31a', 'Agua sin gas, por favor. ¿Qué me recomienda para comer?', 'Still water, please. What do you recommend to eat?');
SELECT patch_lesson_dialogue('d202400c-8040-4ad8-986c-784d3b98b31a', 'Quiero el lomo con ensalada. ¡Sin picante, por favor! Soy alérgico.', 'I want the loin with salad. No spice, please! I''m allergic.');
SELECT patch_lesson_dialogue('d202400c-8040-4ad8-986c-784d3b98b31a', 'Eso no más, gracias.', 'That''s all, thanks.');

-- ============================================================
-- Shopping at a Street Market (bd6a4c50-09f8-4769-bee7-450c10736df5)
-- ============================================================
SELECT patch_lesson_dialogue('bd6a4c50-09f8-4769-bee7-450c10736df5', 'Hola. ¿Cuánto es esto?', 'Hi. How much is this?');
SELECT patch_lesson_dialogue('bd6a4c50-09f8-4769-bee7-450c10736df5', '¿Es de hoy?', 'Is it from today?');
SELECT patch_lesson_dialogue('bd6a4c50-09f8-4769-bee7-450c10736df5', 'Está un poco caro. ¿Me hace precio?', 'It''s a bit expensive. Can you give me a better price?');
SELECT patch_lesson_dialogue('bd6a4c50-09f8-4769-bee7-450c10736df5', 'Perfecto. ¿Acepta tarjeta?', 'Perfect. Do you accept card?');
SELECT patch_lesson_dialogue('bd6a4c50-09f8-4769-bee7-450c10736df5', 'Sí, aquí tiene. ¿Me da el vuelto?', 'Yes, here you go. Can you give me my change?');

-- ============================================================
-- Shopping for Clothes (e6088471-5b90-466c-8846-989293dcc8c1)
-- ============================================================
SELECT patch_lesson_dialogue('e6088471-5b90-466c-8846-989293dcc8c1', '¿Tiene otro color?', 'Do you have another color?');
SELECT patch_lesson_dialogue('e6088471-5b90-466c-8846-989293dcc8c1', 'El negro, por favor. ¿Me lo puedo probar?', 'The black one, please. Can I try it on?');
SELECT patch_lesson_dialogue('e6088471-5b90-466c-8846-989293dcc8c1', 'Sí. ¿Tiene esto en talla M?', 'Yes. Do you have this in size M?');
SELECT patch_lesson_dialogue('e6088471-5b90-466c-8846-989293dcc8c1', 'Perfecto. Me lo llevo.', 'Perfect. I''ll take it.');

-- ============================================================
-- Shopping for Food (592a478a-04b9-4e30-8a89-23e1610e9cc2)
-- ============================================================
SELECT patch_lesson_dialogue('592a478a-04b9-4e30-8a89-23e1610e9cc2', 'Disculpa, ¿me puede ayudar?', 'Excuse me, can you help me?');
SELECT patch_lesson_dialogue('592a478a-04b9-4e30-8a89-23e1610e9cc2', 'Leche. ¿Dónde está?', 'Milk. Where is it?');
SELECT patch_lesson_dialogue('592a478a-04b9-4e30-8a89-23e1610e9cc2', 'Gracias. ¿Hay yogur también?', 'Thanks. Is there yogurt too?');
SELECT patch_lesson_dialogue('592a478a-04b9-4e30-8a89-23e1610e9cc2', 'Está bien. ¿Me da una bolsa, por favor?', 'That''s fine. Can you give me a bag, please?');

-- ============================================================
-- Small talk in a taxi (436b0dcc-fcf1-43b8-aacf-a5ec291eba23)
-- ============================================================
SELECT patch_lesson_dialogue('436b0dcc-fcf1-43b8-aacf-a5ec291eba23', '¿Me puede llevar a la Plaza de Armas?', 'Can you take me to the Plaza de Armas?');
SELECT patch_lesson_dialogue('436b0dcc-fcf1-43b8-aacf-a5ec291eba23', 'Hace calor hoy, ¿verdad?', 'It''s hot today, isn''t it?');
SELECT patch_lesson_dialogue('436b0dcc-fcf1-43b8-aacf-a5ec291eba23', 'Tres días. Estoy de vacaciones.', 'Three days. I''m on vacation.');
SELECT patch_lesson_dialogue('436b0dcc-fcf1-43b8-aacf-a5ec291eba23', 'No pasa nada.', 'No worries.');

-- ============================================================
-- Solving problems in a taxi (872cd827-8736-4cce-943b-d7696029e394)
-- ============================================================
SELECT patch_lesson_dialogue('872cd827-8736-4cce-943b-d7696029e394', '¿Vamos bien?', 'Are we going the right way?');
SELECT patch_lesson_dialogue('872cd827-8736-4cce-943b-d7696029e394', 'Espera… no es por ahí. Se pasó.', 'Wait… it''s not that way. You passed it.');
SELECT patch_lesson_dialogue('872cd827-8736-4cce-943b-d7696029e394', 'No es por allí.', 'It''s not that way.');
SELECT patch_lesson_dialogue('872cd827-8736-4cce-943b-d7696029e394', '¿Cuánto es?', 'How much is it?');
SELECT patch_lesson_dialogue('872cd827-8736-4cce-943b-d7696029e394', 'No tengo efectivo. ¿Se puede pagar con tarjeta?', 'I don''t have cash. Can I pay by card?');

-- ============================================================
-- Understanding Directions on the Street (d15a8429-9736-4224-acb2-3cbe4f590178)
-- ============================================================
SELECT patch_lesson_dialogue('d15a8429-9736-4224-acb2-3cbe4f590178', 'Estoy buscando un restaurante en la calle Apoquindo.', 'I''m looking for a restaurant on Apoquindo street.');
SELECT patch_lesson_dialogue('d15a8429-9736-4224-acb2-3cbe4f590178', '¿No puedo caminar?', 'Can''t I walk?');
SELECT patch_lesson_dialogue('d15a8429-9736-4224-acb2-3cbe4f590178', '¿Y después?', 'And then?');
SELECT patch_lesson_dialogue('d15a8429-9736-4224-acb2-3cbe4f590178', 'Perfecto. Muchas gracias, te pasaste.', 'Perfect. Thank you so much, you''re the best.');

-- ============================================================
-- Understanding informal comments (f3d352c1-aa17-46d0-8ae9-d75548e4a8f4)
-- ============================================================
SELECT patch_lesson_dialogue('f3d352c1-aa17-46d0-8ae9-d75548e4a8f4', 'Bien, ¿y tú?', 'Good, and you?');
SELECT patch_lesson_dialogue('f3d352c1-aa17-46d0-8ae9-d75548e4a8f4', 'Dale.', 'Sure / Go ahead.');
SELECT patch_lesson_dialogue('f3d352c1-aa17-46d0-8ae9-d75548e4a8f4', 'Muchas gracias.', 'Thank you very much.');
SELECT patch_lesson_dialogue('f3d352c1-aa17-46d0-8ae9-d75548e4a8f4', 'Así nomás, gracias.', 'Just like that, thanks.');

-- ============================================================
-- Useful vocabulary (c01a8596-938f-48a7-b4cd-022c19e9ddcc)
-- ============================================================
SELECT patch_lesson_dialogue('c01a8596-938f-48a7-b4cd-022c19e9ddcc', 'Disculpa, ¿la plaza está lejos?', 'Excuse me, is the plaza far?');
SELECT patch_lesson_dialogue('c01a8596-938f-48a7-b4cd-022c19e9ddcc', '¿Y la parada de micro?', 'And the bus stop?');
SELECT patch_lesson_dialogue('c01a8596-938f-48a7-b4cd-022c19e9ddcc', '¿Está lejos?', 'Is it far?');
SELECT patch_lesson_dialogue('c01a8596-938f-48a7-b4cd-022c19e9ddcc', '¿El metro está ahí mismo?', 'Is the metro right there?');

-- Clean up helper functions
DROP FUNCTION IF EXISTS patch_lesson_dialogue(uuid, text, text);
DROP FUNCTION IF EXISTS update_tourist_english(jsonb, text, text);
