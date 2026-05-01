import { useState, useRef, useEffect } from 'react';
import { UI_LABELS } from '../data/quotes';

const LANG_OPTIONS = [
  { code: 'hi', label: 'हिंदी' },
  { code: 'en', label: 'English' },
  { code: 'mr', label: 'मराठी' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'gu', label: 'ગુજ.' },
];

export default function ProfileScreen({ isOpen, onClose, user, onSave, currentLang, onLangChange }) {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');
  const [lang, setLang] = useState(currentLang);
  const fileRef = useRef(null);
  const L = UI_LABELS[currentLang] || UI_LABELS.hi;

  // Sync state from user prop every time the screen opens
  useEffect(() => {
    if (isOpen) {
      setName(user.name || '');
      setPhoto(user.photo || '');
      setLang(currentLang);
    }
  }, [isOpen, user.name, user.photo, currentLang]);

  if (!isOpen) return null;

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPhoto(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    onSave(name.trim(), photo);
    if (lang !== currentLang) onLangChange(lang);
    onClose();
  };

  return (
    <div className="profile-screen">
      <div className="profile__top">
        <button className="profile__back" onClick={onClose}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#2B1810" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <div className="profile__title">{L.profile_title}</div>
      </div>

      <div className="profile__photo-sec">
        <div className="profile__avatar" onClick={() => fileRef.current?.click()}>
          {photo ? (
            <img src={photo} alt="" />
          ) : (
            <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #D96B2B, #8B4000)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="rgba(255,255,255,.6)" strokeWidth="1.5" strokeLinecap="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
            </div>
          )}
        </div>
        <div className="profile__change" onClick={() => fileRef.current?.click()}>{L.profile_photo_change}</div>
        <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />
      </div>

      <div className="profile__form">
        <label className="profile__label">{L.profile_name_label}</label>
        <input className="profile__input" value={name} onChange={e => setName(e.target.value)} />

        <label className="profile__label">{L.profile_lang_label}</label>
        <div className="profile__lang-chips">
          {LANG_OPTIONS.map(l => (
            <button
              key={l.code}
              className={`profile__lang-chip${lang === l.code ? ' profile__lang-chip--active' : ''}`}
              onClick={() => setLang(l.code)}
            >
              {l.label}
            </button>
          ))}
        </div>

        <button className="profile__save" onClick={handleSave}>{L.profile_save}</button>
      </div>
    </div>
  );
}
