'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type {
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
  WheelEvent as ReactWheelEvent,
} from 'react';
import { visualClass } from '@/components/visuals/visuals';
import type { SiteCopy } from '@/content/site';
import { assetPath } from '@/lib/assets';
import { hasPreviousProject } from '@/lib/projects';
import type { Locale, Project } from '@/lib/types';
import NoBreakText from '@/components/typography/NoBreakText';
import styles from './CaseStudy.module.css';

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = .25;
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
        const nextScale = clampZoom(state.scale + direction * ZOOM_STEP);
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
    const nextScale = clampZoom(zoomState.scale + direction * ZOOM_STEP);
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
    if (!gesture || !start || !pointer || gesture.kind !== 'swipe' || gesture.moved || !onSwipe) return;

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
          src={assetPath(src)}
          alt={alt}
          draggable="false"
          onLoad={measureImage}
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
  navigation: SiteCopy['navigation'];
  locale: Locale;
  project: Project;
  onClose: () => void;
  onAdjacent: (offset: number) => void;
  onChangeLocale: (locale: Locale) => void;
};

export default function CaseStudy({
  copy,
  navigation,
  locale,
  project,
  onClose,
  onAdjacent,
  onChangeLocale,
}: CaseStudyProps) {
  const showBack = hasPreviousProject(project);
  const images = project.images ?? EMPTY_IMAGES;
  const [activeImage, setActiveImage] = useState<{ projectId: number; path: string } | null>(null);
  const [viewerOpen, setViewerOpen] = useState(false);
  const viewerRef = useRef<HTMLDivElement>(null);
  const viewerCloseRef = useRef<HTMLButtonElement>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);
  const activeImageIndex = activeImage?.projectId === project.id
    ? images.indexOf(activeImage.path)
    : -1;
  const imageIndex = activeImageIndex >= 0 ? activeImageIndex : 0;
  const currentImage = images[imageIndex] ?? null;

  useEffect(() => {
    if (viewerOpen) {
      window.requestAnimationFrame(() => viewerCloseRef.current?.focus());
      return;
    }

    lastFocusedElement.current?.focus();
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

  const openViewer = () => {
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

  const imageAlt = (index: number) => project.title + ' — ' + copy.imageLabel + ' ' + (index + 1);

  const renderViewer = () => {
    if (!viewerOpen || !currentImage) return null;

    return (
      <div
        ref={viewerRef}
        className={styles.viewer}
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
      </div>
    );
  };

  return (
    <div
      className={styles.overlay}
      role={viewerOpen ? undefined : 'dialog'}
      aria-modal={viewerOpen ? undefined : true}
      aria-label={viewerOpen ? undefined : project.title}
    >
      <div className={styles.study} aria-hidden={viewerOpen}>
        <div className={styles.topActions}>
          <div className={styles.language} role="group" aria-label={navigation.languageLabel}>
            <button
              className={`${styles.languageOption}${locale === 'en' ? ` ${styles.languageActive}` : ''}`}
              type="button"
              aria-label={navigation.switchToEnglish}
              aria-pressed={locale === 'en'}
              onClick={() => onChangeLocale('en')}
            >
              EN
            </button>
            <span className={styles.languageDivider} aria-hidden="true">/</span>
            <button
              className={`${styles.languageOption}${locale === 'th' ? ` ${styles.languageActive}` : ''}`}
              type="button"
              aria-label={navigation.switchToThai}
              aria-pressed={locale === 'th'}
              onClick={() => onChangeLocale('th')}
            >
              TH
            </button>
          </div>
          <button className={styles.close} type="button" onClick={onClose} aria-label={copy.closeLabel}>
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className={styles.heading}>
          <p className="eyebrow">{project.categoryLabel ?? copy.categoryLabels[project.category]}</p>
          <h2><NoBreakText text={project.title} /></h2>
        </div>
        <div className={styles.content}>
          <div className={styles.media}>
            <div
              className={`${styles.hero} ${visualClass(project.visual)}`}
            >
              {images.length > 0 ? (
                <div
                  key={project.id}
                  className={styles.slides}
                  style={{ transform: `translate3d(-${imageIndex * 100}%, 0, 0)` }}
                >
                  {images.map((image, index) => (
                    <div
                      key={`${project.id}-${locale}-${imageIndex}-${image}-${index}`}
                      className={styles.slide}
                    >
                      <ZoomableImage
                        key={`${project.id}-${locale}-${imageIndex}-${image}-${index}`}
                        src={image}
                        alt={imageAlt(index)}
                        copy={copy}
                        showControls={index === imageIndex}
                        showViewerButton={index === imageIndex}
                        onOpenViewer={openViewer}
                        onSwipe={index === imageIndex ? moveImage : undefined}
                      />
                    </div>
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
                    onClick={() => selectImage(index)}
                    aria-label={copy.showImagePrefix + ' ' + (index + 1)}
                    aria-current={index === imageIndex ? 'true' : undefined}
                  />
                ))}
              </div>
            ) : null}
          </div>
          <div className={styles.details}>
            <p><NoBreakText text={project.description} /></p>
            <div className={`${styles.pager}${showBack ? '' : ` ${styles.single}`}`}>
              {showBack ? (
                <button type="button" onClick={() => moveToAdjacentProject(-1)}>
                  <span aria-hidden="true">‹‹</span> {copy.backLabel}
                </button>
              ) : null}
            <button type="button" onClick={() => moveToAdjacentProject(1)}>
                {copy.nextLabel} <span aria-hidden="true">››</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {renderViewer()}
    </div>
  );
}
