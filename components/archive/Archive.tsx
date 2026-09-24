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
import type { CategoryFilter, Locale, Project } from '@/lib/types';
import NoBreakText from '@/components/typography/NoBreakText';
import WorkFilters from '@/components/selected-work/WorkFilters';
import type { WorkFilterOption } from '@/components/selected-work/WorkFilters';
import styles from './Archive.module.css';

type ArchiveProps = {
  locale: Locale;
  copy: SiteCopy['archive'];
  projects: Project[];
  onOpenProject: (project: Project) => void;
  filter?: CategoryFilter;
  filterOptions?: WorkFilterOption[];
  filterLabel?: string;
  onFilterChange?: (category: CategoryFilter) => void;
};

export default function Archive({
  locale, copy, projects, onOpenProject,
  filter = 'All', filterOptions = [], filterLabel = '', onFilterChange,
}: ArchiveProps) {
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
      {onFilterChange && filterOptions.length > 0 ? (
        <WorkFilters value={filter} options={filterOptions} label={filterLabel} onChange={onFilterChange} />
      ) : null}
      <div className={styles.groups} aria-live="polite">
        {groupedProjects.map(({ key, items }) => (
          <div key={key} className={styles.group}>
            <h2 className={styles.groupHeading}>{copy.groups[key]}</h2>
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
