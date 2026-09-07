import type { Locale } from '@/lib/types';

export const SITE_ORIGIN = 'https://fahworks.com';

// Match the directory URLs emitted by the GitHub Pages static export.
export function localePath(locale: Locale = 'en', path = '/') {
  const clean = path.replace(/^\/+|\/+$/g, '');
  return `${locale === 'th' ? '/th' : ''}/${clean ? `${clean}/` : ''}`;
}

export function pageUrl(locale: Locale = 'en', path = '/') {
  return `${SITE_ORIGIN}${localePath(locale, path)}`;
}
