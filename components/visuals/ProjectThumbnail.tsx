import { assetPath } from '@/lib/assets';
import type { ProjectVisual } from '@/lib/types';
import thumbnailManifest from '@/lib/generated/thumbnails.json';
import { visualClass } from './visuals';
import styles from './ProjectThumbnail.module.css';

const thumbnails: Record<string, { src: string; width: number }[]> = thumbnailManifest;
// Match the shell widths, column counts, and gaps used by both galleries.
const sizes = '(max-width: 552px) calc(100vw - 32px), (max-width: 620px) 520px, (max-width: 800px) calc((100vw - 54px) / 2), (max-width: 900px) 373px, (max-width: 1260px) calc((100vw - 128px) / 4), 283px';

type ProjectThumbnailProps = {
  src?: string;
  visual: ProjectVisual;
  className: string;
  eager?: boolean;
};

export default function ProjectThumbnail({ src, visual, className, eager = false }: ProjectThumbnailProps) {
  const variants = src ? thumbnails[src] : undefined;
  const defaultSource = variants?.find((variant) => variant.width >= 640) ?? variants?.at(-1);

  return (
    <span className={`${className}${src ? '' : ` ${visualClass(visual)}`}`} aria-hidden="true">
      {src && (
        // Static responsive assets work on both Sites and GitHub Pages.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className={styles.image}
          src={assetPath(defaultSource?.src ?? src)}
          srcSet={variants?.map((variant) => `${assetPath(variant.src)} ${variant.width}w`).join(', ')}
          sizes={sizes}
          alt=""
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
        />
      )}
    </span>
  );
}
