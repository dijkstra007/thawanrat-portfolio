import { visualClass } from '@/components/visuals/visuals';
import type { SiteCopy } from '@/content/site';
import type { Project } from '@/lib/types';
import styles from './Archive.module.css';

type ArchiveProps = {
  copy: SiteCopy['archive'];
  projects: Project[];
  onOpenProject: (project: Project) => void;
};

export default function Archive({ copy, projects, onOpenProject }: ArchiveProps) {

  return (
    <section className={`shell ${styles.section}`} id="all-work">
      <div className={styles.heading}>
        <div>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2>{copy.heading}</h2>
        </div>
      </div>
      <div className={styles.grid}>
        {projects.map((project) => (
          <button
            key={project.id}
            className={styles.card}
            type="button"
            onClick={() => onOpenProject(project)}
          >
            <span className={`${styles.visual} ${visualClass(project.visual)}`} />
            <span className={styles.copy}>
              <strong>{project.title}</strong>
              <small>{project.meta}</small>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
