import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {negocio} from '../../data/negocio';
import {C, Gold, KenBurns, Tag, prog, sans, serif} from '../theme';

/** Layout: panel de foto con Ken Burns a un costado y contenido al otro. */
const ConFoto: React.FC<{foto: string; dur: number; lado: 'izq' | 'der'; ancho?: number; children: React.ReactNode}> = ({
  foto,
  dur,
  lado,
  ancho = 800,
  children,
}) => {
  const f = useCurrentFrame();
  const w = prog(f, 0, 26);
  const izq = lado === 'izq';
  const clip = izq ? `inset(0 ${(1 - w) * 100}% 0 0)` : `inset(0 0 0 ${(1 - w) * 100}%)`;
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', top: 0, bottom: 0, width: ancho, [izq ? 'left' : 'right']: 0, clipPath: clip}}>
        <KenBurns src={foto} dur={dur} from={1.05} to={1.2} dx={izq ? 2 : -2} dy={-1.5} />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(${izq ? 90 : 270}deg, transparent 55%, ${C.bg} 100%)`,
          }}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          [izq ? 'left' : 'right']: ancho,
          [izq ? 'right' : 'left']: 0,
          padding: '0 110px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};

const Sube: React.FC<{d: number; children: React.ReactNode; style?: React.CSSProperties}> = ({d, children, style}) => {
  const f = useCurrentFrame();
  const p = prog(f, d, d + 18);
  return <div style={{opacity: p, transform: `translateY(${(1 - p) * 50}px)`, ...style}}>{children}</div>;
};

const Titulo: React.FC<{children: React.ReactNode; size?: number}> = ({children, size = 150}) => (
  <Gold style={{fontFamily: serif, fontWeight: 900, fontSize: size, lineHeight: 1.02, display: 'block'}}>{children}</Gold>
);

export const Online: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  const [a, b] = negocio.web;
  const n = Math.floor(Math.max(0, f - 30) * 1.3);
  const caret = Math.floor(f / 8) % 2 === 0;
  const box = prog(f, 22, 40);
  return (
    <ConFoto foto={negocio.fotosEscenas.online} dur={dur} lado="izq">
      <Sube d={6}>
        <Tag size={32}>Comprá desde tu casa</Tag>
      </Sube>
      <Sube d={12} style={{margin: '30px 0 50px'}}>
        <Titulo>Pedí online</Titulo>
      </Sube>
      <div
        style={{
          opacity: box,
          transform: `scale(${0.94 + 0.06 * box})`,
          transformOrigin: 'left center',
          border: `2px solid ${C.line}`,
          background: 'rgba(217,178,95,0.07)',
          borderRadius: 24,
          padding: '34px 44px',
          fontFamily: sans,
          lineHeight: 1.15,
          minHeight: 240,
        }}
      >
        <div style={{fontWeight: 700, fontSize: 74, color: C.cream}}>
          {a.slice(0, n)}
          {n < a.length && caret ? <span style={{color: C.red}}>|</span> : null}
        </div>
        <div style={{fontWeight: 600, fontSize: 56, color: C.gold}}>
          {b.slice(0, Math.max(0, n - a.length))}
          {n >= a.length && caret ? <span style={{color: C.red}}>|</span> : null}
        </div>
      </div>
    </ConFoto>
  );
};

const Pin: React.FC = () => {
  const f = useCurrentFrame();
  const drop = prog(f, 14, 34, Easing.bezier(0.34, 1.6, 0.64, 1));
  return (
    <div style={{position: 'relative', width: 150, height: 170, flexShrink: 0}}>
      {[0, 1].map((k) => {
        const t = ((f - 30 + k * 25) % 50) / 50;
        return (
          <div
            key={k}
            style={{
              position: 'absolute',
              left: 75 - 70 * t,
              top: 150 - 22 * t,
              width: 140 * t,
              height: 44 * t,
              borderRadius: '50%',
              border: `3px solid ${C.red}`,
              opacity: f > 30 ? 1 - t : 0,
            }}
          />
        );
      })}
      <svg width={150} height={160} viewBox="0 0 100 110" style={{position: 'absolute', top: 0, transform: `translateY(${(1 - drop) * -120}px)`, opacity: Math.min(1, drop * 2)}}>
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f3d488" />
            <stop offset="1" stopColor="#a87b2f" />
          </linearGradient>
        </defs>
        <path d="M50 104 C50 104 14 62 14 38 A36 36 0 0 1 86 38 C86 62 50 104 50 104 Z" fill="url(#g)" />
        <circle cx="50" cy="38" r="14" fill={C.bg} />
      </svg>
    </div>
  );
};

export const Envios: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  const ruta = prog(f, 30, 70);
  return (
    <ConFoto foto={negocio.fotosEscenas.envios} dur={dur} lado="der">
      <Sube d={6}>
        <Tag size={32}>Te lo llevamos</Tag>
      </Sube>
      <Sube d={12} style={{margin: '30px 0 40px'}}>
        <Titulo size={140}>
          Envíos a<br />domicilio
        </Titulo>
      </Sube>
      <div style={{display: 'flex', alignItems: 'center', gap: 34}}>
        <Pin />
        <Sube d={26}>
          <div style={{fontFamily: sans, fontWeight: 700, fontSize: 56, color: C.cream, lineHeight: 1.15}}>{negocio.envios.zona}</div>
          <div style={{fontFamily: sans, fontWeight: 500, fontSize: 50, color: C.gold}}>{negocio.envios.extra}</div>
        </Sube>
      </div>
      <svg width={860} height={30} style={{marginTop: 34}}>
        <line x1={0} y1={15} x2={860 * ruta} y2={15} stroke={C.red} strokeWidth={5} strokeDasharray="18 14" strokeDashoffset={-f * 2} />
      </svg>
    </ConFoto>
  );
};

export const Horarios: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  const ang = interpolate(f, [0, dur], [0, 360]);
  return (
    <ConFoto foto={negocio.fotosEscenas.horarios} dur={dur} lado="izq" ancho={680}>
      <div style={{display: 'flex', alignItems: 'center', gap: 40}}>
        <Sube d={4}>
          <svg width={130} height={130} viewBox="0 0 100 100">
            <circle cx={50} cy={50} r={44} fill="none" stroke={C.gold} strokeWidth={6} />
            <line x1={50} y1={50} x2={50} y2={24} stroke={C.cream} strokeWidth={6} strokeLinecap="round" transform={`rotate(${ang} 50 50)`} />
            <line x1={50} y1={50} x2={68} y2={50} stroke={C.red} strokeWidth={6} strokeLinecap="round" transform={`rotate(${ang / 12} 50 50)`} />
            <circle cx={50} cy={50} r={5} fill={C.cream} />
          </svg>
        </Sube>
        <Sube d={10}>
          <Titulo>Horarios</Titulo>
        </Sube>
      </div>
      <div style={{marginTop: 50, display: 'flex', flexDirection: 'column', gap: 34}}>
        {negocio.horarios.map((h, i) => (
          <Sube key={h.dias} d={24 + i * 14}>
            <div
              style={{
                borderLeft: `8px solid ${C.red}`,
                background: 'rgba(217,178,95,0.07)',
                borderRadius: '0 22px 22px 0',
                padding: '24px 40px',
              }}
            >
              <div style={{fontFamily: sans, fontWeight: 700, fontSize: 40, letterSpacing: 6, color: C.cream, textTransform: 'uppercase'}}>
                {h.dias}
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: 30, marginTop: 6}}>
                {h.turnos.map((t, k) => (
                  <div key={t} style={{display: 'flex', alignItems: 'center', gap: 30}}>
                    {k > 0 && <div style={{width: 14, height: 14, borderRadius: 7, background: C.red}} />}
                    <Gold style={{fontFamily: sans, fontWeight: 800, fontSize: 76, lineHeight: 1.1}}>{t}</Gold>
                  </div>
                ))}
              </div>
            </div>
          </Sube>
        ))}
      </div>
    </ConFoto>
  );
};

export const Puntos: React.FC<{dur: number}> = ({dur}) => {
  const f = useCurrentFrame();
  const anillo = prog(f, 20, 80, Easing.inOut(Easing.cubic));
  const estrella = prog(f, 70, 86, Easing.bezier(0.34, 1.8, 0.64, 1));
  const R = 80;
  const L = 2 * Math.PI * R;
  return (
    <ConFoto foto={negocio.fotosEscenas.puntos} dur={dur} lado="der" ancho={640}>
      <div style={{display: 'flex', alignItems: 'center', gap: 40}}>
        <Sube d={4}>
          <svg width={190} height={190} viewBox="0 0 190 190">
            <circle cx={95} cy={95} r={R} fill="none" stroke="rgba(245,234,214,0.15)" strokeWidth={12} />
            <circle
              cx={95}
              cy={95}
              r={R}
              fill="none"
              stroke={C.red}
              strokeWidth={12}
              strokeLinecap="round"
              strokeDasharray={L}
              strokeDashoffset={L * (1 - anillo)}
              transform="rotate(-90 95 95)"
            />
            <g transform={`translate(95 97) scale(${0.4 + 0.6 * estrella})`}>
              <path
                d="M0 -48 L13 -16 L47 -15 L21 6 L30 39 L0 20 L-30 39 L-21 6 L-47 -15 L-13 -16 Z"
                fill="#e9c878"
                opacity={Math.min(1, 0.3 + estrella)}
              />
            </g>
          </svg>
        </Sube>
        <Sube d={10}>
          <Titulo size={124}>Sumá puntos</Titulo>
        </Sube>
      </div>
      <Sube d={26} style={{marginTop: 50}}>
        <div style={{fontFamily: sans, fontWeight: 700, fontSize: 62, color: C.cream, lineHeight: 1.2}}>
          Con cada compra
          <br />
          sumás puntos.
        </div>
      </Sube>
      <Sube d={42} style={{marginTop: 34}}>
        <div style={{fontFamily: sans, fontWeight: 500, fontSize: 46, color: C.gold, lineHeight: 1.3}}>
          Consultá en el local
          <br />
          cómo canjearlos.
        </div>
      </Sube>
    </ConFoto>
  );
};
