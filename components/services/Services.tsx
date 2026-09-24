import Link from 'next/link';
import { homepageCopy } from '@/content/homepage';
import { localePath } from '@/lib/routes';
import type { CategoryFilter, Locale } from '@/lib/types';
import styles from './Services.module.css';

const categories: CategoryFilter[] = ['Branding', 'Packaging', 'Campaign', 'Digital'];

function ServiceIcon({ index }: { index: number }) {
  const paths = [
    <g key="brand"><path d="M2 10a10 10 0 0 1 20 0M5 12v-2a7 7 0 0 1 14 0v3a17 17 0 0 1-1 6M8 16v-6a4 4 0 0 1 8 0v4a17 17 0 0 1-2 8M11 20a22 22 0 0 0 1-7v-3M2 15a10 10 0 0 1-1 4M5 16a15 15 0 0 1-1 6" /></g>,
    <g key="package"><path d="m12 2 9 5v10l-9 5-9-5V7l9-5Zm-9 5 9 5 9-5M12 12v10M7.5 4.5l9 5" /></g>,
    <g key="print"><path d="m12 3 10 6-10 6L2 9l10-6Zm-10 11 10 6 10-6M2 19l10 6 10-6" transform="translate(0 -1) scale(1 .9)" /></g>,
    <g key="digital"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></g>,
  ];
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[index]}</svg>;
}

type ServicesProps = { locale: Locale; onRevealArchive?: (category: CategoryFilter) => void };

export default function Services({ locale, onRevealArchive }: ServicesProps) {
  const copy = homepageCopy[locale].services;
  return (
    <section className={styles.section} id="services" aria-labelledby="services-title">
      <div className="shell">
        <div className={styles.heading}>
          <div>
            <p className="eyebrow">{copy.label}</p>
            <h2 id="services-title">{copy.title[0]}{' '}<br />{copy.title[1]}</h2>
          </div>
          <p className={styles.note}>{copy.note}</p>
        </div>
        <div className={styles.grid}>
          {copy.items.map((service, index) => (
            <article className={styles.card} key={service.title}>
              <ServiceIcon index={index} />
              <h3>{service.title}</h3>
              <p>{service.body}</p>
              <Link
                className={styles.related}
                href={`${localePath(locale, '/work/')}?category=${categories[index]}`}
                onNavigate={onRevealArchive ? (event) => { event.preventDefault(); onRevealArchive(categories[index]); } : undefined}
              >
                {copy.related}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
