import Link from 'next/link';
import ProjectThumbnail from '@/components/visuals/ProjectThumbnail';
import {
  archiveGroupOrder,
  archiveProjectGroups,
  type ArchiveGroupKey,
} from '@/content/projects';
import type { SiteCopy } from '@/content/site';
import { localePath } from '@/lib/routes';
import { projectImageAlt } from '@/lib/projects';
import type { Locale, Project } from '@/lib/types';
import NoBreakText from '@/components/typography/NoBreakText';
import styles from './Archive.module.css';

type ArchiveProps = {
  locale: Locale;
  copy: SiteCopy['archive'];
  projects: Project[];
  onOpenProject: (project: Project) => void;
};

export default function Archive({ locale, copy, projects, onOpenProject }: ArchiveProps) {
  const groupedProjects = archiveGroupOrder.flatMap((groupKey: ArchiveGroupKey) => {
    const groupProjectIds = new Set<number>(archiveProjectGroups[groupKey]);
    const groupItems = projects.filter((project) => groupProjectIds.has(project.id));

    return groupItems.length > 0 ? [{ key: groupKey, items: groupItems }] : [];
  });
  const eagerProjectIds = new Set(projects.slice(0, 4).map((project) => project.id));

  return (
    <section className={`shell ${styles.section}`} id="all-work">
      <div className={styles.heading}>
        <div>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1>{copy.heading}</h1>
        </div>
      </div>
      <div className={styles.groups}>
        {groupedProjects.map(({ key, items }) => (
          <div key={key} className={styles.group}>
            <h3 className={styles.groupHeading}>{copy.groups[key]}</h3>
            <div className={styles.grid}>
              {items.map((project) => (
                <Link
                  key={project.id}
                  className={styles.card}
                  href={localePath(locale, `/work/${project.slug}`)}
                  onNavigate={(event) => { event.preventDefault(); onOpenProject(project); }}
                >
                  <ProjectThumbnail
                    className={styles.visual}
                    src={project.images?.[0]}
              alt={projectImageAlt(project, locale)}
                    visual={project.visual}
                    eager={eagerProjectIds.has(project.id)}
                  />
                  <span className={styles.copy}>
                    <strong><NoBreakText text={project.title} /></strong>
                    {project.meta ? <small><NoBreakText text={project.meta} /></small> : null}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
