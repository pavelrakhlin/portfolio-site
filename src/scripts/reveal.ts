import { inView } from 'motion';

/**
 * Autoplay section videos only while they're on screen, and never under
 * reduced-motion (the poster frame stays visible instead). Muted + playsinline
 * keep mobile browsers happy; play() rejections are swallowed gracefully.
 * Re-run after each View Transition navigation.
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
