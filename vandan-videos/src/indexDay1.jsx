import { registerRoot } from 'remotion';
import { Composition } from 'remotion';
import { Reel1, Reel2, Reel3, Reel4, Reel5 } from './Day1Reels';

const FPS = 30;

function Root() {
  return (
    <>
      <Composition id="day1-maa" component={Reel1} durationInFrames={12*FPS} fps={FPS} width={1080} height={1920} />
      <Composition id="day1-gita" component={Reel2} durationInFrames={12*FPS} fps={FPS} width={1080} height={1920} />
      <Composition id="day1-viral" component={Reel3} durationInFrames={12*FPS} fps={FPS} width={1080} height={1920} />
      <Composition id="day1-mahadev" component={Reel4} durationInFrames={12*FPS} fps={FPS} width={1080} height={1920} />
      <Composition id="day1-beforeafter" component={Reel5} durationInFrames={12*FPS} fps={FPS} width={1080} height={1920} />
    </>
  );
}

registerRoot(Root);
