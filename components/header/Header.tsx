import Link from 'next/link';
import { localePath } from '@/lib/routes';
import { site } from '@/content/site';
import type { SiteCopy } from '@/content/site';
import { assetPath } from '@/lib/assets';
import { getProjectById } from '@/lib/projects';
import type { CategoryFilter, Locale, Project } from '@/lib/types';
import styles from './Header.module.css';

type HeaderProps = {
  copy: SiteCopy;
  locale: Locale;
  pagePath: string;
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
  onToggleMobileNav: () => void;
  onRevealArchive: (category: CategoryFilter) => void;
  onOpenProject: (project: Project) => void;
  onChangeLocale: (locale: Locale) => void;
};

export default function Header({
  copy,
  locale,
  pagePath,
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

    onRevealArchive('All');
  };

  return (
    <header
      className={`${styles.header}${overlay ? ` ${styles.overlay}` : ''}${workMenuOpen ? ` ${styles.menuActive}` : ''}`}
      onMouseLeave={() => workMenuOpen && onCloseMenus()}
    >
      <div className={`shell ${styles.inner}`}>
        <Link className={styles.wordmark} href={localePath(locale)} aria-label={copy.wordmarkAria} onNavigate={(event) => { event.preventDefault(); onGoHome(); }}>
          <img
            className={styles.logo}
            src={assetPath(site.assets.logo)}
            alt={locale === 'th' ? 'โลโก้ Fahworks ผลงานออกแบบของ Thawanrat T.' : 'Fahworks — Thawanrat T. design portfolio logo'}
            width={560}
            height={104}
            decoding="async"
          />
        </Link>

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
                  <Link
                    key={item.label}
                    className={styles.mobileSubmenuLink}
                    href={`${localePath(locale, '/work')}${item.category === 'All' ? '' : `?category=${item.category}`}`} onNavigate={(event) => { event.preventDefault(); onRevealArchive(item.category); }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className={styles.mobileSubmenuGroup}>
                <p className={styles.mobileSubmenuLabel}>{copy.workMenu.featuredLabel}</p>
                {copy.workMenu.featured.map((item) => (
                  <Link
                    key={item.id}
                    className={`${styles.mobileSubmenuLink} ${styles.secondary}`}
                    href={localePath(locale, `/work/${getProjectById(item.id, locale).slug}`)} onNavigate={(event) => { event.preventDefault(); onOpenProject(getProjectById(item.id, locale)); }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className={styles.mobileSubmenuGroup}>
                <p className={styles.mobileSubmenuLabel}>{copy.workMenu.awardsLabel}</p>
                {copy.workMenu.awards.map((item) => (
                  <Link
                    key={item.id}
                    className={`${styles.mobileSubmenuLink} ${styles.secondary}`}
                    href={localePath(locale, `/work/${getProjectById(item.id, locale).slug}`)} onNavigate={(event) => { event.preventDefault(); onOpenProject(getProjectById(item.id, locale)); }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <>
              <div
                className={styles.workArea}
                onMouseEnter={openWorkMenu}
              >
                <Link
                  className={styles.link}
                  href={localePath(locale, '/work')}
                  aria-expanded={mobileNavOpen ? mobileWorkOpen : workMenuOpen}
                  onFocus={openWorkMenu}
                  onNavigate={(event) => { event.preventDefault(); handleWorkClick(); }}
                >
                  {copy.navigation.work}
                </Link>

                <div
                  className={`${styles.menu}${workMenuOpen ? ` ${styles.menuOpen}` : ''}`}
                  aria-hidden={!workMenuOpen}
                >
                  <div className={`shell ${styles.grid}`}>
                    <div>
                      <p className={styles.label}>{copy.workMenu.typesLabel}</p>
                      {copy.workMenu.types.map((item) => (
                        <Link key={item.label} href={`${localePath(locale, '/work')}${item.category === 'All' ? '' : `?category=${item.category}`}`} onNavigate={(event) => { event.preventDefault(); onRevealArchive(item.category); }}>
                          {item.label}
                        </Link>
                      ))}
                    </div>
                    <div>
                      <p className={styles.label}>{copy.workMenu.featuredLabel}</p>
                      {copy.workMenu.featured.map((item) => (
                        <Link key={item.id} href={localePath(locale, `/work/${getProjectById(item.id, locale).slug}`)} onNavigate={(event) => { event.preventDefault(); onOpenProject(getProjectById(item.id, locale)); }}>
                          {item.label}
                        </Link>
                      ))}
                    </div>
                    <div>
                      <p className={styles.label}>{copy.workMenu.awardsLabel}</p>
                      {copy.workMenu.awards.map((item) => (
                        <Link key={item.id} href={localePath(locale, `/work/${getProjectById(item.id, locale).slug}`)} onNavigate={(event) => { event.preventDefault(); onOpenProject(getProjectById(item.id, locale)); }}>
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {!compact && (
                <>
                  <a className={styles.link} href={`${localePath(locale)}#about`} onMouseEnter={closeWorkMenuOnMouseEnter} onClick={onCloseMenus}>{copy.navigation.about}</a>
                  <a className={styles.link} href={`${localePath(locale)}#experience`} onMouseEnter={closeWorkMenuOnMouseEnter} onClick={onCloseMenus}>{copy.navigation.experience}</a>
                  <a className={styles.link} href={`${localePath(locale)}#skills`} onMouseEnter={closeWorkMenuOnMouseEnter} onClick={onCloseMenus}>{copy.navigation.skills}</a>
                </>
              )}
              <a className={styles.link} href={`${localePath(locale, pagePath)}#contact`} onMouseEnter={closeWorkMenuOnMouseEnter} onClick={onCloseMenus}>{copy.navigation.contact}</a>
            </>
          )}
        </nav>

        <div className={styles.actions}>
          <div className={styles.language} role="group" aria-label={copy.navigation.languageLabel}>
            <Link
              className={[
                styles.languageOption,
                locale === 'en' ? styles.languageActive : '',
              ].filter(Boolean).join(' ')}
              href={localePath('en', pagePath)}
              hrefLang="en"
              aria-label={copy.navigation.switchToEnglish}
              aria-current={locale === 'en' ? 'page' : undefined}
              onNavigate={(event) => { event.preventDefault(); onChangeLocale('en'); }}
            >
              EN
            </Link>
            <span className={styles.languageDivider} aria-hidden="true">/</span>
            <Link
              className={[
                styles.languageOption,
                locale === 'th' ? styles.languageActive : '',
              ].filter(Boolean).join(' ')}
              href={localePath('th', pagePath)}
              hrefLang="th"
              aria-label={copy.navigation.switchToThai}
              aria-current={locale === 'th' ? 'page' : undefined}
              onNavigate={(event) => { event.preventDefault(); onChangeLocale('th'); }}
            >
              TH
            </Link>
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
