import { getAssetBase } from '@/lib/assets';

const storageKey = 'portfolio:locale-scroll';

export function saveLocaleScroll(href: string) {
  try {
    sessionStorage.setItem(storageKey, JSON.stringify({
      href: `${getAssetBase()}${href}`,
      x: window.scrollX,
      y: window.scrollY,
      savedAt: Date.now(),
    }));
  } catch {
    // Language switching still works when browser storage is unavailable.
  }
}

export function restoreLocaleScroll() {
  try {
    const saved = sessionStorage.getItem(storageKey);
    if (!saved) return;
    sessionStorage.removeItem(storageKey);
    const position = JSON.parse(saved);
    const target = new URL(position.href, window.location.origin);
    if (target.origin !== window.location.origin || target.pathname !== window.location.pathname
      || target.search !== window.location.search || !Number.isFinite(position.savedAt)
      || Date.now() - position.savedAt > 60_000
      || !Number.isFinite(position.x) || !Number.isFinite(position.y)) return;

    // Restore the section URL without triggering the browser's anchor scrolling.
    window.history.replaceState(window.history.state, '', target.href);
    window.scrollTo({ left: position.x, top: position.y, behavior: 'instant' });
  } catch {
    // Ignore unavailable storage or an invalid/expired restoration record.
  }
}
