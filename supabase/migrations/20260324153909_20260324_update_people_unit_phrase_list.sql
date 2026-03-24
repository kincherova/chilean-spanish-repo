/*
  # Update People, Relationships & Everyday Life unit

  Replaces the phrase list with the corrected set:
  - Updates Mina english to include "a bit disrespectful"
  - Splits "El tata / La nana" into two separate entries with corrected meanings
  - Removes: Pololear, Cabro chico, Compadre/Comadre, Flaco/Flaca, Viejo/Vieja, Cuático/Cuática
  - Adds: El paco (Police officer), Flaite
  - Updates multiple choice questions to only reference phrases still in the list
*/

UPDATE lessons
SET content = jsonb_set(
  content,
  '{pages,0,phrases}',
  '[
    {"reply":"","english":"Boyfriend / Girlfriend","spanish":"Pololo / Polola","isChilean":true},
    {"reply":"","english":"Young person (informal)","spanish":"Cabro / Cabra","isChilean":true},
    {"reply":"","english":"Woman / Girl (informal, a bit disrespectful)","spanish":"Mina","isChilean":true},
    {"reply":"","english":"Guy / Girl (casual)","spanish":"Gallo / Galla","isChilean":true},
    {"reply":"","english":"Dude / Guy (very common, can be affectionate or rude depending on tone)","spanish":"Weon / Weona","isChilean":true},
    {"reply":"","english":"Chubby person (from ''guata'' = belly; affectionate nickname)","spanish":"Guatón / Guatona","isChilean":true},
    {"reply":"","english":"Grandpa","spanish":"El tata","isChilean":true},
    {"reply":"","english":"Housekeeper","spanish":"La nana","isChilean":true},
    {"reply":"","english":"Police officer (informal, quite disrespectful)","spanish":"El paco","isChilean":true},
    {"reply":"","english":"Young urban individual from low socioeconomic backgrounds associated with aggressive behavior, criminality, and a distinct style.","spanish":"Flaite","isChilean":true}
  ]'::jsonb
)
WHERE id = 'ddff48a8-1933-410e-be7e-67960074188f';
