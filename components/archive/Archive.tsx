import { visualClass } from '@/components/visuals/visuals';
import { site } from '@/content/site';
import { padIndex } from '@/lib/format';
import type { Project } from '@/lib/types';
import styles from './Archive.module.css';

type ArchiveProps = {
  projects: Project[];
  onOpenProject: (project: Project) => void;
};

export default function Archive({ projects, onOpenProject }: ArchiveProps) {
  const copy = site.archive;

  return (
    <section className={`shell ${styles.section}`} id="all-work">
      <div className={styles.heading}>
        <div>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2>{copy.heading}</h2>
        </div>
      </div>
      <div className={styles.grid}>
        {projects.map((project, index) => (
          <button
            key={project.id}
            className={styles.card}
            type="button"
            onClick={() => onOpenProject(project)}
          >
            <span className={`${styles.visual} ${visualClass(project.visual)}`} />
            <span className={styles.copy}>
              <span>{padIndex(index)}</span>
              <strong>{project.title}</strong>
              <small>{project.meta}</small>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
