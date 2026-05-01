import { useEffect, useRef } from 'react';
import { PH, GR, OVL } from '../data/constants';
import { getQuote } from '../data/quotes';

export default function StoryModal({ stories, currentIndex, isOpen, onClose, onNext, onPrev, onShare, lang }) {
  const timerRef = useRef(null);
  const p = stories[currentIndex];

  useEffect(() => {
    if (!isOpen) return;
    timerRef.current = setTimeout(() => {
      if (currentIndex < stories.length - 1) onNext();
      else onClose();
    }, 5200);
    return () => clearTimeout(timerRef.current);
  }, [isOpen, currentIndex, stories.length, onNext, onClose]);

  if (!isOpen || !p) return null;

  const [quote, attr] = getQuote(p.key, lang);
  const catKey = p.key;
  const catPrefix = catKey.startsWith('gt') ? 'gratitude' : { m: 'morning', s: 'suvichar', f: 'festival', d: 'devotional', b: 'birthday', n: 'night', g: 'geeta' }[catKey.replace(/[0-9]/g, '')] || 'morning';
  const overlay = OVL[catPrefix] || OVL.morning;

  return (
    <div className="story-modal">
      {/* Progress bars */}
      <div className="story-modal__progress">
        {stories.map((_, i) => (
          <div key={i} className="story-modal__bar">
            <div className={`story-modal__bar-fill${i < currentIndex ? ' story-modal__bar-fill--done' : ''}${i === currentIndex ? ' story-modal__bar-fill--active' : ''}`} />
          </div>
        ))}
      </div>

      {/* Who sent */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 16px 10px' }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(255,255,255,.5)', flexShrink: 0, background: '#e8d8c0' }}>
          <img src={p.photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} onError={e => { e.target.style.display = 'none'; }} />
        </div>
        <div>
          <div style={{ fontFamily: 'var(--deva)', fontSize: 20, fontWeight: 700, color: '#fff' }}>{p.name}</div>
          <div style={{ fontFamily: 'var(--deva)', fontSize: 12, color: 'rgba(255,255,255,.55)', marginTop: 2 }}>ने अभी यह कार्ड भेजा</div>
        </div>
        <button onClick={onClose} style={{ marginLeft: 'auto', width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        </button>
      </div>

      {/* Nav arrows */}
      <button className="story-modal__nav story-modal__nav--left" onClick={onPrev}>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="rgba(255,240,210,.95)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
      </button>
      <button className="story-modal__nav story-modal__nav--right" onClick={onNext}>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="rgba(255,240,210,.95)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
      </button>

      {/* Card area */}
      <div style={{ flex: 1, padding: '6px 14px', display: 'flex', alignItems: 'center' }}>
        <div className="story-modal__card">
          <div className="story-modal__card-inner">
            <div style={{ background: GR[catKey], position: 'absolute', inset: 0, zIndex: 0 }} />
            <img className="story-modal__card-photo" src={PH[catKey]} alt="" onError={e => { e.target.style.opacity = 0; }} />
            <div className="story-modal__card-overlay" style={{ background: overlay }} />
          </div>

          {/* Quote */}
          <div className="story-modal__card-content">
            <div className="story-modal__card-quote" dangerouslySetInnerHTML={{ __html: quote.replace(/\n/g, '<br>') }} />
            {attr && <div className="story-modal__card-attr">{attr}</div>}
          </div>

          {/* Name strip — proper overlapping avatar + pill */}
          <div className="story-modal__card-strip">
            <div className="story-modal__card-strip-photo">
              <div className="story-modal__card-strip-avatar">
                <img src={p.photo} alt="" onError={e => { e.target.style.display = 'none'; }} />
              </div>
            </div>
            <div className="story-modal__card-strip-info">
              <div className="story-modal__card-strip-name">{p.name}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div style={{ padding: '12px 14px 24px', display: 'flex', gap: 10 }}>
        <button className="story-modal__wa-btn" style={{ flex: 2 }} onClick={onShare}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" /><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.38 1.25 4.82L2.05 22l5.38-1.41c1.39.76 2.96 1.18 4.61 1.18 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2z" /></svg>
          मैं भी भेजूं!
        </button>
        <button style={{ flex: 1, minHeight: 52, background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.15)', color: 'rgba(255,255,255,.65)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--ui)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }} onClick={onClose}>बाद में</button>
      </div>
    </div>
  );
}
