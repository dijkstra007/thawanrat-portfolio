import type { SiteCopy } from '@/content/site';
import { assetPath } from '@/lib/assets';
import type { Project } from '@/lib/types';
import { visualClass } from '@/components/visuals/visuals';
import NoBreakText from '@/components/typography/NoBreakText';
import styles from './SelectedWork.module.css';

type SelectedWorkProps = {
  copy: SiteCopy['selectedWork'];
  projects: Project[];
  onOpenProject: (project: Project) => void;
  onViewAll: () => void;
};

export default function SelectedWork({ copy, projects, onOpenProject, onViewAll }: SelectedWorkProps) {

  return (
    <section className={`shell ${styles.section}`} id="work">
      <div className={styles.heading}>
        <div>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2>{copy.heading[0]}<br />{copy.heading[1]}</h2>
        </div>
        <button className="button outline" type="button" onClick={onViewAll}>
          {copy.viewAll} <span>→</span>
        </button>
      </div>
      <div className={styles.grid}>
        {projects.map((project) => (
          <button
            key={project.id}
            className={styles.card}
            type="button"
            onClick={() => onOpenProject(project)}
          >
            <span
              className={`${styles.image} ${visualClass(project.visual)}`}
              style={project.images?.[0] ? { backgroundImage: `url("${assetPath(project.images[0])}")` } : undefined}
              aria-hidden="true"
            />
            <strong><NoBreakText text={project.title} /></strong>
            <small><NoBreakText text={project.meta} /></small>
          </button>
        ))}
      </div>
    </section>
  );
}
