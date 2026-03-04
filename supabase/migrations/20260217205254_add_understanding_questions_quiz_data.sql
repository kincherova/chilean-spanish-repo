/*
  # Add Quiz Questions for Understanding Questions Unit

  1. Sample Data
    - Add quiz questions for "Understanding questions" unit
    - Questions focus on asking questions in Spanish
    - Each question has 3-4 options with explanations
*/

INSERT INTO quiz_questions (unit_id, question_text, question_spanish, correct_answer, option_a, option_b, option_c, explanation, order_index)
VALUES 
  (
    'bac8627a-e89e-400a-b54e-217e4f379fc2',
    'How would you ask someone "What is your name?"',
    NULL,
    'a',
    '¿Cómo te llamas?',
    '¿Cuántos años tienes?',
    '¿Dónde vives?',
    'The phrase "¿Cómo te llamas?" literally means "How do you call yourself?" and is the standard way to ask someone their name.',
    1
  ),
  (
    'bac8627a-e89e-400a-b54e-217e4f379fc2',
    'Which question would you use to ask "Where are you from?"',
    NULL,
    'b',
    '¿Adónde vas?',
    '¿De dónde eres?',
    '¿Dónde está?',
    '"¿De dónde eres?" asks about someone origin or home country. "Eres" comes from the verb "ser" which indicates permanent characteristics.',
    2
  ),
  (
    'bac8627a-e89e-400a-b54e-217e4f379fc2',
    'How do you ask "How old are you?"',
    NULL,
    'c',
    '¿Qué edad estás?',
    '¿Cuánto años eres?',
    '¿Cuántos años tienes?',
    'The correct phrase is "¿Cuántos años tienes?" which literally translates to "How many years do you have?" This is the standard way to ask about age in Spanish.',
    3
  ),
  (
    'bac8627a-e89e-400a-b54e-217e4f379fc2',
    'What is the correct way to ask "Where do you live?"',
    NULL,
    'a',
    '¿Dónde vives?',
    '¿Dónde eres?',
    '¿Cuál vives?',
    '"¿Dónde vives?" uses the verb "vivir" (to live) with the location word "dónde" (where). This is asking about current location, not origin.',
    4
  ),
  (
    'bac8627a-e89e-400a-b54e-217e4f379fc2',
    'How would you ask "What time is it?"',
    NULL,
    'b',
    '¿Cuándo es la hora?',
    '¿Qué hora es?',
    '¿Cuál hora es?',
    '"¿Qué hora es?" is the standard way to ask for the time. It literally means "What hour is it?"',
    5
  );
