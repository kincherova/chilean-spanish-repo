/*
  # Update cultural note in "Finding the Exit, Taxi & Uber Zone" lesson

  Updates the overview page cultural_note in the lesson for module 2, unit 3
  ("Finding the Exit, Taxi & Uber Zone") with revised wording and formatted bullet points.
*/

UPDATE lessons
SET content = jsonb_set(
  content,
  '{pages,0,cultural_note}',
  '"Asking short questions is normal here, especially at the airport. You can just say Taxi? or Baño? and people will understand you. Getting from the airport to the city is easy.\n\nYou''ve got a few good options:\n• Official taxi: You''ll see the counters after you exit. Safe and simple.\n• Uber: It works fine at the airport. Just follow the app instructions.\n• Bus to the metro: You can take a bus to Pajaritos metro station, then you''ll continue by metro.\n• Shared van / transfer: Services like Transvip can take you straight to your hotel or home."'
)
WHERE id = '388e7589-7f4d-402d-907c-543988cac82a';
