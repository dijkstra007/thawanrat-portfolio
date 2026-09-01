import { site } from '@/content/site';
import { assetPath } from '@/lib/assets';
import { getProjectById } from '@/lib/projects';
import type { CategoryFilter, Project } from '@/lib/types';
import styles from './Header.module.css';

type HeaderProps = {
  overlay?: boolean;
  compact?: boolean;
  workMenuOpen: boolean;
  mobileNavOpen: boolean;
  mobileWorkOpen: boolean;
  workActive?: boolean;
  onGoHome: () => void;
  onCloseMenus: () => void;
  onOpenWorkMenu: () => void;
  onOpenMobileWork: () => void;
  onCloseMobileWork: () => void;
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
  mobileWorkOpen,
  workActive = false,
  onGoHome,
  onCloseMenus,
  onOpenWorkMenu,
  onOpenMobileWork,
  onCloseMobileWork,
  onToggleWorkMenu,
  onToggleMobileNav,
  onRevealArchive,
  onOpenProject,
}: HeaderProps) {
  const openWorkMenu = () => {
    if (!mobileNavOpen) onOpenWorkMenu();
  };

  const closeWorkMenuOnMouseEnter = () => {
    if (!mobileNavOpen) onCloseMenus();
  };

  const handleWorkClick = () => {
    if (mobileNavOpen) {
      onOpenMobileWork();
      return;
    }

    if (workMenuOpen) {
      onToggleWorkMenu();
      return;
    }

    onOpenWorkMenu();
  };

  return (
    <header
      className={`${styles.header}${overlay ? ` ${styles.overlay}` : ''}${workMenuOpen ? ` ${styles.menuActive}` : ''}`}
      onMouseLeave={() => workMenuOpen && onCloseMenus()}
    >
      <div className={`shell ${styles.inner}`}>
        <a className={styles.wordmark} href="#top" aria-label={site.wordmarkAria} onClick={onGoHome}>
          <img
            className={styles.logo}
            src={assetPath(site.assets.logo)}
            alt=""
            width={560}
            height={104}
            decoding="async"
          />
        </a>

        <nav
          className={`${styles.nav}${mobileNavOpen ? ` ${styles.navOpen}` : ''}`}
          aria-label="Primary navigation"
        >
          {mobileNavOpen && mobileWorkOpen ? (
            <div className={styles.mobileSubmenu}>
              <button
                className={styles.mobileBack}
                type="button"
                onClick={onCloseMobileWork}
              >
                <span className={styles.backIcon} aria-hidden="true">‹</span>
                <span>Work</span>
              </button>

              <div className={styles.mobileSubmenuGroup}>
                <p className={styles.mobileSubmenuLabel}>{site.workMenu.typesLabel}</p>
                {site.workMenu.types.map((item) => (
                  <button
                    key={item.label}
                    className={styles.mobileSubmenuLink}
                    type="button"
                    onClick={() => onRevealArchive(item.category)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className={styles.mobileSubmenuGroup}>
                <p className={styles.mobileSubmenuLabel}>{site.workMenu.featuredLabel}</p>
                {site.workMenu.featured.map((item) => (
                  <button
                    key={item.id}
                    className={`${styles.mobileSubmenuLink} ${styles.secondary}`}
                    type="button"
                    onClick={() => onOpenProject(getProjectById(item.id))}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className={styles.mobileSubmenuGroup}>
                <p className={styles.mobileSubmenuLabel}>{site.workMenu.awardsLabel}</p>
                {site.workMenu.awards.map((item) => (
                  <button
                    key={item.id}
                    className={`${styles.mobileSubmenuLink} ${styles.secondary}`}
                    type="button"
                    onClick={() => onOpenProject(getProjectById(item.id))}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              <div
                className={styles.workArea}
                onMouseEnter={openWorkMenu}
              >
                <button
                  className={`${styles.link}${workActive ? ` ${styles.active}` : ''}`}
                  type="button"
                  aria-expanded={mobileNavOpen ? mobileWorkOpen : workMenuOpen}
                  onFocus={openWorkMenu}
                  onClick={handleWorkClick}
                >
                  Work
                </button>

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
              </div>
              {!compact && (
                <>
                  <a className={styles.link} href="#about" onMouseEnter={closeWorkMenuOnMouseEnter} onClick={onCloseMenus}>About</a>
                  <a className={styles.link} href="#experience" onMouseEnter={closeWorkMenuOnMouseEnter} onClick={onCloseMenus}>Experience</a>
                  <a className={styles.link} href="#skills" onMouseEnter={closeWorkMenuOnMouseEnter} onClick={onCloseMenus}>Skills</a>
                </>
              )}
              <a className={styles.link} href="#contact" onMouseEnter={closeWorkMenuOnMouseEnter} onClick={onCloseMenus}>Contact</a>
            </>
          )}
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

    </header>
  );
}
