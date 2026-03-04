/*
  # Add unit_type column to units table

  ## Changes
  - Adds a `unit_type` column to the `units` table with a default of 'standard'
  - Sets `unit_type = 'vocabulary'` for the 5 vocabulary units in Module 4 (Cafes & Restaurants)

  ## New Column
  - `unit_type` (text, default 'standard') — distinguishes vocabulary reference units from standard lesson units
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'units' AND column_name = 'unit_type'
  ) THEN
    ALTER TABLE units ADD COLUMN unit_type text NOT NULL DEFAULT 'standard';
  END IF;
END $$;

UPDATE units
SET unit_type = 'vocabulary'
WHERE id IN (
  '50db43f2-e964-430b-9ff3-a3c244862448',
  '8c93756e-aeb5-4049-9b31-2388d7b76122',
  '199a1d88-098f-4af1-a3e7-39ce0acd778c',
  'a47abe4c-c3c1-4fc8-8201-cac0453a2da3',
  '3bbc1b35-f819-4077-b2a0-ae4b798c978b'
);
