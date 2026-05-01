import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
  staticFile,
  Sequence,
} from 'remotion';

// Hook text that grabs attention
function HookText({ text, delay = 0 }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - delay * fps, fps, config: { damping: 12, stiffness: 100 } });
  const scale = interpolate(progress, [0, 1], [0.3, 1]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <div style={{
      fontSize: 72, fontWeight: 900, color: '#FFF8EE',
      textShadow: '0 4px 40px rgba(0,0,0,.9), 0 2px 8px rgba(0,0,0,.5)',
      lineHeight: 1.15, textAlign: 'center',
      transform: `scale(${scale})`, opacity,
      fontFamily: "'Tiro Devanagari Hindi', serif",
    }}>
      {text}
    </div>
  );
}

// Stat counter animation
function StatCounter({ number, label, delay = 0 }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - delay * fps, fps, config: { damping: 15, stiffness: 80 } });
  const count = Math.round(interpolate(progress, [0, 1], [0, number]));
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const y = interpolate(progress, [0, 1], [30, 0]);

  return (
    <div style={{ textAlign: 'center', opacity, transform: `translateY(${y}px)` }}>
      <div style={{ fontSize: 64, fontWeight: 900, color: '#FFE84A', fontFamily: "'Outfit', sans-serif" }}>
        {count}+
      </div>
      <div style={{ fontSize: 22, color: 'rgba(255,248,238,.8)', fontFamily: "'Tiro Devanagari Hindi', serif", marginTop: 4 }}>
        {label}
      </div>
    </div>
  );
}

// Animated card preview
function CardPreview({ rotation, delay, gradient, text }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - delay * fps, fps, config: { damping: 12, stiffness: 60 } });
  const scale = interpolate(progress, [0, 1], [0, 1]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <div style={{
      width: 240, height: 300, borderRadius: 24, overflow: 'hidden',
      background: gradient, position: 'absolute',
      transform: `rotate(${rotation}deg) scale(${scale})`, opacity,
      boxShadow: '0 16px 48px rgba(0,0,0,.5)',
      border: '3px solid rgba(255,255,255,.2)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20, textAlign: 'center',
    }}>
      <div style={{
        fontSize: 22, fontWeight: 700, color: '#FFF8EE',
        fontFamily: "'Tiro Devanagari Hindi', serif",
        textShadow: '0 2px 12px rgba(0,0,0,.8)',
      }}>{text}</div>
    </div>
  );
}

// CTA Button animation
function CTAButton({ delay = 0 }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - delay * fps, fps, config: { damping: 10, stiffness: 60 } });
  const scale = interpolate(progress, [0, 1], [0, 1]);
  const pulse = Math.sin(frame * 0.15) * 0.03 + 1;

  return (
    <div style={{
      background: '#25D366', borderRadius: 100, padding: '20px 48px',
      display: 'flex', alignItems: 'center', gap: 12,
      transform: `scale(${scale * pulse})`,
      boxShadow: '0 6px 30px rgba(37,211,102,.5)',
    }}>
      <span style={{ fontSize: 28 }}>📲</span>
      <span style={{ fontSize: 26, fontWeight: 800, color: '#fff', fontFamily: "'Outfit', sans-serif" }}>
        Download Now — Free
      </span>
    </div>
  );
}

export default function MarketingReel({ variant = 1, music }) {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();

  const bgGrad = 'linear-gradient(155deg, #D96B2B 0%, #9B3800 45%, #4A1000 100%)';

  return (
    <AbsoluteFill style={{ background: '#0a0400', fontFamily: "'Tiro Devanagari Hindi', serif" }}>
      {music && <Audio src={staticFile(music)} volume={0.4} />}
      <AbsoluteFill style={{ background: bgGrad }} />

      {/* Decorative circles */}
      <div style={{ position: 'absolute', top: -100, right: -80, width: 400, height: 400, borderRadius: '50%', background: 'rgba(255,160,60,.06)' }} />
      <div style={{ position: 'absolute', bottom: -150, left: -100, width: 500, height: 500, borderRadius: '50%', background: 'rgba(255,120,30,.04)' }} />

      {variant === 1 && <Reel1 frame={frame} fps={fps} width={width} height={height} />}
      {variant === 2 && <Reel2 frame={frame} fps={fps} width={width} height={height} />}
      {variant === 3 && <Reel3 frame={frame} fps={fps} width={width} height={height} />}
      {variant === 4 && <Reel4 frame={frame} fps={fps} width={width} height={height} />}
      {variant === 5 && <Reel5 frame={frame} fps={fps} width={width} height={height} />}
    </AbsoluteFill>
  );
}

// REEL 1: "WhatsApp पर सुबह क्या भेजते हो?" — Problem → Solution
function Reel1({ frame, fps, width, height }) {
  return (
    <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 50px', gap: 40 }}>
      <Sequence from={0} durationInFrames={3 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 50 }}>
          <HookText text="WhatsApp पर सुबह&#10;क्या भेजते हो?" />
        </AbsoluteFill>
      </Sequence>
      <Sequence from={3 * fps} durationInFrames={3 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 50 }}>
          <HookText text="वही पुराने&#10;Good Morning?" delay={0} />
        </AbsoluteFill>
      </Sequence>
      <Sequence from={6 * fps} durationInFrames={4 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 50, gap: 20, flexDirection: 'column' }}>
          <HookText text="अब भेजो&#10;🪔 वंदन कार्ड" delay={0} />
          <div style={{ fontSize: 28, color: 'rgba(255,235,185,.8)', fontFamily: "'Outfit', sans-serif", marginTop: 20, opacity: interpolate(frame - 7 * fps, [0, fps], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>
            अपने नाम के साथ · वीडियो · म्यूज़िक
          </div>
        </AbsoluteFill>
      </Sequence>
      <Sequence from={10 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CTAButton delay={0} />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
}

// REEL 2: Stats — "10,000+ परिवार जुड़ चुके हैं"
function Reel2({ frame, fps, width, height }) {
  return (
    <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 50, gap: 50 }}>
      <Sequence from={0} durationInFrames={4 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 50 }}>
          <HookText text="भारत का सबसे&#10;सुंदर कार्ड ऐप" />
        </AbsoluteFill>
      </Sequence>
      <Sequence from={4 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 50, padding: 50 }}>
          <StatCounter number={10000} label="परिवार जुड़ चुके हैं" delay={0} />
          <StatCounter number={100} label="सुंदर कार्ड" delay={0.5} />
          <StatCounter number={6} label="भाषाएं" delay={1} />
          <div style={{ marginTop: 20 }}><CTAButton delay={2} /></div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
}

// REEL 3: Card showcase — cards flying in
function Reel3({ frame, fps, width, height }) {
  return (
    <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 30 }}>
      <Sequence from={0} durationInFrames={3 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 50 }}>
          <HookText text="एक ऐप —&#10;हर मौके का कार्ड" />
        </AbsoluteFill>
      </Sequence>
      <Sequence from={3 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'relative', width: 400, height: 500 }}>
            <div style={{ position: 'absolute', left: -40, top: 40 }}>
              <CardPreview rotation={-12} delay={0} gradient="linear-gradient(135deg,#8B4500,#FF8C00)" text="सुप्रभात 🌅" />
            </div>
            <div style={{ position: 'absolute', left: 80, top: 0 }}>
              <CardPreview rotation={0} delay={0.3} gradient="linear-gradient(135deg,#2A0A00,#A84000)" text="जय श्री कृष्ण 🦚" />
            </div>
            <div style={{ position: 'absolute', left: 200, top: 60 }}>
              <CardPreview rotation={10} delay={0.6} gradient="linear-gradient(135deg,#0A1525,#2D5080)" text="कोशिश करो 💪" />
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>
      <Sequence from={8 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 120 }}>
          <CTAButton delay={0} />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
}

// REEL 4: "माँ को भेजो" emotional hook
function Reel4({ frame, fps }) {
  return (
    <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 50 }}>
      <Sequence from={0} durationInFrames={4 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 50 }}>
          <HookText text="आखिरी बार&#10;माँ को कब&#10;Good Morning भेजा?" />
        </AbsoluteFill>
      </Sequence>
      <Sequence from={4 * fps} durationInFrames={4 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 50 }}>
          <HookText text="अब भेजो&#10;अपने नाम वाला&#10;सुंदर वीडियो कार्ड" />
        </AbsoluteFill>
      </Sequence>
      <Sequence from={8 * fps} durationInFrames={4 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: 50 }}>
          <div style={{ fontSize: 48, fontWeight: 700, color: '#FFE84A', textAlign: 'center' }}>
            🪔 वंदन
          </div>
          <div style={{ fontSize: 28, color: 'rgba(255,248,238,.8)', textAlign: 'center', fontFamily: "'Outfit', sans-serif" }}>
            माँ · पापा · भाई · बहन · दोस्त
          </div>
          <div style={{ fontSize: 24, color: 'rgba(255,248,238,.6)', textAlign: 'center' }}>
            सबको भेजो — मुफ़्त में
          </div>
        </AbsoluteFill>
      </Sequence>
      <Sequence from={12 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CTAButton delay={0} />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
}

// REEL 5: Feature list — rapid fire
function Reel5({ frame, fps }) {
  const features = [
    '🎬 वीडियो कार्ड',
    '🎵 म्यूज़िक के साथ',
    '📛 अपना नाम जोड़ो',
    '📲 WhatsApp पर भेजो',
    '🆓 बिल्कुल मुफ़्त',
  ];

  return (
    <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 50 }}>
      <Sequence from={0} durationInFrames={3 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 50 }}>
          <HookText text="वंदन में&#10;क्या-क्या है?" />
        </AbsoluteFill>
      </Sequence>
      <Sequence from={3 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28, padding: 50 }}>
          {features.map((f, i) => {
            const progress = spring({ frame: frame - (3 + i * 0.8) * fps, fps, config: { damping: 12, stiffness: 80 } });
            return (
              <div key={i} style={{
                fontSize: 38, fontWeight: 700, color: '#FFF8EE',
                opacity: interpolate(progress, [0, 1], [0, 1]),
                transform: `translateX(${interpolate(progress, [0, 1], [-100, 0])}px)`,
                textShadow: '0 2px 16px rgba(0,0,0,.5)',
              }}>{f}</div>
            );
          })}
          <div style={{ marginTop: 30 }}><CTAButton delay={7} /></div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
}
