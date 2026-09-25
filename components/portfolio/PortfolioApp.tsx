'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useMemo, useState } from 'react';
import Archive from '@/components/archive/Archive';
import BackToTop from '@/components/back-to-top/BackToTop';
import CaseStudy from '@/components/case-study/CaseStudy';
import Contact from '@/components/contact/Contact';
import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import Hero from '@/components/hero/Hero';
import Process from '@/components/process/Process';
import Resume from '@/components/resume/Resume';
import SelectedWork from '@/components/selected-work/SelectedWork';
import Services from '@/components/services/Services';
import { portfolioCopy } from '@/content/portfolio';
import { site } from '@/content/site';
import { localePath } from '@/lib/routes';
import { adjacentProject, filterProjects, getFeaturedProjects, getProjectBySlug } from '@/lib/projects';
import type { CategoryFilter, Locale, Project } from '@/lib/types';
import styles from './PortfolioApp.module.css';

type PortfolioProps = { view?: 'home' | 'work' | 'resume'; slug?: string; locale?: Locale };

// Keep static page content outside the optional query filter's Suspense boundary.
function CategoryFromUrl({ onChange }: { onChange: (category: string | null) => void }) {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  useEffect(() => { onChange(category); }, [category, onChange]);
  return null;
}

export default function PortfolioApp({ view = 'home', slug, locale = 'en' }: PortfolioProps) {
  const router = useRouter();
  const [category, setCategory] = useState<string | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [homeHash, setHomeHash] = useState('');
  const filter: CategoryFilter = category === 'Packaging' || category === 'Campaign' || category === 'Branding' || category === 'Digital' ? category : 'All';
  const copy = site.copy[locale];
  const design = portfolioCopy[locale];
  const activeProject = useMemo(() => slug ? getProjectBySlug(slug, locale) : null, [slug, locale]);
  const selectedProjects = useMemo(() => getFeaturedProjects(locale), [locale]);
  const archivedProjects = useMemo(() => filterProjects(filter, locale), [filter, locale]);
  const pagePath = slug ? `/work/${slug}` : view === 'work' ? '/work' : view === 'resume' ? '/resume' : '/';
  const activeSection = view === 'resume' ? 'resume' : view === 'home' && homeHash === '#services' ? 'services' : 'work';
  const localeSuffix = `${view !== 'resume' && !slug && filter !== 'All' ? `?category=${filter}` : ''}${view === 'home' ? homeHash : ''}`;

  useEffect(() => {
    const readHash = () => setHomeHash(window.location.hash);
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileNavOpen(false);
      }
    };
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Element && !event.target.closest('header')) setMobileNavOpen(false);
    };
    readHash();
    window.addEventListener('hashchange', readHash);
    window.addEventListener('keydown', closeOnEscape);
    document.addEventListener('pointerdown', closeOutside);
    return () => {
      window.removeEventListener('hashchange', readHash);
      window.removeEventListener('keydown', closeOnEscape);
      document.removeEventListener('pointerdown', closeOutside);
    };
  }, [slug, router, locale]);

  const closeMenus = () => setMobileNavOpen(false);
  const changeLocale = (nextLocale: Locale) => {
    if (nextLocale === locale) return;
    router.push(`${localePath(nextLocale, pagePath)}${localeSuffix}`);
    closeMenus();
  };
  const revealArchive = (nextCategory: CategoryFilter = 'All') => {
    closeMenus();
    setCategory(nextCategory);
    router.push(`${localePath(locale, '/work')}${nextCategory === 'All' ? '' : `?category=${nextCategory}`}`, { scroll: view !== 'work' });
  };
  const openProject = (project: Project) => {
    router.push(localePath(locale, `/work/${project.slug}`));
    closeMenus();
  };
  const showAdjacent = (offset: number) => {
    if (activeProject) openProject(adjacentProject(activeProject, offset, locale));
  };
  const filters = { filterOptions: design.filters, filterLabel: design.filterLabel };

  return (
    <main className={styles.root}>
      <Suspense fallback={null}><CategoryFromUrl onChange={setCategory} /></Suspense>
      <Header locale={locale} pagePath={pagePath} localeSuffix={localeSuffix} activeSection={activeSection}
          mobileNavOpen={mobileNavOpen}
          onOpenResume={() => { closeMenus(); router.push(localePath(locale, '/resume')); }}
          onCloseMenus={closeMenus} onToggleMobileNav={() => setMobileNavOpen((open) => !open)} onChangeLocale={changeLocale} />
      {activeProject ? <CaseStudy key={activeProject.id} copy={copy.caseStudy} locale={locale}
        project={activeProject} onClose={() => router.push(localePath(locale, '/work'))}
        onAdjacent={showAdjacent} /> : <>
        {view === 'resume' ? <Resume locale={locale} /> : view === 'work' ? (
          <Archive locale={locale} copy={copy.archive} projects={archivedProjects} onOpenProject={openProject}
            filter={filter} onFilterChange={revealArchive} {...filters} />
        ) : <>
          <Hero locale={locale} />
          <SelectedWork locale={locale} copy={design.selectedWork} description={design.workDescription}
            projects={selectedProjects} onOpenProject={openProject} onViewAll={() => revealArchive()}
            filter={filter} onFilterChange={(nextFilter) => {
              setCategory(nextFilter);
              setHomeHash('#work');
              router.replace(`${localePath(locale)}${nextFilter === 'All' ? '' : `?category=${nextFilter}`}#work`, { scroll: false });
            }} {...filters} />
          <Services locale={locale} onRevealArchive={revealArchive} />
          <Process locale={locale} />
        </>}
        {view !== 'resume' && <Contact locale={locale} />}
      </>}
      <Footer locale={locale} />
      <BackToTop label={design.backToTop} onActivate={closeMenus} />
    </main>
  );
}
