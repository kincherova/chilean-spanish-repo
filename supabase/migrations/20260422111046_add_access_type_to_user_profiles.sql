/*
  # Add access_type to user_profiles

  1. Changes
    - `user_profiles`: new `access_type` column (text, nullable)
      - NULL = free user
      - 'access_code' = redeemed an access code
      - 'paid' = completed a MercadoPago payment

  2. Backfill
    - Users who have an approved payment → 'paid'
    - Remaining premium users (no payment) → 'access_code'
    - Non-premium users → left NULL
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_profiles' AND column_name = 'access_type'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN access_type text DEFAULT NULL;
  END IF;
END $$;

-- Backfill paid users
UPDATE user_profiles up
SET access_type = 'paid'
WHERE is_premium = true
  AND EXISTS (
    SELECT 1 FROM payments p
    WHERE p.user_id = up.id AND p.status = 'approved'
  )
  AND access_type IS NULL;

-- Backfill access-code users (premium but no approved payment)
UPDATE user_profiles up
SET access_type = 'access_code'
WHERE is_premium = true
  AND NOT EXISTS (
    SELECT 1 FROM payments p
    WHERE p.user_id = up.id AND p.status = 'approved'
  )
  AND access_type IS NULL;
