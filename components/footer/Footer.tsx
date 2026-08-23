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
          <a href={`mailto:${copy.email}`}>{copy.email}</a>
          <a href={`tel:${copy.phoneHref}`}>{copy.phoneDisplay}</a>
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
