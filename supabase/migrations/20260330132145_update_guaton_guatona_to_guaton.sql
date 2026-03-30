/*
  # Update "Guatón / Guatona" to "Guatón"

  Changes the spanish_text in the flashcards table and updates the lesson content
  for the "People, Relationships & Everyday Life" vocabulary unit in Module 6.

  1. Modified Tables
    - `flashcards`: Update spanish_text from "Guatón / Guatona" to "Guatón"
    - `lessons`: Update phrase_list entry and multiple_choice phrase reference
*/

UPDATE flashcards
SET spanish_text = 'Guatón'
WHERE id = '25f4abce-ed9e-4d4e-a01d-89d75916bdb4';

UPDATE lessons
SET content = jsonb_set(
  jsonb_set(
    content,
    '{pages,0,phrases,5,spanish}',
    '"Guatón"'
  ),
  '{pages,1,items,2,phrase}',
  '"Guatón"'
)
WHERE id = 'ddff48a8-1933-410e-be7e-67960074188f';
