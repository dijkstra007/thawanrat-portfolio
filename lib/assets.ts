export function getAssetBase() {
  return process.env.NEXT_PUBLIC_BASE_PATH ?? '';
}

export function assetPath(path: string) {
  const base = getAssetBase();
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`;
}
