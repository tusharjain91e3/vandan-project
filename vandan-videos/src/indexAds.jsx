import { registerRoot } from 'remotion';
import { Composition } from 'remotion';
import { Ad1, Ad2, Ad3, Ad4, Ad5 } from './AdReels';

const FPS = 30;
function Root() {
  return (
    <>
      <Composition id="ad-3steps" component={Ad1} durationInFrames={12*FPS} fps={FPS} width={1080} height={1920} />
      <Composition id="ad-features" component={Ad2} durationInFrames={12*FPS} fps={FPS} width={1080} height={1920} />
      <Composition id="ad-problem" component={Ad3} durationInFrames={12*FPS} fps={FPS} width={1080} height={1920} />
      <Composition id="ad-categories" component={Ad4} durationInFrames={12*FPS} fps={FPS} width={1080} height={1920} />
      <Composition id="ad-emotional" component={Ad5} durationInFrames={12*FPS} fps={FPS} width={1080} height={1920} />
    </>
  );
}
registerRoot(Root);
