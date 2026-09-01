import { site } from '@/content/site';
import { assetPath } from '@/lib/assets';
import styles from './Hero.module.css';

export default function Hero() {
  const { hero } = site;

  return (
    <section className={styles.hero} id="top">
      <div className={styles.stage}>
        <div className={styles.image} aria-hidden="true" />
        <div className={`shell ${styles.copyShell}`}>
          <div className={styles.copy}>
            <h1 className={styles.title}>
              {hero.name}
              <span className={styles.fahMark} aria-hidden="true" />
            </h1>
            <p className={styles.role}>{hero.role}</p>
            <p className={styles.specialty}>{hero.specialty}</p>
            <p className={styles.intro}>{hero.intro}</p>
            <div className={styles.actions}>
              <a className="button primary" href="#work">{hero.workCta}</a>
              <a
                className="button text-button"
                href={hero.resumeHref}
                target="_blank"
                rel="noreferrer"
              >
                {hero.resumeCta}
                <svg className={styles.downloadIcon} viewBox="0 0 16 14" aria-hidden="true">
                  <path
                    d="M8 1v8M4.5 6.5 8 10l3.5-3.5M2 13h12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <aside className={styles.award} aria-label={hero.awardAria}>
          <img
            className={styles.awardIcon}
            src={assetPath(site.assets.thaiStarMark)}
            alt=""
            width={120}
            height={90}
            decoding="async"
          />
          <p>
            <strong>{hero.awardTitle}</strong><br />
            {hero.awardName}<br />
            <small>{hero.awardDetail}</small>
          </p>
        </aside>
      </div>
    </section>
  );
}
