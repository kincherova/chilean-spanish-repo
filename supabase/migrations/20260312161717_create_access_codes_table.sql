/*
  # Create access_codes table

  ## Purpose
  Stores promotional/gifted access codes that can be redeemed by users to get premium access.
  This replaces the hardcoded access code in the frontend, making it secure and manageable.

  ## New Tables
  - `access_codes`
    - `id` (uuid, primary key)
    - `code` (text, unique) — the access code string users enter
    - `description` (text, nullable) — optional note about who/what this code is for
    - `is_active` (boolean) — whether the code can still be redeemed
    - `max_uses` (int, nullable) — if set, limits how many times the code can be used
    - `use_count` (int) — tracks how many times the code has been redeemed
    - `created_at` (timestamptz)

  ## Security
  - RLS enabled — no public access
  - Only the service role (edge functions) can read/update codes
  - Users cannot read or enumerate codes directly

  ## Notes
  - Codes are case-insensitive at the application layer (edge function lowercases input)
  - Set max_uses = NULL for unlimited use codes
  - Set is_active = false to immediately revoke a code
*/

CREATE TABLE IF NOT EXISTS access_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  description text,
  is_active boolean NOT NULL DEFAULT true,
  max_uses int,
  use_count int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE access_codes ENABLE ROW LEVEL SECURITY;

INSERT INTO access_codes (code, description, is_active)
VALUES ('56990', 'Original promotional code', true)
ON CONFLICT (code) DO NOTHING;
