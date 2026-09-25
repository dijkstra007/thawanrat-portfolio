import { homepageCopy } from '@/content/homepage';
import { assetPath } from '@/lib/assets';
import type { Locale } from '@/lib/types';
import styles from './Hero.module.css';

export default function Hero({ locale }: { locale: Locale }) {
  const { hero, disciplines } = homepageCopy[locale];
  return (
    <>
      <section className={styles.hero} id="top" aria-labelledby="hero-title">
        <div className={`shell ${styles.copy}`}>
          <p className={styles.eyebrow}>{hero.label}</p>
          <h1 className={styles.title} id="hero-title">{hero.title[0]}{' '}<br />{hero.title[1]}<span>.</span></h1>
          <p className={styles.intro}>{hero.intro[0]}{' '}<br />{hero.intro[1]}</p>
          <div className={styles.actions}>
            <a className={`button ${styles.work}`} href="#work">{hero.work}</a>
            <a className={`button ${styles.contact}`} href="#contact">{hero.contact}</a>
          </div>
        </div>
        <figure className={styles.art}>
          <img className={styles.scene} src={assetPath('/images/fahworks-hero-still-life-v3.webp')} alt={hero.alt} width={1536} height={1024} fetchPriority="high" loading="eager" draggable={false} />
          <figcaption>{hero.caption}</figcaption>
        </figure>
      </section>
      <div className={`shell ${styles.disciplines}`}>{disciplines.map((discipline) => <span key={discipline}>{discipline}</span>)}</div>
    </>
  );
}
