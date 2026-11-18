# JaaDs Global · Tarjeta digital

Tarjeta ejecutiva vertical, centrada y de un máximo de 520 px, con React, TypeScript, Vite, Tailwind CSS, Lucide, Simple Icons y una animación Canvas ligera. Tres acciones blancas: reservar, WhatsApp y web. La cabecera presenta únicamente JaaDs Global y las redes muestran LinkedIn de empresa, Instagram, Facebook, X, TikTok y YouTube en una fila sin recuadros. Sin backend, formularios ni servicios de pago. Fuente Manrope alojada en el propio proyecto.

## Desarrollo

```sh
npm install
npm run dev
```

```sh
npm test
npm run build
npm run preview
```

## Configuración

Los datos de presentación se gestionan en `src/config/site.ts`. Calendario, WhatsApp y correo se leen desde `.env.local`, excluido de Git. `.env.example` contiene únicamente los nombres de las variables.

Variables: `VITE_BOOKING_URL`, `VITE_WHATSAPP_NUMBER`, `VITE_LINKEDIN_COMPANY_URL`, `VITE_FACEBOOK_URL`, `VITE_TIKTOK_URL`, `VITE_YOUTUBE_URL` y `VITE_CONTACT_EMAIL`. Reinicia Vite al modificarlas. Son enlaces públicos que el navegador necesita para funcionar: el prefijo `VITE_` incluye sus valores en el frontend compilado. No protege secretos ni oculta el teléfono o el destino de los enlaces a los visitantes; no guardes contraseñas, tokens ni claves privadas aquí.

- `BOOKING_URL`: URL real del calendario; activa el botón principal de reserva. Sin URL, aparece desactivado con una etiqueta accesible, sin avisos repetidos en pantalla.
- `WHATSAPP_NUMBER`: número internacional, solo dígitos. Genera el enlace de WhatsApp con el mensaje indicado.
- `CONTACT_EMAIL`: dirección real de contacto.
- El correo aparece como acceso secundario al configurarlo, junto a compartir y QR. Los tres botones principales son reserva, WhatsApp y página web.
- `phone`: teléfono de la vCard. Si está vacío, utiliza WhatsApp cuando esté configurado.
- `socials` reúne LinkedIn de empresa, Instagram, Facebook, X, TikTok y YouTube. Los perfiles sin URL muestran su icono sin enlace activo, con etiqueta accesible y tooltip. Se mantienen en una fila con desplazamiento horizontal cuando hace falta. Los SVG proceden de Simple Icons. X y TikTok se muestran en blanco sobre el fondo oscuro.
- `publicUrl`: URL definitiva de esta tarjeta. Activa canonical, `og:url` y QR. Compartir utiliza la URL actual del navegador mientras no se configure.
- `logo`: utiliza `public/brand/logo-jaads-256.webp`, copia ligera del original centrado en un círculo blanco con exterior transparente. El PNG circular maestro se conserva en `public/brand/logo-jaads-circular.png`; `node scripts/optimize-web-assets.mjs` regenera las copias web y el favicon. El PNG original sin retocar se conserva en `public/brand/logo-jaads-original.png`. Para recomponer el círculo a partir del original : `node scripts/prepare-logo.mjs`. El script conserva los colores, los textos y las proporciones; solo ajusta escala y posición. Si falta el archivo, muestra «Logotipo».

- `favicon`: copia PNG de 64 px del mismo logotipo, optimizada para la pestaña del navegador.
- `socialImage`: URL absoluta de una imagen social, opcional. Añade las etiquetas de imagen de Open Graph y Twitter al compilar.
- Nombre, cargo, descripción y servicios también son editables en ese archivo.

Los metadatos SEO se encuentran en `index.html`; canonical, favicon y la imagen social se generan desde la configuración durante la compilación. Tras cambiar la configuración, vuelve a compilar y desplegar.

## Vercel

Importa este directorio como proyecto Vite. Comando de compilación: `npm run build`. Directorio de salida: `dist`. Añade `VITE_BOOKING_URL`, `VITE_WHATSAPP_NUMBER`, `VITE_LINKEDIN_COMPANY_URL` y `VITE_FACEBOOK_URL` a las variables de entorno de Vercel y vuelve a desplegar; `.env.local` no se sube a Git. El correo es opcional. No requiere servidor. Proyecto de Vercel: `jaa-ds-global/card-jaads`. Dominio: https://card-jaads.vercel.app/. Repositorio: https://github.com/jaadsglobal/card-jaads. El proyecto utiliza Node.js 22 y la configuración de compilación está en `vercel.json`.

### Navegación

La página `/servicios` se ha retirado. Tanto React Router como la configuración de Vercel devuelven a `/` al abrir la ruta antigua. La compilación ya no genera un HTML separado para servicios. Los accesos a compartir y descargar contacto se han retirado de la interfaz. Sus utilidades se conservan en el código.

## Funciones

La vCard utiliza UTF-8, saltos CRLF y plegado de líneas; omite teléfono y correo cuando faltan. Compartir utiliza Web Share API, después portapapeles y finalmente un campo de copia manual si el navegador lo impide. El QR se genera localmente, sin enviar la URL a terceros. Se respeta la preferencia de movimiento reducido.

## Comprobaciones en navegador

Con el servidor de desarrollo iniciado en el puerto 5173:

```sh
npx playwright test
```

Los tests comprueban tamaños móvil/escritorio, el logotipo, las cinco redes en una fila, las URLs configuradas de calendario y WhatsApp, metadatos, navegación por teclado y ausencia de desbordamiento horizontal. Chromium se almacena dentro del proyecto. Si no está instalado, ejecuta `PLAYWRIGHT_BROWSERS_PATH=node_modules/.cache/ms-playwright npx playwright install chromium`.

## Calidad y rendimiento

Las pruebas de navegador se ejecutan con Chromium y WebKit (motor de Safari), incluyendo móvil, tablet, escritorio, horizontal, teclado, accesibilidad automática, enlaces y reducción de movimiento. Instala ambos navegadores dentro del proyecto con `PLAYWRIGHT_BROWSERS_PATH=node_modules/.cache/ms-playwright npx playwright install chromium webkit`.

El fondo se anima automáticamente, sin control de pausa visible. Se mantiene estático si el dispositivo pide reducir movimiento y se pausa al ocultar la pestaña. La llamada a reservar usa un pulso suave en el borde, sin ocultar ni parpadear el texto.

`npm run audit:live` revisa la URL pública con Axe y Lighthouse y guarda los informes y capturas en `quality-reports/`, excluido de Git y del despliegue. Las puntuaciones son mediciones de laboratorio y varían con la red y el equipo.
