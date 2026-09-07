import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';

const origin = 'https://fahworks.com';
const get = async (path) => {
  const response = await fetch(origin + path, { signal: AbortSignal.timeout(20000), cache: 'no-store' });
  assert.equal(response.status, 200, `${path}: expected HTTP 200`);
  assert.equal(new URL(response.url).origin, origin, `${path}: unexpected redirect host`);
  return response.text();
};

async function verify() {
  const robots = await get('/robots.txt');
  assert.match(robots, /Allow: \/\s/);
  assert.match(robots, /Sitemap: https:\/\/fahworks.com\/sitemap.xml/);
  assert.doesNotMatch(robots, /github\.io/);
  const xml = await get('/sitemap.xml');
  assert.doesNotMatch(xml, /github\.io/);
  const sitemap = new JSDOM(xml, { contentType: 'text/xml' }).window.document;
  const urls = [...sitemap.querySelectorAll('loc')].map((node) => node.textContent);
  assert.ok(urls.every((url) => url.startsWith(origin + '/')));
  const project = urls.map((url) => new URL(url).pathname).find((path) => /^\/work\/[^/]+\/$/.test(path));
  assert.ok(project, 'Sitemap must include projects');
  for (const url of urls) {
    const path = new URL(url).pathname;
    const paired = path.startsWith('/th/') ? path.slice(3) : '/th' + path;
    assert.ok(urls.includes(origin + paired), `Missing sitemap locale pair: ${path}`);
  }
  const titles = new Set();
  const descriptions = new Set();
  for (const path of ['/', '/work/', project]) {
    for (const locale of ['en', 'th']) {
      const localized = locale === 'th' ? '/th' + path : path;
      assert.ok(urls.includes(origin + localized));
      // Check the user-facing /th spelling as well as exported /th/.
      if (localized === '/th/') await get('/th');
      const document = new JSDOM(await get(localized)).window.document;
      const canonical = origin + localized;
      assert.equal(document.documentElement.lang, locale);
      assert.equal(document.querySelectorAll('h1').length, 1, localized);
      assert.ok(document.querySelector('h1').textContent.trim());
      assert.equal(document.head.querySelector('link[rel="canonical"]')?.href, canonical);
      assert.equal(document.head.querySelectorAll('link[hreflang]').length, 3);
      for (const lang of ['en', 'th', 'x-default']) {
        const target = (lang === 'th' ? '/th' : '') + path;
        assert.equal(document.head.querySelector(`link[hreflang="${lang}"]`)?.href, origin + target);
        if (lang !== 'x-default') assert.equal(document.querySelector(`a[hreflang="${lang}"]`)?.getAttribute('href'), target);
      }
      const description = document.head.querySelector('meta[name="description"]')?.content;
      assert.ok(document.title && !titles.has(document.title), `Nonunique title: ${localized}`);
      assert.ok(description && !descriptions.has(description), `Nonunique description: ${localized}`);
      titles.add(document.title); descriptions.add(description);
      assert.equal(document.head.querySelector('meta[property="og:url"]')?.content, canonical);
      document.defaultView.close();
      console.log(`Verified ${localized}: HTTP 200, canonical, H1, metadata and paired language URLs`);
    }
  }
  for (const path of ['/fr/', '/th/work/unknown-project/']) {
    const response = await fetch(origin + path, { signal: AbortSignal.timeout(20000) });
    assert.equal(response.status, 404, `${path}: expected HTTP 404`);
  }
  console.log(`Verified robots.txt and ${urls.length} sitemap URLs. Owner: submit ${origin}/sitemap.xml in Google Search Console.`);
}

// Pages/CDN propagation can lag behind the successful deployment response.
const attempts = process.env.CI ? 6 : 1;
for (let attempt = 1; attempt <= attempts; attempt++) {
  try { await verify(); break; }
  catch (error) {
    if (attempt === attempts) throw error;
    console.log(`Live checks waiting for Pages propagation (${attempt}/${attempts}): ${error.message}`);
    await new Promise((resolve) => setTimeout(resolve, 10000));
  }
}
