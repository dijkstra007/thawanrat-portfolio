'use client';

import { useEffect, useMemo, useState } from 'react';
import type { CSSProperties } from 'react';

type Project = {
  id: number;
  title: string;
  category: 'Packaging' | 'Campaign' | 'Branding' | 'Digital';
  meta: string;
  year: string;
  visual: string;
  description: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: 'Thai fruit packaging',
    category: 'Packaging',
    meta: 'Packaging · Branding · Award',
    year: '2023',
    visual: 'fruit',
    description:
      'A playful packaging system that turns familiar Thai fruits into sculptural gifts. The collection balances shelf impact, cultural character, and production-ready construction.',
  },
  {
    id: 2,
    title: 'PTT Station — Self Serve',
    category: 'Campaign',
    meta: 'Campaign · Branding · Digital · Print · OOH',
    year: '2026',
    visual: 'blue',
    description:
      'A clear, approachable campaign system that guides customers through a new self-service experience across station, print, and digital touchpoints.',
  },
  {
    id: 3,
    title: 'Singha Water × PTT Station',
    category: 'Campaign',
    meta: 'Campaign · Packaging · Digital',
    year: '2025',
    visual: 'water',
    description:
      'A lively co-branded launch toolkit built for visibility at retail, with a flexible graphic system spanning packaging, point-of-sale, and social content.',
  },
  {
    id: 4,
    title: 'Protech Product Communication',
    category: 'Branding',
    meta: 'Graphic Design · Catalogue · Product',
    year: '2025',
    visual: 'ink',
    description:
      'A precise communication system for a technical brand, unifying catalogue structure, product storytelling, and a confident visual identity.',
  },
  {
    id: 5,
    title: 'Chaidi brand packaging',
    category: 'Packaging',
    meta: 'Packaging Design',
    year: '2024',
    visual: 'peach',
    description:
      'Warm, friendly packaging that uses illustration and tactile color to make a regional product range feel contemporary and giftable.',
  },
  {
    id: 6,
    title: 'EV Station launch',
    category: 'Campaign',
    meta: 'Campaign · OOH · Digital',
    year: '2025',
    visual: 'electric',
    description:
      'A high-energy launch campaign translating technical benefits into bold, memorable messages for outdoor and digital media.',
  },
  {
    id: 7,
    title: 'Field notes identity',
    category: 'Branding',
    meta: 'Identity · Editorial · Print',
    year: '2024',
    visual: 'paper',
    description:
      'An editorial identity with a quiet typographic voice, modular layouts, and a tactile material palette designed for long-form storytelling.',
  },
  {
    id: 8,
    title: 'Always-on content series',
    category: 'Digital',
    meta: 'Social · Motion · Content',
    year: '2025',
    visual: 'violet',
    description:
      'A modular content toolkit that helps a busy brand move quickly while keeping every post unmistakably consistent.',
  },
  {
    id: 9,
    title: 'Retail seasonal toolkit',
    category: 'Digital',
    meta: 'Retail · Social · OOH',
    year: '2024',
    visual: 'sun',
    description:
      'A bright seasonal campaign translated across retail displays, social templates, and outdoor placements.',
  },
  {
    id: 10,
    title: 'Annual report system',
    category: 'Branding',
    meta: 'Editorial · Infographic',
    year: '2023',
    visual: 'red',
    description:
      'A disciplined annual-report system that makes complex information feel human, structured, and easy to navigate.',
  },
  {
    id: 11,
    title: 'Future food concept',
    category: 'Packaging',
    meta: 'Concept · Packaging',
    year: '2023',
    visual: 'lime',
    description:
      'A forward-looking packaging concept pairing experimental form with an optimistic, high-contrast visual language.',
  },
  {
    id: 12,
    title: 'Product story catalogue',
    category: 'Digital',
    meta: 'Catalogue · Digital',
    year: '2024',
    visual: 'slate',
    description:
      'A flexible catalogue experience that turns a dense product range into a clear, useful, and visually coherent story.',
  },
];

const experience = [
  {
    role: 'Graphic Designer',
    company: 'Happy Nest Space',
    year: '2025–2026',
    detail: 'Brand identities, campaign systems, and production-ready visual assets.',
  },
  {
    role: 'Graphic Designer',
    company: 'Konica Minolta Business Solutions',
    year: '2023–2025',
    detail: 'Corporate communication, campaign art direction, and high-quality print production.',
  },
  {
    role: 'Graphic Designer',
    company: 'L&3B Company Limited',
    year: '2023',
    detail: 'Sales presentations, product mockups, sample books, and social visuals.',
  },
  {
    role: 'Graphic Design Intern',
    company: 'Online Asset Co., Ltd',
    year: '2022',
    detail: 'Digital campaign content and production support across marketing channels.',
  },
];

const expertise = [
  ['Packaging', 'Packaging design', 'Die-line construction', 'Production-ready artwork'],
  ['Brand Identity', 'Brand identities', 'Visual systems', 'Corporate communication'],
  ['Visual Communication', 'Campaign assets', 'Print & digital', 'Out-of-home advertising'],
  ['AI Workflow', 'AI-enhanced workflow', 'Creative development', 'Visual exploration'],
];

type CategoryFilter = Project['category'] | 'All';
const featuredProjectIds = [2, 3, 5, 4];
const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

function padIndex(index: number) {
  return String(index + 1).padStart(2, '0');
}

function SiteFooter() {
  return (
    <footer id="contact">
      <div className="shell footer-grid">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Let’s create<br />something great.</h2>
          <p className="footer-note">I’m currently open to new opportunities.<br />Feel free to reach out.</p>
        </div>
        <div className="contact-links">
          <a href="mailto:fah.thawanrat001@gmail.com">fah.thawanrat001@gmail.com</a>
          <a href="tel:+66800823850">080-082-3850</a>
          <div>
            <a href="https://fastwork.co/" target="_blank" rel="noreferrer">Fastwork</a>
            <span> · </span>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  const [workMenuOpen, setWorkMenuOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [archiveVisible, setArchiveVisible] = useState(false);
  const [filter, setFilter] = useState<CategoryFilter>('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const featuredProjects = useMemo(
    () => featuredProjectIds.map((id) => projects.find((project) => project.id === id)!),
    [],
  );

  const filteredProjects = useMemo(
    () => projects.filter((project) => filter === 'All' || project.category === filter),
    [filter],
  );

  const activeIndex = activeProject
    ? projects.findIndex((project) => project.id === activeProject.id)
    : -1;

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

  const showAdjacentProject = (offset: number) => {
    if (activeIndex < 0) return;
    const next = projects[(activeIndex + offset + projects.length) % projects.length];
    setActiveProject(next);
  };

  const portfolioStyle = {
    '--hero-image': `url("${assetBase}/assets/thawanrat-packaging.png")`,
    '--fah-mark': `url("${assetBase}/assets/fah-signature.png")`,
  } as CSSProperties;

  const compactNav = archiveVisible || Boolean(activeProject);

  return (
    <main className={workMenuOpen ? 'menu-open' : ''} style={portfolioStyle}>
      {!activeProject && (
        <header className="site-header">
          <div className="shell header-inner">
            <a className="wordmark" href="#top" aria-label="Fahworks home" onClick={goHome}>
              f<span className="wordmark-mark" />hworks.
            </a>

            <nav className={mobileNavOpen ? 'primary-nav open' : 'primary-nav'} aria-label="Primary navigation">
              <button
                className={workMenuOpen || archiveVisible ? 'nav-link active' : 'nav-link'}
                type="button"
                aria-expanded={workMenuOpen}
                onClick={() => {
                  setWorkMenuOpen((open) => !open);
                  setMobileNavOpen(false);
                }}
              >
                Work
              </button>
              {!compactNav && (
                <>
                  <a className="nav-link" href="#about" onClick={closeMenus}>About</a>
                  <a className="nav-link" href="#experience" onClick={closeMenus}>Experience</a>
                  <a className="nav-link" href="#skills" onClick={closeMenus}>Skills</a>
                </>
              )}
              <a className="nav-link" href="#contact" onClick={closeMenus}>Contact</a>
            </nav>

            <button
              className={mobileNavOpen ? 'menu-toggle active' : 'menu-toggle'}
              type="button"
              aria-label="Toggle menu"
              aria-expanded={mobileNavOpen}
              onClick={() => {
                setMobileNavOpen((open) => !open);
                setWorkMenuOpen(false);
              }}
            >
              <span />
              <span />
            </button>
          </div>

          <div className={workMenuOpen ? 'work-menu open' : 'work-menu'} aria-hidden={!workMenuOpen}>
            <div className="shell work-menu-grid">
              <div>
                <p className="menu-label">Type of work</p>
                <button onClick={() => revealArchive('Packaging')}>Print / Packaging</button>
                <button onClick={() => revealArchive('Branding')}>Branding</button>
                <button onClick={() => revealArchive('Digital')}>Digital / Content</button>
              </div>
              <div>
                <p className="menu-label">Featured</p>
                <button onClick={() => openProject(projects[1])}>PTT Station</button>
                <button onClick={() => openProject(projects[2])}>Singha Water × PTT Station</button>
              </div>
              <div>
                <p className="menu-label">Awards</p>
                <button onClick={() => openProject(projects[0])}>Thai fruit packaging</button>
                <button onClick={() => openProject(projects[4])}>Chaidi brand packaging</button>
              </div>
            </div>
          </div>
        </header>
      )}

      <div className="page-body" aria-hidden={Boolean(activeProject)} onClick={() => workMenuOpen && setWorkMenuOpen(false)}>
        {archiveVisible ? (
          <section className="archive shell section-pad" id="all-work">
            <div className="archive-heading">
              <div>
                <p className="eyebrow">Selected work</p>
                <h2>Work that speaks.</h2>
              </div>
            </div>
            <div className="archive-grid">
              {filteredProjects.map((project, index) => (
                <button
                  key={project.id}
                  className="archive-card"
                  type="button"
                  onClick={() => openProject(project)}
                >
                  <span className={`archive-visual visual-${project.visual}`} />
                  <span className="archive-card-copy">
                    <span>{padIndex(index)}</span>
                    <strong>{project.title}</strong>
                    <small>{project.meta}</small>
                  </span>
                </button>
              ))}
            </div>
          </section>
        ) : (
          <>
            <section className="hero shell" id="top">
              <div className="hero-stage">
                <button
                  className="hero-image"
                  type="button"
                  aria-label="Open the Thai fruit packaging case study"
                  onClick={() => openProject(projects[0])}
                />
                <div className="hero-copy">
                  <h1>
                    THAWANRAT T.
                    <span className="fah-mark" aria-hidden="true" />
                  </h1>
                  <p className="hero-role">Graphic Designer</p>
                  <p className="hero-specialty">Packaging Design • Brand Identity</p>
                  <p className="hero-intro">
                    I create thoughtful visual solutions across packaging, print, and digital media.
                  </p>
                  <div className="hero-actions">
                    <a className="button primary" href="#work">View My Work</a>
                    <a className="button text-button" href="#contact">
                      Download Resume
                      <svg className="download-icon" viewBox="0 0 16 14" aria-hidden="true">
                        <path
                          d="M8 1v8M4.5 6.5 8 10l3.5-3.5M2 13h12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
                <aside className="award" aria-label="Award winning project">
                  <span className="award-icon">◇</span>
                  <p>
                    <strong>Award winning project</strong><br />
                    ThaiStar Packaging Awards 2023<br />
                    <small>Bronze Award · Student Consumer Package</small>
                  </p>
                </aside>
              </div>
            </section>

            <section className="selected-work shell section-pad" id="work">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">Selected work</p>
                  <h2>Work that<br />speaks.</h2>
                </div>
                <button className="button outline" type="button" onClick={() => revealArchive('All')}>
                  View All Projects <span>→</span>
                </button>
              </div>
              <div className="preview-grid">
                {featuredProjects.map((project) => (
                  <button
                    key={project.id}
                    className="project-preview"
                    type="button"
                    onClick={() => openProject(project)}
                  >
                    <span className={`project-preview-image visual-${project.visual}`} />
                    <strong>{project.title}</strong>
                    <small>{project.meta}</small>
                  </button>
                ))}
              </div>
            </section>

            <section className="about section-pad" id="about">
              <div className="shell about-layout">
                <div className="about-copy">
                  <p className="eyebrow">About me</p>
                  <h2>Designing with purpose,<br />from concept to production.</h2>
                  <p>
                    I’m a graphic designer specializing in packaging, brand communication,
                    and production-ready artwork across print and digital media.
                  </p>
                  <div className="stats">
                    <p><strong>3+</strong><span>Years experience</span></p>
                    <p><strong>AI</strong><span>Enhanced workflow</span></p>
                  </div>
                </div>
              </div>
            </section>

            <section className="experience shell section-pad" id="experience">
              <div className="split-layout">
                <div>
                  <p className="eyebrow">Experience</p>
                  <h2>My professional<br />journey.</h2>
                </div>
                <div className="timeline">
                  {experience.map((item) => (
                    <article key={`${item.company}-${item.year}`}>
                      <span className="timeline-dot" />
                      <div>
                        <h3>{item.role}</h3>
                        <p>{item.company}</p>
                        <small>{item.detail}</small>
                      </div>
                      <time>{item.year}</time>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section className="expertise section-pad" id="skills">
              <div className="shell">
                <p className="eyebrow">Expertise</p>
                <h2>What I do.</h2>
                <div className="expertise-grid">
                  {expertise.map(([title, ...items]) => (
                    <article key={title}>
                      <h3>{title}</h3>
                      <ul>
                        {items.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </article>
                  ))}
                </div>

                <div className="skills-block">
                  <p className="eyebrow">Skills</p>
                  <h2>Tools &amp; skills.</h2>
                  <div className="skills-columns">
                    <div>
                      <h3>Design</h3>
                      <div className="chips">
                        {['Illustrator', 'Photoshop', 'InDesign', 'Canva', 'CapCut'].map((tool) => (
                          <span key={tool}>{tool}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3>AI &amp; Productivity</h3>
                      <div className="chips">
                        {['ChatGPT', 'Google Gemini', 'Nano Banana Pro', 'Magnific AI', 'Microsoft Teams', 'OneDrive', 'Word', 'Excel'].map((tool) => (
                          <span key={tool}>{tool}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="education section-pad">
              <div className="shell split-layout">
                <div>
                  <p className="eyebrow">Education</p>
                  <h2>Communication<br />Design.</h2>
                </div>
                <div className="education-details">
                  <article>
                    <h3>Bachelor&apos;s Degree</h3>
                    <p>School of Fine and Applied Arts, Communication Design</p>
                    <small>Bangkok University</small>
                    <time>2019–2022</time>
                  </article>
                  <article>
                    <h3>Languages</h3>
                    <p>Thai · English (Basic)</p>
                  </article>
                </div>
              </div>
            </section>
          </>
        )}
      </div>

      {!activeProject && <SiteFooter />}

      {activeProject && (
        <div className="case-overlay" role="dialog" aria-modal="true" aria-label={activeProject.title}>
          <div className="case-study">
            <header className="case-bar">
              <div className="shell header-inner">
                <a className="wordmark" href="#top" onClick={() => setActiveProject(null)}>
                  f<span className="wordmark-mark" />hworks.
                </a>
                <nav className="case-nav" aria-label="Case study navigation">
                  <button className="nav-link active" type="button" onClick={() => setActiveProject(null)}>
                    Work
                  </button>
                  <a className="nav-link" href="#contact" onClick={() => setActiveProject(null)}>Contact</a>
                </nav>
              </div>
            </header>
            <div className="case-heading shell">
              <p className="eyebrow">Selected work</p>
              <h2>{activeProject.title}</h2>
            </div>
            <div className={`case-hero visual-${activeProject.visual}`}>
              {activeProject.visual === 'fruit' ? <span className="case-hero-photo" /> : null}
            </div>
            <div className="case-description shell">
              <p>{activeProject.description}</p>
              <div className="case-pager">
                <button type="button" onClick={() => showAdjacentProject(-1)}>
                  <span aria-hidden="true">‹‹</span> Back
                </button>
                <button type="button" onClick={() => showAdjacentProject(1)}>
                  Next <span aria-hidden="true">››</span>
                </button>
              </div>
            </div>
            <SiteFooter />
          </div>
        </div>
      )}
    </main>
  );
}
