import type { CategoryFilter, Localized, ProjectCategory } from '@/lib/types';

export type SiteCopy = {
  metadata: {
    title: string;
    description: string;
  };
  wordmarkAria: string;
  navigation: {
    work: string;
    about: string;
    experience: string;
    skills: string;
    contact: string;
    menuLabel: string;
    openMenu: string;
    closeMenu: string;
    languageLabel: string;
    switchToEnglish: string;
    switchToThai: string;
  };
  hero: {
    name: string;
    role: string;
    specialty: string;
    intro: string;
    workCta: string;
    resumeCta: string;
    resumeHref: string;
    awardAria: string;
    awardTitle: string;
    awardName: string;
    awardDetail: string;
  };
  about: {
    eyebrow: string;
    heading: [string, string];
    body: string;
    imageAlt: string;
    yearsValue: string;
    yearsLabel: string;
    aiValue: string;
    aiLabel: string;
  };
  experience: {
    eyebrow: string;
    heading: [string, string];
  };
  expertise: {
    eyebrow: string;
    heading: string;
    skillsEyebrow: string;
    skillsHeading: string;
    designTitle: string;
    productivityTitle: string;
  };
  education: {
    eyebrow: string;
    heading: [string, string];
    degree: string;
    program: string;
    school: string;
    years: string;
    languagesTitle: string;
    languages: string;
  };
  selectedWork: {
    eyebrow: string;
    heading: [string, string];
    viewAll: string;
  };
  archive: {
    eyebrow: string;
    heading: string;
  };
  footer: {
    eyebrow: string;
    heading: [string, string];
    note: [string, string];
    email: string;
    phoneDisplay: string;
    phoneHref: string;
    fastwork: string;
    linkedin: string;
  };
  caseStudy: {
    eyebrow: string;
    closeLabel: string;
    previousImageLabel: string;
    nextImageLabel: string;
    chooseImageLabel: string;
    showImagePrefix: string;
    imageLabel: string;
    zoomInLabel: string;
    zoomOutLabel: string;
    resetZoomLabel: string;
    zoomControlsLabel: string;
    openViewerLabel: string;
    closeViewerLabel: string;
    backLabel: string;
    nextLabel: string;
    categoryLabels: Record<ProjectCategory, string>;
  };
  workMenu: {
    typesLabel: string;
    featuredLabel: string;
    awardsLabel: string;
    types: Array<{ label: string; category: CategoryFilter }>;
    featured: Array<{ label: string; id: number }>;
    awards: Array<{ label: string; id: number }>;
  };
};

export const site = {
  assets: {
    logo: '/assets/logo-fahworks@4x.png',
    heroImage: '/assets/thawanrat-packaging.png',
    fahMark: '/assets/fah-signature.png',
    thaiStarMark: '/assets/thaistar-mark.png',
    aboutImage: '/assets/thawanrat-portrait.jpg',
  },
  copy: {
    en: {
      metadata: {
        title: 'Thawanrat T. — Graphic Designer',
        description:
          'Portfolio of Thawanrat T., a graphic designer specializing in packaging design and brand identity.',
      },
      wordmarkAria: 'Fahworks home',
      navigation: {
        work: 'Work',
        about: 'About',
        experience: 'Experience',
        skills: 'Skills',
        contact: 'Contact',
        menuLabel: 'Primary navigation',
        openMenu: 'Open menu',
        closeMenu: 'Close menu',
        languageLabel: 'Language',
        switchToEnglish: 'Switch to English',
        switchToThai: 'Switch to Thai',
      },
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
        imageAlt: 'Thawanrat smiling in a café',
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
        closeLabel: 'Close case study',
        previousImageLabel: 'Previous image',
        nextImageLabel: 'Next image',
        chooseImageLabel: 'Choose project image',
        showImagePrefix: 'Show image',
        imageLabel: 'image',
        zoomInLabel: 'Zoom in',
        zoomOutLabel: 'Zoom out',
        resetZoomLabel: 'Reset zoom',
        zoomControlsLabel: 'Image zoom controls',
        openViewerLabel: 'Open image viewer',
        closeViewerLabel: 'Close image viewer',
        backLabel: 'Back',
        nextLabel: 'Next',
        categoryLabels: {
          Packaging: 'PACKAGING DESIGN',
          Campaign: 'CAMPAIGN',
          Branding: 'BRANDING',
          Digital: 'DIGITAL / CONTENT',
        },
      },
      workMenu: {
        typesLabel: 'Type of work',
        featuredLabel: 'Featured',
        awardsLabel: 'More projects',
        types: [
          { label: 'Print / Packaging', category: 'Packaging' },
          { label: 'Branding', category: 'Branding' },
          { label: 'Digital / Content', category: 'Digital' },
          { label: 'Campaign', category: 'Campaign' },
        ],
        featured: [
          { label: 'Local Souvenir Packaging Design', id: 1 },
          { label: 'Protein Snake packaging', id: 7 },
        ],
        awards: [
          { label: 'Social Media Content Design', id: 2 },
          { label: 'Financial Data & Infographic Design', id: 3 },
          { label: 'Chailai Packaging Design', id: 4 },
          { label: 'Food & Beverage Graphic Design', id: 5 },
          { label: 'Green Tea Packaging Design', id: 6 },
        ],
      },
    },
    th: {
      metadata: {
        title: 'Thawanrat T. — นักออกแบบกราฟิก',
        description:
          'ผลงานของ Thawanrat T. นักออกแบบกราฟิกที่เชี่ยวชาญด้านการออกแบบบรรจุ\u2060ภัณฑ์และอัตลักษณ์แบรนด์',
      },
      wordmarkAria: 'หน้าแรกของ Fahworks',
      navigation: {
        work: 'ผลงาน',
        about: 'เกี่ยวกับฉัน',
        experience: 'ประสบการณ์',
        skills: 'ทักษะ',
        contact: 'ติดต่อ',
        menuLabel: 'เมนูหลัก',
        openMenu: 'เปิดเมนู',
        closeMenu: 'ปิดเมนู',
        languageLabel: 'ภาษา',
        switchToEnglish: 'เปลี่ยนเป็นภาษาอังกฤษ',
        switchToThai: 'เปลี่ยนเป็นภาษาไทย',
      },
      hero: {
        name: 'THAWANRAT T.',
        role: 'นักออกแบบกราฟิก',
        specialty: 'ออกแบบบรรจุ\u2060ภัณฑ์ • อัตลักษณ์แบรนด์',
        intro:
          'ฉันสร้างงานออกแบบที่ใส่ใจในรายละเอียด ครอบคลุมทั้งบรรจุ\u2060ภัณฑ์ งานพิมพ์ และสื่อดิจิทัล',
        workCta: 'ดูผลงาน',
        resumeCta: 'ดาวน์โหลดเรซูเม่',
        resumeHref:
          'https://drive.google.com/file/d/1b-SVyYHu0CdSU5SLMyX1NgUh5C1cqPtd/view?usp=drivesdk',
        awardAria: 'ผลงานที่ได้รับรางวัล',
        awardTitle: 'ผลงานที่ได้รับรางวัล',
        awardName: 'ThaiStar Packaging Awards 2023',
        awardDetail: 'รางวัลบรอนซ์ – บรรจุ\u2060ภัณฑ์อุปโภคบริโภคสำหรับนักศึกษา (ต้นแบบ)',
      },
      about: {
        eyebrow: 'เกี่ยวกับฉัน',
        heading: ['ออกแบบอย่างมีความหมาย', 'ตั้งแต่แนวคิดจนถึงการผลิต'],
        body:
          'ฉันเป็นนักออกแบบกราฟิกที่เชี่ยวชาญด้านบรรจุ\u2060ภัณฑ์ การสื่อสารแบรนด์ และอาร์ตเวิร์กที่พร้อมผลิตจริงสำหรับสื่อสิ่งพิมพ์และดิจิทัล',
        imageAlt: 'ธวันรัตน์กำลังยิ้มในคาเฟ่',
        yearsValue: '3+',
        yearsLabel: 'ปีแห่งประสบการณ์',
        aiValue: 'AI',
        aiLabel: 'เวิร์กโฟลว์ที่เสริมด้วย AI',
      },
      experience: {
        eyebrow: 'ประสบการณ์',
        heading: ['เส้นทางการทำงาน', 'ของฉัน'],
      },
      expertise: {
        eyebrow: 'ความเชี่ยวชาญ',
        heading: 'ฉันทำอะไรบ้าง',
        skillsEyebrow: 'ทักษะ',
        skillsHeading: 'เครื่องมือและทักษะ',
        designTitle: 'งานออกแบบ',
        productivityTitle: 'AI และการทำงาน',
      },
      education: {
        eyebrow: 'การศึกษา',
        heading: ['การออกแบบ', 'เพื่อการสื่อสาร'],
        degree: 'ปริญญาตรี',
        program: 'คณะศิลปกรรมศาสตร์ สาขาการออกแบบนิเทศศิลป์',
        school: 'มหาวิทยาลัยกรุงเทพ',
        years: '2019–2022',
        languagesTitle: 'ภาษา',
        languages: 'ไทย · อังกฤษ (พื้นฐาน)',
      },
      selectedWork: {
        eyebrow: 'ผลงานเด่น',
        heading: ['ผลงานที่', 'บอกเล่าเรื่องราวได้'],
        viewAll: 'ดูผลงานทั้งหมด',
      },
      archive: {
        eyebrow: 'ผลงานทั้งหมด',
        heading: 'ผลงานที่บอกเล่าเรื่องราวได้',
      },
      footer: {
        eyebrow: 'ติดต่อ',
        heading: ['มาสร้าง', 'สิ่งดี ๆ ด้วยกัน'],
        note: ['ฉันเปิดรับโอกาสใหม่ ๆ อยู่เสมอ', 'ติดต่อพูดคุยกันได้เลย'],
        email: 'fah.thawanrat001@gmail.com',
        phoneDisplay: '080-082-3850',
        phoneHref: '+66800823850',
        fastwork: 'https://fastwork.co/user/ffahworks',
        linkedin: 'https://www.linkedin.com/in/thawanrat-thaptit-2a7a672b9/',
      },
      caseStudy: {
        eyebrow: 'ผลงานเด่น',
        closeLabel: 'ปิดรายละเอียดผลงาน',
        previousImageLabel: 'ภาพก่อนหน้า',
        nextImageLabel: 'ภาพถัดไป',
        chooseImageLabel: 'เลือกภาพผลงาน',
        showImagePrefix: 'แสดงภาพที่',
        imageLabel: 'ภาพที่',
        zoomInLabel: 'ซูมเข้า',
        zoomOutLabel: 'ซูมออก',
        resetZoomLabel: 'รีเซ็ตการซูม',
        zoomControlsLabel: 'ตัวควบคุมการซูมภาพ',
        openViewerLabel: 'เปิดดูภาพขนาดใหญ่',
        closeViewerLabel: 'ปิดการดูภาพขนาดใหญ่',
        backLabel: 'ย้อนกลับ',
        nextLabel: 'ถัดไป',
        categoryLabels: {
          Packaging: 'ออกแบบบรรจุ\u2060ภัณฑ์',
          Campaign: 'แคมเปญ',
          Branding: 'แบรนดิ้ง',
          Digital: 'ดิจิทัล / คอนเทนต์',
        },
      },
      workMenu: {
        typesLabel: 'ประเภทงาน',
        featuredLabel: 'ผลงานเด่น',
        awardsLabel: 'ผลงานอื่น ๆ',
        types: [
          { label: 'งานพิมพ์ / บรรจุ\u2060ภัณฑ์', category: 'Packaging' },
          { label: 'แบรนดิ้ง', category: 'Branding' },
          { label: 'ดิจิทัล / คอนเทนต์', category: 'Digital' },
          { label: 'แคมเปญ', category: 'Campaign' },
        ],
        featured: [
          { label: 'การออกแบบบรรจุ\u2060ภัณฑ์ของฝากท้อง\u2060ถิ่น', id: 1 },
          { label: 'บรรจุ\u2060ภัณฑ์ Protein Snake', id: 7 },
        ],
        awards: [
          { label: 'การออกแบบคอนเทนต์สำหรับ Social Media', id: 2 },
          { label: 'การออกแบบข้อมูลการเงินและอินโฟกราฟิก', id: 3 },
          { label: 'การออกแบบบรรจุ\u2060ภัณฑ์ ChaiLai', id: 4 },
          { label: 'การออกแบบกราฟิกสำหรับอาหารและเครื่องดื่ม', id: 5 },
          { label: 'การออกแบบบรรจุ\u2060ภัณฑ์ชาเขียว', id: 6 },
        ],
      },
    },
  } satisfies Localized<SiteCopy>,
};
