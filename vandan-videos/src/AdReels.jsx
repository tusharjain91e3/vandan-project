import React from 'react';
import {
  AbsoluteFill, Audio, Img, Sequence,
  interpolate, useCurrentFrame, useVideoConfig, spring, staticFile,
} from 'remotion';

const px = id => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1080&h=1920&fit=crop&q=85`;

// ── Animated gradient background ──
function GradientBG({ colors, speed = 1 }) {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const angle = interpolate(frame, [0, durationInFrames], [0, 360 * speed]);
  return <AbsoluteFill style={{ background: `conic-gradient(from ${angle}deg at 50% 50%, ${colors.join(', ')})`, filter: 'blur(80px)', transform: 'scale(1.5)' }} />;
}

// ── Photo BG with Ken Burns ──
function PhotoBG({ photos }) {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const dur = durationInFrames / fps;
  const seg = dur / photos.length;
  return (
    <AbsoluteFill>
      {photos.map((p, i) => {
        const s = i * seg * fps, e = (i + 1) * seg * fps;
        const fi = interpolate(frame, [s, s + fps * 0.5], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const fo = interpolate(frame, [e - fps * 0.5, e], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const sc = interpolate(frame, [s, e], [1, 1.15], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        return <AbsoluteFill key={i} style={{ opacity: Math.min(fi, fo) }}><Img src={p} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${sc})` }} /></AbsoluteFill>;
      })}
    </AbsoluteFill>
  );
}

// ── Bold animated text ──
function T({ children, d = 0, s = 80, c = '#fff', e = 'pop', style = {} }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - d * fps, fps, config: { damping: 9, stiffness: 100, mass: 0.7 } });
  let tx = '';
  if (e === 'pop') tx = `scale(${interpolate(p, [0, 1], [0, 1])}) rotate(${interpolate(p, [0, 1], [-5, 0])}deg)`;
  if (e === 'left') tx = `translateX(${interpolate(p, [0, 1], [-400, 0])}px)`;
  if (e === 'right') tx = `translateX(${interpolate(p, [0, 1], [400, 0])}px)`;
  if (e === 'up') tx = `translateY(${interpolate(p, [0, 1], [100, 0])}px)`;
  if (e === 'drop') tx = `translateY(${interpolate(p, [0, 1], [-200, 0])}px) scale(${interpolate(p, [0, 1], [1.3, 1])})`;
  return (
    <div style={{
      fontSize: s, fontWeight: 900, color: c, textAlign: 'center', lineHeight: 1.1,
      opacity: interpolate(p, [0, 1], [0, 1]), transform: tx, padding: '0 32px',
      textShadow: '0 6px 40px rgba(0,0,0,.9), 0 2px 8px rgba(0,0,0,.6)',
      fontFamily: "'Tiro Devanagari Hindi', serif", whiteSpace: 'pre-line',
      ...style,
    }}>{children}</div>
  );
}

// ── Feature pill with glow ──
function Pill({ emoji, text, d = 0, glow = false }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - d * fps, fps, config: { damping: 10, stiffness: 80 } });
  const glowSize = glow ? (8 + Math.sin(frame * 0.15) * 4) : 0;
  return (
    <div style={{
      background: 'rgba(255,255,255,.95)', borderRadius: 100, padding: '14px 28px',
      display: 'flex', alignItems: 'center', gap: 10,
      transform: `scale(${interpolate(p, [0, 1], [0, 1])})`,
      opacity: interpolate(p, [0, 1], [0, 1]),
      boxShadow: glow ? `0 0 ${glowSize}px rgba(37,211,102,.6), 0 4px 16px rgba(0,0,0,.2)` : '0 4px 16px rgba(0,0,0,.2)',
    }}>
      <span style={{ fontSize: 22 }}>{emoji}</span>
      <span style={{ fontSize: 20, fontWeight: 800, color: '#1a0800', fontFamily: "'Outfit', sans-serif" }}>{text}</span>
    </div>
  );
}

// ── Pulsing CTA ──
function CTA({ d = 0, text = 'अभी Try करो — FREE 📲' }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - d * fps, fps, config: { damping: 8, stiffness: 50 } });
  const pulse = 1 + Math.sin(frame * 0.2) * 0.04;
  return (
    <div style={{ transform: `scale(${interpolate(p, [0, 1], [0.3, 1]) * pulse})`, opacity: interpolate(p, [0, 1], [0, 1]) }}>
      <div style={{ background: '#25D366', borderRadius: 100, padding: '20px 48px', boxShadow: '0 8px 40px rgba(37,211,102,.5), 0 0 20px rgba(37,211,102,.3)' }}>
        <span style={{ fontSize: 26, fontWeight: 900, color: '#fff', fontFamily: "'Outfit', sans-serif" }}>{text}</span>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// AD 1: Product Showcase — "3 Steps" (Clear value prop)
// Colorful gradient bg + step-by-step with icons
// ═══════════════════════════════════════════════
export function Ad1() {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill>
      <Audio src={staticFile('flute.ogg')} volume={0.4} />
      <GradientBG colors={['#FF6B00', '#C8611A', '#8B3500', '#FFB830', '#FF6B00']} speed={0.3} />
      <AbsoluteFill style={{ background: 'rgba(0,0,0,.55)' }} />

      <Sequence from={0} durationInFrames={2.5 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <T s={100} e="drop" c="#FFE84A">3 आसान Step 👇</T>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={2.5 * fps} durationInFrames={2.5 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <div style={{ fontSize: 100, opacity: 0.3 }}>1️⃣</div>
          <T s={64} e="pop">नाम डालो</T>
          <T s={28} d={0.3} e="up" c="rgba(255,255,255,.5)">अपना नाम + WhatsApp नंबर</T>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={5 * fps} durationInFrames={2.5 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <div style={{ fontSize: 100, opacity: 0.3 }}>2️⃣</div>
          <T s={64} e="pop">कार्ड चुनो</T>
          <T s={28} d={0.3} e="up" c="rgba(255,255,255,.5)">50+ वीडियो · 8 कैटेगरी</T>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={7.5 * fps} durationInFrames={2.5 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <div style={{ fontSize: 100, opacity: 0.3 }}>3️⃣</div>
          <T s={64} e="pop" c="#25D366">WhatsApp भेजो!</T>
          <T s={28} d={0.3} e="up" c="rgba(255,255,255,.5)">वीडियो + म्यूज़िक + आपका नाम</T>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={10 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <T s={72} e="pop">🪔 वंदन</T>
          <CTA d={0.4} />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
}

// ═══════════════════════════════════════════════
// AD 2: Feature Explosion — All features flying in
// Colorful pills + photo background
// ═══════════════════════════════════════════════
export function Ad2() {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill>
      <Audio src={staticFile('mohan.ogg')} volume={0.4} />
      <PhotoBG photos={[px(31072582), px(5791086), px(36478011), px(1631677)]} />
      <AbsoluteFill style={{ background: 'rgba(0,0,0,.6)' }} />

      <Sequence from={0} durationInFrames={3 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <T s={80} e="pop">एक ऐप में{'\n'}सब कुछ 🔥</T>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={3 * fps} durationInFrames={6 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
          <Pill emoji="🎬" text="वीडियो कार्ड" d={0} />
          <Pill emoji="🎵" text="इंडियन म्यूज़िक" d={0.4} />
          <Pill emoji="📛" text="आपका नाम जुड़ता है" d={0.8} />
          <Pill emoji="📲" text="WhatsApp पर सीधा भेजो" d={1.2} />
          <Pill emoji="🙏" text="गीता · भक्ति · सुप्रभात" d={1.6} />
          <Pill emoji="🆓" text="बिल्कुल FREE" d={2} glow={true} />
        </AbsoluteFill>
      </Sequence>

      <Sequence from={9.5 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <T s={72} e="pop">🪔 वंदन</T>
          <CTA d={0.3} />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
}

// ═══════════════════════════════════════════════
// AD 3: "Problem → Solution" with split screen feel
// Red (problem) → Green (solution) transition
// ═══════════════════════════════════════════════
export function Ad3() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const transition = interpolate(frame, [4.5 * fps, 5.5 * fps], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill>
      <Audio src={staticFile('bhajan.ogg')} volume={0.4} />

      {/* Problem side (red) */}
      <AbsoluteFill style={{ background: `linear-gradient(180deg, #2a0000 0%, #0a0000 100%)`, opacity: 1 - transition }} />
      {/* Solution side (golden) */}
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 40%, #2a1400 0%, #0a0400 100%)`, opacity: transition }} />

      <Sequence from={0} durationInFrames={2 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <T s={80} e="pop" c="#FF4444">😩 Problem</T>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={2 * fps} durationInFrames={2.5 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <T s={50} e="left" c="rgba(255,100,100,.8)">रोज़ वही boring</T>
          <T s={70} d={0.3} e="right">"Good Morning" 🥱</T>
          <T s={30} d={0.7} e="up" c="rgba(255,255,255,.4)">कोई नहीं पढ़ता...</T>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={5 * fps} durationInFrames={1.5 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <T s={100} e="pop" c="#25D366">✅ Solution</T>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={6.5 * fps} durationInFrames={3 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <T s={50} e="left" c="#FFE84A">अब भेजो</T>
          <T s={60} d={0.3} e="right">🎬 वीडियो + 🎵 म्यूज़िक</T>
          <T s={50} d={0.6} e="up">+ 📛 आपका नाम!</T>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={10 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <T s={72} e="pop">🪔 वंदन</T>
          <T s={30} d={0.3} e="up" c="rgba(255,255,255,.5)">माँ की खुशी का कोई मोल नहीं</T>
          <CTA d={0.6} />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
}

// ═══════════════════════════════════════════════
// AD 4: Category carousel — Show all 8 categories
// Each category pops in with its own color
// ═══════════════════════════════════════════════
export function Ad4() {
  const { fps } = useVideoConfig();
  const cats = [
    { name: 'सुप्रभात 🌅', color: '#FF8C00', bg: px(5791086) },
    { name: 'भगवद् गीता 📿', color: '#A84000', bg: px(9375018) },
    { name: 'भक्ति 🙏', color: '#6060FF', bg: px(31072582) },
    { name: 'सुविचार 💪', color: '#4090FF', bg: px(31776507) },
    { name: 'शुभ रात्रि 🌙', color: '#6030A0', bg: px(29376339) },
    { name: 'त्यौहार 🎉', color: '#FF4080', bg: px(3367460) },
    { name: 'जन्मदिन 🎂', color: '#CC00E0', bg: px(137485) },
    { name: 'कृतज्ञता 🙏', color: '#20A060', bg: px(1631677) },
  ];

  return (
    <AbsoluteFill>
      <Audio src={staticFile('santali.ogg')} volume={0.4} />
      <AbsoluteFill style={{ background: '#0a0400' }} />

      <Sequence from={0} durationInFrames={2 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <T s={76} e="pop">8 कैटेगरी 🔥{'\n'}हर मौके का कार्ड</T>
        </AbsoluteFill>
      </Sequence>

      {cats.map((cat, i) => (
        <Sequence key={i} from={(2 + i * 0.9) * fps} durationInFrames={1 * fps}>
          <AbsoluteFill>
            <Img src={cat.bg} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }} />
            <AbsoluteFill style={{ background: 'rgba(0,0,0,.6)' }} />
            <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <T s={72} e="pop" c={cat.color}>{cat.name}</T>
            </AbsoluteFill>
          </AbsoluteFill>
        </Sequence>
      ))}

      <Sequence from={10 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <T s={60} e="pop">🪔 वंदन — सब कुछ FREE</T>
          <CTA d={0.4} text="Link in bio 👆" />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
}

// ═══════════════════════════════════════════════
// AD 5: Emotional + Numbers — "माँ, पापा, दोस्त"
// Big counter + emotional + colorful gradient
// ═══════════════════════════════════════════════
export function Ad5() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const count = Math.round(interpolate(
    spring({ frame: frame - 5 * fps, fps, config: { damping: 25, stiffness: 30 } }),
    [0, 1], [0, 10000]
  ));

  return (
    <AbsoluteFill>
      <Audio src={staticFile('veena.ogg')} volume={0.45} />
      <GradientBG colors={['#C8611A', '#8B3500', '#4A1000', '#E8A040', '#C8611A']} speed={0.2} />
      <AbsoluteFill style={{ background: 'rgba(0,0,0,.5)' }} />

      <Sequence from={0} durationInFrames={2.5 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <T s={80} e="pop">किसको भेजोगे? 🤔</T>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={2.5 * fps} durationInFrames={2.5 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
          <T s={60} e="left">माँ को ❤️</T>
          <T s={60} d={0.3} e="right">पापा को 🙏</T>
          <T s={60} d={0.6} e="left">दोस्त को 🤝</T>
          <T s={60} d={0.9} e="right">पूरे परिवार को 👨‍👩‍👧‍👦</T>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={5 * fps} durationInFrames={3 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <div style={{ fontSize: 140, fontWeight: 900, color: '#FFE84A', fontFamily: "'Outfit', sans-serif", textShadow: '0 6px 60px rgba(255,232,74,.5)' }}>
            {count.toLocaleString()}+
          </div>
          <T s={44} d={0.3} e="up">लोग पहले ही भेज रहे हैं</T>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={8.5 * fps} durationInFrames={1.5 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <T s={56} e="pop" c="rgba(255,255,255,.7)">आप कब शुरू कर रहे हो?</T>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={10 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <T s={72} e="pop">🪔 वंदन</T>
          <CTA d={0.3} />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
}
