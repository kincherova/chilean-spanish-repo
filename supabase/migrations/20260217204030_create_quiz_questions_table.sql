/*
  # Create Quiz Questions Table

  1. New Tables
    - `quiz_questions`
      - `id` (uuid, primary key)
      - `unit_id` (uuid, foreign key to units)
      - `question_text` (text) - The question prompt in English
      - `question_spanish` (text, optional) - Spanish text if needed in question
      - `correct_answer` (text) - The correct answer option
      - `option_a` (text) - First option
      - `option_b` (text) - Second option
      - `option_c` (text) - Third option
      - `option_d` (text, optional) - Fourth option
      - `explanation` (text, optional) - Explanation of correct answer
      - `order_index` (integer) - Order within the unit
      - `created_at` (timestamptz)

    - `user_quiz_attempts`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `quiz_question_id` (uuid, foreign key to quiz_questions)
      - `selected_answer` (text) - User's selected answer
      - `is_correct` (boolean) - Whether answer was correct
      - `attempted_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Quiz questions are public (readable by all)
    - User quiz attempts are private (users can only see their own)

  3. Sample Data
    - Add sample quiz questions for Unit 1
*/

CREATE TABLE IF NOT EXISTS quiz_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  unit_id uuid REFERENCES units(id) ON DELETE CASCADE NOT NULL,
  question_text text NOT NULL,
  question_spanish text,
  correct_answer text NOT NULL,
  option_a text NOT NULL,
  option_b text NOT NULL,
  option_c text NOT NULL,
  option_d text,
  explanation text,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_quiz_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  quiz_question_id uuid REFERENCES quiz_questions(id) ON DELETE CASCADE NOT NULL,
  selected_answer text NOT NULL,
  is_correct boolean NOT NULL,
  attempted_at timestamptz DEFAULT now()
);

ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_quiz_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Quiz questions are publicly readable"
  ON quiz_questions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can view own quiz attempts"
  ON user_quiz_attempts FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own quiz attempts"
  ON user_quiz_attempts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Insert sample quiz questions for Unit 1
INSERT INTO quiz_questions (unit_id, question_text, question_spanish, correct_answer, option_a, option_b, option_c, explanation, order_index)
SELECT 
  id,
  'If somebody asks "¿De dónde eres?", what is the most natural reply?',
  '¿De dónde eres?',
  'b',
  'Yo soy alto',
  'Soy de México',
  'Estoy en la casa',
  'The question asks "Where are you from?" so the natural response is to state your origin/country.',
  1
FROM units WHERE title = 'Basics 1'
LIMIT 1;

INSERT INTO quiz_questions (unit_id, question_text, correct_answer, option_a, option_b, option_c, explanation, order_index)
SELECT 
  id,
  'Which greeting would you use in a formal business setting?',
  'a',
  'Buenos días, señor',
  'Hola, tío',
  '¿Qué tal?',
  'In formal settings, use "Buenos días" (Good morning) with titles like "señor" or "señora".',
  2
FROM units WHERE title = 'Basics 1'
LIMIT 1;

INSERT INTO quiz_questions (unit_id, question_text, correct_answer, option_a, option_b, option_c, option_d, explanation, order_index)
SELECT 
  id,
  'Complete the sentence: "Me _____ Juan."',
  'c',
  'soy',
  'estoy',
  'llamo',
  'es',
  'To say "My name is Juan," you use "Me llamo Juan." (I call myself Juan)',
  3
FROM units WHERE title = 'Basics 1'
LIMIT 1;

INSERT INTO quiz_questions (unit_id, question_text, question_spanish, correct_answer, option_a, option_b, option_c, explanation, order_index)
SELECT 
  id,
  'What does "Mucho gusto" mean?',
  'Mucho gusto',
  'b',
  'Thank you very much',
  'Nice to meet you',
  'See you later',
  '"Mucho gusto" literally means "much pleasure" and is used when meeting someone for the first time.',
  4
FROM units WHERE title = 'Basics 1'
LIMIT 1;