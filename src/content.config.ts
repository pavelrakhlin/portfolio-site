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
      // Text + media sections that make up the case-study body.
      // Each section carries ONE media item. Use the `media` object to pick
      // its type: a static `image` (optimized via astro:assets), an animated
      // `gif`, or a looping `video`. The legacy `image`/`imageAlt` fields are
      // still accepted (older projects) and render as a static image.
      sections: z
        .array(
          z
            .object({
              heading: z.string(),
              body: z.string(),
              dividerBefore: z.boolean().default(false),
              // Legacy image-only section (kept for existing projects).
              image: image().optional(),
              imageAlt: z.string().optional(),
              // New: one media item per section.
              //  - image: relative path, optimized + responsive via <Image>.
              //  - gif:   absolute /public path (e.g. /case-media/foo.gif),
              //           served verbatim so the animation is preserved.
              //  - video: absolute /public paths for mp4 (required) + optional
              //           webm; `poster` is a still frame (optimized image).
              media: z
                .discriminatedUnion('type', [
                  z.object({
                    type: z.literal('image'),
                    src: image(),
                    alt: z.string(),
                  }),
                  z.object({
                    type: z.literal('gif'),
                    src: z.string(),
                    alt: z.string(),
                  }),
                  z.object({
                    type: z.literal('video'),
                    webm: z.string().optional(),
                    mp4: z.string(),
                    poster: image(),
                    alt: z.string(),
                  }),
                ])
                .optional(),
            })
            .refine((s) => !s.media || !s.image, {
              message:
                'Use either `media` or the legacy `image` + `imageAlt`, not both.',
            }),
        )
        .default([]),
    }),
});

export const collections = { projects };
