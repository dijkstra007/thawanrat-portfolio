import {
  homeMetadata, personJsonLd, projectJsonLd, projectMetadata,
  resumeJsonLd, resumeMetadata, workMetadata,
} from '@/lib/seo';
import { SITE_ORIGIN } from '@/lib/routes';
import type { Locale, Project } from '@/lib/types';

function setMeta(attribute: 'name' | 'property', key: string, value: string) {
  const selector = `meta[${attribute}="${key}"]`;
  const element = document.head.querySelector<HTMLMetaElement>(selector) ?? document.createElement('meta');
  element.setAttribute(attribute, key);
  element.content = value;
  if (!element.isConnected) document.head.appendChild(element);
}

function setLink(rel: string, href: string, language?: string) {
  const selector = `link[rel="${rel}"]${language ? `[hreflang="${language}"]` : ''}`;
  const element = document.head.querySelector<HTMLLinkElement>(selector) ?? document.createElement('link');
  element.rel = rel;
  element.href = href;
  if (language) element.hreflang = language;
  if (!element.isConnected) document.head.appendChild(element);
}

// Native history changes keep the server-rendered document. Keep its language and
// metadata aligned with the translated content without requesting a new document.
export function syncLocaleDocument(locale: Locale, view: 'home' | 'work' | 'resume', project?: Project | null) {
  const metadata = project ? projectMetadata(project, locale)
    : view === 'work' ? workMetadata(locale)
    : view === 'resume' ? resumeMetadata(locale) : homeMetadata(locale);

  document.documentElement.lang = locale;
  document.documentElement.dataset.locale = locale;
  document.title = metadata.title;
  setLink('canonical', metadata.alternates.canonical);
  for (const [language, href] of Object.entries(metadata.alternates.languages)) {
    setLink('alternate', href, language);
  }

  const { openGraph, twitter } = metadata;
  for (const [key, value] of Object.entries({
    description: metadata.description,
    'twitter:card': twitter.card,
    'twitter:title': twitter.title,
    'twitter:description': twitter.description,
    'twitter:image': twitter.images[0],
  })) setMeta('name', key, value);

  for (const [key, value] of Object.entries({
    'og:title': openGraph.title,
    'og:description': openGraph.description,
    'og:url': openGraph.url,
    'og:site_name': openGraph.siteName,
    'og:type': openGraph.type,
    'og:locale': openGraph.locale,
    'og:locale:alternate': openGraph.alternateLocale,
    'og:image': openGraph.images[0].url,
    'og:image:width': String(openGraph.images[0].width),
    'og:image:height': String(openGraph.images[0].height),
    'og:image:alt': openGraph.images[0].alt,
  })) setMeta('property', key, value);

  const structured = project ? projectJsonLd(project, locale)
    : view === 'resume' ? resumeJsonLd(locale)
    : view === 'home' ? personJsonLd(locale) : null;
  if (!structured) return;

  for (const script of document.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]')) {
    try {
      const current = JSON.parse(script.textContent ?? '');
      if (current?.['@type'] === structured['@type'] && typeof current.url === 'string'
        && new URL(current.url).origin === SITE_ORIGIN) {
        script.textContent = JSON.stringify(structured).replace(/</g, '\\u003c');
      }
    } catch {
      // Ignore unrelated or malformed structured data in the document.
    }
  }
}
