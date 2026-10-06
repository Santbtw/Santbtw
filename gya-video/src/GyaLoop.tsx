import React from 'react';
import {AbsoluteFill, Sequence, interpolate, useCurrentFrame} from 'remotion';
import {ofertas} from '../data/ofertas';
import {Escena, Fondo} from './theme';
import {Marca} from './scenes/Marca';
import {OfertasPagina, OfertasTitulo} from './scenes/Ofertas';
import {Envios, Horarios, Online, Puntos} from './scenes/Info';

const FPS = 30;
const SOLAPE = 10; // frames en que una escena se funde con la siguiente

const paginas: (typeof ofertas)[] = [];
for (let i = 0; i < ofertas.length; i += 2) paginas.push(ofertas.slice(i, i + 2));

type Bloque = {dur: number; salida?: boolean; render: (dur: number) => React.ReactNode};

const bloques: Bloque[] = [
  {dur: 4 * FPS, render: () => <Marca />},
  {dur: 50, render: () => <OfertasTitulo />},
  ...paginas.map((items, i) => ({
    dur: 105,
    render: (d: number) => <OfertasPagina items={items} dur={d} pagina={i} total={paginas.length} />,
  })),
  {dur: 5 * FPS, render: (d) => <Online dur={d} />},
  {dur: 4.5 * FPS, render: (d) => <Envios dur={d} />},
  {dur: 5.5 * FPS, render: (d) => <Horarios dur={d} />},
  {dur: 5 * FPS, render: (d) => <Puntos dur={d} />},
  {dur: 3.5 * FPS, salida: false, render: () => <Marca cierre />},
];

const inicios: number[] = [];
bloques.reduce((t, b, i) => {
  inicios.push(t);
  return t + b.dur - (i < bloques.length - 1 ? SOLAPE : 0);
}, 0);

export const duracionTotal = inicios[inicios.length - 1] + bloques[bloques.length - 1].dur;

export const GyaLoop: React.FC = () => {
  const f = useCurrentFrame();
  // Fundido desde y hacia negro para que el loop sea limpio.
  const negro = interpolate(f, [0, 15, duracionTotal - 30, duracionTotal - 1], [1, 0, 0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <AbsoluteFill>
      <Fondo />
      {bloques.map((b, i) => (
        <Sequence key={i} from={inicios[i]} durationInFrames={b.dur}>
          <Escena dur={b.dur} salida={b.salida ?? true}>
            {b.render(b.dur)}
          </Escena>
        </Sequence>
      ))}
      <AbsoluteFill style={{background: '#000', opacity: negro}} />
    </AbsoluteFill>
  );
};
