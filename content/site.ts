import type { CategoryFilter } from '@/lib/types';

export const site = {
  wordmarkAria: 'Fahworks home',
  hero: {
    name: 'THAWANRAT T.',
    role: 'Graphic Designer',
    specialty: 'Packaging Design • Brand Identity',
    intro: 'I create thoughtful visual solutions across packaging, print, and digital media.',
    workCta: 'View My Work',
    resumeCta: 'Download Resume',
    resumeHref:
      'https://drive.google.com/file/d/1b-SVyYHu0CdSU5SLMyX1NgUh5C1cqPtd/view?usp=drivesdk',
    awardAria: 'Award winning project',
    awardTitle: 'Award winning project',
    awardName: 'ThaiStar Packaging Awards 2023',
    awardDetail: 'Bronze Award – Student Consumer Package (Prototype)',
  },
  about: {
    eyebrow: 'About me',
    heading: ['Designing with purpose,', 'from concept to production.'],
    body:
      'I’m a graphic designer specializing in packaging, brand communication, and production-ready artwork across print and digital media.',
    yearsValue: '3+',
    yearsLabel: 'Years experience',
    aiValue: 'AI',
    aiLabel: 'Enhanced workflow',
  },
  experience: {
    eyebrow: 'Experience',
    heading: ['My professional', 'journey.'],
  },
  expertise: {
    eyebrow: 'Expertise',
    heading: 'What I do.',
    skillsEyebrow: 'Skills',
    skillsHeading: 'Tools & skills.',
    designTitle: 'Design',
    productivityTitle: 'AI & Productivity',
  },
  education: {
    eyebrow: 'Education',
    heading: ['Communication', 'Design.'],
    degree: 'Bachelor’s Degree',
    program: 'School of Fine and Applied Arts, Communication Design',
    school: 'Bangkok University',
    years: '2019–2022',
    languagesTitle: 'Languages',
    languages: 'Thai · English (Basic)',
  },
  selectedWork: {
    eyebrow: 'Selected work',
    heading: ['Work that', 'speaks.'],
    viewAll: 'View All Projects',
  },
  archive: {
    eyebrow: 'Selected work',
    heading: 'Work that speaks.',
  },
  footer: {
    eyebrow: 'Contact',
    heading: ['Let’s create', 'something great.'],
    note: ['I’m currently open to new opportunities.', 'Feel free to reach out.'],
    email: 'fah.thawanrat001@gmail.com',
    phoneDisplay: '080-082-3850',
    phoneHref: '+66800823850',
    fastwork: 'https://fastwork.co/user/ffahworks',
    linkedin: 'https://www.linkedin.com/in/thawanrat-thaptit-2a7a672b9/',
  },
  caseStudy: {
    eyebrow: 'Selected work',
  },
  workMenu: {
    typesLabel: 'Type of work',
    featuredLabel: 'Featured',
    awardsLabel: 'Awards',
    types: [
      { label: 'Print / Packaging', category: 'Packaging' as CategoryFilter },
      { label: 'Branding', category: 'Branding' as CategoryFilter },
      { label: 'Digital / Content', category: 'Digital' as CategoryFilter },
    ],
    featured: [
      { label: 'PTT Station', id: 2 },
      { label: 'Singha Water × PTT Station', id: 3 },
    ],
    awards: [
      { label: 'Thai fruit packaging', id: 1 },
      { label: 'Chaidi brand packaging', id: 5 },
    ],
  },
  assets: {
    logo: '/assets/logo-fahworks@4x.png',
    heroImage: '/assets/thawanrat-packaging.png',
    fahMark: '/assets/fah-signature.png',
    thaiStarMark: '/assets/thaistar-mark.png',
    aboutImage: '/assets/thawanrat-portrait.jpg',
  },
};
