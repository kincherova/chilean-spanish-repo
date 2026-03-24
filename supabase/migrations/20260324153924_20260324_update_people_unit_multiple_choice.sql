/*
  # Update People unit multiple choice questions

  Replaces multiple choice questions to only reference phrases in the updated list.
  Removes questions about: Pololear, Cabro chico, Flaco/Flaca, Viejo/Vieja, Cuático/Cuática
  Adds questions about: El tata, La nana, El paco, Flaite
*/

UPDATE lessons
SET content = jsonb_set(
  content,
  '{pages,1,items}',
  '[
    {
      "phrase": "Pololo / Polola",
      "options": ["Their friend","Their girlfriend","Their sister","Their neighbour"],
      "question": "A Chilean says \"mi polola\" — what are they talking about?",
      "correctAnswer": 1
    },
    {
      "phrase": "Weon",
      "options": ["Enemy","Stranger","Dude / mate (casual)","Boss"],
      "question": "Your Chilean friend calls you \"weon\" — what does it most likely mean in casual conversation?",
      "correctAnswer": 2
    },
    {
      "phrase": "Guatón",
      "options": ["Being tall","Being funny","Having a big belly","Being strong"],
      "question": "Someone calls their friend \"guatón\" affectionately — what does it literally come from?",
      "correctAnswer": 2
    },
    {
      "phrase": "Mina",
      "options": ["A gold mine","That woman / girl","That car","That food"],
      "question": "A Chilean says \"esa mina\" — what are they referring to?",
      "correctAnswer": 1
    },
    {
      "phrase": "Gallo / Galla",
      "options": ["A rooster","That guy","That dog","That stranger"],
      "question": "A Chilean says \"ese gallo\" — what are they referring to?",
      "correctAnswer": 1
    },
    {
      "phrase": "La nana",
      "options": ["Grandma","The housekeeper","The nurse","The teacher"],
      "question": "A Chilean family refers to \"la nana\" — who are they talking about?",
      "correctAnswer": 1
    },
    {
      "phrase": "El tata",
      "options": ["The uncle","The dad","Grandpa","The boss"],
      "question": "A child says \"el tata\" — who are they referring to?",
      "correctAnswer": 2
    },
    {
      "phrase": "El paco",
      "options": ["A baker","A police officer","A taxi driver","A teacher"],
      "question": "Someone says \"ahí viene el paco\" — who are they warning about?",
      "correctAnswer": 1
    },
    {
      "phrase": "Flaite",
      "options": ["A wealthy person","A tourist","Someone associated with street culture and low socioeconomic background","A shy person"],
      "question": "A Chilean describes someone as \"flaite\" — what are they implying?",
      "correctAnswer": 2
    },
    {
      "phrase": "Cabro / Cabra",
      "options": ["An old person","A young person","A foreigner","A neighbour"],
      "question": "Someone says \"ese cabro\" — who are they referring to?",
      "correctAnswer": 1
    }
  ]'::jsonb
)
WHERE id = 'ddff48a8-1933-410e-be7e-67960074188f';
