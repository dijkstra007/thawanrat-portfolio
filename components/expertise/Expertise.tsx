import { expertise } from '@/content/expertise';
import { designTools, productivityTools } from '@/content/skills';
import { site } from '@/content/site';
import styles from './Expertise.module.css';

export default function Expertise() {
  const copy = site.expertise;

  return (
    <section className={styles.section} id="skills">
      <div className="shell">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h2>{copy.heading}</h2>
        <div className={styles.grid}>
          {expertise.map(([title, ...items]) => (
            <article key={title}>
              <h3>{title}</h3>
              <ul>
                {items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>

        <div className={styles.skills}>
          <p className="eyebrow">{copy.skillsEyebrow}</p>
          <h2>{copy.skillsHeading}</h2>
          <div className={styles.columns}>
            <div>
              <h3>{copy.designTitle}</h3>
              <div className={styles.chips}>
                {designTools.map((tool) => (
                  <span key={tool}>{tool}</span>
                ))}
              </div>
            </div>
            <div>
              <h3>{copy.productivityTitle}</h3>
              <div className={styles.chips}>
                {productivityTools.map((tool) => (
                  <span key={tool}>{tool}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
