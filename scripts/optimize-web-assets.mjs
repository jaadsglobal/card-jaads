import sharp from 'sharp';

// Keep the supplied original and circular master untouched; generate small web copies.
const source = 'public/brand/logo-jaads-circular.png';
await sharp(source).resize(256, 256).webp({ lossless: true, effort: 6 }).toFile('public/brand/logo-jaads-256.webp');
await sharp(source).resize(64, 64).png({ compressionLevel: 9 }).toFile('public/brand/favicon-64.png');
console.log('Optimized web logo and favicon generated; originals preserved.');
