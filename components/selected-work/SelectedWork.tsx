import Link from 'next/link';
import type { SiteCopy } from '@/content/site';
import ProjectThumbnail from '@/components/visuals/ProjectThumbnail';
import type { Project } from '@/lib/types';
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
        <Link className="button outline"  href="/work" onNavigate={(event) => { event.preventDefault(); onViewAll(); }}>
          {copy.viewAll} <span>→</span>
        </Link>
      </div>
      <div className={styles.grid}>
        {projects.map((project) => (
          <Link
            key={project.id}
            className={styles.card}
            href={`/work/${project.slug}`}
            onNavigate={(event) => { event.preventDefault(); onOpenProject(project); }}
          >
            <ProjectThumbnail
              className={styles.image}
              src={project.images?.[0]}
              visual={project.visual}
            />
            <strong><NoBreakText text={project.title} /></strong>
            <small><NoBreakText text={project.meta} /></small>
          </Link>
        ))}
      </div>
    </section>
  );
}
