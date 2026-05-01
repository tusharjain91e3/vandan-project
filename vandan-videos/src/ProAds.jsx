import React from 'react';
import {
  AbsoluteFill, Img, Sequence,
  interpolate, useCurrentFrame, useVideoConfig, spring,
} from 'remotion';

const px = id => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=600&h=750&fit=crop&q=85`;

// ── Massive text — readable on any phone ──
function H({ children, d = 0, s = 110, c = '#fff', e = 'pop' }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - d * fps, fps, config: { damping: 9, stiffness: 90, mass: 0.6 } });
  let tx = '';
  if (e === 'pop') tx = `scale(${interpolate(p, [0, 1], [0.15, 1])})`;
  if (e === 'left') tx = `translateX(${interpolate(p, [0, 1], [-500, 0])}px)`;
  if (e === 'right') tx = `translateX(${interpolate(p, [0, 1], [500, 0])}px)`;
  if (e === 'up') tx = `translateY(${interpolate(p, [0, 1], [120, 0])}px)`;
  if (e === 'slam') tx = `scale(${interpolate(p, [0, 1], [3, 1])})`;
  return (
    <div style={{
      fontSize: s, fontWeight: 900, color: c, textAlign: 'center', lineHeight: 1.05,
      opacity: interpolate(p, [0, 1], [0, 1]), transform: tx, padding: '0 28px',
      fontFamily: "'Tiro Devanagari Hindi', serif", whiteSpace: 'pre-line',
    }}>{children}</div>
  );
}

// ── Mock card preview ──
function CardMock({ photo, quote, name, d = 0, rotation = 0, big = false }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - d * fps, fps, config: { damping: 12, stiffness: 70 } });
  const float = Math.sin(frame * 0.06) * 5;
  const w = big ? 520 : 300;
  const h = big ? 650 : 375;
  const nameSize = big ? 28 : 18;
  const quoteSize = big ? 38 : 24;
  const avSize = big ? 52 : 34;
  const stripH = big ? 76 : 52;

  return (
    <div style={{
      width: w, height: h, borderRadius: big ? 28 : 24, overflow: 'hidden', position: 'relative',
      boxShadow: '0 24px 80px rgba(0,0,0,.7), 0 0 0 2px rgba(255,200,100,.25)',
      transform: `scale(${interpolate(p, [0, 1], [0.2, 1])}) rotate(${rotation}deg) translateY(${float}px)`,
      opacity: interpolate(p, [0, 1], [0, 1]),
    }}>
      <Img src={photo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(0,0,0,.25) 0%,rgba(0,0,0,0) 35%,rgba(0,0,0,.75) 100%)' }} />
      <div style={{ position: 'absolute', bottom: stripH + 20, left: 0, right: 0, textAlign: 'center', padding: '0 20px' }}>
        <div style={{ fontSize: quoteSize, fontWeight: 700, color: '#FFF8EE', fontFamily: "'Tiro Devanagari Hindi', serif", textShadow: '0 3px 16px rgba(0,0,0,.9)', lineHeight: 1.3 }}>{quote}</div>
      </div>
      {/* Name strip */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: stripH, background: 'rgba(255,249,240,.96)', display: 'flex', alignItems: 'center', padding: '0 16px', gap: 10 }}>
        <div style={{ width: avSize, height: avSize, borderRadius: '50%', background: 'linear-gradient(135deg,#C8611A,#8B3500)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 3px #FFF9F0, 0 0 0 5px rgba(200,97,26,.2)', flexShrink: 0 }}>
          <span style={{ color: '#FFF8EE', fontSize: avSize * 0.45, fontWeight: 700 }}>{name[0]}</span>
        </div>
        <span style={{ fontSize: nameSize, fontWeight: 800, color: '#2B1810', fontFamily: "'Tiro Devanagari Hindi', serif" }}>{name}</span>
      </div>
    </div>
  );
}

// ── WhatsApp message mock ──
function WAMock({ name, d = 0 }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - d * fps, fps, config: { damping: 12, stiffness: 80 } });
  return (
    <div style={{
      width: '85%', background: '#DCF8C6', borderRadius: '20px 20px 6px 20px', padding: '14px 18px',
      boxShadow: '0 4px 20px rgba(0,0,0,.2)',
      transform: `scale(${interpolate(p, [0, 1], [0.5, 1])}) translateY(${interpolate(p, [0, 1], [40, 0])}px)`,
      opacity: interpolate(p, [0, 1], [0, 1]),
    }}>
      <div style={{ fontSize: 16, fontWeight: 700, color: '#075E54', marginBottom: 4, fontFamily: "'Outfit', sans-serif" }}>📹 Video</div>
      <div style={{ width: '100%', height: 180, borderRadius: 12, background: 'linear-gradient(135deg,#8B4500,#D96B2B)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
        <div style={{ fontSize: 40, opacity: 0.8 }}>▶</div>
      </div>
      <div style={{ fontSize: 15, color: '#1a1a1a', lineHeight: 1.4, fontFamily: "'Tiro Devanagari Hindi', serif" }}>
        🙏 *{name}* ने आपके लिए यह भेजा — वंदन कार्ड
      </div>
      <div style={{ fontSize: 11, color: '#8a8a8a', textAlign: 'right', marginTop: 4 }}><span style={{ color: '#4FC3F7' }}>✓✓</span> 9:41 AM</div>
    </div>
  );
}

// ═══════════════════════════════════════
// AD 1: "ये कार्ड देखो" — SHOW the product
// Visual: Actual card previews floating + name on it
// ═══════════════════════════════════════
export function ProAd1() {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: '#0a0400' }}>
      <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 30%, #2a1400 0%, #0a0400 70%)' }} />

      <Sequence from={0} durationInFrames={2 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <H s={120} e="slam">ये देखो 👇</H>
        </AbsoluteFill>
      </Sequence>

      {/* Cards carousel — one per category, full screen */}
      <Sequence from={2 * fps} durationInFrames={1.8 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CardMock photo={px(31072582)} quote="महादेव साथ हैं 🔱" name="आपका नाम" d={0} rotation={0} big={true} />
        </AbsoluteFill>
      </Sequence>
      <Sequence from={3.8 * fps} durationInFrames={1.8 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CardMock photo={px(5791086)} quote="सुप्रभात 🌅" name="आपका नाम" d={0} rotation={0} big={true} />
        </AbsoluteFill>
      </Sequence>
      <Sequence from={5.6 * fps} durationInFrames={1.8 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CardMock photo={px(9375018)} quote="जय श्री कृष्ण 🦚" name="आपका नाम" d={0} rotation={0} big={true} />
        </AbsoluteFill>
      </Sequence>
      <Sequence from={7.4 * fps} durationInFrames={1.8 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CardMock photo={px(29376339)} quote="शुभ रात्रि 🌙" name="आपका नाम" d={0} rotation={0} big={true} />
        </AbsoluteFill>
      </Sequence>
      <Sequence from={9.2 * fps} durationInFrames={1.8 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CardMock photo={px(3367460)} quote="शुभ दीपावली 🪔" name="आपका नाम" d={0} rotation={0} big={true} />
        </AbsoluteFill>
      </Sequence>

      <Sequence from={11 * fps} durationInFrames={2 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <H s={72} e="up" c="#FFE84A">आपका नाम जुड़ता है</H>
          <H s={56} d={0.3} e="up">हर कार्ड पर 📛</H>
        </AbsoluteFill>
      </Sequence>

      {/* CTA — big, bilingual, with arrow pointing down to bio link */}
      <Sequence from={13 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <H s={80} e="pop">🪔 वंदन — Vandan</H>
          <H s={44} d={0.3} e="up" c="#FFE84A">अभी बनाओ — It's FREE</H>
          <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, opacity: 1 }}>
            <H s={60} d={0.6} e="pop" c="#25D366">👇 LINK IN BIO 👇</H>
            <H s={32} d={0.9} e="up" c="rgba(255,255,255,.4)">नीचे लिंक पर क्लिक करो</H>
            {/* Animated arrow pointing down */}
            <div style={{ fontSize: 60, animation: 'none' }}>⬇️</div>
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
}

// ═══════════════════════════════════════
// AD 2: "WhatsApp पर ऐसा आता है" — Show WA preview
// Visual: Mock WhatsApp message with video card
// ═══════════════════════════════════════
export function ProAd2() {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: '#ECE5DD' }}>
      {/* WA header */}
      <div style={{ background: '#075E54', padding: '52px 16px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', border: '2px solid rgba(255,255,255,.5)' }} />
        <div style={{ flex: 1 }}>
          <div style={{ color: '#fff', fontSize: 20, fontWeight: 700 }}>Family Group ❤️</div>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '30px 16px', gap: 20 }}>
        <Sequence from={0} durationInFrames={2 * fps}>
          <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <H s={80} e="slam" c="#2A1400">WhatsApp पर{'\n'}ऐसा दिखता है 👇</H>
          </AbsoluteFill>
        </Sequence>

        <Sequence from={2.5 * fps}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12, padding: '0 10px', marginTop: 200 }}>
            <WAMock name="राहुल" d={0} />
          </div>
        </Sequence>
      </div>

      <Sequence from={7 * fps}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,.9)', padding: '28px 24px 48px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <H s={56} e="pop" c="#FFE84A">वीडियो + नाम + म्यूज़िक</H>
          <H s={28} d={0.3} e="up" c="rgba(255,255,255,.5)">🪔 वंदन — FREE · Link in bio</H>
        </div>
      </Sequence>
    </AbsoluteFill>
  );
}

// ═══════════════════════════════════════
// AD 3: Split comparison — Boring vs Vandan
// Visual: Left side grey boring, right side colorful card
// ═══════════════════════════════════════
export function ProAd3() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: '#111' }}>
      <Sequence from={0} durationInFrames={2 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <H s={100} e="slam" c="#FF4444">😒 vs 😍</H>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={2 * fps} durationInFrames={5 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'row' }}>
          {/* Boring side */}
          <div style={{ flex: 1, background: '#1a1a1a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, borderRight: '2px solid #333' }}>
            <H s={28} d={0} e="left" c="#666">पहले</H>
            <div style={{ background: '#2a2a2a', borderRadius: 16, padding: '20px 24px', width: '80%' }}>
              <div style={{ fontSize: 18, color: '#888', fontFamily: "'Outfit', sans-serif" }}>Good Morning 🌅</div>
              <div style={{ fontSize: 12, color: '#555', marginTop: 6 }}>7:02 AM ✓✓</div>
            </div>
            <H s={40} d={0.5} e="up" c="#FF4444">बोरिंग 😴</H>
          </div>
          {/* Vandan side */}
          <div style={{ flex: 1, background: 'radial-gradient(ellipse at 50% 50%, #2a1400, #0a0400)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
            <H s={28} d={0.3} e="right" c="#FFE84A">अब</H>
            <CardMock photo={px(5791086)} quote="सुप्रभात 🌅" name="आपका नाम" d={0.5} rotation={3} />
            <H s={36} d={1} e="up" c="#25D366">🎬 वीडियो! 🔥</H>
          </div>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={8 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, background: 'rgba(10,4,0,.95)' }}>
          <H s={80} e="pop">🪔 वंदन</H>
          <H s={36} d={0.3} e="up" c="rgba(255,255,255,.5)">FREE · Link in bio 👆</H>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
}

// ═══════════════════════════════════════
// AD 4: Speed demo — "2 मिनट में बनाओ"
// Visual: Fast mockup showing app flow
// ═══════════════════════════════════════
export function ProAd4() {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: '#0a0400' }}>
      <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 40%, #1a0a00 0%, #050200 80%)' }} />

      <Sequence from={0} durationInFrames={2 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <H s={100} e="slam" c="#FFE84A">2 मिनट ⏱️</H>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={2 * fps} durationInFrames={2 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <div style={{ width: 280, background: '#fff', borderRadius: 16, padding: '16px 20px', boxShadow: '0 8px 30px rgba(0,0,0,.4)' }}>
            <div style={{ fontSize: 12, color: '#999', fontWeight: 600, marginBottom: 6, fontFamily: "'Outfit', sans-serif" }}>आपका नाम</div>
            <div style={{ fontSize: 22, color: '#C8611A', fontWeight: 700, fontFamily: "'Tiro Devanagari Hindi', serif" }}>राहुल शर्मा ✏️</div>
          </div>
          <H s={40} d={0.3} e="up" c="rgba(255,255,255,.5)">नाम डालो ☝️</H>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={4 * fps} durationInFrames={3 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <H s={36} e="up" c="rgba(255,255,255,.5)">कार्ड चुनो 👇</H>
          <div style={{ display: 'flex', gap: 12 }}>
            <CardMock photo={px(31072582)} quote="महादेव 🔱" name="राहुल" d={0.2} rotation={-5} />
            <CardMock photo={px(1631677)} quote="आभार 🙏" name="राहुल" d={0.5} rotation={5} />
          </div>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={7.5 * fps} durationInFrames={2 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <div style={{ background: '#25D366', borderRadius: 18, padding: '18px 36px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 8px 30px rgba(37,211,102,.4)' }}>
            <span style={{ fontSize: 28 }}>📲</span>
            <span style={{ fontSize: 26, fontWeight: 800, color: '#fff', fontFamily: "'Outfit', sans-serif" }}>WhatsApp पर भेजो!</span>
          </div>
          <H s={36} d={0.3} e="up" c="rgba(255,255,255,.4)">बस इतना ही! ✨</H>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={10 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <H s={80} e="pop">🪔 वंदन</H>
          <H s={32} d={0.3} e="up" c="rgba(255,255,255,.5)">FREE · Link in bio 👆</H>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
}

// ═══════════════════════════════════════
// AD 5: "माँ का चेहरा" — Pure emotional + product
// Visual: Card floating + emotional text + name strip closeup
// ═══════════════════════════════════════
export function ProAd5() {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 35%, #1a0800 0%, #000 75%)' }} />

      <Sequence from={0} durationInFrames={3 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <H s={90} e="pop">माँ ने पूछा{'\n'}"ये किसने भेजा?" 🥺</H>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={3 * fps} durationInFrames={3 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <H s={48} e="left" c="rgba(255,255,255,.5)">नीचे नाम था —</H>
          <CardMock photo={px(9375018)} quote="ॐ नमः शिवाय 🔱" name="बेटा राहुल" d={0.3} />
        </AbsoluteFill>
      </Sequence>

      <Sequence from={6.5 * fps} durationInFrames={2.5 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <H s={72} e="pop" c="#FFE84A">माँ की आँखों में{'\n'}आँसू थे 🥲</H>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={9.5 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
          <H s={70} e="pop">🪔 वंदन</H>
          <H s={34} d={0.2} e="up" c="rgba(255,255,255,.6)">अपनी माँ को भी भेजो</H>
          <H s={28} d={0.5} e="up" c="rgba(255,255,255,.3)">FREE · Link in bio 👆</H>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
}
