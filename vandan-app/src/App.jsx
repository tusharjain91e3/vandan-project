import { useState, useEffect, useCallback, useRef } from 'react';
import './styles/vandan.css';
import { saveLead, getAllLeads } from './lib/supabase';
import { shareInviteWithImage } from './lib/shareCard';
import { CATS, STORY_PEOPLE, STORY_NAMES } from './data/constants';
import { TAB_LABELS } from './data/quotes';
import SignupScreen from './components/SignupScreen';
// PhotoStep removed
import TopBar from './components/TopBar';
import CategoryTabs from './components/CategoryTabs';
import StoriesRow from './components/StoriesRow';
import StoryModal from './components/StoryModal';
import InviteBanner from './components/InviteBanner';
import CardFeed from './components/CardFeed';
import NamePhotoSheet from './components/NamePhotoSheet';
import ConfirmModal from './components/ConfirmModal';
import ShareInviteScreen from './components/ShareInviteScreen';
import LanguageSheet from './components/LanguageSheet';
// ProfileScreen removed — language change is via TopBar

function App() {
  const [user, setUser] = useState({ name: '', phone: '', cc: '+91', photo: '' });
  const [showSignup, setShowSignup] = useState(false);
  // showPhotoStep removed
  const [lang, setLangState] = useState(() => {
    try { return localStorage.getItem('vandan_lang') || 'hi'; } catch { return 'hi'; }
  });
  const setLang = useCallback((l) => {
    setLangState(l);
    try { localStorage.setItem('vandan_lang', l); } catch { /* ignore */ }
  }, []);
  const [category, setCategory] = useState('morning');
  const [currentScreen, setCurrentScreen] = useState('home');
  const [storyModalOpen, setStoryModalOpen] = useState(false);
  const [storyIndex, setStoryIndex] = useState(0);
  const [nameSheetOpen, setNameSheetOpen] = useState(false);
  const [langSheetOpen, setLangSheetOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  // profileOpen removed — replaced by langSheetOpen via TopBar
  const [storySeen, setStorySeen] = useState(() => STORY_PEOPLE.map(() => false));
  const pendingDownloadRef = useRef(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('vandan_user');
      if (saved) {
        const d = JSON.parse(saved);
        setUser({ name: d.name || '', phone: d.phoneRaw || d.phone || '', cc: d.cc || '+91', photo: d.photo || '' });
        setShowSignup(false);
      }
    } catch (e) { /* ignore */ }
  }, []);

  const handleSignup = useCallback(async (name, phone, countryCode) => {
    setUser({ name, phone, cc: countryCode, photo: '' });
    setShowSignup(false);
    localStorage.setItem('vandan_user', JSON.stringify({
      name, phone: countryCode + phone, phoneRaw: phone, cc: countryCode,
    }));
    await saveLead({ name, phone, countryCode, source: 'signup' });
  }, []);

  const handleNameSave = useCallback(async (name, photo, phone, countryCode) => {
    const newUser = {
      name: name || user.name,
      photo: photo || user.photo,
      phone: phone || user.phone,
      cc: countryCode || user.cc,
    };
    setUser(newUser);
    setNameSheetOpen(false);
    const updated = {
      name: newUser.name,
      phone: newUser.cc + newUser.phone,
      phoneRaw: newUser.phone,
      cc: newUser.cc,
      photo: newUser.photo,
    };
    localStorage.setItem('vandan_user', JSON.stringify(updated));
    if (name && phone) {
      await saveLead({ name, phone, countryCode: countryCode || user.cc, source: 'name_sheet' });
    }
    // If there's a pending download, trigger it after sheet closes
    if (pendingDownloadRef.current && newUser.name && newUser.phone) {
      setTimeout(() => {
        pendingDownloadRef.current?.();
        pendingDownloadRef.current = null;
      }, 500);
    }
  }, [user]);

  const handleShare = useCallback(() => {
    if (!user.name || !user.phone) { setNameSheetOpen(true); return; }
    setConfirmOpen(true);
  }, [user.name, user.phone]);

  const handleWhatsAppShare = useCallback(async () => {
    setConfirmOpen(false);
    const shareText = `🙏 *${user.name}* ने आपको *वंदन* पर बुलाया है!\n\n🪔 हर रोज़ सुंदर कार्ड भेजें — सुप्रभात, भक्ति, गीता, त्यौहार\n✨ 100+ कार्ड · 6 भाषाएं · WhatsApp Ready\n\n👉 अभी जुड़ें: https://vandan-app.vercel.app`;

    const shared = await shareInviteWithImage({ userName: user.name, shareText });

    if (!shared) {
      window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
    }
    setTimeout(() => setCurrentScreen('share-invite'), 300);
  }, [user.name]);

  // Derive translated stories from STORY_PEOPLE + lang + seen state
  const names = STORY_NAMES[lang] || STORY_NAMES.hi;
  const stories = STORY_PEOPLE.map((s, i) => ({
    ...s,
    name: names[s.nameKey] || s.nameKey,
    seen: storySeen[i] || false,
  }));

  const handleStoryClick = useCallback((idx) => {
    setStoryIndex(idx);
    setStoryModalOpen(true);
    setStorySeen(prev => prev.map((s, i) => i === idx ? true : s));
  }, []);

  const handleStoryNext = useCallback(() => {
    setStoryIndex(prev => {
      const next = (prev + 1) % STORY_PEOPLE.length;
      setStorySeen(s => s.map((seen, i) => i === next ? true : seen));
      return next;
    });
  }, []);

  const handleStoryPrev = useCallback(() => {
    setStoryIndex(prev => (prev - 1 + STORY_PEOPLE.length) % STORY_PEOPLE.length);
  }, []);

  const labels = TAB_LABELS[lang] || TAB_LABELS.hi;
  const categories = Object.keys(CATS).map(id => ({ id, label: labels[id] || id }));

  useEffect(() => {
    const leads = getAllLeads();
    if (leads.length > 0) console.log(`[Vandan] ${leads.length} leads collected`, leads);
  }, []);

  if (currentScreen === 'share-invite') {
    return (
      <div className="app">
        <ShareInviteScreen
          isVisible={true}
          onBack={() => setCurrentScreen('home')}
          userName={user.name}
          userPhoto={user.photo}
        />
      </div>
    );
  }

  return (
    <div className="app">
      {showSignup && <SignupScreen onSubmit={handleSignup} onSkip={() => setShowSignup(false)} />}

      <TopBar userName={user.name} userPhoto={user.photo} onProfileClick={() => setLangSheetOpen(true)} />
      <CategoryTabs categories={categories} activeCategory={category} onSelect={setCategory} />
      <StoriesRow stories={stories} onStoryClick={handleStoryClick} userName={user.name} userPhone={user.phone} onNeedSignup={() => setNameSheetOpen(true)} />

      {/* Invite banner between stories and feed */}
      <div className="invite-banner-wrap">
        <InviteBanner lang={lang} onClick={() => setCurrentScreen('share-invite')} />
      </div>

      <CardFeed
        category={category}
        lang={lang}
        user={user}
        onShare={handleShare}
        onEditName={() => setNameSheetOpen(true)}
        onNeedSignup={(downloadCallback) => {
          if (downloadCallback) pendingDownloadRef.current = downloadCallback;
          setNameSheetOpen(true);
        }}
      />

      {/* Modals */}
      <StoryModal stories={stories} currentIndex={storyIndex} isOpen={storyModalOpen} onClose={() => setStoryModalOpen(false)} onNext={handleStoryNext} onPrev={handleStoryPrev} onShare={handleShare} lang={lang} userName={user.name} userPhoto={user.photo} />
      <NamePhotoSheet isOpen={nameSheetOpen} onClose={() => setNameSheetOpen(false)} onSave={handleNameSave} currentName={user.name} currentPhoto={user.photo} currentPhone={user.phone} currentCC={user.cc} lang={lang} />
      <LanguageSheet isOpen={langSheetOpen} onClose={() => setLangSheetOpen(false)} currentLang={lang} onSelect={(l) => { setLang(l); setLangSheetOpen(false); }} />
      <ConfirmModal isOpen={confirmOpen} onClose={() => setConfirmOpen(false)} onWhatsAppShare={handleWhatsAppShare} userName={user.name} userPhone={user.cc + user.phone} />

    </div>
  );
}

export default App;
