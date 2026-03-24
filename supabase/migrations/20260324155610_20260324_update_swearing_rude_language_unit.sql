/*
  # Update Swearing & Rude Language unit

  Phrase list changes:
  - Replace: La cagada -> Quedó la cagada
  - Replace: Hacerse el weon -> Te hiciste el weon
  - Replace: Rajarse -> Se rajó
  - Replace: La chucha -> ¡Chucha!
  - Replace: Qué chucha -> ¡Qué chucha!
  - Remove: Andar cagado, Andar pato, Mandarse a cambiar
  - Add: Mierda, Puta, Puta la wea

  Multiple choice updated to match new phrases.
*/

UPDATE lessons
SET content = jsonb_set(
  jsonb_set(
    content,
    '{pages,0,phrases}',
    '[
      {"reply":"","english":"It all went to sh*t / everything fell apart","spanish":"Quedó la cagada","isChilean":true},
      {"reply":"","english":"You''re screwed / You messed up","spanish":"Cagaste","isChilean":true},
      {"reply":"","english":"A very strong insult — one of the most offensive in Chilean Spanish","spanish":"La concha de tu madre","isChilean":true},
      {"reply":"","english":"Dude / idiot (very versatile — can be affectionate or offensive)","spanish":"Huevón / Huevona","isChilean":true},
      {"reply":"","english":"Damn! / Hell! (used as emphasis or exclamation)","spanish":"¡Chucha!","isChilean":true},
      {"reply":"","english":"What the f*** (strong surprise or frustration)","spanish":"¡Qué chucha!","isChilean":true},
      {"reply":"","english":"Homophobic slur — offensive, but heard frequently in casual speech","spanish":"Maricón","isChilean":false},
      {"reply":"","english":"You played dumb / acted stupid on purpose","spanish":"Te hiciste el weon","isChilean":true},
      {"reply":"","english":"They bailed / backed out of plans","spanish":"Se rajó","isChilean":true},
      {"reply":"","english":"Sh*t (universal expletive, used just like in English)","spanish":"Mierda","isChilean":false},
      {"reply":"","english":"F*** / damn (used as an exclamation of surprise, frustration, or emphasis)","spanish":"Puta","isChilean":false},
      {"reply":"","english":"What the f*** / holy sh*t (strong exclamation, very Chilean)","spanish":"Puta la wea","isChilean":true}
    ]'::jsonb
  ),
  '{pages,1,items}',
  '[
    {
      "phrase": "Quedó la cagada",
      "options": ["Everything went great","It all fell apart / went to sh*t","The party started","Someone left"],
      "question": "After a chaotic situation, a Chilean says \"quedó la cagada\" — what happened?",
      "correctAnswer": 1
    },
    {
      "phrase": "Cagaste",
      "options": ["Well done!","You''re lucky","You''re screwed / you messed up","Never mind"],
      "question": "A Chilean says \"cagaste\" after you make a mistake — what does it mean?",
      "correctAnswer": 2
    },
    {
      "phrase": "Te hiciste el weon",
      "options": ["You were being generous","You were being smart","You were playing dumb on purpose","You were showing off"],
      "question": "Someone says \"te hiciste el weon\" — what are they accusing you of?",
      "correctAnswer": 2
    },
    {
      "phrase": "Se rajó",
      "options": ["They arrived early","They brought more people","They bailed / backed out","They paid for everyone"],
      "question": "You planned something and someone says \"se rajó\" — what happened?",
      "correctAnswer": 2
    },
    {
      "phrase": "¡Chucha!",
      "options": ["A warm greeting","An exclamation of shock or frustration","A compliment","A farewell"],
      "question": "Someone stubs their toe and shouts \"¡Chucha!\" — what kind of expression is it?",
      "correctAnswer": 1
    },
    {
      "phrase": "¡Qué chucha!",
      "options": ["A warm greeting","A strong expression of surprise or frustration","A compliment","A farewell"],
      "question": "Someone sees something shocking and says \"¡Qué chucha!\" — what kind of expression is this?",
      "correctAnswer": 1
    },
    {
      "phrase": "Huevón",
      "options": ["As a serious insult","As a compliment","As an affectionate / casual term for ''dude''","As a question"],
      "question": "A Chilean calls a close friend \"huevón\" while laughing — how is it likely being used here?",
      "correctAnswer": 2
    },
    {
      "phrase": "Mierda",
      "options": ["A term of affection","Sh*t (a universal expletive)","A greeting","A farewell"],
      "question": "Someone drops something and shouts \"¡Mierda!\" — what does it mean?",
      "correctAnswer": 1
    },
    {
      "phrase": "Puta",
      "options": ["A polite request","An exclamation of surprise, frustration or emphasis","A question","A compliment"],
      "question": "A Chilean hears surprising news and says \"¡Puta!\" — how is it being used here?",
      "correctAnswer": 1
    },
    {
      "phrase": "Puta la wea",
      "options": ["That''s great news","What the f*** / holy sh*t (strong exclamation)","Let''s go","No problem"],
      "question": "Something unexpected happens and a Chilean says \"¡Puta la wea!\" — what are they expressing?",
      "correctAnswer": 1
    }
  ]'::jsonb
)
WHERE id = 'c10a1900-c4d0-4eb0-8934-c93a353d8607';
