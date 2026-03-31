/*
  # Add recall exercise pages to all Module 6 units

  Adds a "Recall" page as the final page in each of the 4 Module 6 lesson units,
  matching the same format used in the Cafes & Restaurants vocabulary units.

  Each recall page shows the English translation and asks the learner to recall the Spanish.

  Units updated:
  - People, Relationships & Everyday Life (lesson ddff48a8)
  - Reactions, Feelings & Everyday Expressions (lesson a38caf8b)
  - Social Life & Parties (lesson 97c9b671)
  - Swearing & Rude Language (lesson c10a1900)
*/

-- People, Relationships & Everyday Life
UPDATE lessons
SET content = jsonb_set(
  content,
  '{pages}',
  (content->'pages') || '[{
    "type": "recall",
    "title": "Recall",
    "items": [
      {"english": "Boyfriend / Girlfriend", "spanish": "Pololo / Polola"},
      {"english": "Kid / Young person", "spanish": "Cabro / Cabra"},
      {"english": "Woman / Girl (informal)", "spanish": "Mina"},
      {"english": "Guy / Dude (informal)", "spanish": "Gallo / Galla"},
      {"english": "Dude / Man (very Chilean)", "spanish": "Weon / Weona"},
      {"english": "Chubby / Beer belly (affectionate)", "spanish": "Guatón"},
      {"english": "Grandad / Old man (affectionate)", "spanish": "El tata"},
      {"english": "Nanny / Maid", "spanish": "La nana"},
      {"english": "Police officer (slang)", "spanish": "El paco"},
      {"english": "Chav / Street person (lower class stereotype)", "spanish": "Flaite"},
      {"english": "Cool / Awesome (also a person)", "spanish": "Bacán"}
    ]
  }]'::jsonb
)
WHERE id = 'ddff48a8-1933-410e-be7e-67960074188f';

-- Reactions, Feelings & Everyday Expressions
UPDATE lessons
SET content = jsonb_set(
  content,
  '{pages}',
  (content->'pages') || '[{
    "type": "recall",
    "title": "Recall",
    "items": [
      {"english": "Cool / Great / Awesome", "spanish": "Bacán"},
      {"english": "Boring / Lame / Dull", "spanish": "Fome"},
      {"english": "Intense / Harsh / Shocking", "spanish": "Brígido"},
      {"english": "Dang! / Shoot! (mild expletive)", "spanish": "Pucha"},
      {"english": "Never mind / Whatever / I don''t care", "spanish": "Filo"},
      {"english": "What the heck / What''s this thing", "spanish": "Qué wea"},
      {"english": "What a drag / That''s annoying", "spanish": "Qué lata"},
      {"english": "What a shame / How sad", "spanish": "Qué pena"},
      {"english": "How funny / That''s hilarious", "spanish": "Qué risa"},
      {"english": "How delicious / That''s great", "spanish": "Qué rico"},
      {"english": "A problem / a hassle", "spanish": "Un cacho"},
      {"english": "Low-key / discreet", "spanish": "Piola"}
    ]
  }]'::jsonb
)
WHERE id = 'a38caf8b-6fb2-4d92-82ef-eefcfc0f6afe';

-- Social Life & Parties
UPDATE lessons
SET content = jsonb_set(
  content,
  '{pages}',
  (content->'pages') || '[{
    "type": "recall",
    "title": "Recall",
    "items": [
      {"english": "Party / Night out / A good time", "spanish": "Carrete"},
      {"english": "Let''s meet / Let''s get together", "spanish": "Juntémonos"},
      {"english": "Alcoholic drink / Booze (any kind)", "spanish": "Copete"},
      {"english": "Alcoholic drink (synonym to Copete)", "spanish": "Trago"},
      {"english": "Pisco mixed with cola", "spanish": "Piscola"},
      {"english": "Piscola (affectionate diminutive)", "spanish": "Piscolita"},
      {"english": "To drink (alcohol)", "spanish": "Tomar"},
      {"english": "A lot / Loads / Many", "spanish": "Caleta"},
      {"english": "A cigarette", "spanish": "Pucho"}
    ]
  }]'::jsonb
)
WHERE id = '97c9b671-24ec-4f4c-a7c0-8ea0162d7cba';

-- Swearing & Rude Language
UPDATE lessons
SET content = jsonb_set(
  content,
  '{pages}',
  (content->'pages') || '[{
    "type": "recall",
    "title": "Recall",
    "items": [
      {"english": "It all went to sh*t / everything fell apart", "spanish": "Quedó la cagada"},
      {"english": "You''re screwed / You messed up", "spanish": "Cagaste"},
      {"english": "A very strong insult (most offensive)", "spanish": "La concha de tu madre"},
      {"english": "Damn! / Hell! (emphasis or exclamation)", "spanish": "¡Chucha!"},
      {"english": "What the f*** (strong surprise or frustration)", "spanish": "¡Qué chucha!"},
      {"english": "Homophobic slur (heard in casual speech)", "spanish": "Maricón"},
      {"english": "Sh*t (universal expletive)", "spanish": "Mierda"},
      {"english": "F*** / damn (surprise, frustration, or emphasis)", "spanish": "Puta"},
      {"english": "What the f*** / holy sh*t (very Chilean)", "spanish": "Puta la wea"}
    ]
  }]'::jsonb
)
WHERE id = 'c10a1900-c4d0-4eb0-8934-c93a353d8607';
