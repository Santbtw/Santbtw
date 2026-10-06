import {AbsoluteFill, random, useCurrentFrame} from 'remotion';

/** Partículas doradas que suben lentamente (brasas). */
export const Brasas: React.FC<{n?: number; opacidad?: number}> = ({n = 36, opacidad = 0.7}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {Array.from({length: n}).map((_, i) => {
        const vel = 0.6 + random(`v${i}`) * 1.4;
        const size = 3 + random(`s${i}`) * 6;
        const x = random(`x${i}`) * 1920 + Math.sin((f + i * 20) / 40) * 18;
        const y = 1120 - ((random(`y${i}`) * 1200 + f * vel) % 1200);
        const tw = 0.4 + 0.6 * Math.abs(Math.sin((f + i * 13) / 18));
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: size,
              height: size,
              borderRadius: '50%',
              background: i % 4 === 0 ? '#ff7a3d' : '#f0c56a',
              boxShadow: `0 0 ${size * 3}px ${i % 4 === 0 ? '#ff5a1f' : '#e9b850'}`,
              opacity: tw * opacidad * Math.min(1, y / 300),
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
