import React from 'react';
import {
  AbsoluteFill, Audio, Sequence,
  interpolate, useCurrentFrame, useVideoConfig, spring, staticFile,
} from 'remotion';

// ═══════════════════════════════════════
// REEL 1: WhatsApp POV — "माँ का reaction"
// Dark bg + photo cross-fade + dramatic text + chat bubbles
// ═══════════════════════════════════════

function ChatBubble({ text, isMe, delay = 0, big = false }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay * fps, fps, config: { damping: 10, stiffness: 100 } });
  return (
    <div style={{
      alignSelf: isMe ? 'flex-end' : 'flex-start',
      background: isMe ? '#DCF8C6' : '#fff',
      borderRadius: isMe ? '22px 22px 6px 22px' : '22px 22px 22px 6px',
      padding: big ? '18px 22px' : '14px 18px', maxWidth: '85%',
      boxShadow: '0 4px 20px rgba(0,0,0,.25)',
      opacity: interpolate(p, [0, 1], [0, 1]),
      transform: `translateY(${interpolate(p, [0, 1], [50, 0])}px) scale(${interpolate(p, [0, 1], [0.7, 1])})`,
    }}>
      <div style={{ fontSize: big ? 28 : 24, color: '#1a1a1a', fontFamily: "'Tiro Devanagari Hindi', serif", fontWeight: 600, lineHeight: 1.4 }}>{text}</div>
      <div style={{ fontSize: 11, color: '#8a8a8a', textAlign: 'right', marginTop: 4, fontFamily: "'Outfit', sans-serif" }}>
        {isMe && <span style={{ color: '#4FC3F7' }}>✓✓ </span>}अभी
      </div>
    </div>
  );
}

function Big({ children, delay = 0, size = 80, color = '#FFF8EE', effect = 'scale' }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay * fps, fps, config: { damping: 10, stiffness: 90 } });
  let tx = '';
  if (effect === 'scale') tx = `scale(${interpolate(p, [0, 1], [0.2, 1])})`;
  if (effect === 'up') tx = `translateY(${interpolate(p, [0, 1], [80, 0])}px)`;
  return (
    <div style={{
      fontSize: size, fontWeight: 900, color, textAlign: 'center', lineHeight: 1.1,
      opacity: interpolate(p, [0, 1], [0, 1]), transform: tx, padding: '0 40px',
      textShadow: '0 6px 50px rgba(0,0,0,1), 0 3px 12px rgba(0,0,0,.8)',
      fontFamily: "'Tiro Devanagari Hindi', serif",
    }}>{children}</div>
  );
}

export function ChatReel() {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const bgHue = interpolate(frame, [0, 12 * fps], [15, 30]);

  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <Audio src={staticFile('bhajan.ogg')} volume={0.4} />

      {/* Animated dark gradient bg */}
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 40%, hsl(${bgHue},80%,12%) 0%, #000 80%)` }} />

      {/* Scene 1: Hook */}
      <Sequence from={0} durationInFrames={2.5 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Big size={90} effect="scale">माँ को WhatsApp पर{'\n'}ये भेजा... 📱</Big>
        </AbsoluteFill>
      </Sequence>

      {/* Scene 2: Chat */}
      <Sequence from={2.5 * fps} durationInFrames={6 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px 20px', gap: 16 }}>
          <Sequence from={0}><ChatBubble text="माँ, Good Morning 🌅" isMe={true} /></Sequence>
          <Sequence from={1.2 * fps}><ChatBubble text="बेटा, रोज़ वही boring? 😒" isMe={false} /></Sequence>
          <Sequence from={2.5 * fps}><ChatBubble text="नहीं माँ! आज special है 😍" isMe={true} /></Sequence>
          <Sequence from={3.5 * fps}><ChatBubble text="🎬 वीडियो कार्ड भेजा!" isMe={true} big={true} /></Sequence>
          <Sequence from={5 * fps}><ChatBubble text="अरे! इसमें मेरा नाम है! 🥺❤️" isMe={false} big={true} /></Sequence>
        </AbsoluteFill>
      </Sequence>

      {/* Scene 3: Reaction */}
      <Sequence from={8.5 * fps} durationInFrames={1.5 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Big size={100} effect="scale" color="#FFE84A">माँ रो पड़ी 🥺</Big>
        </AbsoluteFill>
      </Sequence>

      {/* Scene 4: CTA */}
      <Sequence from={10 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <Big size={72} effect="scale">🪔 वंदन</Big>
          <Big size={32} delay={0.3} effect="up" color="rgba(255,235,185,.6)">अपनी माँ को भी भेजो</Big>
          <div style={{
            background: '#25D366', borderRadius: 100, padding: '18px 44px', marginTop: 16,
            boxShadow: '0 6px 30px rgba(37,211,102,.5)',
            animation: 'none',
          }}>
            <span style={{ fontSize: 24, fontWeight: 800, color: '#fff', fontFamily: "'Outfit', sans-serif" }}>Link in bio 👆</span>
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
}

// ═══════════════════════════════════════
// REEL 2: Countdown Challenge — "5 सेकंड में बताओ"
// Engagement bait — makes people watch till end
// ═══════════════════════════════════════

export function CountdownReel() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const nums = [5, 4, 3, 2, 1];
  const questions = [
    'WhatsApp पर सबसे ज़्यादा\nक्या भेजते हैं?',
    '🅰️ Memes\n🅱️ Good Morning\n🅾️ Reels',
  ];

  return (
    <AbsoluteFill style={{ background: '#1a0800' }}>
      <Audio src={staticFile('bhajan.ogg')} volume={0.4} />

      {/* Question */}
      <Sequence from={0} durationInFrames={3 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: 40 }}>
          <div style={{ fontSize: 24, color: '#FFE84A', fontWeight: 700, letterSpacing: 2, fontFamily: "'Outfit', sans-serif" }}>5 सेकंड में बताओ ⏱️</div>
          <div style={{ fontSize: 52, fontWeight: 800, color: '#fff', textAlign: 'center', lineHeight: 1.3, fontFamily: "'Tiro Devanagari Hindi', serif" }}>
            {questions[0]}
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Options */}
      <Sequence from={3 * fps} durationInFrames={3 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: 40 }}>
          <div style={{ fontSize: 48, fontWeight: 800, color: '#fff', textAlign: 'center', lineHeight: 1.5, fontFamily: "'Tiro Devanagari Hindi', serif", whiteSpace: 'pre-line' }}>
            {questions[1]}
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* Answer reveal */}
      <Sequence from={6 * fps} durationInFrames={3 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 40 }}>
          <div style={{ fontSize: 36, color: '#FFE84A', fontWeight: 700, fontFamily: "'Outfit', sans-serif" }}>सही जवाब 🅱️</div>
          <div style={{ fontSize: 64, fontWeight: 900, color: '#fff', textAlign: 'center', fontFamily: "'Tiro Devanagari Hindi', serif" }}>
            Good Morning! 😴
          </div>
          <div style={{ fontSize: 28, color: 'rgba(255,255,255,.6)', marginTop: 10, textAlign: 'center', fontFamily: "'Tiro Devanagari Hindi', serif" }}>
            पर अब boring नहीं...
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* CTA */}
      <Sequence from={9 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 40 }}>
          <div style={{ fontSize: 56, fontWeight: 900, color: '#fff', textAlign: 'center', fontFamily: "'Tiro Devanagari Hindi', serif" }}>
            🪔 वंदन से भेजो
          </div>
          <div style={{ fontSize: 32, color: '#FFE84A', textAlign: 'center' }}>🎬 वीडियो + 🎵 म्यूज़िक + 📛 नाम</div>
          <div style={{ background: '#25D366', borderRadius: 100, padding: '16px 40px', marginTop: 12 }}>
            <span style={{ fontSize: 24, fontWeight: 800, color: '#fff', fontFamily: "'Outfit', sans-serif" }}>Link in bio 👆</span>
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
}

// ═══════════════════════════════════════
// REEL 3: Notification Style — Fake phone notification
// Trending "POV" format
// ═══════════════════════════════════════

function Notification({ app, title, body, delay = 0, emoji = '📱' }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay * fps, fps, config: { damping: 12, stiffness: 80 } });
  return (
    <div style={{
      background: 'rgba(255,255,255,.95)', borderRadius: 20, padding: '16px 18px',
      width: '90%', boxShadow: '0 4px 20px rgba(0,0,0,.15)',
      opacity: interpolate(p, [0, 1], [0, 1]),
      transform: `translateY(${interpolate(p, [0, 1], [-40, 0])}px)`,
      backdropFilter: 'blur(20px)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
        <span style={{ fontSize: 20 }}>{emoji}</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#666', textTransform: 'uppercase', letterSpacing: 1 }}>{app}</span>
        <span style={{ fontSize: 11, color: '#aaa', marginLeft: 'auto' }}>अभी</span>
      </div>
      <div style={{ fontSize: 18, fontWeight: 700, color: '#1a1a1a', fontFamily: "'Outfit', sans-serif" }}>{title}</div>
      <div style={{ fontSize: 15, color: '#666', marginTop: 3, fontFamily: "'Outfit', sans-serif" }}>{body}</div>
    </div>
  );
}

export function NotificationReel() {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}>
      <Audio src={staticFile('mohan.ogg')} volume={0.35} />

      {/* Time */}
      <div style={{ position: 'absolute', top: 60, left: 0, right: 0, textAlign: 'center' }}>
        <div style={{ fontSize: 72, fontWeight: 200, color: '#fff', fontFamily: "'Outfit', sans-serif" }}>9:41</div>
        <div style={{ fontSize: 16, color: 'rgba(255,255,255,.5)' }}>मंगलवार, 29 अप्रैल</div>
      </div>

      <div style={{ position: 'absolute', top: 220, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '0 16px' }}>
        <Sequence from={1 * fps}><Notification app="WhatsApp" emoji="💬" title="माँ ❤️" body="बेटा, आज Good Morning नहीं आया?" delay={0} /></Sequence>
        <Sequence from={3 * fps}><Notification app="WhatsApp" emoji="💬" title="पापा" body="3 new messages" delay={0} /></Sequence>
        <Sequence from={5 * fps}><Notification app="वंदन 🪔" emoji="🪔" title="आज का कार्ड तैयार है!" body="🎬 सुप्रभात वीडियो भेजें — अपने नाम के साथ" delay={0} /></Sequence>
      </div>

      <Sequence from={7.5 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 80 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <div style={{ fontSize: 48, fontWeight: 800, color: '#FFE84A', fontFamily: "'Tiro Devanagari Hindi', serif" }}>🪔 वंदन</div>
            <div style={{ fontSize: 22, color: 'rgba(255,255,255,.6)' }}>माँ को भेजो — अभी 📲</div>
            <div style={{ background: '#25D366', borderRadius: 100, padding: '14px 36px', marginTop: 8 }}>
              <span style={{ fontSize: 22, fontWeight: 800, color: '#fff', fontFamily: "'Outfit', sans-serif" }}>Link in bio</span>
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
}

// ═══════════════════════════════════════
// REEL 4: "मेरी माँ ने कहा" — Story format
// First person emotional narrative
// ═══════════════════════════════════════

function StoryText({ text, delay = 0, size = 56, color = '#fff' }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay * fps, fps, config: { damping: 14, stiffness: 80 } });
  return (
    <div style={{
      fontSize: size, fontWeight: 800, color, textAlign: 'center', lineHeight: 1.25,
      fontFamily: "'Tiro Devanagari Hindi', serif", padding: '0 36px',
      opacity: interpolate(p, [0, 1], [0, 1]),
      transform: `translateY(${interpolate(p, [0, 1], [40, 0])}px)`,
      textShadow: '0 4px 30px rgba(0,0,0,.8)',
      whiteSpace: 'pre-line',
    }}>{text}</div>
  );
}

export function StoryReel() {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: '#0a0400' }}>
      <Audio src={staticFile('bhajan.ogg')} volume={0.45} />
      <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 40%, #2a1400 0%, #0a0400 70%)' }} />

      <Sequence from={0} durationInFrames={3 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <StoryText text="कल माँ ने कहा..." size={64} />
        </AbsoluteFill>
      </Sequence>
      <Sequence from={3 * fps} durationInFrames={3 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <StoryText text="&quot;बेटा, तुम्हारा{'\n'}वो Good Morning{'\n'}बहुत अच्छा था&quot;" size={52} color="#FFE84A" />
        </AbsoluteFill>
      </Sequence>
      <Sequence from={6 * fps} durationInFrames={2.5 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <StoryText text="माँ की आँखों में{'\n'}खुशी देखकर{'\n'}दिल भर आया 🥺" size={50} />
        </AbsoluteFill>
      </Sequence>
      <Sequence from={8.5 * fps} durationInFrames={2 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
          <StoryText text="सिर्फ एक वीडियो कार्ड{'\n'}ने माँ का दिन बना दिया" size={44} color="rgba(255,255,255,.7)" />
        </AbsoluteFill>
      </Sequence>
      <Sequence from={10.5 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
          <StoryText text="🪔 वंदन" size={72} color="#FFE84A" />
          <StoryText text="आपकी माँ भी{'\n'}ऐसे मुस्कुराएगी" size={36} delay={0.3} color="rgba(255,255,255,.6)" />
          <div style={{ background: '#25D366', borderRadius: 100, padding: '16px 40px', marginTop: 16 }}>
            <span style={{ fontSize: 24, fontWeight: 800, color: '#fff', fontFamily: "'Outfit', sans-serif" }}>Link in bio 👆</span>
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
}

// ═══════════════════════════════════════
// REEL 5: "This or That" — Poll/comparison format
// High engagement — people comment their choice
// ═══════════════════════════════════════

function OptionCard({ text, emoji, side, delay = 0, highlight = false }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay * fps, fps, config: { damping: 12, stiffness: 80 } });
  return (
    <div style={{
      background: highlight ? 'rgba(37,211,102,.2)' : 'rgba(255,255,255,.08)',
      border: highlight ? '3px solid #25D366' : '2px solid rgba(255,255,255,.15)',
      borderRadius: 24, padding: '28px 20px', textAlign: 'center', flex: 1,
      opacity: interpolate(p, [0, 1], [0, 1]),
      transform: `translateX(${interpolate(p, [0, 1], [side === 'left' ? -100 : 100, 0])}px)`,
    }}>
      <div style={{ fontSize: 48, marginBottom: 10 }}>{emoji}</div>
      <div style={{ fontSize: 22, fontWeight: 700, color: '#fff', fontFamily: "'Tiro Devanagari Hindi', serif", lineHeight: 1.3, whiteSpace: 'pre-line' }}>{text}</div>
      {highlight && <div style={{ fontSize: 14, color: '#25D366', fontWeight: 700, marginTop: 8 }}>✓ WINNER</div>}
    </div>
  );
}

export function PollReel() {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: 'linear-gradient(160deg, #1a0800 0%, #0a0400 100%)' }}>
      <Audio src={staticFile('santali.ogg')} volume={0.35} />

      <Sequence from={0} durationInFrames={2.5 * fps}>
        <AbsoluteFill style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <StoryText text="This or That? 🤔" size={72} color="#FFE84A" />
        </AbsoluteFill>
      </Sequence>

      <Sequence from={2.5 * fps} durationInFrames={4 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: '0 20px' }}>
          <div style={{ fontSize: 28, color: 'rgba(255,255,255,.5)', fontWeight: 700, fontFamily: "'Outfit', sans-serif", marginBottom: 10 }}>
            माँ को Good Morning भेजना है
          </div>
          <div style={{ display: 'flex', gap: 14, width: '100%' }}>
            <OptionCard text="Boring Text{'\n'}Message 😒" emoji="📝" side="left" delay={0} />
            <OptionCard text="वंदन वीडियो{'\n'}कार्ड 🎬" emoji="🪔" side="right" delay={0.3} />
          </div>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={7 * fps} durationInFrames={2.5 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: '0 20px' }}>
          <div style={{ fontSize: 24, color: 'rgba(255,255,255,.5)', fontWeight: 700, fontFamily: "'Outfit', sans-serif", marginBottom: 10 }}>
            सही जवाब ✓
          </div>
          <div style={{ display: 'flex', gap: 14, width: '100%' }}>
            <OptionCard text="Boring Text{'\n'}Message 😒" emoji="📝" side="left" delay={0} />
            <OptionCard text="वंदन वीडियो{'\n'}कार्ड 🎬" emoji="🪔" side="right" delay={0.2} highlight={true} />
          </div>
        </AbsoluteFill>
      </Sequence>

      <Sequence from={10 * fps}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
          <StoryText text="🪔 वंदन" size={72} color="#FFE84A" />
          <StoryText text="FREE · Link in bio 👆" size={28} delay={0.3} color="rgba(255,255,255,.5)" />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
}
