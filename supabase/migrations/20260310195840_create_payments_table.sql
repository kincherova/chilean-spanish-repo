/*
  # Create payments table

  ## Purpose
  Tracks MercadoPago payment attempts and their outcomes.
  When a payment is approved, the user's is_premium flag is set to true.

  ## New Tables
  - `payments`
    - `id` (uuid, primary key)
    - `user_id` (uuid, FK to auth.users)
    - `mp_preference_id` (text) - MercadoPago preference ID created at checkout
    - `mp_payment_id` (text, nullable) - MercadoPago payment ID after completion
    - `status` (text) - pending, approved, rejected, cancelled
    - `amount` (numeric) - amount charged
    - `currency` (text) - e.g. CLP, ARS
    - `created_at` (timestamptz)
    - `updated_at` (timestamptz)

  ## Security
  - RLS enabled
  - Users can only read their own payment records
  - Insert/update only via service role (edge functions)
*/

CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  mp_preference_id text NOT NULL,
  mp_payment_id text,
  status text NOT NULL DEFAULT 'pending',
  amount numeric NOT NULL,
  currency text NOT NULL DEFAULT 'CLP',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS payments_user_id_idx ON payments(user_id);
CREATE INDEX IF NOT EXISTS payments_mp_preference_id_idx ON payments(mp_preference_id);
CREATE INDEX IF NOT EXISTS payments_mp_payment_id_idx ON payments(mp_payment_id);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own payments"
  ON payments FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);
