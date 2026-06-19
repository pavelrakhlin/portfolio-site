import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Each case study is one Markdown file in src/content/projects/.
// This schema validates frontmatter at build time — a broken or missing
// field fails the build with a clear error (your content guardrail).
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      role: z.string(),
      year: z.number(),
      tags: z.array(z.string()).default([]),
      // Cover image: place the file next to the markdown or in src/assets/
      // and reference it by relative path. Astro optimizes it via astro:assets.
      cover: image(),
      coverAlt: z.string(),
      featured: z.boolean().default(false),
      // Lower numbers sort first on listing pages.
      order: z.number().default(99),
      draft: z.boolean().default(false),
    }),
});

export const collections = { projects };
