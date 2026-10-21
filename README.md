# junglecode.jp

The JungleCode website: Japan market entry for AI companies, with a healthcare page, notes and a full Japanese mirror at `/ja/`.

It's a static [Astro](https://astro.build) site. Pages ship as plain HTML and CSS with a little JavaScript for the navigation, the stage chooser, the counting figures, the reveals and the contact form. Everything still reads with JavaScript off.

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
| Photographs and portraits | `src/assets/` |
| Favicons and share images | `public/` |

## Notes

Each note is a Markdown file with `draft: true` until it's approved. Drafts appear in development and in `SHOW_DRAFTS=1` builds with a yellow "Draft for review" marker and `noindex`, and they're left out of production builds entirely. When there are no published notes, the Notes section and its nav link disappear and the notes page says the first ones are on their way.

Places where a founder's own example belongs are marked in the drafts as yellow editor prompts (`<p class="editor-prompt">`). Replace each one with the real story, or delete it, then set `draft: false`.

Front matter: `title`, `description`, `date`, `authors`, `summary_ja` (shown on Japanese pages and beside the note), `draft`, `order` (ties on the same date), `plate` (the photograph at the top) and `aside` (the photograph beside the body), both keys from `src/data/photoKeys.ts`.

## Type, colour and the tiles

- Latin type is Hedvig Letters Serif (display, with optical sizes) and Schibsted Grotesk (text), self-hosted through Fontsource. The site makes no third-party requests.
- Japanese pages also load Noto Serif JP and IBM Plex Sans JP from `src/styles/ja-fonts.css`. English pages don't load them, and the few Japanese characters they show fall back to the system's Japanese fonts.
- The one accent is the yellow of tenji blocks, the tactile paving that guides people through every station in Japan. Guidance tiles (four raised bars) lead through the page: the route of the four stages fills as you scroll and stops at the stage a visitor picks. Warning tiles (dots) mark the places where entries stall. They are drawn as SVG masks in `src/styles/global.css` (`.tile`, `.guide`, `.dotfield`). The footer says what they are in one line.
- The deep green field carries healthcare. The contact section is the yellow field.
- `public/favicon.svg` and the PNG icons are one lit guidance tile, made by `node scripts/brand-assets.mjs`. The share images (`og.jpg`, `og-ja.jpg`) are drawn by `scripts/og/card.html` (open it at 1200 × 630, add `?lang=ja` for Japanese, and save a JPEG screenshot).

## Motion

Headlines rise in on load, text rises and photographs unmask as they arrive, figures count up once, the yellow rules under them draw in, the stall tiles light, the route of guidance tiles fills with the scroll, a thin yellow line under the bar shows how far down the page you are, and pages cross-fade into each other. All of it is switched off for visitors who ask for reduced motion, and every word is in the HTML from the first paint.

## Images

The home page hero uses two real photographs taken from Yebisu Garden Place Tower in Ebisu, cropped and resized for the site. They are credited in one small line at the foot of every page:

| Image | Photographer and licence | Source |
| --- | --- | --- |
| `ebisu-minato.jpg`, central Tokyo by day (light mode) | Supanut Arunoprayote, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Panoramic_View_of_Minato_20241020.jpg) |
| `ebisu-shinjuku-dusk.jpg`, Shinjuku at dusk (dark mode) | Ximonic (Simo Räsänen), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Shibuya_and_Shinjuku_from_Yebisu_Garden_Place_Tower,_Ebisu,_Tokyo,_Japan,_2024_May.jpg) |

Both licences require that visible credit, so keep the footer line while these photos are used. The cropped dusk photo is shared under CC BY-SA 4.0 like its source. Supanut Arunoprayote asks on the file page for a short message when the photo is used, which is a courtesy and not a licence term.

The other photographs of Tokyo, its hospitals and a care home (`src/assets/photos/`) are generated placeholders, made to set the art direction. Replace them with licensed or commissioned photography before launch, keeping the same file names and roughly the same framing. `src/components/Photos.ts` holds each one's focal point.

Founder portraits start from colour masters in `assets-source/portraits/`. Each was made by editing that founder's own photo into one consistent studio session (the same grey backdrop, soft light and framing) while keeping the face unchanged. They were checked against the source photos side by side and with Apple Vision face geometry, landing within about 2% of the source on average. Both share one pose, light, backdrop and lens, and were cropped so the eyes sit level at the same height with the same head size. A final retouch, which never redraws a face, removed white specks from the hair and put back natural skin texture. `scripts/portraits.mjs` scales both to 640 × 800 in colour, since the site shows them small. Each founder should approve their portrait before launch, and real studio photos can replace the masters at any time.

## Deploy

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push to `main`. Before the first merge, switch **Settings > Pages > Build and deployment > Source** to **GitHub Actions**. The custom domain (`junglecode.jp`) stays as configured.

## Launch checklist

- [ ] Create the `hello@junglecode.jp` mailbox or alias in Google Workspace
- [ ] Paste the real booking link into `BOOKING_URL` in `src/data/config.ts` (until then, "Book 30 minutes" opens a prepared email)
- [ ] Native-speaker review of everything in `src/data/ja.ts` and the `summary_ja` lines in the notes
- [ ] Jet and Aditya review their bios, their portraits, the origin story and the sample Readiness Sprint agenda
- [ ] Replace the generated photographs (everything in `src/assets/photos/` except the two views from Ebisu) with licensed or commissioned ones
- [ ] Edit the three draft notes, replace the editor prompts with real examples, set `draft: false`
- [ ] Confirm the anonymized engagement line ("a North American AI visual-inspection company")
- [ ] Confirm the healthcare framing (specialist partners lead PMDA filings and reimbursement dossiers)
- [ ] Send a test submission through the form and confirm it arrives in Formspree
- [ ] Switch GitHub Pages to deploy from GitHub Actions, then merge
