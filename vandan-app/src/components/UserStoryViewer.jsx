import { useState, useEffect, useRef } from 'react';

const STORY_DURATION = 5000;

export default function UserStoryViewer({ stories, startIndex = 0, isOpen, onClose }) {
  const [current, setCurrent] = useState(startIndex);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => { if (isOpen) setCurrent(startIndex); }, [isOpen, startIndex]);

  useEffect(() => {
    if (!isOpen || !stories[current]) return;
    if (stories[current].isVideo) return;
    setProgress(0);
    const start = Date.now();
    const id = setInterval(() => {
      const p = (Date.now() - start) / STORY_DURATION;
      setProgress(Math.min(1, p));
      if (p >= 1) { clearInterval(id); goNext(); }
    }, 50);
    return () => clearInterval(id);
  }, [isOpen, current]);

  const goNext = () => { if (current < stories.length - 1) setCurrent(c => c + 1); else onClose(); };
  const goPrev = () => { if (current > 0) setCurrent(c => c - 1); };

  if (!isOpen || !stories.length) return null;
  const s = stories[current];

  return (
    <div className="story-modal">
      {/* Progress */}
      <div className="story-modal__progress">
        {stories.map((_, i) => (
          <div key={i} className="story-modal__bar">
            <div className={`story-modal__bar-fill${i < current ? ' story-modal__bar-fill--done' : ''}`}
              style={i === current ? { width: `${progress * 100}%` } : undefined} />
          </div>
        ))}
      </div>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 16px 10px', zIndex: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(255,255,255,.4)', background: 'linear-gradient(135deg,#C8611A,#8B3500)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ color: '#fff', fontSize: 16, fontWeight: 700 }}>{(s.name || '?')[0]}</span>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--deva)', fontSize: 18, fontWeight: 700, color: '#fff' }}>{s.name}</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,.5)' }}>ने स्टोरी शेयर की</div>
        </div>
        <button onClick={onClose} style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,.1)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        </button>
      </div>

      {/* Full-screen content — no card frame */}
      <div style={{ flex: 1, position: 'relative' }} onClick={goNext}>
        {/* Tap left to go back */}
        <div onClick={e => { e.stopPropagation(); goPrev(); }} style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '30%', zIndex: 5 }} />

        {s.isVideo ? (
          <video
            ref={videoRef}
            src={s.videoUrl}
            autoPlay playsInline
            onTimeUpdate={() => { if (videoRef.current) setProgress(videoRef.current.currentTime / (videoRef.current.duration || 1)); }}
            onEnded={goNext}
            style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#000' }}
          />
        ) : (
          <img src={s.photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#000' }} />
        )}

        {/* Name at bottom */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 6,
          background: 'linear-gradient(transparent, rgba(0,0,0,.7))',
          padding: '40px 20px 16px', textAlign: 'center',
        }}>
          <div style={{ fontFamily: 'var(--deva)', fontSize: 20, fontWeight: 700, color: '#fff' }}>{s.name}</div>
        </div>
      </div>
    </div>
  );
}
