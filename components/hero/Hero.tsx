import { site } from '@/content/site';
import type { Project } from '@/lib/types';
import type { ReactNode } from 'react';
import styles from './Hero.module.css';

type HeroProps = {
  header: ReactNode;
  onOpenHeroProject: (project: Project) => void;
  heroProject: Project;
};

export default function Hero({ header, onOpenHeroProject, heroProject }: HeroProps) {
  const { hero } = site;

  return (
    <section className={styles.hero} id="top">
      <div className={styles.stage}>
        <button
          className={styles.image}
          type="button"
          aria-label={hero.imageAria}
          onClick={() => onOpenHeroProject(heroProject)}
        />
        {header}
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
              <a className="button text-button" href="#contact">
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
          <span className={styles.awardIcon}>◇</span>
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
