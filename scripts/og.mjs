// Renders public/og.png (1200x630) and PNG favicons from local SVG/HTML using headless Chromium.
import puppeteer from 'puppeteer-core';
import { readFile } from 'node:fs/promises';

const executablePath = process.env.CHROME_PATH ?? '/usr/bin/chromium';
const browser = await puppeteer.launch({ executablePath, headless: true });
const font = (p) => readFile(new URL(`../node_modules/@fontsource/${p}`, import.meta.url)).then((b) => b.toString('base64'));
const serif = await font('young-serif/files/young-serif-latin-400-normal.woff2');
const sans = await font('hanken-grotesk/files/hanken-grotesk-latin-700-normal.woff2');

const og = await browser.newPage();
await og.setViewport({ width: 1200, height: 630 });
await og.setContent(await readFile(new URL('./og.html', import.meta.url), 'utf8')
  .then((h) => h.replace('__SERIF__', serif).replace('__SANS__', sans)), { waitUntil: 'load' });
await og.evaluate(() => document.fonts.ready);
await og.screenshot({ path: 'public/og.png', clip: { x: 0, y: 0, width: 1200, height: 630 }, captureBeyondViewport: false });

const svg = await readFile(new URL('../public/favicon.svg', import.meta.url), 'utf8');
for (const [size, file] of [[32, 'favicon-32.png'], [180, 'apple-touch-icon.png']]) {
  const p = await browser.newPage();
  await p.setViewport({ width: size, height: size });
  await p.setContent(`<html><body style="margin:0">${svg.replace('<svg ', `<svg width="${size}" height="${size}" `)}</body></html>`);
  await p.screenshot({ path: `public/${file}`, omitBackground: true });
}
await browser.close();
console.log('og + icons written');
