import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { NOTES_ENABLED } from './src/data/features.ts';

export default defineConfig({
  site: 'https://junglecode.jp',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && (NOTES_ENABLED || !page.includes('/notes/')),
      i18n: { defaultLocale: 'en', locales: { en: 'en', ja: 'ja' } },
    }),
  ],
});
