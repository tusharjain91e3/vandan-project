import React from 'react';
import {
  AbsoluteFill, Audio, Img, Sequence,
  interpolate, useCurrentFrame, useVideoConfig, spring, staticFile,
} from 'remotion';

const px = id => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1080&h=1920&fit=crop&q=85`;

// ── Animated background with Ken Burns + cross-fade ──
function AnimatedBG({ photos, duration }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const segDur = duration / photos.length;

  return (
    <AbsoluteFill>
      {photos.map((photo, i) => {
        const startFrame = i * segDur * fps;
        const endFrame = (i + 1) * segDur * fps;
        const fadeIn = interpolate(frame, [startFrame, startFrame + fps * 0.5], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const fadeOut = interpolate(frame, [endFrame - fps * 0.5, endFrame], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const opacity = Math.min(fadeIn, fadeOut);
        const scale = interpolate(frame, [startFrame, endFrame], [1, 1.15], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const origins = ['40% 60%', '60% 30%', '50% 70%', '30% 40%', '70% 50%'];

        return (
          <AbsoluteFill key={i} style={{ opacity }}>
            <Img src={photo} style={{
              width: '100%', height: '100%', objectFit: 'cover',
              transform: `scale(${scale})`, transformOrigin: origins[i % 5],
            }} />
          </AbsoluteFill>
        );
      })}
      {/* Dark overlay */}
      <AbsoluteFill style={{ background: 'linear-gradient(180deg,rgba(0,0,0,.6) 0%,rgba(0,0,0,.15) 40%,rgba(0,0,0,.7) 100%)' }} />
    </AbsoluteFill>
  );
}

// ── Kinetic text — flies in with scale + bounce ──
function KineticText({ children, delay = 0, size = 100, color = '#FFF8EE', effect = 'scaleUp' }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay * fps, fps, config: { damping: 10, stiffness: 100, mass: 0.8 } });

  let transform = '';
  if (effect === 'scaleUp') transform = `scale(${interpolate(p, [0, 1], [0.2, 1])})`;
  if (effect === 'slideLeft') transform = `translateX(${interpolate(p, [0, 1], [-400, 0])}px)`;
  if (effect === 'slideRight') transform = `translateX(${interpolate(p, [0, 1], [400, 0])}px)`;
  if (effect === 'slideUp') transform = `translateY(${interpolate(p, [0, 1], [200, 0])}px)`;
  if (effect === 'rotate') transform = `rotate(${interpolate(p, [0, 1], [-10, 0])}deg) scale(${interpolate(p, [0, 1], [0.5, 1])})`;

  return (
    <div style={{
      fontSize: size, fontWeight: 900, color,
      textShadow: '0 6px 50px rgba(0,0,0,1), 0 3px 12px rgba(0,0,0,.8), 0 0 80px rgba(0,0,0,.5)',
      lineHeight: 1.15, textAlign: 'center',
      opacity: interpolate(p, [0, 1], [0, 1]),
      transform,
      fontFamily: "'Tiro Devanagari Hindi', serif",
      padding: '0 30px',
      WebkitTextStroke: '1px rgba(0,0,0,.15)',
    }}>
      {children}
    </div>
  );
}

// ── Glowing pill badge ──
function GlowPill({ text, delay = 0 }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay * fps, fps, config: { damping: 12, stiffness: 80 } });
  const glow = Math.sin(frame * 0.12) * 8 + 20;

  return (
    <div style={{
      background: 'rgba(255,249,240,.95)', borderRadius: 100,
      padding: '16px 36px', display: 'inline-flex', alignItems: 'center', gap: 10,
      transform: `scale(${interpolate(p, [0, 1], [0, 1])})`,
      opacity: interpolate(p, [0, 1], [0, 1]),
      boxShadow: `0 0 ${glow}px rgba(200,97,26,.4), 0 4px 20px rgba(0,0,0,.3)`,
    }}>
      <span style={{ fontSize: 22 }}>🪔</span>
      <span style={{ fontSize: 24, fontWeight: 800, color: '#2B1810', fontFamily: "'Outfit', sans-serif" }}>{text}</span>
    </div>
  );
}

// ── CTA with pulse ──
function PulseCTA({ delay = 0 }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay * fps, fps, config: { damping: 8, stiffness: 60 } });
  const pulse = 1 + Math.sin(frame * 0.2) * 0.04;

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
      opacity: interpolate(p, [0, 1], [0, 1]),
      transform: `scale(${interpolate(p, [0, 1], [0.5, 1]) * pulse})`,
    }}>
      <div style={{
        background: '#25D366', borderRadius: 100, padding: '18px 44px',
        display: 'flex', alignItems: 'center', gap: 12,
        boxShadow: '0 6px 30px rgba(37,211,102,.5)',
      }}>
        <span style={{ fontSize: 24, fontWeight: 800, color: '#fff', fontFamily: "'Outfit', sans-serif" }}>
          अभी Download करो 📲
        </span>
      </div>
      <span style={{ fontSize: 18, color: 'rgba(255,248,238,.6)', fontFamily: "'Outfit', sans-serif" }}>
        बिल्कुल मुफ़्त ✨
      </span>
    </div>
  );
}

// ═══════════════════════════════════════
// 5 VIRAL REEL VARIANTS
// ═══════════════════════════════════════

// Photos for backgrounds — diverse, high-energy
const TEMPLE = [px(31072582), px(9375018), px(36885017), px(36478011), px(34095708)];
const SUNRISE = [px(5791086), px(33770430), px(16125405), px(35742994), px(31403073)];
const FAMILY = [px(1631677), px(4050369), px(3280130), px(1684187), px(1040491)];
const NIGHT = [px(29376339), px(2908971), px(813269), px(7554582), px(37120321)];
const MOTIV = [px(31776507), px(1635594), px(34271582), px(33638021), px(16657999)];

export default function ViralReel({ variant = 1, music }) {
  const { fps, durationInFrames } = useVideoConfig();
  const duration = durationInFrames / fps;

  const photos = [TEMPLE, SUNRISE, FAMILY, NIGHT, MOTIV][variant - 1] || SUNRISE;

  return (
    <AbsoluteFill style={{ background: '#000' }}>
      {music && <Audio src={staticFile(music)} volume={0.5} />}
      <AnimatedBG photos={photos} duration={duration} />

      {variant === 1 && <V1 />}
      {variant === 2 && <V2 />}
      {variant === 3 && <V3 />}
      {variant === 4 && <V4 />}
      {variant === 5 && <V5 />}
    </AbsoluteFill>
  );
}

// V1: "रुको!" — Pattern interrupt, BIG text
function V1() {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Sequence from={0} durationInFrames={2.5 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <KineticText size={140} effect="scaleUp">⛔ रुको!</KineticText>
        </AbsoluteFill>
      </Sequence>
      <Sequence from={2.5 * fps} durationInFrames={3 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <KineticText size={80} effect="slideLeft">वही पुराने&#10;Good Morning? 😴</KineticText>
        </AbsoluteFill>
      </Sequence>
      <Sequence from={5.5 * fps} durationInFrames={3 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 30 }}>
          <KineticText size={72} effect="rotate" color="#FFE84A">अब भेजो</KineticText>
          <KineticText size={100} delay={0.4} effect="scaleUp">🪔 वंदन</KineticText>
        </AbsoluteFill>
      </Sequence>
      <Sequence from={9 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <PulseCTA />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
}

// V2: "माँ को कब भेजा?" — Emotional, BIG
function V2() {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Sequence from={0} durationInFrames={3.5 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <KineticText size={80} effect="slideUp">माँ को कब भेजा&#10;Good Morning?</KineticText>
        </AbsoluteFill>
      </Sequence>
      <Sequence from={3.5 * fps} durationInFrames={2.5 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <KineticText size={90} effect="scaleUp" color="rgba(255,235,185,.8)">याद नहीं ना? 🥺</KineticText>
        </AbsoluteFill>
      </Sequence>
      <Sequence from={6 * fps} durationInFrames={3 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
          <KineticText size={80} effect="slideLeft" color="#FFE84A">अभी भेजो</KineticText>
          <KineticText size={64} delay={0.4} effect="slideRight">🪔 वंदन कार्ड</KineticText>
        </AbsoluteFill>
      </Sequence>
      <Sequence from={9.5 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <PulseCTA />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
}

// V3: Feature rapid fire — ONE feature per screen, BIG
function V3() {
  const { fps } = useVideoConfig();
  const features = [
    { text: '🎬 वीडियो कार्ड', effect: 'slideLeft' },
    { text: '🎵 म्यूज़िक', effect: 'slideRight' },
    { text: '📛 आपका नाम', effect: 'scaleUp' },
    { text: '📲 WhatsApp भेजो', effect: 'slideLeft' },
    { text: '🆓 FREE!', effect: 'scaleUp' },
  ];

  return (
    <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Sequence from={0} durationInFrames={2 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <KineticText size={100} effect="scaleUp">ये ऐप 🔥&#10;कमाल है!</KineticText>
        </AbsoluteFill>
      </Sequence>
      {features.map((f, i) => (
        <Sequence key={i} from={(2 + i * 1.5) * fps} durationInFrames={1.5 * fps}>
          <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <KineticText size={88} effect={f.effect}>{f.text}</KineticText>
          </AbsoluteFill>
        </Sequence>
      ))}
      <Sequence from={10 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <PulseCTA />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
}

// V4: Before/After — BIG contrast
function V4() {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Sequence from={0} durationInFrames={3 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <KineticText size={56} effect="slideUp" color="rgba(255,255,255,.5)">पहले 👇</KineticText>
          <KineticText size={80} effect="scaleUp">"Good Morning" 😒</KineticText>
        </AbsoluteFill>
      </Sequence>
      <Sequence from={3 * fps} durationInFrames={2 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <KineticText size={130} effect="scaleUp" color="#FFE84A">VS</KineticText>
        </AbsoluteFill>
      </Sequence>
      <Sequence from={5 * fps} durationInFrames={3.5 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <KineticText size={56} effect="slideUp" color="#FFE84A">अब 👇</KineticText>
          <KineticText size={76} effect="rotate">🎬 वीडियो +&#10;🎵 म्यूज़िक +&#10;📛 नाम</KineticText>
        </AbsoluteFill>
      </Sequence>
      <Sequence from={9 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <PulseCTA />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
}

// V5: Social proof — HUGE counter
function V5() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const countProgress = spring({ frame: frame - 3 * fps, fps, config: { damping: 20, stiffness: 40 } });
  const count = Math.round(interpolate(countProgress, [0, 1], [0, 10000]));

  return (
    <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Sequence from={0} durationInFrames={3 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <KineticText size={88} effect="scaleUp">क्या आप&#10;जानते हैं? 🤔</KineticText>
        </AbsoluteFill>
      </Sequence>
      <Sequence from={3 * fps} durationInFrames={4 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <div style={{
            fontSize: 140, fontWeight: 900, color: '#FFE84A',
            fontFamily: "'Outfit', sans-serif",
            textShadow: '0 6px 60px rgba(255,232,74,.5), 0 3px 12px rgba(0,0,0,.8)',
          }}>{count.toLocaleString()}+</div>
          <KineticText size={64} delay={0.5} effect="slideUp">परिवार रोज़&#10;भेज रहे हैं</KineticText>
        </AbsoluteFill>
      </Sequence>
      <Sequence from={7 * fps} durationInFrames={2.5 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <KineticText size={80} effect="slideLeft">आप कब? 👀</KineticText>
        </AbsoluteFill>
      </Sequence>
      <Sequence from={10 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <PulseCTA />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
}
