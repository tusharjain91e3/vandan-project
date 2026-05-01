export const UNCLE = 'https://images.pexels.com/photos/6472469/pexels-photo-6472469.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop';

const px = id => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop&q=85`;
const _WM = 'https://upload.wikimedia.org/wikipedia/commons';

export const GITA_IMGS = [
  `${_WM}/2/2a/Arjuna_and_Krishna_at_the_Mahabharata_war%2C_Bhagavad_Gita%2C_Kurukshetra%2C_Haryana.jpg`,
  `${_WM}/3/38/Arjuna_chooses_Krishna.jpg`,
  `${_WM}/5/5d/Krishna_persuade_Arjuna_for_battle_or_Tell_Gita.jpg`,
  `${_WM}/a/a5/BhagavadGita-19th-century-Illustrated-Sanskrit-Chapter_1.20.21.jpg`,
  `${_WM}/3/37/Krishna_and_Arjun_on_the_chariot%2C_Mahabharata%2C_18th-19th_century%2C_India.jpg`,
  `${_WM}/3/3b/Arjuna_and_Krishna_at_the_Kurukshetra_Mahabharata_war%2C_Gita.jpg`,
];

export const PH = {
  m1: px(5791086), m2: px(33770430), m3: px(15353577), m4: px(29651431),
  m5: px(16125405), m6: px(35742994), m7: px(31403073), m8: px(30373941),
  s1: px(31776507), s2: px(1635594), s3: px(34271582), s4: px(33638021),
  s5: px(16657999), s6: px(35888628), s7: px(23476480), s8: px(11987205),
  f1: px(3367460), f2: px(4094848), f3: px(34783845), f4: px(36560056),
  f5: px(18231728), f6: px(18983041), f7: px(29492764), f8: px(33824902),
  d1: px(31072582), d2: px(9375018), d3: px(36885017), d4: px(31942685),
  d5: px(28300438), d6: px(36478011), d7: px(34095708), d8: px(29511741),
  b1: px(137485), b2: px(11308365), b3: px(16000541), b4: px(4397823),
  b5: px(19643345), b6: px(25956380), b7: px(4397805), b8: px(13822362),
  n1: px(29376339), n2: px(2908971), n3: px(813269), n4: px(7554582),
  n5: px(37120321), n6: px(35277388), n7: px(12955984), n8: px(7533874),
  g1: GITA_IMGS[0], g2: GITA_IMGS[1], g3: GITA_IMGS[2], g4: GITA_IMGS[3],
  g5: GITA_IMGS[4], g6: GITA_IMGS[5], g7: GITA_IMGS[0], g8: GITA_IMGS[2],
  gt1: px(1631677), gt2: px(4050369), gt3: px(3280130), gt4: px(1684187),
  gt5: px(1040491), gt6: px(1274260), gt7: px(1024994), gt8: px(1172253),
};

export const GR = {
  m1: 'linear-gradient(160deg,#8B4500 0%,#D96B2B 50%,#FF8C00 100%)',
  m2: 'linear-gradient(160deg,#2D1005 0%,#5A2510 50%,#8B4000 100%)',
  m3: 'linear-gradient(160deg,#8B2000 0%,#CC4400 50%,#FF8C00 100%)',
  m4: 'linear-gradient(160deg,#5A1800 0%,#A87020 50%,#D4A020 100%)',
  m5: 'linear-gradient(160deg,#4A3000 0%,#8B6820 50%,#C8A040 100%)',
  m6: 'linear-gradient(160deg,#6A0040 0%,#C0306A 50%,#FF6B9E 100%)',
  m7: 'linear-gradient(160deg,#1A2A3A 0%,#2D4560 50%,#4A7090 100%)',
  m8: 'linear-gradient(160deg,#8B2040 0%,#CC4070 50%,#FF80A0 100%)',
  s1: 'linear-gradient(160deg,#0A1525 0%,#1A3050 50%,#2D5080 100%)',
  s2: 'linear-gradient(160deg,#1A0A00 0%,#5A2800 50%,#8B5000 100%)',
  s3: 'linear-gradient(160deg,#0A1A2D 0%,#1A3050 50%,#3A6080 100%)',
  s4: 'linear-gradient(160deg,#0A1A10 0%,#1A3A20 50%,#2D5030 100%)',
  s5: 'linear-gradient(160deg,#1A1A1A 0%,#303030 50%,#505050 100%)',
  s6: 'linear-gradient(160deg,#0A1A0A 0%,#1A3A1A 50%,#2D502D 100%)',
  s7: 'linear-gradient(160deg,#15052A 0%,#2D1050 50%,#501A7A 100%)',
  s8: 'linear-gradient(160deg,#0A1520 0%,#1A3040 50%,#2D5060 100%)',
  f1: 'linear-gradient(160deg,#8B0080 0%,#CC20A0 40%,#4040CC 100%)',
  f2: 'linear-gradient(160deg,#6B2800 0%,#C85000 50%,#E8A000 100%)',
  f3: 'linear-gradient(160deg,#6B0030 0%,#CC1060 50%,#E85090 100%)',
  f4: 'linear-gradient(160deg,#6B2800 0%,#CC5000 50%,#E88000 100%)',
  f5: 'linear-gradient(160deg,#8B0040 0%,#CC2060 50%,#FF6090 100%)',
  f6: 'linear-gradient(160deg,#0A3010 0%,#1A6030 50%,#30A050 100%)',
  f7: 'linear-gradient(160deg,#6B4000 0%,#CC8000 50%,#E8C000 100%)',
  f8: 'linear-gradient(160deg,#00206B 0%,#0040CC 50%,#2060E8 100%)',
  d1: 'linear-gradient(160deg,#05001A 0%,#10004A 50%,#200080 100%)',
  d2: 'linear-gradient(160deg,#001A20 0%,#003A40 50%,#005A60 100%)',
  d3: 'linear-gradient(160deg,#3A0800 0%,#8B2000 50%,#C84000 100%)',
  d4: 'linear-gradient(160deg,#4A0000 0%,#8B0000 50%,#CC0000 100%)',
  d5: 'linear-gradient(160deg,#5A1800 0%,#AA3000 50%,#E05000 100%)',
  d6: 'linear-gradient(160deg,#4A0020 0%,#8B0040 50%,#CC0060 100%)',
  d7: 'linear-gradient(160deg,#10001A 0%,#20003A 50%,#38006A 100%)',
  d8: 'linear-gradient(160deg,#00001A 0%,#000040 50%,#00006A 100%)',
  b1: 'linear-gradient(160deg,#4A0060 0%,#9000C0 50%,#CC00E0 100%)',
  b2: 'linear-gradient(160deg,#6B0040 0%,#CC1080 50%,#E850B0 100%)',
  b3: 'linear-gradient(160deg,#30005A 0%,#6000A0 50%,#9000D0 100%)',
  b4: 'linear-gradient(160deg,#00404A 0%,#007080 50%,#00A0AA 100%)',
  b5: 'linear-gradient(160deg,#5A2800 0%,#AA5000 50%,#E07000 100%)',
  b6: 'linear-gradient(160deg,#0A2A0A 0%,#1A501A 50%,#2A7A2A 100%)',
  b7: 'linear-gradient(160deg,#1A2530 0%,#304560 50%,#506080 100%)',
  b8: 'linear-gradient(160deg,#2A1208 0%,#502A18 50%,#704030 100%)',
  n1: 'linear-gradient(160deg,#020008 0%,#08001A 50%,#120030 100%)',
  n2: 'linear-gradient(160deg,#05021A 0%,#0F0840 50%,#1A1060 100%)',
  n3: 'linear-gradient(160deg,#050812 0%,#101830 50%,#1A2850 100%)',
  n4: 'linear-gradient(160deg,#020510 0%,#080F28 50%,#101540 100%)',
  n5: 'linear-gradient(160deg,#050010 0%,#0F0025 50%,#1A0040 100%)',
  n6: 'linear-gradient(160deg,#030208 0%,#08051A 50%,#100A2A 100%)',
  n7: 'linear-gradient(160deg,#050508 0%,#0F0F1A 50%,#1A1A2A 100%)',
  n8: 'linear-gradient(160deg,#030508 0%,#080F1A 50%,#10182A 100%)',
  g1: 'linear-gradient(160deg,#2A0A00 0%,#6B2000 50%,#A84000 100%)',
  g2: 'linear-gradient(160deg,#1A0A2A 0%,#3A1060 50%,#6A2090 100%)',
  g3: 'linear-gradient(160deg,#3A1A00 0%,#7A3800 50%,#B06000 100%)',
  g4: 'linear-gradient(160deg,#00102A 0%,#002050 50%,#004080 100%)',
  g5: 'linear-gradient(160deg,#2A0808 0%,#601010 50%,#901818 100%)',
  g6: 'linear-gradient(160deg,#1A1A00 0%,#3A3A00 50%,#6A6000 100%)',
  g7: 'linear-gradient(160deg,#0A0A1A 0%,#1A1A3A 50%,#2A2A5A 100%)',
  g8: 'linear-gradient(160deg,#2A1A00 0%,#5A3A00 50%,#8A6000 100%)',
  gt1: 'linear-gradient(160deg,#5A3010 0%,#A06020 50%,#D4A040 100%)',
  gt2: 'linear-gradient(160deg,#2A4010 0%,#507020 50%,#80A040 100%)',
  gt3: 'linear-gradient(160deg,#503020 0%,#905040 50%,#C08060 100%)',
  gt4: 'linear-gradient(160deg,#404010 0%,#707020 50%,#A0A040 100%)',
  gt5: 'linear-gradient(160deg,#3A2800 0%,#7A5800 50%,#B09030 100%)',
  gt6: 'linear-gradient(160deg,#2A3820 0%,#506840 50%,#80A060 100%)',
  gt7: 'linear-gradient(160deg,#4A3020 0%,#8A5840 50%,#B09070 100%)',
  gt8: 'linear-gradient(160deg,#3A2010 0%,#704030 50%,#A07050 100%)',
};

export const OVL = {
  morning: 'linear-gradient(180deg,rgba(15,5,0,.45) 0%,rgba(15,5,0,.02) 40%,rgba(15,5,0,.72) 100%)',
  suvichar: 'linear-gradient(180deg,rgba(5,10,20,.72) 0%,rgba(5,10,20,.28) 50%,rgba(5,10,20,.78) 100%)',
  festival: 'linear-gradient(180deg,rgba(0,0,0,.6) 0%,rgba(0,0,0,.12) 45%,rgba(0,0,0,.72) 100%)',
  devotional: 'linear-gradient(180deg,rgba(0,0,0,.78) 0%,rgba(0,0,0,.35) 50%,rgba(0,0,0,.82) 100%)',
  birthday: 'linear-gradient(180deg,rgba(0,0,0,.52) 0%,rgba(0,0,0,.08) 45%,rgba(0,0,0,.7) 100%)',
  night: 'linear-gradient(180deg,rgba(0,0,5,.25) 0%,rgba(0,0,5,.0) 40%,rgba(0,0,5,.62) 100%)',
  geeta: 'linear-gradient(180deg,rgba(50,10,0,.82) 0%,rgba(50,10,0,.35) 45%,rgba(50,10,0,.88) 100%)',
  gratitude: 'linear-gradient(180deg,rgba(20,30,5,.55) 0%,rgba(20,30,5,.05) 38%,rgba(20,30,5,.75) 100%)',
};

export const CATS = {
  morning: { keys: ['m1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8'], style: 'morning', ovl: 'morning' },
  motivation: { keys: ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8'], style: 'suvichar', ovl: 'suvichar' },
  festival: { keys: ['f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8'], style: 'festival', ovl: 'festival' },
  devotional: { keys: ['d1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8'], style: 'devotional', ovl: 'devotional' },
  birthday: { keys: ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8'], style: 'birthday', ovl: 'birthday' },
  night: { keys: ['n1', 'n2', 'n3', 'n4', 'n5', 'n6', 'n7', 'n8'], style: 'night', ovl: 'night' },
  geeta: { keys: ['g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8'], style: 'devotional', ovl: 'geeta' },
  gratitude: { keys: ['gt1', 'gt2', 'gt3', 'gt4', 'gt5', 'gt6', 'gt7', 'gt8'], style: 'morning', ovl: 'gratitude' },
};

export const GOLD_KEYS = new Set(['d1', 'd3', 'd4', 'd5', 'd6', 'f2', 'f4', 'f7']);
export const LARGE_KEYS = new Set(['s1', 's4', 's6', 's8']);

export const COUNTRIES = [
  { flag: '🇮🇳', name: 'India', code: '+91' },
  { flag: '🇺🇸', name: 'United States', code: '+1' },
  { flag: '🇬🇧', name: 'United Kingdom', code: '+44' },
  { flag: '🇦🇪', name: 'UAE', code: '+971' },
  { flag: '🇸🇦', name: 'Saudi Arabia', code: '+966' },
  { flag: '🇶🇦', name: 'Qatar', code: '+974' },
  { flag: '🇰🇼', name: 'Kuwait', code: '+965' },
  { flag: '🇴🇲', name: 'Oman', code: '+968' },
  { flag: '🇧🇭', name: 'Bahrain', code: '+973' },
  { flag: '🇨🇦', name: 'Canada', code: '+1' },
  { flag: '🇦🇺', name: 'Australia', code: '+61' },
  { flag: '🇸🇬', name: 'Singapore', code: '+65' },
  { flag: '🇳🇿', name: 'New Zealand', code: '+64' },
  { flag: '🇲🇾', name: 'Malaysia', code: '+60' },
  { flag: '🇹🇭', name: 'Thailand', code: '+66' },
  { flag: '🇮🇩', name: 'Indonesia', code: '+62' },
  { flag: '🇵🇭', name: 'Philippines', code: '+63' },
  { flag: '🇭🇰', name: 'Hong Kong', code: '+852' },
  { flag: '🇯🇵', name: 'Japan', code: '+81' },
  { flag: '🇰🇷', name: 'South Korea', code: '+82' },
  { flag: '🇳🇬', name: 'Nigeria', code: '+234' },
  { flag: '🇿🇦', name: 'South Africa', code: '+27' },
  { flag: '🇰🇪', name: 'Kenya', code: '+254' },
  { flag: '🇹🇿', name: 'Tanzania', code: '+255' },
  { flag: '🇵🇰', name: 'Pakistan', code: '+92' },
  { flag: '🇧🇩', name: 'Bangladesh', code: '+880' },
  { flag: '🇳🇵', name: 'Nepal', code: '+977' },
  { flag: '🇱🇰', name: 'Sri Lanka', code: '+94' },
  { flag: '🇲🇲', name: 'Myanmar', code: '+95' },
  { flag: '🇲🇻', name: 'Maldives', code: '+960' },
  { flag: '🇧🇹', name: 'Bhutan', code: '+975' },
  { flag: '🇦🇫', name: 'Afghanistan', code: '+93' },
  { flag: '🇩🇪', name: 'Germany', code: '+49' },
  { flag: '🇫🇷', name: 'France', code: '+33' },
  { flag: '🇮🇹', name: 'Italy', code: '+39' },
  { flag: '🇪🇸', name: 'Spain', code: '+34' },
  { flag: '🇳🇱', name: 'Netherlands', code: '+31' },
  { flag: '🇨🇭', name: 'Switzerland', code: '+41' },
  { flag: '🇸🇪', name: 'Sweden', code: '+46' },
  { flag: '🇮🇪', name: 'Ireland', code: '+353' },
  { flag: '🇧🇷', name: 'Brazil', code: '+55' },
  { flag: '🇲🇽', name: 'Mexico', code: '+52' },
  { flag: '🇫🇯', name: 'Fiji', code: '+679' },
  { flag: '🇲🇺', name: 'Mauritius', code: '+230' },
  { flag: '🇹🇹', name: 'Trinidad & Tobago', code: '+1868' },
  { flag: '🇬🇾', name: 'Guyana', code: '+592' },
  { flag: '🇸🇷', name: 'Suriname', code: '+597' },
];

export const VIDEO_CARDS = {
  morning: { photos: [px(35742994), px(31403073), px(30373941)], ovl: 'morning' },
  motivation: { photos: [px(35888628), px(23476480), px(11987205)], ovl: 'suvichar' },
  festival: { photos: [px(18983041), px(29492764), px(33824902)], ovl: 'festival' },
  devotional: { photos: [px(36478011), px(34095708), px(29511741)], ovl: 'devotional' },
  birthday: { photos: [px(25956380), px(4397805), px(13822362)], ovl: 'birthday' },
  night: { photos: [px(35277388), px(12955984), px(7533874)], ovl: 'night' },
  geeta: { photos: [GITA_IMGS[0], GITA_IMGS[2], GITA_IMGS[5]], ovl: 'geeta' },
  gratitude: { photos: [px(1631677), px(1684187), px(1040491)], ovl: 'gratitude' },
};

// Story photos — Indian people only (Pexels verified Indian portraits)
// Story photos — verified Indian faces from original vandan-v1.html (all tested, all work)
const storyFace = id => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop`;
export const STORY_PEOPLE = [
  { nameKey: 'suresh', photo: storyFace(6472469), key: 'd1' },   // Indian elder man orange turban
  { nameKey: 'meena', photo: storyFace(9366083), key: 'm2' },    // Indian woman
  { nameKey: 'vikram', photo: storyFace(1933873), key: 's1' },   // Indian man
  { nameKey: 'priya', photo: storyFace(4428278), key: 'f2' },    // Indian woman
  { nameKey: 'rakesh', photo: storyFace(3785079), key: 'n1' },   // Indian man
  { nameKey: 'anita', photo: storyFace(3807517), key: 'd4' },    // Indian woman
];

// Translatable story names
export const STORY_NAMES = {
  hi: { suresh: 'सुरेश जी', meena: 'मीना जी', vikram: 'विक्रम जी', priya: 'प्रिया जी', rakesh: 'राकेश जी', anita: 'अनीता जी' },
  en: { suresh: 'Suresh Ji', meena: 'Meena Ji', vikram: 'Vikram Ji', priya: 'Priya Ji', rakesh: 'Rakesh Ji', anita: 'Anita Ji' },
  mr: { suresh: 'सुरेश जी', meena: 'मीना जी', vikram: 'विक्रम जी', priya: 'प्रिया जी', rakesh: 'राकेश जी', anita: 'अनीता जी' },
  ta: { suresh: 'சுரேஷ்', meena: 'மீனா', vikram: 'விக்ரம்', priya: 'பிரியா', rakesh: 'ராகேஷ்', anita: 'அனிதா' },
  te: { suresh: 'సురేష్', meena: 'మీనా', vikram: 'విక్రమ్', priya: 'ప్రియా', rakesh: 'రాకేష్', anita: 'అనిత' },
  gu: { suresh: 'સુરેશ', meena: 'મીના', vikram: 'વિક્રમ', priya: 'પ્રિયા', rakesh: 'રાકેશ', anita: 'અનિતા' },
};
