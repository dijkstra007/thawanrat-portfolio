import ProjectThumbnail from '@/components/visuals/ProjectThumbnail';
import type { SiteCopy } from '@/content/site';
import type { Project } from '@/lib/types';
import NoBreakText from '@/components/typography/NoBreakText';
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
        {projects.map((project, index) => (
          <button
            key={project.id}
            className={styles.card}
            type="button"
            onClick={() => onOpenProject(project)}
          >
            <ProjectThumbnail
              className={styles.visual}
              src={project.images?.[0]}
              visual={project.visual}
              eager={index < 4}
            />
            <span className={styles.copy}>
              <strong><NoBreakText text={project.title} /></strong>
              <small><NoBreakText text={project.meta} /></small>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
