/*
  # Module 4: Flashcards for 5 Vocabulary Units

  Adds flashcards for each of the 5 vocabulary units in the
  "☕ Cafes & restaurants" module.

  ## Unit IDs
  - Unit 5 (Restaurant Vocabulary):   50db43f2-e964-430b-9ff3-a3c244862448
  - Unit 6 (Café Vocabulary):         8c93756e-aeb5-4049-9b31-2388d7b76122
  - Unit 7 (Food & Drinks):           199a1d88-098f-4af1-a3e7-39ce0acd778c
  - Unit 8 (Tea Time / Once):         a47abe4c-c3c1-4fc8-8201-cac0453a2da3
  - Unit 9 (Words Related to Money):  3bbc1b35-f819-4077-b2a0-ae4b798c978b
*/

-- Unit 5: Restaurant Vocabulary
INSERT INTO flashcards (id, unit_id, spanish_text, english_text, order_index) VALUES
  (gen_random_uuid(), '50db43f2-e964-430b-9ff3-a3c244862448', 'Mesa', 'Table', 1),
  (gen_random_uuid(), '50db43f2-e964-430b-9ff3-a3c244862448', 'Silla', 'Chair', 2),
  (gen_random_uuid(), '50db43f2-e964-430b-9ff3-a3c244862448', 'Barra', 'Bar / Counter', 3),
  (gen_random_uuid(), '50db43f2-e964-430b-9ff3-a3c244862448', 'Ventana', 'Window', 4),
  (gen_random_uuid(), '50db43f2-e964-430b-9ff3-a3c244862448', 'Terraza', 'Terrace / Outdoor seating', 5),
  (gen_random_uuid(), '50db43f2-e964-430b-9ff3-a3c244862448', 'Adentro', 'Inside', 6),
  (gen_random_uuid(), '50db43f2-e964-430b-9ff3-a3c244862448', 'Afuera', 'Outside', 7),
  (gen_random_uuid(), '50db43f2-e964-430b-9ff3-a3c244862448', 'Baño', 'Bathroom', 8),
  (gen_random_uuid(), '50db43f2-e964-430b-9ff3-a3c244862448', 'Tenedor', 'Fork', 9),
  (gen_random_uuid(), '50db43f2-e964-430b-9ff3-a3c244862448', 'Cuchillo', 'Knife', 10),
  (gen_random_uuid(), '50db43f2-e964-430b-9ff3-a3c244862448', 'Cuchara', 'Spoon', 11),
  (gen_random_uuid(), '50db43f2-e964-430b-9ff3-a3c244862448', 'Vaso', 'Glass', 12),
  (gen_random_uuid(), '50db43f2-e964-430b-9ff3-a3c244862448', 'Plato', 'Plate / Dish', 13);

-- Unit 6: Café Vocabulary
INSERT INTO flashcards (id, unit_id, spanish_text, english_text, order_index) VALUES
  (gen_random_uuid(), '8c93756e-aeb5-4049-9b31-2388d7b76122', 'Cortado', 'Cortado (espresso with a little milk)', 1),
  (gen_random_uuid(), '8c93756e-aeb5-4049-9b31-2388d7b76122', 'Café grande', 'Large coffee', 2),
  (gen_random_uuid(), '8c93756e-aeb5-4049-9b31-2388d7b76122', 'Café chico', 'Small coffee', 3),
  (gen_random_uuid(), '8c93756e-aeb5-4049-9b31-2388d7b76122', 'Con azúcar', 'With sugar', 4),
  (gen_random_uuid(), '8c93756e-aeb5-4049-9b31-2388d7b76122', 'Sin azúcar', 'Without sugar', 5),
  (gen_random_uuid(), '8c93756e-aeb5-4049-9b31-2388d7b76122', 'Con leche', 'With milk', 6),
  (gen_random_uuid(), '8c93756e-aeb5-4049-9b31-2388d7b76122', 'Sin leche', 'Without milk', 7),
  (gen_random_uuid(), '8c93756e-aeb5-4049-9b31-2388d7b76122', 'Agua con gas', 'Sparkling water', 8),
  (gen_random_uuid(), '8c93756e-aeb5-4049-9b31-2388d7b76122', 'Agua sin gas', 'Still water', 9);

-- Unit 7: Food & Drinks
INSERT INTO flashcards (id, unit_id, spanish_text, english_text, order_index) VALUES
  (gen_random_uuid(), '199a1d88-098f-4af1-a3e7-39ce0acd778c', 'Desayuno', 'Breakfast', 1),
  (gen_random_uuid(), '199a1d88-098f-4af1-a3e7-39ce0acd778c', 'Almuerzo', 'Lunch', 2),
  (gen_random_uuid(), '199a1d88-098f-4af1-a3e7-39ce0acd778c', 'Cena', 'Dinner', 3),
  (gen_random_uuid(), '199a1d88-098f-4af1-a3e7-39ce0acd778c', 'Pan', 'Bread', 4),
  (gen_random_uuid(), '199a1d88-098f-4af1-a3e7-39ce0acd778c', 'Carne', 'Meat', 5),
  (gen_random_uuid(), '199a1d88-098f-4af1-a3e7-39ce0acd778c', 'Pescado', 'Fish', 6),
  (gen_random_uuid(), '199a1d88-098f-4af1-a3e7-39ce0acd778c', 'Pollo', 'Chicken', 7),
  (gen_random_uuid(), '199a1d88-098f-4af1-a3e7-39ce0acd778c', 'Queso', 'Cheese', 8),
  (gen_random_uuid(), '199a1d88-098f-4af1-a3e7-39ce0acd778c', 'Arroz', 'Rice', 9),
  (gen_random_uuid(), '199a1d88-098f-4af1-a3e7-39ce0acd778c', 'Pasta', 'Pasta', 10),
  (gen_random_uuid(), '199a1d88-098f-4af1-a3e7-39ce0acd778c', 'Papas', 'Potatoes / Fries', 11),
  (gen_random_uuid(), '199a1d88-098f-4af1-a3e7-39ce0acd778c', 'Picante', 'Spicy', 12),
  (gen_random_uuid(), '199a1d88-098f-4af1-a3e7-39ce0acd778c', 'Salado', 'Salty', 13),
  (gen_random_uuid(), '199a1d88-098f-4af1-a3e7-39ce0acd778c', 'Dulce', 'Sweet', 14),
  (gen_random_uuid(), '199a1d88-098f-4af1-a3e7-39ce0acd778c', 'Acompañamiento', 'Side dish', 15),
  (gen_random_uuid(), '199a1d88-098f-4af1-a3e7-39ce0acd778c', 'Postre', 'Dessert', 16),
  (gen_random_uuid(), '199a1d88-098f-4af1-a3e7-39ce0acd778c', 'Jugo', 'Juice', 17),
  (gen_random_uuid(), '199a1d88-098f-4af1-a3e7-39ce0acd778c', 'Cerveza', 'Beer', 18),
  (gen_random_uuid(), '199a1d88-098f-4af1-a3e7-39ce0acd778c', 'Vino', 'Wine', 19),
  (gen_random_uuid(), '199a1d88-098f-4af1-a3e7-39ce0acd778c', 'Bebida', 'Soda / Soft drink', 20);

-- Unit 8: Tea Time (Once)
INSERT INTO flashcards (id, unit_id, spanish_text, english_text, order_index) VALUES
  (gen_random_uuid(), 'a47abe4c-c3c1-4fc8-8201-cac0453a2da3', 'Once', 'Light evening meal / tea time', 1),
  (gen_random_uuid(), 'a47abe4c-c3c1-4fc8-8201-cac0453a2da3', 'Tostadas', 'Toast', 2),
  (gen_random_uuid(), 'a47abe4c-c3c1-4fc8-8201-cac0453a2da3', 'Palta', 'Avocado', 3),
  (gen_random_uuid(), 'a47abe4c-c3c1-4fc8-8201-cac0453a2da3', 'Queso', 'Cheese', 4),
  (gen_random_uuid(), 'a47abe4c-c3c1-4fc8-8201-cac0453a2da3', 'Jamón', 'Ham', 5),
  (gen_random_uuid(), 'a47abe4c-c3c1-4fc8-8201-cac0453a2da3', 'Huevo', 'Egg', 6),
  (gen_random_uuid(), 'a47abe4c-c3c1-4fc8-8201-cac0453a2da3', 'Pastel', 'Cake / Pastry', 7),
  (gen_random_uuid(), 'a47abe4c-c3c1-4fc8-8201-cac0453a2da3', 'Torta', 'Cake (layered)', 8),
  (gen_random_uuid(), 'a47abe4c-c3c1-4fc8-8201-cac0453a2da3', 'Queque', 'Cake / Pound cake', 9),
  (gen_random_uuid(), 'a47abe4c-c3c1-4fc8-8201-cac0453a2da3', 'Sándwich', 'Sandwich', 10),
  (gen_random_uuid(), 'a47abe4c-c3c1-4fc8-8201-cac0453a2da3', 'Empanada', 'Empanada (stuffed pastry)', 11);

-- Unit 9: Words Related to Money
INSERT INTO flashcards (id, unit_id, spanish_text, english_text, order_index) VALUES
  (gen_random_uuid(), '3bbc1b35-f819-4077-b2a0-ae4b798c978b', 'La cuenta', 'The bill / The check', 1),
  (gen_random_uuid(), '3bbc1b35-f819-4077-b2a0-ae4b798c978b', 'La boleta', 'The receipt', 2),
  (gen_random_uuid(), '3bbc1b35-f819-4077-b2a0-ae4b798c978b', 'Propina', 'Tip / Gratuity', 3),
  (gen_random_uuid(), '3bbc1b35-f819-4077-b2a0-ae4b798c978b', 'Tarjeta', 'Card', 4),
  (gen_random_uuid(), '3bbc1b35-f819-4077-b2a0-ae4b798c978b', 'Débito', 'Debit', 5),
  (gen_random_uuid(), '3bbc1b35-f819-4077-b2a0-ae4b798c978b', 'Crédito', 'Credit', 6),
  (gen_random_uuid(), '3bbc1b35-f819-4077-b2a0-ae4b798c978b', 'Cuotas', 'Installments', 7),
  (gen_random_uuid(), '3bbc1b35-f819-4077-b2a0-ae4b798c978b', 'Efectivo', 'Cash', 8),
  (gen_random_uuid(), '3bbc1b35-f819-4077-b2a0-ae4b798c978b', 'La plata', 'Money (Chilean slang)', 9),
  (gen_random_uuid(), '3bbc1b35-f819-4077-b2a0-ae4b798c978b', 'El cambio', 'The change (money back)', 10);
