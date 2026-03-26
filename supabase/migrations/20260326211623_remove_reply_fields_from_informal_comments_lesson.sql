/*
  # Remove reply fields from "Informal Comments You'll Hear in Chile" lesson

  ## Summary
  Removes the `reply` field from all phrases in the intro page of the
  "Informal Comments You'll Hear in Chile" lesson (id: f3d352c1-aa17-46d0-8ae9-d75548e4a8f4).

  ## Changes
  - For each phrase object in `content -> pages -> 1 -> phrases`, the `reply` key is removed
  - No data is deleted; only the `reply` field within each phrase JSON object is stripped out
*/

UPDATE lessons
SET content = jsonb_set(
  content,
  '{pages,1,phrases}',
  (
    SELECT jsonb_agg(phrase - 'reply')
    FROM jsonb_array_elements(content -> 'pages' -> 1 -> 'phrases') AS phrase
  )
)
WHERE id = 'f3d352c1-aa17-46d0-8ae9-d75548e4a8f4';
