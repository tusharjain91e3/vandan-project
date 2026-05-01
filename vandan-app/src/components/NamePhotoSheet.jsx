import { useState, useRef, useEffect } from 'react';
import { COUNTRIES } from '../data/constants';
import { UI_LABELS } from '../data/quotes';
import { uploadUserPhoto } from '../lib/uploadPhoto';

export default function NamePhotoSheet({ isOpen, onClose, onSave, currentName, currentPhoto, currentPhone, currentCC, lang = 'hi' }) {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');
  const [phone, setPhone] = useState('');
  const [cc, setCc] = useState('+91');
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const fileRef = useRef(null);
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const L = UI_LABELS[lang] || UI_LABELS.hi;

  const needsPhone = !currentPhone;

  useEffect(() => {
    if (isOpen) {
      setName(currentName || '');
      setPhoto(currentPhoto || '');
      setPhone(currentPhone || '');
      setCc(currentCC || '+91');
      setNameError('');
      setPhoneError('');
      setTimeout(() => nameRef.current?.focus(), 350);
    }
  }, [isOpen, currentName, currentPhoto, currentPhone, currentCC]);

  const [photoUploading, setPhotoUploading] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoUploading(true);
    const url = await uploadUserPhoto(file, (preview) => setPhoto(preview));
    if (url) setPhoto(url);
    setPhotoUploading(false);
  };

  const validatePhone = (raw, countryCode) => {
    const digits = raw.replace(/\D/g, '');
    if (!digits) return 'कृपया WhatsApp नंबर दें';
    if (countryCode === '+91' && digits.length !== 10) return '10 अंक का नंबर दें';
    if (digits.length < 6) return 'सही नंबर दें';
    return '';
  };

  const handleSave = () => {
    const trimmedName = name.trim();
    setNameError('');
    setPhoneError('');

    if (!trimmedName) {
      setNameError('कृपया अपना नाम दें');
      nameRef.current?.focus();
      return;
    }

    if (needsPhone) {
      const err = validatePhone(phone, cc);
      if (err) {
        setPhoneError(err);
        phoneRef.current?.focus();
        return;
      }
    }

    onSave(trimmedName, photo, needsPhone ? phone.replace(/\D/g, '') : currentPhone, needsPhone ? cc : currentCC);
  };

  return (
    <>
      <div className={`namebox-ovl${isOpen ? ' on' : ''}`} onClick={onClose} />
      <div className={`namebox${isOpen ? ' on' : ''}`}>
        <div className="namebox-handle" />
        <div className="namebox-head">{L.namesheet_title}</div>
        <div className="namebox-body">
          {/* Photo upload */}
          <div className="namebox-av-wrap">
            <label className={`namebox-av${photo ? ' has-photo' : ''}`} onClick={() => fileRef.current?.click()}>
              <img src={photo} alt="" />
              <div className="namebox-av-icon">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="var(--stone)" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
                <span className="namebox-av-label">{photoUploading ? 'अपलोड हो रहा...' : L.namesheet_photo}</span>
              </div>
              {photoUploading && (
                <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'rgba(0,0,0,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 24, height: 24, border: '3px solid rgba(255,255,255,.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'loader-spin .7s linear infinite' }} />
                </div>
              )}
            </label>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />
          </div>

          {/* Name */}
          <div style={{ width: '100%' }}>
            <input
              ref={nameRef}
              className="namebox-input"
              type="text"
              placeholder={L.namesheet_name_ph}
              autoComplete="name"
              value={name}
              onChange={e => { setName(e.target.value); setNameError(''); }}
              style={nameError ? { borderColor: '#e53935' } : undefined}
            />
            {nameError && <div style={{ color: '#e53935', fontSize: 12, fontFamily: 'var(--deva)', marginTop: 4, paddingLeft: 4 }}>{nameError}</div>}
          </div>

          {/* Phone */}
          {needsPhone && (
            <div style={{ width: '100%' }}>
              <div style={{ display: 'flex', gap: 8 }}>
                <select
                  value={cc}
                  onChange={e => setCc(e.target.value)}
                  style={{
                    width: 90, height: 52, padding: '0 8px',
                    border: '1.5px solid rgba(43,24,16,.18)', borderRadius: 14,
                    background: '#fff', fontFamily: 'var(--ui)', fontSize: 15,
                    fontWeight: 600, color: 'var(--rosewood)', cursor: 'pointer',
                    appearance: 'auto',
                  }}
                >
                  {COUNTRIES.map(c => (
                    <option key={c.name} value={c.code}>{c.flag} {c.code}</option>
                  ))}
                </select>
                <input
                  ref={phoneRef}
                  className="namebox-input"
                  style={{ flex: 1, ...(phoneError ? { borderColor: '#e53935' } : {}) }}
                  type="tel"
                  inputMode="numeric"
                  placeholder={L.namesheet_phone_ph}
                  value={phone}
                  onChange={e => { setPhone(e.target.value); setPhoneError(''); }}
                  maxLength={15}
                />
              </div>
              {phoneError && <div style={{ color: '#e53935', fontSize: 12, fontFamily: 'var(--deva)', marginTop: 4, paddingLeft: 4 }}>{phoneError}</div>}
            </div>
          )}

          <button className="namebox-cta" onClick={handleSave}>{L.namesheet_save}</button>
        </div>
      </div>
    </>
  );
}
