/*
  # Update flashcards for Unit 1 - Immigration & Passport Control

  ## Summary
  Replaces the existing flashcards for the Immigration & Passport Control unit with
  the actual phrases from the course: the 4 immigration questions and all possible answers.

  ## Changes
  - Deletes old flashcards for unit f564bca0-10c9-4a5f-88b8-47c221534217
  - Inserts 15 new flashcards matching the lesson intro phrases
*/

DELETE FROM flashcards WHERE unit_id = 'f564bca0-10c9-4a5f-88b8-47c221534217';

INSERT INTO flashcards (unit_id, spanish_text, english_text, order_index) VALUES
  ('f564bca0-10c9-4a5f-88b8-47c221534217', '¿De dónde viene?', 'Where are you from?', 1),
  ('f564bca0-10c9-4a5f-88b8-47c221534217', 'De Estados Unidos.', 'From the United States.', 2),
  ('f564bca0-10c9-4a5f-88b8-47c221534217', 'De Argentina.', 'From Argentina.', 3),
  ('f564bca0-10c9-4a5f-88b8-47c221534217', '¿Cuánto tiempo se queda en Chile?', 'How long are you staying in Chile?', 4),
  ('f564bca0-10c9-4a5f-88b8-47c221534217', 'Diez días.', 'Ten days.', 5),
  ('f564bca0-10c9-4a5f-88b8-47c221534217', 'Tres semanas.', 'Three weeks.', 6),
  ('f564bca0-10c9-4a5f-88b8-47c221534217', 'Un mes.', 'One month.', 7),
  ('f564bca0-10c9-4a5f-88b8-47c221534217', '¿Motivo del viaje?', 'Purpose of your trip?', 8),
  ('f564bca0-10c9-4a5f-88b8-47c221534217', 'Turismo.', 'Tourism.', 9),
  ('f564bca0-10c9-4a5f-88b8-47c221534217', 'Trabajo.', 'Work.', 10),
  ('f564bca0-10c9-4a5f-88b8-47c221534217', 'Visitar familia.', 'Visiting family.', 11),
  ('f564bca0-10c9-4a5f-88b8-47c221534217', '¿Dónde se va a quedar?', 'Where will you be staying?', 12),
  ('f564bca0-10c9-4a5f-88b8-47c221534217', 'Aquí le muestro.', 'Let me show you here.', 13),
  ('f564bca0-10c9-4a5f-88b8-47c221534217', 'En un hotel.', 'In a hotel.', 14),
  ('f564bca0-10c9-4a5f-88b8-47c221534217', 'Con amigos.', 'With friends.', 15);
