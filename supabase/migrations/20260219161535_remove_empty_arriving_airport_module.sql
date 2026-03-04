
/*
  # Remove empty duplicate airport module

  The old "Arriving at the Airport" module (order_index 3) had no units and
  has been superseded by the new "At the Airport" module (order_index 2).
  This migration removes it and shifts remaining modules down by 1.
*/

DELETE FROM modules WHERE id = 'f4d36e27-cdf4-4741-9e2f-475117bfdcbd';

UPDATE modules SET order_index = order_index - 1 WHERE order_index > 3;
