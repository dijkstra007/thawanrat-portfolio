import type { Metadata } from 'next';
import { site } from '@/content/site';
import { pageUrl, SITE_ORIGIN } from '@/lib/routes';
import type { Locale, Project } from '@/lib/types';

const clean = (text: string) => text.replace(/\u2060/g, '').replace(/\u00a0/g, ' ');

export function pageMetadata(locale: Locale, path: string, title: string, description: string, project = false): Metadata {
  title = clean(title);
  description = clean(description);
  return {
    metadataBase: new URL(SITE_ORIGIN),
    title,
    description,
    alternates: {
      canonical: pageUrl(locale, path),
      languages: { en: pageUrl('en', path), th: pageUrl('th', path), 'x-default': pageUrl('en', path) },
    },
    openGraph: {
      title, description, url: pageUrl(locale, path), siteName: 'Fahworks',
      type: project ? 'article' : 'website',
      locale: locale === 'th' ? 'th_TH' : 'en_US',
      alternateLocale: locale === 'th' ? 'en_US' : 'th_TH',
      images: [{ url: `${SITE_ORIGIN}/og.png`, width: 1200, height: 630,
        alt: locale === 'th' ? 'พอร์ตโฟลิโอออกแบบบรรจุภัณฑ์และแบรนด์ของ Thawanrat T.' : 'Packaging and brand design portfolio by Thawanrat T.' }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [`${SITE_ORIGIN}/og.png`] },
  };
}

export function homeMetadata(locale: Locale) {
  const { title, description } = site.copy[locale].metadata;
  return pageMetadata(locale, '/', title, description);
}

export function workMetadata(locale: Locale) {
  return pageMetadata(locale, '/work',
    locale === 'th' ? 'ผลงานออกแบบบรรจุภัณฑ์ แบรนด์ และกราฟิก | Thawanrat T.' : 'Packaging, Brand Identity & Graphic Design Work | Thawanrat T.',
    locale === 'th'
      ? 'ชมผลงานของ Thawanrat T. ตั้งแต่บรรจุภัณฑ์พบประที่ได้รับรางวัล ThaiStar อัตลักษณ์แบรนด์ ไปจนถึงโบรชัวร์และแคมเปญสำหรับ PTT Station และ Protech Transfer'
      : 'Explore Thawanrat T.’s design work: ThaiStar award-winning Phop Pra packaging, brand identities, brochures, and campaigns for PTT Station and Protech Transfer.');
}

export function projectMetadata(project: Project, locale: Locale) {
  const discipline = {
    en: { Packaging: 'Packaging Design', Branding: 'Brand Design', Campaign: 'Campaign Design', Digital: 'Digital Design' },
    th: { Packaging: 'ออกแบบบรรจุภัณฑ์', Branding: 'ออกแบบแบรนด์', Campaign: 'ออกแบบแคมเปญ', Digital: 'ออกแบบสื่อดิจิทัล' },
  }[locale][project.category];
  return pageMetadata(locale, `/work/${project.slug}`, `${project.title} — ${discipline} | Thawanrat T.`, project.description, true);
}

export function personJsonLd(locale: Locale) {
  return {
    '@context': 'https://schema.org', '@type': 'Person', name: 'Thawanrat T.',
    jobTitle: locale === 'th' ? 'นักออกแบบบรรจุภัณฑ์และอัตลักษณ์แบรนด์' : 'Packaging & Brand Identity Designer',
    url: pageUrl(locale), inLanguage: locale,
    sameAs: [site.copy[locale].footer.linkedin, site.copy[locale].footer.fastwork],
    knowsAbout: locale === 'th' ? ['การออกแบบบรรจุภัณฑ์', 'อัตลักษณ์แบรนด์', 'การออกแบบกราฟิก'] : ['Packaging design', 'Brand identity', 'Graphic design'],
  };
}

export function projectJsonLd(project: Project, locale: Locale) {
  return {
    '@context': 'https://schema.org', '@type': 'CreativeWork', name: clean(project.title),
    description: clean(project.description), url: pageUrl(locale, `/work/${project.slug}`), inLanguage: locale,
    image: (project.images ?? []).map((image) => new URL(image, SITE_ORIGIN).href),
    author: { '@type': 'Person', name: 'Thawanrat T.', url: pageUrl(locale) },
  };
}
