# PDF offers

Landing-page style PDF offers, authored as a single HTML file per offer and rendered to A4 with headless Chromium (Playwright). Typeface: Inter (self-hosted in `assets/fonts/inter`).

## Offers

| Client | Source | Output |
| --- | --- | --- |
| Whale Watching Hauganes (whales.is) | `offers/whales-hauganes/index.html` | `offers/whales-hauganes/Whales-Hauganes-Tilbod.pdf` |
| Vélasalan (velasalan.is) | `offers/velasalan/index.html` | `offers/velasalan/Velasalan-Tilbod.pdf` |

## Editing

Open the offer's `index.html` in a browser to preview (each `.page` section is one A4 page). Edit copy and prices directly in the HTML. Brand colors live in the `:root` block at the top of the file; layout and typography are shared in `assets/offer.css`.

Each offer is three A4 pages: cover, the offer itself, and a summary with next steps and contact details.

**Validity rule:** "Tilboðið gildir til" is always today's date plus 4 days. Set it in two places: the cover meta strip (Gildir til) and the Skilmálar box on the last page.

### Logos

The offer looks for `logo.png` next to its `index.html`. If the file exists it is used everywhere the logo appears; if not, an inline SVG recreation of the logo is rendered instead. To use the official logo, save it as `offers/<client>/logo.png` (square, transparent background works best) and rebuild.

## Building the PDF

```bash
npm install          # once, installs Playwright
npm run build        # renders every offer
npm run build:whales # or one offer at a time
```

Or for any offer: `node build.js path/to/index.html path/to/output.pdf`.
