/*
  # Update Social Life & Parties unit

  Phrase list changes:
  - Remove: Carreteando, Al tiro, Luca, Palo, Quedamos, Cachar
  - Replace: Junta -> Juntémonos (Let's meet)
  - Fix description: Piscolita -> "Piscola (affectionate diminutive)"
  - Add: Pucho (a cigarette), Trago (alcoholic drink, synonym to Copete)

  Multiple choice changes:
  - Remove questions for: Carreteando, Al tiro, Luca, Palo, Quedamos, Cachar, Junta
  - Add question for Juntémonos, Pucho, Trago
*/

UPDATE lessons
SET content = jsonb_set(
  jsonb_set(
    content,
    '{pages,0,phrases}',
    '[
      {"reply":"","english":"Party / Night out / A good time","spanish":"Carrete","isChilean":true},
      {"reply":"","english":"Let''s meet / Let''s get together","spanish":"Juntémonos","isChilean":true},
      {"reply":"","english":"Alcoholic drink / Booze (any kind)","spanish":"Copete","isChilean":true},
      {"reply":"","english":"Alcoholic drink (synonym to Copete)","spanish":"Trago","isChilean":true},
      {"reply":"","english":"Pisco mixed with cola (the classic Chilean drink)","spanish":"Piscola","isChilean":true},
      {"reply":"","english":"Piscola (affectionate diminutive)","spanish":"Piscolita","isChilean":true},
      {"reply":"","english":"To drink (alcohol) — ''vamos a tomar''","spanish":"Tomar","isChilean":false},
      {"reply":"","english":"A lot / Loads / Many — ''tengo caleta de amigos''","spanish":"Caleta","isChilean":true},
      {"reply":"","english":"A cigarette","spanish":"Pucho","isChilean":true}
    ]'::jsonb
  ),
  '{pages,1,items}',
  '[
    {
      "phrase": "Carrete",
      "options": ["A market","A party / night out","A restaurant","A football match"],
      "question": "A Chilean invites you to a \"carrete\" on Saturday — what are they inviting you to?",
      "correctAnswer": 1
    },
    {
      "phrase": "Juntémonos",
      "options": ["Let''s leave","Let''s meet up","Let''s eat","Let''s pay"],
      "question": "A Chilean friend texts you \"juntémonos esta semana\" — what are they suggesting?",
      "correctAnswer": 1
    },
    {
      "phrase": "Copete",
      "options": ["Shall we eat?","Shall we have a drink?","Shall we dance?","Shall we leave?"],
      "question": "Someone asks \"¿tomamos un copete?\" — what are they suggesting?",
      "correctAnswer": 1
    },
    {
      "phrase": "Trago",
      "options": ["A non-alcoholic drink","An alcoholic drink","A snack","A dessert"],
      "question": "Someone offers you a \"trago\" — what are they offering?",
      "correctAnswer": 1
    },
    {
      "phrase": "Piscola",
      "options": ["A type of beer","Pisco mixed with cola","A fruit juice","A wine cocktail"],
      "question": "You''re at a Chilean party and someone hands you a piscola — what is it?",
      "correctAnswer": 1
    },
    {
      "phrase": "Caleta",
      "options": ["Nothing","A little","A lot / loads","A specific amount"],
      "question": "A Chilean says \"tengo caleta de cosas que hacer\" — how much do they have to do?",
      "correctAnswer": 2
    },
    {
      "phrase": "Pucho",
      "options": ["A drink","A snack","A cigarette","A song"],
      "question": "Someone asks \"¿tienes un pucho?\" — what are they asking for?",
      "correctAnswer": 2
    }
  ]'::jsonb
)
WHERE id = '97c9b671-24ec-4f4c-a7c0-8ea0162d7cba';
