// The site's mark and icons: one lit guidance tile, the yellow tactile paving that leads people
// through every station in Japan, with its four raised bars pointing the way forward.
//
// Usage: node scripts/brand-assets.mjs
// The share cards (public/og.jpg and public/og-ja.jpg) are drawn by scripts/og/card.html. Open it
// at 1200 × 630 (add ?lang=ja for the Japanese card) and save a screenshot as JPEG.
import { writeFileSync } from 'node:fs';
import sharp from 'sharp';

const bars = [6.5, 11.7, 16.9, 22.1].map((x) => `<rect x="${x}" y="6" width="3.2" height="20" rx="1.6"/>`).join('');
const mark = (pad = 0) => {
  const size = 32 + pad * 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-pad} ${-pad} ${size} ${size}">` +
    (pad ? `<rect x="${-pad}" y="${-pad}" width="${size}" height="${size}" fill="#f4c300"/>` : '') +
    `<rect width="32" height="32" rx="6" fill="#f4c300"/><g fill="#121212">${bars}</g></svg>`;
};

writeFileSync('public/favicon.svg', mark() + '\n');
await sharp(Buffer.from(mark())).resize(32, 32).png().toFile('public/favicon-32.png');
// Touch and app icons fill their square; the system rounds the corners.
await sharp(Buffer.from(mark(4))).resize(180, 180).png().toFile('public/apple-touch-icon.png');
await sharp(Buffer.from(mark(4))).resize(512, 512).png().toFile('public/icon-512.png');
console.log('wrote public/favicon.svg, favicon-32.png, apple-touch-icon.png, icon-512.png');
