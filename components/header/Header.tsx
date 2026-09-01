import { site } from '@/content/site';
import type { SiteCopy } from '@/content/site';
import { assetPath } from '@/lib/assets';
import { getProjectById } from '@/lib/projects';
import type { CategoryFilter, Locale, Project } from '@/lib/types';
import styles from './Header.module.css';

type HeaderProps = {
  copy: SiteCopy;
  locale: Locale;
  overlay?: boolean;
  compact?: boolean;
  workMenuOpen: boolean;
  mobileNavOpen: boolean;
  mobileWorkOpen: boolean;
  onGoHome: () => void;
  onCloseMenus: () => void;
  onOpenWorkMenu: () => void;
  onOpenMobileWork: () => void;
  onCloseMobileWork: () => void;
  onToggleWorkMenu: () => void;
  onToggleMobileNav: () => void;
  onRevealArchive: (category: CategoryFilter) => void;
  onOpenProject: (project: Project) => void;
  onChangeLocale: (locale: Locale) => void;
};

export default function Header({
  copy,
  locale,
  overlay = false,
  compact = false,
  workMenuOpen,
  mobileNavOpen,
  mobileWorkOpen,
  onGoHome,
  onCloseMenus,
  onOpenWorkMenu,
  onOpenMobileWork,
  onCloseMobileWork,
  onToggleWorkMenu,
  onToggleMobileNav,
  onRevealArchive,
  onOpenProject,
  onChangeLocale,
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
        <a className={styles.wordmark} href="#top" aria-label={copy.wordmarkAria} onClick={onGoHome}>
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
          aria-label={copy.navigation.menuLabel}
        >
          {mobileNavOpen && mobileWorkOpen ? (
            <div className={styles.mobileSubmenu}>
              <button
                className={styles.mobileBack}
                type="button"
                onClick={onCloseMobileWork}
              >
                <span className={styles.backIcon} aria-hidden="true">‹</span>
                <span>{copy.navigation.work}</span>
              </button>

              <div className={styles.mobileSubmenuGroup}>
                <p className={styles.mobileSubmenuLabel}>{copy.workMenu.typesLabel}</p>
                {copy.workMenu.types.map((item) => (
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
                <p className={styles.mobileSubmenuLabel}>{copy.workMenu.featuredLabel}</p>
                {copy.workMenu.featured.map((item) => (
                  <button
                    key={item.id}
                    className={`${styles.mobileSubmenuLink} ${styles.secondary}`}
                    type="button"
                    onClick={() => onOpenProject(getProjectById(item.id, locale))}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className={styles.mobileSubmenuGroup}>
                <p className={styles.mobileSubmenuLabel}>{copy.workMenu.awardsLabel}</p>
                {copy.workMenu.awards.map((item) => (
                  <button
                    key={item.id}
                    className={`${styles.mobileSubmenuLink} ${styles.secondary}`}
                    type="button"
                    onClick={() => onOpenProject(getProjectById(item.id, locale))}
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
                  className={styles.link}
                  type="button"
                  aria-expanded={mobileNavOpen ? mobileWorkOpen : workMenuOpen}
                  onFocus={openWorkMenu}
                  onClick={handleWorkClick}
                >
                  {copy.navigation.work}
                </button>

                <div
                  className={`${styles.menu}${workMenuOpen ? ` ${styles.menuOpen}` : ''}`}
                  aria-hidden={!workMenuOpen}
                >
                  <div className={`shell ${styles.grid}`}>
                    <div>
                      <p className={styles.label}>{copy.workMenu.typesLabel}</p>
                      {copy.workMenu.types.map((item) => (
                        <button key={item.label} onClick={() => onRevealArchive(item.category)}>
                          {item.label}
                        </button>
                      ))}
                    </div>
                    <div>
                      <p className={styles.label}>{copy.workMenu.featuredLabel}</p>
                      {copy.workMenu.featured.map((item) => (
                        <button key={item.id} onClick={() => onOpenProject(getProjectById(item.id, locale))}>
                          {item.label}
                        </button>
                      ))}
                    </div>
                    <div>
                      <p className={styles.label}>{copy.workMenu.awardsLabel}</p>
                      {copy.workMenu.awards.map((item) => (
                        <button key={item.id} onClick={() => onOpenProject(getProjectById(item.id, locale))}>
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {!compact && (
                <>
                  <a className={styles.link} href="#about" onMouseEnter={closeWorkMenuOnMouseEnter} onClick={onCloseMenus}>{copy.navigation.about}</a>
                  <a className={styles.link} href="#experience" onMouseEnter={closeWorkMenuOnMouseEnter} onClick={onCloseMenus}>{copy.navigation.experience}</a>
                  <a className={styles.link} href="#skills" onMouseEnter={closeWorkMenuOnMouseEnter} onClick={onCloseMenus}>{copy.navigation.skills}</a>
                </>
              )}
              <a className={styles.link} href="#contact" onMouseEnter={closeWorkMenuOnMouseEnter} onClick={onCloseMenus}>{copy.navigation.contact}</a>
            </>
          )}
        </nav>

        <div className={styles.actions}>
          <div className={styles.language} role="group" aria-label={copy.navigation.languageLabel}>
            <button
              className={[
                styles.languageOption,
                locale === 'en' ? styles.languageActive : '',
              ].filter(Boolean).join(' ')}
              type="button"
              aria-label={copy.navigation.switchToEnglish}
              aria-pressed={locale === 'en'}
              onClick={() => onChangeLocale('en')}
            >
              EN
            </button>
            <span className={styles.languageDivider} aria-hidden="true">/</span>
            <button
              className={[
                styles.languageOption,
                locale === 'th' ? styles.languageActive : '',
              ].filter(Boolean).join(' ')}
              type="button"
              aria-label={copy.navigation.switchToThai}
              aria-pressed={locale === 'th'}
              onClick={() => onChangeLocale('th')}
            >
              TH
            </button>
          </div>

        <button
          className={`${styles.toggle}${mobileNavOpen ? ` ${styles.toggleActive}` : ''}`}
          type="button"
          aria-label={mobileNavOpen ? copy.navigation.closeMenu : copy.navigation.openMenu}
          aria-expanded={mobileNavOpen}
          onClick={onToggleMobileNav}
        >
          <span />
          <span />
        </button>
        </div>
      </div>

    </header>
  );
}
