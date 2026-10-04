// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Live portfolio deployment. The site is deliberately kept out of search
  // indexes: see public/robots.txt, the robots meta in Base.astro and vercel.json.
  site: 'https://tidewell.joedymnioski.com',
  build: { inlineStylesheets: 'always' },
});
