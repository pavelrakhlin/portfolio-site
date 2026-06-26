import { animate } from 'motion';

const SCROLL_THRESHOLD = 320;
const SCROLL_PAUSE_MS = 400;

const prefersReduced = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const centeredTransform = (y: string) => `translateX(-50%) translateY(${y})`;

/** Pin horizontal center to `#main` so alignment holds on every page and breakpoint. */
function syncHorizontalPosition(btn: HTMLButtonElement): void {
  const main = document.getElementById('main');
  if (!main) return;

  const { left, width } = main.getBoundingClientRect();
  btn.style.left = `${left + width / 2}px`;
}

/**
 * Pill "Back to top" control: appears after the user scrolls down and pauses.
 * Safe to re-run on every `astro:page-load` (View Transitions replace <body>).
 */
export function initBackToTop(): void {
  const btn = document.querySelector<HTMLButtonElement>('[data-back-to-top]');
  if (!btn || btn.dataset.backToTopInit === 'true') return;
  btn.dataset.backToTopInit = 'true';

  let pauseTimer: ReturnType<typeof setTimeout> | null = null;
  let visible = false;

  const updatePosition = () => syncHorizontalPosition(btn);
  updatePosition();
  window.addEventListener('resize', updatePosition, { passive: true });

  const main = document.getElementById('main');
  if (main && 'ResizeObserver' in window) {
    const observer = new ResizeObserver(updatePosition);
    observer.observe(main);
  }

  const setHidden = (hidden: boolean) => {
    btn.hidden = hidden;
    btn.setAttribute('aria-hidden', hidden ? 'true' : 'false');
  };

  const hide = () => {
    if (!visible) return;
    visible = false;

    if (prefersReduced()) {
      setHidden(true);
      return;
    }

    animate(
      btn,
      {
        opacity: [1, 0],
        transform: [centeredTransform('0'), centeredTransform('8px')],
      },
      { duration: 0.2 },
    ).finished.then(() => setHidden(true));
  };

  const show = () => {
    if (visible || window.scrollY <= SCROLL_THRESHOLD) return;
    visible = true;
    updatePosition();
    setHidden(false);

    if (prefersReduced()) {
      btn.style.opacity = '1';
      btn.style.transform = centeredTransform('0');
      return;
    }

    btn.style.opacity = '0';
    animate(
      btn,
      {
        opacity: [0, 1],
        transform: [centeredTransform('8px'), centeredTransform('0')],
      },
      { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
    );
  };

  const onScroll = () => {
    if (window.scrollY <= SCROLL_THRESHOLD) {
      if (pauseTimer) clearTimeout(pauseTimer);
      pauseTimer = null;
      hide();
      return;
    }

    if (visible) hide();

    if (pauseTimer) clearTimeout(pauseTimer);
    pauseTimer = setTimeout(show, SCROLL_PAUSE_MS);
  };

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReduced() ? 'auto' : 'smooth' });
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  setHidden(true);
}
