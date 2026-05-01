import { registerRoot } from 'remotion';
import { Composition } from 'remotion';
import { ChatReel, CountdownReel, NotificationReel, StoryReel, PollReel } from './Day2Reels';

const FPS = 30;
function Root() {
  return (
    <>
      <Composition id="day2-chat" component={ChatReel} durationInFrames={12*FPS} fps={FPS} width={1080} height={1920} />
      <Composition id="day2-countdown" component={CountdownReel} durationInFrames={12*FPS} fps={FPS} width={1080} height={1920} />
      <Composition id="day2-notification" component={NotificationReel} durationInFrames={12*FPS} fps={FPS} width={1080} height={1920} />
      <Composition id="day2-story" component={StoryReel} durationInFrames={13*FPS} fps={FPS} width={1080} height={1920} />
      <Composition id="day2-poll" component={PollReel} durationInFrames={12*FPS} fps={FPS} width={1080} height={1920} />
    </>
  );
}
registerRoot(Root);
