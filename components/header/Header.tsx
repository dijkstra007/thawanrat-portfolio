import Link from 'next/link';
import { localePath } from '@/lib/routes';
import { site } from '@/content/site';
import { portfolioCopy } from '@/content/portfolio';
import { assetPath } from '@/lib/assets';
import type { Locale } from '@/lib/types';
import styles from './Header.module.css';

type HeaderProps = {
  locale: Locale;
  pagePath: string;
  localeSuffix: string;
  activeSection: 'work' | 'services' | 'resume';
  mobileNavOpen: boolean;
  onOpenResume: () => void;
  onCloseMenus: () => void;
  onToggleMobileNav: () => void;
  onChangeLocale: (locale: Locale) => void;
};

export default function Header({ locale, pagePath, localeSuffix, activeSection, mobileNavOpen,
  onOpenResume, onCloseMenus, onToggleMobileNav, onChangeLocale,
}: HeaderProps) {
  const copy = portfolioCopy[locale].navigation;
  return (
    <header className={`shell ${styles.header}`}>
      <a className={styles.wordmark} href={`${localePath(locale)}#top`} aria-label={site.copy[locale].wordmarkAria}
        onClick={onCloseMenus}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={assetPath(site.assets.logo)} alt={locale === 'th' ? 'โลโก้ Fahworks' : 'Fahworks logo'} width={560} height={104} />
      </a>
      <nav id="main-navigation" className={`${styles.nav}${mobileNavOpen ? ` ${styles.open}` : ''}`} aria-label={copy.menuLabel}>
        <a href={`${localePath(locale)}#work`} aria-current={activeSection === 'work' ? 'page' : undefined}
          onClick={onCloseMenus}>{copy.work}</a>
        <a href={`${localePath(locale)}#services`} aria-current={activeSection === 'services' ? 'location' : undefined}
          onClick={onCloseMenus}>{copy.services}</a>
        <Link href={localePath(locale, '/resume')} aria-current={activeSection === 'resume' ? 'page' : undefined}
          onNavigate={(event) => { event.preventDefault(); onOpenResume(); }}>{copy.resume}</Link>
      </nav>
      <div className={styles.actions}>
        <div className={styles.language} role="group" aria-label={copy.languageLabel}>
          <Link href={`${localePath('en', pagePath)}${localeSuffix}`} hrefLang="en" aria-label="English"
            aria-current={locale === 'en' ? 'true' : undefined}
            onNavigate={(event) => { event.preventDefault(); onChangeLocale('en'); }}>EN</Link>
          <span aria-hidden="true">/</span>
          <Link href={`${localePath('th', pagePath)}${localeSuffix}`} hrefLang="th" aria-label="ภาษาไทย"
            aria-current={locale === 'th' ? 'true' : undefined}
            onNavigate={(event) => { event.preventDefault(); onChangeLocale('th'); }}>TH</Link>
        </div>
        <a className={`button primary ${styles.contact}`} href={`${localePath(locale)}#contact`}
          onClick={onCloseMenus}>{copy.talk}</a>
        <button className={styles.toggle} type="button" aria-label={mobileNavOpen ? copy.closeMenu : copy.openMenu}
          aria-expanded={mobileNavOpen} aria-controls="main-navigation" onClick={onToggleMobileNav}
          onKeyDown={(event) => { if (event.key === 'Escape') onCloseMenus(); }}>
          <span className={mobileNavOpen ? styles.cross : undefined} aria-hidden="true"><i /><i /></span>
        </button>
      </div>
    </header>
  );
}
