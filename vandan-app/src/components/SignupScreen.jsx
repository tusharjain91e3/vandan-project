import { useState, useRef, useEffect } from 'react';
import { COUNTRIES } from '../data/constants';

export default function SignupScreen({ onSubmit, onSkip }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCC, setSelectedCC] = useState(COUNTRIES[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState('');
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);

  const filtered = COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.code.includes(search)
  );

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [dropdownOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) { alert('कृपया अपना नाम दें'); return; }
    const digits = phone.replace(/\D/g, '');
    if (selectedCC.code === '+91' && digits.length !== 10) { alert('कृपया 10 अंक का WhatsApp नंबर दें'); return; }
    if (digits.length < 6) { alert('कृपया सही WhatsApp नंबर दें'); return; }
    onSubmit(name.trim(), digits, selectedCC.code);
  };

  return (
    <div className="signup">
      {/* Skip button */}
      <button onClick={onSkip} style={{
        position: 'absolute', top: 20, right: 20, zIndex: 10,
        width: 40, height: 40, borderRadius: '50%',
        background: 'rgba(43,24,16,.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: 'none', cursor: 'pointer'
      }}>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--rosewood)" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>

      {/* Hero 75% */}
      <div className="signup__hero">
        <div className="signup__trust-badge">
          <span style={{ display: 'flex' }}>
            {['र','म','स'].map((ch, i) => (
              <span key={i} style={{
                width: 22, height: 22, borderRadius: '50%',
                background: 'linear-gradient(145deg,#FF8C35,#8B3500)',
                border: '1.5px solid rgba(255,200,100,.5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--deva)', fontSize: 9, color: '#FFF8EE', fontWeight: 700,
                marginLeft: i > 0 ? -4 : 0, flexShrink: 0
              }}>{ch}</span>
            ))}
          </span>
          <span>10,000+ लोग जुड़ चुके हैं</span>
        </div>

        <h1 className="signup__headline">परिवार को<br/>हर रोज़ जोड़ें</h1>

        <div className="signup__chips" style={{ display: 'flex', justifyContent: 'center', gap: 7, marginTop: 14, flexWrap: 'wrap' }}>
          <span className="signup__chip">100+ कार्ड</span>
          <span className="signup__chip">6 भाषाएं</span>
          <span className="signup__chip">WhatsApp Ready</span>
        </div>

        <div className="signup__card-fan">
          <div className="fan-card">
            <img src="https://images.pexels.com/photos/33770430/pexels-photo-33770430.jpeg?auto=compress&cs=tinysrgb&w=260&h=340&fit=crop" alt="" />
          </div>
          <div className="fan-card">
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Arjuna_and_Krishna_at_the_Mahabharata_war%2C_Bhagavad_Gita%2C_Kurukshetra%2C_Haryana.jpg" alt="" />
          </div>
          <div className="fan-card">
            <img src="https://images.pexels.com/photos/1631677/pexels-photo-1631677.jpeg?auto=compress&cs=tinysrgb&w=260&h=340&fit=crop" alt="" />
          </div>
        </div>
      </div>

      {/* Form 25% */}
      <form className="signup__form" onSubmit={handleSubmit}>
        <div className="signup__phone-row" ref={dropdownRef}>
          <button type="button" className="signup__country-code" onClick={(e) => {
            e.stopPropagation();
            setDropdownOpen(!dropdownOpen);
            setTimeout(() => searchRef.current?.focus(), 50);
          }}>
            <span className="signup__cc-flag">{selectedCC.flag}</span>
            <span className="signup__cc-code">{selectedCC.code}</span>
            <svg className="signup__cc-caret" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          </button>

          {dropdownOpen && (
            <div className="signup__cc-dropdown">
              <input
                ref={searchRef}
                className="signup__cc-search"
                type="text"
                placeholder="🔍  देश खोजें..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                onClick={e => e.stopPropagation()}
              />
              <div className="signup__cc-list">
                {filtered.map(c => (
                  <div key={c.name} className="signup__cc-opt" onClick={() => {
                    setSelectedCC(c);
                    setDropdownOpen(false);
                    setSearch('');
                  }}>
                    <span className="signup__cc-opt-flag">{c.flag}</span>
                    <span className="signup__cc-opt-name">{c.name}</span>
                    <span className="signup__cc-opt-code">{c.code}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <input className="signup__phone-input" type="tel" inputMode="numeric" placeholder="WhatsApp नंबर" autoComplete="tel" value={phone} onChange={e => setPhone(e.target.value)} />
        </div>

        <input className="signup__name-input" type="text" placeholder="आपका नाम (Name)" autoComplete="name" value={name} onChange={e => setName(e.target.value)} />

        <button type="submit" className="signup__cta">
          <svg viewBox="0 0 24 24" width="17" height="17" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.38 1.25 4.82L2.05 22l5.38-1.41c1.39.76 2.96 1.18 4.61 1.18 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2z"/></svg>
          वंदन शुरू करें — मुफ़्त
        </button>

        <div className="signup__skip" onClick={onSkip}>अभी नहीं, बाद में</div>
      </form>
    </div>
  );
}
