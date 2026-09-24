import { homepageCopy } from '@/content/homepage';
import { site } from '@/content/site';
import { assetPath } from '@/lib/assets';
import type { Locale } from '@/lib/types';
import styles from './Footer.module.css';

export default function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className={styles.band}>
      <div className={`shell ${styles.footer}`}>
        <img className={styles.logo} src={assetPath(site.assets.logo)} alt={locale === 'th' ? 'โลโก้ Fahworks' : 'Fahworks'} width={88} height={16} loading="lazy" />
        <div className={styles.meta}>
          <p className={styles.copyright}>© 2026 Fahworks.</p>
          <p className={styles.notice}>{homepageCopy[locale].notice}</p>
        </div>
      </div>
    </footer>
  );
}
