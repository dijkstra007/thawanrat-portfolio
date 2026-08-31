import { site } from '@/content/site';
import styles from './Footer.module.css';

export default function Footer() {
  const copy = site.footer;

  return (
    <footer className={styles.footer} id="contact">
      <div className={`shell ${styles.grid}`}>
        <div>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2>{copy.heading[0]}<br />{copy.heading[1]}</h2>
          <p className={styles.note}>{copy.note[0]}<br />{copy.note[1]}</p>
        </div>
        <div className={styles.links}>
          <a href={`mailto:${copy.email}`}>
            <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
            {copy.email}
          </a>
          <a href={`tel:${copy.phoneHref}`}>
            <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
              <rect x="7" y="2" width="10" height="20" rx="2" />
              <path d="M11 18h2" />
            </svg>
            {copy.phoneDisplay}
          </a>
          <div>
            <a href={copy.fastwork} target="_blank" rel="noreferrer">Fastwork</a>
            <span> · </span>
            <a href={copy.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
