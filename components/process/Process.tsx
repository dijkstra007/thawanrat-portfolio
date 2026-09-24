import { homepageCopy } from '@/content/homepage';
import type { Locale } from '@/lib/types';
import styles from './Process.module.css';

export default function Process({ locale }: { locale: Locale }) {
  const copy = homepageCopy[locale].process;
  return (
    <section className={`shell ${styles.section}`} id="process" aria-labelledby="process-title">
      <p className="eyebrow">{copy.label}</p>
      <h2 id="process-title">{copy.title[0]}{' '}<br />{copy.title[1]}</h2>
      <div className={styles.steps}>
        {copy.steps.map((step) => (
          <article className={styles.step} key={step.title}>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
