// ─────────────────────────────────────────────────────────────
//  OFERTAS DE LA SEMANA — editá sólo este archivo y volvé a renderizar.
//  precio: número entero en pesos por kg (sin puntos).
//  foto: archivo dentro de public/fotos/ (opcional; si no hay foto,
//        se muestra una tarjeta tipográfica).
// ─────────────────────────────────────────────────────────────

export type Oferta = {
  nombre: string;
  precio: number;
  foto?: string;
};

export const ofertas: Oferta[] = [
  {nombre: 'Asado de exportación', precio: 11500, foto: 'asado.jpg'},
  {nombre: 'Brazuelo con hueso', precio: 14500, foto: 'brazuelo.jpg'},
  {nombre: 'Marucha parrillera', precio: 14500, foto: 'marucha.jpg'},
  {nombre: 'Falda de novillito', precio: 10000, foto: 'falda.jpg'},
  {nombre: 'Puchero', precio: 10999, foto: 'puchero.jpg'},
  {nombre: 'Arrollado de carne', precio: 18000, foto: 'arrollado-carne.jpg'},
  {nombre: 'Arrollado de pollo', precio: 16000, foto: 'arrollado-pollo.jpg'},
  {nombre: 'Supremas de muslo', precio: 7800, foto: 'supremas.jpg'},
  {nombre: 'Alitas rebozadas', precio: 4500, foto: 'alitas.jpg'},
  {nombre: 'Costeletas de cerdo', precio: 8300, foto: 'costeletas.jpg'},
  {nombre: 'Pechito', precio: 8700, foto: 'pechito.jpg'},
];
