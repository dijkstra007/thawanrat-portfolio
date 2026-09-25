'use client';

import Link from 'next/link';
import { createPortal } from 'react-dom';
import { caseStudyPageCopy } from '@/content/case-study';
import { homepageContact } from '@/content/homepage';
import ProjectThumbnail from '@/components/visuals/ProjectThumbnail';
import { localePath } from '@/lib/routes';
import { adjacentProject, projectImageAlt } from '@/lib/projects';

import { useCallback, useEffect, useRef, useState } from 'react';
import type {
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
  WheelEvent as ReactWheelEvent,
} from 'react';
import type { SiteCopy } from '@/content/site';
import { assetPath, galleryPath } from '@/lib/assets';
import { hasPreviousProject } from '@/lib/projects';
import type { Locale, Project } from '@/lib/types';
import NoBreakText from '@/components/typography/NoBreakText';
import styles from './CaseStudy.module.css';

const MIN_ZOOM = 1;
// On a phone, a 3,184px-wide artwork is usually fitted to roughly 390px.
// 800% brings that image close to its native pixel scale for reading details.
const MAX_ZOOM = 8;
const FINE_ZOOM_STEP = .25;
const DETAIL_ZOOM_THRESHOLD = 2;
const DETAIL_ZOOM_STEP = 1;
const SWIPE_THRESHOLD = 40;
const EMPTY_IMAGES: string[] = [];

type Point = {
  x: number;
  y: number;
};

type ZoomState = {
  scale: number;
  offset: Point;
};

type Gesture =
  | {
      kind: 'idle' | 'swipe' | 'pan';
      start: Point;
      startState: ZoomState;
      moved: boolean;
    }
  | {
      kind: 'pinch';
      startDistance: number;
      startCenter: Point;
      startState: ZoomState;
    };

type ZoomableImageProps = {
  onImageLoad?: () => void;
  src: string;
  alt: string;
  copy: SiteCopy['caseStudy'];
  className?: string;
  showControls?: boolean;
  showViewerButton?: boolean;
  enableKeyboardShortcuts?: boolean;
  onOpenViewer?: () => void;
  onSwipe?: (offset: number) => void;
};

const initialZoomState: ZoomState = {
  scale: MIN_ZOOM,
  offset: { x: 0, y: 0 },
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function clampZoom(value: number) {
  return clamp(value, MIN_ZOOM, MAX_ZOOM);
}

function getButtonZoomStep(scale: number, direction: 1 | -1) {
  const useDetailStep = (direction === 1 && scale >= DETAIL_ZOOM_THRESHOLD)
    || (direction === -1 && scale > DETAIL_ZOOM_THRESHOLD);
  return useDetailStep ? DETAIL_ZOOM_STEP : FINE_ZOOM_STEP;
}

function getDistance(first: Point, second: Point) {
  return Math.hypot(second.x - first.x, second.y - first.y);
}

function getCenter(first: Point, second: Point): Point {
  return {
    x: (first.x + second.x) / 2,
    y: (first.y + second.y) / 2,
  };
}

function getFittedImageSize(image: HTMLImageElement, viewport: HTMLElement) {
  const naturalWidth = image.naturalWidth;
  const naturalHeight = image.naturalHeight;
  const viewportWidth = viewport.clientWidth;
  const viewportHeight = viewport.clientHeight;

  if (!naturalWidth || !naturalHeight || !viewportWidth || !viewportHeight) {
    return { x: viewportWidth, y: viewportHeight };
  }

  const fit = Math.min(viewportWidth / naturalWidth, viewportHeight / naturalHeight, 1);
  return {
    x: naturalWidth * fit,
    y: naturalHeight * fit,
  };
}

function clampOffset(
  offset: Point,
  scale: number,
  imageSize: Point,
  viewport: Point,
): Point {
  const maxX = Math.max(0, (imageSize.x * scale - viewport.x) / 2);
  const maxY = Math.max(0, (imageSize.y * scale - viewport.y) / 2);

  return {
    x: clamp(offset.x, -maxX, maxX),
    y: clamp(offset.y, -maxY, maxY),
  };
}

function getZoomAtPoint(
  state: ZoomState,
  nextScale: number,
  point: Point,
): ZoomState {
  const ratio = nextScale / state.scale;
  return {
    scale: nextScale,
    offset: {
      x: point.x - (point.x - state.offset.x) * ratio,
      y: point.y - (point.y - state.offset.y) * ratio,
    },
  };
}

function ZoomableImage({
  onImageLoad,
  src,
  alt,
  copy,
  className,
  showControls = false,
  showViewerButton = false,
  enableKeyboardShortcuts = false,
  onOpenViewer,
  onSwipe,
}: ZoomableImageProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const pointersRef = useRef(new Map<number, Point>());
  const gestureRef = useRef<Gesture | null>(null);
  const [zoomState, setZoomState] = useState<ZoomState>(initialZoomState);
  const [imageSize, setImageSize] = useState<Point>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const measureImage = useCallback(() => {
    const image = imageRef.current;
    const viewport = viewportRef.current;
    if (!image || !viewport) return;
    const nextImageSize = getFittedImageSize(image, viewport);
    setImageSize(nextImageSize);
    setZoomState((state) => ({
      ...state,
      offset: clampOffset(
        state.offset,
        state.scale,
        nextImageSize,
        { x: viewport.clientWidth, y: viewport.clientHeight },
      ),
    }));
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const observer = new ResizeObserver(measureImage);
    observer.observe(viewport);

    return () => observer.disconnect();
  }, [measureImage]);

  useEffect(() => {
    if (!enableKeyboardShortcuts) return;

    const handleZoomShortcut = (event: KeyboardEvent) => {
      if (event.key === '0') {
        event.preventDefault();
        setZoomState(initialZoomState);
        return;
      }

      const direction = event.key === '+' || event.key === '='
        ? 1
        : event.key === '-' || event.key === '−'
          ? -1
          : 0;
      if (direction === 0) return;

      event.preventDefault();
      setZoomState((state) => {
        const nextScale = clampZoom(state.scale + direction * getButtonZoomStep(state.scale, direction));
        const nextState = getZoomAtPoint(state, nextScale, { x: 0, y: 0 });
        const viewport = viewportRef.current;
        return viewport
          ? {
              scale: nextState.scale,
              offset: clampOffset(
                nextState.offset,
                nextState.scale,
                imageSize,
                { x: viewport.clientWidth, y: viewport.clientHeight },
              ),
            }
          : nextState;
      });
    };

    document.addEventListener('keydown', handleZoomShortcut);
    return () => document.removeEventListener('keydown', handleZoomShortcut);
  }, [enableKeyboardShortcuts, imageSize]);

  const getViewportPoint = (clientX: number, clientY: number): Point => {
    const viewport = viewportRef.current;
    if (!viewport) return { x: 0, y: 0 };
    const rect = viewport.getBoundingClientRect();
    return {
      x: clientX - rect.left - rect.width / 2,
      y: clientY - rect.top - rect.height / 2,
    };
  };

  const setSafeZoomState = (nextState: ZoomState) => {
    const viewport = viewportRef.current;
    const safeState = {
      scale: clampZoom(nextState.scale),
      offset: nextState.offset,
    };
    if (viewport) {
      safeState.offset = clampOffset(
        safeState.offset,
        safeState.scale,
        imageSize,
        { x: viewport.clientWidth, y: viewport.clientHeight },
      );
    }
    setZoomState(safeState);
  };

  const updateZoom = (direction: 1 | -1) => {
    const nextScale = clampZoom(zoomState.scale + direction * getButtonZoomStep(zoomState.scale, direction));
    setSafeZoomState(getZoomAtPoint(zoomState, nextScale, { x: 0, y: 0 }));
  };

  const resetZoom = () => setZoomState(initialZoomState);

  const handleWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    if (!Number.isFinite(event.deltaY) || event.deltaY === 0) return;
    const nextScale = clampZoom(zoomState.scale * Math.pow(1.0015, -event.deltaY));
    if (nextScale === zoomState.scale) return;
    event.preventDefault();
    setSafeZoomState(getZoomAtPoint(zoomState, nextScale, getViewportPoint(event.clientX, event.clientY)));
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });

    const pointers = [...pointersRef.current.values()];
    if (pointers.length >= 2) {
      gestureRef.current = {
        kind: 'pinch',
        startDistance: getDistance(pointers[0], pointers[1]),
        startCenter: getCenter(pointers[0], pointers[1]),
        startState: zoomState,
      };
      setIsDragging(true);
      return;
    }

    gestureRef.current = {
      kind: zoomState.scale > MIN_ZOOM
        ? 'pan'
        : event.pointerType === 'mouse'
          ? 'idle'
          : 'swipe',
      start: { x: event.clientX, y: event.clientY },
      startState: zoomState,
      moved: false,
    };
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!pointersRef.current.has(event.pointerId)) return;
    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    const gesture = gestureRef.current;
    if (!gesture) return;

    const pointers = [...pointersRef.current.values()];
    if (gesture.kind === 'pinch' && pointers.length >= 2) {
      event.preventDefault();
      const nextScale = clampZoom(
        gesture.startState.scale * getDistance(pointers[0], pointers[1]) / Math.max(gesture.startDistance, 1),
      );
      const point = getViewportPoint(gesture.startCenter.x, gesture.startCenter.y);
      setSafeZoomState(getZoomAtPoint(gesture.startState, nextScale, point));
      return;
    }

    if (gesture.kind === 'pinch' || pointers.length !== 1 || gesture.kind === 'idle') return;
    const delta = {
      x: event.clientX - gesture.start.x,
      y: event.clientY - gesture.start.y,
    };
    if (Math.abs(delta.x) > 4 || Math.abs(delta.y) > 4) gesture.moved = true;

    if (gesture.kind === 'pan') {
      event.preventDefault();
      setIsDragging(true);
      setSafeZoomState({
        scale: gesture.startState.scale,
        offset: {
          x: gesture.startState.offset.x + delta.x,
          y: gesture.startState.offset.y + delta.y,
        },
      });
    }
  };

  const finishPointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    const gesture = gestureRef.current;
    const start = gesture && 'start' in gesture ? gesture.start : null;
    const pointer = pointersRef.current.get(event.pointerId);
    pointersRef.current.delete(event.pointerId);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (pointersRef.current.size >= 2) return;
    if (pointersRef.current.size === 1) {
      const remaining = [...pointersRef.current.values()][0];
      gestureRef.current = {
        kind: zoomState.scale > MIN_ZOOM ? 'pan' : 'idle',
        start: remaining,
        startState: zoomState,
        moved: false,
      };
      return;
    }

    gestureRef.current = null;
    setIsDragging(false);
    if (!gesture || !start || !pointer || gesture.kind !== 'swipe' || !onSwipe) return;

    const distance = pointer.x - start.x;
    if (Math.abs(distance) < SWIPE_THRESHOLD) return;
    onSwipe(distance < 0 ? 1 : -1);
  };

  const handlePointerCancel = (event: ReactPointerEvent<HTMLDivElement>) => {
    pointersRef.current.delete(event.pointerId);
    gestureRef.current = null;
    setIsDragging(false);
  };

  const handleControlPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <div
      ref={viewportRef}
      className={`${styles.zoomViewport}${className ? ` ${className}` : ''}${isDragging ? ` ${styles.zoomDragging}` : ''}`}
      style={{ touchAction: zoomState.scale > MIN_ZOOM ? 'none' : 'pan-y' }}
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={finishPointer}
      onPointerCancel={handlePointerCancel}
    >
      <div className={styles.zoomCanvas}>
        <img
          ref={imageRef}
          className={styles.zoomImage}
          src={assetPath(galleryPath(src))}
          alt={alt}
          draggable="false"
          loading={showControls ? 'eager' : 'lazy'}
          fetchPriority={showControls ? 'high' : 'auto'}
          decoding="async"
          onLoad={() => {
            measureImage();
            onImageLoad?.();
          }}
          style={{
            transform: `translate3d(${zoomState.offset.x}px, ${zoomState.offset.y}px, 0) scale(${zoomState.scale})`,
          }}
        />
      </div>

      {showControls ? (
        <div
          className={`${styles.zoomControls}${showViewerButton ? '' : ` ${styles.zoomControlsPersistent}`}`}
          role="group"
          aria-label={copy.zoomControlsLabel}
          onPointerDown={handleControlPointerDown}
        >
          <button
            className={styles.zoomControl}
            type="button"
            onClick={() => updateZoom(-1)}
            disabled={zoomState.scale <= MIN_ZOOM}
            aria-label={copy.zoomOutLabel}
          >
            <span aria-hidden="true">−</span>
          </button>
          <button
            className={`${styles.zoomControl} ${styles.zoomValue}`}
            type="button"
            onClick={resetZoom}
            aria-label={`${copy.resetZoomLabel} (${Math.round(zoomState.scale * 100)}%)`}
          >
            {Math.round(zoomState.scale * 100)}%
          </button>
          <button
            className={styles.zoomControl}
            type="button"
            onClick={() => updateZoom(1)}
            disabled={zoomState.scale >= MAX_ZOOM}
            aria-label={copy.zoomInLabel}
          >
            <span aria-hidden="true">+</span>
          </button>
          {showViewerButton ? (
            <button
              className={`${styles.zoomControl} ${styles.viewerTrigger}`}
              data-open-image-viewer
              type="button"
              onClick={onOpenViewer}
              aria-label={copy.openViewerLabel}
            >
              <span aria-hidden="true">⛶</span>
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

type CaseStudyProps = {
  copy: SiteCopy['caseStudy'];
  locale: Locale;
  project: Project;
  onClose: () => void;
  onAdjacent: (offset: number) => void;
};

function ProjectArtwork({ image, index, alt, label, hero = false, onOpen }: {
  image: string; index: number; alt: string; label: string; hero?: boolean;
  onOpen: (index: number) => void;
}) {
  return <button type="button" className={styles.artwork} data-open-image-viewer
    aria-label={label} onClick={() => onOpen(index)}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={assetPath(galleryPath(image))} alt={alt} loading={hero ? 'eager' : 'lazy'}
      fetchPriority={hero ? 'high' : undefined} decoding="async" />
    <span className={styles.expand} aria-hidden="true">↗</span>
  </button>;
}

export default function CaseStudy({
  copy,
  locale,
  project,
  onClose,
  onAdjacent,
}: CaseStudyProps) {
  const pageCopy = caseStudyPageCopy[locale];
  const nextProject = adjacentProject(project, 1, locale);
  const showBack = hasPreviousProject(project);
  const images = project.images ?? EMPTY_IMAGES;
  const [activeImage, setActiveImage] = useState<{ projectId: number; path: string } | null>(null);
  const [viewerOpen, setViewerOpen] = useState(false);
  const studyRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const viewerCloseRef = useRef<HTMLButtonElement>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);
  const activeImageIndex = activeImage?.projectId === project.id
    ? images.indexOf(activeImage.path)
    : -1;
  const imageIndex = activeImageIndex >= 0 ? activeImageIndex : 0;
  const currentImage = images[imageIndex] ?? null;
  useEffect(() => {
    if (!viewerOpen) return;
    const main = studyRef.current?.closest('main');
    const previousOverflow = document.body.style.overflow;
    const previousInert = main?.inert ?? false;
    document.body.style.overflow = 'hidden';
    if (main) main.inert = true;
    return () => {
      document.body.style.overflow = previousOverflow;
      if (main) main.inert = previousInert;
    };
  }, [viewerOpen]);

  useEffect(() => {
    if (viewerOpen) {
      window.requestAnimationFrame(() => viewerCloseRef.current?.focus());
      return;
    }

    const previousFocus = lastFocusedElement.current;
    if (!previousFocus) return;
    // Changing images remounts the original trigger while the viewer is open.
    const focusTarget = previousFocus.isConnected
      ? previousFocus
      : studyRef.current?.querySelector<HTMLButtonElement>('[data-open-image-viewer]');
    focusTarget?.focus();
    lastFocusedElement.current = null;
  }, [viewerOpen]);

  const selectImage = useCallback((nextIndex: number) => {
    if (!images[nextIndex]) return;
    setActiveImage({ projectId: project.id, path: images[nextIndex] });
  }, [images, project.id]);

  const moveImage = useCallback((offset: number) => {
    if (images.length < 2) return;
    const nextIndex = (imageIndex + offset + images.length) % images.length;
    selectImage(nextIndex);
  }, [imageIndex, images.length, selectImage]);

  const moveToAdjacentProject = (offset: number) => {
    setActiveImage(null);
    setViewerOpen(false);
    onAdjacent(offset);
  };

  const openViewer = (index: number) => {
    selectImage(index);
    lastFocusedElement.current = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    setViewerOpen(true);
  };

  const closeViewer = () => setViewerOpen(false);

  const handleViewerKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab') return;
    const focusable = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])'),
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  useEffect(() => {
    if (!viewerOpen) return;

    const handleViewerShortcut = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        closeViewer();
        return;
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        moveImage(-1);
        return;
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        moveImage(1);
      }
    };

    document.addEventListener('keydown', handleViewerShortcut);
    return () => document.removeEventListener('keydown', handleViewerShortcut);
  }, [moveImage, viewerOpen]);

  const imageAlt = (index: number) => projectImageAlt(project, locale, index);

  const renderViewer = () => {
    if (!viewerOpen || !currentImage) return null;

    return createPortal(
      <div
        ref={viewerRef}
        className={styles.viewer}
        data-image-viewer
        role="dialog"
        aria-modal="true"
        aria-label={project.title + ' — ' + copy.imageLabel + ' ' + (imageIndex + 1)}
        onKeyDown={handleViewerKeyDown}
      >
        <button
          className={styles.viewerBackdrop}
          type="button"
          tabIndex={-1}
          aria-label={copy.closeViewerLabel}
          onClick={closeViewer}
        />
        <div className={styles.viewerTopbar}>
          <span className={styles.viewerTitle}>{project.title}</span>
          <span className={styles.viewerCounter}>{imageIndex + 1} / {images.length}</span>
          <button
            ref={viewerCloseRef}
            className={styles.viewerClose}
            type="button"
            onClick={closeViewer}
            aria-label={copy.closeViewerLabel}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <div className={styles.viewerStage}>
          <ZoomableImage
            key={`${project.id}-${locale}-${imageIndex}-${currentImage}`}
            src={currentImage}
            alt={imageAlt(imageIndex)}
            copy={copy}
            className={styles.viewerImage}
            showControls
            enableKeyboardShortcuts
            onSwipe={moveImage}
          />
          {images.length > 1 ? (
            <>
              <button
                className={`${styles.viewerNav} ${styles.viewerPrevious}`}
                type="button"
                onClick={() => moveImage(-1)}
                aria-label={copy.previousImageLabel}
              >
                <span aria-hidden="true">‹</span>
              </button>
              <button
                className={`${styles.viewerNav} ${styles.viewerNext}`}
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
          <div className={styles.viewerDots} role="group" aria-label={copy.chooseImageLabel}>
            {images.map((image, index) => (
              <button
                key={`${image}-${index}`}
                className={`${styles.viewerDot}${index === imageIndex ? ` ${styles.viewerDotActive}` : ''}`}
                type="button"
                onClick={() => selectImage(index)}
                aria-label={copy.showImagePrefix + ' ' + (index + 1)}
                aria-current={index === imageIndex ? 'true' : undefined}
              />
            ))}
          </div>
        ) : null}
      </div>,
      document.body,
    );
  };


  return (
    <>
      <article className={styles.page} lang={locale} aria-labelledby="project-title">
        <div ref={studyRef} className={`shell ${styles.study}`}>
          <Link className={styles.backLink} href={localePath(locale, '/work')}
            onNavigate={(event) => { event.preventDefault(); onClose(); }}>
            <span aria-hidden="true">←</span> {pageCopy.allWork}
          </Link>
          <header className={styles.projectHeading}>
            <p className={styles.projectEyebrow}>{project.categoryLabel ?? copy.categoryLabels[project.category]}{project.year !== '—' ? ` / ${project.year}` : ''}</p>
            <h1 id="project-title"><NoBreakText text={project.title} /><span className={styles.asterisk} aria-hidden="true">*</span></h1>
            <p className={styles.subtitle}><NoBreakText text={project.meta} /></p>
          </header>

          {images[0] && <ProjectArtwork image={images[0]} index={0} alt={imageAlt(0)} label={`${copy.openViewerLabel} — ${copy.imageLabel} 1`} hero onOpen={openViewer} />}

          <section className={styles.overview} aria-labelledby="project-overview">
            <h2 id="project-overview">{pageCopy.behind[0]}<br />{pageCopy.behind[1]}<span>.</span></h2>
            <dl className={styles.facts}>
              <div><dt>{pageCopy.category}</dt><dd>{project.categoryLabel ?? copy.categoryLabels[project.category]}</dd></div>
              <div><dt>{pageCopy.scope}</dt><dd><NoBreakText text={project.meta} /></dd></div>
              {project.year !== '—' && <div><dt>{pageCopy.year}</dt><dd>{project.year}</dd></div>}
            </dl>
            <div className={styles.story}>
              <h3>{pageCopy.approach}</h3>
              <p><NoBreakText text={project.description} /></p>
            </div>
          </section>

          {images.length > 1 && <section aria-label={pageCopy.gallery}>
            <div className={styles.gallery}>
              {images.slice(1).map((image, index) => (
                <div key={image} className={index === 0 && (images.length - 1) % 2 === 1 ? styles.wideArtwork : undefined}>
                  {<ProjectArtwork image={image} index={index + 1} alt={imageAlt(index + 1)} label={`${copy.openViewerLabel} — ${copy.imageLabel} ${index + 2}`} onOpen={openViewer} />}
                </div>
              ))}
            </div>
            <p className={styles.galleryCaption}>{pageCopy.gallery}</p>
          </section>}

          <section className={styles.projectContact} aria-label={pageCopy.contact}>
            <h2>{pageCopy.contact}</h2>
            <a className={styles.contactLink} href={homepageContact.line} target="_blank" rel="noopener noreferrer">
              {pageCopy.line} <span aria-hidden="true">↗</span>
            </a>
          </section>

          <nav className={styles.projectNavigation} aria-label={pageCopy.next}>
            <Link className={styles.nextProject} href={localePath(locale, `/work/${nextProject.slug}`)}
              onNavigate={(event) => { event.preventDefault(); moveToAdjacentProject(1); }}>
              <div>
                <p className={styles.nextLabel}>{pageCopy.next}</p>
                <h2><NoBreakText text={nextProject.title} /> <span aria-hidden="true">↗</span></h2>
              </div>
              <ProjectThumbnail src={nextProject.images?.[0]} visual={nextProject.visual}
                alt={projectImageAlt(nextProject, locale)} className={styles.nextImage} />
            </Link>
            {showBack && <Link className={styles.previousProject} href={localePath(locale, `/work/${adjacentProject(project, -1, locale).slug}`)}
              onNavigate={(event) => { event.preventDefault(); moveToAdjacentProject(-1); }}>
              <span aria-hidden="true">←</span> {pageCopy.previous}
            </Link>}
          </nav>
        </div>
      </article>
      {renderViewer()}
    </>
  );
}
