import { animate } from 'motion';

/**
 * Lightbox + custom cursor for case-study media.
 *
 * - initLightbox(): click (or Enter/Space) an image/gif to open it enlarged in
 *   a full-screen gallery overlay. Prev/next via on-screen arrows and the
 *   Arrow keys (wrap-around). Esc / backdrop / × close it. Focus is trapped in
 *   the dialog and returns to the triggering element on close.
 * - initCursor(): a filled accent dot follows the pointer and grows over
 *   enlargeable media, revealing a fixed-size "+". Pointer devices only; never
 *   on touch; snaps (no follow-lag) under reduced motion.
 *
 * Mirrors src/scripts/reveal.ts: named exports, `motion` lib, reduced-motion
 * aware, safe to re-run on every `astro:page-load` (View Transitions replace
 * <body>, so appended nodes are recreated — see the isConnected guards).
 */

const REDUCED = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE_POINTER = () =>
  window.matchMedia('(pointer: fine)').matches &&
  window.matchMedia('(hover: hover)').matches;

const TRIGGER_SELECTOR = '.media-trigger[data-lightbox]';

// ---------------------------------------------------------------------------
// Lightbox
// ---------------------------------------------------------------------------

interface LBState {
  open: boolean;
  index: number;
  triggers: HTMLElement[];
  lastFocus: HTMLElement | null;
}

const state: LBState = { open: false, index: 0, triggers: [], lastFocus: null };

let overlay: HTMLElement | null = null;
let imgEl: HTMLImageElement;
let counterEl: HTMLElement;
let prevBtn: HTMLButtonElement;
let nextBtn: HTMLButtonElement;
let closeBtn: HTMLButtonElement;
let lbDelegated = false;

function buildOverlay(): void {
  // View Transitions replace <body>; drop the stale reference and rebuild.
  if (overlay && !overlay.isConnected) overlay = null;
  if (overlay) return;

  overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Image viewer');
  overlay.hidden = true;
  // The visible navigation is the figure itself (left/right 20% = prev/next,
  // middle = close — driven by the custom cursor zones). The buttons below are
  // visually hidden (.sr-only) but stay focusable + announced so keyboard and
  // screen-reader users can navigate.
  overlay.innerHTML = `
    <div class="lightbox__backdrop" data-lb-close></div>
    <figure class="lightbox__figure">
      <img class="lightbox__img" alt="" />
    </figure>
    <button class="lightbox__btn sr-only lightbox__prev" type="button" aria-label="Previous image">&#8249;</button>
    <button class="lightbox__btn sr-only lightbox__next" type="button" aria-label="Next image">&#8250;</button>
    <button class="lightbox__btn sr-only lightbox__close" type="button" aria-label="Close image viewer" data-lb-close>&#215;</button>
    <p class="lightbox__counter" aria-live="polite"></p>`;
  document.body.appendChild(overlay);

  imgEl = overlay.querySelector('.lightbox__img')!;
  counterEl = overlay.querySelector('.lightbox__counter')!;
  prevBtn = overlay.querySelector('.lightbox__prev')!;
  nextBtn = overlay.querySelector('.lightbox__next')!;
  closeBtn = overlay.querySelector('.lightbox__close')!;
  const figure = overlay.querySelector<HTMLElement>('.lightbox__figure')!;

  prevBtn.addEventListener('click', () => go(-1));
  nextBtn.addEventListener('click', () => go(+1));
  // Click the image by zone: left 20% → prev, right 20% → next, middle → close.
  figure.addEventListener('click', (e) => {
    const r = figure.getBoundingClientRect();
    const zone = (e.clientX - r.left) / r.width;
    const multi = state.triggers.length > 1;
    if (multi && zone < 0.2) go(-1);
    else if (multi && zone > 0.8) go(+1);
    else close();
  });
  overlay.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).hasAttribute('data-lb-close')) close();
  });
  overlay.addEventListener('keydown', onKeydown);
}

function render(): void {
  const trigger = state.triggers[state.index];
  const inner = trigger.querySelector('img');
  // The `src` attribute is the largest rendition Astro emits; fall back to the
  // browser-selected source for safety. Gifs carry their raw /public src.
  const full = inner?.getAttribute('src') || inner?.currentSrc || '';
  imgEl.src = full;
  imgEl.alt = trigger.getAttribute('data-alt') || inner?.alt || '';
  counterEl.textContent = `${state.index + 1} / ${state.triggers.length}`;
  const multi = state.triggers.length > 1;
  prevBtn.hidden = !multi;
  nextBtn.hidden = !multi;
}

function open(index: number, triggers: HTMLElement[]): void {
  buildOverlay();
  state.triggers = triggers;
  state.index = index;
  state.lastFocus = document.activeElement as HTMLElement;
  render();
  overlay!.hidden = false;
  document.body.style.overflow = 'hidden'; // scroll lock
  state.open = true;
  closeBtn.focus(); // move focus into the dialog

  if (REDUCED()) return;
  animate(overlay!, { opacity: [0, 1] }, { duration: 0.25 });
  animate(
    imgEl,
    { opacity: [0, 1], transform: ['scale(0.96)', 'scale(1)'] },
    { duration: 0.35, easing: [0.22, 1, 0.36, 1] },
  );
}

function close(): void {
  if (!state.open) return;
  const finish = () => {
    overlay!.hidden = true;
    document.body.style.overflow = '';
    state.open = false;
    state.lastFocus?.focus(); // return focus to the triggering thumbnail
  };
  if (REDUCED()) {
    finish();
    return;
  }
  animate(overlay!, { opacity: [1, 0] }, { duration: 0.2 }).finished.then(
    finish,
  );
}

function go(delta: number): void {
  const n = state.triggers.length;
  if (n === 0) return;
  state.index = (state.index + delta + n) % n; // wrap-around
  render();
  if (!REDUCED()) animate(imgEl, { opacity: [0.4, 1] }, { duration: 0.2 });
}

function onKeydown(e: KeyboardEvent): void {
  if (!state.open) return;
  if (e.key === 'Escape') {
    close();
    return;
  }
  if (e.key === 'ArrowLeft') {
    e.preventDefault();
    go(-1);
    return;
  }
  if (e.key === 'ArrowRight') {
    e.preventDefault();
    go(+1);
    return;
  }
  if (e.key === 'Tab') {
    // Trap focus across the visible controls.
    const focusable = Array.from(
      overlay!.querySelectorAll<HTMLElement>('button:not([hidden])'),
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
}

export function initLightbox(): void {
  buildOverlay();
  if (state.open) close(); // close any stale overlay after navigation

  if (lbDelegated) return; // bind the document listener exactly once
  lbDelegated = true;
  document.addEventListener('click', (e) => {
    const trigger = (e.target as HTMLElement).closest<HTMLElement>(
      TRIGGER_SELECTOR,
    );
    if (!trigger) return;
    e.preventDefault();
    const triggers = Array.from(
      document.querySelectorAll<HTMLElement>(TRIGGER_SELECTOR),
    );
    open(triggers.indexOf(trigger), triggers);
  });
}

// ---------------------------------------------------------------------------
// Custom cursor
// ---------------------------------------------------------------------------

let cursorEl: HTMLElement | null = null;
let cursorBound = false;

export function initCursor(): void {
  if (!FINE_POINTER()) return; // pointer devices only

  // View Transitions replace <body>; rebuild if our node was removed.
  if (cursorEl && !cursorEl.isConnected) {
    cursorEl = null;
    cursorBound = false;
  }
  if (!cursorEl) {
    cursorEl = document.createElement('div');
    cursorEl.className = 'cursor-dot';
    cursorEl.setAttribute('aria-hidden', 'true');
    // One ring + a glyph per state; CSS reveals the glyph that matches
    // the current data-icon. Carets/× are entities so they don't depend on
    // an icon font.
    cursorEl.innerHTML = `
      <span class="cursor-dot__ring"></span>
      <span class="cursor-dot__glyph" data-glyph="plus">+</span>
      <span class="cursor-dot__glyph" data-glyph="close">&#215;</span>
      <span class="cursor-dot__glyph" data-glyph="prev">&#8249;</span>
      <span class="cursor-dot__glyph" data-glyph="next">&#8250;</span>`;
    document.body.appendChild(cursorEl);
  }

  if (cursorBound) return;
  cursorBound = true;

  // Snap the dot directly to the pointer — no follow-lag. The dot only shows
  // over media, where any lag reads as the indicator "trailing" the cursor.
  const place = (x: number, y: number) => {
    cursorEl!.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
  };

  // Which icon/state for the current pointer position.
  //   - lightbox open: caret in the left/right 20% of the image, else close
  //   - over a thumbnail: plus
  //   - otherwise: hidden (OS cursor shows)
  const resolve = (target: HTMLElement, x: number): string | null => {
    if (state.open) {
      const fig = overlay?.querySelector<HTMLElement>('.lightbox__figure');
      if (fig && fig.contains(target)) {
        const r = fig.getBoundingClientRect();
        const zone = (x - r.left) / r.width;
        const multi = state.triggers.length > 1;
        if (multi && zone < 0.2) return 'prev';
        if (multi && zone > 0.8) return 'next';
        return 'close';
      }
      return null; // over backdrop/chrome → normal cursor
    }
    return target.closest(TRIGGER_SELECTOR) ? 'plus' : null;
  };

  window.addEventListener('mousemove', (e) => {
    place(e.clientX, e.clientY);
    const icon = resolve(e.target as HTMLElement, e.clientX);
    if (icon) {
      cursorEl!.dataset.icon = icon;
      cursorEl!.classList.add('is-active');
    } else {
      cursorEl!.classList.remove('is-active');
    }
  });

  window.addEventListener('mouseleave', () =>
    cursorEl!.classList.remove('is-active'),
  );
}
