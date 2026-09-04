#!/usr/bin/env node
/**
 * Renders an offer HTML file to PDF with headless Chromium (Playwright).
 *
 * Usage:
 *   node build.js offers/whales-hauganes/index.html [output.pdf]
 *
 * Playwright is resolved from the local node_modules first, then from the
 * global install (the remote Claude Code environment ships it globally).
 */
const path = require('path');
const fs = require('fs');

function loadPlaywright() {
  const candidates = ['playwright', '/opt/node22/lib/node_modules/playwright'];
  for (const c of candidates) {
    try { return require(c); } catch (_) { /* try next */ }
  }
  throw new Error('Playwright not found. Run `npm install` first.');
}

async function main() {
  const input = process.argv[2];
  if (!input) {
    console.error('Usage: node build.js <offer.html> [output.pdf]');
    process.exit(1);
  }
  const htmlPath = path.resolve(input);
  const outPath = path.resolve(process.argv[3] || htmlPath.replace(/\.html?$/i, '.pdf'));

  const { chromium } = loadPlaywright();
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 794, height: 1123 } });

  await page.goto('file://' + htmlPath, { waitUntil: 'load' });
  await page.emulateMedia({ media: 'print' });
  await page.evaluate(() => document.fonts.ready);
  // Give any web fonts a moment to settle before snapshotting.
  await page.waitForTimeout(250);

  await page.pdf({
    path: outPath,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });
  await browser.close();

  const kb = Math.round(fs.statSync(outPath).size / 1024);
  console.log(`Wrote ${path.relative(process.cwd(), outPath)} (${kb} KB)`);
}

main().catch((err) => { console.error(err); process.exit(1); });
