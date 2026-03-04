
/*
  # Remove duplicate audio choice items from Hear and React lessons

  Three lessons had duplicate audio items (same audioUrl used twice in the same exercise).
  This migration removes the second occurrence of each duplicate, keeping the first.

  1. Lesson: "Finding the Exit, Taxi & Uber Zone" (388e7589-...)
     - Remove item at index 7 (duplicate of index 6, both play "Por allá")

  2. Lesson: "Asking for clarification" (9b6ef049-...)
     - Remove item at index 7 (duplicate of index 4, both play "Disculpa")

  3. Lesson: "Asking for Help at the Airport" (6b9fedb4-...)
     - Remove item at index 8 (duplicate of index 4, both play "¿Puede repetir más despacio?")
*/

-- Remove duplicate item at index 7 from "Finding the Exit, Taxi & Uber Zone"
UPDATE lessons
SET content = jsonb_set(
  content,
  '{pages,3,items}',
  (
    SELECT jsonb_agg(item ORDER BY idx)
    FROM jsonb_array_elements(content->'pages'->3->'items') WITH ORDINALITY AS t(item, idx)
    WHERE idx <> 8
  )
)
WHERE id = '388e7589-7f4d-402d-907c-543988cac82a';

-- Remove duplicate item at index 7 from "Asking for clarification"
UPDATE lessons
SET content = jsonb_set(
  content,
  '{pages,3,items}',
  (
    SELECT jsonb_agg(item ORDER BY idx)
    FROM jsonb_array_elements(content->'pages'->3->'items') WITH ORDINALITY AS t(item, idx)
    WHERE idx <> 8
  )
)
WHERE id = '9b6ef049-e5d9-4a82-a191-760989f48a03';

-- Remove duplicate item at index 8 from "Asking for Help at the Airport"
UPDATE lessons
SET content = jsonb_set(
  content,
  '{pages,3,items}',
  (
    SELECT jsonb_agg(item ORDER BY idx)
    FROM jsonb_array_elements(content->'pages'->3->'items') WITH ORDINALITY AS t(item, idx)
    WHERE idx <> 9
  )
)
WHERE id = '6b9fedb4-caf9-4c1c-b0fa-ff7f182d3f11';
