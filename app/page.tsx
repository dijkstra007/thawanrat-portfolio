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
    title: 'PTTOR Station — Self Service',
    category: 'Campaign',
    meta: 'Campaign · Digital · Print',
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
    title: 'Protech Communication',
    category: 'Branding',
    meta: 'Brand Identity · Catalogue',
    year: '2025',
    visual: 'ink',
    description:
      'A precise communication system for a technical brand, unifying catalogue structure, product storytelling, and a confident visual identity.',
  },
  {
    id: 5,
    title: 'Chaidi brand packaging',
    category: 'Packaging',
    meta: 'Packaging · Illustration',
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

const categories = ['All', 'Packaging', 'Campaign', 'Branding', 'Digital'] as const;

export default function Home() {
  const [workMenuOpen, setWorkMenuOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [archiveVisible, setArchiveVisible] = useState(false);
  const [filter, setFilter] = useState<(typeof categories)[number]>('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(
    () => projects.filter((project) => filter === 'All' || project.category === filter),
    [filter],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveProject(null);
        setWorkMenuOpen(false);
        setMobileNavOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = activeProject || mobileNavOpen ? 'hidden' : '';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeProject, mobileNavOpen]);

  const revealArchive = (category: (typeof categories)[number] = 'All') => {
    setFilter(category);
    setArchiveVisible(true);
    setWorkMenuOpen(false);
    setMobileNavOpen(false);
    window.setTimeout(() => {
      document.getElementById('all-work')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const closeMenus = () => {
    setWorkMenuOpen(false);
    setMobileNavOpen(false);
  };

  const portfolioStyle = {
    '--hero-image': `url("${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/assets/thawanrat-packaging.png")`,
  } as CSSProperties;

  return (
    <main className={workMenuOpen ? 'menu-open' : ''} style={portfolioStyle}>
      <header className="site-header">
        <div className="shell header-inner">
          <a className="wordmark" href="#top" aria-label="Fahworks home" onClick={closeMenus}>
            f<span className="wordmark-mark" />hworks.
          </a>

          <nav className={mobileNavOpen ? 'primary-nav open' : 'primary-nav'} aria-label="Primary navigation">
            <button
              className={workMenuOpen ? 'nav-link active' : 'nav-link'}
              type="button"
              aria-expanded={workMenuOpen}
              onClick={() => {
                setWorkMenuOpen((open) => !open);
                setMobileNavOpen(false);
              }}
            >
              Work
            </button>
            <a className="nav-link" href="#about" onClick={closeMenus}>About</a>
            <a className="nav-link" href="#experience" onClick={closeMenus}>Experience</a>
            <a className="nav-link" href="#skills" onClick={closeMenus}>Skills</a>
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
              <button onClick={() => setActiveProject(projects[1])}>PTT Station</button>
              <button onClick={() => setActiveProject(projects[2])}>Singha Water × PTT Station</button>
            </div>
            <div>
              <p className="menu-label">Awards</p>
              <button onClick={() => setActiveProject(projects[0])}>Thai fruit packaging</button>
              <button onClick={() => setActiveProject(projects[4])}>Chaidi brand packaging</button>
            </div>
          </div>
        </div>
      </header>

      <div className="page-body" onClick={() => workMenuOpen && setWorkMenuOpen(false)}>
        <section className="hero shell" id="top">
          <div className="hero-copy">
            <p className="eyebrow">Portfolio / 2026</p>
            <h1>THAWANRAT T.</h1>
            <p className="hero-role">Graphic Designer</p>
            <p className="hero-specialty">Packaging Design · Brand Identity</p>
            <p className="hero-intro">
              I create thoughtful visual solutions across packaging, print, and digital media.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#work">View My Work</a>
              <a className="button text-button" href="#experience">View Resume <span>↓</span></a>
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
        </section>

        <button
          className="hero-image"
          type="button"
          aria-label="Open the Thai fruit packaging case study"
          onClick={() => setActiveProject(projects[0])}
        >
          <span>Featured project</span>
          <span>Thai fruit packaging ↗</span>
        </button>

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
            {projects.slice(0, 4).map((project) => (
              <button
                key={project.id}
                className="project-preview"
                type="button"
                onClick={() => setActiveProject(project)}
              >
                <span className={`project-preview-image visual-${project.visual}`}>
                  <span className="visual-number">0{project.id}</span>
                </span>
                <span className="project-line">
                  <span>0{project.id}</span>
                  <strong>{project.title}</strong>
                </span>
                <small>{project.meta}</small>
              </button>
            ))}
          </div>
        </section>

        {archiveVisible && (
          <section className="archive shell section-pad" id="all-work">
            <div className="archive-heading">
              <div>
                <p className="eyebrow">Project archive</p>
                <h2>All work.</h2>
              </div>
              <button className="archive-close" type="button" onClick={() => setArchiveVisible(false)}>
                Close ×
              </button>
            </div>
            <div className="filters" aria-label="Filter projects">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={filter === category ? 'active' : ''}
                  onClick={() => setFilter(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="archive-grid">
              {filteredProjects.map((project) => (
                <button
                  key={project.id}
                  className="archive-card"
                  type="button"
                  onClick={() => setActiveProject(project)}
                >
                  <span className={`archive-visual visual-${project.visual}`}>
                    <span>{project.category}</span>
                    <b>0{project.id}</b>
                  </span>
                  <span className="archive-card-copy">
                    <span>0{project.id}</span>
                    <strong>{project.title}</strong>
                    <small>{project.meta}</small>
                  </span>
                </button>
              ))}
            </div>
            <p className="pagination" aria-label="Page 1 of 3">‹‹ &nbsp; <b>1</b> &nbsp; 2 &nbsp; 3 &nbsp;…&nbsp; ››</p>
          </section>
        )}

        <section className="about section-pad" id="about">
          <div className="shell split-layout">
            <p className="eyebrow">About me</p>
            <div className="about-copy">
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
      </div>

      <footer id="contact">
        <div className="shell footer-grid">
          <div>
            <p className="eyebrow">Contact</p>
            <h2>Let’s create<br />something great.</h2>
            <p className="footer-note">I’m currently open to new opportunities.<br />Feel free to reach out.</p>
          </div>
          <div className="contact-links">
            <a href="mailto:fah.thawanrat001@gmail.com">◉ &nbsp;fah.thawanrat001@gmail.com</a>
            <a href="tel:+66800823850">◔ &nbsp;080-082-3850</a>
            <div>
              <a href="https://fastwork.co/" target="_blank" rel="noreferrer">Fastwork</a>
              <span> · </span>
              <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
            <div className="social-marks" aria-hidden="true"><span /><span /><span /></div>
          </div>
        </div>
        <div className="shell footer-bottom">
          <span>Fahworks © 2026</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>

      {activeProject && (
        <div className="case-overlay" role="dialog" aria-modal="true" aria-label={activeProject.title}>
          <div className="case-study">
            <button className="case-close" type="button" onClick={() => setActiveProject(null)}>
              Close ×
            </button>
            <div className="case-heading shell">
              <p className="eyebrow">{activeProject.category} / {activeProject.year}</p>
              <h2>{activeProject.title}</h2>
              <div className="case-meta">
                <span>Role<br /><strong>Graphic design</strong></span>
                <span>Scope<br /><strong>{activeProject.meta}</strong></span>
                <span>Year<br /><strong>{activeProject.year}</strong></span>
              </div>
            </div>
            <div className={`case-hero visual-${activeProject.visual}`}>
              <span>0{activeProject.id}</span>
              <strong>{activeProject.title}</strong>
            </div>
            <div className="case-description shell">
              <p>{activeProject.description}</p>
              <button
                type="button"
                onClick={() => {
                  const next = projects[activeProject.id % projects.length];
                  setActiveProject(next);
                }}
              >
                Next project &nbsp;››
              </button>
            </div>
            <div className="case-footer">
              <div className="shell">
                <p>Let’s create<br />something great.</p>
                <button type="button" onClick={() => setActiveProject(null)}>Return to portfolio ↑</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
