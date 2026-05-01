import React from 'react';
import {
  AbsoluteFill, Audio, Img, Sequence,
  interpolate, useCurrentFrame, useVideoConfig, spring, staticFile,
} from 'remotion';

const px = id => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop&q=85`;

// ── Clean text component ──
function Text({ children, delay = 0, size = 36, color = '#fff', weight = 600, font = "'Outfit', sans-serif", align = 'center', style = {} }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay * fps, fps, config: { damping: 15, stiffness: 100 } });

  return (
    <div style={{
      fontSize: size, fontWeight: weight, color,
      fontFamily: font, textAlign: align, lineHeight: 1.3,
      opacity: interpolate(p, [0, 1], [0, 1]),
      transform: `translateY(${interpolate(p, [0, 1], [20, 0])}px)`,
      ...style,
    }}>
      {children}
    </div>
  );
}

// ── Section title bar ──
function SectionBar({ text, delay = 0 }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay * fps, fps, config: { damping: 14, stiffness: 80 } });

  return (
    <div style={{
      position: 'absolute', top: 40, left: 0, right: 0,
      display: 'flex', justifyContent: 'center', zIndex: 10,
      opacity: interpolate(p, [0, 1], [0, 1]),
    }}>
      <div style={{
        background: 'rgba(0,0,0,.6)', backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,.1)',
        borderRadius: 100, padding: '10px 28px',
        fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,.7)',
        fontFamily: "'Outfit', sans-serif", letterSpacing: 2, textTransform: 'uppercase',
      }}>{text}</div>
    </div>
  );
}

// ── Background with subtle Ken Burns ──
function BG({ photo, overlay = 'rgba(0,0,0,.75)' }) {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const scale = interpolate(frame, [0, durationInFrames], [1, 1.08], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill>
      {photo ? (
        <Img src={photo} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${scale})` }} />
      ) : null}
      <AbsoluteFill style={{ background: overlay }} />
    </AbsoluteFill>
  );
}

export default function ProductDemo() {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: '#000', fontFamily: "'Outfit', sans-serif" }}>
      <Audio src={staticFile('flute.ogg')} volume={0.25} />

      {/* ═══ SCENE 1: Title Card (0-5s) ═══ */}
      <Sequence from={0} durationInFrames={5 * fps}>
        <AbsoluteFill>
          <BG photo={px(31072582)} overlay="rgba(10,4,0,.85)" />
          <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
            <Text delay={0.3} size={20} color="rgba(230,168,32,.8)" weight={700} style={{ letterSpacing: 3 }}>INTRODUCING</Text>
            <Text delay={0.6} size={72} weight={900} style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}>🪔 वंदन</Text>
            <Text delay={1} size={24} color="rgba(255,255,255,.6)">Personalized Video Greeting Cards for WhatsApp</Text>
            <div style={{ width: 60, height: 2, background: 'rgba(230,168,32,.4)', marginTop: 16, borderRadius: 2 }} />
            <Text delay={1.5} size={16} color="rgba(255,255,255,.35)">Hackathon Demo — 2026</Text>
          </AbsoluteFill>
        </AbsoluteFill>
      </Sequence>

      {/* ═══ SCENE 2: The Problem (5-10s) ═══ */}
      <Sequence from={5 * fps} durationInFrames={5 * fps}>
        <AbsoluteFill>
          <BG overlay="rgba(5,5,15,.92)" />
          <SectionBar text="The Problem" />
          <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: 60 }}>
            <Text delay={0.3} size={42} weight={800}>300M+ Indians share{'\n'}"Good Morning" daily</Text>
            <Text delay={0.8} size={22} color="rgba(255,255,255,.5)">on WhatsApp</Text>
            <div style={{ height: 20 }} />
            <Text delay={1.3} size={28} color="#ff6b6b" weight={700}>But they're all generic text forwards</Text>
            <Text delay={1.8} size={20} color="rgba(255,255,255,.4)">No personalization • No video • No music • Boring</Text>
          </AbsoluteFill>
        </AbsoluteFill>
      </Sequence>

      {/* ═══ SCENE 3: The Solution (10-16s) ═══ */}
      <Sequence from={10 * fps} durationInFrames={6 * fps}>
        <AbsoluteFill>
          <BG photo={px(5791086)} overlay="rgba(10,4,0,.82)" />
          <SectionBar text="Our Solution" />
          <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 60 }}>
            <Text delay={0.3} size={36} weight={800} color="#FFE84A">Vandan — वंदन</Text>
            <Text delay={0.6} size={22} color="rgba(255,255,255,.7)">Personalized video greeting cards with</Text>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 12 }}>
              <Text delay={1.0} size={24} weight={700}>🎬  Beautiful 10-second videos</Text>
              <Text delay={1.3} size={24} weight={700}>🎵  Indian classical music (flute, veena, bhajan)</Text>
              <Text delay={1.6} size={24} weight={700}>📛  User's NAME on every card</Text>
              <Text delay={1.9} size={24} weight={700}>📲  Direct WhatsApp share as video file</Text>
            </div>
          </AbsoluteFill>
        </AbsoluteFill>
      </Sequence>

      {/* ═══ SCENE 4: How It Works (16-24s) ═══ */}
      <Sequence from={16 * fps} durationInFrames={3 * fps}>
        <AbsoluteFill>
          <BG overlay="rgba(5,5,15,.92)" />
          <SectionBar text="How It Works" />
          <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
            <Text delay={0} size={80} weight={900} color="#FFE84A">Step 1</Text>
            <Text delay={0.3} size={28}>User enters Name + WhatsApp Number</Text>
            <Text delay={0.6} size={18} color="rgba(255,255,255,.4)">Lead captured in Supabase • Country code selector • Phone validation</Text>
          </AbsoluteFill>
        </AbsoluteFill>
      </Sequence>
      <Sequence from={19 * fps} durationInFrames={2.5 * fps}>
        <AbsoluteFill>
          <BG photo={px(9375018)} overlay="rgba(10,4,0,.85)" />
          <SectionBar text="How It Works" />
          <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
            <Text delay={0} size={80} weight={900} color="#FFE84A">Step 2</Text>
            <Text delay={0.3} size={28}>Browse 8 categories, 50+ video cards</Text>
            <Text delay={0.6} size={18} color="rgba(255,255,255,.4)">Morning • Bhagavad Gita • Devotional • Motivation • Night • Festival • Birthday • Gratitude</Text>
          </AbsoluteFill>
        </AbsoluteFill>
      </Sequence>
      <Sequence from={21.5 * fps} durationInFrames={2.5 * fps}>
        <AbsoluteFill>
          <BG photo={px(1631677)} overlay="rgba(10,4,0,.82)" />
          <SectionBar text="How It Works" />
          <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
            <Text delay={0} size={80} weight={900} color="#25D366">Step 3</Text>
            <Text delay={0.3} size={28}>Share on WhatsApp — video sent as file</Text>
            <Text delay={0.6} size={18} color="rgba(255,255,255,.4)">navigator.share API • Video file attachment • Personalized caption</Text>
          </AbsoluteFill>
        </AbsoluteFill>
      </Sequence>

      {/* ═══ SCENE 5: Tech Stack (24-29s) ═══ */}
      <Sequence from={24 * fps} durationInFrames={5 * fps}>
        <AbsoluteFill>
          <BG overlay="rgba(5,5,15,.92)" />
          <SectionBar text="Tech Stack" />
          <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, padding: 60 }}>
            <Text delay={0.2} size={20} color="rgba(255,255,255,.4)">Built entirely with Claude Code</Text>
            <div style={{ height: 8 }} />
            <Text delay={0.5} size={22} weight={700}>Frontend — React 19 + Vite</Text>
            <Text delay={0.8} size={22} weight={700}>Videos — Remotion (50 pre-rendered with music)</Text>
            <Text delay={1.1} size={22} weight={700}>Backend — Supabase (PostgreSQL + Storage)</Text>
            <Text delay={1.4} size={22} weight={700}>Hosting — Vercel</Text>
            <Text delay={1.7} size={22} weight={700}>Languages — 6 (Hindi, English, Marathi, Tamil, Telugu, Gujarati)</Text>
            <div style={{ height: 8 }} />
            <Text delay={2.2} size={18} color="rgba(255,255,255,.3)">+ Instagram marketing: 48 reels + 5 viral marketing reels</Text>
          </AbsoluteFill>
        </AbsoluteFill>
      </Sequence>

      {/* ═══ SCENE 6: GTM (29-34s) ═══ */}
      <Sequence from={29 * fps} durationInFrames={5 * fps}>
        <AbsoluteFill>
          <BG photo={px(33770430)} overlay="rgba(10,4,0,.85)" />
          <SectionBar text="Go-To-Market" />
          <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, padding: 60 }}>
            <Text delay={0.3} size={28} weight={800} color="#FFE84A">Instagram Reels → WhatsApp Virality</Text>
            <div style={{ height: 8 }} />
            <Text delay={0.6} size={20} color="rgba(255,255,255,.6)" align="left" style={{ maxWidth: 500 }}>
              • @vandanposterapp — 50+ reels uploaded{'\n'}
              • Each shared card = free marketing (name + वंदन branding){'\n'}
              • Viral loop: User shares → Recipient sees brand → Downloads → Shares more{'\n'}
              • Target: Tier 2-3 India, age 40-65, WhatsApp-first audience
            </Text>
            <div style={{ height: 8 }} />
            <Text delay={1.5} size={18} color="rgba(255,255,255,.3)">Secondary: Bhagwan Ka Sandesh — divine messages from 8 deities</Text>
          </AbsoluteFill>
        </AbsoluteFill>
      </Sequence>

      {/* ═══ SCENE 7: Metrics (34-38s) ═══ */}
      <Sequence from={34 * fps} durationInFrames={4 * fps}>
        <AbsoluteFill>
          <BG overlay="rgba(5,5,15,.92)" />
          <SectionBar text="What We Built" />
          <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
            <div style={{ display: 'flex', gap: 30, flexWrap: 'wrap', justifyContent: 'center' }}>
              {[
                ['50+', 'Video Cards'],
                ['8', 'Categories'],
                ['6', 'Languages'],
                ['48', 'Instagram Reels'],
                ['8', 'Deity Experiences'],
              ].map(([num, label], i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <Text delay={0.3 + i * 0.2} size={44} weight={900} color="#FFE84A">{num}</Text>
                  <Text delay={0.5 + i * 0.2} size={14} color="rgba(255,255,255,.5)">{label}</Text>
                </div>
              ))}
            </div>
          </AbsoluteFill>
        </AbsoluteFill>
      </Sequence>

      {/* ═══ SCENE 8: End Card (38-42s) ═══ */}
      <Sequence from={38 * fps}>
        <AbsoluteFill>
          <BG photo={px(36478011)} overlay="rgba(10,4,0,.88)" />
          <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
            <Text delay={0.3} size={60} weight={900} style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}>🪔 वंदन</Text>
            <Text delay={0.6} size={22} color="rgba(255,255,255,.6)">Personalized Video Greeting Cards for WhatsApp</Text>
            <div style={{ height: 16 }} />
            <Text delay={1} size={18} color="#FFE84A">vandan-app.vercel.app</Text>
            <Text delay={1.2} size={14} color="rgba(255,255,255,.3)">Built with Claude Code • React • Remotion • Supabase</Text>
          </AbsoluteFill>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
}
