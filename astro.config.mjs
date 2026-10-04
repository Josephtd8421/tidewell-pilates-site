// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Placeholder domain for an invented business (portfolio sample).
  site: 'https://tidewell-pilates.example',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'always' },
});
