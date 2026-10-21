import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://junglecode.jp',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      i18n: { defaultLocale: 'en', locales: { en: 'en', ja: 'ja' } },
    }),
  ],
});
