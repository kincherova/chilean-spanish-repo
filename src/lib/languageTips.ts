export interface LanguageTip {
  heading: string;
  body: string;
}

const tips: Record<string, LanguageTip> = {
  // Module 1, Unit 1 — Understanding questions
  'bac8627a-e89e-400a-b54e-217e4f379fc2': {
    heading: 'Reading Spanish is straightforward',
    body: 'Unlike English, Spanish spelling is very consistent — almost every letter has exactly one sound, and words are pronounced the way they\'re written. There are just a few special rules (like <em>ll</em>, <em>ñ</em>, and silent letters) — we\'ll cover them in later tips.',
  },

  // Module 1, Unit 2 — Giving short answers
  '60e0ad70-3308-485e-afb6-43b9eeaf5b6d': {
    heading: 'Noun gender: el / la',
    body: 'In Spanish, every noun has a gender — masculine or feminine. <em>El</em> is used for masculine nouns, <em>la</em> for feminine ones. There\'s no reliable way to guess — the best approach is to memorize each word together with its article. <em>El aeropuerto, la maleta, el taxi.</em>',
  },

  // Module 1, Unit 4 — Asking for clarification
  '01842515-3418-4a77-97d6-3d5263984cd9': {
    heading: 'The silent H',
    body: 'In Spanish, the letter <em>H</em> is always silent — you never pronounce it.<ul><li><em>hotel</em> → <em>otel</em></li><li><em>hospital</em> → <em>ospital</em></li><li><em>huevo 🥚</em> → <em>wevo</em></li></ul>',
  },

  // Module 2, Unit 1 — Immigration & Passport Control
  'f564bca0-10c9-4a5f-88b8-47c221534217': {
    heading: 'The Ñ sound',
    body: '<em>Ñ</em> is its own letter in Spanish. It sounds like the <em>ny</em> in "canyon."<ul><li><em>mañana</em> → <em>manyána</em> (tomorrow / morning)</li><li><em>niño</em> → <em>nínyo</em> (child)</li><li><em>año</em> → <em>ányo</em> (year)</li></ul>',
  },

  // Module 2, Unit 3 — Finding the Exit
  'b7851190-3e90-45d1-8a44-4dd977a21101': {
    heading: 'The LL sound',
    body: '<em>LL</em> is pronounced like the English <em>Y</em> in "yes" across most of Latin America, including Chile.<ul><li><em>llegar</em> → <em>yegár</em> (to arrive)</li><li><em>llamar</em> → <em>yamár</em> (to call)</li><li><em>calle</em> → <em>káye</em> (street)</li></ul>',
  },

  // Module 2, Unit 4 — Asking for Help
  'd2aaa7f4-b1c7-41dc-8815-e0101727a1cb': {
    heading: 'Reading GUE, GUI, GUA',
    body: 'When <em>G</em> appears before <em>U</em>, the <em>U</em> is usually silent — it\'s just there to keep the <em>G</em> hard (like in "go").<ul><li><em>guitarra</em> → <em>gitárra</em></li><li><em>Miguel</em> → <em>Migél</em></li><li>BUT: <em>agua 💦</em> → <em>ágwa</em> (here the U <em>is</em> pronounced)</li></ul>',
  },

  // Module 3, Unit 1 — If you get lost
  'aa81b2e7-6310-403f-87d5-994f45349bfc': {
    heading: 'Reading QUE, QUI',
    body: 'In Spanish, <em>Q</em> is always followed by <em>U</em>, and that <em>U</em> is always silent. <em>QU</em> always sounds like <em>K</em>.<ul><li><em>qué</em> → <em>ké</em> (what?)</li><li><em>aquí</em> → <em>akí</em> (here)</li><li><em>queso</em> → <em>késo 🧀</em></li></ul>',
  },

  // Module 3, Unit 3 — Understanding Directions
  '65c8f7bd-fd77-463b-a18b-5456971eaa69': {
    heading: 'Diminutivos: -ito / -ita',
    body: 'Adding <em>-ito</em> or <em>-ita</em> to a word makes it smaller, cuter, or warmer in tone. It\'s used all the time in everyday speech.<ul><li><em>pollo</em> → <em>pollito</em> (little chicken)</li><li><em>piscola</em> → <em>piscolita</em> (a cute name for the national drink)</li><li><em>hijo</em> → <em>mi hijito</em> (my little son / term of endearment)</li></ul>',
  },

  // Module 3, Unit 5 — Solving problems in a taxi
  '7302f804-f6a3-4bfa-a039-1208e2c2fe07': {
    heading: 'Chilean Spanish: -ái instead of -ás',
    body: 'In Chilean Spanish, the second-person verb ending <em>-ás</em> or <em>-as</em> often becomes <em>-ái</em> in casual speech. This is one of the most distinctive features of Chilean speech — you\'ll hear it constantly.<ul><li><em>¿cómo estás?</em> → <em>¿cómo estái?</em> (How are you?)</li><li><em>¿cachas?</em> → <em>¿cachaí?</em> (Get it?)</li><li><em>¿lo pillás?</em> → <em>¿lo pillái?</em> (Can you see it?)</li></ul>',
  },

  // Module 4, Unit 1 — Restaurant Vocabulary
  '50db43f2-e964-430b-9ff3-a3c244862448': {
    heading: 'CH sounds in borrowed words',
    body: 'In Spanish, <em>CH</em> is always pronounced like the English <em>ch</em> in "church" — never like <em>sh</em> or <em>k</em>. So loanwords that use <em>sh</em> or <em>sch</em> in their original language get a <em>ch</em> sound in Spanish.<ul><li><em>sushi</em> → <em>suchi</em></li><li><em>Schop</em> (draft beer) → <em>chop</em></li></ul>',
  },

  // Module 4, Unit 6 — Arriving & Getting a Table
  'c1337693-7182-4906-af05-176ce1559953': {
    heading: 'Chilean Spanish: dropping the final S',
    body: 'Chileans often drop or soften the <em>S</em> at the end of words, especially in fast speech. Once you know this, a lot of Chilean speech that seemed fast suddenly becomes clearer.<ul><li><em>más o menos</em> (more or less) → sounds like <em>má o meno</em></li><li><em>¡Atroz!</em> (Terrible!) → sounds like <em>¡Atróh!</em></li><li><em>dos</em> → sounds like <em>doh</em></li></ul>',
  },

  // Module 5, Unit 1 — Making Enquiries When Shopping
  'a46374a2-4b77-47e8-af31-9b542598a30b': {
    heading: 'Chilean Spanish: dropping the D in -ado / -ada',
    body: 'The <em>-ado</em> and <em>-ada</em> endings often lose their <em>D</em> in casual Chilean speech. You\'ll hear this constantly — it\'s not a mistake, it\'s just how Chileans talk.<ul><li><em>cansado</em> (tired) → <em>cansao</em></li><li><em>helado</em> (ice cream) → <em>helao</em></li><li><em>ocupado</em> (busy) → <em>ocupao</em></li></ul>',
  },

  // Module 5, Unit 3 — Shopping for Food
  'bbc96119-59f1-460b-9364-b61bd4262ba0': {
    heading: 'Words from Mapudungun',
    body: 'Many everyday Chilean words come from Mapudungun, the language of the Mapuche people. You\'ll hear them in normal conversation without anyone thinking twice.<ul><li><em>guagua</em> (wáwa) — baby</li><li><em>guata</em> (wáta) — belly / stomach</li><li><em>puchos</em> — cigarette butts (or cigarettes generally)</li></ul>',
  },

  // Module 6, Unit 1 — People, Relationships & Everyday Life
  '6c14a552-8414-43b6-a2a0-e5d61590938e': {
    heading: 'The words that run Chilean streets',
    body: '<strong>Weón</strong> and <strong>wea</strong> are probably the two most versatile words in Chilean Spanish. Weón can mean <em>dude/mate</em> when used warmly between friends, or <em>idiot/a**hole</em> when said with irritation — context and tone are everything. Wea is equally flexible: it can mean a <em>thing</em>, a <em>situation</em>, a <em>mess</em>, or just fill space when someone can\'t find the right word. You\'ll hear them constantly. Don\'t be alarmed — it usually just means people are being casual with you.',
  },

  // Module 6, Unit 2 — Reactions, Feelings & Everyday Expressions
  'dbc27ed3-ec26-458e-b67b-9b880eebecb5': {
    heading: 'Swearing is just… normal here',
    body: 'In Chile, swearing is woven into everyday conversation at all social levels — from market vendors to CEOs speaking in casual social events. If someone drops a <em>mierda</em> or a <em>wea</em> in a casual chat with you, they\'re not being rude or aggressive. It\'s simply how Chileans talk when they\'re relaxed and comfortable. Think of it as a sign that they feel at ease around you, not that something has gone wrong.',
  },

  // Module 6, Unit 3 — Social Life & Parties
  'c1a02933-b46c-4c1e-8329-ec3bb3ad82b2': {
    heading: 'Two accents, one country',
    body: 'Chile has a notable accent split along socio-economic lines. <em>Cuicos</em> (upper-class Chileans) tend to pronounce the <em>ll</em> and <em>y</em> sounds more like the letter <em>y</em>, and speak with a cleaner, more clipped rhythm. <em>Flaites</em> (working-class street culture) often pronounce the <em>ch</em> sound as <em>sh</em> — so <em>Chile</em> becomes <em>Shile</em> and <em>noche</em> becomes <em>noshe</em>. You\'ll notice this especially in Santiago. Neither is more common — they\'re both authentically Chilean.',
  },

  // Module 6, Unit 4 — Swearing & Rude Language
  '1bec3409-1710-4e94-b875-0093a8b9e95c': {
    heading: 'English words, Chilean style',
    body: 'Chileans have adopted a surprising number of English words into everyday speech — but with their own pronunciation. <em>Heavy</em> becomes <strong>jevi</strong> (<em>"qué jevi eso"</em> — "that\'s intense/cool"). You\'ll also hear <em>el after</em> (the after-party), <em>happy hour</em> and <em>el living</em> (the living room). These words are used naturally and aren\'t considered foreign — they\'ve been fully absorbed into Chilean Spanish. If you drop one, locals will appreciate that you\'re picking up the local flavour.',
  },
};

export function getTipForUnit(unitId: string): LanguageTip | null {
  return tips[unitId] ?? null;
}
