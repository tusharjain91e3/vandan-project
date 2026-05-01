import { registerRoot } from 'remotion';
import { Composition } from 'remotion';
import { ProAd1, ProAd2, ProAd3, ProAd4, ProAd5 } from './ProAds';
const F = 30;
function Root() {
  return (
    <>
      <Composition id="pro-cards" component={ProAd1} durationInFrames={16*F} fps={F} width={1080} height={1920} />
      <Composition id="pro-whatsapp" component={ProAd2} durationInFrames={12*F} fps={F} width={1080} height={1920} />
      <Composition id="pro-compare" component={ProAd3} durationInFrames={12*F} fps={F} width={1080} height={1920} />
      <Composition id="pro-speed" component={ProAd4} durationInFrames={12*F} fps={F} width={1080} height={1920} />
      <Composition id="pro-emotional" component={ProAd5} durationInFrames={12*F} fps={F} width={1080} height={1920} />
    </>
  );
}
registerRoot(Root);
