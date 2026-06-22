# Adding content to the site

A practical guide for adding case studies, images, GIFs, and video. No framework
knowledge required — just follow the steps.

> **TL;DR**
> - **Images** → put in `src/assets/<slug>/`, reference with a **relative** path (`../../assets/...`)
> - **GIFs / video** → put in `public/case-media/<slug>/`, reference with an **absolute** path (`/case-media/...`)
> - Each case study is one Markdown file in `src/content/projects/`
> - Save → the dev server hot-reloads. A bad path fails the build with a clear error.

---

## How media works (the one thing to understand)

The site handles the two kinds of media differently:

| Media | File goes in | Referenced as | Why |
|---|---|---|---|
| **Static image** (PNG/JPG) | `src/assets/<slug>/` | relative `../../assets/<slug>/file.png` | Astro optimizes it — resizes, converts to WebP, makes it responsive |
| **Animated GIF** | `public/case-media/<slug>/` | absolute `/case-media/<slug>/file.gif` | Served as-is so the animation survives (the optimizer would freeze a GIF to one frame) |
| **Video** (MP4/WebM) | `public/case-media/<slug>/` | absolute `/case-media/<slug>/file.mp4` | Streamed verbatim; can't go through the image optimizer |

`<slug>` is the case study's folder name (e.g. `case-study-1`). Keep each study's
assets in their own subfolder so things stay tidy.

> **The #1 gotcha:** image paths use `../../assets/...` (relative, with `..`).
> GIF/video paths use `/case-media/...` (absolute, leading slash, **no** `..`).

---

## Exporting from Figma

In the Figma **desktop app**, select the frame → use the **Export** section in the
right panel (or right-click → Export):

- **Static image:** export at **2×**, format **PNG** (use **JPG** for photos). 2×
  keeps it crisp on retina screens; Astro downsizes from there.
- **Animated content:** Figma can't export animated GIFs directly. Record the
  prototype/interaction as a video, then either use it as-is (`video` type) or
  convert it (see [Converting a GIF or recording to MP4](#converting-a-gif-or-recording-to-mp4)).
  **Prefer MP4 over GIF** — it's ~10× smaller and higher quality.

Save the exported files into the matching folder (create it if it doesn't exist):

```
src/assets/<slug>/         ← PNGs / JPGs / video poster frames
public/case-media/<slug>/  ← GIFs, MP4s, WebMs
```

---

## Adding media to an existing case study

Open the case study file in `src/content/projects/<slug>.md`. Each section has a
`media` block — pick the type that matches your file.

### A static image

```yaml
  - heading: Direction 1 — Salt
    body: >-
      Your section copy here.
    media:
      type: image
      src: ../../assets/case-study-1/salt-concept.png
      alt: Salt concept — glass and crystalline UI surfaces.
```

### A GIF

```yaml
  - heading: Direction 1 — Salt
    body: >-
      Your section copy here.
    media:
      type: gif
      src: /case-media/case-study-1/salt-shimmer.gif
      alt: Animated shimmer effect on a card surface.
```

### A video (recommended for motion)

`mp4` is required; `webm` is optional but improves quality/size in supporting
browsers. `poster` is a still frame shown before playback and to anyone who has
"reduce motion" turned on — it's an **image**, so it lives in `src/assets/`.

```yaml
  - heading: Direction 1 — Salt
    body: >-
      Your section copy here.
    media:
      type: video
      mp4: /case-media/case-study-1/salt-demo.mp4
      webm: /case-media/case-study-1/salt-demo.webm   # optional
      poster: ../../assets/case-study-1/salt-poster.png
      alt: Looping demo of the Salt direction in motion.
```

Video autoplays (muted, looping) when it scrolls into view, and pauses when it
scrolls away. If the visitor prefers reduced motion, it never plays — they just
see the poster frame.

> Always write a meaningful `alt` describing the visual. It's required, and it's
> what screen-reader users and search engines rely on.

---

## Creating a whole new case study

1. **Create the asset folders:**
   ```
   src/assets/<slug>/
   public/case-media/<slug>/        # only if you have GIFs/video
   ```

2. **Create `src/content/projects/<slug>.md`** with this frontmatter shape:

   ```yaml
   ---
   title: My Project Title
   summary: One-sentence summary shown under the title and in listings.
   role: Product Designer
   year: 2026
   tags:
     - Design Language
     - Motion
   cover: ../../assets/<slug>/cover.png
   coverAlt: Description of the cover image.
   featured: true        # show on the homepage
   order: 1              # lower numbers sort first
   draft: true           # hidden from the live site until ready (see below)
   sections:
     - heading: The problem
       body: >-
         Describe the challenge. The `>-` lets you wrap the text across
         multiple lines — it gets joined into one paragraph.
       media:
         type: image
         src: ../../assets/<slug>/problem.png
         alt: Description of this image.
     # ...add as many sections as you need, each with its own media block
   ---

   This body text is only shown if a project has no `sections`. With sections,
   you can leave it as a short note.
   ```

3. **Save and view** at `http://localhost:4321/work/<slug>/`.

### Field reference

| Field | Required | Notes |
|---|---|---|
| `title` | yes | Case study title |
| `summary` | yes | One line under the title + in listings |
| `role` | yes | Your role on the project |
| `year` | yes | A number, e.g. `2026` |
| `tags` | no | List of disciplines; defaults to none |
| `cover` / `coverAlt` | yes | Hero image (relative path) + its alt text |
| `featured` | no | `true` shows it on the homepage; default `false` |
| `order` | no | Sort position, lower = first; default `99` |
| `draft` | no | `true` = hidden in production, visible locally; default `false` |
| `sections` | no | The text + media blocks that make up the page |

---

## Drafts: building before you publish

Set `draft: true` while you're still working. A draft:

- **shows** when you run the site locally (`npm run dev`)
- is **hidden** from the built/published site (it won't appear in the sidebar,
  the homepage, or at its URL in production)

When it's ready to go live, change it to `draft: false` (or delete the line).

---

## Running and verifying

This project needs **Node 22.12+** (use Node 24). If you use `nvm`:

```bash
cd ~/Projects/portfolio-site
nvm use            # reads .nvmrc → Node 24
npm run dev        # → http://localhost:4321
```

- The dev server **hot-reloads** — save a file and the browser updates.
- To check it builds cleanly before publishing:
  ```bash
  npm run build
  ```
  If a media path is wrong or a required field is missing, the build **fails with
  a clear error naming the file and the problem.** That's your guardrail — fix it
  and rebuild.

---

## Converting a GIF or recording to MP4

GIFs are large and low quality. If you have a GIF (or a screen recording), convert
it to a web-optimized MP4 (+ WebM) with [ffmpeg](https://ffmpeg.org/):

```bash
# muted, web-optimized MP4 (h264)
ffmpeg -i input.gif -movflags +faststart -pix_fmt yuv420p \
  -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -an -c:v libx264 -crf 23 -preset slow \
  public/case-media/<slug>/clip.mp4

# WebM (vp9) — force yuv420p (some GIFs decode to a format vp9 rejects)
ffmpeg -i input.gif -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2,format=yuv420p" \
  -an -c:v libvpx-vp9 -crf 34 -b:v 0 \
  public/case-media/<slug>/clip.webm

# poster (first frame) → src/assets so it gets optimized
ffmpeg -i input.gif -frames:v 1 src/assets/<slug>/clip-poster.png
```

Then reference it with the `video` media type (see above).

> If you re-export a clip with the **same filename**, the browser may show a stale
> cached copy. Bump the filename (`clip-v2.mp4`) when replacing.

---

## Publishing

When your changes are ready:

```bash
git add .
git commit -m "Add <something>"
git push origin <branch>
```

Pushing to GitHub triggers an automatic redeploy on Vercel. (Pushes go to
github.com from your own terminal.)
```
