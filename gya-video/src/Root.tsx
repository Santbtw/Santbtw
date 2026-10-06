import {Composition} from 'remotion';
import {GyaLoop, duracionTotal} from './GyaLoop';

export const RemotionRoot = () => (
  <Composition
    id="GyaLoop"
    component={GyaLoop}
    durationInFrames={duracionTotal}
    fps={30}
    width={1920}
    height={1080}
  />
);
