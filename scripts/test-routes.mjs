import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { register } from 'node:module';
import { test } from 'node:test';
import { JSDOM } from 'jsdom';

register('./image-test-loader.mjs', import.meta.url);
const { projects, featuredProjectIds } = await import('../content/projects.ts');
const { getProjectBySlug } = await import('../lib/projects.ts');
const origin = 'https://fahworks.com';
const paths = ['/', '/work/', ...projects.map(({ slug }) => `/work/${slug}/`)];
const pathFor = (locale, path) => locale === 'th' ? `/th${path}` : path;
const readPage = async (path) => new JSDOM(await readFile(new URL(`../out${path}index.html`, import.meta.url), 'utf8')).window.document;

test('existing slugs are unique, URL-safe, and shared across languages', () => {
  assert.equal(new Set(projects.map(({ slug }) => slug)).size, projects.length);
  for (const project of projects) {
    assert.match(project.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    for (const locale of ['en', 'th']) assert.equal(getProjectBySlug(project.slug, locale).id, project.id);
  }
  assert.equal(getProjectBySlug('unknown-project'), undefined);
});

test('every exported EN/TH page has complete, self-referencing SEO before JavaScript', async () => {
  const titles = new Set();
  const descriptions = new Set();
  for (const path of paths) {
    for (const locale of ['en', 'th']) {
      const localized = pathFor(locale, path);
      const canonical = origin + localized;
      const document = await readPage(localized);
      const meta = (name) => document.head.querySelector(`meta[name="${name}"], meta[property="${name}"]`)?.content;
      assert.equal(document.documentElement.lang, locale, localized);
      assert.equal(document.querySelectorAll('h1').length, 1, localized);
      assert.ok(document.querySelector('h1').textContent.trim(), localized);
      assert.equal(document.head.querySelectorAll('link[rel="canonical"]').length, 1, localized);
      assert.equal(document.head.querySelector('link[rel="canonical"]').href, canonical);
      assert.equal(document.head.querySelectorAll('link[hreflang]').length, 3, localized);
      for (const lang of ['en', 'th', 'x-default']) {
        const target = pathFor(lang === 'th' ? 'th' : 'en', path);
        assert.equal(document.head.querySelector(`link[hreflang="${lang}"]`)?.href, origin + target);
        await access(new URL(`../out${target}index.html`, import.meta.url));
      }
      assert.ok(!titles.has(document.title), `Duplicate title: ${localized}`);
      assert.ok(document.title.includes('Thawanrat T.'), localized);
      assert.ok(!descriptions.has(meta('description')), `Duplicate description: ${localized}`);
      assert.ok(meta('description')?.length > 30, localized);
      titles.add(document.title); descriptions.add(meta('description'));
      assert.equal(meta('og:url'), canonical);
      assert.equal(meta('og:site_name'), 'Fahworks');
      assert.equal(meta('og:locale'), locale === 'th' ? 'th_TH' : 'en_US');
      assert.equal(meta('og:locale:alternate'), locale === 'th' ? 'en_US' : 'th_TH');
      for (const name of ['og:image', 'twitter:image']) assert.equal(meta(name), `${origin}/og.png`);
      for (const name of ['og:title', 'twitter:title']) assert.equal(meta(name), document.title);
      for (const name of ['og:description', 'twitter:description']) assert.equal(meta(name), meta('description'));
      assert.equal(meta('twitter:card'), 'summary_large_image');
      if (locale === 'th') {
        assert.match(document.title, /[ก-๙]/);
        assert.match(meta('description'), /[ก-๙]/);
      }
      for (const image of document.querySelectorAll('img')) {
        assert.ok(image.alt.trim(), `Empty image alt: ${localized} ${image.src}`);
        if (locale === 'th') assert.match(image.alt, /[ก-๙]/);
        else assert.doesNotMatch(image.alt, /[ก-๙]/);
        assert.doesNotMatch(image.alt, /Protein Snake|image\d/i);
      }
      for (const link of document.querySelectorAll('a[href]')) {
        const href = link.getAttribute('href');
        assert.ok(!href.includes('github.io'), href);
        if (!href.startsWith('/')) continue;
        const url = new URL(href, origin);
        if (!link.hasAttribute('hreflang')) assert.ok(url.pathname.startsWith(locale === 'th' ? '/th/' : '/'), href);
        if (locale === 'en' && !link.hasAttribute('hreflang')) assert.ok(!url.pathname.startsWith('/th/'), href);
        if (locale === 'th' && link.hasAttribute('hreflang') && link.hreflang === 'en') continue;
        await access(new URL(`../out${url.pathname}index.html`, import.meta.url));
        if (url.hash) {
          const targetDocument = await readPage(url.pathname);
          assert.ok(targetDocument.getElementById(url.hash.slice(1)), `Broken fragment: ${href}`);
          targetDocument.defaultView.close();
        }
      }
      for (const lang of ['en', 'th']) {
        const switcher = document.querySelector(`a[hreflang="${lang}"]`);
        assert.equal(switcher?.getAttribute('href'), pathFor(lang, path), `Language pair: ${localized}`);
      }
      const structured = [...document.querySelectorAll('script[type="application/ld+json"]')].map((script) => JSON.parse(script.textContent));
      if (path !== '/work/') {
        const data = structured.find((item) => item['@type'] === (path === '/' ? 'Person' : 'CreativeWork'));
        assert.ok(data, localized);
        assert.equal(data.url, canonical);
        assert.equal(data.inLanguage, locale);
        if (path === '/') {
          assert.equal(data.sameAs.length, 2);
          assert.ok(data.knowsAbout.length >= 2);
        } else {
          assert.equal(data.description, meta('description'));
          assert.ok(data.image.length > 0);
          assert.ok(data.image.every((url) => url.startsWith(origin + '/')));
          assert.equal(data.author.url, origin + pathFor(locale, '/'));
        }
      }
      document.defaultView.close();
    }
  }
});

test('home and work index expose crawlable localized project links and spaced headings', async () => {
  for (const locale of ['en', 'th']) {
    const home = await readPage(pathFor(locale, '/'));
    const work = await readPage(pathFor(locale, '/work/'));
    for (const project of projects) {
      const href = pathFor(locale, `/work/${project.slug}/`);
      assert.ok(work.querySelector(`a[href="${href}"]`), href);
      if (featuredProjectIds.includes(project.id)) assert.ok(home.querySelector(`a[href="${href}"]`), href);
    }
    const headings = [...home.querySelectorAll('h2')].map((heading) => heading.textContent.replace(/\s+/g, ' ').trim());
    if (locale === 'en') for (const expected of ['Work that speaks.', 'Designing with purpose, from concept to production.', 'My professional journey.', 'Communication Design.', 'Let’s create something great.']) assert.ok(headings.includes(expected), expected);
  }
});

test('robots and sitemap contain only production URLs and every EN/TH route', async () => {
  const robots = await readFile(new URL('../out/robots.txt', import.meta.url), 'utf8');
  assert.match(robots, /Allow: \/\s/);
  assert.match(robots, /Sitemap: https:\/\/fahworks.com\/sitemap.xml/);
  assert.doesNotMatch(robots, /github\.io/);
  const xml = await readFile(new URL('../out/sitemap.xml', import.meta.url), 'utf8');
  assert.doesNotMatch(xml, /github\.io/);
  const document = new JSDOM(xml, { contentType: 'text/xml' }).window.document;
  const urls = [...document.querySelectorAll('loc')].map((loc) => loc.textContent);
  assert.deepEqual(urls.sort(), paths.flatMap((path) => ['en', 'th'].map((locale) => origin + pathFor(locale, path))).sort());
  for (const link of document.getElementsByTagName('xhtml:link')) assert.ok(link.getAttribute('href').startsWith(origin + '/'));
});

test('unknown locales and slugs are not exported, and a noindex 404 exists', async () => {
  for (const path of ['/fr/', '/en/', '/th/unknown/', '/work/unknown-project/', '/th/work/unknown-project/']) {
    await assert.rejects(access(new URL(`../out${path}index.html`, import.meta.url)));
  }
  const html = await readFile(new URL('../out/404.html', import.meta.url), 'utf8');
  assert.match(html, /noindex/);
});
