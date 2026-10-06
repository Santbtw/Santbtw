import {AbsoluteFill, Easing, useCurrentFrame} from 'remotion';
import type {Oferta} from '../../data/ofertas';
import {C, Gold, KenBurns, Tag, prog, precioTexto, sans, serif} from '../theme';
import {Brasas} from './Brasas';

export const OfertasTitulo: React.FC = () => {
  const f = useCurrentFrame();
  const a = prog(f, 0, 22);
  const b = prog(f, 12, 30);
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
      <Brasas opacidad={0.5} />
      <div style={{transform: `scale(${0.85 + 0.15 * a})`, opacity: a, textAlign: 'center'}}>
        <Gold style={{fontFamily: serif, fontWeight: 900, fontSize: 230, lineHeight: 1, letterSpacing: 8}}>OFERTAS</Gold>
      </div>
      <div style={{marginTop: 30, opacity: b, transform: `translateY(${(1 - b) * 40}px)`}}>
        <Tag size={46}>de la semana</Tag>
      </div>
      <div style={{marginTop: 34, opacity: b, fontFamily: sans, fontWeight: 500, fontSize: 40, color: C.cream, letterSpacing: 8}}>
        PRECIOS POR KILO
      </div>
    </AbsoluteFill>
  );
};

const Tarjeta: React.FC<{o: Oferta; delay: number; dur: number}> = ({o, delay, dur}) => {
  const f = useCurrentFrame();
  const p = prog(f, delay, delay + 20, Easing.bezier(0.34, 1.4, 0.64, 1));
  const cuenta = prog(f, delay + 8, delay + 32, Easing.out(Easing.cubic));
  const kg = prog(f, delay + 26, delay + 38, Easing.bezier(0.34, 1.6, 0.64, 1));
  return (
    <div
      style={{
        width: 840,
        height: 790,
        borderRadius: 30,
        overflow: 'hidden',
        background: C.card,
        border: `2px solid ${C.line}`,
        boxShadow: '0 40px 90px rgba(0,0,0,0.6)',
        position: 'relative',
        opacity: Math.min(1, p * 1.5),
        transform: `translateY(${(1 - p) * 140}px) scale(${0.9 + 0.1 * p})`,
      }}
    >
      <div style={{position: 'relative', height: 520}}>
        {o.foto ? (
          <KenBurns src={o.foto} dur={dur} from={1.02} to={1.14} dx={-1.5} dy={-2} />
        ) : (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'radial-gradient(circle at 50% 45%, #3a2a15, #120d08 75%)',
            }}
          >
            <div style={{border: `2px solid ${C.line}`, padding: '40px 70px', textAlign: 'center'}}>
              <Gold style={{fontFamily: serif, fontWeight: 800, fontStyle: 'italic', fontSize: 84, lineHeight: 1.1}}>{o.nombre}</Gold>
              <div style={{fontFamily: sans, fontSize: 26, letterSpacing: 10, color: C.cream, marginTop: 20}}>GYA · CARNES PREMIUM</div>
            </div>
          </div>
        )}
        <div style={{position: 'absolute', inset: 0, background: `linear-gradient(180deg, transparent 55%, ${C.card} 100%)`}} />
        <Tag size={30} style={{position: 'absolute', top: 30, left: 30}}>Oferta</Tag>
      </div>
      <div style={{padding: '6px 46px 0'}}>
        <div style={{fontFamily: serif, fontWeight: 800, fontSize: o.nombre.length > 18 ? 58 : 66, color: C.cream, lineHeight: 1.1, whiteSpace: 'nowrap'}}>{o.nombre}</div>
        <div style={{display: 'flex', alignItems: 'center', marginTop: 18}}>
          <Gold style={{fontFamily: sans, fontWeight: 800, fontSize: 168, lineHeight: 1, fontVariantNumeric: 'tabular-nums', letterSpacing: -4}}>
            <span style={{fontSize: 90, verticalAlign: 'top', marginRight: 10, lineHeight: 1.5}}>$</span>
            {precioTexto(o.precio * cuenta)}
          </Gold>
          <div style={{marginLeft: 26, transform: `scale(${kg})`, opacity: Math.min(1, kg)}}>
            <Tag size={44} style={{letterSpacing: 2, padding: '8px 22px', textTransform: 'none'}}>kg</Tag>
          </div>
        </div>
      </div>
    </div>
  );
};

const BloqueMarca: React.FC = () => {
  const f = useCurrentFrame();
  const p = prog(f, 14, 34);
  return (
    <div style={{width: 840, textAlign: 'center', opacity: p, transform: `translateX(${(1 - p) * 60}px)`}}>
      <Gold style={{fontFamily: serif, fontWeight: 900, fontSize: 220, lineHeight: 1, letterSpacing: 20}}>GYA</Gold>
      <div style={{fontFamily: sans, fontWeight: 600, fontSize: 52, letterSpacing: 20, color: C.cream, margin: '24px 0 40px'}}>
        CARNES PREMIUM
      </div>
      <Tag size={36}>Precios por kilo</Tag>
    </div>
  );
};

export const OfertasPagina: React.FC<{items: Oferta[]; dur: number; pagina: number; total: number}> = ({items, dur, pagina, total}) => {
  const f = useCurrentFrame();
  const h = prog(f, 0, 16);
  return (
    <AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          top: 40,
          left: 110,
          right: 110,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          opacity: h,
        }}
      >
        <div style={{fontFamily: sans, fontWeight: 700, fontSize: 36, letterSpacing: 10, color: C.gold}}>
          OFERTAS DE LA SEMANA <span style={{color: C.cream, fontWeight: 500, letterSpacing: 4}}>· precios por kilo</span>
        </div>
        <div style={{display: 'flex', gap: 14}}>
          {Array.from({length: total}).map((_, i) => (
            <div
              key={i}
              style={{
                width: i === pagina ? 46 : 14,
                height: 14,
                borderRadius: 7,
                background: i === pagina ? C.red : 'rgba(245,234,214,0.3)',
              }}
            />
          ))}
        </div>
      </div>
      <AbsoluteFill style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 70, paddingTop: 80}}>
        {items.map((o, i) => (
          <Tarjeta key={o.nombre} o={o} delay={4 + i * 7} dur={dur} />
        ))}
        {items.length === 1 && <BloqueMarca />}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
