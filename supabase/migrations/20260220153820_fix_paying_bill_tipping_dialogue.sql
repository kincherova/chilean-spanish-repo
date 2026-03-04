/*
  # Fix dialogue in "Paying the Bill & Tipping" lesson

  ## Changes
  - Replaces the dialogue on the "Read a Real Conversation" page (index 4)
  - Replaces the recap page dialogue (index 5) to match
  - Uses named speakers: Jane (Tourist) and Marco (Waiter)
  - Fixes speaker role assignments throughout
  - New dialogue includes cuotas exchange and closing farewell

  ## Lesson
  - id: 59bde145-4031-4f76-9de4-b0bd4a0fdd12
  - title: Paying the Bill & Tipping
*/

UPDATE lessons
SET content = jsonb_set(
  jsonb_set(
    content,
    '{pages,4,dialogue}',
    '[
      {"name": "Jane (Tourist)", "spanish": "¿La cuenta, por favor?", "speaker": "tourist"},
      {"name": "Marco (Waiter)", "spanish": "Claro. ¿Todo junto o separado?", "speaker": "waiter"},
      {"name": "Jane (Tourist)", "spanish": "Todo junto.", "speaker": "tourist"},
      {"name": "Marco (Waiter)", "spanish": "Son doce mil pesos. ¿Paga con tarjeta?", "speaker": "waiter"},
      {"name": "Jane (Tourist)", "spanish": "Sí, por favor.", "speaker": "tourist"},
      {"name": "Marco (Waiter)", "spanish": "¿Débito o crédito?", "speaker": "waiter"},
      {"name": "Jane (Tourist)", "spanish": "Crédito, por favor.", "speaker": "tourist"},
      {"name": "Marco (Waiter)", "spanish": "¿Desea agregar la propina?", "speaker": "waiter"},
      {"name": "Jane (Tourist)", "spanish": "Sí, claro, diez por ciento.", "speaker": "tourist"},
      {"name": "Marco (Waiter)", "spanish": "Muchas gracias. ¿Cuotas?", "speaker": "waiter"},
      {"name": "Jane (Tourist)", "spanish": "No, sin cuotas.", "speaker": "tourist"},
      {"name": "Marco (Waiter)", "spanish": "Perfecto.", "speaker": "waiter"},
      {"name": "Jane (Tourist)", "spanish": "Chao, gracias.", "speaker": "tourist"}
    ]'::jsonb
  ),
  '{pages,5,dialogue}',
  '[
    {"name": "Jane (Tourist)", "spanish": "¿La cuenta, por favor?", "speaker": "tourist"},
    {"name": "Marco (Waiter)", "spanish": "Claro. ¿Todo junto o separado?", "speaker": "waiter"},
    {"name": "Jane (Tourist)", "spanish": "Todo junto.", "speaker": "tourist"},
    {"name": "Marco (Waiter)", "spanish": "Son doce mil pesos. ¿Paga con tarjeta?", "speaker": "waiter"},
    {"name": "Jane (Tourist)", "spanish": "Sí, por favor.", "speaker": "tourist"},
    {"name": "Marco (Waiter)", "spanish": "¿Débito o crédito?", "speaker": "waiter"},
    {"name": "Jane (Tourist)", "spanish": "Crédito, por favor.", "speaker": "tourist"},
    {"name": "Marco (Waiter)", "spanish": "¿Desea agregar la propina?", "speaker": "waiter"},
    {"name": "Jane (Tourist)", "spanish": "Sí, claro, diez por ciento.", "speaker": "tourist"},
    {"name": "Marco (Waiter)", "spanish": "Muchas gracias. ¿Cuotas?", "speaker": "waiter"},
    {"name": "Jane (Tourist)", "spanish": "No, sin cuotas.", "speaker": "tourist"},
    {"name": "Marco (Waiter)", "spanish": "Perfecto.", "speaker": "waiter"},
    {"name": "Jane (Tourist)", "spanish": "Chao, gracias.", "speaker": "tourist"}
  ]'::jsonb
)
WHERE id = '59bde145-4031-4f76-9de4-b0bd4a0fdd12';
