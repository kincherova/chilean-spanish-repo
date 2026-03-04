/*
  # Update Module 3 Unit 2 "Useful vocabulary" lesson content

  ## Changes
  1. Phrase list (intro page):
     - Replace "la calle [street name]" with "la calle"
     - Replace "la avenida [avenue name]" with "la avenida"
     - Add "una cuadra" (a block) to the phrase list

  2. Dialogue (page 6) and Recap (page 7):
     - Replace tourist line "¿Cuánto camino?" with "¿Está lejos?"
*/

UPDATE lessons
SET content = $json${
  "pages": [
    {
      "type": "overview",
      "title": "What You'll Learn",
      "goal": "By the end of this unit, you'll know the core vocabulary for places, transport, and spatial directions — the building blocks of every direction conversation in Chile.",
      "cultural_note": "Chileans give directions using landmarks, not street names. You'll hear things like 'en la esquina', 'al frente', or 'por allá' more than exact addresses. Knowing these words helps more than knowing the map."
    },
    {
      "type": "intro",
      "title": "Useful vocabulary (places, prepositions…)",
      "subtitle": "Words for places, transport, and directions",
      "phrases": [
        { "reply": "", "english": "the metro / subway", "spanish": "el metro", "isChilean": false },
        { "reply": "", "english": "bus stop number…", "spanish": "la parada de micro número…", "isChilean": true },
        { "reply": "", "english": "the town square / plaza", "spanish": "la plaza", "isChilean": false },
        { "reply": "", "english": "the street", "spanish": "la calle", "isChilean": false },
        { "reply": "", "english": "the avenue", "spanish": "la avenida", "isChilean": false },
        { "reply": "", "english": "the traffic light", "spanish": "el semáforo", "isChilean": false },
        { "reply": "", "english": "traffic jam", "spanish": "el taco", "isChilean": true },
        { "reply": "", "english": "right there", "spanish": "Ahí mismo", "isChilean": false },
        { "reply": "", "english": "farther away", "spanish": "Más allá", "isChilean": false },
        { "reply": "", "english": "straight ahead / across", "spanish": "Al frente", "isChilean": false },
        { "reply": "", "english": "close / nearby", "spanish": "Cerca", "isChilean": false },
        { "reply": "", "english": "far", "spanish": "Lejos", "isChilean": false },
        { "reply": "", "english": "on the corner", "spanish": "En la esquina", "isChilean": false },
        { "reply": "", "english": "next to / beside", "spanish": "Al lado de", "isChilean": false },
        { "reply": "", "english": "ten minutes away", "spanish": "a diez minutos", "isChilean": false },
        { "reply": "", "english": "a block", "spanish": "una cuadra", "isChilean": false }
      ]
    },
    {
      "type": "multiple_choice",
      "title": "This or That",
      "items": [
        { "phrase": "el taco", "options": ["a type of food", "traffic jam", "the bus stop", "a street corner"], "question": "What does this Chilean word mean?", "correctAnswer": 1 },
        { "phrase": "el semáforo", "options": ["the crosswalk", "the traffic light", "the intersection", "the sign"], "question": "What does it mean?", "correctAnswer": 1 },
        { "phrase": "Ahí mismo", "options": ["a little farther", "right there", "far away", "on the corner"], "question": "What does this mean?", "correctAnswer": 1 },
        { "phrase": "En la esquina", "options": ["on the avenue", "in the plaza", "on the corner", "on the street"], "question": "What does it mean?", "correctAnswer": 2 },
        { "phrase": "Al lado de", "options": ["across from", "far from", "next to / beside", "near the corner"], "question": "What does it mean?", "correctAnswer": 2 },
        { "phrase": "Más allá", "options": ["right here", "farther away", "very close", "on the left"], "question": "What does this mean?", "correctAnswer": 1 },
        { "phrase": "la parada de micro número…", "options": ["a small taxi", "a bus", "a minivan", "the metro"], "question": "What is a 'micro' in Chile?", "correctAnswer": 1 },
        { "phrase": "Al frente", "options": ["to the right", "to the left", "straight ahead / across", "behind you"], "question": "What does it mean?", "correctAnswer": 2 },
        { "phrase": "a diez minutos", "options": ["a time limit", "distance by car only", "how far away something is", "how long to wait"], "question": "What does this phrase describe?", "correctAnswer": 2 }
      ]
    },
    {
      "type": "audio_choice",
      "title": "Hear and React",
      "items": [
        { "options": ["el metro", "la plaza", "el taco", "el semáforo"], "question": "What phrase do you hear?", "correctAnswer": 2 },
        { "options": ["Cerca", "Lejos", "Ahí mismo", "Al frente"], "question": "What phrase do you hear?", "correctAnswer": 0 },
        { "options": ["En la esquina", "Al lado de", "Más allá", "a diez minutos"], "question": "What phrase do you hear?", "correctAnswer": 3 },
        { "options": ["la avenida", "la calle", "la plaza", "el metro"], "question": "What phrase do you hear?", "correctAnswer": 1 },
        { "options": ["Al frente", "En la esquina", "Ahí mismo", "Más allá"], "question": "What phrase do you hear?", "correctAnswer": 1 },
        { "options": ["el semáforo", "la parada de micro", "el taco", "la plaza"], "question": "What phrase do you hear?", "correctAnswer": 0 },
        { "options": ["Más allá", "Cerca", "Al lado de", "Lejos"], "question": "What phrase do you hear?", "correctAnswer": 3 },
        { "options": ["a diez minutos", "Al frente", "En la esquina", "Ahí mismo"], "question": "What phrase do you hear?", "correctAnswer": 0 },
        { "options": ["Al lado de", "la avenida", "el metro", "En la esquina"], "question": "What phrase do you hear?", "correctAnswer": 0 }
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
      "subtitle": "A tourist trying to find the bus and the plaza",
      "dialogue": [
        { "spanish": "Disculpa, ¿la plaza está lejos?", "speaker": "tourist" },
        { "spanish": "No, está cerca. Al frente, en la esquina.", "speaker": "local" },
        { "spanish": "¿Y la parada de micro?", "speaker": "tourist" },
        { "spanish": "Más allá, al lado de la farmacia.", "speaker": "local" },
        { "spanish": "¿Está lejos?", "speaker": "tourist" },
        { "spanish": "A diez minutos. Pero hay taco ahora.", "speaker": "local" },
        { "spanish": "¿El metro está ahí mismo?", "speaker": "tourist" },
        { "spanish": "Sí, ahí mismo, en la avenida.", "speaker": "local" }
      ]
    },
    {
      "type": "recap",
      "title": "You're Doing Great!",
      "dialogue": [
        { "name": "Alex (Tourist)", "spanish": "Disculpa, ¿la plaza está lejos?", "speaker": "tourist" },
        { "name": "Local", "spanish": "No, está cerca. Al frente, en la esquina.", "speaker": "local" },
        { "name": "Alex (Tourist)", "spanish": "¿Y la parada de micro?", "speaker": "tourist" },
        { "name": "Local", "spanish": "Más allá, al lado de la farmacia.", "speaker": "local" },
        { "name": "Alex (Tourist)", "spanish": "¿Está lejos?", "speaker": "tourist" },
        { "name": "Local", "spanish": "A diez minutos. Pero hay taco ahora.", "speaker": "local" },
        { "name": "Alex (Tourist)", "spanish": "¿El metro está ahí mismo?", "speaker": "tourist" },
        { "name": "Local", "spanish": "Sí, ahí mismo, en la avenida.", "speaker": "local" }
      ]
    }
  ]
}$json$::jsonb
WHERE id = 'c01a8596-938f-48a7-b4cd-022c19e9ddcc';
