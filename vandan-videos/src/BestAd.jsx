import React from 'react';
import {
  AbsoluteFill, Img, Sequence, staticFile,
  interpolate, useCurrentFrame, useVideoConfig, spring,
} from 'remotion';

const px = id => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=600&h=750&fit=crop&q=85`;

// ── Big text ──
function T({ children, d = 0, s = 90, c = '#fff', e = 'pop' }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - d * fps, fps, config: { damping: 9, stiffness: 90, mass: 0.6 } });
  let tx = '';
  if (e === 'pop') tx = `scale(${interpolate(p, [0, 1], [0.15, 1])})`;
  if (e === 'slam') tx = `scale(${interpolate(p, [0, 1], [3, 1])})`;
  if (e === 'up') tx = `translateY(${interpolate(p, [0, 1], [100, 0])}px)`;
  if (e === 'left') tx = `translateX(${interpolate(p, [0, 1], [-400, 0])}px)`;
  if (e === 'right') tx = `translateX(${interpolate(p, [0, 1], [400, 0])}px)`;
  return (
    <div style={{
      fontSize: s, fontWeight: 900, color: c, textAlign: 'center', lineHeight: 1.05,
      opacity: interpolate(p, [0, 1], [0, 1]), transform: tx, padding: '0 28px',
      fontFamily: "'Tiro Devanagari Hindi', serif", whiteSpace: 'pre-line',
    }}>{children}</div>
  );
}

// ── Full-screen card ──
function BigCard({ photo, quote, name, d = 0 }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - d * fps, fps, config: { damping: 10, stiffness: 80 } });
  const float = Math.sin(frame * 0.05) * 5;
  return (
    <div style={{
      width: 580, height: 725, borderRadius: 28, overflow: 'hidden', position: 'relative',
      boxShadow: '0 30px 80px rgba(0,0,0,.7), 0 0 0 3px rgba(255,200,100,.2)',
      transform: `scale(${interpolate(p, [0, 1], [0.2, 1])}) translateY(${float}px)`,
      opacity: interpolate(p, [0, 1], [0, 1]),
    }}>
      <Img src={photo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(0,0,0,.2) 0%,transparent 30%,rgba(0,0,0,.75) 100%)' }} />
      <div style={{ position: 'absolute', bottom: 90, left: 0, right: 0, textAlign: 'center', padding: '0 24px' }}>
        <div style={{ fontSize: 42, fontWeight: 700, color: '#FFF8EE', fontFamily: "'Tiro Devanagari Hindi', serif", textShadow: '0 3px 20px rgba(0,0,0,.9)', lineHeight: 1.3 }}>{quote}</div>
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, background: 'rgba(255,249,240,.96)', display: 'flex', alignItems: 'center', padding: '0 18px', gap: 12 }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg,#C8611A,#8B3500)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 3px #FFF9F0, 0 0 0 6px rgba(200,97,26,.2)', flexShrink: 0 }}>
          <span style={{ color: '#FFF8EE', fontSize: 24, fontWeight: 700 }}>{name[0]}</span>
        </div>
        <span style={{ fontSize: 30, fontWeight: 800, color: '#2B1810', fontFamily: "'Tiro Devanagari Hindi', serif" }}>{name}</span>
      </div>
    </div>
  );
}

// ── Instagram profile mockup ──
function IGProfile({ d = 0 }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - d * fps, fps, config: { damping: 14, stiffness: 70 } });
  const arrowBounce = Math.sin(frame * 0.3) * 8;

  return (
    <div style={{
      width: '92%', background: '#1a1a2e', borderRadius: 24, padding: '24px 20px',
      boxShadow: '0 20px 60px rgba(0,0,0,.6)',
      transform: `scale(${interpolate(p, [0, 1], [0.5, 1])}) translateY(${interpolate(p, [0, 1], [60, 0])}px)`,
      opacity: interpolate(p, [0, 1], [0, 1]),
    }}>
      {/* Profile header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
        {/* Avatar */}
        <div style={{ width: 70, height: 70, borderRadius: '50%', background: 'linear-gradient(135deg, #C8611A, #8B3500)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 3px #333', flexShrink: 0 }}>
          <span style={{ fontSize: 28, fontWeight: 700, color: '#FFF8EE', fontFamily: "'Tiro Devanagari Hindi', serif" }}>वंदन</span>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', fontFamily: "'Outfit', sans-serif" }}>Vandan poster</div>
          <div style={{ display: 'flex', gap: 20, marginTop: 8 }}>
            {[['14', 'posts'], ['14', 'followers'], ['99', 'following']].map(([n, l], i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#fff', fontFamily: "'Outfit', sans-serif" }}>{n}</div>
                <div style={{ fontSize: 11, color: '#888', fontFamily: "'Outfit', sans-serif" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bio */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 16, color: '#fff', fontFamily: "'Tiro Devanagari Hindi', serif", lineHeight: 1.6 }}>
          🪔 वंदन — Vandan{'\n'}
          परिवार को हर रोज़ सुंदर कार्ड भेजें{'\n'}
          🎬 वीडियो · 🎵 म्यूज़िक · 📛 आपका नाम{'\n'}
          ✨ 100+ कार्ड · 6 भाषाएं · FREE
        </div>
      </div>

      {/* Link — highlighted */}
      <div style={{
        background: 'rgba(37,211,102,.15)', border: '2px solid #25D366', borderRadius: 12,
        padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 8,
        position: 'relative',
      }}>
        <span style={{ fontSize: 18 }}>🔗</span>
        <span style={{ fontSize: 18, fontWeight: 700, color: '#25D366', fontFamily: "'Outfit', sans-serif" }}>vandan-app.vercel.app</span>

        {/* Animated arrow pointing to link */}
        <div style={{
          position: 'absolute', right: -20, top: -50,
          transform: `translateY(${arrowBounce}px)`,
          fontSize: 40,
        }}>👆</div>
      </div>

      {/* "Click here" label */}
      <div style={{
        textAlign: 'center', marginTop: 12,
        fontSize: 20, fontWeight: 800, color: '#FFE84A', fontFamily: "'Outfit', sans-serif",
        letterSpacing: 1,
      }}>
        ↑ यहाँ क्लिक करो · CLICK HERE ↑
      </div>
    </div>
  );
}

// ── Real Instagram profile screenshot with animated pointer ──
function RealIGProfile({ d = 0 }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - d * fps, fps, config: { damping: 14, stiffness: 70 } });
  const bounce = Math.sin(frame * 0.3) * 10;

  return (
    <div style={{
      position: 'relative', width: '92%',
      transform: `scale(${interpolate(p, [0, 1], [0.5, 1])}) translateY(${interpolate(p, [0, 1], [60, 0])}px)`,
      opacity: interpolate(p, [0, 1], [0, 1]),
    }}>
      {/* Real screenshot */}
      <Img src={staticFile('ig-profile.png')} style={{
        width: '100%', borderRadius: 24,
        boxShadow: '0 20px 60px rgba(0,0,0,.6)',
      }} />

      {/* Glowing border around the link area */}
      <div style={{
        position: 'absolute', bottom: '8%', left: '5%', right: '5%', height: '8%',
        border: '3px solid #25D366', borderRadius: 12,
        boxShadow: `0 0 ${12 + Math.sin(frame * 0.2) * 6}px rgba(37,211,102,.6)`,
        animation: 'none',
      }} />

      {/* Bouncing arrow */}
      <div style={{
        position: 'absolute', right: 30, bottom: '18%',
        transform: `translateY(${bounce}px)`,
        fontSize: 50, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,.5))',
      }}>👆</div>

      {/* Click here label */}
      <div style={{
        position: 'absolute', bottom: -50, left: 0, right: 0, textAlign: 'center',
        fontSize: 28, fontWeight: 800, color: '#FFE84A', fontFamily: "'Outfit', sans-serif",
      }}>
        ↑ CLICK HERE · यहाँ क्लिक करो ↑
      </div>
    </div>
  );
}

export default function BestAd() {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 30%, #1a0a00 0%, #000 80%)' }} />

      {/* Scene 1: Hook (0-2s) */}
      <Sequence from={0} durationInFrames={2 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <T s={110} e="slam" c="#FFE84A">रुको! ⛔{'\n'}ये देखो</T>
        </AbsoluteFill>
      </Sequence>

      {/* Scene 2-6: Cards carousel — each card gets full screen (2-12s) */}
      <Sequence from={2 * fps} durationInFrames={2 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <BigCard photo={px(31072582)} quote="महादेव साथ हैं 🔱" name="आपका नाम" d={0} />
        </AbsoluteFill>
      </Sequence>

      <Sequence from={4 * fps} durationInFrames={2 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <BigCard photo={px(5791086)} quote="सुप्रभात 🌅" name="आपका नाम" d={0} />
        </AbsoluteFill>
      </Sequence>

      <Sequence from={6 * fps} durationInFrames={2 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <BigCard photo={px(9375018)} quote="जय श्री कृष्ण 🦚" name="आपका नाम" d={0} />
        </AbsoluteFill>
      </Sequence>

      <Sequence from={8 * fps} durationInFrames={2 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <BigCard photo={px(1631677)} quote="शुक्रगुज़ार रहो 🙏" name="आपका नाम" d={0} />
        </AbsoluteFill>
      </Sequence>

      <Sequence from={10 * fps} durationInFrames={2 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <BigCard photo={px(3367460)} quote="शुभ दीपावली 🪔" name="आपका नाम" d={0} />
        </AbsoluteFill>
      </Sequence>

      {/* Scene 7: Value prop (12-14s) */}
      <Sequence from={12 * fps} durationInFrames={2.5 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
          <T s={64} e="pop" c="#FFE84A">🎬 वीडियो + 🎵 म्यूज़िक</T>
          <T s={64} d={0.3} e="pop">📛 आपका नाम</T>
          <T s={44} d={0.7} e="up" c="rgba(255,255,255,.5)">बिल्कुल FREE — मुफ़्त</T>
        </AbsoluteFill>
      </Sequence>

      {/* Scene 8: Real Instagram profile screenshot with animated arrow (14.5-20s) */}
      <Sequence from={14.5 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <T s={44} e="up" c="rgba(255,255,255,.6)">यहाँ से बनाओ 👇</T>
          <RealIGProfile d={0.3} />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
}
