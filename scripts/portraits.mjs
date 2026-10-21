// Founder portraits: a matched 4:5 head-and-shoulders crop, and a square avatar for the round faces.
//
// Sources are the colour masters in assets-source/portraits/ (1120 × 1400). They were made by
// editing each founder's own photo into one consistent studio session (same grey backdrop, soft key
// light and framing) while keeping their faces unchanged, then checked against the originals side by
// side and with Apple Vision face geometry. Replace them with real studio photos whenever those exist.
//
// Usage: node scripts/portraits.mjs
import sharp from 'sharp';

// Each head's outline in the master (hair top, chin and horizontal centre), measured with Apple Vision
// person segmentation. The avatar square is centred on the head itself, not on the eyes, since a
// turned head puts the eyes off its middle, and sized from the head's height so both heads match.
const AVATAR = { scale: 1.42, drop: 0.55, out: 240 };
const people = [
  { name: 'jet-villegas', head: { top: 97, chin: 1056, cx: 510 } },
  { name: 'aditya-pandya', head: { top: 47, chin: 1060, cx: 535 } },
];

for (const { name, head } of people) {
  const src = `assets-source/portraits/${name}-color.jpg`;
  await sharp(src)
    .resize(640, 800, { kernel: 'lanczos3' })
    .modulate({ saturation: 0.92 })
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(`src/assets/people/${name}.jpg`);

  const { width, height } = await sharp(src).metadata();
  const h = head.chin - head.top;
  const size = Math.round(h * AVATAR.scale), half = size / 2;
  const left = Math.round(head.cx - half), top = Math.round(head.top + h * AVATAR.drop - half);
  // Past the edges is plain backdrop at head height, so the edge pixels are repeated outward to fill it.
  const pad = { left: Math.max(0, -left), top: Math.max(0, -top), right: Math.max(0, left + size - width), bottom: Math.max(0, top + size - height) };
  const grown = await sharp(src).extend({ ...pad, extendWith: 'copy' }).toBuffer();
  await sharp(grown)
    .extract({ left: left + pad.left, top: top + pad.top, width: size, height: size })
    .resize(AVATAR.out, AVATAR.out, { kernel: 'lanczos3' })
    .modulate({ saturation: 0.92 })
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(`src/assets/people/${name}-avatar.jpg`);
  console.log('wrote', name, 'portrait and avatar');
}
