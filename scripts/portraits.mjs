// Founder portraits: a matched 4:5 head-and-shoulders crop, in colour.
//
// Sources are the colour masters in assets-source/portraits/ (1120 × 1400). They were made by
// editing each founder's own photo into one consistent studio session (same grey backdrop, soft
// key light and framing) while keeping their faces unchanged, then checked against the originals
// side by side and with Apple Vision face geometry. Replace them with real studio photos whenever
// those exist.
//
// Usage: node scripts/portraits.mjs
import sharp from 'sharp';

const jobs = [
  { src: 'assets-source/portraits/jet-villegas-color.jpg', out: 'src/assets/people/jet-villegas.jpg' },
  { src: 'assets-source/portraits/aditya-pandya-color.jpg', out: 'src/assets/people/aditya-pandya.jpg' },
];

for (const { src, out } of jobs) {
  await sharp(src)
    .resize(960, 1200, { kernel: 'lanczos3' })
    .modulate({ saturation: 0.92 })
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(out);
  console.log('wrote', out);
}
