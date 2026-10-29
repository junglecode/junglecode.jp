// Checks site copy against the house writing rules: no em dashes, en dashes or semicolons
// in anything a reader sees. Run with `npm run check:copy`.
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const files = [
  'src/data/en.ts',
  'src/data/ja.ts',
  ...readdirSync('src/content/notes').map((f) => join('src/content/notes', f)),
];
const problems = [];
for (const file of files) {
  readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
    const prose = file.endsWith('.ts')
      ? [...line.matchAll(/(['`])((?:\\.|(?!\1).)*)\1/g)].map((m) => m[2]).join(' ')
      : line;
    if (/[—–―]/.test(prose)) problems.push(`${file}:${i + 1} dash: ${line.trim().slice(0, 90)}`);
    if (/;/.test(prose.replace(/&[a-z]+;|&#\d+;/g, ''))) problems.push(`${file}:${i + 1} semicolon: ${line.trim().slice(0, 90)}`);
  });
}
if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log(`Copy check passed (${files.length} files).`);
