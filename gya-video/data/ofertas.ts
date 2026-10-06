// ─────────────────────────────────────────────────────────────
//  OFERTAS DE LA SEMANA — editá sólo este archivo y volvé a renderizar.
//  precio: precio de oferta en pesos por kg (entero, sin puntos).
//  precioAntes: precio normal por kg (opcional; si está, se tacha y
//        se muestra cuánto ahorrás).
//  foto: archivo dentro de public/fotos/ (opcional; si no hay foto,
//        se muestra una tarjeta tipográfica).
// ─────────────────────────────────────────────────────────────

export type Oferta = {
  nombre: string;
  precio: number;
  precioAntes?: number;
  foto?: string;
};

export const ofertas: Oferta[] = [
  {nombre: 'Asado de exportación', precio: 11500, precioAntes: 13000, foto: 'asado.jpg'},
  {nombre: 'Brazuelo con hueso', precio: 14500, precioAntes: 17500, foto: 'brazuelo.jpg'},
  {nombre: 'Marucha parrillera', precio: 14500, precioAntes: 17500, foto: 'marucha.jpg'},
  {nombre: 'Falda de novillito', precio: 10000, precioAntes: 12500, foto: 'falda.jpg'},
  {nombre: 'Puchero', precio: 10999, precioAntes: 13999, foto: 'puchero.jpg'},
  {nombre: 'Arrollado de carne', precio: 18000, precioAntes: 20000, foto: 'arrollado-carne.jpg'},
  {nombre: 'Arrollado de pollo', precio: 16000, precioAntes: 18000, foto: 'arrollado-pollo.jpg'},
  {nombre: 'Supremas de muslo', precio: 7800, precioAntes: 8800, foto: 'supremas.jpg'},
  {nombre: 'Alitas rebozadas', precio: 4500, precioAntes: 5500, foto: 'alitas.jpg'},
  {nombre: 'Costeletas de cerdo', precio: 8300, precioAntes: 9300, foto: 'costeletas.jpg'},
  {nombre: 'Pechito', precio: 8700, precioAntes: 9700, foto: 'pechito.jpg'},
];
