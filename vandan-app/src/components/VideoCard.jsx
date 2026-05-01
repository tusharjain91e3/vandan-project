import { useCallback, useState, useEffect, useRef } from 'react';
import { VIDEO_CARDS, OVL } from '../data/constants';
import { VC_QUOTES, UI_LABELS } from '../data/quotes';
import { getRandomVideoUrl } from '../lib/supabase';
import DefaultAvatar from './DefaultAvatar';

export default function VideoCard({ category, lang = 'hi', user = {}, onEditName, onNeedSignup }) {
  const [downloading, setDownloading] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [videoSrc, setVideoSrc] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoLoading, setVideoLoading] = useState(true);
  const videoRef = useRef(null);
  const cardRef = useRef(null);
  const cachedBlobRef = useRef(null);
  const vc = VIDEO_CARDS[category] || VIDEO_CARDS.morning;
  const vcQ = (VC_QUOTES[category] || VC_QUOTES.morning)[lang] || (VC_QUOTES[category] || VC_QUOTES.morning).hi;
  const isDeva = !['en', 'ta', 'te', 'gu'].includes(lang);
  const L = UI_LABELS[lang] || UI_LABELS.hi;

  useEffect(() => {
    let cancelled = false;
    cachedBlobRef.current = null;
    getRandomVideoUrl(category).then(url => { if (!cancelled && url) setVideoSrc(url); });
    return () => { cancelled = true; };
  }, [category]);

  // IntersectionObserver — play/pause
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
      if (videoRef.current) {
        if (entry.isIntersecting) videoRef.current.play().catch(() => {});
        else { videoRef.current.pause(); setIsMuted(true); }
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [videoSrc]);

  const toggleAudio = useCallback(() => {
    if (videoRef.current) { videoRef.current.muted = !isMuted; setIsMuted(!isMuted); }
  }, [isMuted]);

  const handleWhatsAppShare = useCallback(async (e) => {
    e.stopPropagation();
    if (!user.name || !user.phone) { onNeedSignup?.(); return; }
    setSharing(true);
    const caption = `🙏 *${user.name}* ने आपके लिए यह भेजा —\n\n✨ _${vcQ.q.replace(/\n/g, ' ')}_\n\n🪔 *वंदन* — परिवार को हर रोज़ सुंदर कार्ड भेजें\n👉 https://vandan-app.vercel.app`;
    try {
      const blob = cachedBlobRef.current || (videoSrc ? await fetch(videoSrc).then(r => r.blob()) : null);
      if (blob) cachedBlobRef.current = blob;
      if (blob && navigator.share) {
        const file = new File([blob], `vandan-${category}-${Date.now()}.mp4`, { type: 'video/mp4' });
        await navigator.share({ files: [file], text: caption });
        setSharing(false); return;
      }
    } catch (err) { if (err.name === 'AbortError') { setSharing(false); return; } }
    window.open(`https://wa.me/?text=${encodeURIComponent(caption)}`, '_blank');
    setSharing(false);
  }, [user.name, user.phone, videoSrc, category, vcQ, onNeedSignup]);

  const handleDownload = useCallback(async (e) => {
    e.stopPropagation();
    if (!user.name || !user.phone) { onNeedSignup?.(); return; }
    setDownloading(true);
    try {
      const blob = cachedBlobRef.current || (videoSrc ? await fetch(videoSrc).then(r => r.blob()) : null);
      if (blob) {
        cachedBlobRef.current = blob;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = `vandan-${category}-${Date.now()}.mp4`;
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (err) { console.error(err); }
    setDownloading(false);
  }, [user.name, user.phone, videoSrc, category, onNeedSignup]);

  return (
    <div className="cu" ref={cardRef}>
      <div className="card card--video">
        <div className="card__live-ring" />

        {videoSrc && isVisible ? (
          <>
            <video
              ref={videoRef}
              src={videoSrc}
              autoPlay muted={isMuted} loop playsInline preload="metadata"
              onWaiting={() => setVideoLoading(true)}
              onPlaying={() => setVideoLoading(false)}
              onCanPlay={() => setVideoLoading(false)}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit', zIndex: 1 }}
            />
            {videoLoading && (
              <div style={{ position: 'absolute', inset: 0, zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,.3)', borderRadius: 'inherit' }}>
                <div style={{ width: 32, height: 32, border: '3px solid rgba(255,255,255,.2)', borderTopColor: '#fff', borderRadius: '50%', animation: 'loader-spin .7s linear infinite' }} />
              </div>
            )}
          </>
        ) : (
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: 'inherit' }}>
            {vc.photos.map((p, i) => (
              <div key={i} className={`vc-layer vc-layer-${i + 1}`}>
                <img src={p} alt="" loading="lazy" crossOrigin="anonymous" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        )}

        {!videoSrc && (
          <>
            <div className="card__overlay" style={{ background: OVL[vc.ovl] }} />
            <div className="card__content" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
              <p className={`card__quote ${isDeva ? 'card__quote--deva' : ''} card__quote--animated`} style={{ lineHeight: 1.4 }}>
                {vcQ.q.replace(/\n/g, ' ').split(' ').filter(Boolean).map((w, i) => (
                  <span key={i} className="word" style={{ animationDelay: `${(1.8 + i * 0.22).toFixed(2)}s` }}>{w}</span>
                ))}
              </p>
            </div>
          </>
        )}

        {videoSrc && isVisible && (
          <button onClick={toggleAudio} style={{
            position: 'absolute', bottom: 90, right: 12, zIndex: 8,
            width: 40, height: 40, borderRadius: '50%',
            background: 'rgba(0,0,0,.4)', backdropFilter: 'blur(8px)',
            border: '1.5px solid rgba(255,255,255,.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            {isMuted ? (
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="rgba(255,255,255,.6)" strokeWidth="2" strokeLinecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M19.07 4.93a10 10 0 010 14.14" /><path d="M15.54 8.46a5 5 0 010 7.07" /></svg>
            )}
          </button>
        )}

        {user.name ? (
          <div className="card__strip">
            <div className="ns-photo"><div className="strip-av">
              {user.photo ? <img src={user.photo} alt="" crossOrigin="anonymous" /> : <DefaultAvatar name={user.name} size={88} />}
            </div></div>
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
