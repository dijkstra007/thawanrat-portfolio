import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { register } from 'node:module';
import { test } from 'node:test';
import { JSDOM } from 'jsdom';

register('./image-test-loader.mjs', import.meta.url);
const { projects } = await import('../content/projects.ts');
const { getProjectBySlug } = await import('../lib/projects.ts');

test('slugs are unique, URL-safe, and independent of language', () => {
  assert.equal(new Set(projects.map((project) => project.slug)).size, projects.length);
  for (const project of projects) {
    assert.match(project.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    for (const locale of ['en', 'th']) {
      assert.equal(getProjectBySlug(project.slug, locale).id, project.id);
      assert.equal(getProjectBySlug(project.slug, locale).slug, project.slug);
    }
  }
  assert.equal(getProjectBySlug('unknown-project'), undefined);
});

test('static export contains every case study, share metadata, and working project links', async () => {
  const sitemap = await readFile(new URL('../public/sitemap.xml', import.meta.url), 'utf8');
  for (const project of projects) {
    const html = await readFile(new URL(`../out/work/${project.slug}/index.html`, import.meta.url), 'utf8');
    const document = new JSDOM(html).window.document;
    assert.equal(document.title, `${project.copy.en.title} — Thawanrat T.`);
    assert.equal(document.querySelector('meta[property="og:title"]').content, document.title);
    assert.ok(document.querySelector('[role="dialog"]'), 'Case study must render in exported HTML');
    assert.ok(sitemap.includes(`/work/${project.slug}/`));
  }
  const html = await readFile(new URL('../out/work/index.html', import.meta.url), 'utf8');
  const document = new JSDOM(html).window.document;
  for (const project of projects) {
    assert.ok([...document.querySelectorAll('a')].some((link) => link.getAttribute('href').includes(`/work/${project.slug}`)));
  }
});
