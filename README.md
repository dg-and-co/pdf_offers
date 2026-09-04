# PDF offers

Landing-page style PDF offers, authored as a single HTML file per offer and rendered to A4 with headless Chromium (Playwright). Typeface: Inter (self-hosted in `assets/fonts/inter`).

## Offers

| Client | Source | Output |
| --- | --- | --- |
| Whales Hauganes (whales.is) | `offers/whales-hauganes/index.html` | `offers/whales-hauganes/Whales-Hauganes-Tilbod.pdf` |

## Editing

Open the offer's `index.html` in a browser to preview (each `.page` section is one A4 page). Edit copy and prices directly in the HTML. Brand colors live in the `:root` block at the top of the file.

The Whales Hauganes logo is currently a placeholder lockup (whale fluke + wordmark). To use the real logo, replace the `<a class="logo …">` blocks with an `<img>` pointing at the logo file.

## Building the PDF

```bash
npm install          # once, installs Playwright
npm run build:whales # renders offers/whales-hauganes/Whales-Hauganes-Tilbod.pdf
```

Or for any offer: `node build.js path/to/index.html path/to/output.pdf`.
