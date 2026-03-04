/*
  # Reorder Module 4 units — vocabulary units first

  ## Changes
  - Vocabulary units (formerly order_index 5–9) are moved to order_index 1–5
  - Standard lesson units (formerly order_index 1–4) are moved to order_index 6–9
  - This places the "Key vocabulary" reference units at the top of the module list

  ## New order
  1. Restaurant Vocabulary    (vocabulary)
  2. Café Vocabulary          (vocabulary)
  3. Food & Drinks            (vocabulary)
  4. Tea Time (Once)          (vocabulary)
  5. Words Related to Money   (vocabulary)
  6. Arriving & Getting a Table   (standard)
  7. Reading the Menu & Ordering  (standard)
  8. Asking Questions & Clarifying (standard)
  9. Paying the Bill & Tipping    (standard)
*/

UPDATE units SET order_index = 1  WHERE id = '50db43f2-e964-430b-9ff3-a3c244862448';
UPDATE units SET order_index = 2  WHERE id = '8c93756e-aeb5-4049-9b31-2388d7b76122';
UPDATE units SET order_index = 3  WHERE id = '199a1d88-098f-4af1-a3e7-39ce0acd778c';
UPDATE units SET order_index = 4  WHERE id = 'a47abe4c-c3c1-4fc8-8201-cac0453a2da3';
UPDATE units SET order_index = 5  WHERE id = '3bbc1b35-f819-4077-b2a0-ae4b798c978b';
UPDATE units SET order_index = 6  WHERE id = 'c1337693-7182-4906-af05-176ce1559953';
UPDATE units SET order_index = 7  WHERE id = 'e13c2f8a-0a79-4724-b7fb-f710205594cf';
UPDATE units SET order_index = 8  WHERE id = '27a02602-8ae9-4fcf-af9c-cfc4dbb88bbe';
UPDATE units SET order_index = 9  WHERE id = '3d29e691-752c-4519-9898-d4574b9b872d';
