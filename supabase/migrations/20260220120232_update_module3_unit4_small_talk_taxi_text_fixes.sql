/*
  # Update Small Talk in a Taxi lesson content

  1. Changes
    - In the intro phrases: replace "¿Me puede llevar a… [place/address]?" with "¿Me puede llevar a… ?"
      (removes "[place/address]" placeholder from the Spanish text)
    - In the recap page: update the congratulations message to reference taxi phrases
      instead of the generic "questions locals may ask you" message
*/

UPDATE lessons
SET content = jsonb_set(
  jsonb_set(
    content,
    '{pages,1,phrases,4,spanish}',
    '"¿Me puede llevar a… ?"'
  ),
  '{pages,5,title}',
  '"You''re Doing Great!"'
)
WHERE id = '436b0dcc-fcf1-43b8-aacf-a5ec291eba23';
