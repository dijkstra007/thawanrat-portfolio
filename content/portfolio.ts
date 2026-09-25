import type { CategoryFilter, Localized } from '@/lib/types';
import type { SiteCopy } from './site';

type PortfolioCopy = {
  navigation: { work: string; services: string; resume: string; talk: string; openMenu: string; closeMenu: string; menuLabel: string; languageLabel: string };
  backToTop: string;
  selectedWork: SiteCopy['selectedWork'];
  workDescription: string;
  filterLabel: string;
  filters: { category: CategoryFilter; label: string }[];
};

export const portfolioCopy: Localized<PortfolioCopy> = {
  en: {
    navigation: { work: 'Work', services: 'Services', resume: 'Resume', talk: 'Let’s talk', openMenu: 'Open navigation', closeMenu: 'Close navigation', menuLabel: 'Main navigation', languageLabel: 'Language' },
    backToTop: 'Back to top',
    selectedWork: { eyebrow: 'SELECTED WORK', heading: ['Different briefs.', 'Same love for design.'], viewAll: 'View all work' },
    workDescription: 'A selection of brand identities, packaging, and visual stories. Made with purpose. And a little play.',
    filterLabel: 'Filter work by category',
    filters: [{ category: 'All', label: 'All work' }, { category: 'Branding', label: 'Brand identity' }, { category: 'Packaging', label: 'Packaging' }, { category: 'Campaign', label: 'Print & event' }, { category: 'Digital', label: 'Social & digital' }],
  },
  th: {
    navigation: { work: 'ผลงาน', services: 'บริการ', resume: 'เรซูเม่', talk: 'คุยเรื่องโปรเจกต์', openMenu: 'เปิดเมนู', closeMenu: 'ปิดเมนู', menuLabel: 'เมนูหลัก', languageLabel: 'ภาษา' },
    backToTop: 'กลับขึ้นด้านบน',
    selectedWork: { eyebrow: 'ผลงานที่เลือกมา', heading: ['ต่างโจทย์ ต่างไอเดีย', 'ความใส่ใจเหมือนเดิม'], viewAll: 'ดูผลงานทั้งหมด' },
    workDescription: 'ส่วนหนึ่งของงานแบรนดิ้ง บรรจุภัณฑ์ และการสื่อสารผ่านภาพ ที่ตั้งใจทำให้ใช่และมีบุคลิก',
    filterLabel: 'กรองประเภทผลงาน',
    filters: [{ category: 'All', label: 'ทั้งหมด' }, { category: 'Branding', label: 'แบรนดิ้ง' }, { category: 'Packaging', label: 'บรรจุภัณฑ์' }, { category: 'Campaign', label: 'สิ่งพิมพ์และอีเวนต์' }, { category: 'Digital', label: 'สื่อออนไลน์' }],
  },
};
