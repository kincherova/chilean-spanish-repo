/*
  # Module 6: Modismos chilenos

  Creates a new bonus module "Modismos chilenos" with 4 vocabulary-only units.
  The focus is recognition (understanding Chilean slang when heard), not production.
  Each unit has 3 pages: phrase_list, multiple_choice (recognition quiz), flashcards.

  ## New Module
  - Title: "🇨🇱 Modismos chilenos"
  - Description: "Learn to recognize Chilean slang and understand its culture."
  - order_index: 6
  - is_free: false (premium)

  ## New Units (4 vocabulary units)
  1. People, Relationships & Everyday Life
     - pololo/polola, cabro, mina, weon, guaton, viejo, etc.
  2. Reactions, Feelings & Everyday Expressions
     - qué wea, bacán, fome, brígido, pucha, filo, etc.
  3. Social Life & Parties
     - carrete, copete, piscola, piscolita, junta, al tiro, caleta, etc.
  4. Swearing & Rude Language (with content warning)

  ## Notes
  - Multiple-choice questions test recognition: "You hear X — what does it mean?"
  - No audio URLs set (will be added later)
  - All phrases marked isChilean: true since they are all Chilean slang
*/

-- ─── MODULE ───────────────────────────────────────────────────────────────────

INSERT INTO modules (id, title, description, order_index, is_free)
VALUES (
  gen_random_uuid(),
  '🇨🇱 Modismos chilenos',
  'Learn to recognize Chilean slang and understand its culture. Bonus module for curious learners.',
  6,
  false
);

-- ─── UNIT 1: People, Relationships & Everyday Life ───────────────────────────

WITH mod AS (SELECT id FROM modules WHERE title = '🇨🇱 Modismos chilenos'),
new_unit AS (
  INSERT INTO units (id, module_id, title, description, order_index, estimated_minutes)
  SELECT gen_random_uuid(), mod.id,
    'People, Relationships & Everyday Life',
    'The words Chileans use to talk about people around them — friends, partners, strangers, and everyone in between.',
    1, 8
  FROM mod
  RETURNING id
)
INSERT INTO lessons (id, unit_id, title, type, order_index, content)
SELECT
  gen_random_uuid(),
  new_unit.id,
  'People, Relationships & Everyday Life',
  'standard',
  1,
  '{
    "pages": [
      {
        "type": "phrase_list",
        "title": "People, Relationships & Everyday Life",
        "subtitle": "How Chileans refer to the people around them",
        "phrases": [
          { "spanish": "Pololo / Polola", "english": "Boyfriend / Girlfriend", "reply": "", "isChilean": true },
          { "spanish": "Pololear", "english": "To date someone / be in a relationship", "reply": "", "isChilean": true },
          { "spanish": "Cabro / Cabra", "english": "Kid / Young person (informal)", "reply": "", "isChilean": true },
          { "spanish": "Cabro chico / Cabra chica", "english": "Little kid / Small child", "reply": "", "isChilean": true },
          { "spanish": "Mina", "english": "Woman / Girl (informal)", "reply": "", "isChilean": true },
          { "spanish": "Gallo / Galla", "english": "Guy / Girl (casual)", "reply": "", "isChilean": true },
          { "spanish": "Weon / Weona", "english": "Dude / Guy (very common, can be affectionate or rude depending on tone)", "reply": "", "isChilean": true },
          { "spanish": "Compadre / Comadre", "english": "Close friend / buddy (respectful but warm)", "reply": "", "isChilean": true },
          { "spanish": "Guatón / Guatona", "english": "Chubby person (from ''guata'' = belly; affectionate nickname)", "reply": "", "isChilean": true },
          { "spanish": "Flaco / Flaca", "english": "Skinny person (also used as a nickname for anyone, affectionately)", "reply": "", "isChilean": true },
          { "spanish": "Viejo / Vieja", "english": "Old man / Old woman (also used affectionately for parents or partners)", "reply": "", "isChilean": true },
          { "spanish": "El tata / La nana", "english": "Grandpa / Grandma (Chilean children''s words)", "reply": "", "isChilean": true },
          { "spanish": "Cuático / Cuática", "english": "Intense person / wild situation (can describe a person or event)", "reply": "", "isChilean": true }
        ]
      },
      {
        "type": "multiple_choice",
        "title": "Do you recognize it?",
        "items": [
          {
            "phrase": "Pololo / Polola",
            "question": "A Chilean says \"mi polola\" — what are they talking about?",
            "options": ["Their friend", "Their girlfriend", "Their sister", "Their neighbour"],
            "correctAnswer": 1
          },
          {
            "phrase": "Cabro chico",
            "question": "Someone says \"ese cabro chico\" — who are they referring to?",
            "options": ["An old man", "A small child", "A teenager", "A goat"],
            "correctAnswer": 1
          },
          {
            "phrase": "Weon",
            "question": "Your Chilean friend calls you \"weon\" — what does it most likely mean in casual conversation?",
            "options": ["Enemy", "Stranger", "Dude / mate (casual)", "Boss"],
            "correctAnswer": 2
          },
          {
            "phrase": "Guatón",
            "question": "Someone calls their friend \"guatón\" affectionately — what does it literally come from?",
            "options": ["Being tall", "Being funny", "Having a big belly", "Being strong"],
            "correctAnswer": 2
          },
          {
            "phrase": "Mina",
            "question": "A Chilean says \"esa mina\" — what are they referring to?",
            "options": ["A gold mine", "That woman / girl", "That car", "That food"],
            "correctAnswer": 1
          },
          {
            "phrase": "Viejo / Vieja",
            "question": "A Chilean says \"mi vieja\" referring to someone they love — who is it most likely?",
            "options": ["Their old car", "Their grandmother or partner", "Their teacher", "Their boss"],
            "correctAnswer": 1
          },
          {
            "phrase": "Pololear",
            "question": "You hear \"están pololeando\" — what are these two people doing?",
            "options": ["Fighting", "Dating", "Working together", "Travelling"],
            "correctAnswer": 1
          },
          {
            "phrase": "Cuático",
            "question": "Someone says \"esa situación fue cuática\" — how were they describing it?",
            "options": ["Boring", "Cheap", "Intense / wild", "Beautiful"],
            "correctAnswer": 2
          },
          {
            "phrase": "Gallo / Galla",
            "question": "A Chilean says \"ese gallo\" — what are they referring to?",
            "options": ["A rooster", "That guy", "That dog", "That stranger"],
            "correctAnswer": 1
          },
          {
            "phrase": "Flaco / Flaca",
            "question": "Someone greets their friend with \"¡Hola flaco!\" — what are they saying?",
            "options": ["Hello skinny / hey pal", "Hello old man", "Hello stranger", "Hello boss"],
            "correctAnswer": 0
          }
        ]
      },
      {
        "type": "flashcards",
        "title": "Test Your Memory",
        "dialogue": null
      }
    ]
  }'::jsonb
FROM new_unit;

-- ─── UNIT 2: Reactions, Feelings & Everyday Expressions ──────────────────────

WITH mod AS (SELECT id FROM modules WHERE title = '🇨🇱 Modismos chilenos'),
new_unit AS (
  INSERT INTO units (id, module_id, title, description, order_index, estimated_minutes)
  SELECT gen_random_uuid(), mod.id,
    'Reactions, Feelings & Everyday Expressions',
    'The expressions Chileans throw into almost every sentence — from excitement to indifference.',
    2, 8
  FROM mod
  RETURNING id
)
INSERT INTO lessons (id, unit_id, title, type, order_index, content)
SELECT
  gen_random_uuid(),
  new_unit.id,
  'Reactions, Feelings & Everyday Expressions',
  'standard',
  1,
  '{
    "pages": [
      {
        "type": "phrase_list",
        "title": "Reactions, Feelings & Everyday Expressions",
        "subtitle": "How Chileans express themselves emotionally in everyday life",
        "phrases": [
          { "spanish": "Bacán", "english": "Cool / Great / Awesome", "reply": "", "isChilean": true },
          { "spanish": "Fome", "english": "Boring / Lame / Dull", "reply": "", "isChilean": true },
          { "spanish": "Brígido / Brígida", "english": "Intense / Harsh / Shocking (can be positive or negative)", "reply": "", "isChilean": true },
          { "spanish": "Pucha", "english": "Dang! / Shoot! (mild expletive, like ''darn'')", "reply": "", "isChilean": true },
          { "spanish": "Filo", "english": "Never mind / Whatever / I don''t care", "reply": "", "isChilean": true },
          { "spanish": "Qué wea", "english": "What the heck / What''s this thing (very versatile expression)", "reply": "", "isChilean": true },
          { "spanish": "Qué lata", "english": "What a drag / That''s annoying", "reply": "", "isChilean": true },
          { "spanish": "Qué pena", "english": "What a shame / How sad", "reply": "", "isChilean": true },
          { "spanish": "Qué risa", "english": "How funny / That''s hilarious", "reply": "", "isChilean": true },
          { "spanish": "Qué rico", "english": "How delicious / That''s great (also used beyond food)", "reply": "", "isChilean": false },
          { "spanish": "Al lote", "english": "Carelessly / Half-heartedly / Done badly", "reply": "", "isChilean": true },
          { "spanish": "De una", "english": "For sure / Absolutely / Right away", "reply": "", "isChilean": true },
          { "spanish": "A lo pobre", "english": "Cheaply done / Basic version (lit. ''the poor way'')", "reply": "", "isChilean": true }
        ]
      },
      {
        "type": "multiple_choice",
        "title": "Do you recognize it?",
        "items": [
          {
            "phrase": "Bacán",
            "question": "Your Chilean friend says \"¡Eso es bacán!\" — what are they expressing?",
            "options": ["That''s scary", "That''s cool / awesome", "That''s boring", "That''s expensive"],
            "correctAnswer": 1
          },
          {
            "phrase": "Fome",
            "question": "Someone says \"esta película es muy fome\" — what do they think of the film?",
            "options": ["It''s intense", "It''s funny", "It''s boring / dull", "It''s beautiful"],
            "correctAnswer": 2
          },
          {
            "phrase": "Filo",
            "question": "You apologise to a Chilean and they say \"filo\" — what do they mean?",
            "options": ["I''m angry", "Never mind / It''s fine", "Let''s fight", "Thank you"],
            "correctAnswer": 1
          },
          {
            "phrase": "Pucha",
            "question": "Someone drops something and says \"¡Pucha!\" — what kind of expression is this?",
            "options": ["A greeting", "A mild expletive like ''darn'' or ''shoot''", "A compliment", "A question"],
            "correctAnswer": 1
          },
          {
            "phrase": "Brígido",
            "question": "A Chilean says \"fue brígido\" after something happened — what were they describing?",
            "options": ["Something boring", "Something cheap", "Something intense / shocking", "Something delicious"],
            "correctAnswer": 2
          },
          {
            "phrase": "Qué lata",
            "question": "You tell a Chilean you missed your bus and they say \"qué lata\" — what are they expressing?",
            "options": ["How exciting!", "What a drag / That''s a shame", "How funny!", "That''s not true"],
            "correctAnswer": 1
          },
          {
            "phrase": "De una",
            "question": "You invite a Chilean friend somewhere and they reply \"de una\" — what does it mean?",
            "options": ["Maybe later", "I can''t come", "Absolutely / I''m in", "Not sure yet"],
            "correctAnswer": 2
          },
          {
            "phrase": "Al lote",
            "question": "Someone says a job was done \"al lote\" — how was it done?",
            "options": ["Professionally", "Carelessly / half-heartedly", "Quickly and well", "Beautifully"],
            "correctAnswer": 1
          },
          {
            "phrase": "Qué wea",
            "question": "A Chilean sees something strange and says \"¡Qué wea!\" — what are they expressing?",
            "options": ["How beautiful!", "What the heck / what''s going on", "I''m hungry", "Let''s go"],
            "correctAnswer": 1
          },
          {
            "phrase": "A lo pobre",
            "question": "Someone describes their meal as \"a lo pobre\" — what does that suggest?",
            "options": ["It was very expensive", "It was gourmet", "It was the basic / cheap version", "It was imported"],
            "correctAnswer": 2
          }
        ]
      },
      {
        "type": "flashcards",
        "title": "Test Your Memory",
        "dialogue": null
      }
    ]
  }'::jsonb
FROM new_unit;

-- ─── UNIT 3: Social Life & Parties ───────────────────────────────────────────

WITH mod AS (SELECT id FROM modules WHERE title = '🇨🇱 Modismos chilenos'),
new_unit AS (
  INSERT INTO units (id, module_id, title, description, order_index, estimated_minutes)
  SELECT gen_random_uuid(), mod.id,
    'Social Life & Parties',
    'The vocabulary of Chilean social life — from casual get-togethers to late-night parties.',
    3, 8
  FROM mod
  RETURNING id
)
INSERT INTO lessons (id, unit_id, title, type, order_index, content)
SELECT
  gen_random_uuid(),
  new_unit.id,
  'Social Life & Parties',
  'standard',
  1,
  '{
    "pages": [
      {
        "type": "phrase_list",
        "title": "Social Life & Parties",
        "subtitle": "Words for going out, socialising, and having fun the Chilean way",
        "phrases": [
          { "spanish": "Carrete", "english": "Party / Night out / A good time", "reply": "", "isChilean": true },
          { "spanish": "Carreteando", "english": "Partying / Having a good time (verb form)", "reply": "", "isChilean": true },
          { "spanish": "Junta", "english": "Get-together / Hangout (casual meeting of friends)", "reply": "", "isChilean": true },
          { "spanish": "Copete", "english": "Alcoholic drink / Booze (any kind)", "reply": "", "isChilean": true },
          { "spanish": "Piscola", "english": "Pisco mixed with cola (the classic Chilean drink)", "reply": "", "isChilean": true },
          { "spanish": "Piscolita", "english": "Small piscola / A little drink (affectionate diminutive)", "reply": "", "isChilean": true },
          { "spanish": "Tomar", "english": "To drink (alcohol) — ''vamos a tomar''", "reply": "", "isChilean": false },
          { "spanish": "Al tiro", "english": "Right away / Immediately / Coming right up", "reply": "", "isChilean": true },
          { "spanish": "Caleta", "english": "A lot / Loads / Many — ''tengo caleta de amigos''", "reply": "", "isChilean": true },
          { "spanish": "Luca", "english": "1,000 Chilean pesos (very common in everyday speech)", "reply": "", "isChilean": true },
          { "spanish": "Palo", "english": "1,000,000 Chilean pesos — ''un palo'' (one million)", "reply": "", "isChilean": true },
          { "spanish": "Quedamos", "english": "It''s a plan / We''re set — ''¿quedamos?'' means ''are we set?''", "reply": "", "isChilean": true },
          { "spanish": "Cachar", "english": "To understand / get it — ''¿cachái?'' means ''do you get it?''", "reply": "", "isChilean": true }
        ]
      },
      {
        "type": "multiple_choice",
        "title": "Do you recognize it?",
        "items": [
          {
            "phrase": "Carrete",
            "question": "A Chilean invites you to a \"carrete\" on Saturday — what are they inviting you to?",
            "options": ["A market", "A party / night out", "A restaurant", "A football match"],
            "correctAnswer": 1
          },
          {
            "phrase": "Copete",
            "question": "Someone asks \"¿tomamos un copete?\" — what are they suggesting?",
            "options": ["Shall we eat?", "Shall we have a drink?", "Shall we dance?", "Shall we leave?"],
            "correctAnswer": 1
          },
          {
            "phrase": "Piscola",
            "question": "You''re at a Chilean party and someone hands you a piscola — what is it?",
            "options": ["A type of beer", "Pisco mixed with cola", "A fruit juice", "A wine cocktail"],
            "correctAnswer": 1
          },
          {
            "phrase": "Al tiro",
            "question": "You ask a waiter for the bill and they say \"al tiro\" — what do they mean?",
            "options": ["In a while", "Never", "Right away", "Come back tomorrow"],
            "correctAnswer": 2
          },
          {
            "phrase": "Caleta",
            "question": "A Chilean says \"tengo caleta de cosas que hacer\" — how much do they have to do?",
            "options": ["Nothing", "A little", "A lot / loads", "A specific amount"],
            "correctAnswer": 2
          },
          {
            "phrase": "Luca",
            "question": "Something costs \"cinco lucas\" — how much is that in Chilean pesos?",
            "options": ["500 pesos", "5,000 pesos", "50,000 pesos", "500,000 pesos"],
            "correctAnswer": 1
          },
          {
            "phrase": "Cachar",
            "question": "A Chilean asks \"¿cachái?\" — what are they asking?",
            "options": ["Do you want more?", "Are you hungry?", "Do you understand / get it?", "Are you ready?"],
            "correctAnswer": 2
          },
          {
            "phrase": "Junta",
            "question": "Friends plan a \"junta\" for Friday — what are they planning?",
            "options": ["A work meeting", "A protest", "A casual get-together / hangout", "A formal dinner"],
            "correctAnswer": 2
          },
          {
            "phrase": "Quedamos",
            "question": "After making plans, a Chilean says \"¿quedamos?\" — what are they asking?",
            "options": ["Where are we going?", "Are we set / is it a plan?", "What time is it?", "How much does it cost?"],
            "correctAnswer": 1
          },
          {
            "phrase": "Palo",
            "question": "Someone says something costs \"un palo\" — how much are they talking about?",
            "options": ["1,000 pesos", "10,000 pesos", "100,000 pesos", "1,000,000 pesos"],
            "correctAnswer": 3
          }
        ]
      },
      {
        "type": "flashcards",
        "title": "Test Your Memory",
        "dialogue": null
      }
    ]
  }'::jsonb
FROM new_unit;

-- ─── UNIT 4: Swearing & Rude Language ────────────────────────────────────────

WITH mod AS (SELECT id FROM modules WHERE title = '🇨🇱 Modismos chilenos'),
new_unit AS (
  INSERT INTO units (id, module_id, title, description, order_index, estimated_minutes)
  SELECT gen_random_uuid(), mod.id,
    'Swearing & Rude Language',
    '⚠️ Mature content. These words exist in real Chilean speech — learn to recognise them so you''re never caught off guard.',
    4, 6
  FROM mod
  RETURNING id
)
INSERT INTO lessons (id, unit_id, title, type, order_index, content)
SELECT
  gen_random_uuid(),
  new_unit.id,
  'Swearing & Rude Language',
  'standard',
  1,
  '{
    "pages": [
      {
        "type": "phrase_list",
        "title": "Swearing & Rude Language",
        "subtitle": "⚠️ Mature content. These words are common in real Chilean speech. The goal is recognition — not production.",
        "phrases": [
          { "spanish": "La cagada", "english": "A mess / total disaster (lit. ''the sh*t'')", "reply": "", "isChilean": true },
          { "spanish": "Cagaste", "english": "You''re screwed / You messed up", "reply": "", "isChilean": true },
          { "spanish": "La concha de tu madre", "english": "A very strong insult — one of the most offensive in Chilean Spanish", "reply": "", "isChilean": true },
          { "spanish": "Huevón / Huevona", "english": "Dude / idiot (very versatile — can be affectionate or offensive)", "reply": "", "isChilean": true },
          { "spanish": "Andar cagado", "english": "To be in big trouble / to be screwed", "reply": "", "isChilean": true },
          { "spanish": "Qué chucha", "english": "What the f*** (strong surprise or frustration)", "reply": "", "isChilean": true },
          { "spanish": "La chucha", "english": "Damn / hell (used as emphasis)", "reply": "", "isChilean": true },
          { "spanish": "Maricón", "english": "Homophobic slur — offensive, but heard frequently in casual speech", "reply": "", "isChilean": false },
          { "spanish": "Andar pato", "english": "To be broke / to have no money (''pato'' = duck, Chilean slang)", "reply": "", "isChilean": true },
          { "spanish": "Mandarse a cambiar", "english": "To get lost / go away (telling someone to leave forcefully)", "reply": "", "isChilean": true },
          { "spanish": "Hacerse el weon", "english": "To play dumb / act stupid on purpose", "reply": "", "isChilean": true },
          { "spanish": "Rajarse", "english": "To back out / bail on plans (also means to be generous in other contexts)", "reply": "", "isChilean": true }
        ]
      },
      {
        "type": "multiple_choice",
        "title": "Do you recognize it?",
        "items": [
          {
            "phrase": "La cagada",
            "question": "Someone says \"esto es la cagada\" — what are they describing?",
            "options": ["Something amazing", "A total mess / disaster", "A great party", "A delicious meal"],
            "correctAnswer": 1
          },
          {
            "phrase": "Cagaste",
            "question": "A Chilean says \"cagaste\" after you make a mistake — what does it mean?",
            "options": ["Well done!", "You''re lucky", "You''re screwed / you messed up", "Never mind"],
            "correctAnswer": 2
          },
          {
            "phrase": "Andar pato",
            "question": "Your friend says \"estoy pato\" when you suggest going out — what are they saying?",
            "options": ["I''m tired", "I''m broke / have no money", "I''m hungry", "I''m not interested"],
            "correctAnswer": 1
          },
          {
            "phrase": "Rajarse",
            "question": "You planned something with a Chilean and they say \"me rajé\" — what happened?",
            "options": ["They arrived early", "They brought more people", "They bailed / backed out", "They paid for everyone"],
            "correctAnswer": 2
          },
          {
            "phrase": "Hacerse el weon",
            "question": "Someone says \"se está haciendo el weon\" — what are they accusing the person of?",
            "options": ["Being generous", "Being smart", "Playing dumb on purpose", "Showing off"],
            "correctAnswer": 2
          },
          {
            "phrase": "Qué chucha",
            "question": "Someone sees something shocking and says \"¡Qué chucha!\" — what kind of expression is this?",
            "options": ["A warm greeting", "A strong expression of surprise or frustration", "A compliment", "A farewell"],
            "correctAnswer": 1
          },
          {
            "phrase": "Mandarse a cambiar",
            "question": "An angry Chilean tells someone \"¡Mándate a cambiar!\" — what are they saying?",
            "options": ["Please change your clothes", "Get lost / go away", "Change your mind", "Try again"],
            "correctAnswer": 1
          },
          {
            "phrase": "Huevón",
            "question": "A Chilean calls a close friend \"huevón\" while laughing — how is it likely being used here?",
            "options": ["As a serious insult", "As a compliment", "As an affectionate / casual term for ''dude''", "As a question"],
            "correctAnswer": 2
          },
          {
            "phrase": "Andar cagado",
            "question": "Someone says they''re \"andando cagado\" after a bad week — what does it mean?",
            "options": ["They''re very happy", "They''re in big trouble / things are really bad", "They''re busy", "They''re travelling"],
            "correctAnswer": 1
          },
          {
            "phrase": "Maricón",
            "question": "You hear \"maricón\" in casual Chilean speech — what should you know about this word?",
            "options": ["It is a polite greeting", "It means ''my friend'' in Chilean slang", "It is a homophobic slur — offensive even in casual use", "It means ''good looking''"],
            "correctAnswer": 2
          }
        ]
      },
      {
        "type": "flashcards",
        "title": "Test Your Memory",
        "dialogue": null
      }
    ]
  }'::jsonb
FROM new_unit;
