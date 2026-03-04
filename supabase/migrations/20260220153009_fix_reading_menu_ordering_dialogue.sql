/*
  # Fix dialogue in "Reading the Menu & Ordering" lesson

  ## Changes
  - Replaces the dialogue on the "Read a Real Conversation" page with a corrected version
  - Fixes speaker/role assignments (tourist asks for menu, waiter responds)
  - Uses named speakers: George (Tourist) and Pedro (Waiter)
  - Also updates the recap page dialogue to match

  ## Lesson
  - id: d202400c-8040-4ad8-986c-784d3b98b31a
  - title: Reading the Menu & Ordering
*/

UPDATE lessons
SET content = jsonb_set(
  jsonb_set(
    content,
    '{pages,4,dialogue}',
    '[
      {"name": "George (Tourist)", "spanish": "Hola, ¿la carta, por favor?", "speaker": "tourist"},
      {"name": "Pedro (Waiter)", "spanish": "Claro, aquí tiene.", "speaker": "waiter"},
      {"name": "George (Tourist)", "spanish": "¿Tienen menú hoy?", "speaker": "tourist"},
      {"name": "Pedro (Waiter)", "spanish": "No, lo siento. ¿Qué quiere para tomar?", "speaker": "waiter"},
      {"name": "George (Tourist)", "spanish": "Agua sin gas, por favor. ¿Qué me recomienda?", "speaker": "tourist"},
      {"name": "Pedro (Waiter)", "spanish": "El lomo está muy rico hoy.", "speaker": "waiter"},
      {"name": "George (Tourist)", "spanish": "Quiero el lomo. ¡Sin picante, por favor! Soy alérgico.", "speaker": "tourist"},
      {"name": "Pedro (Waiter)", "spanish": "Excelente. ¿Algo más?", "speaker": "waiter"},
      {"name": "George (Tourist)", "spanish": "Eso no más, gracias.", "speaker": "tourist"},
      {"name": "Pedro (Waiter)", "spanish": "Perfecto. Se lo traigo altiro.", "speaker": "waiter"}
    ]'::jsonb
  ),
  '{pages,5,dialogue}',
  '[
    {"name": "George (Tourist)", "spanish": "Hola, ¿la carta, por favor?", "speaker": "tourist"},
    {"name": "Pedro (Waiter)", "spanish": "Claro, aquí tiene.", "speaker": "waiter"},
    {"name": "George (Tourist)", "spanish": "¿Tienen menú hoy?", "speaker": "tourist"},
    {"name": "Pedro (Waiter)", "spanish": "No, lo siento. ¿Qué quiere para tomar?", "speaker": "waiter"},
    {"name": "George (Tourist)", "spanish": "Agua sin gas, por favor. ¿Qué me recomienda?", "speaker": "tourist"},
    {"name": "Pedro (Waiter)", "spanish": "El lomo está muy rico hoy.", "speaker": "waiter"},
    {"name": "George (Tourist)", "spanish": "Quiero el lomo. ¡Sin picante, por favor! Soy alérgico.", "speaker": "tourist"},
    {"name": "Pedro (Waiter)", "spanish": "Excelente. ¿Algo más?", "speaker": "waiter"},
    {"name": "George (Tourist)", "spanish": "Eso no más, gracias.", "speaker": "tourist"},
    {"name": "Pedro (Waiter)", "spanish": "Perfecto. Se lo traigo altiro.", "speaker": "waiter"}
  ]'::jsonb
)
WHERE id = 'd202400c-8040-4ad8-986c-784d3b98b31a';
