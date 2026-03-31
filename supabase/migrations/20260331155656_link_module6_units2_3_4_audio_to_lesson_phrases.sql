/*
  # Link uploaded audio URLs to lesson phrase_list pages for Module 6 Units 2, 3, and 4

  Updates the phrase_list pages in the lessons for:
  - Reactions, Feelings & Everyday Expressions (unit dbc27ed3)
  - Social Life & Parties (unit c1a02933)
  - Swearing & Rude Language (unit 1bec3409)

  Audio URLs are derived from the storage filenames which follow the pattern:
  vocab/{unit_id}_{flashcard_id}_{timestamp}.MP3

  Each phrase gets an audio_url matching its corresponding flashcard audio.
*/

-- Reactions, Feelings & Everyday Expressions
UPDATE lessons
SET content = jsonb_set(
  content,
  '{pages,0,phrases}',
  '[
    {"spanish":"Bacán","english":"Cool / Great / Awesome","isChilean":true,"reply":"","audio_url":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/vocab/dbc27ed3-ec26-458e-b67b-9b880eebecb5_6eb51b3b-edf9-4bbe-ae8a-95444c8f4a20_1774971535157.MP3"},
    {"spanish":"Fome","english":"Boring / Lame / Dull","isChilean":true,"reply":"","audio_url":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/vocab/dbc27ed3-ec26-458e-b67b-9b880eebecb5_82e0eb7e-8b6f-4c6f-863e-d5d1adf98afd_1774971539338.MP3"},
    {"spanish":"Brígido","english":"Intense / Harsh / Shocking (can be positive or negative)","isChilean":true,"reply":"","audio_url":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/vocab/dbc27ed3-ec26-458e-b67b-9b880eebecb5_32befeb3-04a6-44ca-8dff-b294b7976497_1774971542395.MP3"},
    {"spanish":"Pucha","english":"Dang! / Shoot! (mild expletive, like ''darn'')","isChilean":true,"reply":"","audio_url":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/vocab/dbc27ed3-ec26-458e-b67b-9b880eebecb5_c67bf93d-99c6-42fc-b00c-898b6fa27c86_1774971545978.MP3"},
    {"spanish":"Filo","english":"Never mind / Whatever / I don''t care","isChilean":true,"reply":"","audio_url":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/vocab/dbc27ed3-ec26-458e-b67b-9b880eebecb5_bba5771b-00b0-405f-95e6-f64423ac53df_1774971549676.MP3"},
    {"spanish":"Qué wea","english":"What the heck / What''s this thing (very versatile expression)","isChilean":true,"reply":"","audio_url":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/vocab/dbc27ed3-ec26-458e-b67b-9b880eebecb5_24015d73-3773-46a5-b081-441a3f840e57_1774971554101.MP3"},
    {"spanish":"Qué lata","english":"What a drag / That''s annoying","isChilean":true,"reply":"","audio_url":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/vocab/dbc27ed3-ec26-458e-b67b-9b880eebecb5_b6f68080-f422-4188-a6f8-38752d7c70b5_1774971560190.MP3"},
    {"spanish":"Qué pena","english":"What a shame / How sad","isChilean":true,"reply":"","audio_url":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/vocab/dbc27ed3-ec26-458e-b67b-9b880eebecb5_72d3ebe4-fb0b-487f-acff-69caf9a81726_1774971564520.MP3"},
    {"spanish":"Qué risa","english":"How funny / That''s hilarious","isChilean":true,"reply":"","audio_url":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/vocab/dbc27ed3-ec26-458e-b67b-9b880eebecb5_0c96972f-c95b-4d27-85d0-db132775265a_1774971570294.MP3"},
    {"spanish":"Qué rico","english":"How delicious / That''s great (also used beyond food)","isChilean":false,"reply":"","audio_url":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/vocab/dbc27ed3-ec26-458e-b67b-9b880eebecb5_834a1975-0069-45df-8188-9ecb3c15a2f1_1774971574530.MP3"},
    {"spanish":"Un cacho","english":"A problem / a hassle","isChilean":true,"reply":"","audio_url":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/vocab/dbc27ed3-ec26-458e-b67b-9b880eebecb5_587ea3f2-a369-4a76-b03a-3c38d2e1d425_1774971578630.MP3"},
    {"spanish":"Piola","english":"Low-key / discreet","isChilean":true,"reply":"","audio_url":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/vocab/dbc27ed3-ec26-458e-b67b-9b880eebecb5_1f8963a9-a300-42f6-9227-e3822bc7f70d_1774971582590.MP3"}
  ]'::jsonb
)
WHERE id = 'a38caf8b-6fb2-4d92-82ef-eefcfc0f6afe';

-- Social Life & Parties
UPDATE lessons
SET content = jsonb_set(
  content,
  '{pages,0,phrases}',
  '[
    {"spanish":"Carrete","english":"Party / Night out / A good time","isChilean":true,"reply":"","audio_url":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/vocab/c1a02933-b46c-4c1e-8329-ec3bb3ad82b2_88467e4c-d4ba-4be1-84ef-6bf8c38c4fdb_1774971599479.MP3"},
    {"spanish":"Juntémonos","english":"Let''s meet / Let''s get together","isChilean":true,"reply":"","audio_url":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/vocab/c1a02933-b46c-4c1e-8329-ec3bb3ad82b2_3e1a7775-03db-4af3-a651-713ace0c74cc_1774971603444.MP3"},
    {"spanish":"Copete","english":"Alcoholic drink / Booze (any kind)","isChilean":true,"reply":"","audio_url":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/vocab/c1a02933-b46c-4c1e-8329-ec3bb3ad82b2_bfc003f7-0c66-4bc2-b133-0f1d4221197f_1774971608424.MP3"},
    {"spanish":"Trago","english":"Alcoholic drink (synonym to Copete)","isChilean":true,"reply":"","audio_url":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/vocab/c1a02933-b46c-4c1e-8329-ec3bb3ad82b2_fbb80783-b01d-4a24-9509-89be6152e205_1774971612362.MP3"},
    {"spanish":"Piscola","english":"Pisco mixed with cola (the classic Chilean drink)","isChilean":true,"reply":"","audio_url":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/vocab/c1a02933-b46c-4c1e-8329-ec3bb3ad82b2_da2b0ce2-b980-4f49-8d2a-bf3e0b719e77_1774971617003.MP3"},
    {"spanish":"Piscolita","english":"Piscola (affectionate diminutive)","isChilean":true,"reply":"","audio_url":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/vocab/c1a02933-b46c-4c1e-8329-ec3bb3ad82b2_c02e0b8a-3086-43fd-9044-21e994fef5de_1774971621678.MP3"},
    {"spanish":"Tomar","english":"To drink (alcohol) — ''vamos a tomar''","isChilean":false,"reply":"","audio_url":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/vocab/c1a02933-b46c-4c1e-8329-ec3bb3ad82b2_364249b2-ea1b-4686-9b38-17c7a9d6ea3b_1774971624888.MP3"},
    {"spanish":"Caleta","english":"A lot / Loads / Many — ''tengo caleta de amigos''","isChilean":true,"reply":"","audio_url":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/vocab/c1a02933-b46c-4c1e-8329-ec3bb3ad82b2_b2cc8c8b-5706-465c-b116-aedca9c289d6_1774971628645.MP3"},
    {"spanish":"Pucho","english":"A cigarette","isChilean":true,"reply":"","audio_url":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/vocab/c1a02933-b46c-4c1e-8329-ec3bb3ad82b2_19a4dda5-c8ab-4794-b4a0-282c54bde3c8_1774971632114.MP3"}
  ]'::jsonb
)
WHERE id = '97c9b671-24ec-4f4c-a7c0-8ea0162d7cba';

-- Swearing & Rude Language
UPDATE lessons
SET content = jsonb_set(
  content,
  '{pages,0,phrases}',
  '[
    {"spanish":"Quedó la cagada","english":"It all went to sh*t / everything fell apart","isChilean":true,"reply":"","audio_url":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/vocab/1bec3409-1710-4e94-b875-0093a8b9e95c_ae7ae8ac-bfce-4b35-af2e-1478c49dad48_1774971647268.MP3"},
    {"spanish":"Cagaste","english":"You''re screwed / You messed up","isChilean":true,"reply":"","audio_url":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/vocab/1bec3409-1710-4e94-b875-0093a8b9e95c_6f53440a-831f-40eb-b433-efc5c35dc0ea_1774971656129.MP3"},
    {"spanish":"La concha de tu madre","english":"A very strong insult — one of the most offensive in Chilean Spanish","isChilean":true,"reply":"","audio_url":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/vocab/1bec3409-1710-4e94-b875-0093a8b9e95c_8f9152df-d500-461c-8757-8b961db92c31_1774971660728.MP3"},
    {"spanish":"¡Chucha!","english":"Damn! / Hell! (used as emphasis or exclamation)","isChilean":true,"reply":"","audio_url":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/vocab/1bec3409-1710-4e94-b875-0093a8b9e95c_9b26ab06-0912-4b27-9b93-5706fcb9d726_1774971667862.MP3"},
    {"spanish":"¡Qué chucha!","english":"What the f*** (strong surprise or frustration)","isChilean":true,"reply":"","audio_url":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/vocab/1bec3409-1710-4e94-b875-0093a8b9e95c_3f92297b-0df5-4759-8546-1cf95c56dc5e_1774971673712.MP3"},
    {"spanish":"Maricón","english":"Homophobic slur — offensive, but heard frequently in casual speech","isChilean":false,"reply":"","audio_url":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/vocab/1bec3409-1710-4e94-b875-0093a8b9e95c_29e01e16-8685-4854-99ff-cc7e55399047_1774971680609.MP3"},
    {"spanish":"Mierda","english":"Sh*t (universal expletive, used just like in English)","isChilean":false,"reply":"","audio_url":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/vocab/1bec3409-1710-4e94-b875-0093a8b9e95c_1267efe6-8870-4b4f-b9c7-d3ecbf290a51_1774971688546.MP3"},
    {"spanish":"Puta","english":"F*** / damn (used as an exclamation of surprise, frustration, or emphasis)","isChilean":false,"reply":"","audio_url":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/vocab/1bec3409-1710-4e94-b875-0093a8b9e95c_e7e002e6-c252-47db-93b8-2fa6308c8bd7_1774971693204.MP3"},
    {"spanish":"Puta la wea","english":"What the f*** / holy sh*t (strong exclamation, very Chilean)","isChilean":true,"reply":"","audio_url":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/vocab/1bec3409-1710-4e94-b875-0093a8b9e95c_62a60664-3392-4fd0-8fdf-673986cbf844_1774971696989.MP3"}
  ]'::jsonb
)
WHERE id = 'c10a1900-c4d0-4eb0-8934-c93a353d8607';
