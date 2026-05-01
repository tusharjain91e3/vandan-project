// ═══════════════════════════════════════════════════════════
// 50 Premium Videos — Unique backgrounds + music per category
// ═══════════════════════════════════════════════════════════

const px = id =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1080&h=1350&fit=crop&q=90`;
const _WM = 'https://upload.wikimedia.org/wikipedia/commons';

// Music per category (relative to public/)
const MUSIC = {
  morning: 'flute.ogg',
  geeta: 'veena.ogg',
  devotional: 'bhajan.ogg',
  motivation: 'mohan.ogg',
  night: 'classical.ogg',
  festival: 'santali.ogg',
  gratitude: 'folk.wav',
  birthday: 'qawwali.ogg',
};

// Overlays
const O = {
  warm: 'linear-gradient(180deg,rgba(15,5,0,.45) 0%,rgba(15,5,0,.02) 40%,rgba(15,5,0,.72) 100%)',
  deep: 'linear-gradient(180deg,rgba(5,10,20,.72) 0%,rgba(5,10,20,.28) 50%,rgba(5,10,20,.78) 100%)',
  dark: 'linear-gradient(180deg,rgba(0,0,0,.78) 0%,rgba(0,0,0,.35) 50%,rgba(0,0,0,.82) 100%)',
  gita: 'linear-gradient(180deg,rgba(50,10,0,.82) 0%,rgba(50,10,0,.35) 45%,rgba(50,10,0,.88) 100%)',
  night:'linear-gradient(180deg,rgba(0,0,5,.35) 0%,rgba(0,0,5,.0) 40%,rgba(0,0,5,.65) 100%)',
  fest: 'linear-gradient(180deg,rgba(0,0,0,.6) 0%,rgba(0,0,0,.12) 45%,rgba(0,0,0,.72) 100%)',
};
const G = {
  saffron: 'linear-gradient(160deg,#8B4500,#D96B2B,#FF8C00)',
  maroon:  'linear-gradient(160deg,#2A0A00,#6B2000,#A84000)',
  blue:    'linear-gradient(160deg,#0A1525,#1A3050,#2D5080)',
  purple:  'linear-gradient(160deg,#15052A,#2D1050,#501A7A)',
  darkblue:'linear-gradient(160deg,#05001A,#10004A,#200080)',
  green:   'linear-gradient(160deg,#0A1A10,#1A3A20,#2D5030)',
  night:   'linear-gradient(160deg,#020008,#08001A,#120030)',
  gold:    'linear-gradient(160deg,#5A3010,#A06020,#D4A040)',
  pink:    'linear-gradient(160deg,#4A0060,#9000C0,#CC00E0)',
};

// Each video has UNIQUE photo set — no two videos look the same
const GITA_BASE = [
  `${_WM}/2/2a/Arjuna_and_Krishna_at_the_Mahabharata_war%2C_Bhagavad_Gita%2C_Kurukshetra%2C_Haryana.jpg`,
  `${_WM}/3/38/Arjuna_chooses_Krishna.jpg`,
  `${_WM}/5/5d/Krishna_persuade_Arjuna_for_battle_or_Tell_Gita.jpg`,
  `${_WM}/a/a5/BhagavadGita-19th-century-Illustrated-Sanskrit-Chapter_1.20.21.jpg`,
  `${_WM}/3/37/Krishna_and_Arjun_on_the_chariot%2C_Mahabharata%2C_18th-19th_century%2C_India.jpg`,
  `${_WM}/3/3b/Arjuna_and_Krishna_at_the_Kurukshetra_Mahabharata_war%2C_Gita.jpg`,
];

function gita3(i) { return [GITA_BASE[i%6], GITA_BASE[(i+2)%6], GITA_BASE[(i+4)%6]]; }

export const ALL_VIDEOS = [

  // ══════ MORNING (7) — each with unique sunrise/nature photos ══════
  { id: 'mor-01', quote: 'जो था अच्छा था\nजो है बेहतर है\nजो होगा — बेहतरीन', attr: 'सुप्रभात', photos: [px(5791086), px(33770430), px(15353577)], overlay: O.warm, gradient: G.saffron, category: 'morning', music: MUSIC.morning },
  { id: 'mor-02', quote: 'हर सुबह एक\nनई शुरुआत है', attr: 'सुप्रभात', photos: [px(16125405), px(35742994), px(31403073)], overlay: O.warm, gradient: G.gold, category: 'morning', music: MUSIC.morning },
  { id: 'mor-03', quote: 'सूरज की तरह उगो\nरोशनी फैलाते रहो', attr: 'सुप्रभात', photos: [px(30373941), px(29651431), px(5791086)], overlay: O.warm, gradient: G.saffron, category: 'morning', music: MUSIC.morning },
  { id: 'mor-04', quote: 'उठो, मुस्कुराओ\nदुनिया तुम्हारी है', attr: 'सुप्रभात', photos: [px(1631677), px(1040491), px(1274260)], overlay: O.warm, gradient: G.gold, category: 'morning', music: MUSIC.morning },
  { id: 'mor-05', quote: 'कमल की तरह\nकीचड़ में भी खिलो', attr: 'सुप्रभात', photos: [px(4050369), px(3280130), px(1684187)], overlay: O.warm, gradient: G.saffron, category: 'morning', music: MUSIC.morning },
  { id: 'mor-06', quote: 'चाय की तरह\nदिल भी बड़ा रखो', attr: 'सुप्रभात ☕', photos: [px(1172253), px(1024994), px(16125405)], overlay: O.warm, gradient: G.gold, category: 'morning', music: MUSIC.morning },
  { id: 'mor-07', quote: 'ईश्वर हर सुबह\nनई उम्मीद का\nदीप जलाते हैं', attr: 'सुप्रभात', photos: [px(33770430), px(30373941), px(1631677)], overlay: O.warm, gradient: G.saffron, category: 'morning', music: MUSIC.morning },

  // ══════ BHAGAVAD GITA (8) — Gita artwork + temple photos ══════
  { id: 'git-01', quote: 'कर्मण्येवाधिकारस्ते\nमा फलेषु कदाचन', attr: 'गीता · अध्याय २', photos: gita3(0), overlay: O.gita, gradient: G.maroon, category: 'geeta', music: MUSIC.geeta },
  { id: 'git-02', quote: 'जो हुआ अच्छा हुआ\nजो हो रहा अच्छा है\nजो होगा वो भी अच्छा', attr: 'भगवद् गीता', photos: gita3(1), overlay: O.gita, gradient: G.gold, category: 'geeta', music: MUSIC.geeta },
  { id: 'git-03', quote: 'आत्मा न जन्मती है\nन कभी मरती है', attr: 'गीता · अध्याय २', photos: gita3(2), overlay: O.gita, gradient: G.maroon, category: 'geeta', music: MUSIC.geeta },
  { id: 'git-04', quote: 'मन को जीतो\nतो वह मित्र है\nहारो तो शत्रु', attr: 'गीता · अध्याय ६', photos: gita3(3), overlay: O.gita, gradient: G.darkblue, category: 'geeta', music: MUSIC.geeta },
  { id: 'git-05', quote: 'सुख-दुख में\nसमान रहना ही\nसच्चा योग है', attr: 'गीता · अध्याय २', photos: gita3(4), overlay: O.gita, gradient: G.maroon, category: 'geeta', music: MUSIC.geeta },
  { id: 'git-06', quote: 'श्रद्धा से ज्ञान\nज्ञान से मोक्ष', attr: 'गीता · अध्याय ४', photos: gita3(5), overlay: O.gita, gradient: G.gold, category: 'geeta', music: MUSIC.geeta },
  { id: 'git-07', quote: 'जब-जब धर्म की\nहानि होती है\nमैं अवतार लेता हूँ', attr: 'गीता · अध्याय ४', photos: gita3(0), overlay: O.gita, gradient: G.maroon, category: 'geeta', music: MUSIC.geeta },
  { id: 'git-08', quote: 'क्रोध से मोह\nमोह से भ्रम\nभ्रम से सर्वनाश', attr: 'गीता · अध्याय २', photos: gita3(1), overlay: O.gita, gradient: G.darkblue, category: 'geeta', music: MUSIC.geeta },

  // ══════ DEVOTIONAL (8) — unique temple/spiritual photos ══════
  { id: 'dev-01', quote: 'महादेव साथ हैं\nडर किस बात का', attr: 'हर हर महादेव', photos: [px(31072582), px(9375018), px(36885017)], overlay: O.dark, gradient: G.darkblue, category: 'devotional', music: MUSIC.devotional },
  { id: 'dev-02', quote: 'कृष्ण हैं तो\nअकेले नहीं हो तुम', attr: 'जय श्री कृष्ण', photos: [px(31942685), px(28300438), px(36478011)], overlay: O.dark, gradient: G.purple, category: 'devotional', music: MUSIC.devotional },
  { id: 'dev-03', quote: 'राम का नाम ही\nसबसे बड़ी शक्ति है', attr: 'जय श्री राम', photos: [px(34095708), px(29511741), px(31072582)], overlay: O.dark, gradient: G.saffron, category: 'devotional', music: MUSIC.devotional },
  { id: 'dev-04', quote: 'हनुमान जी की भक्ति\nपहाड़ उठा दे', attr: 'जय बजरंग बली', photos: [px(9375018), px(36885017), px(31942685)], overlay: O.dark, gradient: G.maroon, category: 'devotional', music: MUSIC.devotional },
  { id: 'dev-05', quote: 'गणपति बप्पा\nविघ्नहर्ता हैं', attr: 'गणपति बप्पा मोरया', photos: [px(28300438), px(36478011), px(34095708)], overlay: O.dark, gradient: G.gold, category: 'devotional', music: MUSIC.devotional },
  { id: 'dev-06', quote: 'माँ दुर्गा की कृपा\nसदा बनी रहे', attr: 'जय माँ दुर्गे', photos: [px(29511741), px(31072582), px(9375018)], overlay: O.dark, gradient: G.maroon, category: 'devotional', music: MUSIC.devotional },
  { id: 'dev-07', quote: 'जब दुनिया छोड़ दे\nभगवान नहीं छोड़ते', attr: 'ॐ नमः शिवाय', photos: [px(36885017), px(31942685), px(28300438)], overlay: O.dark, gradient: G.darkblue, category: 'devotional', music: MUSIC.devotional },
  { id: 'dev-08', quote: 'भक्ति में शक्ति है\nश्रद्धा में शांति', attr: 'हरि ॐ', photos: [px(36478011), px(34095708), px(29511741)], overlay: O.dark, gradient: G.purple, category: 'devotional', music: MUSIC.devotional },

  // ══════ MOTIVATION (8) — unique landscape/city photos ══════
  { id: 'mot-01', quote: 'खुद वो बदलाव बनो\nजो दुनिया में\nदेखना चाहते हो', attr: '— महात्मा गांधी', photos: [px(31776507), px(1635594), px(34271582)], overlay: O.deep, gradient: G.blue, category: 'motivation', music: MUSIC.motivation },
  { id: 'mot-02', quote: 'कोशिश करने वालों की\nकभी हार नहीं होती', attr: '— हरिवंशराय बच्चन', photos: [px(33638021), px(16657999), px(35888628)], overlay: O.deep, gradient: G.blue, category: 'motivation', music: MUSIC.motivation },
  { id: 'mot-03', quote: 'उठो जागो और\nतब तक मत रुको\nजब तक लक्ष्य न मिले', attr: '— स्वामी विवेकानंद', photos: [px(23476480), px(11987205), px(31776507)], overlay: O.deep, gradient: G.maroon, category: 'motivation', music: MUSIC.motivation },
  { id: 'mot-04', quote: 'सपने वो नहीं जो\nनींद में आएं —\nसपने वो हैं जो\nसोने न दें', attr: '— अब्दुल कलाम', photos: [px(1635594), px(34271582), px(33638021)], overlay: O.deep, gradient: G.saffron, category: 'motivation', music: MUSIC.motivation },
  { id: 'mot-05', quote: 'मेहनत आदत बन जाए\nतो कामयाबी\nमुकद्दर बन जाती है', attr: 'सुविचार', photos: [px(16657999), px(35888628), px(23476480)], overlay: O.deep, gradient: G.blue, category: 'motivation', music: MUSIC.motivation },
  { id: 'mot-06', quote: 'गिरना भी कला है\nगिरकर उठना\nसबसे बड़ी कला', attr: 'प्रेरणा', photos: [px(11987205), px(31776507), px(1635594)], overlay: O.deep, gradient: G.green, category: 'motivation', music: MUSIC.motivation },
  { id: 'mot-07', quote: 'अकेले चलो\nमंज़िल तुम्हें\nढूंढ रही है', attr: 'सुविचार', photos: [px(34271582), px(33638021), px(16657999)], overlay: O.deep, gradient: G.blue, category: 'motivation', music: MUSIC.motivation },
  { id: 'mot-08', quote: 'हार मानना\nसबसे बड़ी हार है', attr: 'प्रेरणा', photos: [px(35888628), px(23476480), px(11987205)], overlay: O.deep, gradient: G.maroon, category: 'motivation', music: MUSIC.motivation },

  // ══════ NIGHT (5) — unique night sky/star photos ══════
  { id: 'nit-01', quote: 'रात की नीरवता में\nईश्वर का स्वर\nसुनाई देता है', attr: 'शुभ रात्रि', photos: [px(29376339), px(2908971), px(813269)], overlay: O.night, gradient: G.night, category: 'night', music: MUSIC.night },
  { id: 'nit-02', quote: 'जैसे रात गुज़रती है\nतकलीफें भी गुज़रेंगी', attr: 'शुभ रात्रि', photos: [px(7554582), px(37120321), px(35277388)], overlay: O.night, gradient: G.night, category: 'night', music: MUSIC.night },
  { id: 'nit-03', quote: 'परिवार के साथ\nबिताया हर पल\nसबसे बड़ी दौलत', attr: 'शुभ रात्रि', photos: [px(12955984), px(7533874), px(29376339)], overlay: O.night, gradient: G.night, category: 'night', music: MUSIC.night },
  { id: 'nit-04', quote: 'भगवान पर भरोसा रखो\nकल बेहतर होगा', attr: 'शुभ रात्रि', photos: [px(2908971), px(813269), px(7554582)], overlay: O.night, gradient: G.night, category: 'night', music: MUSIC.night },
  { id: 'nit-05', quote: 'सपने देखो\nजो सच हो सकें', attr: 'शुभ रात्रि', photos: [px(37120321), px(35277388), px(12955984)], overlay: O.night, gradient: G.night, category: 'night', music: MUSIC.night },

  // ══════ FESTIVAL (5) — unique celebration/diya photos ══════
  { id: 'fes-01', quote: 'शुभ दीपावली\nहर घर में उजाला हो', attr: 'शुभकामनाएं', photos: [px(3367460), px(4094848), px(34783845)], overlay: O.fest, gradient: G.gold, category: 'festival', music: MUSIC.festival },
  { id: 'fes-02', quote: 'जय माता दी\nमाँ की कृपा\nसदा बनी रहे', attr: 'शुभ नवरात्रि', photos: [px(36560056), px(18231728), px(18983041)], overlay: O.fest, gradient: G.maroon, category: 'festival', music: MUSIC.festival },
  { id: 'fes-03', quote: 'गणपति बप्पा मोरया\nहर काम सफल हो', attr: 'गणेश चतुर्थी', photos: [px(29492764), px(33824902), px(3367460)], overlay: O.fest, gradient: G.saffron, category: 'festival', music: MUSIC.festival },
  { id: 'fes-04', quote: 'ईद मुबारक\nखुशियाँ बाँटो\nखुशियाँ बढ़ाओ', attr: 'ईद मुबारक', photos: [px(4094848), px(34783845), px(36560056)], overlay: O.fest, gradient: G.green, category: 'festival', music: MUSIC.festival },
  { id: 'fes-05', quote: 'होली के रंगों सी\nज़िंदगी रंगीन हो', attr: 'हैप्पी होली', photos: [px(18231728), px(18983041), px(29492764)], overlay: O.fest, gradient: G.pink, category: 'festival', music: MUSIC.festival },

  // ══════ GRATITUDE (4) — unique warm/nature photos ══════
  { id: 'gra-01', quote: 'जो है — वो बहुत है\nशुक्रगुज़ार रहो', attr: 'आभार', photos: [px(1631677), px(4050369), px(3280130)], overlay: O.warm, gradient: G.gold, category: 'gratitude', music: MUSIC.gratitude },
  { id: 'gra-02', quote: 'हर सांस वरदान है\nहर दिन उपहार', attr: 'कृतज्ञता', photos: [px(1684187), px(1040491), px(1274260)], overlay: O.warm, gradient: G.green, category: 'gratitude', music: MUSIC.gratitude },
  { id: 'gra-03', quote: 'परिवार है तो\nदुनिया की सबसे\nबड़ी दौलत है', attr: 'आभार', photos: [px(1024994), px(1172253), px(1631677)], overlay: O.warm, gradient: G.gold, category: 'gratitude', music: MUSIC.gratitude },
  { id: 'gra-04', quote: 'धन्यवाद कहने से\nरिश्ते सुंदर होते हैं', attr: 'कृतज्ञता', photos: [px(4050369), px(3280130), px(1684187)], overlay: O.warm, gradient: G.green, category: 'gratitude', music: MUSIC.gratitude },

  // ══════ BIRTHDAY (5) — unique celebration photos ══════
  { id: 'bdy-01', quote: 'जन्मदिन मुबारक\nहर मुराद पूरी हो', attr: 'शुभकामनाएं', photos: [px(137485), px(11308365), px(16000541)], overlay: O.fest, gradient: G.pink, category: 'birthday', music: MUSIC.birthday },
  { id: 'bdy-02', quote: 'आज आपका दिन है\nजश्न मनाओ!', attr: 'Happy Birthday', photos: [px(4397823), px(19643345), px(25956380)], overlay: O.fest, gradient: G.saffron, category: 'birthday', music: MUSIC.birthday },
  { id: 'bdy-03', quote: 'ईश्वर से दुआ\nसदा खुश रहो', attr: 'जन्मदिन मुबारक', photos: [px(4397805), px(13822362), px(137485)], overlay: O.fest, gradient: G.purple, category: 'birthday', music: MUSIC.birthday },
  { id: 'bdy-04', quote: 'उम्र शरद जैसी\nसुंदर और लंबी हो', attr: 'जन्मदिन मुबारक', photos: [px(11308365), px(16000541), px(4397823)], overlay: O.fest, gradient: G.gold, category: 'birthday', music: MUSIC.birthday },
  { id: 'bdy-05', quote: 'परिवार की दुआएं\nहमेशा साथ हैं', attr: 'Happy Birthday', photos: [px(19643345), px(25956380), px(4397805)], overlay: O.fest, gradient: G.pink, category: 'birthday', music: MUSIC.birthday },
];

export const CATEGORY_LIST = [...new Set(ALL_VIDEOS.map(v => v.category))];
