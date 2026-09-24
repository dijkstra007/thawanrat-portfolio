import { homepageContact, homepageCopy } from '@/content/homepage';
import type { Locale } from '@/lib/types';
import styles from './Contact.module.css';

export default function Contact({ locale }: { locale: Locale }) {
  const copy = homepageCopy[locale].contact;
  return (
    <section className={`shell ${styles.contact}`} id="contact" aria-labelledby="contact-title">
      <p className={styles.eyebrow}>{copy.label}</p>
      <h2 id="contact-title">{copy.title[0]}{' '}<br />{copy.title[1]}</h2>
      <p className={styles.body}>{copy.body}</p>
      <div className={styles.actions}>
        <a className={`button ${styles.line}`} href={homepageContact.line} target="_blank" rel="noopener noreferrer">{copy.line}</a>
        <a className={`button ${styles.fastwork}`} href={homepageContact.fastwork} target="_blank" rel="noopener noreferrer">{copy.fastwork}</a>
      </div>
      <a className={styles.email} href={`mailto:${homepageContact.email}`}>{homepageContact.email}</a>
    </section>
  );
}
