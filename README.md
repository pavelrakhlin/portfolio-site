# portfolio-site

A fully-owned design portfolio built with [Astro](https://astro.build). Case
studies are plain Markdown — no CMS, no lock-in. The repo *is* the content.

## Stack

- **Astro** (static output) — ships ~0 JS by default
- **Markdown content collections** — type-validated frontmatter (`src/content.config.ts`)
- **`astro:assets`** — automatic responsive image optimization (WebP/AVIF)
- **Motion** + Astro **View Transitions** + CSS — scroll reveals, page
  transitions, and micro-interactions, all with `prefers-reduced-motion`
  fallbacks
- **Plain CSS + design tokens** — restyle everything from `src/styles/global.css`

## Requirements

Node **22+** (this repo pins **24** via `.nvmrc`). If you use nvm: `nvm use`.

> Note: `.npmrc` pins the public npm registry so installs work off the corporate
> VPN. Remove it if you want to use your default registry.

## Develop

```bash
nvm use            # Node 24
npm install
npm run dev        # http://localhost:4321
npm run build      # static site -> dist/
npm run preview    # serve the built site
```

## Add a case study

1. Copy `src/content/projects/example-project.md` to a new file (the filename
   becomes the URL slug, e.g. `my-project.md` → `/work/my-project/`).
2. Drop a cover image in `src/assets/` and point `cover:` at it.
3. Fill in the frontmatter — all fields are validated at build time:

   | field      | type      | notes                                  |
   | ---------- | --------- | -------------------------------------- |
   | `title`    | string    | shown everywhere                       |
   | `summary`  | string    | one-line description                   |
   | `role`     | string    | your role on the project               |
   | `year`     | number    | sorts newest-first within same `order` |
   | `tags`     | string[]  | optional                               |
   | `cover`    | image     | relative path to image                 |
   | `coverAlt` | string    | required alt text (accessibility)      |
   | `featured` | boolean   | show on the homepage                   |
   | `order`    | number    | lower = earlier; default 99            |
   | `draft`    | boolean   | hidden in production builds            |

4. Write the body in Markdown. `npm run build` will fail with a clear error if
   any frontmatter is wrong.

## Deploy (free)

Push to GitHub, then import the repo on [Vercel](https://vercel.com) — it
auto-detects Astro and deploys to `*.vercel.app` with free HTTPS. Every push
gets a preview URL. Update `site` in `astro.config.mjs` (and `robots.txt`) to
your real URL so the sitemap and canonical/OG tags are correct.
