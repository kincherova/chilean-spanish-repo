/*
  # Update Unit 1 - Immigration & Passport Control lesson content

  ## Summary
  Replaces the existing skeleton lesson content for the "Immigration & Passport Control" unit
  with the actual phrases provided for the course. The lesson now uses the real questions
  immigration officers ask at Chilean airports, and the possible answers a traveler would give.

  ## Phrases covered
  - ¿De dónde viene? → De Estados Unidos / De Argentina / De Alemania
  - ¿Cuánto tiempo se queda en Chile? → Diez días / Tres semanas / Un mes
  - ¿Motivo del viaje? → Turismo / Trabajo / Visitar familia
  - ¿Dónde se va a quedar? → Aquí le muestro / En Santiago / En un hotel / Con amigos

  ## Changes
  - Updates the `content` JSONB field of lesson id 2fb0c3a3-a14c-43fc-8d9d-b1cc0f5de872
  - All 7 pages rebuilt: overview, intro, multiple_choice, audio_choice, flashcards, dialogue, recap
  - Replaces flashcards for unit f564bca0-10c9-4a5f-88b8-47c221534217 to match new phrases
*/

UPDATE lessons
SET content = '{
  "pages": [
    {
      "type": "overview",
      "title": "What You''ll Learn",
      "goal": "By the end of this unit, you''ll be able to answer the most common immigration questions at a Chilean airport — where you''re from, how long you''re staying, why you''re visiting, and where you''ll be.",
      "cultural_note": "Chilean immigration officers are calm and professional. Short, direct answers are all you need. You don''t have to explain everything — just answer what they ask."
    },
    {
      "type": "intro",
      "title": "Questions & Answers at Immigration",
      "subtitle": "What they ask — and what you can say",
      "phrases": [
        { "spanish": "¿De dónde viene?", "english": "Where are you from?", "reply": "", "isChilean": false },
        { "spanish": "De Estados Unidos.", "english": "From the United States.", "reply": "", "isChilean": false },
        { "spanish": "De Argentina.", "english": "From Argentina.", "reply": "", "isChilean": false },
        { "spanish": "¿Cuánto tiempo se queda en Chile?", "english": "How long are you staying in Chile?", "reply": "", "isChilean": false },
        { "spanish": "Diez días.", "english": "Ten days.", "reply": "", "isChilean": false },
        { "spanish": "Tres semanas.", "english": "Three weeks.", "reply": "", "isChilean": false },
        { "spanish": "Un mes.", "english": "One month.", "reply": "", "isChilean": false },
        { "spanish": "¿Motivo del viaje?", "english": "Purpose of your trip?", "reply": "", "isChilean": false },
        { "spanish": "Turismo.", "english": "Tourism.", "reply": "", "isChilean": false },
        { "spanish": "Trabajo.", "english": "Work.", "reply": "", "isChilean": false },
        { "spanish": "Visitar familia.", "english": "Visiting family.", "reply": "", "isChilean": false },
        { "spanish": "¿Dónde se va a quedar?", "english": "Where will you be staying?", "reply": "", "isChilean": false },
        { "spanish": "Aquí le muestro.", "english": "Let me show you here (showing papers or phone).", "reply": "", "isChilean": false },
        { "spanish": "En un hotel.", "english": "In a hotel.", "reply": "", "isChilean": false },
        { "spanish": "Con amigos.", "english": "With friends.", "reply": "", "isChilean": false }
      ]
    },
    {
      "type": "multiple_choice",
      "title": "This or That",
      "items": [
        {
          "phrase": "¿De dónde viene?",
          "question": "What does the officer mean?",
          "options": ["How long are you staying?", "Where are you from?", "What is your purpose?", "Where will you stay?"],
          "correctAnswer": 1
        },
        {
          "phrase": "De Estados Unidos.",
          "question": "What does this answer mean?",
          "options": ["From Argentina.", "From Germany.", "From the United States.", "From Spain."],
          "correctAnswer": 2
        },
        {
          "phrase": "¿Cuánto tiempo se queda en Chile?",
          "question": "What is the officer asking?",
          "options": ["Where are you from?", "Why are you visiting?", "How long are you staying in Chile?", "Where will you be staying?"],
          "correctAnswer": 2
        },
        {
          "phrase": "Tres semanas.",
          "question": "What does this mean?",
          "options": ["Three days.", "Three months.", "Thirty days.", "Three weeks."],
          "correctAnswer": 3
        },
        {
          "phrase": "¿Motivo del viaje?",
          "question": "What is the officer asking about?",
          "options": ["Your passport.", "Your flight number.", "The purpose of your trip.", "How long you are staying."],
          "correctAnswer": 2
        },
        {
          "phrase": "Trabajo.",
          "question": "What does this answer mean?",
          "options": ["Tourism.", "Work.", "Visiting family.", "Study."],
          "correctAnswer": 1
        },
        {
          "phrase": "¿Dónde se va a quedar?",
          "question": "What is the officer asking?",
          "options": ["How long will you stay?", "Why are you visiting?", "Where are you from?", "Where will you be staying?"],
          "correctAnswer": 3
        },
        {
          "phrase": "Aquí le muestro.",
          "question": "What does this phrase signal?",
          "options": ["You do not understand.", "You want to leave.", "You are showing something (papers or screen).", "You need help."],
          "correctAnswer": 2
        },
        {
          "phrase": "Con amigos.",
          "question": "Where are you staying according to this answer?",
          "options": ["In a hotel.", "In a hostel.", "With friends.", "In an Airbnb."],
          "correctAnswer": 2
        }
      ]
    },
    {
      "type": "audio_choice",
      "title": "Hear and React",
      "items": [
        {
          "question": "What phrase do you hear?",
          "options": ["¿De dónde viene?", "¿Motivo del viaje?", "¿Dónde se va a quedar?", "¿Cuánto tiempo se queda en Chile?"],
          "correctAnswer": 0
        },
        {
          "question": "What phrase do you hear?",
          "options": ["Trabajo.", "Turismo.", "Visitar familia.", "Un mes."],
          "correctAnswer": 1
        },
        {
          "question": "What phrase do you hear?",
          "options": ["Diez días.", "Un mes.", "Tres semanas.", "De Argentina."],
          "correctAnswer": 2
        },
        {
          "question": "What phrase do you hear?",
          "options": ["Con amigos.", "En un hotel.", "Aquí le muestro.", "De Estados Unidos."],
          "correctAnswer": 3
        },
        {
          "question": "What phrase do you hear?",
          "options": ["¿Cuánto tiempo se queda en Chile?", "¿De dónde viene?", "¿Dónde se va a quedar?", "¿Motivo del viaje?"],
          "correctAnswer": 3
        },
        {
          "question": "What phrase do you hear?",
          "options": ["Turismo.", "Con amigos.", "Trabajo.", "En un hotel."],
          "correctAnswer": 0
        },
        {
          "question": "What phrase do you hear?",
          "options": ["Tres semanas.", "Diez días.", "Un mes.", "De Argentina."],
          "correctAnswer": 2
        },
        {
          "question": "What phrase do you hear?",
          "options": ["En un hotel.", "Con amigos.", "Aquí le muestro.", "Visitar familia."],
          "correctAnswer": 0
        },
        {
          "question": "What phrase do you hear?",
          "options": ["De Argentina.", "De Estados Unidos.", "Visitar familia.", "Trabajo."],
          "correctAnswer": 1
        }
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
      "subtitle": "A traveler going through immigration at Santiago airport",
      "dialogue": [
        { "speaker": "local", "spanish": "Buenas tardes. Pasaporte, por favor." },
        { "speaker": "tourist", "spanish": "Aquí tiene." },
        { "speaker": "local", "spanish": "¿De dónde viene?" },
        { "speaker": "tourist", "spanish": "De Estados Unidos." },
        { "speaker": "local", "spanish": "¿Motivo del viaje?" },
        { "speaker": "tourist", "spanish": "Turismo." },
        { "speaker": "local", "spanish": "¿Cuánto tiempo se queda en Chile?" },
        { "speaker": "tourist", "spanish": "Tres semanas." },
        { "speaker": "local", "spanish": "¿Dónde se va a quedar?" },
        { "speaker": "tourist", "spanish": "Aquí le muestro. (shows phone) En un hotel en Santiago." },
        { "speaker": "local", "spanish": "Perfecto. Bienvenido a Chile." }
      ]
    },
    {
      "type": "recap",
      "title": "You''re Doing Great!",
      "dialogue": [
        { "speaker": "local", "name": "Officer", "spanish": "Buenas tardes. Pasaporte, por favor." },
        { "speaker": "tourist", "name": "Sarah (Tourist)", "spanish": "Aquí tiene." },
        { "speaker": "local", "name": "Officer", "spanish": "¿De dónde viene?" },
        { "speaker": "tourist", "name": "Sarah (Tourist)", "spanish": "De Estados Unidos." },
        { "speaker": "local", "name": "Officer", "spanish": "¿Motivo del viaje?" },
        { "speaker": "tourist", "name": "Sarah (Tourist)", "spanish": "Turismo." },
        { "speaker": "local", "name": "Officer", "spanish": "¿Cuánto tiempo se queda en Chile?" },
        { "speaker": "tourist", "name": "Sarah (Tourist)", "spanish": "Tres semanas." },
        { "speaker": "local", "name": "Officer", "spanish": "¿Dónde se va a quedar?" },
        { "speaker": "tourist", "name": "Sarah (Tourist)", "spanish": "En un hotel en Santiago." },
        { "speaker": "local", "name": "Officer", "spanish": "Perfecto. Bienvenido a Chile." }
      ]
    }
  ]
}'::jsonb
WHERE id = '2fb0c3a3-a14c-43fc-8d9d-b1cc0f5de872';
