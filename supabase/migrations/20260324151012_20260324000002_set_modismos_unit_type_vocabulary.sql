/*
  # Set unit_type = 'vocabulary' for all Modismos chilenos units

  The units created for Module 6 defaulted to 'standard'.
  This migration updates them to 'vocabulary' so the app renders them correctly.
*/

UPDATE units
SET unit_type = 'vocabulary'
WHERE module_id = (SELECT id FROM modules WHERE title = '🇨🇱 Modismos chilenos');
