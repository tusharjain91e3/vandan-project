import React from 'react';
import {
  AbsoluteFill, Audio, Img, Sequence,
  interpolate, useCurrentFrame, useVideoConfig, spring, staticFile,
} from 'remotion';

const px = id => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1080&h=1920&fit=crop&q=85`;

// ── Animated BG with photo crossfade ──
function BG({ photos }) {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const dur = durationInFrames / fps;
  const seg = dur / photos.length;

  return (
    <AbsoluteFill>
      {photos.map((p, i) => {
        const s = i * seg * fps, e = (i + 1) * seg * fps;
        const fadeIn = interpolate(frame, [s, s + fps * 0.4], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const fadeOut = interpolate(frame, [e - fps * 0.4, e], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const scale = interpolate(frame, [s, e], [1, 1.12], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const origins = ['40% 60%', '60% 30%', '50% 70%', '30% 50%'];
        return (
          <AbsoluteFill key={i} style={{ opacity: Math.min(fadeIn, fadeOut) }}>
            <Img src={p} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${scale})`, transformOrigin: origins[i % 4] }} />
          </AbsoluteFill>
        );
      })}
      <AbsoluteFill style={{ background: 'linear-gradient(180deg,rgba(0,0,0,.55) 0%,rgba(0,0,0,.1) 35%,rgba(0,0,0,.65) 100%)' }} />
    </AbsoluteFill>
  );
}

// ── Big bold text ──
function Big({ children, delay = 0, size = 96, color = '#FFF8EE', effect = 'scale' }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay * fps, fps, config: { damping: 10, stiffness: 90 } });
  let tx = '';
  if (effect === 'scale') tx = `scale(${interpolate(p, [0, 1], [0.2, 1])})`;
  if (effect === 'left') tx = `translateX(${interpolate(p, [0, 1], [-300, 0])}px)`;
  if (effect === 'right') tx = `translateX(${interpolate(p, [0, 1], [300, 0])}px)`;
  if (effect === 'up') tx = `translateY(${interpolate(p, [0, 1], [100, 0])}px)`;

  return (
    <div style={{
      fontSize: size, fontWeight: 900, color, textAlign: 'center', lineHeight: 1.1,
      opacity: interpolate(p, [0, 1], [0, 1]), transform: tx, padding: '0 40px',
      textShadow: '0 6px 50px rgba(0,0,0,1), 0 3px 12px rgba(0,0,0,.8)',
      fontFamily: "'Tiro Devanagari Hindi', serif",
    }}>{children}</div>
  );
}

// ── Pulsing CTA ──
function CTA({ delay = 0 }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay * fps, fps, config: { damping: 8, stiffness: 60 } });
  const pulse = 1 + Math.sin(frame * 0.18) * 0.04;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, opacity: interpolate(p, [0, 1], [0, 1]), transform: `scale(${interpolate(p, [0, 1], [0.5, 1]) * pulse})` }}>
      <div style={{ background: '#25D366', borderRadius: 100, padding: '18px 44px', boxShadow: '0 6px 30px rgba(37,211,102,.5)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 26, fontWeight: 800, color: '#fff', fontFamily: "'Outfit', sans-serif" }}>अभी Download करो</span>
      </div>
      <span style={{ fontSize: 16, color: 'rgba(255,248,238,.5)', fontFamily: "'Outfit', sans-serif" }}>FREE · Link in bio 👆</span>
    </div>
  );
}

// ═══════════════════════════════════════
// REEL 1: "माँ को भेजो" — EMOTIONAL (best performer for Indian audience)
// Strategy: Guilt → Action → Solution
// ═══════════════════════════════════════
export function Reel1() {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill>
      <Audio src={staticFile('bhajan.ogg')} volume={0.45} />
      <BG photos={[px(31072582), px(9375018), px(1631677), px(5791086)]} />
      <Sequence from={0} durationInFrames={3 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Big size={110} effect="scale">माँ को कब{'\n'}भेजा? 🥺</Big>
        </AbsoluteFill>
      </Sequence>
      <Sequence from={3 * fps} durationInFrames={2.5 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Big size={80} effect="left" color="rgba(255,235,185,.8)">Good Morning?{'\n'}याद नहीं ना?</Big>
        </AbsoluteFill>
      </Sequence>
      <Sequence from={5.5 * fps} durationInFrames={3 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
          <Big size={70} effect="right" color="#FFE84A">अब भेजो</Big>
          <Big size={90} delay={0.4} effect="scale">🪔 वंदन कार्ड</Big>
          <Big size={36} delay={0.8} effect="up" color="rgba(255,235,185,.6)">अपने नाम के साथ</Big>
        </AbsoluteFill>
      </Sequence>
      <Sequence from={9 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CTA />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
}

// ═══════════════════════════════════════
// REEL 2: Krishna quote — DEVOTIONAL (high save/share rate)
// Strategy: Beautiful quote → Emotional → CTA
// ═══════════════════════════════════════
export function Reel2() {
  const { fps } = useVideoConfig();
  const GITA = [
    `https://upload.wikimedia.org/wikipedia/commons/2/2a/Arjuna_and_Krishna_at_the_Mahabharata_war%2C_Bhagavad_Gita%2C_Kurukshetra%2C_Haryana.jpg`,
    `https://upload.wikimedia.org/wikipedia/commons/3/38/Arjuna_chooses_Krishna.jpg`,
    `https://upload.wikimedia.org/wikipedia/commons/5/5d/Krishna_persuade_Arjuna_for_battle_or_Tell_Gita.jpg`,
  ];
  return (
    <AbsoluteFill>
      <Audio src={staticFile('veena.ogg')} volume={0.5} />
      <BG photos={GITA} />
      <Sequence from={0} durationInFrames={4 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Big size={80} effect="scale">कर्म करो{'\n'}फल की चिंता{'\n'}मत करो</Big>
        </AbsoluteFill>
      </Sequence>
      <Sequence from={4 * fps} durationInFrames={3 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          <Big size={40} effect="up" color="rgba(255,235,185,.6)">— श्रीमद् भगवद् गीता</Big>
          <div style={{ height: 20 }} />
          <Big size={50} delay={0.5} effect="left" color="#FFE84A">ऐसे 50+ वीडियो कार्ड</Big>
        </AbsoluteFill>
      </Sequence>
      <Sequence from={7.5 * fps} durationInFrames={2 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <Big size={56} effect="scale">🪔 वंदन</Big>
          <Big size={32} delay={0.3} effect="up" color="rgba(255,235,185,.6)">अपने नाम के साथ भेजो</Big>
        </AbsoluteFill>
      </Sequence>
      <Sequence from={10 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CTA />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
}

// ═══════════════════════════════════════
// REEL 3: "ये ऐप VIRAL हो रहा" — FOMO/Social proof
// Strategy: Urgency → Numbers → CTA
// ═══════════════════════════════════════
export function Reel3() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const countP = spring({ frame: frame - 3 * fps, fps, config: { damping: 20, stiffness: 40 } });
  const count = Math.round(interpolate(countP, [0, 1], [0, 10000]));

  return (
    <AbsoluteFill>
      <Audio src={staticFile('mohan.ogg')} volume={0.4} />
      <BG photos={[px(36478011), px(34095708), px(31072582), px(5791086)]} />
      <Sequence from={0} durationInFrames={3 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Big size={90} effect="scale">ये ऐप 🔥{'\n'}VIRAL हो रहा!</Big>
        </AbsoluteFill>
      </Sequence>
      <Sequence from={3 * fps} durationInFrames={3.5 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <div style={{ fontSize: 130, fontWeight: 900, color: '#FFE84A', fontFamily: "'Outfit', sans-serif", textShadow: '0 6px 60px rgba(255,232,74,.4)' }}>{count.toLocaleString()}+</div>
          <Big size={56} delay={0.5} effect="up">लोग जुड़ चुके हैं</Big>
        </AbsoluteFill>
      </Sequence>
      <Sequence from={7 * fps} durationInFrames={2.5 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Big size={80} effect="left">आप कब{'\n'}जुड़ रहे हो? 👀</Big>
        </AbsoluteFill>
      </Sequence>
      <Sequence from={10 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CTA />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
}

// ═══════════════════════════════════════
// REEL 4: Mahadev — DEVOTIONAL (massive Indian audience)
// Strategy: God quote → Powerful emotion → CTA
// ═══════════════════════════════════════
export function Reel4() {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill>
      <Audio src={staticFile('classical.ogg')} volume={0.45} />
      <BG photos={[px(36885017), px(31942685), px(28300438), px(29511741)]} />
      <Sequence from={0} durationInFrames={3.5 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Big size={90} effect="scale">महादेव{'\n'}साथ हैं 🔱</Big>
        </AbsoluteFill>
      </Sequence>
      <Sequence from={3.5 * fps} durationInFrames={3 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Big size={76} effect="right">तो डर{'\n'}किस बात का</Big>
        </AbsoluteFill>
      </Sequence>
      <Sequence from={7 * fps} durationInFrames={2.5 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <Big size={48} effect="up" color="#FFE84A">ऐसे भक्ति वीडियो भेजो</Big>
          <Big size={64} delay={0.4} effect="scale">🪔 वंदन</Big>
        </AbsoluteFill>
      </Sequence>
      <Sequence from={10 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CTA />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
}

// ═══════════════════════════════════════
// REEL 5: Before/After — TRANSFORMATION (high completion rate)
// Strategy: Boring → Amazing → CTA
// ═══════════════════════════════════════
export function Reel5() {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill>
      <Audio src={staticFile('flute.ogg')} volume={0.45} />
      <BG photos={[px(33770430), px(16125405), px(35742994), px(1631677)]} />
      <Sequence from={0} durationInFrames={3 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          <Big size={50} effect="up" color="rgba(255,255,255,.5)">पहले 👇</Big>
          <Big size={80} effect="scale">"Good Morning"{'\n'}😒 बोरिंग</Big>
        </AbsoluteFill>
      </Sequence>
      <Sequence from={3 * fps} durationInFrames={1.5 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Big size={130} effect="scale" color="#FFE84A">⚡</Big>
        </AbsoluteFill>
      </Sequence>
      <Sequence from={4.5 * fps} durationInFrames={3.5 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          <Big size={50} effect="up" color="#FFE84A">अब 👇</Big>
          <Big size={72} effect="scale">🎬 वीडियो कार्ड{'\n'}🎵 म्यूज़िक{'\n'}📛 आपका नाम</Big>
        </AbsoluteFill>
      </Sequence>
      <Sequence from={8.5 * fps} durationInFrames={1 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Big size={64} effect="scale">🪔 वंदन</Big>
        </AbsoluteFill>
      </Sequence>
      <Sequence from={10 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CTA />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
}
