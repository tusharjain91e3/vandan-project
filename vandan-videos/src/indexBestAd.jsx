import { registerRoot } from 'remotion';
import { Composition } from 'remotion';
import BestAd from './BestAd';

function Root() {
  return (
    <Composition id="best-ad" component={BestAd} durationInFrames={20 * 30} fps={30} width={1080} height={1920} />
  );
}
registerRoot(Root);
