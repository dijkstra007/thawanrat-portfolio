import type { ProjectRecord } from '@/lib/types';

export const featuredProjectIds = [2, 3, 5, 4];

export const projects: ProjectRecord[] = [
  {
    id: 1,
    category: 'Packaging',
    year: '2023',
    visual: 'fruit',
    copy: {
      en: {
        title: 'Thai fruit packaging',
        meta: 'Packaging · Branding · Award',
        description:
          'A playful packaging system that turns familiar Thai fruits into sculptural gifts. The collection balances shelf impact, cultural character, and production-ready construction.',
      },
      th: {
        title: 'บรรจุภัณฑ์ผลไม้ไทย',
        meta: 'บรรจุภัณฑ์ · แบรนดิ้ง · รางวัล',
        description:
          'ระบบบรรจุภัณฑ์ที่สนุกและเปลี่ยนผลไม้ไทยคุ้นตาให้กลายเป็นของขวัญรูปทรงประติมากรรม คอลเลกชันนี้ผสมผสานความโดดเด่นบนชั้นวาง เอกลักษณ์ทางวัฒนธรรม และโครงสร้างที่พร้อมผลิตจริง',
      },
    },
    images: [
      '/assets/thawanrat-packaging.png',
      '/assets/thawanrat-packaging.png',
      '/assets/thawanrat-packaging.png',
    ],
  },
  {
    id: 2,
    category: 'Campaign',
    year: '2026',
    visual: 'blue',
    copy: {
      en: {
        title: 'PTT Station — Self Serve',
        meta: 'Campaign · Branding · Digital · Print · OOH',
        description:
          'A clear, approachable campaign system that guides customers through a new self-service experience across station, print, and digital touchpoints.',
      },
      th: {
        title: 'PTT Station — Self Serve',
        meta: 'แคมเปญ · แบรนดิ้ง · ดิจิทัล · งานพิมพ์ · สื่อนอกบ้าน',
        description:
          'ระบบแคมเปญที่ชัดเจนและเข้าถึงง่าย ช่วยแนะนำลูกค้าให้ใช้งานรูปแบบบริการตนเองใหม่ผ่านสื่อภายในสถานี งานพิมพ์ และสื่อดิจิทัล',
      },
    },
  },
  {
    id: 3,
    category: 'Campaign',
    year: '2025',
    visual: 'water',
    copy: {
      en: {
        title: 'Singha Water × PTT Station',
        meta: 'Campaign · Packaging · Digital',
        description:
          'A lively co-branded launch toolkit built for visibility at retail, with a flexible graphic system spanning packaging, point-of-sale, and social content.',
      },
      th: {
        title: 'Singha Water × PTT Station',
        meta: 'แคมเปญ · บรรจุภัณฑ์ · ดิจิทัล',
        description:
          'ชุดสื่อเปิดตัวร่วมแบรนด์ที่มีชีวิตชีวาและโดดเด่นในพื้นที่ค้าปลีก พร้อมระบบกราฟิกที่ยืดหยุ่นสำหรับบรรจุภัณฑ์ สื่อ ณ จุดขาย และคอนเทนต์โซเชียล',
      },
    },
  },
  {
    id: 4,
    category: 'Branding',
    year: '2025',
    visual: 'ink',
    copy: {
      en: {
        title: 'Protech Product Communication',
        meta: 'Graphic Design · Catalogue · Product',
        description:
          'A precise communication system for a technical brand, unifying catalogue structure, product storytelling, and a confident visual identity.',
      },
      th: {
        title: 'การสื่อสารผลิตภัณฑ์ Protech',
        meta: 'กราฟิกดีไซน์ · แคตตาล็อก · ผลิตภัณฑ์',
        description:
          'ระบบการสื่อสารที่แม่นยำสำหรับแบรนด์สายเทคนิค เชื่อมโครงสร้างแคตตาล็อก การเล่าเรื่องผลิตภัณฑ์ และอัตลักษณ์ภาพที่มั่นใจเข้าไว้ด้วยกัน',
      },
    },
  },
  {
    id: 5,
    category: 'Packaging',
    year: '2024',
    visual: 'peach',
    copy: {
      en: {
        title: 'Chaidi brand packaging',
        meta: 'Packaging Design',
        description:
          'Warm, friendly packaging that uses illustration and tactile color to make a regional product range feel contemporary and giftable.',
      },
      th: {
        title: 'บรรจุภัณฑ์แบรนด์ Chaidi',
        meta: 'ออกแบบบรรจุภัณฑ์',
        description:
          'บรรจุภัณฑ์ที่อบอุ่นและเป็นมิตร ใช้ภาพประกอบและสีสันที่ชวนสัมผัส ทำให้ผลิตภัณฑ์ท้องถิ่นดูร่วมสมัยและเหมาะสำหรับมอบเป็นของขวัญ',
      },
    },
  },
  {
    id: 6,
    category: 'Campaign',
    year: '2025',
    visual: 'electric',
    copy: {
      en: {
        title: 'EV Station launch',
        meta: 'Campaign · OOH · Digital',
        description:
          'A high-energy launch campaign translating technical benefits into bold, memorable messages for outdoor and digital media.',
      },
      th: {
        title: 'แคมเปญเปิดตัว EV Station',
        meta: 'แคมเปญ · สื่อนอกบ้าน · ดิจิทัล',
        description:
          'แคมเปญเปิดตัวพลังสูงที่ถ่ายทอดประโยชน์เชิงเทคนิคให้กลายเป็นข้อความที่โดดเด่นและจดจำง่ายสำหรับสื่อนอกบ้านและสื่อดิจิทัล',
      },
    },
  },
  {
    id: 7,
    category: 'Branding',
    year: '2024',
    visual: 'paper',
    copy: {
      en: {
        title: 'Field notes identity',
        meta: 'Identity · Editorial · Print',
        description:
          'An editorial identity with a quiet typographic voice, modular layouts, and a tactile material palette designed for long-form storytelling.',
      },
      th: {
        title: 'อัตลักษณ์ Field notes',
        meta: 'อัตลักษณ์ · งานบรรณาธิการ · งานพิมพ์',
        description:
          'อัตลักษณ์งานบรรณาธิการที่มีน้ำเสียงทางตัวอักษรอย่างสงบ ใช้เลย์เอาต์แบบโมดูลาร์และโทนวัสดุที่ชวนสัมผัส เพื่อการเล่าเรื่องที่มีรายละเอียด',
      },
    },
  },
  {
    id: 8,
    category: 'Digital',
    year: '2025',
    visual: 'violet',
    copy: {
      en: {
        title: 'Always-on content series',
        meta: 'Social · Motion · Content',
        description:
          'A modular content toolkit that helps a busy brand move quickly while keeping every post unmistakably consistent.',
      },
      th: {
        title: 'ซีรีส์คอนเทนต์ Always-on',
        meta: 'โซเชียล · โมชัน · คอนเทนต์',
        description:
          'ชุดเครื่องมือคอนเทนต์แบบโมดูลาร์ที่ช่วยให้แบรนด์ที่ต้องสื่อสารอย่างต่อเนื่องทำงานได้รวดเร็ว พร้อมรักษาความสม่ำเสมอของทุกโพสต์',
      },
    },
  },
  {
    id: 9,
    category: 'Digital',
    year: '2024',
    visual: 'sun',
    copy: {
      en: {
        title: 'Retail seasonal toolkit',
        meta: 'Retail · Social · OOH',
        description:
          'A bright seasonal campaign translated across retail displays, social templates, and outdoor placements.',
      },
      th: {
        title: 'ชุดสื่อฤดูกาลสำหรับร้านค้า',
        meta: 'รีเทล · โซเชียล · สื่อนอกบ้าน',
        description:
          'แคมเปญตามฤดูกาลที่สดใสและนำไปปรับใช้กับสื่อหน้าร้าน เทมเพลตโซเชียล และสื่อนอกบ้านได้อย่างเป็นระบบ',
      },
    },
  },
  {
    id: 10,
    category: 'Branding',
    year: '2023',
    visual: 'red',
    copy: {
      en: {
        title: 'Annual report system',
        meta: 'Editorial · Infographic',
        description:
          'A disciplined annual-report system that makes complex information feel human, structured, and easy to navigate.',
      },
      th: {
        title: 'ระบบรายงานประจำปี',
        meta: 'งานบรรณาธิการ · อินโฟกราฟิก',
        description:
          'ระบบรายงานประจำปีที่เป็นระเบียบ ช่วยทำให้ข้อมูลซับซ้อนดูเข้าถึงง่าย มีโครงสร้าง และนำทางได้อย่างชัดเจน',
      },
    },
  },
  {
    id: 11,
    category: 'Packaging',
    year: '2023',
    visual: 'lime',
    copy: {
      en: {
        title: 'Future food concept',
        meta: 'Concept · Packaging',
        description:
          'A forward-looking packaging concept pairing experimental form with an optimistic, high-contrast visual language.',
      },
      th: {
        title: 'คอนเซ็ปต์อาหารแห่งอนาคต',
        meta: 'คอนเซ็ปต์ · บรรจุภัณฑ์',
        description:
          'คอนเซ็ปต์บรรจุภัณฑ์ที่มองไปข้างหน้า จับคู่รูปทรงทดลองเข้ากับภาษาภาพที่มองโลกในแง่ดีและมีคอนทราสต์ชัดเจน',
      },
    },
  },
  {
    id: 12,
    category: 'Digital',
    year: '2024',
    visual: 'slate',
    copy: {
      en: {
        title: 'Product story catalogue',
        meta: 'Catalogue · Digital',
        description:
          'A flexible catalogue experience that turns a dense product range into a clear, useful, and visually coherent story.',
      },
      th: {
        title: 'แคตตาล็อกเรื่องราวผลิตภัณฑ์',
        meta: 'แคตตาล็อก · ดิจิทัล',
        description:
          'ประสบการณ์แคตตาล็อกที่ยืดหยุ่น ช่วยเปลี่ยนกลุ่มผลิตภัณฑ์จำนวนมากให้กลายเป็นเรื่องราวที่ชัดเจน ใช้งานได้จริง และมีภาพรวมที่กลมกลืน',
      },
    },
  },
];
