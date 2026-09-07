import type { MetadataRoute } from 'next';
import { projects } from '@/content/projects';
import { pageUrl } from '@/lib/routes';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', '/work', ...projects.map(({ slug }) => `/work/${slug}`)].flatMap((path) =>
    (['en', 'th'] as const).map((locale) => ({
      url: pageUrl(locale, path),
      alternates: { languages: { en: pageUrl('en', path), th: pageUrl('th', path), 'x-default': pageUrl('en', path) } },
    })),
  );
}
