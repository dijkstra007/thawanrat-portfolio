import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import ts from 'typescript';

const rootDirectory = fileURLToPath(new URL('../', import.meta.url));

export function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith('@/') || (specifier.startsWith('.') && /\.[jt]sx?$/.test(context.parentURL ?? ''))) {
    const base = specifier.startsWith('@/')
      ? pathToFileURL(path.join(rootDirectory, specifier.slice(2))).href
      : new URL(specifier, context.parentURL).href;
    for (const suffix of ['', '.ts', '.tsx', '.json']) {
      if (existsSync(fileURLToPath(base + suffix))) return { url: base + suffix, shortCircuit: true };
    }
  }
  return nextResolve(specifier, context);
}

export function load(url, context, nextLoad) {
  if (url.endsWith('.module.css')) {
    return { format: 'module', source: 'export default new Proxy({}, {get: (_, key) => key});', shortCircuit: true };
  }
  if (url.includes('/lib/generated/') && url.endsWith('.json')) {
    return { format: 'module', source: `export default ${readFileSync(new URL(url), 'utf8')};`, shortCircuit: true };
  }
  if (/\.tsx?$/.test(url) && !url.includes('/node_modules/')) {
    const { outputText } = ts.transpileModule(readFileSync(new URL(url), 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
    });
    return { format: 'module', source: outputText, shortCircuit: true };
  }
  return nextLoad(url, context);
}
