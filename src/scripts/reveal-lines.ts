/**
 * Split heading text into visual lines and animate each line in with a stagger.
 * Used on the About page bio and case-study page titles. Re-run after View
 * Transition navigations via initRevealLines() from Base.astro.
 */

import { inView } from 'motion';

export const REVEAL_LINES_READY = 'reveal-lines-ready';

function prefersReduced(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Keep hyphenated compounds (e.g. AI-first) on one line. */
function normalizeRevealWord(word: string): string {
  return word.replace(/(\w)-(\w)/g, '$1\u2011$2');
}

/** Restore plain text before re-splitting lines (e.g. after View Transitions). */
function resetRevealHeading(heading: HTMLElement): void {
  const lines = heading.querySelectorAll('.reveal-line');
  const text =
    lines.length > 0
      ? [...lines]
          .map((line) => line.textContent?.trim())
          .filter(Boolean)
          .join(' ')
      : (heading.textContent?.trim().replace(/[ \t\r\n]+/g, ' ') ?? '');

  heading.replaceChildren(document.createTextNode(text));
  heading.removeAttribute('data-reveal-lines-ready');
  heading.style.removeProperty('opacity');
}

/** Wrap each rendered line in `.reveal-line` with a staggered `--reveal-delay`. */
export function groupWordsIntoLines(container: HTMLElement): number {
  const text = container.textContent?.trim().replace(/[ \t\r\n]+/g, ' ') ?? '';
  if (!text) return 0;

  const words = text.split(/ +/).map(normalizeRevealWord);
  container.replaceChildren();

  const wordSpans = words.map((word) => {
    const span = document.createElement('span');
    span.textContent = word;
    span.style.display = 'inline';
    container.appendChild(span);
    container.appendChild(document.createTextNode(' '));
    return span;
  });

  const lines: HTMLElement[][] = [];
  let current: HTMLElement[] = [];
  let lastTop = -1;

  wordSpans.forEach((span) => {
    const top = span.offsetTop;
    if (lastTop !== -1 && top > lastTop + 1) {
      lines.push(current);
      current = [];
    }
    current.push(span);
    lastTop = top;
  });
  if (current.length) lines.push(current);

  const baseDelay = Number(container.dataset.lineBaseDelay ?? 0.1);
  const stagger = Number(container.dataset.lineStagger ?? 0.09);

  container.replaceChildren();
  lines.forEach((lineWords, index) => {
    const line = document.createElement('span');
    line.className = 'reveal-line';
    line.style.setProperty(
      '--reveal-delay',
      `${baseDelay + index * stagger}s`,
    );
    // Drop the compositing hint once the blur-in finishes; keeping it
    // indefinitely wastes GPU memory on an element that never animates again.
    line.addEventListener(
      'animationend',
      () => {
        line.style.willChange = 'auto';
      },
      { once: true },
    );
    lineWords.forEach((word, wordIndex) => {
      line.appendChild(word.cloneNode(true));
      if (wordIndex < lineWords.length - 1) {
        line.appendChild(document.createTextNode(' '));
      }
    });
    container.appendChild(line);
  });

  return lines.length;
}

/** Delay (seconds) after the last line of a heading finishes animating. */
export function getHeadingRevealEndDelay(heading: HTMLElement): number {
  const baseDelay = Number(heading.dataset.lineBaseDelay ?? 0.1);
  const stagger = Number(heading.dataset.lineStagger ?? 0.09);
  const lineCount = heading.querySelectorAll('.reveal-line').length;
  return baseDelay + lineCount * stagger + 0.12;
}

/** Trigger a deferred reveal element (e.g. About page pills). */
export function revealAt(el: HTMLElement, delay: number): void {
  el.style.setProperty('--reveal-delay', `${delay}s`);
  el.removeAttribute('data-reveal-wait');
}

/** Like `revealAt`, but holds until embedded media is ready (e.g. a hero image). */
function scheduleReveal(el: HTMLElement, delaySeconds: number): void {
  const start = performance.now();
  whenMediaReady(el).then(() => {
    const elapsed = (performance.now() - start) / 1000;
    revealAt(el, Math.max(0, delaySeconds - elapsed));
  });
}

/**
 * Cascade `[data-reveal-wait]` elements in after their scope's heading
 * finishes its blur-in reveal. Scope is the nearest `[data-reveal-scope]`
 * ancestor of a `[data-reveal-lines]` heading; elements stagger in DOM
 * order, each adding its own `data-reveal-step` (default 0.07s) to the
 * running delay. `revealAt` removes `data-reveal-wait` as it fires, so
 * repeat dispatches (e.g. the double `astro:page-load` on first paint) are
 * no-ops for already-revealed elements.
 */
export function initDeferredReveals(): void {
  document.addEventListener(REVEAL_LINES_READY, () => {
    document.querySelectorAll<HTMLElement>('[data-reveal-lines]').forEach((heading) => {
      const scope = heading.closest<HTMLElement>('[data-reveal-scope]');
      if (!scope) return;

      let delay = getHeadingRevealEndDelay(heading);
      scope.querySelectorAll<HTMLElement>('[data-reveal-wait]').forEach((el) => {
        scheduleReveal(el, delay);
        delay += Number(el.dataset.revealStep ?? 0.07);
      });
    });
  });
}

function processHeadings(): void {
  const reduced = prefersReduced();

  document.querySelectorAll<HTMLElement>('[data-reveal-lines]').forEach((heading) => {
    // init() runs twice per document instance (the inline script's direct call,
    // then again on the redundant `astro:page-load` dispatch that also fires on
    // a plain load/reload, not just View Transition nav). Skip a heading that's
    // already been revealed so the second pass doesn't reset + replay its
    // animation mid-flight — that replay is the source of the reload flicker.
    if (heading.dataset.revealLinesReady === 'true') return;

    if (reduced) {
      resetRevealHeading(heading);
      heading.dataset.revealLinesReady = 'true';
      heading.style.opacity = '1';
      return;
    }

    resetRevealHeading(heading);
    heading.dataset.revealLinesReady = 'true';
    groupWordsIntoLines(heading);
    heading.style.opacity = '1';
  });

  if (reduced) {
    document
      .querySelectorAll('[data-reveal-wait]')
      .forEach((el) => el.removeAttribute('data-reveal-wait'));
  }
}

/** Process all `[data-reveal-lines]` headings; resolves after fonts are ready. */
export function initRevealLines(): Promise<void> {
  const run = () =>
    new Promise<void>((resolve) => {
      // Wait for View Transition styles to paint before measuring line breaks.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          processHeadings();
          resolve();
          document.dispatchEvent(new Event(REVEAL_LINES_READY));
        });
      });
    });

  if (document.fonts?.ready) {
    return document.fonts.ready.then(run);
  }
  return run();
}

/** Resolve once any image/video inside `el` has finished loading (or immediately if none). */
function whenMediaReady(el: HTMLElement): Promise<void> {
  return new Promise((resolve) => {
    const img = el.querySelector('img');
    if (img instanceof HTMLImageElement) {
      if (img.complete && img.naturalWidth > 0) {
        resolve();
      } else {
        img.addEventListener('load', () => resolve(), { once: true });
        img.addEventListener('error', () => resolve(), { once: true });
      }
      return;
    }

    const video = el.querySelector('video');
    if (video instanceof HTMLVideoElement) {
      if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        resolve();
      } else {
        video.addEventListener('loadeddata', () => resolve(), { once: true });
        video.addEventListener('error', () => resolve(), { once: true });
      }
      return;
    }

    resolve();
  });
}

/** Fade up a block once any embedded media has finished loading. */
function revealBlock(el: HTMLElement): void {
  if (el.classList.contains('is-revealed')) return;
  whenMediaReady(el).then(() => el.classList.add('is-revealed'));
}

/** Fade up case-study content blocks as they scroll into view. */
export function initScrollReveals(): void {
  const reduced = prefersReduced();
  const blocks = document.querySelectorAll<HTMLElement>('[data-reveal-scroll]');

  blocks.forEach((el) => {
    if (reduced) {
      el.classList.add('is-revealed');
      return;
    }
    if (el.dataset.scrollReveal === 'ready') return;
    el.dataset.scrollReveal = 'ready';

    inView(
      el,
      () => {
        revealBlock(el);
      },
      { amount: 0.12 },
    );
  });
}

/** Stack info-row items all at once when they no longer fit on one line. */
export function initInfoRowLayout(): void {
  document.querySelectorAll<HTMLElement>('.info-row').forEach((row) => {
    if (row.dataset.infoRowLayout === 'ready') return;
    row.dataset.infoRowLayout = 'ready';

    const items = () =>
      [...row.querySelectorAll<HTMLElement>('.info-row__item')];

    const update = () => {
      const els = items();
      if (els.length === 0) return;

      row.classList.remove('info-row--stacked');

      if (row.scrollWidth > row.clientWidth + 1) {
        row.classList.add('info-row--stacked');
      }
    };

    new ResizeObserver(update).observe(row);
    if (document.fonts?.ready) {
      document.fonts.ready.then(update);
    } else {
      update();
    }
  });
}
