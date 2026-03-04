/*
  # Module 5 - Shops & Paying: Create all 5 units with lessons

  ## Overview
  Creates 5 units for the existing "Shops & paying" module (id: 3246d38c-48aa-4367-a37f-09ca9ee84f5c).
  Each unit follows the standard 7-page lesson structure used in modules 1-3.

  ## Units Created
  1. Making Enquiries When Shopping
  2. Conversations at the Counter (Paying, Returns, Problems)
  3. Shopping for Food (Supermarkets & Corner Shops)
  4. Shopping for Clothes (Malls)
  5. Shopping at a Street Market (Ferias & Street Stalls)

  ## Structure per unit
  - 1 unit record
  - 1 lesson with 7 pages: overview, intro, multiple_choice, audio_choice, flashcards, dialogue, recap

  ## Notes
  - Chilean phrases marked with isChilean: true
  - No vocabulary units (same structure as modules 1-3)
*/

DO $$
DECLARE
  module_id uuid := '3246d38c-48aa-4367-a37f-09ca9ee84f5c';
  unit1_id uuid;
  unit2_id uuid;
  unit3_id uuid;
  unit4_id uuid;
  unit5_id uuid;
BEGIN

-- ============================================================
-- UNIT 1: Making Enquiries When Shopping
-- ============================================================
INSERT INTO units (id, module_id, title, description, order_index, estimated_minutes)
VALUES (gen_random_uuid(), module_id, 'Making Enquiries When Shopping', 'Ask for help, find what you need, and understand stock replies in Chilean shops.', 1, 12)
RETURNING id INTO unit1_id;

INSERT INTO lessons (id, unit_id, title, type, order_index, content)
VALUES (gen_random_uuid(), unit1_id, 'Making Enquiries When Shopping', 'standard', 1, '{
  "pages": [
    {
      "type": "overview",
      "title": "What You''ll Learn",
      "goal": "By the end of this unit, you''ll be able to ask for help in a shop, search for items, ask about price and availability, and understand basic stock replies.",
      "cultural_note": "Most people working in shops in Chile don''t speak English, so you''ll get a great chance to practice your Spanish in a low-pressure situation. Simple questions and short replies work perfectly here."
    },
    {
      "type": "intro",
      "title": "Making Enquiries When Shopping",
      "subtitle": "Phrases for getting help and finding what you need",
      "phrases": [
        {"spanish": "¿Me puede ayudar?", "english": "Can you help me?", "reply": "", "isChilean": false},
        {"spanish": "¿Trabaja aquí?", "english": "Do you work here?", "reply": "", "isChilean": false},
        {"spanish": "Busco…", "english": "I''m looking for…", "reply": "", "isChilean": false},
        {"spanish": "¿Tiene…?", "english": "Do you have…?", "reply": "", "isChilean": false},
        {"spanish": "¿Hay uno más barato?", "english": "Is there a cheaper one?", "reply": "", "isChilean": false},
        {"spanish": "¿Es chileno?", "english": "Is it Chilean?", "reply": "", "isChilean": false},
        {"spanish": "¿Cuánto sale?", "english": "How much is it? (Chilean)", "reply": "", "isChilean": true},
        {"spanish": "¿Cuánto es?", "english": "How much is it?", "reply": "", "isChilean": false},
        {"spanish": "¿Incluye IVA?", "english": "Does it include tax?", "reply": "", "isChilean": false},
        {"spanish": "Está agotado", "english": "It''s out of stock", "reply": "", "isChilean": false},
        {"spanish": "No me queda", "english": "I don''t have any left (Chilean)", "reply": "", "isChilean": true},
        {"spanish": "Queda uno", "english": "There''s one left", "reply": "", "isChilean": false},
        {"spanish": "Solo queda este", "english": "Only this one is left", "reply": "", "isChilean": false},
        {"spanish": "¿Va a llevar algo más?", "english": "Will you be taking anything else?", "reply": "", "isChilean": false}
      ]
    },
    {
      "type": "multiple_choice",
      "title": "This or That",
      "items": [
        {"phrase": "¿Me puede ayudar?", "question": "What are you asking?", "options": ["Where is the exit?", "Can you help me?", "How much is it?", "Do you have this?"], "correctAnswer": 1},
        {"phrase": "¿Cuánto sale?", "question": "What does this Chilean phrase mean?", "options": ["Is it on sale?", "How much does it cost?", "Can I return it?", "Is there a cheaper one?"], "correctAnswer": 1},
        {"phrase": "Está agotado", "question": "What does the shop assistant mean?", "options": ["It''s very expensive.", "It''s out of stock.", "It''s on promotion.", "It''s the last one."], "correctAnswer": 1},
        {"phrase": "¿Incluye IVA?", "question": "What are you asking about?", "options": ["A discount", "A return policy", "Whether tax is included", "The opening hours"], "correctAnswer": 2},
        {"phrase": "No me queda", "question": "What is the assistant telling you?", "options": ["It''s not for sale.", "They don''t have any left.", "There are more in the back.", "It''s too expensive."], "correctAnswer": 1},
        {"phrase": "¿Hay uno más barato?", "question": "What are you looking for?", "options": ["A bigger size", "A different colour", "A cheaper option", "A refund"], "correctAnswer": 2},
        {"phrase": "¿Va a llevar algo más?", "question": "What is the assistant asking?", "options": ["Are you paying by card?", "Do you need a bag?", "Will you take anything else?", "Do you have a receipt?"], "correctAnswer": 2},
        {"phrase": "¿Trabaja aquí?", "question": "When would you say this?", "options": ["To ask for the price", "To check if someone is staff", "To ask for a receipt", "To find the exit"], "correctAnswer": 1},
        {"phrase": "Solo queda este", "question": "What does this mean?", "options": ["This is sold out.", "Only this one is left.", "This is the most expensive.", "This is not available."], "correctAnswer": 1}
      ]
    },
    {
      "type": "audio_choice",
      "title": "Hear and React",
      "items": [
        {"question": "What phrase do you hear?", "options": ["¿Me puede ayudar?", "¿Cuánto sale?", "Está agotado", "¿Tiene…?"], "correctAnswer": 0},
        {"question": "What phrase do you hear?", "options": ["¿Incluye IVA?", "¿Cuánto es?", "No me queda", "¿Va a llevar algo más?"], "correctAnswer": 2},
        {"question": "What phrase do you hear?", "options": ["Busco…", "¿Hay uno más barato?", "Solo queda este", "¿Es chileno?"], "correctAnswer": 1},
        {"question": "What phrase do you hear?", "options": ["¿Trabaja aquí?", "Queda uno", "¿Cuánto sale?", "Está agotado"], "correctAnswer": 3},
        {"question": "What phrase do you hear?", "options": ["¿Tiene…?", "No me queda", "¿Me puede ayudar?", "Solo queda este"], "correctAnswer": 3},
        {"question": "What phrase do you hear?", "options": ["¿Cuánto es?", "¿Va a llevar algo más?", "¿Incluye IVA?", "Busco…"], "correctAnswer": 0},
        {"question": "What phrase do you hear?", "options": ["¿Es chileno?", "Está agotado", "¿Hay uno más barato?", "Queda uno"], "correctAnswer": 2},
        {"question": "What phrase do you hear?", "options": ["Solo queda este", "¿Trabaja aquí?", "¿Cuánto sale?", "No me queda"], "correctAnswer": 1},
        {"question": "What phrase do you hear?", "options": ["¿Va a llevar algo más?", "¿Me puede ayudar?", "¿Es chileno?", "¿Incluye IVA?"], "correctAnswer": 3}
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
      "subtitle": "A tourist looking for something in a Chilean shop",
      "dialogue": [
        {"speaker": "tourist", "spanish": "Disculpa, ¿trabaja aquí?"},
        {"speaker": "local", "spanish": "Sí, claro. ¿En qué le ayudo?"},
        {"speaker": "tourist", "spanish": "Busco una chaqueta de lluvia."},
        {"speaker": "local", "spanish": "Tenemos estas. ¿Qué talla necesita?"},
        {"speaker": "tourist", "spanish": "La M. ¿Cuánto sale?"},
        {"speaker": "local", "spanish": "Esta sale veinte mil pesos. ¿Incluye IVA?"},
        {"speaker": "tourist", "spanish": "Sí, incluye todo."},
        {"speaker": "local", "spanish": "¿Hay una más barata?"},
        {"speaker": "tourist", "spanish": "No me queda otra. Solo queda esta."}
      ]
    },
    {
      "type": "recap",
      "title": "Well done!",
      "dialogue": [
        {"speaker": "tourist", "name": "Sam (Tourist)", "spanish": "Disculpa, ¿trabaja aquí?"},
        {"speaker": "local", "name": "Shop Assistant", "spanish": "Sí, claro. ¿En qué le ayudo?"},
        {"speaker": "tourist", "name": "Sam (Tourist)", "spanish": "Busco una chaqueta de lluvia."},
        {"speaker": "local", "name": "Shop Assistant", "spanish": "Tenemos estas. ¿Qué talla necesita?"},
        {"speaker": "tourist", "name": "Sam (Tourist)", "spanish": "La M. ¿Cuánto sale?"},
        {"speaker": "local", "name": "Shop Assistant", "spanish": "Esta sale veinte mil pesos. ¿Incluye IVA?"},
        {"speaker": "tourist", "name": "Sam (Tourist)", "spanish": "Sí, incluye todo."},
        {"speaker": "tourist", "name": "Sam (Tourist)", "spanish": "¿Hay una más barata?"},
        {"speaker": "local", "name": "Shop Assistant", "spanish": "No me queda otra. Solo queda esta."}
      ]
    }
  ]
}'::jsonb);

-- ============================================================
-- UNIT 2: Conversations at the Counter
-- ============================================================
INSERT INTO units (id, module_id, title, description, order_index, estimated_minutes)
VALUES (gen_random_uuid(), module_id, 'Conversations at the Counter', 'Handle payments, returns, and problems confidently at the checkout.', 2, 12)
RETURNING id INTO unit2_id;

INSERT INTO lessons (id, unit_id, title, type, order_index, content)
VALUES (gen_random_uuid(), unit2_id, 'Conversations at the Counter', 'standard', 1, '{
  "pages": [
    {
      "type": "overview",
      "title": "What You''ll Learn",
      "goal": "By the end of this unit, you''ll be able to find the checkout, ask about total prices, handle card payments, and manage returns or issues with purchases.",
      "cultural_note": "Paying by card is very common in Chile, even for small amounts. You''ll often hear ''¿Débito o crédito?'' — it''s just routine. If you don''t understand the first time, asking again is completely fine."
    },
    {
      "type": "intro",
      "title": "Conversations at the Counter",
      "subtitle": "Paying, returns, and sorting out problems",
      "phrases": [
        {"spanish": "¿Dónde pago?", "english": "Where do I pay?", "reply": "", "isChilean": false},
        {"spanish": "¿Puedo pagar aquí?", "english": "Can I pay here?", "reply": "", "isChilean": false},
        {"spanish": "En la caja, por favor", "english": "At the till, please", "reply": "", "isChilean": false},
        {"spanish": "¿Cuánto es en total?", "english": "How much is it in total?", "reply": "", "isChilean": false},
        {"spanish": "¿Efectivo o tarjeta?", "english": "Cash or card?", "reply": "", "isChilean": false},
        {"spanish": "¿Débito o crédito?", "english": "Debit or credit?", "reply": "", "isChilean": true},
        {"spanish": "¿En cuotas?", "english": "In installments?", "reply": "", "isChilean": true},
        {"spanish": "¿Necesita la boleta?", "english": "Do you need the receipt?", "reply": "", "isChilean": false},
        {"spanish": "¿Está bien el precio?", "english": "Is the price correct?", "reply": "", "isChilean": false},
        {"spanish": "Creo que hay un error", "english": "I think there''s a mistake", "reply": "", "isChilean": false},
        {"spanish": "Quiero devolver esto", "english": "I want to return this", "reply": "", "isChilean": false},
        {"spanish": "¿Puedo devolverlo?", "english": "Can I return it?", "reply": "", "isChilean": false},
        {"spanish": "Quiero cambiar esto", "english": "I want to exchange this", "reply": "", "isChilean": false},
        {"spanish": "¿Puedo cambiarlo?", "english": "Can I exchange it?", "reply": "", "isChilean": false},
        {"spanish": "Está malo", "english": "It''s faulty / broken", "reply": "", "isChilean": false}
      ]
    },
    {
      "type": "multiple_choice",
      "title": "This or That",
      "items": [
        {"phrase": "¿Dónde pago?", "question": "What are you asking?", "options": ["Where is the exit?", "Where do I pay?", "How much is it?", "Can I have a bag?"], "correctAnswer": 1},
        {"phrase": "¿En cuotas?", "question": "What is the cashier offering?", "options": ["A discount", "A loyalty card", "Payment in installments", "A receipt"], "correctAnswer": 2},
        {"phrase": "Creo que hay un error", "question": "What are you saying?", "options": ["I want a refund.", "I think there''s a mistake.", "This is broken.", "I want to exchange this."], "correctAnswer": 1},
        {"phrase": "¿Necesita la boleta?", "question": "What is the cashier asking?", "options": ["Do you have a loyalty card?", "Do you want a bag?", "Do you need the receipt?", "Is that everything?"], "correctAnswer": 2},
        {"phrase": "Está malo", "question": "What are you telling the staff?", "options": ["It''s expired.", "It''s the wrong size.", "It''s faulty or broken.", "It''s too expensive."], "correctAnswer": 2},
        {"phrase": "¿Efectivo o tarjeta?", "question": "What is being asked?", "options": ["Debit or credit?", "Cash or card?", "Receipt or no receipt?", "Installments or full payment?"], "correctAnswer": 1},
        {"phrase": "Quiero devolver esto", "question": "What do you want to do?", "options": ["Buy this item.", "Pay for this.", "Return this item.", "Exchange this item."], "correctAnswer": 2},
        {"phrase": "¿Está bien el precio?", "question": "What are you checking?", "options": ["If there''s a discount", "If the price is correct", "If tax is included", "If you can pay in installments"], "correctAnswer": 1},
        {"phrase": "En la caja, por favor", "question": "What are you being directed to?", "options": ["The fitting room", "The exit", "The till", "The customer service desk"], "correctAnswer": 2}
      ]
    },
    {
      "type": "audio_choice",
      "title": "Hear and React",
      "items": [
        {"question": "What phrase do you hear?", "options": ["¿Dónde pago?", "¿Puedo pagar aquí?", "¿En cuotas?", "¿Efectivo o tarjeta?"], "correctAnswer": 0},
        {"question": "What phrase do you hear?", "options": ["¿Necesita la boleta?", "¿Débito o crédito?", "Creo que hay un error", "Está malo"], "correctAnswer": 1},
        {"question": "What phrase do you hear?", "options": ["Quiero cambiar esto", "En la caja, por favor", "¿Puedo devolverlo?", "¿Cuánto es en total?"], "correctAnswer": 3},
        {"question": "What phrase do you hear?", "options": ["¿Está bien el precio?", "¿En cuotas?", "Quiero devolver esto", "¿Puedo cambiarlo?"], "correctAnswer": 2},
        {"question": "What phrase do you hear?", "options": ["¿Efectivo o tarjeta?", "Está malo", "¿Dónde pago?", "¿Necesita la boleta?"], "correctAnswer": 1},
        {"question": "What phrase do you hear?", "options": ["¿Puedo pagar aquí?", "Creo que hay un error", "¿Débito o crédito?", "En la caja, por favor"], "correctAnswer": 3},
        {"question": "What phrase do you hear?", "options": ["¿Cuánto es en total?", "Quiero cambiar esto", "¿Está bien el precio?", "¿Puedo devolverlo?"], "correctAnswer": 0},
        {"question": "What phrase do you hear?", "options": ["¿En cuotas?", "¿Efectivo o tarjeta?", "Está malo", "Quiero devolver esto"], "correctAnswer": 2},
        {"question": "What phrase do you hear?", "options": ["¿Necesita la boleta?", "¿Puedo cambiarlo?", "Creo que hay un error", "¿Dónde pago?"], "correctAnswer": 1}
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
      "subtitle": "A tourist sorting out a return at the counter",
      "dialogue": [
        {"speaker": "tourist", "spanish": "Disculpa, quiero devolver esto."},
        {"speaker": "local", "spanish": "¿Tiene la boleta?"},
        {"speaker": "tourist", "spanish": "Sí, aquí está. Está malo."},
        {"speaker": "local", "spanish": "¿Quiere cambiarlo o devolver el dinero?"},
        {"speaker": "tourist", "spanish": "Quiero cambiarlo, por favor."},
        {"speaker": "local", "spanish": "Perfecto. ¿Tiene la caja?"},
        {"speaker": "tourist", "spanish": "Sí, aquí tiene."},
        {"speaker": "local", "spanish": "Gracias. Un momento."}
      ]
    },
    {
      "type": "recap",
      "title": "Well done!",
      "dialogue": [
        {"speaker": "tourist", "name": "Sam (Tourist)", "spanish": "Disculpa, quiero devolver esto."},
        {"speaker": "local", "name": "Cashier", "spanish": "¿Tiene la boleta?"},
        {"speaker": "tourist", "name": "Sam (Tourist)", "spanish": "Sí, aquí está. Está malo."},
        {"speaker": "local", "name": "Cashier", "spanish": "¿Quiere cambiarlo o devolver el dinero?"},
        {"speaker": "tourist", "name": "Sam (Tourist)", "spanish": "Quiero cambiarlo, por favor."},
        {"speaker": "local", "name": "Cashier", "spanish": "Perfecto. ¿Tiene la caja?"},
        {"speaker": "tourist", "name": "Sam (Tourist)", "spanish": "Sí, aquí tiene."},
        {"speaker": "local", "name": "Cashier", "spanish": "Gracias. Un momento."}
      ]
    }
  ]
}'::jsonb);

-- ============================================================
-- UNIT 3: Shopping for Food
-- ============================================================
INSERT INTO units (id, module_id, title, description, order_index, estimated_minutes)
VALUES (gen_random_uuid(), module_id, 'Shopping for Food', 'Find your way around supermarkets and corner shops, ask about stock, and understand pricing.', 3, 12)
RETURNING id INTO unit3_id;

INSERT INTO lessons (id, unit_id, title, type, order_index, content)
VALUES (gen_random_uuid(), unit3_id, 'Shopping for Food', 'standard', 1, '{
  "pages": [
    {
      "type": "overview",
      "title": "What You''ll Learn",
      "goal": "By the end of this unit, you''ll be able to ask where things are, check stock, understand pricing terms, and get by in both supermarkets and small corner shops.",
      "cultural_note": "In supermarkets, prices are fixed, so there''s no negotiating. In minimarkets, things move fast and people keep it simple. Short answers are totally normal — don''t worry if everything feels quick. That''s just how it works here."
    },
    {
      "type": "intro",
      "title": "Shopping for Food",
      "subtitle": "Getting around supermarkets and corner shops",
      "phrases": [
        {"spanish": "¿Me puede ayudar?", "english": "Can you help me?", "reply": "", "isChilean": false},
        {"spanish": "¿Dónde está…?", "english": "Where is…?", "reply": "", "isChilean": false},
        {"spanish": "¿En qué pasillo está…?", "english": "Which aisle is… in?", "reply": "", "isChilean": false},
        {"spanish": "Busco…", "english": "I''m looking for…", "reply": "", "isChilean": false},
        {"spanish": "¿Tiene…?", "english": "Do you have…?", "reply": "", "isChilean": false},
        {"spanish": "¿Hay…?", "english": "Is there…?", "reply": "", "isChilean": false},
        {"spanish": "No, no hay", "english": "No, there isn''t any", "reply": "", "isChilean": false},
        {"spanish": "No me queda", "english": "I don''t have any left (Chilean)", "reply": "", "isChilean": true},
        {"spanish": "Está agotado", "english": "It''s out of stock", "reply": "", "isChilean": false},
        {"spanish": "Queda poco", "english": "There''s not much left", "reply": "", "isChilean": false},
        {"spanish": "Solo queda este", "english": "Only this one is left", "reply": "", "isChilean": false},
        {"spanish": "Hay más atrás", "english": "There''s more in the back", "reply": "", "isChilean": false},
        {"spanish": "¿Hay más?", "english": "Is there more?", "reply": "", "isChilean": false},
        {"spanish": "¿Cuánto queda?", "english": "How much is left?", "reply": "", "isChilean": false},
        {"spanish": "Precio por kilo", "english": "Price per kilo", "reply": "", "isChilean": false},
        {"spanish": "Precio por unidad", "english": "Price per unit", "reply": "", "isChilean": false},
        {"spanish": "Promoción", "english": "Promotion / on offer", "reply": "", "isChilean": false},
        {"spanish": "¿Me da una bolsa, por favor?", "english": "Can you give me a bag, please?", "reply": "", "isChilean": false}
      ]
    },
    {
      "type": "multiple_choice",
      "title": "This or That",
      "items": [
        {"phrase": "¿En qué pasillo está…?", "question": "What are you asking about?", "options": ["The price of an item", "Which aisle something is in", "If something is in stock", "The opening hours"], "correctAnswer": 1},
        {"phrase": "Hay más atrás", "question": "What is the assistant telling you?", "options": ["It''s out of stock.", "There''s a promotion.", "There''s more in the back.", "Only one is left."], "correctAnswer": 2},
        {"phrase": "Precio por kilo", "question": "How is this item priced?", "options": ["Per unit", "Per box", "Per kilo", "Per promotion"], "correctAnswer": 2},
        {"phrase": "No me queda", "question": "What does the assistant mean?", "options": ["It''s very expensive.", "There''s more in the back.", "They don''t have any left.", "It''s on promotion."], "correctAnswer": 2},
        {"phrase": "¿Me da una bolsa, por favor?", "question": "What are you asking for?", "options": ["A receipt", "A bag", "A discount", "Help finding something"], "correctAnswer": 1},
        {"phrase": "Queda poco", "question": "What does this mean?", "options": ["It''s all gone.", "There''s not much left.", "There''s plenty in stock.", "It''s on sale."], "correctAnswer": 1},
        {"phrase": "Promoción", "question": "What does this sign mean?", "options": ["New arrival", "Out of stock", "Special offer", "Price per kilo"], "correctAnswer": 2},
        {"phrase": "¿Hay…?", "question": "What are you asking?", "options": ["Where is something?", "How much does something cost?", "Is there something available?", "Can I return something?"], "correctAnswer": 2},
        {"phrase": "Solo queda este", "question": "What does the assistant mean?", "options": ["This is the newest one.", "Only this one is left.", "This one is on sale.", "This is out of stock."], "correctAnswer": 1}
      ]
    },
    {
      "type": "audio_choice",
      "title": "Hear and React",
      "items": [
        {"question": "What phrase do you hear?", "options": ["¿Me puede ayudar?", "¿Dónde está…?", "Hay más atrás", "Queda poco"], "correctAnswer": 2},
        {"question": "What phrase do you hear?", "options": ["Precio por kilo", "No me queda", "¿Hay…?", "Está agotado"], "correctAnswer": 3},
        {"question": "What phrase do you hear?", "options": ["¿En qué pasillo está…?", "Solo queda este", "¿Me da una bolsa, por favor?", "Busco…"], "correctAnswer": 0},
        {"question": "What phrase do you hear?", "options": ["¿Cuánto queda?", "No, no hay", "Promoción", "Precio por unidad"], "correctAnswer": 2},
        {"question": "What phrase do you hear?", "options": ["¿Tiene…?", "Hay más atrás", "Queda poco", "No me queda"], "correctAnswer": 0},
        {"question": "What phrase do you hear?", "options": ["¿Hay más?", "¿Dónde está…?", "Solo queda este", "¿Me puede ayudar?"], "correctAnswer": 3},
        {"question": "What phrase do you hear?", "options": ["Está agotado", "Precio por kilo", "No, no hay", "¿En qué pasillo está…?"], "correctAnswer": 1},
        {"question": "What phrase do you hear?", "options": ["Busco…", "¿Me da una bolsa, por favor?", "¿Cuánto queda?", "Promoción"], "correctAnswer": 2},
        {"question": "What phrase do you hear?", "options": ["Precio por unidad", "¿Tiene…?", "¿Hay más?", "No me queda"], "correctAnswer": 0}
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
      "subtitle": "A tourist shopping for groceries in a Santiago minimarket",
      "dialogue": [
        {"speaker": "tourist", "spanish": "Disculpa, ¿me puede ayudar?"},
        {"speaker": "local", "spanish": "Claro, ¿qué busca?"},
        {"speaker": "tourist", "spanish": "Busco leche. ¿En qué pasillo está?"},
        {"speaker": "local", "spanish": "Pasillo tres, al fondo."},
        {"speaker": "tourist", "spanish": "Gracias. ¿Hay yogur también?"},
        {"speaker": "local", "spanish": "No me queda. Está agotado."},
        {"speaker": "tourist", "spanish": "Está bien. ¿Me da una bolsa, por favor?"},
        {"speaker": "local", "spanish": "Sí, son cinco pesos la bolsa."}
      ]
    },
    {
      "type": "recap",
      "title": "Well done!",
      "dialogue": [
        {"speaker": "tourist", "name": "Sam (Tourist)", "spanish": "Disculpa, ¿me puede ayudar?"},
        {"speaker": "local", "name": "Shop Assistant", "spanish": "Claro, ¿qué busca?"},
        {"speaker": "tourist", "name": "Sam (Tourist)", "spanish": "Busco leche. ¿En qué pasillo está?"},
        {"speaker": "local", "name": "Shop Assistant", "spanish": "Pasillo tres, al fondo."},
        {"speaker": "tourist", "name": "Sam (Tourist)", "spanish": "Gracias. ¿Hay yogur también?"},
        {"speaker": "local", "name": "Shop Assistant", "spanish": "No me queda. Está agotado."},
        {"speaker": "tourist", "name": "Sam (Tourist)", "spanish": "Está bien. ¿Me da una bolsa, por favor?"},
        {"speaker": "local", "name": "Shop Assistant", "spanish": "Sí, son cinco pesos la bolsa."}
      ]
    }
  ]
}'::jsonb);

-- ============================================================
-- UNIT 4: Shopping for Clothes (Malls)
-- ============================================================
INSERT INTO units (id, module_id, title, description, order_index, estimated_minutes)
VALUES (gen_random_uuid(), module_id, 'Shopping for Clothes', 'Ask about sizes, colours, and fitting rooms in Chilean shopping malls.', 4, 12)
RETURNING id INTO unit4_id;

INSERT INTO lessons (id, unit_id, title, type, order_index, content)
VALUES (gen_random_uuid(), unit4_id, 'Shopping for Clothes', 'standard', 1, '{
  "pages": [
    {
      "type": "overview",
      "title": "What You''ll Learn",
      "goal": "By the end of this unit, you''ll be able to ask about colours, sizes, and fitting rooms, and confidently buy clothes in a Chilean shopping mall.",
      "cultural_note": "Shopping malls in Chile are very modern and organized. Staff usually ask if you need help, but it''s okay to say you''re just looking. Trying clothes on is normal, and returns are usually possible if you keep the receipt."
    },
    {
      "type": "intro",
      "title": "Shopping for Clothes",
      "subtitle": "Sizes, colours, and fitting rooms in Chilean malls",
      "phrases": [
        {"spanish": "¿Tiene esto?", "english": "Do you have this? (showing your screen)", "reply": "", "isChilean": false},
        {"spanish": "¿Tiene otro color?", "english": "Do you have another colour?", "reply": "", "isChilean": false},
        {"spanish": "¿Qué talla es?", "english": "What size is it?", "reply": "", "isChilean": false},
        {"spanish": "¿Tienen una talla más grande?", "english": "Do you have a bigger size?", "reply": "", "isChilean": false},
        {"spanish": "¿Tienen una talla más chica?", "english": "Do you have a smaller size?", "reply": "", "isChilean": false},
        {"spanish": "Talla S / M / L / XL", "english": "Size S / M / L / XL", "reply": "", "isChilean": false},
        {"spanish": "¿Me lo puedo probar?", "english": "Can I try it on?", "reply": "", "isChilean": false},
        {"spanish": "¿Dónde están los probadores?", "english": "Where are the fitting rooms?", "reply": "", "isChilean": false},
        {"spanish": "Me lo llevo", "english": "I''ll take it", "reply": "", "isChilean": false}
      ]
    },
    {
      "type": "multiple_choice",
      "title": "This or That",
      "items": [
        {"phrase": "¿Tiene otro color?", "question": "What are you asking about?", "options": ["A different size", "A different colour", "A cheaper option", "A fitting room"], "correctAnswer": 1},
        {"phrase": "¿Me lo puedo probar?", "question": "What are you asking?", "options": ["Can I buy it?", "Can I return it?", "Can I try it on?", "Can I exchange it?"], "correctAnswer": 2},
        {"phrase": "Me lo llevo", "question": "What have you decided?", "options": ["To return the item", "To think about it", "To take the item", "To exchange it"], "correctAnswer": 2},
        {"phrase": "¿Dónde están los probadores?", "question": "What are you looking for?", "options": ["The exit", "The till", "The fitting rooms", "The customer service desk"], "correctAnswer": 2},
        {"phrase": "¿Tienen una talla más chica?", "question": "What size do you need?", "options": ["A bigger size", "The same size", "A smaller size", "A different style"], "correctAnswer": 2},
        {"phrase": "¿Qué talla es?", "question": "What are you asking?", "options": ["How much is it?", "What size is it?", "Do you have another colour?", "Can I try it on?"], "correctAnswer": 1},
        {"phrase": "¿Tienen una talla más grande?", "question": "What size do you need?", "options": ["A cheaper option", "A smaller size", "The same size", "A bigger size"], "correctAnswer": 3},
        {"phrase": "¿Tiene esto?", "question": "When would you use this phrase?", "options": ["When asking for the price", "When showing staff something on your phone", "When asking for a fitting room", "When paying"], "correctAnswer": 1},
        {"phrase": "Talla S / M / L / XL", "question": "What are these?", "options": ["Prices", "Colours", "Sizes", "Payment options"], "correctAnswer": 2}
      ]
    },
    {
      "type": "audio_choice",
      "title": "Hear and React",
      "items": [
        {"question": "What phrase do you hear?", "options": ["¿Tiene esto?", "Me lo llevo", "¿Qué talla es?", "¿Tiene otro color?"], "correctAnswer": 3},
        {"question": "What phrase do you hear?", "options": ["¿Me lo puedo probar?", "¿Tienen una talla más grande?", "Talla S / M / L / XL", "¿Dónde están los probadores?"], "correctAnswer": 0},
        {"question": "What phrase do you hear?", "options": ["¿Tienen una talla más chica?", "¿Tiene esto?", "Me lo llevo", "¿Qué talla es?"], "correctAnswer": 2},
        {"question": "What phrase do you hear?", "options": ["¿Dónde están los probadores?", "¿Tiene otro color?", "¿Me lo puedo probar?", "¿Tienen una talla más grande?"], "correctAnswer": 3},
        {"question": "What phrase do you hear?", "options": ["Me lo llevo", "Talla S / M / L / XL", "¿Qué talla es?", "¿Tiene esto?"], "correctAnswer": 1},
        {"question": "What phrase do you hear?", "options": ["¿Tienen una talla más chica?", "¿Dónde están los probadores?", "¿Tiene otro color?", "¿Me lo puedo probar?"], "correctAnswer": 0},
        {"question": "What phrase do you hear?", "options": ["¿Qué talla es?", "Me lo llevo", "¿Tienen una talla más grande?", "¿Tiene esto?"], "correctAnswer": 2},
        {"question": "What phrase do you hear?", "options": ["¿Tiene otro color?", "¿Me lo puedo probar?", "¿Dónde están los probadores?", "Talla S / M / L / XL"], "correctAnswer": 3},
        {"question": "What phrase do you hear?", "options": ["Talla S / M / L / XL", "¿Tienen una talla más chica?", "¿Tiene esto?", "Me lo llevo"], "correctAnswer": 1}
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
      "subtitle": "A tourist shopping for clothes in a Santiago mall",
      "dialogue": [
        {"speaker": "local", "spanish": "Hola, ¿le puedo ayudar?"},
        {"speaker": "tourist", "spanish": "Sí. ¿Tiene esto en talla M?"},
        {"speaker": "local", "spanish": "Déjame ver… sí, tenemos la M."},
        {"speaker": "tourist", "spanish": "¿Tiene otro color?"},
        {"speaker": "local", "spanish": "Sí, también hay en negro y en azul."},
        {"speaker": "tourist", "spanish": "El negro, por favor. ¿Me lo puedo probar?"},
        {"speaker": "local", "spanish": "Claro. Los probadores están al fondo a la derecha."},
        {"speaker": "tourist", "spanish": "Perfecto. Me lo llevo."}
      ]
    },
    {
      "type": "recap",
      "title": "Well done!",
      "dialogue": [
        {"speaker": "local", "name": "Shop Assistant", "spanish": "Hola, ¿le puedo ayudar?"},
        {"speaker": "tourist", "name": "Sam (Tourist)", "spanish": "Sí. ¿Tiene esto en talla M?"},
        {"speaker": "local", "name": "Shop Assistant", "spanish": "Déjame ver… sí, tenemos la M."},
        {"speaker": "tourist", "name": "Sam (Tourist)", "spanish": "¿Tiene otro color?"},
        {"speaker": "local", "name": "Shop Assistant", "spanish": "Sí, también hay en negro y en azul."},
        {"speaker": "tourist", "name": "Sam (Tourist)", "spanish": "El negro, por favor. ¿Me lo puedo probar?"},
        {"speaker": "local", "name": "Shop Assistant", "spanish": "Claro. Los probadores están al fondo a la derecha."},
        {"speaker": "tourist", "name": "Sam (Tourist)", "spanish": "Perfecto. Me lo llevo."}
      ]
    }
  ]
}'::jsonb);

-- ============================================================
-- UNIT 5: Shopping at a Street Market
-- ============================================================
INSERT INTO units (id, module_id, title, description, order_index, estimated_minutes)
VALUES (gen_random_uuid(), module_id, 'Shopping at a Street Market', 'Navigate ferias and street stalls, bargain politely, and handle cash in informal settings.', 5, 12)
RETURNING id INTO unit5_id;

INSERT INTO lessons (id, unit_id, title, type, order_index, content)
VALUES (gen_random_uuid(), unit5_id, 'Shopping at a Street Market', 'standard', 1, '{
  "pages": [
    {
      "type": "overview",
      "title": "What You''ll Learn",
      "goal": "By the end of this unit, you''ll be able to ask about prices, comment on value, handle cash, negotiate politely, and use Chilean slang you''ll hear at street markets.",
      "cultural_note": "At street markets, people often speak faster and more informally. The Chilean accent can sound stronger here, so don''t worry if it''s harder to understand. Prices are not always fixed, and foreigners are sometimes charged more. If something feels expensive, say ''Está muy caro'' or ''¿Me hace precio?'' — often that''s enough to get a better offer. No pressure, no arguments."
    },
    {
      "type": "intro",
      "title": "Shopping at a Street Market",
      "subtitle": "Ferias, street stalls, and informal Chilean shopping",
      "phrases": [
        {"spanish": "¿Qué es esto?", "english": "What is this?", "reply": "", "isChilean": false},
        {"spanish": "¿Es de hoy?", "english": "Is it from today? (is it fresh?)", "reply": "", "isChilean": false},
        {"spanish": "Está fresquito", "english": "It''s nice and fresh (Chilean)", "reply": "", "isChilean": true},
        {"spanish": "¿Cuánto es?", "english": "How much is it?", "reply": "", "isChilean": false},
        {"spanish": "Está caro", "english": "It''s expensive", "reply": "", "isChilean": false},
        {"spanish": "Está barato", "english": "It''s cheap", "reply": "", "isChilean": false},
        {"spanish": "¿Me da…?", "english": "Can you give me…?", "reply": "", "isChilean": false},
        {"spanish": "¿Me hace precio?", "english": "Can you give me a better price? (Chilean)", "reply": "", "isChilean": true},
        {"spanish": "¿Acepta tarjeta?", "english": "Do you accept card?", "reply": "", "isChilean": false},
        {"spanish": "¿Solo efectivo?", "english": "Cash only?", "reply": "", "isChilean": false},
        {"spanish": "No tengo sencillo", "english": "I don''t have change (Chilean)", "reply": "", "isChilean": true},
        {"spanish": "¿Tiene cambio?", "english": "Do you have change?", "reply": "", "isChilean": false},
        {"spanish": "¿Me da el vuelto?", "english": "Can you give me the change?", "reply": "", "isChilean": false},
        {"spanish": "A luca", "english": "At a thousand pesos (Chilean)", "reply": "", "isChilean": true},
        {"spanish": "Está filete", "english": "It''s great quality (Chilean slang)", "reply": "", "isChilean": true}
      ]
    },
    {
      "type": "multiple_choice",
      "title": "This or That",
      "items": [
        {"phrase": "¿Me hace precio?", "question": "What are you asking for?", "options": ["The price tag", "A better price", "A receipt", "Change"], "correctAnswer": 1},
        {"phrase": "A luca", "question": "What does this Chilean term mean?", "options": ["Very expensive", "At one thousand pesos", "It''s fresh", "Change"], "correctAnswer": 1},
        {"phrase": "Está filete", "question": "What are you saying about the item?", "options": ["It''s too expensive.", "It''s out of stock.", "It''s great quality.", "It''s from today."], "correctAnswer": 2},
        {"phrase": "No tengo sencillo", "question": "What is the vendor telling you?", "options": ["They don''t accept card.", "They don''t have change.", "The price is fixed.", "It''s sold out."], "correctAnswer": 1},
        {"phrase": "¿Es de hoy?", "question": "What are you asking about?", "options": ["The price", "Whether it''s fresh", "Where it''s from", "Whether it''s on sale"], "correctAnswer": 1},
        {"phrase": "Está fresquito", "question": "What is the vendor saying?", "options": ["It''s very expensive.", "It''s from yesterday.", "It''s nice and fresh.", "It''s the last one."], "correctAnswer": 2},
        {"phrase": "¿Solo efectivo?", "question": "What are you checking?", "options": ["If they give change", "If prices are negotiable", "If they only take cash", "If they have what you need"], "correctAnswer": 2},
        {"phrase": "¿Me da el vuelto?", "question": "What are you asking for?", "options": ["A bag", "A receipt", "A discount", "Your change"], "correctAnswer": 3},
        {"phrase": "Está caro", "question": "What are you saying?", "options": ["It''s very cheap.", "It''s good quality.", "It''s expensive.", "It''s out of stock."], "correctAnswer": 2}
      ]
    },
    {
      "type": "audio_choice",
      "title": "Hear and React",
      "items": [
        {"question": "What phrase do you hear?", "options": ["¿Qué es esto?", "¿Me hace precio?", "Está filete", "¿Es de hoy?"], "correctAnswer": 1},
        {"question": "What phrase do you hear?", "options": ["¿Solo efectivo?", "Está caro", "No tengo sencillo", "A luca"], "correctAnswer": 3},
        {"question": "What phrase do you hear?", "options": ["¿Cuánto es?", "Está barato", "¿Acepta tarjeta?", "Está fresquito"], "correctAnswer": 2},
        {"question": "What phrase do you hear?", "options": ["¿Me da el vuelto?", "¿Tiene cambio?", "¿Me da…?", "¿Me hace precio?"], "correctAnswer": 0},
        {"question": "What phrase do you hear?", "options": ["Está filete", "¿Es de hoy?", "No tengo sencillo", "¿Qué es esto?"], "correctAnswer": 3},
        {"question": "What phrase do you hear?", "options": ["¿Me hace precio?", "A luca", "Está caro", "¿Solo efectivo?"], "correctAnswer": 1},
        {"question": "What phrase do you hear?", "options": ["¿Tiene cambio?", "Está fresquito", "¿Cuánto es?", "Está barato"], "correctAnswer": 3},
        {"question": "What phrase do you hear?", "options": ["¿Acepta tarjeta?", "¿Me da el vuelto?", "¿Qué es esto?", "¿Me da…?"], "correctAnswer": 0},
        {"question": "What phrase do you hear?", "options": ["No tengo sencillo", "Está filete", "A luca", "¿Es de hoy?"], "correctAnswer": 2}
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
      "subtitle": "A tourist bargaining at a Santiago street market",
      "dialogue": [
        {"speaker": "tourist", "spanish": "Hola. ¿Cuánto es esto?"},
        {"speaker": "local", "spanish": "A luca. Está fresquito."},
        {"speaker": "tourist", "spanish": "¿Es de hoy?"},
        {"speaker": "local", "spanish": "Sí, llegó esta mañana. Está filete."},
        {"speaker": "tourist", "spanish": "Está un poco caro. ¿Me hace precio?"},
        {"speaker": "local", "spanish": "Le dejo en ochocientos."},
        {"speaker": "tourist", "spanish": "Perfecto. ¿Acepta tarjeta?"},
        {"speaker": "local", "spanish": "No, solo efectivo. ¿Tiene sencillo?"},
        {"speaker": "tourist", "spanish": "Sí, aquí tiene. ¿Me da el vuelto?"},
        {"speaker": "local", "spanish": "Claro, tome."}
      ]
    },
    {
      "type": "recap",
      "title": "Well done!",
      "dialogue": [
        {"speaker": "tourist", "name": "Sam (Tourist)", "spanish": "Hola. ¿Cuánto es esto?"},
        {"speaker": "local", "name": "Vendor", "spanish": "A luca. Está fresquito."},
        {"speaker": "tourist", "name": "Sam (Tourist)", "spanish": "¿Es de hoy?"},
        {"speaker": "local", "name": "Vendor", "spanish": "Sí, llegó esta mañana. Está filete."},
        {"speaker": "tourist", "name": "Sam (Tourist)", "spanish": "Está un poco caro. ¿Me hace precio?"},
        {"speaker": "local", "name": "Vendor", "spanish": "Le dejo en ochocientos."},
        {"speaker": "tourist", "name": "Sam (Tourist)", "spanish": "Perfecto. ¿Acepta tarjeta?"},
        {"speaker": "local", "name": "Vendor", "spanish": "No, solo efectivo. ¿Tiene sencillo?"},
        {"speaker": "tourist", "name": "Sam (Tourist)", "spanish": "Sí, aquí tiene. ¿Me da el vuelto?"},
        {"speaker": "local", "name": "Vendor", "spanish": "Claro, tome."}
      ]
    }
  ]
}'::jsonb);

END $$;
