import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { register } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import { JSDOM } from 'jsdom';
import sharp from 'sharp';

const rootDirectory = fileURLToPath(new URL('../', import.meta.url));
// Load the actual components in Node; CSS stays a class-name map in DOM tests.
register('./image-test-loader.mjs', import.meta.url);

const dom = new JSDOM('<!doctype html><html><body><div id="test"></div></body></html>', { url: 'http://localhost/', pretendToBeVisual: true });
globalThis.window = dom.window;
globalThis.document = dom.window.document;
globalThis.HTMLElement = dom.window.HTMLElement;
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
globalThis.ResizeObserver = class { observe() {} disconnect() {} };
const preloads = [];
globalThis.Image = class {
  set src(value) { this.url = value; preloads.push(this); }
};
process.env.NEXT_PUBLIC_BASE_PATH = '/portfolio';
const { createElement: h, act } = await import('react');
const { createRoot } = await import('react-dom/client');
const { default: Archive } = await import('../components/archive/Archive.tsx');
const { default: SelectedWork } = await import('../components/selected-work/SelectedWork.tsx');
const { default: CaseStudy } = await import('../components/case-study/CaseStudy.tsx');
const { filterProjects, getFeaturedProjects, getProjectById } = await import('../lib/projects.ts');
const { site } = await import('../content/site.ts');
const container = document.getElementById('test');
const root = createRoot(container);
const copy = site.copy.en;
const noop = () => {};
const render = async (element) => act(() => root.render(element));
const click = async (label, scope = container) => {
  const button = [...scope.querySelectorAll('button')].find((item) => item.getAttribute('aria-label') === label);
  assert.ok(button, `Missing button: ${label}`);
  await act(() => button.click());
};
const load = async (image) => act(() => image.dispatchEvent(new dom.window.Event('load')));

test('portfolio image loading', async (t) => {
  await t.test('every localized cover has smaller valid previews, without upscaling or losing alpha', async () => {
    const manifest = JSON.parse(await readFile(path.join(rootDirectory, 'lib/generated/thumbnails.json'), 'utf8'));
    const covers = [...new Set(['en', 'th'].flatMap((locale) => filterProjects('All', locale).map((p) => p.images?.[0])).filter(Boolean))];
    let originals = 0;
    let largestPreviews = 0;
    for (const source of covers) {
      assert.ok(manifest[source], `Missing cover: ${source}`);
      const originalPath = path.join(rootDirectory, 'public', source);
      const metadata = await sharp(originalPath).metadata();
      originals += (await stat(originalPath)).size;
      const widths = manifest[source].map((variant) => variant.width);
      assert.equal(new Set(widths).size, widths.length);
      for (const variant of manifest[source]) {
        const previewPath = path.join(rootDirectory, 'public', variant.src);
        const preview = await sharp(previewPath).metadata();
        assert.equal(preview.format, 'webp');
        assert.equal(preview.width, variant.width);
        assert.ok(preview.width <= (metadata.autoOrient?.width ?? metadata.width));
        // An entirely opaque alpha channel may be removed losslessly by WebP.
        if (metadata.hasAlpha && !(await sharp(originalPath).stats()).isOpaque) assert.ok(preview.hasAlpha);
      }
      largestPreviews += (await stat(path.join(rootDirectory, 'public', manifest[source].at(-1).src))).size;
    }
    assert.ok(largestPreviews / originals <= 0.15, 'Largest previews must save at least 85%');
  });

  await t.test('gallery prioritizes four covers and keeps all other thumbnails lazy with base paths', async () => {
    await render(h(Archive, { copy: copy.archive, projects: filterProjects('All'), onOpenProject: noop }));
    const images = [...container.querySelectorAll('img')];
    assert.equal(images.filter((img) => img.getAttribute('loading') === 'eager').length, 4);
    assert.equal(images.filter((img) => img.getAttribute('loading') === 'lazy').length, images.length - 4);
    for (const image of images) {
      assert.match(image.getAttribute('src'), /^\/portfolio\/assets\/thumbnails\/.+\.webp$/);
      assert.ok(image.getAttribute('srcset').split(', ').every((src) => src.startsWith('/portfolio/assets/thumbnails/')));
      assert.equal(image.getAttribute('decoding'), 'async');
      assert.ok(image.getAttribute('sizes').includes('620px'));
    }
    await render(h(SelectedWork, { copy: copy.selectedWork, projects: getFeaturedProjects(), onOpenProject: noop, onViewAll: noop }));
    assert.ok([...container.querySelectorAll('img')].every((img) => img.getAttribute('loading') === 'lazy'));
  });

  const project = getProjectById(1);
  const props = { copy: copy.caseStudy, navigation: copy.navigation, locale: 'en', project, onClose: noop, onAdjacent: noop, onChangeLocale: noop };
  await t.test('viewer loads only active original, then one next image without a preload cascade', async () => {
    await render(h(CaseStudy, props));
    assert.equal(container.querySelectorAll('img').length, 1);
    assert.equal(preloads.length, 0);
    assert.equal(container.querySelector('img').getAttribute('src'), `/portfolio${project.images[0]}`);
    await load(container.querySelector('img'));
    assert.equal(preloads.length, 1);
    assert.equal(preloads[0].url, `/portfolio${project.images[1]}`);
    await act(() => preloads[0].onload());
    assert.equal(preloads.length, 1, 'Completing lookahead must not preload the entire collection');
    assert.equal(container.querySelectorAll('img').length, 2);
    await click(copy.caseStudy.nextImageLabel);
    assert.equal(preloads.length, 2);
    assert.equal(preloads[1].url, `/portfolio${project.images[2]}`);
    await click(`${copy.caseStudy.showImagePrefix} 5`);
    assert.ok(container.querySelector(`img[src="/portfolio${project.images[4]}"]`));
    assert.equal(preloads.length, 2, 'Jump target must load before its next image');
    await load(container.querySelector(`img[src="/portfolio${project.images[4]}"]`));
    assert.equal(preloads.at(-1).url, `/portfolio${project.images[5]}`);
  });

  await t.test('zoom, fullscreen, keyboard navigation and swipe retain original image sources', async () => {
    await click(copy.caseStudy.zoomInLabel);
    assert.ok(container.textContent.includes('125%'));
    await click(copy.caseStudy.openViewerLabel);
    const viewer = container.querySelector('[role="dialog"]');
    assert.equal(viewer.querySelector('img').getAttribute('src'), `/portfolio${project.images[4]}`);
    await act(() => document.dispatchEvent(new dom.window.KeyboardEvent('keydown', { key: 'ArrowRight' })));
    assert.equal(viewer.querySelector('img').getAttribute('src'), `/portfolio${project.images[5]}`);
    await act(() => document.dispatchEvent(new dom.window.KeyboardEvent('keydown', { key: '+' })));
    assert.ok(viewer.textContent.includes('125%'));
    await act(() => document.dispatchEvent(new dom.window.KeyboardEvent('keydown', { key: '0' })));
    const viewport = viewer.querySelector('.zoomViewport');
    viewport.setPointerCapture = noop;
    viewport.hasPointerCapture = () => false;
    const pointer = async (type, x) => act(() => {
      const event = new dom.window.Event(type, { bubbles: true });
      Object.assign(event, { pointerId: 1, pointerType: 'touch', clientX: x, clientY: 100, button: 0 });
      viewport.dispatchEvent(event);
    });
    await pointer('pointerdown', 200);
    await pointer('pointermove', 100);
    await pointer('pointerup', 100);
    assert.equal(viewer.querySelector('img').getAttribute('src'), `/portfolio${project.images[6]}`);
    await act(() => document.dispatchEvent(new dom.window.KeyboardEvent('keydown', { key: 'Escape' })));
    assert.equal(container.querySelector('[role="dialog"]').getAttribute('aria-label'), project.title);
  });

  await t.test('failed image does not preload the rest and navigation can recover', async () => {
    await render(null);
    preloads.length = 0;
    await render(h(CaseStudy, props));
    await act(() => container.querySelector('img').dispatchEvent(new dom.window.Event('error')));
    assert.equal(preloads.length, 0);
    await click(copy.caseStudy.nextImageLabel);
    assert.equal(container.querySelector('img').getAttribute('src'), `/portfolio${project.images[1]}`);
    await load(container.querySelector('img'));
    assert.equal(preloads.length, 1);
  });
  await act(() => root.unmount());
  dom.window.close();
});
