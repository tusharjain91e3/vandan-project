import React from 'react';
import { Composition } from 'remotion';
import GreetingCard from './GreetingCard';
import { ALL_VIDEOS } from './data-extended';

const FPS = 30;
const DURATION_SECONDS = 15; // Longer for reels

export default function RootInsta() {
  return (
    <>
      {ALL_VIDEOS.map((v) => (
        <Composition
          key={v.id}
          id={v.id}
          component={GreetingCard}
          durationInFrames={DURATION_SECONDS * FPS}
          fps={FPS}
          width={1080}
          height={1920}
          defaultProps={{
            category: v.category,
            photos: v.photos,
            quote: v.quote,
            attr: v.attr,
            overlay: v.overlay,
            gradient: v.gradient,
            music: v.music,
            isReel: true,
          }}
        />
      ))}
    </>
  );
}
