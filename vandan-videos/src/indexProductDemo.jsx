import { registerRoot } from 'remotion';
import { Composition } from 'remotion';
import ProductDemo from './ProductDemo';

function Root() {
  return (
    <Composition
      id="product-demo"
      component={ProductDemo}
      durationInFrames={42 * 30}
      fps={30}
      width={1920}
      height={1080}
    />
  );
}

registerRoot(Root);
