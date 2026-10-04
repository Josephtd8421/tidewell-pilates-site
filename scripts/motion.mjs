// Records the page's motion: hero on load, the timetable, pricing and Visit map reveals, and a CTA hover.
// Usage: pnpm preview (in another shell), then: node scripts/motion.mjs [baseUrl]
// Writes screenshots/motion.webm, motion.gif and motion-frames.png. Needs ffmpeg and ImageMagick.
import puppeteer from 'puppeteer-core';
import { execFileSync } from 'node:child_process';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const base = process.argv[2] ?? 'http://localhost:4321/';
const executablePath = process.env.CHROME_PATH ?? '/usr/bin/chromium';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({ executablePath, headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1 });
await page.emulateMediaFeatures([
  { name: 'prefers-color-scheme', value: 'light' },
  { name: 'prefers-reduced-motion', value: 'no-preference' },
]);

const scrollTo = (selector) =>
  page.evaluate((sel) => document.querySelector(sel)?.scrollIntoView({ behavior: 'instant', block: 'center' }), selector);
// Hover a CTA and capture its sweep up close.
const hoverShot = async (selector, path) => {
  await scrollTo(selector);
  const box = await (await page.$(selector)).boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await wait(330);
  // boundingBox is viewport-relative; clip is document-relative.
  const [sx, sy] = await page.evaluate(() => [window.scrollX, window.scrollY]);
  const pad = 24;
  await page.screenshot({
    path,
    clip: { x: box.x + sx - pad, y: box.y + sy - pad, width: box.width + pad * 2, height: box.height + pad * 2 },
  });
};

// Video: hero load (contours, needle, CTA sweep), timetable, ticket, Visit map, CTA hover.
// Start on the page's paper colour so the first frame isn't a white flash.
await page.setContent('<body style="margin:0;background:#edf3f0"></body>');
const recorder = await page.screencast({ path: 'screenshots/motion.webm' });
await page.goto(base, { waitUntil: 'networkidle0' });
await wait(3200);
await scrollTo('#timetable .days');
await wait(1600);
await scrollTo('#pricing .ticket');
await wait(1200);
await scrollTo('#visit .map');
await wait(2800);
await scrollTo('#book button[type="submit"]');
await wait(400);
const submit = await (await page.$('#book button[type="submit"]')).boundingBox();
await page.mouse.move(submit.x + submit.width / 2, submit.y + submit.height / 2);
await wait(1200);
await recorder.stop();

// Stills: a fresh load, sampled through each phase.
const dir = await mkdtemp(join(tmpdir(), 'tidewell-motion-'));
const frames = [];
// Sample at absolute offsets (ms) from the start of each phase.
const sample = async (prefix, offsets) => {
  const t0 = Date.now();
  for (const t of offsets) {
    await wait(t - (Date.now() - t0));
    const path = join(dir, `${prefix}-${t}.png`);
    await page.screenshot({ path });
    frames.push(path);
  }
};
await page.mouse.move(0, 0);
await page.goto('about:blank');
await page.goto(base, { waitUntil: 'domcontentloaded' });
await sample('hero', [150, 1100, 2000]);
await scrollTo('#timetable .days');
await sample('timetable', [300]);
await scrollTo('#visit .map');
await sample('visit', [150, 900, 2400]);
const hover = join(dir, 'cta-hover.png');
await hoverShot('#book button[type="submit"]', hover);
frames.push(hover);
await browser.close();

execFileSync('magick', ['montage', ...frames, '-tile', '4x', '-geometry', '640x400+6+6', '-background', '#c9d9d2', 'screenshots/motion-frames.png']);
execFileSync('ffmpeg', [
  '-y', '-loglevel', 'error', '-i', 'screenshots/motion.webm',
  '-vf', 'fps=12,scale=720:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=96[p];[b][p]paletteuse=dither=none',
  'screenshots/motion.gif',
]);
await rm(dir, { recursive: true });
console.log('saved screenshots/motion.webm, motion.gif, motion-frames.png');
