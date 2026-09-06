import galleryManifest from '@/lib/generated/gallery.json';

const galleryImages: Record<string, string> = galleryManifest;

export function getAssetBase() {
  return process.env.NEXT_PUBLIC_BASE_PATH ?? '';
}

export function assetPath(path: string) {
  const base = getAssetBase();
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`;
}

export function galleryPath(path: string) {
  return galleryImages[path] ?? path;
}
