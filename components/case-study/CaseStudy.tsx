import Footer from '@/components/footer/Footer';
import { visualClass } from '@/components/visuals/visuals';
import { site } from '@/content/site';
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
        <button className={styles.close} type="button" onClick={onClose} aria-label="Close case study">
          <span aria-hidden="true">×</span>
        </button>
        <div className={styles.heading}>
          <p className="eyebrow">{site.caseStudy.eyebrow}</p>
          <h2>{project.title}</h2>
        </div>
        <div className={styles.content}>
          <div className={`${styles.hero} ${visualClass(project.visual)}`}>
            {project.visual === 'fruit' ? <span className={styles.photo} /> : null}
          </div>
          <div className={styles.details}>
            <p>{project.description}</p>
            <div className={styles.pager}>
              <button type="button" onClick={() => onAdjacent(1)}>
                Next <span aria-hidden="true">››</span>
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
