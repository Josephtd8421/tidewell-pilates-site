// Records the page's motion: hero on load, then the timetable and pricing reveals.
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

// Video: whole sequence. Start on the page's paper colour so the first frame isn't a white flash.
await page.setContent('<body style="margin:0;background:#edf3f0"></body>');
const recorder = await page.screencast({ path: 'screenshots/motion.webm' });
await page.goto(base, { waitUntil: 'networkidle0' });
await wait(3000);
await page.evaluate(() => document.querySelector('#timetable')?.scrollIntoView({ behavior: 'instant' }));
await wait(1800);
await page.evaluate(() => document.querySelector('#pricing')?.scrollIntoView({ behavior: 'instant' }));
await wait(1400);
await recorder.stop();

// Stills: a fresh load, sampled through the hero and the timetable reveal.
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
await page.goto('about:blank');
await page.goto(base, { waitUntil: 'domcontentloaded' });
await sample('hero', [150, 600, 1200, 2600]);
await page.evaluate(() => document.querySelector('#timetable')?.scrollIntoView({ behavior: 'instant' }));
await sample('timetable', [120, 300, 1200]);
await browser.close();

execFileSync('magick', ['montage', ...frames, '-tile', '4x', '-geometry', '640x400+6+6', '-background', '#c9d9d2', 'screenshots/motion-frames.png']);
execFileSync('ffmpeg', [
  '-y', '-loglevel', 'error', '-i', 'screenshots/motion.webm',
  '-vf', 'fps=12,scale=720:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=96[p];[b][p]paletteuse=dither=none',
  'screenshots/motion.gif',
]);
await rm(dir, { recursive: true });
console.log('saved screenshots/motion.webm, motion.gif, motion-frames.png');
