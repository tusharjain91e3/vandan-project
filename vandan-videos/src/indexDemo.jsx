import { registerRoot } from 'remotion';
import { Composition } from 'remotion';
import DemoVideo from './DemoVideo';

function Root() {
  return (
    <Composition
      id="demo"
      component={DemoVideo}
      durationInFrames={38 * 30}
      fps={30}
      width={1080}
      height={1920}
    />
  );
}

registerRoot(Root);
