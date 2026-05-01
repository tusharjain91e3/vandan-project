import { useState, useRef } from 'react';

export default function PhotoStep({ userName, onComplete, onSkip }) {
  const [photo, setPhoto] = useState(null);
  const fileRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPhoto(ev.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="photo-step">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 20px 0' }}>
        <span style={{ fontFamily: 'var(--ui)', fontSize: 12, fontWeight: 600, color: 'var(--stone)' }}>चरण 2 / 2</span>
        <button style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(43,24,16,.07)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={onSkip}>✕</button>
      </div>

      <div style={{ padding: '22px 28px 0' }}>
        <h2 style={{ fontFamily: 'var(--deva)', fontSize: 26, fontWeight: 700, color: 'var(--rosewood)', lineHeight: 1.2, marginBottom: 6 }}>फ़ोटो जोड़ें</h2>
        <p style={{ fontFamily: 'var(--deva)', fontSize: 14, color: 'var(--stone)', lineHeight: 1.5 }}>कार्ड पर आपकी पहचान — परिवार पहचानेगा</p>
      </div>

      <div className="photo-step__preview" onClick={() => fileRef.current?.click()}>
        <img className="photo-step__preview-img" src="https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=400" alt="" />
        <div className="photo-step__preview-overlay" />
        <div style={{ position: 'absolute', bottom: 72, left: 0, right: 0, padding: '0 16px', fontFamily: 'var(--deva)', fontSize: 17, fontWeight: 700, color: '#FFF8EE', lineHeight: 1.38, textShadow: '0 1px 14px rgba(0,0,0,.85)' }}>
          जो है — वो<br />बहुत है 🙏
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 62, display: 'flex', alignItems: 'center', padding: '0 10px 0 0' }}>
          <div style={{ flexShrink: 0, marginTop: -20, marginRight: -20, paddingLeft: 8, zIndex: 2 }}>
            <div className="photo-step__avatar-upload">
              {photo ? (
                <img src={photo} alt="" style={{ width: 60, height: 60, borderRadius: '50%', objectFit: 'cover' }} />
              ) : (
                <>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" /><circle cx="12" cy="13" r="4" /></svg>
                  <div className="photo-step__avatar-badge">+</div>
                </>
              )}
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 0, background: 'rgba(255,249,240,.97)', border: '1.5px solid rgba(43,24,16,.18)', borderRadius: '100px 100px 100px 0', padding: '9px 12px 9px 26px', zIndex: 1 }}>
            <div style={{ fontFamily: 'var(--deva)', fontSize: 14, fontWeight: 800, color: 'var(--rosewood)' }}>{userName}</div>
          </div>
        </div>
      </div>

      <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />

      <div style={{ textAlign: 'center', padding: '14px 0 0', fontFamily: 'var(--deva)', fontSize: 12, color: 'var(--stone)' }}>
        ↑ गोले पर टैप करें — फ़ोटो जोड़ें
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px 24px 28px' }}>
        <button className="photo-step__cta" onClick={() => onComplete(photo || '')}>कार्ड देखें →</button>
        <div style={{ fontFamily: 'var(--deva)', fontSize: 13, color: 'var(--stone)', textAlign: 'center', cursor: 'pointer', padding: 10 }} onClick={onSkip}>
          अभी नहीं, बाद में जोड़ूँगा
        </div>
      </div>
    </div>
  );
}
