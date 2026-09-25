'use client';

import { useSyncExternalStore } from 'react';
import styles from './BackToTop.module.css';

type BackToTopProps = {
  label: string;
  onActivate?: () => void;
};

function subscribeToPosition(onChange: () => void) {
  window.addEventListener('scroll', onChange, { passive: true });
  window.addEventListener('resize', onChange);
  const observer = new ResizeObserver(onChange);
  observer.observe(document.body);
  const footer = document.querySelector('footer');
  if (footer) observer.observe(footer);
  return () => {
    window.removeEventListener('scroll', onChange);
    window.removeEventListener('resize', onChange);
    observer.disconnect();
  };
}

function getFooterOverlap() {
  if (window.scrollY <= 400) return -1;
  const footer = document.querySelector('footer');
  return footer ? Math.max(0, window.innerHeight - footer.getBoundingClientRect().top) : 0;
}

function getServerSnapshot() {
  return -1;
}

export default function BackToTop({ label, onActivate }: BackToTopProps) {
  const footerOverlap = useSyncExternalStore(subscribeToPosition, getFooterOverlap, getServerSnapshot);

  if (footerOverlap < 0) return null;

  return (
    <button
      className={styles.button}
      style={{ bottom: `calc(max(18px, env(safe-area-inset-bottom)) + ${footerOverlap}px)` }}
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
