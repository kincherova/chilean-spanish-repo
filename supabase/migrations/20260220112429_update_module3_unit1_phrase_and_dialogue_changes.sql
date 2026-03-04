/*
  # Update Module 3, Unit 1 "If you get lost…" lesson content

  ## Changes
  1. Intro phrase list:
     - Add "¿A dónde quieres ir?" (Where do you want to go?) after "Me perdí."
     - Replace "Estoy buscando… [place]" with "Estoy buscando…"

  2. Multiple choice:
     - Update phrase text from "Estoy buscando… [place]" to "Estoy buscando…"
     - Update the correct answer option text accordingly

  3. Dialogue page — add English translations (shown in italics) to:
     - "Sigue derecho dos cuadras."
     - "La plaza está un poco más allá, a la derecha."
     - "A la de-re-cha, después del semáforo."

  4. Recap page — same English translation additions as dialogue page.
*/

UPDATE lessons
SET content = $json${
  "pages": [
    {
      "type": "overview",
      "title": "What You'll Learn",
      "goal": "By the end of this unit, you'll be able to stop someone on the street, say you're lost, and ask for directions to a specific place.",
      "cultural_note": "On the street, people in Chile are usually helpful, even if they look busy. If you start with 'Disculpa', most people will stop and try to help. Don't worry if the explanation is fast — just say 'De nuevo, por favor'."
    },
    {
      "type": "intro",
      "title": "If you get lost…",
      "subtitle": "Phrases to ask for help when you don't know where you are",
      "phrases": [
        { "spanish": "Hola, disculpa", "english": "Hi, excuse me", "reply": "", "isChilean": false },
        { "spanish": "Hola, una pregunta", "english": "Hi, I have a question", "reply": "", "isChilean": false },
        { "spanish": "Me perdí.", "english": "I got lost.", "reply": "", "isChilean": false },
        { "spanish": "¿A dónde quieres ir?", "english": "Where do you want to go?", "reply": "", "isChilean": false },
        { "spanish": "Estoy buscando…", "english": "I'm looking for…", "reply": "", "isChilean": false },
        { "spanish": "¿Dónde está…?", "english": "Where is…?", "reply": "", "isChilean": false },
        { "spanish": "¿Cómo llego a…?", "english": "How do I get to…?", "reply": "", "isChilean": false },
        { "spanish": "¿Para ir a…?", "english": "How do I go to…?", "reply": "", "isChilean": false },
        { "spanish": "De nuevo, por favor.", "english": "Again, please.", "reply": "", "isChilean": false },
        { "spanish": "Muchas gracias, te pasaste.", "english": "Thank you so much, you were great.", "reply": "", "isChilean": true }
      ]
    },
    {
      "type": "multiple_choice",
      "title": "This or That",
      "items": [
        {
          "phrase": "Me perdí.",
          "question": "What does this phrase mean?",
          "options": ["I'm looking for something.", "I got lost.", "I need help.", "Where is the exit?"],
          "correctAnswer": 1
        },
        {
          "phrase": "Hola, disculpa",
          "question": "When would you use this?",
          "options": ["To say goodbye.", "To thank someone.", "To get someone's attention politely.", "To ask for directions."],
          "correctAnswer": 2
        },
        {
          "phrase": "¿Dónde está…?",
          "question": "What does it mean?",
          "options": ["How do I get to…?", "I'm looking for…", "Where is…?", "Can you help me?"],
          "correctAnswer": 2
        },
        {
          "phrase": "¿Cómo llego a…?",
          "question": "What does this ask?",
          "options": ["Where is…?", "How do I get to…?", "How far is…?", "Is it close?"],
          "correctAnswer": 1
        },
        {
          "phrase": "De nuevo, por favor.",
          "question": "What does this request mean?",
          "options": ["Speak more slowly, please.", "Again, please.", "I don't understand.", "Can you write that down?"],
          "correctAnswer": 1
        },
        {
          "phrase": "Estoy buscando…",
          "question": "What does this mean?",
          "options": ["I got lost.", "I need directions.", "I'm looking for…", "Where is…?"],
          "correctAnswer": 2
        },
        {
          "phrase": "Muchas gracias, te pasaste.",
          "question": "What does this Chilean expression mean?",
          "options": ["You went the wrong way.", "Thank you so much, you were great.", "You passed by.", "Thanks, that's enough."],
          "correctAnswer": 1
        },
        {
          "phrase": "¿Para ir a…?",
          "question": "What does this mean?",
          "options": ["Is it far to…?", "Where is…?", "How do I go to…?", "Can I walk to…?"],
          "correctAnswer": 2
        },
        {
          "phrase": "Hola, una pregunta",
          "question": "What are you signaling when you say this?",
          "options": ["That you are lost.", "That you want to ask something.", "That you need a taxi.", "That you don't understand."],
          "correctAnswer": 1
        }
      ]
    },
    {
      "type": "audio_choice",
      "title": "Hear and React",
      "items": [
        { "question": "What phrase do you hear?", "options": ["Me perdí.", "Hola, disculpa", "De nuevo, por favor.", "¿Dónde está…?"], "correctAnswer": 1 },
        { "question": "What phrase do you hear?", "options": ["Hola, una pregunta", "Me perdí.", "¿Cómo llego a…?", "Estoy buscando…"], "correctAnswer": 1 },
        { "question": "What phrase do you hear?", "options": ["¿Para ir a…?", "De nuevo, por favor.", "Me perdí.", "¿Dónde está…?"], "correctAnswer": 2 },
        { "question": "What phrase do you hear?", "options": ["Estoy buscando…", "¿Cómo llego a…?", "Muchas gracias, te pasaste.", "Hola, disculpa"], "correctAnswer": 2 },
        { "question": "What phrase do you hear?", "options": ["De nuevo, por favor.", "¿Para ir a…?", "Me perdí.", "Hola, una pregunta"], "correctAnswer": 0 },
        { "question": "What phrase do you hear?", "options": ["¿Dónde está…?", "Estoy buscando…", "Hola, disculpa", "¿Cómo llego a…?"], "correctAnswer": 3 },
        { "question": "What phrase do you hear?", "options": ["Muchas gracias, te pasaste.", "Me perdí.", "¿Para ir a…?", "De nuevo, por favor."], "correctAnswer": 0 },
        { "question": "What phrase do you hear?", "options": ["¿Cómo llego a…?", "Hola, disculpa", "Estoy buscando…", "¿Dónde está…?"], "correctAnswer": 3 },
        { "question": "What phrase do you hear?", "options": ["Hola, una pregunta", "Muchas gracias, te pasaste.", "De nuevo, por favor.", "Me perdí."], "correctAnswer": 3 }
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
      "subtitle": "A tourist asking a local for directions on the street",
      "dialogue": [
        { "speaker": "tourist", "spanish": "Hola, disculpa. Me perdí." },
        { "speaker": "local", "spanish": "¿A dónde quieres ir?" },
        { "speaker": "tourist", "spanish": "Estoy buscando el metro." },
        { "speaker": "local", "spanish": "Ah, está ahí mismo. Sigue derecho dos cuadras.", "english": "Go straight two blocks." },
        { "speaker": "tourist", "spanish": "¿Cómo llego a la plaza?" },
        { "speaker": "local", "spanish": "La plaza está un poco más allá, a la derecha.", "english": "The plaza is a little further, on the right." },
        { "speaker": "tourist", "spanish": "De nuevo, por favor." },
        { "speaker": "local", "spanish": "A la de-re-cha, después del semáforo.", "english": "To the ri-ight, after the traffic light." },
        { "speaker": "tourist", "spanish": "Muchas gracias, te pasaste." }
      ]
    },
    {
      "type": "recap",
      "title": "You're Doing Great!",
      "dialogue": [
        { "speaker": "tourist", "name": "Alex (Tourist)", "spanish": "Hola, disculpa. Me perdí." },
        { "speaker": "local", "name": "Local", "spanish": "¿A dónde quieres ir?" },
        { "speaker": "tourist", "name": "Alex (Tourist)", "spanish": "Estoy buscando el metro." },
        { "speaker": "local", "name": "Local", "spanish": "Ah, está ahí mismo. Sigue derecho dos cuadras.", "english": "Go straight two blocks." },
        { "speaker": "tourist", "name": "Alex (Tourist)", "spanish": "¿Cómo llego a la plaza?" },
        { "speaker": "local", "name": "Local", "spanish": "La plaza está un poco más allá, a la derecha.", "english": "The plaza is a little further, on the right." },
        { "speaker": "tourist", "name": "Alex (Tourist)", "spanish": "De nuevo, por favor." },
        { "speaker": "local", "name": "Local", "spanish": "A la de-re-cha, después del semáforo.", "english": "To the ri-ight, after the traffic light." },
        { "speaker": "tourist", "name": "Alex (Tourist)", "spanish": "Muchas gracias, te pasaste." }
      ]
    }
  ]
}$json$::jsonb
WHERE unit_id = (
  SELECT u.id FROM units u
  JOIN modules m ON u.module_id = m.id
  WHERE m.title = '🚕 Taxi/Uber Chat'
  AND u.title = 'If you get lost…'
);
