/*
  # Add Initial Modules

  1. Data
    - Inserts 5 initial modules for the language learning app:
      - Arriving at the Airport (Coming soon)
      - Taxi / Uber chat (Coming soon)
      - Cafes & restaurants (Coming soon)
      - Shops & paying (Coming soon)
      - Polite survival talk (Ready to develop)
    
  2. Notes
    - Each module has an emoji icon, title, description
    - Modules are ordered by their order_index
    - Status will be displayed in UI based on whether units exist
*/

-- Clear existing modules (if any) to avoid duplicates
DELETE FROM modules;

-- Insert initial modules
INSERT INTO modules (title, description, icon, order_index)
VALUES
  (
    '✈️ Arriving at the Airport',
    'Navigate immigration, baggage claim, and airport essentials',
    '✈️',
    1
  ),
  (
    '🚕 Taxi / Uber chat',
    'Communicate with drivers and get to your destination safely',
    '🚕',
    2
  ),
  (
    '☕ Cafes & restaurants',
    'Order food and drinks like a local',
    '☕',
    3
  ),
  (
    '🛍️ Shops & paying',
    'Shop confidently and handle transactions',
    '🛍️',
    4
  ),
  (
    '🙏 Polite survival talk',
    'Essential phrases for respectful communication',
    '🙏',
    5
  );
