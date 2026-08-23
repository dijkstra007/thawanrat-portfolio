'use client';

import { useEffect, useMemo, useState } from 'react';
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
import { projects } from '@/content/projects';
import { site } from '@/content/site';
import { assetPath } from '@/lib/assets';
import { adjacentProject, filterProjects, getFeaturedProjects } from '@/lib/projects';
import type { CategoryFilter, Project } from '@/lib/types';
import styles from './PortfolioApp.module.css';

export default function PortfolioApp() {
  const [workMenuOpen, setWorkMenuOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [archiveVisible, setArchiveVisible] = useState(false);
  const [filter, setFilter] = useState<CategoryFilter>('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const selectedProjects = useMemo(() => getFeaturedProjects(), []);
  const archivedProjects = useMemo(() => filterProjects(filter), [filter]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (activeProject) {
          setActiveProject(null);
          return;
        }
        setWorkMenuOpen(false);
        setMobileNavOpen(false);
        setArchiveVisible(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = activeProject || mobileNavOpen ? 'hidden' : '';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeProject, mobileNavOpen]);

  const closeMenus = () => {
    setWorkMenuOpen(false);
    setMobileNavOpen(false);
  };

  const goHome = () => {
    setArchiveVisible(false);
    setFilter('All');
    closeMenus();
  };

  const revealArchive = (category: CategoryFilter = 'All') => {
    setFilter(category);
    setArchiveVisible(true);
    setActiveProject(null);
    closeMenus();
    window.setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  };

  const openProject = (project: Project) => {
    setActiveProject(project);
    closeMenus();
  };

  const showAdjacent = (offset: number) => {
    if (!activeProject) return;
    setActiveProject(adjacentProject(activeProject, offset));
  };

  const portfolioStyle = {
    '--hero-image': `url("${assetPath(site.assets.heroImage)}")`,
    '--fah-mark': `url("${assetPath(site.assets.fahMark)}")`,
    '--thaistar-mark': `url("${assetPath(site.assets.thaiStarMark)}")`,
  } as CSSProperties;

  const header = (
    <Header
      overlay={!archiveVisible}
      compact={archiveVisible}
      workMenuOpen={workMenuOpen}
      mobileNavOpen={mobileNavOpen}
      workActive={workMenuOpen || archiveVisible}
      onGoHome={goHome}
      onCloseMenus={closeMenus}
      onToggleWorkMenu={() => {
        setWorkMenuOpen((open) => !open);
        setMobileNavOpen(false);
      }}
      onToggleMobileNav={() => {
        setMobileNavOpen((open) => !open);
        setWorkMenuOpen(false);
      }}
      onRevealArchive={revealArchive}
      onOpenProject={openProject}
    />
  );

  return (
    <main className={`${styles.root}${workMenuOpen ? ` ${styles.menuOpen}` : ''}`} style={portfolioStyle}>
      {!activeProject && archiveVisible && header}

      <div
        className={styles.body}
        aria-hidden={Boolean(activeProject)}
        onClick={() => workMenuOpen && setWorkMenuOpen(false)}
      >
        {archiveVisible ? (
          <Archive projects={archivedProjects} onOpenProject={openProject} />
        ) : (
          <>
            <Hero header={header} heroProject={projects[0]} onOpenHeroProject={openProject} />
            <SelectedWork
              projects={selectedProjects}
              onOpenProject={openProject}
              onViewAll={() => revealArchive('All')}
            />
            <About />
            <Experience />
            <Expertise />
            <Education />
          </>
        )}
      </div>

      {!activeProject && <Footer />}
      {activeProject && (
        <CaseStudy project={activeProject} onClose={() => setActiveProject(null)} onAdjacent={showAdjacent} />
      )}
    </main>
  );
}
