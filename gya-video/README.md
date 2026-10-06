# GYA Carnes Premium · video en loop para TV

1920x1080 · 30 fps · sin audio · H.264 yuv420p con faststart · ~56 s.

## Uso
```bash
npm install
npm run studio   # vista previa en el navegador
npm run render   # genera out/gya-carnes-loop.mp4
```

## Cambiar precios u ofertas
Editá `data/ofertas.ts` (`precio` = oferta y `precioAntes` = precio normal, en pesos por kg, sin puntos) y corré `npm run render`.
La cantidad de páginas de ofertas y la duración total se ajustan solas.
Para una oferta nueva con foto, poné la imagen en `public/fotos/` y usá su nombre en `foto`;
sin `foto`, se muestra una tarjeta tipográfica.

Datos del local (web, horarios, zona de envíos): `data/negocio.ts`.

## Notas
- Las fuentes (Poppins y Playfair Display, de Google Fonts) están en `public/fonts`, así que renderiza sin internet.
- `remotion.config.ts` usa el chrome-headless-shell de `/opt/pw-browsers`. En otra PC, borrá esa línea
  o definí `REMOTION_BROWSER` con la ruta a tu navegador.
