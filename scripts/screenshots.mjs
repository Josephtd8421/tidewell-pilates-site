// Captures full-page screenshots (light + dark, desktop + mobile) from a running preview server.
// Usage: pnpm preview (in another shell), then: node scripts/screenshots.mjs [baseUrl]
import puppeteer from 'puppeteer-core';
import { mkdir } from 'node:fs/promises';

const base = process.argv[2] ?? 'http://localhost:4321/';
const executablePath = process.env.CHROME_PATH ?? '/usr/bin/chromium';
await mkdir('screenshots', { recursive: true });

const browser = await puppeteer.launch({ executablePath, headless: true });
for (const [label, width, height, mobile] of [['1440', 1440, 900, false], ['390', 390, 844, true]]) {
  for (const scheme of ['light', 'dark']) {
    const page = await browser.newPage();
    await page.setViewport({ width, height, deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile });
    await page.emulateMediaFeatures([
      { name: 'prefers-color-scheme', value: scheme },
      { name: 'prefers-reduced-motion', value: 'reduce' },
    ]);
    await page.goto(base, { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready);
    const path = `screenshots/harbor-${label}-${scheme}.png`;
    await page.screenshot({ path, fullPage: true });
    console.log('saved', path);
    await page.close();
  }
}
await browser.close();
