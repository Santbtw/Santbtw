import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {negocio} from '../../data/negocio';
import {C, Gold, Tag, prog, sans, serif} from '../theme';
import {Brasas} from './Brasas';

/** Bloque de marca (texto) usado en la intro y en el cierre. */
export const Marca: React.FC<{cierre?: boolean}> = ({cierre = false}) => {
  const f = useCurrentFrame();
  const linea = prog(f, 8, 40);
  const sub = prog(f, 26, 48);
  const tag = prog(f, 42, 60);
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
      <Brasas />
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div style={{display: 'flex', fontFamily: serif, fontWeight: 900, fontSize: 300, lineHeight: 1}}>
          {negocio.marca.split('').map((l, i) => {
            const p = prog(f, 2 + i * 6, 30 + i * 6);
            return (
              <Gold
                key={i}
                style={{
                  display: 'inline-block',
                  transform: `translateY(${(1 - p) * 90}px)`,
                  opacity: p,
                  margin: `0 ${14 + (1 - p) * 40}px`,
                  filter: `blur(${(1 - p) * 10}px)`,
                }}
              >
                {l}
              </Gold>
            );
          })}
        </div>
        <div
          style={{
            width: 900 * linea,
            height: 3,
            margin: '26px 0 30px',
            background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`,
          }}
        />
        <div
          style={{
            fontFamily: sans,
            fontWeight: 600,
            fontSize: 64,
            letterSpacing: 26 + (1 - sub) * 20,
            color: C.cream,
            textTransform: 'uppercase',
            opacity: sub,
            paddingLeft: 26,
          }}
        >
          {negocio.subtitulo}
        </div>
        <div style={{marginTop: 46, opacity: tag, transform: `translateY(${(1 - tag) * 30}px)`}}>
          {cierre ? (
            <div style={{fontFamily: sans, fontWeight: 600, fontSize: 46, color: C.gold, textAlign: 'center'}}>
              {negocio.web.join('')}
            </div>
          ) : (
            <Tag size={34}>{negocio.localidad}</Tag>
          )}
        </div>
        {cierre && (
          <div style={{marginTop: 26, opacity: tag}}>
            <Tag size={30}>{negocio.localidad}</Tag>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
