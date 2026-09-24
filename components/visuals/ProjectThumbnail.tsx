import { assetPath } from '@/lib/assets';
import type { ProjectVisual } from '@/lib/types';
import thumbnailManifest from '@/lib/generated/thumbnails.json';
import { visualClass } from './visuals';
import styles from './ProjectThumbnail.module.css';

const thumbnails: Record<string, { src: string; width: number }[]> = thumbnailManifest;
const fullBleedCovers = new Set([
  '/assets/projects/protech-brochure/00-cover.jpg',
  '/assets/projects/protech-machinery-brochure/00-cover.jpg',
]);
// Match the shell widths, column counts, and gaps used by both galleries.
const sizes = '(max-width: 560px) calc(100vw - 36px), (max-width: 760px) calc((100vw - 61px) / 2), (max-width: 1228px) calc((100vw - 112px) / 2), 558px';

type ProjectThumbnailProps = {
  src?: string;
  alt: string;
  visual: ProjectVisual;
  className: string;
  eager?: boolean;
};

export default function ProjectThumbnail({ src, alt, visual, className, eager = false }: ProjectThumbnailProps) {
  const variants = src ? thumbnails[src] : undefined;
  const defaultSource = variants?.find((variant) => variant.width >= 640) ?? variants?.at(-1);

  return (
    <span className={`${className}${src ? '' : ` ${visualClass(visual)}`}`}>
      {src && (
        // Static responsive assets work on both Sites and GitHub Pages.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className={`${styles.image}${fullBleedCovers.has(src) ? ` ${styles.fullBleed}` : ''}`}
          src={assetPath(defaultSource?.src ?? src)}
          srcSet={variants?.map((variant) => `${assetPath(variant.src)} ${variant.width}w`).join(', ')}
          sizes={sizes}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
        />
      )}
    </span>
  );
}
