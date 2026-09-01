import type { SiteCopy } from '@/content/site';
import styles from './Education.module.css';

type EducationProps = {
  copy: SiteCopy['education'];
};

export default function Education({ copy }: EducationProps) {

  return (
    <section className={styles.section}>
      <div className={`shell ${styles.split}`}>
        <div>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2>{copy.heading[0]}<br />{copy.heading[1]}</h2>
        </div>
        <div className={styles.details}>
          <article>
            <h3>{copy.degree}</h3>
            <p>{copy.program}</p>
            <small>{copy.school}</small>
            <time>{copy.years}</time>
          </article>
          <article>
            <h3>{copy.languagesTitle}</h3>
            <p>{copy.languages}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
