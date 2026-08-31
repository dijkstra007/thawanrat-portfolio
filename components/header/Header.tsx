import { site } from '@/content/site';
import { getProjectById } from '@/lib/projects';
import type { CategoryFilter, Project } from '@/lib/types';
import styles from './Header.module.css';

type HeaderProps = {
  overlay?: boolean;
  compact?: boolean;
  workMenuOpen: boolean;
  mobileNavOpen: boolean;
  workActive?: boolean;
  onGoHome: () => void;
  onCloseMenus: () => void;
  onToggleWorkMenu: () => void;
  onToggleMobileNav: () => void;
  onRevealArchive: (category: CategoryFilter) => void;
  onOpenProject: (project: Project) => void;
};

export default function Header({
  overlay = false,
  compact = false,
  workMenuOpen,
  mobileNavOpen,
  workActive = false,
  onGoHome,
  onCloseMenus,
  onToggleWorkMenu,
  onToggleMobileNav,
  onRevealArchive,
  onOpenProject,
}: HeaderProps) {
  return (
    <header className={`${styles.header}${overlay ? ` ${styles.overlay}` : ''}`}>
      <div className={`shell ${styles.inner}`}>
        <a className={styles.wordmark} href="#top" aria-label={site.wordmarkAria} onClick={onGoHome}>
          f<span className={styles.mark} />hworks.
        </a>

        <nav
          className={`${styles.nav}${mobileNavOpen ? ` ${styles.navOpen}` : ''}`}
          aria-label="Primary navigation"
        >
          <button
            className={`${styles.link}${workActive ? ` ${styles.active}` : ''}`}
            type="button"
            aria-expanded={workMenuOpen}
            onClick={onToggleWorkMenu}
          >
            Work
          </button>
          {!compact && (
            <>
              <a className={styles.link} href="#about" onClick={onCloseMenus}>About</a>
              <a className={styles.link} href="#experience" onClick={onCloseMenus}>Experience</a>
              <a className={styles.link} href="#skills" onClick={onCloseMenus}>Skills</a>
            </>
          )}
          <a className={styles.link} href="#contact" onClick={onCloseMenus}>Contact</a>
        </nav>

        <button
          className={`${styles.toggle}${mobileNavOpen ? ` ${styles.toggleActive}` : ''}`}
          type="button"
          aria-label="Toggle menu"
          aria-expanded={mobileNavOpen}
          onClick={onToggleMobileNav}
        >
          <span />
          <span />
        </button>
      </div>

      <div
        className={`${styles.menu}${workMenuOpen ? ` ${styles.menuOpen}` : ''}`}
        aria-hidden={!workMenuOpen}
      >
        <div className={`shell ${styles.grid}`}>
          <div>
            <p className={styles.label}>{site.workMenu.typesLabel}</p>
            {site.workMenu.types.map((item) => (
              <button key={item.label} onClick={() => onRevealArchive(item.category)}>
                {item.label}
              </button>
            ))}
          </div>
          <div>
            <p className={styles.label}>{site.workMenu.featuredLabel}</p>
            {site.workMenu.featured.map((item) => (
              <button key={item.id} onClick={() => onOpenProject(getProjectById(item.id))}>
                {item.label}
              </button>
            ))}
          </div>
          <div>
            <p className={styles.label}>{site.workMenu.awardsLabel}</p>
            {site.workMenu.awards.map((item) => (
              <button key={item.id} onClick={() => onOpenProject(getProjectById(item.id))}>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
