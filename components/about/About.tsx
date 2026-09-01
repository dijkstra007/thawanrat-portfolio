import { site } from '@/content/site';
import type { SiteCopy } from '@/content/site';
import { assetPath } from '@/lib/assets';
import styles from './About.module.css';

type AboutProps = {
  copy: SiteCopy['about'];
};

export default function About({ copy }: AboutProps) {

  return (
    <section className={styles.section} id="about">
      <div className={`shell ${styles.layout}`}>
        <div className={styles.photo}>
          <img
            src={assetPath(site.assets.aboutImage)}
            alt={copy.imageAlt}
            width={3024}
            height={3024}
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className={styles.copy}>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2>{copy.heading[0]}<br />{copy.heading[1]}</h2>
          <p>{copy.body}</p>
          <div className={styles.stats}>
            <p><strong>{copy.yearsValue}</strong><span>{copy.yearsLabel}</span></p>
            <p><strong>{copy.aiValue}</strong><span>{copy.aiLabel}</span></p>
          </div>
        </div>
      </div>
    </section>
  );
}
