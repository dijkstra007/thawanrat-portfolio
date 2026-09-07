'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useMemo, useState } from 'react';
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
import { localePath } from '@/lib/routes';
import { assetPath } from '@/lib/assets';
import { adjacentProject, filterProjects, getFeaturedProjects, getProjectBySlug } from '@/lib/projects';
import type { CategoryFilter, Locale, Project } from '@/lib/types';
import styles from './PortfolioApp.module.css';

type PortfolioProps = { view?: 'home' | 'work'; slug?: string; locale?: Locale };

// Only the optional category filter waits for search params. Page content and
// language are always present in the static HTML, outside Suspense fallbacks.
function CategoryFromUrl({ onChange }: { onChange: (category: string | null) => void }) {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  useEffect(() => { onChange(category); }, [category, onChange]);
  return null;
}

export default function PortfolioApp({ view = 'home', slug, locale = 'en' }: PortfolioProps) {
  const router = useRouter();
  const [category, setCategory] = useState<string | null>(null);
  const [workMenuOpen, setWorkMenuOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [mobileWorkOpen, setMobileWorkOpen] = useState(false);
  const archiveVisible = view === 'work' || Boolean(slug);
  const filter: CategoryFilter = category === 'Packaging' || category === 'Campaign' || category === 'Branding' || category === 'Digital' ? category : 'All';

  const copy = site.copy[locale];
  const activeProject = useMemo(() => slug ? getProjectBySlug(slug, locale) : null, [slug, locale]);
  const selectedProjects = useMemo(() => getFeaturedProjects(locale), [locale]);
  const archivedProjects = useMemo(() => filterProjects(filter, locale), [filter, locale]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (slug) {
          router.push(localePath(locale, '/work'));
          return;
        }
        setWorkMenuOpen(false);
        setMobileNavOpen(false);
        setMobileWorkOpen(false);

      }
    };
    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = Boolean(slug) || mobileNavOpen ? 'hidden' : '';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [slug, mobileNavOpen, router, locale]);

  const closeMenus = () => {
    setWorkMenuOpen(false);
    setMobileNavOpen(false);
    setMobileWorkOpen(false);
  };

  const changeLocale = (nextLocale: Locale) => {
    if (nextLocale === locale) return;
    const path = slug ? `/work/${slug}` : view === 'work' ? '/work' : '/';
    const query = view === 'work' && !slug && filter !== 'All' ? `?category=${filter}` : '';
    router.push(`${localePath(nextLocale, path)}${query}`);
    closeMenus();
  };

  const goHome = () => {
    router.push(localePath(locale));
    closeMenus();
  };

  const revealArchive = (category: CategoryFilter = 'All') => {
    closeMenus();
    router.push(`${localePath(locale, '/work')}${category === 'All' ? '' : `?category=${category}`}`);
  };

  const openProject = (project: Project) => {
    router.push(localePath(locale, `/work/${project.slug}`));
    closeMenus();
  };

  const showAdjacent = (offset: number) => {
    if (!activeProject) return;
    openProject(adjacentProject(activeProject, offset, locale));
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
      pagePath={slug ? `/work/${slug}` : view === 'work' ? '/work' : '/'}
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
      <Suspense fallback={null}><CategoryFromUrl onChange={setCategory} /></Suspense>
      {!activeProject && header}

      {!activeProject && <div
        className={styles.body}
        aria-hidden={Boolean(activeProject)}
        onClick={() => workMenuOpen && setWorkMenuOpen(false)}
      >
        {archiveVisible ? (
          <Archive locale={locale} copy={copy.archive} projects={archivedProjects} onOpenProject={openProject} />
        ) : (
          <>
            <Hero copy={copy} />
            <SelectedWork
              locale={locale}
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
      </div>}

      {!activeProject && <Footer copy={copy.footer} />}
      {activeProject && (
        <CaseStudy
          copy={copy.caseStudy}
          navigation={copy.navigation}
          locale={locale}
          project={activeProject}
          onClose={() => router.push(localePath(locale, '/work'))}
          onAdjacent={showAdjacent}
          onChangeLocale={changeLocale}
        />
      )}
    </main>
  );
}
