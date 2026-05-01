import { useCallback, useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { PH, GR, OVL, GOLD_KEYS, LARGE_KEYS } from '../data/constants';
import { getQuote, UI_LABELS } from '../data/quotes';
import DefaultAvatar from './DefaultAvatar';

function TextWithBreaks({ text }) {
  if (!text) return null;
  return text.split('\n').map((line, i, arr) => (
    <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
  ));
}

export default function Card({ cardKey, style, ovlType, lang = 'hi', user = {}, onEditName, onNeedSignup }) {
  const cardRef = useRef(null);
  const wrapRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [quoteText, attr, sub] = getQuote(cardKey, lang);
  const isGold = GOLD_KEYS.has(cardKey);
  const isLarge = LARGE_KEYS.has(cardKey);
  const isDeva = !['en', 'ta', 'te', 'gu'].includes(lang);
  const L = UI_LABELS[lang] || UI_LABELS.hi;

  // Capture card as image
  const captureCard = useCallback(async () => {
    const el = wrapRef.current || cardRef.current;
    if (!el) return null;
    try {
      const canvas = await html2canvas(el, {
        useCORS: true, allowTaint: true, scale: 2, backgroundColor: '#EDE3D0',
        // Extend height to capture the overflowing avatar
        height: el.scrollHeight + 30,
        windowHeight: el.scrollHeight + 30,
      });
      return await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.9));
    } catch { return null; }
  }, []);

  // Download as IMAGE
  const handleDownload = useCallback(async (e) => {
    e.stopPropagation();
    if (!user.name || !user.phone) { onNeedSignup?.(); return; }
    setDownloading(true);
    const blob = await captureCard();
    if (blob) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `vandan-${cardKey}-${Date.now()}.jpg`;
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
    setDownloading(false);
  }, [user.name, user.phone, cardKey, captureCard, onNeedSignup]);

  // Share as IMAGE
  const handleWhatsAppShare = useCallback(async (e) => {
    e.stopPropagation();
    if (!user.name || !user.phone) { onNeedSignup?.(); return; }
    setSharing(true);
    const caption = `🙏 *${user.name}* ने आपके लिए यह भेजा —\n\n✨ _${quoteText.replace(/\n/g, ' ')}_\n\n🪔 *वंदन* — परिवार को हर रोज़ सुंदर कार्ड भेजें\n👉 https://vandan-app.vercel.app`;

    const blob = await captureCard();
    if (blob && navigator.share) {
      try {
        const file = new File([blob], `vandan-${cardKey}.jpg`, { type: 'image/jpeg' });
        if (navigator.canShare?.({ files: [file] })) {
          await navigator.share({ files: [file], text: caption });
          setSharing(false);
          return;
        }
      } catch (err) {
        if (err.name === 'AbortError') { setSharing(false); return; }
      }
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(caption)}`, '_blank');
    setSharing(false);
  }, [user.name, user.phone, quoteText, cardKey, captureCard, onNeedSignup]);

  return (
    <div className="cu">
      <div ref={wrapRef} style={{ paddingBottom: 8 }}>
      <div className="card" ref={cardRef}>
        <div className="card__gradient" style={{ background: GR[cardKey] }} />
        <img className="card__photo" src={PH[cardKey]} alt="" loading="lazy" crossOrigin="anonymous" onError={e => { e.target.style.opacity = 0; }} />
        <div className="card__overlay" style={{ background: OVL[ovlType] }} />
        <div className="card__content" data-style={style}>
          {style === 'suvichar' && <div className="quote-mark">&ldquo;</div>}
          <p className={`card__quote ${isDeva ? 'card__quote--deva' : ''} ${isGold ? 'card__quote--gold' : ''} ${isLarge ? 'card__quote--large' : ''}`}>
            <TextWithBreaks text={quoteText} />
          </p>
          {attr && <p className="card__attr">{attr}</p>}
          {sub && <p className={`card__sub ${isDeva ? '' : 'card__sub--en'}`}><TextWithBreaks text={sub} /></p>}
        </div>

        {user.name ? (
          <div className="card__strip">
            <div className="ns-photo">
              <div className="strip-av">
                {user.photo ? <img src={user.photo} alt="" crossOrigin="anonymous" /> : <DefaultAvatar name={user.name} size={88} />}
              </div>
            </div>
            <div className="ns-info"><div className="strip-name">{user.name}</div></div>
          </div>
        ) : (
          <div className="card__strip card__strip--empty" onClick={e => { e.stopPropagation(); onEditName?.(); }}>
            <div className="ns-photo">
              <div className="ns-av-placeholder">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="rgba(43,24,16,.25)" strokeWidth="1.5" strokeLinecap="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                <div className="ns-av-plus"><svg viewBox="0 0 14 14" width="10" height="10" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><line x1="7" y1="2" x2="7" y2="12" /><line x1="2" y1="7" x2="12" y2="7" /></svg></div>
              </div>
            </div>
            <div className="ns-info-empty"><div className="ns-name-placeholder">{L.name_ph}</div></div>
          </div>
        )}
      </div>
      </div>{/* close wrapRef */}

      <div className="actions">
        <button className="act-wa" onClick={handleWhatsAppShare} disabled={sharing}>
          {sharing && <div style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'loader-spin .7s linear infinite' }} />}
          {!sharing && <svg viewBox="0 0 24 24" width="16" height="16" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.38 1.25 4.82L2.05 22l5.38-1.41c1.39.76 2.96 1.18 4.61 1.18 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2z"/></svg>}
          {sharing ? 'भेज रहे हैं...' : L.wa_btn}
        </button>
        <div className="act-secondary">
          <button className="act-dl" onClick={handleDownload} aria-label="Download" disabled={downloading} style={downloading ? { opacity: 0.5 } : undefined}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--rosewood)" strokeWidth="2.5" strokeLinecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          </button>
          <button className="act-edit" onClick={e => { e.stopPropagation(); onEditName?.(); }} aria-label="Edit">
            <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="var(--rosewood)" strokeWidth="2.5" strokeLinecap="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4z" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
