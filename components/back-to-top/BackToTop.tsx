'use client';

import { useSyncExternalStore } from 'react';
import styles from './BackToTop.module.css';

type BackToTopProps = {
  label: string;
  onActivate?: () => void;
};

function subscribeToScroll(onScroll: () => void) {
  window.addEventListener('scroll', onScroll, { passive: true });
  return () => window.removeEventListener('scroll', onScroll);
}

function isPastTop() {
  return window.scrollY > 400;
}

function getServerSnapshot() {
  return false;
}

export default function BackToTop({ label, onActivate }: BackToTopProps) {
  const visible = useSyncExternalStore(subscribeToScroll, isPastTop, getServerSnapshot);

  if (!visible) return null;

  return (
    <button
      className={styles.button}
      type="button"
      aria-label={label}
      title={label}
      onClick={() => {
        onActivate?.();
        window.scrollTo({ top: 0, behavior: 'auto' });
      }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
        <path d="M12 19V5m-6 6 6-6 6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
