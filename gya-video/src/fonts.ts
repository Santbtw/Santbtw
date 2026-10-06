import {continueRender, delayRender, staticFile} from 'remotion';

// Poppins y Playfair Display (Google Fonts) servidas desde public/fonts,
// así el render funciona sin conexión a internet.
const fuentes: [string, string, string, string?][] = [
  ['Poppins', 'poppins-400.woff2', '400'],
  ['Poppins', 'poppins-500.woff2', '500'],
  ['Poppins', 'poppins-600.woff2', '600'],
  ['Poppins', 'poppins-700.woff2', '700'],
  ['Poppins', 'poppins-800.woff2', '800'],
  ['Playfair Display', 'playfair.woff2', '400 900'],
  ['Playfair Display', 'playfair-italic.woff2', '400 900', 'italic'],
];

const handle = delayRender('Cargando fuentes');
export const fuentesListas = Promise.all(
  fuentes.map(([fam, file, weight, style = 'normal']) => {
    const ff = new FontFace(fam, `url(${staticFile(`fonts/${file}`)}) format('woff2')`, {weight, style});
    return ff.load().then(() => document.fonts.add(ff));
  }),
).then(() => continueRender(handle));
