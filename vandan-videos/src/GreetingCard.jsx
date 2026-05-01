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
} from 'remotion';

// Ken Burns: slow zoom + pan on background photo
function KenBurnsLayer({ src, startScale, endScale, originX, originY, fadeIn, fadeOut, duration }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const totalFrames = duration * fps;

  const scale = interpolate(frame, [0, totalFrames], [startScale, endScale], {
    extrapolateRight: 'clamp',
  });

  const opacity = interpolate(
    frame,
    [fadeIn * fps, (fadeIn + 1) * fps, (fadeOut - 1) * fps, fadeOut * fps],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill style={{ opacity }}>
      <Img
        src={src}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: `scale(${scale})`,
          transformOrigin: `${originX}% ${originY}%`,
        }}
      />
    </AbsoluteFill>
  );
}

// Animated word: fades in with slight upward motion
function AnimatedWord({ children, delay }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay * fps,
    fps,
    config: { damping: 20, stiffness: 120 },
  });

  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const translateY = interpolate(progress, [0, 1], [20, 0]);

  return (
    <span
      style={{
        display: 'inline-block',
        opacity,
        transform: `translateY(${translateY}px)`,
        marginRight: '0.3em',
      }}
    >
      {children}
    </span>
  );
}

// Vandan watermark badge
function VandanBadge() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - 3 * fps,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: 30,
        right: 30,
        background: 'rgba(8,3,0,.42)',
        backdropFilter: 'blur(14px)',
        border: '1.5px solid rgba(255,210,110,.3)',
        borderRadius: 20,
        padding: '14px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        opacity: progress,
        transform: `scale(${interpolate(progress, [0, 1], [0.5, 1])})`,
      }}
    >
      <svg viewBox="0 0 16 16" width="20" height="20" fill="none">
        <path d="M5 9.5C4 9.5 3 10.5 3 12C3 14 6 15.5 8 15.5C10 15.5 13 14 13 12C13 10.5 12 9.5 11 9.5" stroke="rgba(255,220,140,.8)" strokeWidth="1.2" />
        <path d="M8 8.5C6.5 7.5 5 6 5.5 4.5C6 3 7 2 8 1.5C9 2 10 3 10.5 4.5C11 6 9.5 7.5 8 8.5Z" fill="#FFB830" />
      </svg>
      <span
        style={{
          fontFamily: "'Tiro Devanagari Hindi', serif",
          fontSize: 24,
          fontWeight: 700,
          color: 'rgba(255,225,155,.95)',
        }}
      >
        वंदन
      </span>
    </div>
  );
}

// Gold divider line that draws in
function Divider() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const width = interpolate(frame, [0.5 * fps, 1.2 * fps], [0, 80], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width,
        height: 3,
        background: 'rgba(255,215,120,.7)',
        borderRadius: 2,
        marginBottom: 24,
      }}
    />
  );
}

export default function GreetingCard({ category, photos, quote, attr, overlay, gradient, music, isReel = false }) {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const duration = durationInFrames / fps;

  const words = quote.replace(/\n/g, ' ').split(' ').filter(Boolean);
  const wordDelay = 0.18; // seconds between each word
  const startDelay = 1.0; // seconds before first word

  return (
    <AbsoluteFill
      style={{
        background: '#1a0800',
        fontFamily: "'Tiro Devanagari Hindi', serif",
      }}
    >
      {/* Background music */}
      {music && <Audio src={staticFile(music)} volume={0.5} />}

      {/* Gradient fallback */}
      <AbsoluteFill style={{ background: gradient }} />

      {/* Ken Burns photo layers — cycle through 3 photos */}
      {photos.map((photo, i) => {
        const segDuration = duration / 3;
        const fadeIn = i * segDuration;
        const fadeOut = (i + 1) * segDuration;
        const origins = [
          [40, 60],
          [60, 35],
          [50, 70],
        ];
        return (
          <KenBurnsLayer
            key={i}
            src={photo}
            startScale={1.0}
            endScale={1.15}
            originX={origins[i][0]}
            originY={origins[i][1]}
            fadeIn={fadeIn}
            fadeOut={fadeOut}
            duration={duration}
          />
        );
      })}

      {/* Dark overlay for text readability */}
      <AbsoluteFill style={{ background: overlay }} />

      {/* Vignette top */}
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(180deg,rgba(0,0,0,.48) 0%,rgba(0,0,0,.05) 30%,transparent 60%)',
        }}
      />

      {/* Quote content — centered */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '60px 50px 200px',
        }}
      >
        <Divider />

        <div
          style={{
            fontSize: 38,
            fontWeight: 700,
            color: '#FFF8EE',
            lineHeight: 1.35,
            textShadow: '0 3px 24px rgba(0,0,0,.7)',
          }}
        >
          {words.map((word, i) => (
            <AnimatedWord key={i} delay={startDelay + i * wordDelay}>
              {word}
            </AnimatedWord>
          ))}
        </div>

        {/* Attribution */}
        {attr && (
          <div
            style={{
              marginTop: 20,
              fontFamily: "'Outfit', sans-serif",
              fontSize: 20,
              fontWeight: 400,
              color: 'rgba(255,235,185,.85)',
              letterSpacing: 4,
              textTransform: 'uppercase',
              opacity: interpolate(
                frame,
                [2.5 * fps, 3.2 * fps],
                [0, 1],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
              ),
            }}
          >
            {attr}
          </div>
        )}
      </AbsoluteFill>

      {/* Vandan badge */}
      <VandanBadge />

      {/* Reel CTA at bottom */}
      {isReel && <ReelCTA frame={frame} fps={fps} />}
    </AbsoluteFill>
  );
}

function ReelCTA({ frame, fps }) {
  const progress = spring({ frame: frame - 4 * fps, fps, config: { damping: 15, stiffness: 80 } });
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const translateY = interpolate(progress, [0, 1], [40, 0]);

  return (
    <div style={{
      position: 'absolute', bottom: 60, left: 0, right: 0,
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
      opacity, transform: `translateY(${translateY}px)`,
    }}>
      <div style={{
        background: 'rgba(255,249,240,0.95)', borderRadius: 20, padding: '14px 32px',
        display: 'flex', alignItems: 'center', gap: 10,
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
      }}>
        <span style={{ fontSize: 20 }}>🪔</span>
        <span style={{ fontFamily: "'Tiro Devanagari Hindi', serif", fontSize: 22, fontWeight: 700, color: '#2B1810' }}>
          वंदन — Vandan App
        </span>
      </div>
      <div style={{
        fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 600,
        color: 'rgba(255,248,238,0.8)', letterSpacing: 1,
      }}>
        हर रोज़ सुंदर कार्ड भेजें ✨
      </div>
    </div>
  );
}
