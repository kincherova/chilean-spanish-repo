/*
  # Add bold markers to People unit tip text

  Updates the unit description tip to use **word** markers around
  key words so the UI can render them as bold.
*/

UPDATE units
SET description = 'The words Chileans use to talk about people around them — friends, partners, strangers, and everyone in between.

Tip: In Spanish, most words ending in **-o** refer to a male (pololo — boyfriend, niño — boy), while words ending in **-a** refer to a female (polola — girlfriend, niña — girl). So **cabro** means a young guy, **cabra** a young woman — and the same rule applies to **weón/weona** and many other words in this unit.'
WHERE id = '6c14a552-8414-43b6-a2a0-e5d61590938e';
