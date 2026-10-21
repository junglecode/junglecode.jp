# junglecode.jp

The JungleCode website: Japan market entry for AI companies, with a healthcare page, notes and a full Japanese mirror at `/ja/`.

It's a static [Astro](https://astro.build) site. Pages ship as plain HTML and CSS with a little JavaScript for the masthead, the route map, the week tabs, the notes deck and the contact form. Everything still reads with JavaScript off.

## Run it

```bash
npm install
npm run dev                         # http://localhost:4321, draft notes visible
SHOW_DRAFTS=1 npm run build && npm run preview   # production build with drafts, for review
npm run build                       # what GitHub Actions ships, drafts left out
npm run check:copy                  # house writing rules (no em or en dashes, no semicolons)
```

Add `?theme=light` or `?theme=dark` to any URL to pin the palette for review. Otherwise the site follows the visitor's system setting.

## Where things live

| What | Where |
| --- | --- |
| English copy, every page | `src/data/en.ts` |
| Japanese copy, same shape (type-checked against English) | `src/data/ja.ts` |
| Email, booking link, form endpoint, LinkedIn links | `src/data/config.ts` |
| Notes | `src/content/notes/*.md` |
| Design tokens (colour, type scale, spacing, motion) | `src/styles/global.css` |
| Sections | `src/components/*.astro` |
| Archival prints and portraits | `src/assets/` |
| Favicons, share images, subset Japanese font | `public/` |

## Notes

Each note is a Markdown file with `draft: true` until it's approved. Drafts appear in development and in `SHOW_DRAFTS=1` builds with a red "Draft for review" marker and `noindex`, and they're left out of production builds entirely. When there are no published notes, the Notes section and its nav link disappear and the notes page says the first ones are on their way.

Places where a founder's own example belongs are marked in the drafts as red editor prompts (`<p class="editor-prompt">`). Replace each one with the real story, or delete it, then set `draft: false`.

Front matter: `title`, `description`, `date`, `authors`, `summary_ja` (shown on Japanese pages and beside the note), `draft`, `order` (ties on the same date), `plate` (the print at the top) and `aside` (the print beside the body).

## Fonts and the seal

- Latin type is Bodoni Moda (display) and Jost (text), self-hosted through Fontsource. The site makes no third-party requests.
- English pages use a 21 KB subset of Shippori Mincho B1 for the few Japanese characters they show. Japanese pages load the full Shippori Mincho B1 and Zen Kaku Gothic New from `src/styles/ja-fonts.css`.
- After changing Japanese text in `en.ts`, rebuild the subset with `node scripts/subset-jp.mjs`. It needs `uv` and the Shippori TTFs in `.taste-skill/fonts/` (instructions at the top of the script).
- `public/favicon.svg` is the seal with its katakana converted to outlines (`scripts/seal-svg.py`). The PNG icons and the share images (`og.jpg`, `og-ja.jpg`) were rendered from it in Chrome.
- English copy writes Japanese words without macrons (Tokaido, not Tōkaidō), because the variable Latin fonts draw the combining macron badly.

## Images

All archival images are public domain. They show Japan's world, never JungleCode's own work.

| Image | Source |
| --- | --- |
| Utagawa Hiroshige, Morning View of Nihonbashi, about 1833 to 1834 | [The Met](https://www.metmuseum.org/art/collection/search/36922) |
| Hiroshige, Hakone, the Lake | [The Met](https://www.metmuseum.org/art/collection/search/36932) |
| Hiroshige, Mishima, Morning Mist | [The Met via Wikimedia Commons](https://commons.wikimedia.org/wiki/File:%E6%9D%B1%E6%B5%B7%E9%81%93%E4%BA%94%E5%8D%81%E4%B8%89%E6%AC%A1_%E4%B8%89%E5%B3%B6_%E6%9C%9D%E9%9C%A7-Morning_Mist_at_Mishima_MET_DP122173.jpg) |
| Hiroshige, Kyoto, the Great Bridge at Sanjo | [The Met via Wikimedia Commons](https://commons.wikimedia.org/wiki/File:%E6%9D%B1%E6%B5%B7%E9%81%93%E4%BA%94%E5%8D%81%E4%B8%89%E6%AC%A1%E4%B9%8B%E5%86%85_%E5%A4%A7%E5%B0%BE_%E4%BA%AC%E5%B8%AB_%E4%B8%89%E6%9D%A1%E5%A4%A7%E6%A9%8B-Kyoto,_Sanjo_Ohashi_MET_DP122235.jpg) |
| Hiroshige, Kanbara, Night Snow | [Library of Congress via Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Kanbara_LCCN2009615519.jpg) |
| Preface to Kaitai Shinsho, 1774 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Chiikigakusaga_kaitaishinsho1-0001.jpg) |

Founder portraits start from colour masters in `assets-source/portraits/`. Each was made by editing that founder's own original photo into one consistent studio session (the same backdrop, light, framing and shirt) while keeping the face unchanged. They were checked against the originals side by side and with Apple Vision face geometry, landing within about 2% of the source on every measure. `scripts/portraits.mjs` then applies the same crop and monochrome grade to both. Each founder should approve his portrait before launch, and real studio photos can replace the masters at any time.

## Deploy

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push to `main`. Before the first merge, switch **Settings > Pages > Build and deployment > Source** to **GitHub Actions**. The custom domain (`junglecode.jp`) stays as configured.

## Launch checklist

- [ ] Create the `hello@junglecode.jp` mailbox or alias in Google Workspace
- [ ] Paste the real booking link into `BOOKING_URL` in `src/data/config.ts` (until then, "Book 30 minutes" opens a prepared email)
- [ ] Native-speaker review of everything in `src/data/ja.ts` and the `summary_ja` lines in the notes
- [ ] Jet and Aditya review their bios, their portraits, the origin story and the sample Readiness Sprint agenda
- [ ] Edit the three draft notes, replace the editor prompts with real examples, set `draft: false`
- [ ] Confirm the anonymized engagement line ("a North American AI visual-inspection company")
- [ ] Confirm the healthcare framing (specialist partners lead PMDA filings and reimbursement dossiers)
- [ ] Send a test submission through the form and confirm it arrives in Formspree
- [ ] Switch GitHub Pages to deploy from GitHub Actions, then merge
