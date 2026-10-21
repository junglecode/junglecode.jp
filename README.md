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

The photographs of Tokyo (`src/assets/photos/`) are generated placeholders, made to set the art direction. Replace them with licensed or commissioned photography before launch, keeping the same file names and roughly the same framing. `src/components/Photos.ts` holds each one's focal point.

Founder portraits start from colour masters in `assets-source/portraits/`. Each was made by editing that founder's own photo into one consistent studio session (the same grey backdrop, soft light and framing) while keeping the face unchanged. They were checked against the source photos side by side and with Apple Vision face geometry, landing within about 1.5% of the source on average. `scripts/portraits.mjs` crops both to 4:5 in colour. Each founder should approve their portrait before launch, and real studio photos can replace the masters at any time.

## Deploy

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push to `main`. Before the first merge, switch **Settings > Pages > Build and deployment > Source** to **GitHub Actions**. The custom domain (`junglecode.jp`) stays as configured.

## Launch checklist

- [ ] Create the `hello@junglecode.jp` mailbox or alias in Google Workspace
- [ ] Paste the real booking link into `BOOKING_URL` in `src/data/config.ts` (until then, "Book 30 minutes" opens a prepared email)
- [ ] Native-speaker review of everything in `src/data/ja.ts` and the `summary_ja` lines in the notes
- [ ] Jet and Aditya review their bios, their portraits, the origin story and the sample Readiness Sprint agenda
- [ ] Replace the generated Tokyo photographs with licensed or commissioned ones
- [ ] Edit the three draft notes, replace the editor prompts with real examples, set `draft: false`
- [ ] Confirm the anonymized engagement line ("a North American AI visual-inspection company")
- [ ] Confirm the healthcare framing (specialist partners lead PMDA filings and reimbursement dossiers)
- [ ] Send a test submission through the form and confirm it arrives in Formspree
- [ ] Switch GitHub Pages to deploy from GitHub Actions, then merge
