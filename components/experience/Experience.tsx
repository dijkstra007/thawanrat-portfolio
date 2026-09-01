import type { SiteCopy } from '@/content/site';
import type { Experience as ExperienceItem } from '@/lib/types';
import styles from './Experience.module.css';

type ExperienceProps = {
  copy: SiteCopy['experience'];
  items: ExperienceItem[];
};

export default function Experience({ copy, items }: ExperienceProps) {

  return (
    <section className={`shell ${styles.section}`} id="experience">
      <div className={styles.split}>
        <div>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2>{copy.heading[0]}<br />{copy.heading[1]}</h2>
        </div>
        <div className={styles.timeline}>
          {items.map((item) => (
            <article className={styles.item} key={`${item.company}-${item.year}`}>
              <span className={styles.dot} />
              <div>
                <h3>{item.role}</h3>
                <p>{item.company}</p>
                <small>{item.detail}</small>
              </div>
              <time>{item.year}</time>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
