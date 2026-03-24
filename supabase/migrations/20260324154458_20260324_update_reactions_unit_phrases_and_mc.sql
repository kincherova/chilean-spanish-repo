/*
  # Update Reactions, Feelings & Everyday Expressions unit

  Phrase list changes:
  - Remove: Al lote, A lo pobre
  - Add: Un cacho (A problem), Piola (Low-key / discreet)

  Multiple choice changes:
  - Remove questions for Al lote and A lo pobre
  - Add questions for Un cacho and Piola
*/

UPDATE lessons
SET content = jsonb_set(
  jsonb_set(
    content,
    '{pages,0,phrases}',
    '[
      {"reply":"","english":"Cool / Great / Awesome","spanish":"Bacán","isChilean":true},
      {"reply":"","english":"Boring / Lame / Dull","spanish":"Fome","isChilean":true},
      {"reply":"","english":"Intense / Harsh / Shocking (can be positive or negative)","spanish":"Brígido / Brígida","isChilean":true},
      {"reply":"","english":"Dang! / Shoot! (mild expletive, like ''darn'')","spanish":"Pucha","isChilean":true},
      {"reply":"","english":"Never mind / Whatever / I don''t care","spanish":"Filo","isChilean":true},
      {"reply":"","english":"What the heck / What''s this thing (very versatile expression)","spanish":"Qué wea","isChilean":true},
      {"reply":"","english":"What a drag / That''s annoying","spanish":"Qué lata","isChilean":true},
      {"reply":"","english":"What a shame / How sad","spanish":"Qué pena","isChilean":true},
      {"reply":"","english":"How funny / That''s hilarious","spanish":"Qué risa","isChilean":true},
      {"reply":"","english":"How delicious / That''s great (also used beyond food)","spanish":"Qué rico","isChilean":false},
      {"reply":"","english":"For sure / Absolutely / Right away","spanish":"De una","isChilean":true},
      {"reply":"","english":"A problem / a hassle","spanish":"Un cacho","isChilean":true},
      {"reply":"","english":"Low-key / discreet","spanish":"Piola","isChilean":true}
    ]'::jsonb
  ),
  '{pages,1,items}',
  '[
    {
      "phrase": "Bacán",
      "options": ["That''s scary","That''s cool / awesome","That''s boring","That''s expensive"],
      "question": "Your Chilean friend says \"¡Eso es bacán!\" — what are they expressing?",
      "correctAnswer": 1
    },
    {
      "phrase": "Fome",
      "options": ["It''s intense","It''s funny","It''s boring / dull","It''s beautiful"],
      "question": "Someone says \"esta película es muy fome\" — what do they think of the film?",
      "correctAnswer": 2
    },
    {
      "phrase": "Filo",
      "options": ["I''m angry","Never mind / It''s fine","Let''s fight","Thank you"],
      "question": "You apologise to a Chilean and they say \"filo\" — what do they mean?",
      "correctAnswer": 1
    },
    {
      "phrase": "Pucha",
      "options": ["A greeting","A mild expletive like ''darn'' or ''shoot''","A compliment","A question"],
      "question": "Someone drops something and says \"¡Pucha!\" — what kind of expression is this?",
      "correctAnswer": 1
    },
    {
      "phrase": "Brígido",
      "options": ["Something boring","Something cheap","Something intense / shocking","Something delicious"],
      "question": "A Chilean says \"fue brígido\" after something happened — what were they describing?",
      "correctAnswer": 2
    },
    {
      "phrase": "Qué lata",
      "options": ["How exciting!","What a drag / That''s a shame","How funny!","That''s not true"],
      "question": "You tell a Chilean you missed your bus and they say \"qué lata\" — what are they expressing?",
      "correctAnswer": 1
    },
    {
      "phrase": "De una",
      "options": ["Maybe later","I can''t come","Absolutely / I''m in","Not sure yet"],
      "question": "You invite a Chilean friend somewhere and they reply \"de una\" — what does it mean?",
      "correctAnswer": 2
    },
    {
      "phrase": "Qué wea",
      "options": ["How beautiful!","What the heck / what''s going on","I''m hungry","Let''s go"],
      "question": "A Chilean sees something strange and says \"¡Qué wea!\" — what are they expressing?",
      "correctAnswer": 1
    },
    {
      "phrase": "Un cacho",
      "options": ["A gift","A problem / hassle","A shortcut","A friend"],
      "question": "A Chilean says \"esto es un cacho\" — what are they describing?",
      "correctAnswer": 1
    },
    {
      "phrase": "Piola",
      "options": ["Loud and flashy","Low-key / discreet","Very expensive","Very funny"],
      "question": "Someone describes a person as \"piola\" — what quality are they highlighting?",
      "correctAnswer": 1
    }
  ]'::jsonb
)
WHERE id = 'a38caf8b-6fb2-4d92-82ef-eefcfc0f6afe';
