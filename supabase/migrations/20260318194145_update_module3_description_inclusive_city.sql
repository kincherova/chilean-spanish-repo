/*
  # Update Module 3 description to be more inclusive

  Changes the description of the "Moving around the city" module to remove the
  Santiago-specific reference, making it relevant for travelers across all of Chile.
*/

UPDATE modules
SET description = 'Navigate any Chilean city confidently — ask for directions, chat with drivers, and handle any bumps along the way.'
WHERE id = '3c11f6e8-aefb-42f1-8549-0bf8c3f12fe5';
