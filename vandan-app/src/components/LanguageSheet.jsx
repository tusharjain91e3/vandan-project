const LANGUAGES = [
  { code: 'hi', native: 'हिंदी', en: 'Hindi' },
  { code: 'en', native: 'English', en: 'English', nativeFont: "var(--editorial)" },
  { code: 'mr', native: 'मराठी', en: 'Marathi' },
  { code: 'ta', native: 'தமிழ்', en: 'Tamil' },
  { code: 'te', native: 'తెలుగు', en: 'Telugu' },
  { code: 'gu', native: 'ગુજરાતી', en: 'Gujarati' },
];

export default function LanguageSheet({ isOpen, onClose, currentLang, onSelect }) {
  return (
    <>
      <div className={`sheet-backdrop${isOpen ? ' sheet-backdrop--open' : ''}`} onClick={onClose} />
      <div className={`sheet${isOpen ? ' sheet--open' : ''}`}>
        <div className="sheet__handle" />
        <div style={{
          fontFamily: 'var(--editorial)', fontStyle: 'italic', fontWeight: 600,
          fontSize: 17, color: 'var(--rosewood)', textAlign: 'center',
          padding: '14px 20px 10px',
          borderBottom: '1px solid rgba(43,24,16,.08)',
        }}>
          भाषा चुनें — Choose Language
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: '14px 18px 24px' }}>
          {LANGUAGES.map(l => (
            <button
              key={l.code}
              className={`lang-option${currentLang === l.code ? ' lang-option--active' : ''}`}
              onClick={() => onSelect(l.code)}
            >
              <span className="lang-option__native" style={l.nativeFont ? { fontFamily: l.nativeFont, fontStyle: 'italic', fontSize: 16 } : undefined}>{l.native}</span>
              <span className="lang-option__english">{l.en}</span>
              {currentLang === l.code && (
                <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--saffron)', margin: '5px auto 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
