import Link from 'next/link';
import type { SiteCopy } from '@/content/site';
import ProjectThumbnail from '@/components/visuals/ProjectThumbnail';
import { localePath } from '@/lib/routes';
import { projectImageAlt } from '@/lib/projects';
import type { CategoryFilter, Locale, Project } from '@/lib/types';
import NoBreakText from '@/components/typography/NoBreakText';
import WorkFilters from './WorkFilters';
import type { WorkFilterOption } from './WorkFilters';
import styles from './SelectedWork.module.css';

type SelectedWorkProps = {
  locale: Locale;
  copy: SiteCopy['selectedWork'];
  projects: Project[];
  onOpenProject: (project: Project) => void;
  onViewAll: () => void;
  description?: string;
  filter?: CategoryFilter;
  filterOptions?: WorkFilterOption[];
  filterLabel?: string;
  onFilterChange?: (category: CategoryFilter) => void;
};

export default function SelectedWork({
  locale, copy, projects, onOpenProject, onViewAll, description,
  filter = 'All', filterOptions = [], filterLabel = '', onFilterChange,
}: SelectedWorkProps) {
  const visibleProjects = filter === 'All'
    ? projects
    : projects.filter((project) => project.category === filter);

  return (
    <section className={`shell ${styles.section}`} id="work">
      <div className={styles.heading}>
        <div>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2>{copy.heading[0]}{' '}<br />{copy.heading[1]}</h2>
        </div>
        {description ? <p className={styles.intro}>{description}</p> : null}
      </div>
      {onFilterChange && filterOptions.length > 0 ? (
        <WorkFilters value={filter} options={filterOptions} label={filterLabel} onChange={onFilterChange} />
      ) : null}
      <div className={styles.grid} aria-live="polite">
        {visibleProjects.map((project) => (
          <Link
            key={project.id}
            className={styles.card}
            href={localePath(locale, `/work/${project.slug}`)}
            onNavigate={(event) => { event.preventDefault(); onOpenProject(project); }}
          >
            <ProjectThumbnail
              className={styles.image}
              src={project.images?.[0]}
              alt={projectImageAlt(project, locale)}
              visual={project.visual}
            />
            <span className={styles.caption}>
              <strong><NoBreakText text={project.title} /></strong>
              <small><NoBreakText text={filterOptions.find((option) => option.category === project.category)?.label ?? project.meta} /></small>
            </span>
          </Link>
        ))}
      </div>
      <div className={styles.archiveLink}>
        <Link className="button outline" href={localePath(locale, '/work')} onNavigate={(event) => { event.preventDefault(); onViewAll(); }}>
          {copy.viewAll}
        </Link>
      </div>
    </section>
  );
}
