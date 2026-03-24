/*
  # Add flashcards for Module 6 — Modismos chilenos

  Creates flashcard rows for all 4 units in Module 6, one card per phrase.

  Units covered:
  1. People, Relationships & Everyday Life (unit_id: 6c14a552-8414-43b6-a2a0-e5d61590938e)
  2. Reactions, Feelings & Everyday Expressions (unit_id: dbc27ed3-ec26-458e-b67b-9b880eebecb5)
  3. Social Life & Parties (unit_id: c1a02933-b46c-4c1e-8329-ec3bb3ad82b2)
  4. Swearing & Rude Language (unit_id: 1bec3409-1710-4e94-b875-0093a8b9e95c)
*/

-- Unit 1: People, Relationships & Everyday Life
INSERT INTO flashcards (unit_id, spanish_text, english_text, order_index) VALUES
  ('6c14a552-8414-43b6-a2a0-e5d61590938e', 'Pololo / Polola', 'Boyfriend / Girlfriend', 1),
  ('6c14a552-8414-43b6-a2a0-e5d61590938e', 'Cabro / Cabra', 'Young person (informal)', 2),
  ('6c14a552-8414-43b6-a2a0-e5d61590938e', 'Mina', 'Woman / Girl (informal, a bit disrespectful)', 3),
  ('6c14a552-8414-43b6-a2a0-e5d61590938e', 'Gallo / Galla', 'Guy / Girl (casual)', 4),
  ('6c14a552-8414-43b6-a2a0-e5d61590938e', 'Weon / Weona', 'Dude / Guy (very common, can be affectionate or rude depending on tone)', 5),
  ('6c14a552-8414-43b6-a2a0-e5d61590938e', 'Guatón / Guatona', 'Chubby person (from ''guata'' = belly; affectionate nickname)', 6),
  ('6c14a552-8414-43b6-a2a0-e5d61590938e', 'El tata', 'Grandpa', 7),
  ('6c14a552-8414-43b6-a2a0-e5d61590938e', 'La nana', 'Housekeeper', 8),
  ('6c14a552-8414-43b6-a2a0-e5d61590938e', 'El paco', 'Police officer (informal, quite disrespectful)', 9),
  ('6c14a552-8414-43b6-a2a0-e5d61590938e', 'Flaite', 'Young urban individual from low socioeconomic backgrounds associated with aggressive behavior, criminality, and a distinct style.', 10);

-- Unit 2: Reactions, Feelings & Everyday Expressions
INSERT INTO flashcards (unit_id, spanish_text, english_text, order_index) VALUES
  ('dbc27ed3-ec26-458e-b67b-9b880eebecb5', 'Bacán', 'Cool / Great / Awesome', 1),
  ('dbc27ed3-ec26-458e-b67b-9b880eebecb5', 'Fome', 'Boring / Lame / Dull', 2),
  ('dbc27ed3-ec26-458e-b67b-9b880eebecb5', 'Brígido / Brígida', 'Intense / Harsh / Shocking (can be positive or negative)', 3),
  ('dbc27ed3-ec26-458e-b67b-9b880eebecb5', 'Pucha', 'Dang! / Shoot! (mild expletive, like ''darn'')', 4),
  ('dbc27ed3-ec26-458e-b67b-9b880eebecb5', 'Filo', 'Never mind / Whatever / I don''t care', 5),
  ('dbc27ed3-ec26-458e-b67b-9b880eebecb5', 'Qué wea', 'What the heck / What''s this thing (very versatile expression)', 6),
  ('dbc27ed3-ec26-458e-b67b-9b880eebecb5', 'Qué lata', 'What a drag / That''s annoying', 7),
  ('dbc27ed3-ec26-458e-b67b-9b880eebecb5', 'Qué pena', 'What a shame / How sad', 8),
  ('dbc27ed3-ec26-458e-b67b-9b880eebecb5', 'Qué risa', 'How funny / That''s hilarious', 9),
  ('dbc27ed3-ec26-458e-b67b-9b880eebecb5', 'Qué rico', 'How delicious / That''s great (also used beyond food)', 10),
  ('dbc27ed3-ec26-458e-b67b-9b880eebecb5', 'De una', 'For sure / Absolutely / Right away', 11),
  ('dbc27ed3-ec26-458e-b67b-9b880eebecb5', 'Un cacho', 'A problem / a hassle', 12),
  ('dbc27ed3-ec26-458e-b67b-9b880eebecb5', 'Piola', 'Low-key / discreet', 13);

-- Unit 3: Social Life & Parties
INSERT INTO flashcards (unit_id, spanish_text, english_text, order_index) VALUES
  ('c1a02933-b46c-4c1e-8329-ec3bb3ad82b2', 'Carrete', 'Party / Night out / A good time', 1),
  ('c1a02933-b46c-4c1e-8329-ec3bb3ad82b2', 'Juntémonos', 'Let''s meet / Let''s get together', 2),
  ('c1a02933-b46c-4c1e-8329-ec3bb3ad82b2', 'Copete', 'Alcoholic drink / Booze (any kind)', 3),
  ('c1a02933-b46c-4c1e-8329-ec3bb3ad82b2', 'Trago', 'Alcoholic drink (synonym to Copete)', 4),
  ('c1a02933-b46c-4c1e-8329-ec3bb3ad82b2', 'Piscola', 'Pisco mixed with cola (the classic Chilean drink)', 5),
  ('c1a02933-b46c-4c1e-8329-ec3bb3ad82b2', 'Piscolita', 'Piscola (affectionate diminutive)', 6),
  ('c1a02933-b46c-4c1e-8329-ec3bb3ad82b2', 'Tomar', 'To drink (alcohol) — ''vamos a tomar''', 7),
  ('c1a02933-b46c-4c1e-8329-ec3bb3ad82b2', 'Caleta', 'A lot / Loads / Many — ''tengo caleta de amigos''', 8),
  ('c1a02933-b46c-4c1e-8329-ec3bb3ad82b2', 'Pucho', 'A cigarette', 9);

-- Unit 4: Swearing & Rude Language
INSERT INTO flashcards (unit_id, spanish_text, english_text, order_index) VALUES
  ('1bec3409-1710-4e94-b875-0093a8b9e95c', 'Quedó la cagada', 'It all went to sh*t / everything fell apart', 1),
  ('1bec3409-1710-4e94-b875-0093a8b9e95c', 'Cagaste', 'You''re screwed / You messed up', 2),
  ('1bec3409-1710-4e94-b875-0093a8b9e95c', 'La concha de tu madre', 'A very strong insult — one of the most offensive in Chilean Spanish', 3),
  ('1bec3409-1710-4e94-b875-0093a8b9e95c', 'Huevón / Huevona', 'Dude / idiot (very versatile — can be affectionate or offensive)', 4),
  ('1bec3409-1710-4e94-b875-0093a8b9e95c', '¡Chucha!', 'Damn! / Hell! (used as emphasis or exclamation)', 5),
  ('1bec3409-1710-4e94-b875-0093a8b9e95c', '¡Qué chucha!', 'What the f*** (strong surprise or frustration)', 6),
  ('1bec3409-1710-4e94-b875-0093a8b9e95c', 'Maricón', 'Homophobic slur — offensive, but heard frequently in casual speech', 7),
  ('1bec3409-1710-4e94-b875-0093a8b9e95c', 'Te hiciste el weon', 'You played dumb / acted stupid on purpose', 8),
  ('1bec3409-1710-4e94-b875-0093a8b9e95c', 'Se rajó', 'They bailed / backed out of plans', 9),
  ('1bec3409-1710-4e94-b875-0093a8b9e95c', 'Mierda', 'Sh*t (universal expletive, used just like in English)', 10),
  ('1bec3409-1710-4e94-b875-0093a8b9e95c', 'Puta', 'F*** / damn (used as an exclamation of surprise, frustration, or emphasis)', 11),
  ('1bec3409-1710-4e94-b875-0093a8b9e95c', 'Puta la wea', 'What the f*** / holy sh*t (strong exclamation, very Chilean)', 12);
