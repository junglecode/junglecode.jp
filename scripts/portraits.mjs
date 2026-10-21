// Founder portraits: a matched head-and-shoulders crop, monochrome, warmed toward the paper tone.
//
// Sources are the colour masters in assets-source/portraits/. They were made by editing each
// founder's original photo into one consistent studio session (same backdrop, light, framing and
// shirt) while keeping their faces unchanged, then checked against the originals side by side and
// with Apple Vision face geometry. Replace them with real studio photos whenever those exist.
//
// Usage: node scripts/portraits.mjs
import sharp from 'sharp';

// Crop boxes in the 2048 × 2048 masters. Each keeps the head at about the same size and height.
const jobs = [
  { src: 'assets-source/portraits/jet-villegas-color.jpg', out: 'src/assets/people/jet-villegas.jpg', crop: { left: 115, top: 12, width: 1760, height: 1760 } },
  { src: 'assets-source/portraits/aditya-pandya-color.jpg', out: 'src/assets/people/aditya-pandya.jpg', crop: { left: 188, top: 129, width: 1760, height: 1760 } },
];

for (const { src, out, crop } of jobs) {
  await sharp(src)
    .extract(crop)
    .resize(1200, 1200, { kernel: 'lanczos3' })
    .grayscale()
    .linear(1.06, -6)
    .tint({ r: 241, g: 236, b: 228 })
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(out);
  console.log('wrote', out);
}
