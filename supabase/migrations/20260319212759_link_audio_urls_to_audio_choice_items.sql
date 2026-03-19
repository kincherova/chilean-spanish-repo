
/*
  # Link audio URLs to audio_choice exercise items

  ## Summary
  13 lessons across modules 3, 4, and 5 had audio_choice pages with items
  missing audioUrl values. The audio files already existed in storage but
  were never linked. This migration adds the correct audioUrl to each item
  by matching the correct-answer phrase to the corresponding stored audio file.

  ## Affected lessons
  - Module 3: Useful vocabulary, Understanding Directions, Small talk in a taxi, Solving problems in a taxi
  - Module 4: Arriving & Getting a Table, Reading the Menu & Ordering, Asking Questions & Clarifying, Paying the Bill & Tipping
  - Module 5: Making Enquiries When Shopping, Conversations at the Counter, Shopping for Food, Shopping for Clothes, Shopping at a Street Market
*/

-- Helper: update audio_choice items in a lesson by sequential item index
-- We update the entire pages array, setting audioUrl on each audio_choice item

-- ============================================================
-- c01a8596 - Useful vocabulary (M3U2) - 8 items
-- ============================================================
UPDATE lessons SET content = jsonb_set(
  content,
  '{pages}',
  (
    SELECT jsonb_agg(
      CASE
        WHEN page->>'type' = 'audio_choice'
        THEN jsonb_set(page, '{items}', (
          SELECT jsonb_agg(
            CASE item_idx
              WHEN 0 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/c01a8596-938f-48a7-b4cd-022c19e9ddcc_6_1772547860949.mp3"}'
              WHEN 1 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/c01a8596-938f-48a7-b4cd-022c19e9ddcc_10_1772547881540.mp3"}'
              WHEN 2 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/c01a8596-938f-48a7-b4cd-022c19e9ddcc_14_1772547902658.mp3"}'
              WHEN 3 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/c01a8596-938f-48a7-b4cd-022c19e9ddcc_3_1772547841489.mp3"}'
              WHEN 4 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/c01a8596-938f-48a7-b4cd-022c19e9ddcc_12_1772547891419.mp3"}'
              WHEN 5 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/c01a8596-938f-48a7-b4cd-022c19e9ddcc_5_1772547855779.mp3"}'
              WHEN 6 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/c01a8596-938f-48a7-b4cd-022c19e9ddcc_11_1772547885976.mp3"}'
              WHEN 7 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/c01a8596-938f-48a7-b4cd-022c19e9ddcc_13_1772547897853.mp3"}'
              ELSE item
            END
          )
          FROM jsonb_array_elements(page->'items') WITH ORDINALITY AS t(item, item_ord),
          LATERAL (SELECT (item_ord - 1)::int AS item_idx) idx
        ))
        ELSE page
      END
    )
    FROM jsonb_array_elements(content->'pages') AS page
  )
)
WHERE id = 'c01a8596-938f-48a7-b4cd-022c19e9ddcc';

-- ============================================================
-- d15a8429 - Understanding Directions on the Street (M3U3) - 7 items
-- ============================================================
UPDATE lessons SET content = jsonb_set(
  content,
  '{pages}',
  (
    SELECT jsonb_agg(
      CASE
        WHEN page->>'type' = 'audio_choice'
        THEN jsonb_set(page, '{items}', (
          SELECT jsonb_agg(
            CASE item_idx
              WHEN 0 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/d15a8429-9736-4224-acb2-3cbe4f590178_4_1772548106003.mp3"}'
              WHEN 1 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/d15a8429-9736-4224-acb2-3cbe4f590178_0_1772548086130.mp3"}'
              WHEN 2 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/d15a8429-9736-4224-acb2-3cbe4f590178_7_1772548120013.mp3"}'
              WHEN 3 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/d15a8429-9736-4224-acb2-3cbe4f590178_1_1772548091726.mp3"}'
              WHEN 4 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/d15a8429-9736-4224-acb2-3cbe4f590178_6_1772548114975.mp3"}'
              WHEN 5 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/d15a8429-9736-4224-acb2-3cbe4f590178_5_1772548110541.mp3"}'
              WHEN 6 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/d15a8429-9736-4224-acb2-3cbe4f590178_8_1772548125034.mp3"}'
              ELSE item
            END
          )
          FROM jsonb_array_elements(page->'items') WITH ORDINALITY AS t(item, item_ord),
          LATERAL (SELECT (item_ord - 1)::int AS item_idx) idx
        ))
        ELSE page
      END
    )
    FROM jsonb_array_elements(content->'pages') AS page
  )
)
WHERE id = 'd15a8429-9736-4224-acb2-3cbe4f590178';

-- ============================================================
-- 436b0dcc - Small talk in a taxi (M3U4) - 8 items
-- ============================================================
UPDATE lessons SET content = jsonb_set(
  content,
  '{pages}',
  (
    SELECT jsonb_agg(
      CASE
        WHEN page->>'type' = 'audio_choice'
        THEN jsonb_set(page, '{items}', (
          SELECT jsonb_agg(
            CASE item_idx
              WHEN 0 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/436b0dcc-fcf1-43b8-aacf-a5ec291eba23_1_1772548150187.mp3"}'
              WHEN 1 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/436b0dcc-fcf1-43b8-aacf-a5ec291eba23_11_1772548199994.mp3"}'
              WHEN 2 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/436b0dcc-fcf1-43b8-aacf-a5ec291eba23_7_1772548178660.mp3"}'
              WHEN 3 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/436b0dcc-fcf1-43b8-aacf-a5ec291eba23_4_1772548164200.mp3"}'
              WHEN 4 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/436b0dcc-fcf1-43b8-aacf-a5ec291eba23_12_1772548205201.mp3"}'
              WHEN 5 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/436b0dcc-fcf1-43b8-aacf-a5ec291eba23_3_1772548159279.mp3"}'
              WHEN 6 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/436b0dcc-fcf1-43b8-aacf-a5ec291eba23_9_1772548188861.mp3"}'
              WHEN 7 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/436b0dcc-fcf1-43b8-aacf-a5ec291eba23_14_1772548389247.mp3"}'
              ELSE item
            END
          )
          FROM jsonb_array_elements(page->'items') WITH ORDINALITY AS t(item, item_ord),
          LATERAL (SELECT (item_ord - 1)::int AS item_idx) idx
        ))
        ELSE page
      END
    )
    FROM jsonb_array_elements(content->'pages') AS page
  )
)
WHERE id = '436b0dcc-fcf1-43b8-aacf-a5ec291eba23';

-- ============================================================
-- 872cd827 - Solving problems in a taxi (M3U5) - 8 items
-- ============================================================
UPDATE lessons SET content = jsonb_set(
  content,
  '{pages}',
  (
    SELECT jsonb_agg(
      CASE
        WHEN page->>'type' = 'audio_choice'
        THEN jsonb_set(page, '{items}', (
          SELECT jsonb_agg(
            CASE item_idx
              WHEN 0 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/872cd827-8736-4cce-943b-d7696029e394_0_1772548416864.mp3"}'
              WHEN 1 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/872cd827-8736-4cce-943b-d7696029e394_1_1772548422266.mp3"}'
              WHEN 2 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/872cd827-8736-4cce-943b-d7696029e394_2_1772548426281.mp3"}'
              WHEN 3 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/872cd827-8736-4cce-943b-d7696029e394_6_1772548447413.mp3"}'
              WHEN 4 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/872cd827-8736-4cce-943b-d7696029e394_4_1772548437482.mp3"}'
              WHEN 5 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/872cd827-8736-4cce-943b-d7696029e394_8_1772548458117.mp3"}'
              WHEN 6 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/872cd827-8736-4cce-943b-d7696029e394_5_1772548441478.mp3"}'
              WHEN 7 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/872cd827-8736-4cce-943b-d7696029e394_9_1772548465412.mp3"}'
              ELSE item
            END
          )
          FROM jsonb_array_elements(page->'items') WITH ORDINALITY AS t(item, item_ord),
          LATERAL (SELECT (item_ord - 1)::int AS item_idx) idx
        ))
        ELSE page
      END
    )
    FROM jsonb_array_elements(content->'pages') AS page
  )
)
WHERE id = '872cd827-8736-4cce-943b-d7696029e394';

-- ============================================================
-- 99a90297 - Arriving & Getting a Table (M4U6) - 9 items
-- ============================================================
UPDATE lessons SET content = jsonb_set(
  content,
  '{pages}',
  (
    SELECT jsonb_agg(
      CASE
        WHEN page->>'type' = 'audio_choice'
        THEN jsonb_set(page, '{items}', (
          SELECT jsonb_agg(
            CASE item_idx
              WHEN 0 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/99a90297-c089-4573-9aba-aadc2b6db587_0_1772548492891.mp3"}'
              WHEN 1 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/99a90297-c089-4573-9aba-aadc2b6db587_8_1772548533801.mp3"}'
              WHEN 2 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/99a90297-c089-4573-9aba-aadc2b6db587_1_1772548497101.mp3"}'
              WHEN 3 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/99a90297-c089-4573-9aba-aadc2b6db587_3_1772548509667.mp3"}'
              WHEN 4 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/99a90297-c089-4573-9aba-aadc2b6db587_12_1772548556750.mp3"}'
              WHEN 5 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/99a90297-c089-4573-9aba-aadc2b6db587_6_1772548524484.mp3"}'
              WHEN 6 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/99a90297-c089-4573-9aba-aadc2b6db587_9_1772548538982.mp3"}'
              WHEN 7 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/99a90297-c089-4573-9aba-aadc2b6db587_7_1772548529766.mp3"}'
              WHEN 8 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/99a90297-c089-4573-9aba-aadc2b6db587_12_1772548556750.mp3"}'
              ELSE item
            END
          )
          FROM jsonb_array_elements(page->'items') WITH ORDINALITY AS t(item, item_ord),
          LATERAL (SELECT (item_ord - 1)::int AS item_idx) idx
        ))
        ELSE page
      END
    )
    FROM jsonb_array_elements(content->'pages') AS page
  )
)
WHERE id = '99a90297-c089-4573-9aba-aadc2b6db587';

-- ============================================================
-- d202400c - Reading the Menu & Ordering (M4U7) - 9 items
-- ============================================================
UPDATE lessons SET content = jsonb_set(
  content,
  '{pages}',
  (
    SELECT jsonb_agg(
      CASE
        WHEN page->>'type' = 'audio_choice'
        THEN jsonb_set(page, '{items}', (
          SELECT jsonb_agg(
            CASE item_idx
              WHEN 0 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/d202400c-8040-4ad8-986c-784d3b98b31a_0_1772549887007.mp3"}'
              WHEN 1 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/d202400c-8040-4ad8-986c-784d3b98b31a_12_1772549946097.mp3"}'
              WHEN 2 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/d202400c-8040-4ad8-986c-784d3b98b31a_3_1772549902774.mp3"}'
              WHEN 3 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/d202400c-8040-4ad8-986c-784d3b98b31a_7_1772549922130.mp3"}'
              WHEN 4 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/d202400c-8040-4ad8-986c-784d3b98b31a_16_1772549963076.mp3"}'
              WHEN 5 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/d202400c-8040-4ad8-986c-784d3b98b31a_11_1772549941480.mp3"}'
              WHEN 6 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/d202400c-8040-4ad8-986c-784d3b98b31a_1_1772549892826.mp3"}'
              WHEN 7 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/d202400c-8040-4ad8-986c-784d3b98b31a_5_1772549912435.mp3"}'
              WHEN 8 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/d202400c-8040-4ad8-986c-784d3b98b31a_14_1772549954927.mp3"}'
              ELSE item
            END
          )
          FROM jsonb_array_elements(page->'items') WITH ORDINALITY AS t(item, item_ord),
          LATERAL (SELECT (item_ord - 1)::int AS item_idx) idx
        ))
        ELSE page
      END
    )
    FROM jsonb_array_elements(content->'pages') AS page
  )
)
WHERE id = 'd202400c-8040-4ad8-986c-784d3b98b31a';

-- ============================================================
-- b14e0cec - Asking Questions & Clarifying (M4U8) - 8 items
-- ============================================================
UPDATE lessons SET content = jsonb_set(
  content,
  '{pages}',
  (
    SELECT jsonb_agg(
      CASE
        WHEN page->>'type' = 'audio_choice'
        THEN jsonb_set(page, '{items}', (
          SELECT jsonb_agg(
            CASE item_idx
              WHEN 0 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/b14e0cec-5fee-4e24-b464-f5625df88490_0_1772551070898.mp3"}'
              WHEN 1 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/b14e0cec-5fee-4e24-b464-f5625df88490_5_1772551094927.mp3"}'
              WHEN 2 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/b14e0cec-5fee-4e24-b464-f5625df88490_2_1772551079517.mp3"}'
              WHEN 3 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/b14e0cec-5fee-4e24-b464-f5625df88490_6_1772551100110.mp3"}'
              WHEN 4 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/b14e0cec-5fee-4e24-b464-f5625df88490_3_1772551084763.mp3"}'
              WHEN 5 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/b14e0cec-5fee-4e24-b464-f5625df88490_8_1772551110195.mp3"}'
              WHEN 6 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/b14e0cec-5fee-4e24-b464-f5625df88490_4_1772551089195.mp3"}'
              WHEN 7 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/b14e0cec-5fee-4e24-b464-f5625df88490_1_1772551076056.mp3"}'
              ELSE item
            END
          )
          FROM jsonb_array_elements(page->'items') WITH ORDINALITY AS t(item, item_ord),
          LATERAL (SELECT (item_ord - 1)::int AS item_idx) idx
        ))
        ELSE page
      END
    )
    FROM jsonb_array_elements(content->'pages') AS page
  )
)
WHERE id = 'b14e0cec-5fee-4e24-b464-f5625df88490';

-- ============================================================
-- 59bde145 - Paying the Bill & Tipping (M4U9) - 9 items
-- ============================================================
UPDATE lessons SET content = jsonb_set(
  content,
  '{pages}',
  (
    SELECT jsonb_agg(
      CASE
        WHEN page->>'type' = 'audio_choice'
        THEN jsonb_set(page, '{items}', (
          SELECT jsonb_agg(
            CASE item_idx
              WHEN 0 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/59bde145-4031-4f76-9de4-b0bd4a0fdd12_0_1772551499905.mp3"}'
              WHEN 1 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/59bde145-4031-4f76-9de4-b0bd4a0fdd12_7_1772551535971.mp3"}'
              WHEN 2 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/59bde145-4031-4f76-9de4-b0bd4a0fdd12_9_1772551547141.mp3"}'
              WHEN 3 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/59bde145-4031-4f76-9de4-b0bd4a0fdd12_6_1772551531282.mp3"}'
              WHEN 4 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/59bde145-4031-4f76-9de4-b0bd4a0fdd12_5_1772551526168.mp3"}'
              WHEN 5 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/59bde145-4031-4f76-9de4-b0bd4a0fdd12_2_1772551510966.mp3"}'
              WHEN 6 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/59bde145-4031-4f76-9de4-b0bd4a0fdd12_4_1772551521486.mp3"}'
              WHEN 7 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/59bde145-4031-4f76-9de4-b0bd4a0fdd12_8_1772551540935.mp3"}'
              WHEN 8 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/59bde145-4031-4f76-9de4-b0bd4a0fdd12_3_1772551516452.mp3"}'
              ELSE item
            END
          )
          FROM jsonb_array_elements(page->'items') WITH ORDINALITY AS t(item, item_ord),
          LATERAL (SELECT (item_ord - 1)::int AS item_idx) idx
        ))
        ELSE page
      END
    )
    FROM jsonb_array_elements(content->'pages') AS page
  )
)
WHERE id = '59bde145-4031-4f76-9de4-b0bd4a0fdd12';

-- ============================================================
-- b81ae613 - Making Enquiries When Shopping (M5U1) - 8 items
-- ============================================================
UPDATE lessons SET content = jsonb_set(
  content,
  '{pages}',
  (
    SELECT jsonb_agg(
      CASE
        WHEN page->>'type' = 'audio_choice'
        THEN jsonb_set(page, '{items}', (
          SELECT jsonb_agg(
            CASE item_idx
              WHEN 0 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/b81ae613-577a-4bc8-b6a8-b87d8b97021a_0_1772548580844.mp3"}'
              WHEN 1 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/b81ae613-577a-4bc8-b6a8-b87d8b97021a_10_1772548635327.mp3"}'
              WHEN 2 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/b81ae613-577a-4bc8-b6a8-b87d8b97021a_4_1772548601450.mp3"}'
              WHEN 3 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/b81ae613-577a-4bc8-b6a8-b87d8b97021a_9_1772548629670.mp3"}'
              WHEN 4 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/b81ae613-577a-4bc8-b6a8-b87d8b97021a_12_1772548648816.mp3"}'
              WHEN 5 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/b81ae613-577a-4bc8-b6a8-b87d8b97021a_7_1772548618833.mp3"}'
              WHEN 6 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/b81ae613-577a-4bc8-b6a8-b87d8b97021a_1_1772548587134.mp3"}'
              WHEN 7 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/b81ae613-577a-4bc8-b6a8-b87d8b97021a_8_1772548625196.mp3"}'
              ELSE item
            END
          )
          FROM jsonb_array_elements(page->'items') WITH ORDINALITY AS t(item, item_ord),
          LATERAL (SELECT (item_ord - 1)::int AS item_idx) idx
        ))
        ELSE page
      END
    )
    FROM jsonb_array_elements(content->'pages') AS page
  )
)
WHERE id = 'b81ae613-577a-4bc8-b6a8-b87d8b97021a';

-- ============================================================
-- cd1fab9f - Conversations at the Counter (M5U2) - 6 items
-- ============================================================
UPDATE lessons SET content = jsonb_set(
  content,
  '{pages}',
  (
    SELECT jsonb_agg(
      CASE
        WHEN page->>'type' = 'audio_choice'
        THEN jsonb_set(page, '{items}', (
          SELECT jsonb_agg(
            CASE item_idx
              WHEN 0 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/cd1fab9f-86fd-4f16-abcf-d9700d0f1afb_0_1772548673750.mp3"}'
              WHEN 1 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/cd1fab9f-86fd-4f16-abcf-d9700d0f1afb_3_1772548691551.mp3"}'
              WHEN 2 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/cd1fab9f-86fd-4f16-abcf-d9700d0f1afb_10_1772548731382.mp3"}'
              WHEN 3 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/cd1fab9f-86fd-4f16-abcf-d9700d0f1afb_14_1772548756752.mp3"}'
              WHEN 4 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/cd1fab9f-86fd-4f16-abcf-d9700d0f1afb_2_1772548683958.mp3"}'
              WHEN 5 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/cd1fab9f-86fd-4f16-abcf-d9700d0f1afb_13_1772548750988.mp3"}'
              ELSE item
            END
          )
          FROM jsonb_array_elements(page->'items') WITH ORDINALITY AS t(item, item_ord),
          LATERAL (SELECT (item_ord - 1)::int AS item_idx) idx
        ))
        ELSE page
      END
    )
    FROM jsonb_array_elements(content->'pages') AS page
  )
)
WHERE id = 'cd1fab9f-86fd-4f16-abcf-d9700d0f1afb';

-- ============================================================
-- 592a478a - Shopping for Food (M5U3) - 8 items
-- ============================================================
UPDATE lessons SET content = jsonb_set(
  content,
  '{pages}',
  (
    SELECT jsonb_agg(
      CASE
        WHEN page->>'type' = 'audio_choice'
        THEN jsonb_set(page, '{items}', (
          SELECT jsonb_agg(
            CASE item_idx
              WHEN 0 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/592a478a-04b9-4e30-8a89-23e1610e9cc2_11_1772548843155.mp3"}'
              WHEN 1 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/592a478a-04b9-4e30-8a89-23e1610e9cc2_2_1772548791352.mp3"}'
              WHEN 2 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/592a478a-04b9-4e30-8a89-23e1610e9cc2_16_1772548874822.mp3"}'
              WHEN 3 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/592a478a-04b9-4e30-8a89-23e1610e9cc2_4_1772548802067.mp3"}'
              WHEN 4 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/592a478a-04b9-4e30-8a89-23e1610e9cc2_0_1772548781903.mp3"}'
              WHEN 5 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/592a478a-04b9-4e30-8a89-23e1610e9cc2_14_1772548862690.mp3"}'
              WHEN 6 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/592a478a-04b9-4e30-8a89-23e1610e9cc2_13_1772548856982.mp3"}'
              WHEN 7 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/592a478a-04b9-4e30-8a89-23e1610e9cc2_15_1772548869468.mp3"}'
              ELSE item
            END
          )
          FROM jsonb_array_elements(page->'items') WITH ORDINALITY AS t(item, item_ord),
          LATERAL (SELECT (item_ord - 1)::int AS item_idx) idx
        ))
        ELSE page
      END
    )
    FROM jsonb_array_elements(content->'pages') AS page
  )
)
WHERE id = '592a478a-04b9-4e30-8a89-23e1610e9cc2';

-- ============================================================
-- e6088471 - Shopping for Clothes (M5U4) - 5 items
-- ============================================================
UPDATE lessons SET content = jsonb_set(
  content,
  '{pages}',
  (
    SELECT jsonb_agg(
      CASE
        WHEN page->>'type' = 'audio_choice'
        THEN jsonb_set(page, '{items}', (
          SELECT jsonb_agg(
            CASE item_idx
              WHEN 0 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/e6088471-5b90-466c-8846-989293dcc8c1_1_1772548898823.mp3"}'
              WHEN 1 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/e6088471-5b90-466c-8846-989293dcc8c1_6_1772548927052.mp3"}'
              WHEN 2 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/e6088471-5b90-466c-8846-989293dcc8c1_8_1772548937371.mp3"}'
              WHEN 3 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/e6088471-5b90-466c-8846-989293dcc8c1_3_1772548910368.mp3"}'
              WHEN 4 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/e6088471-5b90-466c-8846-989293dcc8c1_4_1772548915127.mp3"}'
              ELSE item
            END
          )
          FROM jsonb_array_elements(page->'items') WITH ORDINALITY AS t(item, item_ord),
          LATERAL (SELECT (item_ord - 1)::int AS item_idx) idx
        ))
        ELSE page
      END
    )
    FROM jsonb_array_elements(content->'pages') AS page
  )
)
WHERE id = 'e6088471-5b90-466c-8846-989293dcc8c1';

-- ============================================================
-- bd6a4c50 - Shopping at a Street Market (M5U5) - 6 items
-- ============================================================
UPDATE lessons SET content = jsonb_set(
  content,
  '{pages}',
  (
    SELECT jsonb_agg(
      CASE
        WHEN page->>'type' = 'audio_choice'
        THEN jsonb_set(page, '{items}', (
          SELECT jsonb_agg(
            CASE item_idx
              WHEN 0 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/bd6a4c50-09f8-4769-bee7-450c10736df5_7_1772548990618.mp3"}'
              WHEN 1 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/bd6a4c50-09f8-4769-bee7-450c10736df5_13_1772549023885.mp3"}'
              WHEN 2 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/bd6a4c50-09f8-4769-bee7-450c10736df5_8_1772548995720.mp3"}'
              WHEN 3 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/bd6a4c50-09f8-4769-bee7-450c10736df5_12_1772549018668.mp3"}'
              WHEN 4 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/bd6a4c50-09f8-4769-bee7-450c10736df5_0_1772548953087.mp3"}'
              WHEN 5 THEN item || '{"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/phrases/bd6a4c50-09f8-4769-bee7-450c10736df5_5_1772548981602.mp3"}'
              ELSE item
            END
          )
          FROM jsonb_array_elements(page->'items') WITH ORDINALITY AS t(item, item_ord),
          LATERAL (SELECT (item_ord - 1)::int AS item_idx) idx
        ))
        ELSE page
      END
    )
    FROM jsonb_array_elements(content->'pages') AS page
  )
)
WHERE id = 'bd6a4c50-09f8-4769-bee7-450c10736df5';
