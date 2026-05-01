import React from 'react';
import {
  AbsoluteFill, Audio, Sequence,
  interpolate, useCurrentFrame, useVideoConfig, spring, staticFile,
} from 'remotion';

// ── Animated text ──
function FlyIn({ children, delay = 0, size = 48, color = '#FFF8EE', effect = 'scaleUp' }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay * fps, fps, config: { damping: 12, stiffness: 100 } });
  const opacity = interpolate(p, [0, 1], [0, 1]);
  let transform = '';
  if (effect === 'scaleUp') transform = `scale(${interpolate(p, [0, 1], [0.3, 1])})`;
  if (effect === 'slideUp') transform = `translateY(${interpolate(p, [0, 1], [60, 0])}px)`;
  if (effect === 'slideLeft') transform = `translateX(${interpolate(p, [0, 1], [-200, 0])}px)`;
  if (effect === 'slideRight') transform = `translateX(${interpolate(p, [0, 1], [200, 0])}px)`;

  return (
    <div style={{
      fontSize: size, fontWeight: 800, color, opacity, transform,
      textAlign: 'center', lineHeight: 1.2,
      textShadow: '0 4px 30px rgba(0,0,0,.8)',
      fontFamily: "'Tiro Devanagari Hindi', serif",
      padding: '0 40px',
    }}>
      {children}
    </div>
  );
}

// ── Phone mockup ──
function PhoneMockup({ children, delay = 0 }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay * fps, fps, config: { damping: 14, stiffness: 80 } });

  return (
    <div style={{
      width: 280, height: 560,
      borderRadius: 36, overflow: 'hidden',
      background: '#FFFDF6',
      border: '4px solid #333',
      boxShadow: '0 20px 60px rgba(0,0,0,.5), 0 0 0 1px rgba(255,255,255,.1)',
      transform: `scale(${interpolate(p, [0, 1], [0.5, 1])})`,
      opacity: interpolate(p, [0, 1], [0, 1]),
      display: 'flex', flexDirection: 'column', alignItems: 'center',
    }}>
      {children}
    </div>
  );
}

// ── Feature pill ──
function FeaturePill({ emoji, text, delay = 0 }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay * fps, fps, config: { damping: 12, stiffness: 80 } });

  return (
    <div style={{
      background: 'rgba(255,249,240,.95)',
      borderRadius: 100, padding: '12px 24px',
      display: 'flex', alignItems: 'center', gap: 8,
      transform: `scale(${interpolate(p, [0, 1], [0, 1])})`,
      opacity: interpolate(p, [0, 1], [0, 1]),
      boxShadow: '0 4px 20px rgba(0,0,0,.2)',
    }}>
      <span style={{ fontSize: 20 }}>{emoji}</span>
      <span style={{ fontSize: 18, fontWeight: 700, color: '#2A1400', fontFamily: "'Outfit', sans-serif" }}>{text}</span>
    </div>
  );
}

// ── Pulsing CTA ──
function CTA({ text, delay = 0 }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay * fps, fps, config: { damping: 10, stiffness: 60 } });
  const pulse = 1 + Math.sin(frame * 0.15) * 0.03;

  return (
    <div style={{
      background: '#25D366', borderRadius: 100, padding: '16px 40px',
      transform: `scale(${interpolate(p, [0, 1], [0, 1]) * pulse})`,
      opacity: interpolate(p, [0, 1], [0, 1]),
      boxShadow: '0 6px 30px rgba(37,211,102,.5)',
    }}>
      <span style={{ fontSize: 22, fontWeight: 800, color: '#fff', fontFamily: "'Outfit', sans-serif" }}>{text}</span>
    </div>
  );
}

export default function DemoVideo() {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();

  // Animated background gradient
  const hue = interpolate(frame, [0, durationInFrames], [20, 35]);

  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <Audio src={staticFile('bhajan.ogg')} volume={0.35} />

      {/* Animated gradient bg */}
      <AbsoluteFill style={{
        background: `radial-gradient(ellipse at 50% 40%, hsl(${hue}, 80%, 15%) 0%, hsl(${hue - 10}, 90%, 5%) 70%, #000 100%)`,
      }} />

      {/* Scene 1: Logo + Hook (0-4s) */}
      <Sequence from={0} durationInFrames={4 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
          <div style={{ fontSize: 80, marginBottom: 10 }}>🪔</div>
          <FlyIn size={72} delay={0.3} effect="scaleUp">वंदन</FlyIn>
          <FlyIn size={28} delay={0.8} effect="slideUp" color="rgba(255,235,185,.7)">परिवार को हर रोज़ सुंदर कार्ड भेजें</FlyIn>
        </AbsoluteFill>
      </Sequence>

      {/* Scene 2: Problem (4-7s) */}
      <Sequence from={4 * fps} durationInFrames={3 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <FlyIn size={44} delay={0} effect="slideLeft" color="rgba(255,255,255,.5)">WhatsApp पर रोज़ वही</FlyIn>
          <FlyIn size={60} delay={0.4} effect="scaleUp">"Good Morning" 😴</FlyIn>
          <FlyIn size={32} delay={1} effect="slideUp" color="rgba(255,235,185,.5)">बोरिंग... पुराना...</FlyIn>
        </AbsoluteFill>
      </Sequence>

      {/* Scene 3: Solution (7-11s) */}
      <Sequence from={7 * fps} durationInFrames={4 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <FlyIn size={40} delay={0} effect="slideUp" color="#FFE84A">अब भेजो</FlyIn>
          <FlyIn size={64} delay={0.4} effect="scaleUp">🎬 वीडियो कार्ड</FlyIn>
          <FlyIn size={32} delay={1} effect="slideUp" color="rgba(255,235,185,.7)">🎵 म्यूज़िक + 📛 आपका नाम</FlyIn>
        </AbsoluteFill>
      </Sequence>

      {/* Scene 4: Categories (11-15s) */}
      <Sequence from={11 * fps} durationInFrames={4 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
          <FlyIn size={36} delay={0} effect="scaleUp">8 कैटेगरी</FlyIn>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginTop: 10, maxWidth: 500 }}>
            {['🌅 सुप्रभात', '📿 गीता', '🙏 भक्ति', '💪 सुविचार', '🌙 रात्रि', '🎉 त्यौहार', '🎂 जन्मदिन', '🙏 आभार'].map((c, i) => (
              <FeaturePill key={i} emoji={c.split(' ')[0]} text={c.split(' ')[1]} delay={0.3 + i * 0.15} />
            ))}
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Scene 5: How it works (15-22s) */}
      <Sequence from={15 * fps} durationInFrames={3 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
          <FlyIn size={36} delay={0} effect="scaleUp" color="#FFE84A">कैसे काम करता है?</FlyIn>
          <FlyIn size={48} delay={0.5} effect="slideLeft">1️⃣ नाम डालो</FlyIn>
        </AbsoluteFill>
      </Sequence>
      <Sequence from={18 * fps} durationInFrames={2.5 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FlyIn size={48} delay={0} effect="slideRight">2️⃣ कार्ड चुनो</FlyIn>
        </AbsoluteFill>
      </Sequence>
      <Sequence from={20.5 * fps} durationInFrames={2.5 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FlyIn size={48} delay={0} effect="slideLeft">3️⃣ WhatsApp पर भेजो!</FlyIn>
        </AbsoluteFill>
      </Sequence>

      {/* Scene 6: Languages (23-26s) */}
      <Sequence from={23 * fps} durationInFrames={3 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <FlyIn size={36} delay={0} effect="scaleUp">6 भाषाएं</FlyIn>
          <div style={{ display: 'flex', gap: 12, marginTop: 10 }}>
            {['हिंदी', 'English', 'मराठी', 'தமிழ்', 'తెలుగు', 'ગુજ.'].map((l, i) => (
              <FeaturePill key={i} emoji="" text={l} delay={0.3 + i * 0.12} />
            ))}
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Scene 7: Bhagwan App teaser (26-32s) */}
      <Sequence from={26 * fps} durationInFrames={3 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <FlyIn size={36} delay={0} effect="slideUp" color="#FFE84A">+ बोनस</FlyIn>
          <FlyIn size={56} delay={0.5} effect="scaleUp">भगवान का संदेश</FlyIn>
        </AbsoluteFill>
      </Sequence>
      <Sequence from={29 * fps} durationInFrames={3 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <FlyIn size={32} delay={0} effect="slideLeft">8 देवताओं से</FlyIn>
          <FlyIn size={32} delay={0.3} effect="slideRight">व्यक्तिगत आशीर्वाद</FlyIn>
          <FlyIn size={28} delay={0.7} effect="slideUp" color="rgba(255,235,185,.6)">🔔 मंदिर की घंटी + 🔊 आवाज़ में सुनें</FlyIn>
        </AbsoluteFill>
      </Sequence>

      {/* Scene 8: Stats + CTA (32-38s) */}
      <Sequence from={32 * fps} durationInFrames={3 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          <div style={{
            fontSize: 96, fontWeight: 900, color: '#FFE84A',
            fontFamily: "'Outfit', sans-serif",
            textShadow: '0 4px 40px rgba(255,232,74,.4)',
          }}>50+</div>
          <FlyIn size={36} delay={0.3} effect="slideUp">वीडियो कार्ड</FlyIn>
          <FlyIn size={24} delay={0.6} effect="slideUp" color="rgba(255,235,185,.6)">म्यूज़िक · आपका नाम · FREE</FlyIn>
        </AbsoluteFill>
      </Sequence>
      <Sequence from={35 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
          <div style={{ fontSize: 60, marginBottom: 8 }}>🪔</div>
          <FlyIn size={64} delay={0} effect="scaleUp">वंदन</FlyIn>
          <FlyIn size={24} delay={0.4} effect="slideUp" color="rgba(255,235,185,.7)">दिल से, हर रोज़</FlyIn>
          <div style={{ marginTop: 16 }}><CTA text="अभी Try करो — FREE" delay={0.8} /></div>
          <FlyIn size={18} delay={1.5} effect="slideUp" color="rgba(255,235,185,.4)">vandan-app.vercel.app</FlyIn>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
}
