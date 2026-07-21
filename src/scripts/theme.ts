const STORAGE_KEY = 'theme';
type Pref = 'light' | 'dark' | 'system';
const ORDER: Pref[] = ['light', 'dark', 'system'];
const LABELS: Record<Pref, string> = {
  light: 'Light',
  dark: 'Dark',
  system: 'System',
};

function getStoredPref(): Pref {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === 'light' || v === 'dark' || v === 'system') return v;
  } catch {}
  return 'system';
}

function announce(pref: Pref): void {
  const region = document.querySelector<HTMLElement>('[data-theme-announce]');
  if (region) region.textContent = `Theme set to ${LABELS[pref]}`;
}

function updateButtons(pref: Pref): void {
  const next = ORDER[(ORDER.indexOf(pref) + 1) % ORDER.length];
  const label = `Theme: ${LABELS[pref]} (click to switch to ${LABELS[next]})`;
  document
    .querySelectorAll<HTMLButtonElement>('[data-theme-toggle]')
    .forEach((btn) => btn.setAttribute('aria-label', label));
}

function applyTheme(pref: Pref): void {
  const root = document.documentElement;
  if (pref === 'system') root.removeAttribute('data-theme');
  else root.setAttribute('data-theme', pref);
  root.setAttribute('data-theme-pref', pref);
  updateButtons(pref);
}

/**
 * Wires every theme-toggle button (desktop sidebar + mobile topbar instances).
 * Safe to re-run on every `astro:page-load` (View Transitions replace <body>).
 */
export function initThemeToggle(): void {
  updateButtons(getStoredPref());

  document
    .querySelectorAll<HTMLButtonElement>('[data-theme-toggle]')
    .forEach((btn) => {
      if (btn.dataset.themeInit === 'true') return;
      btn.dataset.themeInit = 'true';
      btn.addEventListener('click', () => {
        const current = getStoredPref();
        const next = ORDER[(ORDER.indexOf(current) + 1) % ORDER.length];
        try {
          localStorage.setItem(STORAGE_KEY, next);
        } catch {}
        applyTheme(next);
        announce(next);
      });
    });
}

let mqlBound = false;

/** Keeps the toggle's announcement/state fresh if the OS scheme changes while in System mode. */
export function bindSystemThemeListener(): void {
  if (mqlBound) return;
  mqlBound = true;
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', () => {
      if (getStoredPref() === 'system') announce('system');
    });
}
