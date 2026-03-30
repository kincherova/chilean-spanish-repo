/*
  # Link Module 6 Unit 1 audio to flashcards and lesson phrases

  ## Summary
  Audio files were uploaded to storage for the "People, Relationships & Everyday Life" 
  vocabulary unit (Module 6, Unit 1) but the database records were not updated.
  This migration links the uploaded audio URLs to:
  1. Each flashcard's audio_url column
  2. Each phrase in the lesson's phrase_list page content
*/

-- 1. Update flashcard audio_url for each word
UPDATE flashcards SET audio_url = 'https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/vocab/6c14a552-8414-43b6-a2a0-e5d61590938e_5fd8455e-bacd-4104-835e-c0db124b5e55_1774877707278.MP3'
WHERE id = '5fd8455e-bacd-4104-835e-c0db124b5e55';

UPDATE flashcards SET audio_url = 'https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/vocab/6c14a552-8414-43b6-a2a0-e5d61590938e_bb656156-425b-47fb-beda-47beab2915a6_1774877718406.MP3'
WHERE id = 'bb656156-425b-47fb-beda-47beab2915a6';

UPDATE flashcards SET audio_url = 'https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/vocab/6c14a552-8414-43b6-a2a0-e5d61590938e_5aee4d86-3964-43d2-9ec5-a75cffe8f43f_1774877726541.MP3'
WHERE id = '5aee4d86-3964-43d2-9ec5-a75cffe8f43f';

UPDATE flashcards SET audio_url = 'https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/vocab/6c14a552-8414-43b6-a2a0-e5d61590938e_c6062279-4d72-439b-976e-045c282f9542_1774877735377.MP3'
WHERE id = 'c6062279-4d72-439b-976e-045c282f9542';

UPDATE flashcards SET audio_url = 'https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/vocab/6c14a552-8414-43b6-a2a0-e5d61590938e_1c5f3535-aff1-48ff-8a48-16be951379ac_1774877743970.MP3'
WHERE id = '1c5f3535-aff1-48ff-8a48-16be951379ac';

UPDATE flashcards SET audio_url = 'https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/vocab/6c14a552-8414-43b6-a2a0-e5d61590938e_25f4abce-ed9e-4d4e-a01d-89d75916bdb4_1774877748972.MP3'
WHERE id = '25f4abce-ed9e-4d4e-a01d-89d75916bdb4';

UPDATE flashcards SET audio_url = 'https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/vocab/6c14a552-8414-43b6-a2a0-e5d61590938e_be70be76-9967-4353-9181-22694ab7d5dc_1774877756177.MP3'
WHERE id = 'be70be76-9967-4353-9181-22694ab7d5dc';

UPDATE flashcards SET audio_url = 'https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/vocab/6c14a552-8414-43b6-a2a0-e5d61590938e_157430f1-d8ff-4f0d-81f1-4f68088719fa_1774877760843.MP3'
WHERE id = '157430f1-d8ff-4f0d-81f1-4f68088719fa';

UPDATE flashcards SET audio_url = 'https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/vocab/6c14a552-8414-43b6-a2a0-e5d61590938e_c785522c-89fd-4c56-a038-0795b057715d_1774877768153.MP3'
WHERE id = 'c785522c-89fd-4c56-a038-0795b057715d';

UPDATE flashcards SET audio_url = 'https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/vocab/6c14a552-8414-43b6-a2a0-e5d61590938e_0705eed2-a809-48e7-aeb9-95750447c1a3_1774877774963.MP3'
WHERE id = '0705eed2-a809-48e7-aeb9-95750447c1a3';

-- 2. Update the lesson phrase_list to include audioUrl on each phrase
UPDATE lessons
SET content = jsonb_set(
  content,
  '{pages,0,phrases}',
  $phrases$[
    {"reply":"","english":"Boyfriend / Girlfriend","spanish":"Pololo / Polola","isChilean":true,"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/vocab/6c14a552-8414-43b6-a2a0-e5d61590938e_5fd8455e-bacd-4104-835e-c0db124b5e55_1774877707278.MP3"},
    {"reply":"","english":"Young person (informal)","spanish":"Cabro / Cabra","isChilean":true,"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/vocab/6c14a552-8414-43b6-a2a0-e5d61590938e_bb656156-425b-47fb-beda-47beab2915a6_1774877718406.MP3"},
    {"reply":"","english":"Woman / Girl (informal, a bit disrespectful)","spanish":"Mina","isChilean":true,"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/vocab/6c14a552-8414-43b6-a2a0-e5d61590938e_5aee4d86-3964-43d2-9ec5-a75cffe8f43f_1774877726541.MP3"},
    {"reply":"","english":"Guy / Girl (casual)","spanish":"Gallo / Galla","isChilean":true,"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/vocab/6c14a552-8414-43b6-a2a0-e5d61590938e_c6062279-4d72-439b-976e-045c282f9542_1774877735377.MP3"},
    {"reply":"","english":"Dude / Guy (very common, can be affectionate or rude depending on tone)","spanish":"Weon / Weona","isChilean":true,"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/vocab/6c14a552-8414-43b6-a2a0-e5d61590938e_1c5f3535-aff1-48ff-8a48-16be951379ac_1774877743970.MP3"},
    {"reply":"","english":"Chubby person (from guata = belly; affectionate nickname)","spanish":"Guatón","isChilean":true,"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/vocab/6c14a552-8414-43b6-a2a0-e5d61590938e_25f4abce-ed9e-4d4e-a01d-89d75916bdb4_1774877748972.MP3"},
    {"reply":"","english":"Grandpa","spanish":"El tata","isChilean":true,"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/vocab/6c14a552-8414-43b6-a2a0-e5d61590938e_be70be76-9967-4353-9181-22694ab7d5dc_1774877756177.MP3"},
    {"reply":"","english":"Housekeeper","spanish":"La nana","isChilean":true,"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/vocab/6c14a552-8414-43b6-a2a0-e5d61590938e_157430f1-d8ff-4f0d-81f1-4f68088719fa_1774877760843.MP3"},
    {"reply":"","english":"Police officer (informal, quite disrespectful)","spanish":"El paco","isChilean":true,"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/vocab/6c14a552-8414-43b6-a2a0-e5d61590938e_c785522c-89fd-4c56-a038-0795b057715d_1774877768153.MP3"},
    {"reply":"","english":"Young urban individual from low socioeconomic backgrounds associated with aggressive behavior, criminality, and a distinct style.","spanish":"Flaite","isChilean":true,"audioUrl":"https://jrztugpstdfpcdobehxp.supabase.co/storage/v1/object/public/audio-lessons/vocab/6c14a552-8414-43b6-a2a0-e5d61590938e_0705eed2-a809-48e7-aeb9-95750447c1a3_1774877774963.MP3"}
  ]$phrases$::jsonb
)
WHERE id = 'ddff48a8-1933-410e-be7e-67960074188f';
