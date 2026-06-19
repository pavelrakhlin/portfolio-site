import { animate, inView, stagger } from 'motion';

/**
 * Owned motion helper. Wires up scroll reveals and staggered group
 * animations using the `motion` library. Fully respects reduced-motion:
 * when the user prefers reduced motion (or JS is unavailable) elements are
 * simply visible — CSS handles that fallback, so we no-op here.
 *
 * Usage in markup:
 *   <div data-reveal>...</div>                 single fade/slide in
 *   <ul data-reveal-group> <li>..</li> </ul>   stagger children in
 */
export function initReveal(): void {
  const prefersReduced = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;
  if (prefersReduced) return; // CSS already shows everything.

  // Single elements: fade + slide up once they enter the viewport.
  inView(
    '[data-reveal]:not([data-reveal-group] *)',
    (element) => {
      animate(
        element,
        { opacity: [0, 1], transform: ['translateY(20px)', 'translateY(0)'] },
        { duration: 0.6, easing: [0.22, 1, 0.36, 1] },
      );
      element.classList.add('is-visible');
    },
    { amount: 0.2 },
  );

  // Groups: stagger the direct children for an orchestrated reveal.
  inView(
    '[data-reveal-group]',
    (group) => {
      const children = Array.from(group.children) as HTMLElement[];
      children.forEach((c) => c.setAttribute('data-reveal', ''));
      animate(
        children,
        { opacity: [0, 1], transform: ['translateY(24px)', 'translateY(0)'] },
        {
          duration: 0.6,
          delay: stagger(0.08),
          easing: [0.22, 1, 0.36, 1],
        },
      );
      children.forEach((c) => c.classList.add('is-visible'));
    },
    { amount: 0.15 },
  );
}

/**
 * Autoplay section videos only while they're on screen, and never under
 * reduced-motion (the poster frame stays visible instead). Muted + playsinline
 * keep mobile browsers happy; play() rejections are swallowed gracefully.
 * Re-run after each View Transition navigation alongside initReveal().
 */
export function initVideos(): void {
  const prefersReduced = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;

  const videos = document.querySelectorAll<HTMLVideoElement>(
    'video[data-autoplay-video]',
  );

  videos.forEach((video) => {
    if (prefersReduced) {
      video.pause(); // poster only — never plays
      return;
    }
    // Play on scroll-in, pause on scroll-out (saves CPU, mirrors reveals).
    inView(
      video,
      (el) => {
        const vid = el as HTMLVideoElement;
        vid.play().catch(() => {}); // ignore autoplay rejections
        return () => vid.pause();
      },
      { amount: 0.25 },
    );
  });
}
