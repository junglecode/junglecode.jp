// One-time portrait treatment: matched head crop, monochrome, warmed toward the paper tone.
// The originals are the old site's photos. Restore them from git history first:
//   mkdir -p .taste-skill && git show 31e40ca:assets/images/jet-villegas.jpg > .taste-skill/jet-villegas-original.jpg
//   git show 31e40ca:assets/images/aditya-pandya.jpg > .taste-skill/aditya-pandya-original.jpg
// Usage: node scripts/portraits.mjs
import sharp from 'sharp';

const jobs = [
  { src: '.taste-skill/jet-villegas-original.jpg', out: 'src/assets/people/jet-villegas.jpg', crop: { left: 6, top: 18, width: 420, height: 420 } },
  { src: '.taste-skill/aditya-pandya-original.jpg', out: 'src/assets/people/aditya-pandya.jpg', crop: { left: 112, top: 36, width: 400, height: 400 } },
];

for (const { src, out, crop } of jobs) {
  await sharp(src)
    .extract(crop)
    .resize(720, 720, { kernel: 'lanczos3' })
    .grayscale()
    .linear(1.12, -14)
    .tint({ r: 241, g: 236, b: 228 })
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(out);
  console.log('wrote', out);
}
