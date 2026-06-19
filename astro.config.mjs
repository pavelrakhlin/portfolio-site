// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Update `site` to your real URL when you add a custom domain or know your
// Vercel subdomain (e.g. https://your-portfolio-site.vercel.app). It powers
// the sitemap and canonical/OG URLs.
export default defineConfig({
  site: 'https://example.com',
  integrations: [sitemap()],
});
