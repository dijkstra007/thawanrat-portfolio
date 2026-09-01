import Footer from '@/components/footer/Footer';
import { visualClass } from '@/components/visuals/visuals';
import { site } from '@/content/site';
import { assetPath } from '@/lib/assets';
import type { Project } from '@/lib/types';
import styles from './CaseStudy.module.css';

type CaseStudyProps = {
  project: Project;
  onClose: () => void;
  onAdjacent: (offset: number) => void;
};

export default function CaseStudy({ project, onClose, onAdjacent }: CaseStudyProps) {
  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label={project.title}>
      <div className={styles.study}>
        <header className={styles.bar}>
          <div className={`shell ${styles.inner}`}>
            <a className={styles.wordmark} href="#top" onClick={onClose}>
              <img
                className={styles.logo}
                src={assetPath(site.assets.logo)}
                alt=""
                width={140}
                height={26}
                decoding="async"
              />
            </a>
            <nav className={styles.nav} aria-label="Case study navigation">
              <button className={`${styles.link} ${styles.active}`} type="button" onClick={onClose}>
                Work
              </button>
              <a className={styles.link} href="#contact" onClick={onClose}>Contact</a>
            </nav>
          </div>
        </header>
        <div className={`shell ${styles.heading}`}>
          <p className="eyebrow">{site.caseStudy.eyebrow}</p>
          <h2>{project.title}</h2>
        </div>
        <div className={`${styles.hero} ${visualClass(project.visual)}`}>
          {project.visual === 'fruit' ? <span className={styles.photo} /> : null}
        </div>
        <div className={`shell ${styles.description}`}>
          <p>{project.description}</p>
          <div className={styles.pager}>
            <button type="button" onClick={() => onAdjacent(-1)}>
              <span aria-hidden="true">‹‹</span> Back
            </button>
            <button type="button" onClick={() => onAdjacent(1)}>
              Next <span aria-hidden="true">››</span>
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
