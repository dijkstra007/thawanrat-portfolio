import Image from 'next/image';
import Link from 'next/link';
import { resume } from '@/content/resume';
import { assetPath } from '@/lib/assets';
import { localePath } from '@/lib/routes';
import type { Locale } from '@/lib/types';
import styles from './Resume.module.css';

type ResumeProps = {
  locale: Locale;
};

export default function Resume({ locale }: ResumeProps) {
  const copy = resume.copy[locale];
  const education = resume.education[locale];
  const homeHref = localePath(locale);
  const workHref = `${homeHref}#work`;

  return (
    <section className={`shell ${styles.resume}`} lang={locale} aria-label={copy.pageLabel}>
      <Link className={styles.back} href={homeHref}>{copy.backHome}</Link>

      <section className={styles.hero} aria-labelledby="resume-name">
        <div className={styles.intro}>
          <p className={`eyebrow ${styles.eyebrow}`}>{copy.eyebrow}</p>
          <h1 id="resume-name" className={styles.name}>
            {copy.name}{' '}<br />
            <span>{copy.nickname}</span>
          </h1>
          <p className={styles.role}>{copy.role}</p>
          <p className={styles.summary}>{copy.summary}</p>
          <div className={styles.actions}>
            <a
              className={`button primary ${styles.action}`}
              href={resume.contact.originalResume}
              target="_blank"
              rel="noopener noreferrer"
            >
              {copy.originalResume}
            </a>
            <Link className={`button ${styles.action} ${styles.secondary}`} href={workHref}>
              {copy.exploreWork}
            </Link>
          </div>
        </div>
        <div className={styles.photo}>
          <Image
            src={assetPath(resume.portrait)}
            alt={copy.portraitAlt}
            width={500}
            height={500}
            unoptimized
          />
          <span className={styles.photoNote}>{copy.location}</span>
        </div>
      </section>

      <div className={styles.contact}>
        <a href={`mailto:${resume.contact.email}`}>{resume.contact.email}</a>
        <a href={`tel:${resume.contact.phoneHref}`}>{resume.contact.phoneDisplay}</a>
        <a href={resume.contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>

      <div className={styles.layout}>
        <div>
          <section className={styles.cvSection} aria-labelledby="resume-experience">
            <div className={styles.heading}>
              <h2 id="resume-experience">{copy.experienceHeading}</h2>
            </div>
            {resume.experience[locale].map((job) => (
              <article className={styles.job} key={`${job.company}-${job.year}`}>
                <div className={styles.jobTop}>
                  <h3>{job.role}</h3>
                  <span className={styles.date}>{job.year}</span>
                </div>
                <p className={styles.company}>{job.company}</p>
                <p className={styles.detail}>{job.detail}</p>
              </article>
            ))}
          </section>

          <section className={styles.cvSection} aria-labelledby="resume-education">
            <div className={styles.heading}>
              <h2 id="resume-education">{copy.educationHeading}</h2>
            </div>
            <article className={styles.education}>
              <span className={styles.date}>{education.years}</span>
              <h3>{education.degree}</h3>
              <p>{education.program}</p>
              <p className={styles.school}>{education.school}</p>
            </article>
          </section>

          <section className={styles.cvSection} aria-labelledby="resume-recognition">
            <div className={styles.heading}>
              <h2 id="resume-recognition">{copy.recognitionHeading}</h2>
            </div>
            <div className={styles.award}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="8" r="6" />
                <path d="m8.21 13.89-1 9.11L12 20l4.79 3-1-9.12" />
              </svg>
              <div>
                <h3>{resume.awardName}</h3>
                <p>{copy.awardDetail}</p>
              </div>
            </div>
          </section>
        </div>

        <aside className={styles.sidebar} aria-label={copy.sidebarLabel}>
          <section className={styles.sideSection} aria-labelledby="resume-expertise">
            <h2 className={`eyebrow ${styles.sideHeading}`} id="resume-expertise">{copy.expertiseHeading}</h2>
            {resume.expertise[locale].map((group) => (
              <div className={styles.expertiseGroup} key={group.title}>
                <h3>{group.title}</h3>
                <p>{group.description}</p>
              </div>
            ))}
          </section>
          <section className={styles.sideSection} aria-labelledby="resume-tools">
            <h2 className={`eyebrow ${styles.sideHeading}`} id="resume-tools">{copy.toolsHeading}</h2>
            <div className={styles.tools}>
              {resume.designTools.map((tool) => <span key={tool}>{tool}</span>)}
            </div>
          </section>
          <section className={styles.sideSection} aria-labelledby="resume-productivity">
            <h2 className={`eyebrow ${styles.sideHeading}`} id="resume-productivity">{copy.productivityHeading}</h2>
            <p className={styles.sideDetail}>{resume.productivityTools.join(' · ')}</p>
          </section>
          <section className={styles.sideSection} aria-labelledby="resume-languages">
            <h2 className={`eyebrow ${styles.sideHeading}`} id="resume-languages">{copy.languagesHeading}</h2>
            <p className={styles.sideDetail}>{education.languages}</p>
          </section>
        </aside>
      </div>

      <div className={styles.end}>
        <div>
          <p className={`eyebrow ${styles.eyebrow}`}>{copy.endEyebrow}</p>
          <h2>{copy.endHeading}</h2>
        </div>
        <Link className={`button primary ${styles.action}`} href={workHref}>{copy.exploreWork}</Link>
      </div>
    </section>
  );
}
