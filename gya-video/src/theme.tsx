import React from 'react';
import {AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {fuentesListas} from './fonts';

export const sans = 'Poppins';
export const serif = 'Playfair Display';
void fuentesListas;

export const C = {
  bg: '#0b0907',
  card: '#16110c',
  red: '#c8102e',
  cream: '#f5ead6',
  gold: '#d9b25f',
  line: 'rgba(217,178,95,0.35)',
};

export const ease = Easing.bezier(0.22, 1, 0.36, 1);

/** 0→1 entre los frames a y b, con easing suave y clamp. */
export const prog = (f: number, a: number, b: number, e = ease) =>
  interpolate(f, [a, b], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: e});

export const precioTexto = (n: number) => Math.round(n).toLocaleString('es-AR').replace(/,/g, '.');

/** Texto con degradé dorado y un brillo que recorre las letras. */
export const Gold: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => {
  const f = useCurrentFrame();
  const shine = interpolate(f % 150, [0, 150], [-60, 160]);
  return (
    <span
      style={{
        backgroundImage: `linear-gradient(100deg, #b08a42 0%, #e9c878 ${shine - 30}%, #fff3cf ${shine}%, #e9c878 ${shine + 30}%, #b88c3e 130%)`,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
        ...style,
      }}
    >
      {children}
    </span>
  );
};

export const Tag: React.FC<{children: React.ReactNode; size?: number; style?: React.CSSProperties}> = ({children, size = 30, style}) => (
  <div
    style={{
      display: 'inline-block',
      background: C.red,
      color: '#fff',
      fontFamily: sans,
      fontWeight: 700,
      fontSize: size,
      letterSpacing: size * 0.18,
      padding: `${size * 0.3}px ${size * 0.7}px`,
      borderRadius: size * 0.2,
      textTransform: 'uppercase',
      boxShadow: '0 10px 30px rgba(200,16,46,0.35)',
      ...style,
    }}
  >
    {children}
  </div>
);

/** Fondo negro cálido con resplandor y viñeta. */
export const Fondo: React.FC = () => {
  const f = useCurrentFrame();
  const x = 50 + Math.sin(f / 90) * 12;
  return (
    <AbsoluteFill style={{background: C.bg}}>
      <AbsoluteFill
        style={{background: `radial-gradient(ellipse 70% 60% at ${x}% 45%, rgba(150,95,35,0.20), rgba(11,9,7,0) 70%)`}}
      />
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.6) 100%)'}} />
    </AbsoluteFill>
  );
};

/** Foto con zoom lento (Ken Burns). */
export const KenBurns: React.FC<{
  src: string;
  dur: number;
  from?: number;
  to?: number;
  dx?: number;
  dy?: number;
  style?: React.CSSProperties;
}> = ({src, dur, from = 1.04, to = 1.16, dx = -2, dy = -1.5, style}) => {
  const f = useCurrentFrame();
  const t = interpolate(f, [0, dur], [0, 1], {extrapolateRight: 'clamp'});
  return (
    <div style={{position: 'absolute', inset: 0, overflow: 'hidden', ...style}}>
      <Img
        src={staticFile(`fotos/${src}`)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: `scale(${from + (to - from) * t}) translate(${dx * t}%, ${dy * t}%)`,
        }}
      />
    </div>
  );
};

/** Entrada/salida suave común a todas las escenas. */
export const Escena: React.FC<{dur: number; children: React.ReactNode; salida?: boolean}> = ({dur, children, salida = true}) => {
  const f = useCurrentFrame();
  const inn = prog(f, 0, 14);
  const out = salida ? prog(f, dur - 12, dur, Easing.in(Easing.cubic)) : 0;
  return (
    <AbsoluteFill
      style={{
        opacity: inn * (1 - out),
        transform: `scale(${1.03 - 0.03 * inn + 0.04 * out})`,
        filter: out > 0 ? `blur(${out * 8}px)` : undefined,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
