import sharp from 'sharp';

// Deterministic composition: preserve the supplied artwork, typography and colors.
const source = 'public/brand/logo-jaads-original.png';
const { data, info } = await sharp(source).removeAlpha().raw().toBuffer({ resolveWithObject: true });
let left = info.width, top = info.height, right = 0, bottom = 0;
const points = [];
for (let y = 0; y < info.height; y++) {
  for (let x = 0; x < info.width; x++) {
    const offset = (y * info.width + x) * info.channels;
    if (Math.min(data[offset], data[offset + 1], data[offset + 2]) < 210) {
      left = Math.min(left, x); right = Math.max(right, x);
      top = Math.min(top, y); bottom = Math.max(bottom, y);
      points.push([x, y]);
    }
  }
}
const centerX = (left + right) / 2;
const centerY = (top + bottom) / 2;
const radius = points.reduce((maximum, [x, y]) => Math.max(maximum, Math.hypot(x - centerX, y - centerY)), 0);
const size = 1024;
const scale = (size / 2 * 0.9) / radius;
const artwork = await sharp(source).resize({ width: Math.round(info.width * scale) }).png().toBuffer();
const mask = Buffer.from(`<svg width="${size}" height="${size}"><circle cx="512" cy="512" r="512" fill="white"/></svg>`);
await sharp({ create: { width: size, height: size, channels: 4, background: '#ffffff' } })
  .composite([{ input: artwork, left: Math.round(size / 2 - centerX * scale), top: Math.round(size / 2 - centerY * scale) }])
  .png().toBuffer()
  .then(buffer => sharp(buffer).composite([{ input: mask, blend: 'dest-in' }]).png({ compressionLevel: 9 }).toFile('public/brand/logo-jaads-circular.png'));
console.log('Original preserved. Circular PNG centered with 10% radial safety margin.');
