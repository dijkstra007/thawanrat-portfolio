'use client';

import { useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import type { CSSProperties } from 'react';
import About from '@/components/about/About';
import Archive from '@/components/archive/Archive';
import CaseStudy from '@/components/case-study/CaseStudy';
import Education from '@/components/education/Education';
import Experience from '@/components/experience/Experience';
import Expertise from '@/components/expertise/Expertise';
import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import Hero from '@/components/hero/Hero';
import SelectedWork from '@/components/selected-work/SelectedWork';
import { experience } from '@/content/experience';
import { expertise } from '@/content/expertise';
import { site } from '@/content/site';
import { assetPath } from '@/lib/assets';
import { adjacentProject, filterProjects, getFeaturedProjects, getProjectById } from '@/lib/projects';
import type { CategoryFilter, Locale, Project } from '@/lib/types';
import styles from './PortfolioApp.module.css';

const languageStorageKey = 'thawanrat-portfolio-language';
let fallbackLocale: Locale = 'en';
const localeListeners = new Set<() => void>();

function isLocale(value: string | null): value is Locale {
  return value === 'en' || value === 'th';
}

function getLocaleSnapshot(): Locale {
  if (typeof window === 'undefined') return 'en';

  try {
    const storedLocale = window.localStorage.getItem(languageStorageKey);
    if (isLocale(storedLocale)) {
      fallbackLocale = storedLocale;
      return storedLocale;
    }
    fallbackLocale = 'en';
    return fallbackLocale;
  } catch {
    return fallbackLocale;
  }
}

function subscribeToLocale(listener: () => void) {
  localeListeners.add(listener);

  if (typeof window !== 'undefined') {
    const onStorage = (event: StorageEvent) => {
      if (event.key === languageStorageKey) listener();
    };
    window.addEventListener('storage', onStorage);

    return () => {
      localeListeners.delete(listener);
      window.removeEventListener('storage', onStorage);
    };
  }

  return () => {
    localeListeners.delete(listener);
  };
}

function getServerLocale(): Locale {
  return 'en';
}

function setLocaleSnapshot(nextLocale: Locale) {
  fallbackLocale = nextLocale;
  try {
    window.localStorage.setItem(languageStorageKey, nextLocale);
  } catch {
    // Keep the language switch usable when browser storage is unavailable.
  }
  localeListeners.forEach((listener) => listener());
}

export default function PortfolioApp() {
  const locale = useSyncExternalStore(subscribeToLocale, getLocaleSnapshot, getServerLocale);
  const [workMenuOpen, setWorkMenuOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [mobileWorkOpen, setMobileWorkOpen] = useState(false);
  const [archiveVisible, setArchiveVisible] = useState(false);
  const [filter, setFilter] = useState<CategoryFilter>('All');
  const [activeProjectId, setActiveProjectId] = useState<number | null>(null);

  const copy = site.copy[locale];
  const activeProject = activeProjectId === null
    ? null
    : getProjectById(activeProjectId, locale);
  const selectedProjects = useMemo(() => getFeaturedProjects(locale), [locale]);
  const archivedProjects = useMemo(() => filterProjects(filter, locale), [filter, locale]);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dataset.locale = locale;
    document.title = copy.metadata.title;

    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute('content', copy.metadata.description);

  }, [copy.metadata.description, copy.metadata.title, locale]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (activeProjectId !== null) {
          setActiveProjectId(null);
          return;
        }
        setWorkMenuOpen(false);
        setMobileNavOpen(false);
        setMobileWorkOpen(false);
        setArchiveVisible(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = activeProjectId !== null || mobileNavOpen ? 'hidden' : '';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeProjectId, mobileNavOpen]);

  const closeMenus = () => {
    setWorkMenuOpen(false);
    setMobileNavOpen(false);
    setMobileWorkOpen(false);
  };

  const changeLocale = (nextLocale: Locale) => {
    if (nextLocale === locale) return;
    setLocaleSnapshot(nextLocale);
    closeMenus();
  };

  const goHome = () => {
    setArchiveVisible(false);
    setFilter('All');
    closeMenus();
  };

  const revealArchive = (category: CategoryFilter = 'All') => {
    setFilter(category);
    setArchiveVisible(true);
    setActiveProjectId(null);
    closeMenus();
    window.setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  };

  const openProject = (project: Project) => {
    setActiveProjectId(project.id);
    closeMenus();
  };

  const showAdjacent = (offset: number) => {
    if (!activeProject) return;
    setActiveProjectId(adjacentProject(activeProject, offset, locale).id);
  };

  const portfolioStyle = {
    '--hero-image': `url("${assetPath(site.assets.heroImage)}")`,
    '--fah-mark': `url("${assetPath(site.assets.fahMark)}")`,
    '--thaistar-mark': `url("${assetPath(site.assets.thaiStarMark)}")`,
  } as CSSProperties;

  const header = (
    <Header
      copy={copy}
      locale={locale}
      overlay={!archiveVisible}
      compact={archiveVisible}
      workMenuOpen={workMenuOpen}
      mobileNavOpen={mobileNavOpen}
      mobileWorkOpen={mobileWorkOpen}
      onGoHome={goHome}
      onCloseMenus={closeMenus}
      onOpenWorkMenu={() => {
        setWorkMenuOpen(true);
        setMobileNavOpen(false);
        setMobileWorkOpen(false);
      }}
      onOpenMobileWork={() => setMobileWorkOpen(true)}
      onCloseMobileWork={() => setMobileWorkOpen(false)}
      onToggleWorkMenu={() => {
        setWorkMenuOpen((open) => !open);
        setMobileNavOpen(false);
        setMobileWorkOpen(false);
      }}
      onToggleMobileNav={() => {
        setMobileNavOpen((open) => !open);
        setWorkMenuOpen(false);
        setMobileWorkOpen(false);
      }}
      onRevealArchive={revealArchive}
      onOpenProject={openProject}
      onChangeLocale={changeLocale}
    />
  );

  return (
    <main className={`${styles.root}${workMenuOpen ? ` ${styles.menuOpen}` : ''}`} style={portfolioStyle}>
      {header}

      <div
        className={styles.body}
        aria-hidden={Boolean(activeProject)}
        onClick={() => workMenuOpen && setWorkMenuOpen(false)}
      >
        {archiveVisible ? (
          <Archive copy={copy.archive} projects={archivedProjects} onOpenProject={openProject} />
        ) : (
          <>
            <Hero copy={copy} />
            <SelectedWork
              copy={copy.selectedWork}
              projects={selectedProjects}
              onOpenProject={openProject}
              onViewAll={() => revealArchive('All')}
            />
            <About copy={copy.about} />
            <Experience copy={copy.experience} items={experience[locale]} />
            <Expertise copy={copy.expertise} groups={expertise[locale]} />
            <Education copy={copy.education} />
          </>
        )}
      </div>

      {!activeProject && <Footer copy={copy.footer} />}
      {activeProject && (
        <CaseStudy
          key={activeProject.id}
          copy={copy.caseStudy}
          project={activeProject}
          onClose={() => setActiveProjectId(null)}
          onAdjacent={showAdjacent}
        />
      )}
    </main>
  );
}
