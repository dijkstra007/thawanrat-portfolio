import { experience } from '@/content/experience';
import { expertise } from '@/content/expertise';
import { designTools, productivityTools } from '@/content/skills';
import { site } from '@/content/site';
import type { Locale, Localized } from '@/lib/types';

type ResumeCopy = {
  pageLabel: string;
  backHome: string;
  eyebrow: string;
  name: string;
  nickname: string;
  role: string;
  summary: string;
  originalResume: string;
  exploreWork: string;
  location: string;
  portraitAlt: string;
  experienceHeading: string;
  educationHeading: string;
  recognitionHeading: string;
  awardDetail: string;
  sidebarLabel: string;
  expertiseHeading: string;
  toolsHeading: string;
  productivityHeading: string;
  languagesHeading: string;
  endEyebrow: string;
  endHeading: string;
};

const copy: Localized<ResumeCopy> = {
  en: {
    pageLabel: 'Resume',
    backHome: 'Back to home',
    eyebrow: 'Resume / The person behind the work',
    name: 'Thawanrat T.',
    nickname: 'Call me Fah.',
    role: 'Graphic Designer',
    summary:
      'Bangkok-based graphic designer with 3+ years of experience across brand identity, packaging, and print and digital communication. I develop visual ideas into clear, production-ready artwork.',
    originalResume: 'Open original resume',
    exploreWork: 'Explore work',
    location: 'Based in Bangkok, Thailand',
    portraitAlt: 'Thawanrat T. (Fah)',
    experienceHeading: 'Experience',
    educationHeading: 'Education',
    recognitionHeading: 'Recognition',
    awardDetail: 'Bronze · Student Consumer Package (Prototype)',
    sidebarLabel: 'Skills and expertise',
    expertiseHeading: 'Expertise',
    toolsHeading: 'Design tools',
    productivityHeading: 'AI & productivity',
    languagesHeading: 'Languages',
    endEyebrow: 'From experience to ideas',
    endHeading: 'See it in the work.',
  },
  th: {
    pageLabel: 'เรซูเม่',
    backHome: 'กลับหน้าแรก',
    eyebrow: 'เรซูเม่ / คนเบื้องหลังงานออกแบบ',
    name: 'ธวันรัตน์',
    nickname: 'เรียกฟ้าก็ได้ค่ะ',
    role: 'นักออกแบบกราฟิก',
    summary:
      'กราฟิกดีไซเนอร์ในกรุงเทพฯ มีประสบการณ์กว่า 3 ปีด้านอัตลักษณ์แบรนด์ บรรจุภัณฑ์ และการสื่อสารผ่านสื่อสิ่งพิมพ์และดิจิทัล ดูแลตั้งแต่การพัฒนาแนวคิดจนถึงอาร์ตเวิร์กพร้อมผลิต',
    originalResume: 'เปิดเรซูเม่ต้นฉบับ',
    exploreWork: 'ดูผลงาน',
    location: 'กรุงเทพฯ ประเทศไทย',
    portraitAlt: 'ธวันรัตน์ (ฟ้า)',
    experienceHeading: 'ประสบการณ์',
    educationHeading: 'การศึกษา',
    recognitionHeading: 'รางวัล',
    awardDetail: 'รางวัล Bronze · Student Consumer Package (Prototype)',
    sidebarLabel: 'ทักษะและความเชี่ยวชาญ',
    expertiseHeading: 'ความเชี่ยวชาญ',
    toolsHeading: 'เครื่องมือออกแบบ',
    productivityHeading: 'AI และการทำงาน',
    languagesHeading: 'ภาษา',
    endEyebrow: 'จากประสบการณ์สู่ไอเดีย',
    endHeading: 'รู้จักกันผ่านผลงาน',
  },
};

const expertiseTitles: Localized<string[]> = {
  en: ['Packaging', 'Brand identity', 'Visual communication', 'AI workflow'],
  th: ['บรรจุภัณฑ์', 'อัตลักษณ์แบรนด์', 'การสื่อสารด้วยภาพ', 'เวิร์กโฟลว์ AI'],
};

function getExpertise(locale: Locale) {
  return expertise[locale].map((group, index) => ({
    title: expertiseTitles[locale][index],
    description: group
      .slice(index === 3 ? 2 : 1)
      .join(' · ')
      .replace(/\u2060/g, ''),
  }));
}

export const resume = {
  copy,
  portrait: site.assets.aboutImage,
  contact: {
    email: site.copy.en.footer.email,
    phoneDisplay: site.copy.en.footer.phoneDisplay,
    phoneHref: site.copy.en.footer.phoneHref,
    linkedin: site.copy.en.footer.linkedin,
    originalResume: site.copy.en.hero.resumeHref,
  },
  experience,
  expertise: { en: getExpertise('en'), th: getExpertise('th') },
  education: { en: site.copy.en.education, th: site.copy.th.education },
  awardName: site.copy.en.hero.awardName,
  designTools,
  productivityTools,
};
