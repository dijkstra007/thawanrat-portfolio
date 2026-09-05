import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import ts from 'typescript';

const root = fileURLToPath(new URL('../', import.meta.url));
const source = await readFile(path.join(root, 'content/projects.ts'), 'utf8');
// Evaluate the data module, not a text pattern, so localized covers stay in sync.
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
});
const { projects } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
const covers = [...new Set(projects.flatMap((project) => [
  project.images?.[0],
  ...Object.values(project.localizedImages ?? {}).map((images) => images[0]),
]).filter(Boolean))].sort();
const outputDirectory = path.join(root, 'public/assets/thumbnails');
await mkdir(outputDirectory, { recursive: true });
const manifest = {};
let originalBytes = 0;
const totals = { 320: 0, 640: 0, 1040: 0 };

for (const cover of covers) {
  const input = await readFile(path.join(root, 'public', cover));
  originalBytes += input.length;
  const hash = createHash('sha256').update(input).update('webp-q85-v1').digest('hex').slice(0, 16);
  const metadata = await sharp(input).rotate().metadata();
  const sourceWidth = metadata.autoOrient?.width ?? metadata.width;
  const variants = [];
  for (const requestedWidth of [320, 640, 1040]) {
    const width = Math.min(requestedWidth, sourceWidth);
    const filename = `${hash}-${width}.webp`;
    const output = path.join(outputDirectory, filename);
    let bytes;
    try {
      bytes = (await stat(output)).size;
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
      const result = await sharp(input).rotate()
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 85 }).toFile(output);
      bytes = result.size;
    }
    totals[requestedWidth] += bytes;
    if (!variants.some((variant) => variant.width === width)) {
      variants.push({ src: `/assets/thumbnails/${filename}`, width });
    }
  }
  manifest[cover] = variants;
}

await mkdir(path.join(root, 'lib/generated'), { recursive: true });
const manifestPath = path.join(root, 'lib/generated/thumbnails.json');
const json = `${JSON.stringify(manifest, null, 2)}\n`;
const previous = await readFile(manifestPath, 'utf8').catch(() => '');
if (previous !== json) await writeFile(manifestPath, json);
console.log(`Generated previews for ${covers.length} covers (${(originalBytes / 1e6).toFixed(2)} MB originals).`);
for (const [width, bytes] of Object.entries(totals)) {
  console.log(`${width}px: ${(bytes / 1e6).toFixed(2)} MB; ${(100 * (1 - bytes / originalBytes)).toFixed(1)}% smaller.`);
}
