// Card photos — reused from vandan-app
const px = id =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1080&h=1350&fit=crop&q=90`;

const _WM = 'https://upload.wikimedia.org/wikipedia/commons';

export const CATEGORIES = {
  morning: {
    photos: [px(35742994), px(31403073), px(30373941)],
    quote: 'जो था अच्छा था,\nजो है बेहतर है,\nजो होगा बेहतरीन होगा',
    attr: 'सुप्रभात 🌅',
    overlay: 'linear-gradient(180deg,rgba(15,5,0,.45) 0%,rgba(15,5,0,.02) 40%,rgba(15,5,0,.72) 100%)',
    gradient: 'linear-gradient(160deg,#8B4500 0%,#D96B2B 50%,#FF8C00 100%)',
  },
  motivation: {
    photos: [px(35888628), px(23476480), px(11987205)],
    quote: 'खुद वो बदलाव बनो\nजो तुम दुनिया में\nदेखना चाहते हो',
    attr: '— महात्मा गांधी',
    overlay: 'linear-gradient(180deg,rgba(5,10,20,.72) 0%,rgba(5,10,20,.28) 50%,rgba(5,10,20,.78) 100%)',
    gradient: 'linear-gradient(160deg,#0A1525 0%,#1A3050 50%,#2D5080 100%)',
  },
  festival: {
    photos: [px(18983041), px(29492764), px(33824902)],
    quote: 'शुभ दीपावली 🪔\nदीपावली की रात\nहर घर में उजाला हो',
    attr: 'शुभकामनाएं',
    overlay: 'linear-gradient(180deg,rgba(0,0,0,.6) 0%,rgba(0,0,0,.12) 45%,rgba(0,0,0,.72) 100%)',
    gradient: 'linear-gradient(160deg,#8B0080 0%,#CC20A0 40%,#4040CC 100%)',
  },
  devotional: {
    photos: [px(36478011), px(34095708), px(29511741)],
    quote: 'महादेव साथ हैं\nतो डर किस\nबात का',
    attr: 'ॐ नमः शिवाय 🔱',
    overlay: 'linear-gradient(180deg,rgba(0,0,0,.78) 0%,rgba(0,0,0,.35) 50%,rgba(0,0,0,.82) 100%)',
    gradient: 'linear-gradient(160deg,#05001A 0%,#10004A 50%,#200080 100%)',
  },
  birthday: {
    photos: [px(25956380), px(4397805), px(13822362)],
    quote: 'जन्मदिन\nमुबारक हो!\nईश्वर से यही दुआ—\nआपकी हर मुराद पूरी हो 🎂',
    attr: 'जन्मदिन मुबारक',
    overlay: 'linear-gradient(180deg,rgba(0,0,0,.52) 0%,rgba(0,0,0,.08) 45%,rgba(0,0,0,.7) 100%)',
    gradient: 'linear-gradient(160deg,#4A0060 0%,#9000C0 50%,#CC00E0 100%)',
  },
  night: {
    photos: [px(35277388), px(12955984), px(7533874)],
    quote: 'रात की नीरवता में\nईश्वर का स्वर\nसुनाई देता है',
    attr: 'शुभ रात्रि 🌙',
    overlay: 'linear-gradient(180deg,rgba(0,0,5,.25) 0%,rgba(0,0,5,.0) 40%,rgba(0,0,5,.62) 100%)',
    gradient: 'linear-gradient(160deg,#020008 0%,#08001A 50%,#120030 100%)',
  },
  geeta: {
    photos: [
      `${_WM}/2/2a/Arjuna_and_Krishna_at_the_Mahabharata_war%2C_Bhagavad_Gita%2C_Kurukshetra%2C_Haryana.jpg`,
      `${_WM}/5/5d/Krishna_persuade_Arjuna_for_battle_or_Tell_Gita.jpg`,
      `${_WM}/3/3b/Arjuna_and_Krishna_at_the_Kurukshetra_Mahabharata_war%2C_Gita.jpg`,
    ],
    quote: 'कर्म करो, फल की\nचिंता मत करो —\nयही जीवन का मंत्र है',
    attr: 'श्रीमद् भगवद् गीता',
    overlay: 'linear-gradient(180deg,rgba(50,10,0,.82) 0%,rgba(50,10,0,.35) 45%,rgba(50,10,0,.88) 100%)',
    gradient: 'linear-gradient(160deg,#2A0A00 0%,#6B2000 50%,#A84000 100%)',
  },
  gratitude: {
    photos: [px(1631677), px(1684187), px(1040491)],
    quote: 'जो है — वो बहुत है\nशुक्रगुज़ार रहो\nहर एक पल के लिए',
    attr: 'आभार 🙏',
    overlay: 'linear-gradient(180deg,rgba(20,30,5,.55) 0%,rgba(20,30,5,.05) 38%,rgba(20,30,5,.75) 100%)',
    gradient: 'linear-gradient(160deg,#5A3010 0%,#A06020 50%,#D4A040 100%)',
  },
};
