import { experience } from '@/content/experience';
import { site } from '@/content/site';
import styles from './Experience.module.css';

export default function Experience() {
  const copy = site.experience;

  return (
    <section className={`shell ${styles.section}`} id="experience">
      <div className={styles.split}>
        <div>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2>{copy.heading[0]}<br />{copy.heading[1]}</h2>
        </div>
        <div className={styles.timeline}>
          {experience.map((item) => (
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
