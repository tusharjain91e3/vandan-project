import { registerRoot } from 'remotion';
import { Composition } from 'remotion';
import ViralReel from './ViralReel';

function Root() {
  const FPS = 30;
  return (
    <>
      <Composition id="viral-01-ruko" component={ViralReel} durationInFrames={12*FPS} fps={FPS} width={1080} height={1920}
        defaultProps={{ variant: 1, music: 'bhajan.ogg' }} />
      <Composition id="viral-02-maa" component={ViralReel} durationInFrames={12*FPS} fps={FPS} width={1080} height={1920}
        defaultProps={{ variant: 2, music: 'flute.ogg' }} />
      <Composition id="viral-03-features" component={ViralReel} durationInFrames={12*FPS} fps={FPS} width={1080} height={1920}
        defaultProps={{ variant: 3, music: 'mohan.ogg' }} />
      <Composition id="viral-04-before-after" component={ViralReel} durationInFrames={12*FPS} fps={FPS} width={1080} height={1920}
        defaultProps={{ variant: 4, music: 'santali.ogg' }} />
      <Composition id="viral-05-social-proof" component={ViralReel} durationInFrames={12*FPS} fps={FPS} width={1080} height={1920}
        defaultProps={{ variant: 5, music: 'veena.ogg' }} />
    </>
  );
}

registerRoot(Root);
