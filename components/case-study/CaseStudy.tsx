'use client';

import { useRef, useState } from 'react';
import type { TouchEvent } from 'react';
import { visualClass } from '@/components/visuals/visuals';
import type { SiteCopy } from '@/content/site';
import { assetPath } from '@/lib/assets';
import { hasPreviousProject } from '@/lib/projects';
import type { Project } from '@/lib/types';
import styles from './CaseStudy.module.css';

type CaseStudyProps = {
  copy: SiteCopy['caseStudy'];
  project: Project;
  onClose: () => void;
  onAdjacent: (offset: number) => void;
};

export default function CaseStudy({ copy, project, onClose, onAdjacent }: CaseStudyProps) {
  const showBack = hasPreviousProject(project);
  const images = project.images ?? [];
  const [imageIndex, setImageIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const moveImage = (offset: number) => {
    if (images.length < 2) return;
    setImageIndex((current) => (current + offset + images.length) % images.length);
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const startX = touchStartX.current;
    touchStartX.current = null;
    if (startX === null || images.length < 2) return;

    const endX = event.changedTouches[0]?.clientX;
    if (typeof endX !== 'number') return;

    const distance = endX - startX;
    if (Math.abs(distance) < 40) return;
    moveImage(distance < 0 ? 1 : -1);
  };

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label={project.title}>
      <div className={styles.study}>
        <button className={styles.close} type="button" onClick={onClose} aria-label={copy.closeLabel}>
          <span aria-hidden="true">×</span>
        </button>
        <div className={styles.heading}>
          <p className="eyebrow">{copy.categoryLabels[project.category]}</p>
          <h2>{project.title}</h2>
        </div>
        <div className={styles.content}>
          <div className={styles.media}>
            <div
              className={`${styles.hero} ${visualClass(project.visual)}`}
              onTouchStart={images.length > 1 ? handleTouchStart : undefined}
              onTouchEnd={images.length > 1 ? handleTouchEnd : undefined}
            >
              {images.length > 0 ? (
                <div
                  className={styles.slides}
                  style={{ transform: `translate3d(-${imageIndex * 100}%, 0, 0)` }}
                >
                  {images.map((image, index) => (
                    <img
                      key={`${image}-${index}`}
                      className={styles.slide}
                      src={assetPath(image)}
                      alt={project.title + ' — ' + copy.imageLabel + ' ' + (index + 1)}
                      draggable="false"
                    />
                  ))}
                </div>
              ) : project.visual === 'fruit' ? <span className={styles.photo} /> : null}

              {images.length > 1 ? (
                <>
                  <button
                    className={`${styles.imageButton} ${styles.previous}`}
                    type="button"
                    onClick={() => moveImage(-1)}
                    aria-label={copy.previousImageLabel}
                  >
                    <span aria-hidden="true">‹</span>
                  </button>
                  <button
                    className={`${styles.imageButton} ${styles.next}`}
                    type="button"
                    onClick={() => moveImage(1)}
                    aria-label={copy.nextImageLabel}
                  >
                    <span aria-hidden="true">›</span>
                  </button>
                </>
              ) : null}
            </div>

            {images.length > 1 ? (
              <div className={styles.dots} role="group" aria-label={copy.chooseImageLabel}>
                {images.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    className={`${styles.dot}${index === imageIndex ? ` ${styles.dotActive}` : ''}`}
                    type="button"
                    onClick={() => setImageIndex(index)}
                    aria-label={copy.showImagePrefix + ' ' + (index + 1)}
                    aria-current={index === imageIndex ? 'true' : undefined}
                  />
                ))}
              </div>
            ) : null}
          </div>
          <div className={styles.details}>
            <p>{project.description}</p>
            <div className={`${styles.pager}${showBack ? '' : ` ${styles.single}`}`}>
              {showBack ? (
                <button type="button" onClick={() => onAdjacent(-1)}>
                  <span aria-hidden="true">‹‹</span> {copy.backLabel}
                </button>
              ) : null}
              <button type="button" onClick={() => onAdjacent(1)}>
                {copy.nextLabel} <span aria-hidden="true">››</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
