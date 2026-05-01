import { registerRoot } from 'remotion';
import { Composition } from 'remotion';
import MarketingReel from './MarketingReel';

function Root() {
  return (
    <>
      <Composition id="mkt-01-whatsapp-hook" component={MarketingReel} durationInFrames={12 * 30} fps={30} width={1080} height={1920}
        defaultProps={{ variant: 1, music: 'flute.ogg' }} />
      <Composition id="mkt-02-stats" component={MarketingReel} durationInFrames={12 * 30} fps={30} width={1080} height={1920}
        defaultProps={{ variant: 2, music: 'mohan.ogg' }} />
      <Composition id="mkt-03-card-showcase" component={MarketingReel} durationInFrames={12 * 30} fps={30} width={1080} height={1920}
        defaultProps={{ variant: 3, music: 'santali.ogg' }} />
      <Composition id="mkt-04-maa-emotional" component={MarketingReel} durationInFrames={15 * 30} fps={30} width={1080} height={1920}
        defaultProps={{ variant: 4, music: 'bhajan.ogg' }} />
      <Composition id="mkt-05-features" component={MarketingReel} durationInFrames={12 * 30} fps={30} width={1080} height={1920}
        defaultProps={{ variant: 5, music: 'veena.ogg' }} />
    </>
  );
}

registerRoot(Root);
