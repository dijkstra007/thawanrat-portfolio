import type { Localized } from '@/lib/types';

type HomepageCopy = {
  hero: { label: string; title: [string, string]; intro: [string, string]; work: string; contact: string; caption: string; alt: string };
  disciplines: string[];
  services: { label: string; title: [string, string]; note: string; related: string; items: { title: string; body: string }[] };
  process: { label: string; title: [string, string]; steps: { title: string; body: string }[] };
  contact: { label: string; title: [string, string]; body: string; line: string; fastwork: string };
  notice: string;
};

export const homepageCopy: Localized<HomepageCopy> = {
  en: {
    hero: {
      label: 'FAHWORKS / GRAPHIC DESIGN',
      title: ['Ideas, shaped', 'through design'],
      intro: ['Digital, print, and packaging design.', 'Open to team opportunities and freelance projects.'],
      work: 'View work', contact: 'Get in touch',
      caption: 'Illustrative mockup based on selected work.',
      alt: 'An illustrative still life featuring ChaiLai packaging, a Protech brochure, a Mango Smith brand card, and blue Fahworks print boards',
    },
    disciplines: ['Brand identity', 'Packaging', 'Print & event', 'Social & digital'],
    services: {
      label: 'WHAT I CAN HELP WITH', title: ['Big picture.', 'Small details. All covered.'],
      note: 'Starting something new or giving your brand a fresh look? Let’s make the right things, together.', related: 'See related work',
      items: [
        { title: 'Brand identity', body: 'Logos, visual identities, and brand systems that feel like you.' },
        { title: 'Packaging & labels', body: 'Packaging concepts, labels, and artwork ready for production.' },
        { title: 'Print & event', body: 'Brochures, sales materials, and graphics for events and campaigns.' },
        { title: 'Social & digital', body: 'Social content, cover designs, and promotional graphics that connect.' },
      ],
    },
    process: {
      label: 'HOW WE WORK TOGETHER', title: ['Good work starts', 'with a conversation.'],
      steps: [
        { title: 'Tell me your idea', body: 'Share your brief, goals, and the things you have in mind.' },
        { title: 'Find the right direction', body: 'We agree on the scope, quote, and creative direction.' },
        { title: 'Make it real', body: 'Design, discuss, and refine the work together.' },
        { title: 'Ready to go', body: 'Receive the final files for the agreed uses.' },
      ],
    },
    contact: {
      label: 'LET’S MAKE SOMETHING GOOD', title: ['Your next idea.', 'Let’s make it happen.'],
      body: 'Tell me what you’re working on, what you need, and when you need it. We’ll take it from there.',
      line: 'Chat on LINE', fastwork: 'Find me on Fastwork',
    },
    notice: 'Includes client and employer work, shown for portfolio purposes.',
  },
  th: {
    hero: {
      label: 'FAHWORKS / งานออกแบบกราฟิก', title: ['จากไอเดีย', 'สู่งานออกแบบ'],
      intro: ['ออกแบบสื่อออนไลน์ สิ่งพิมพ์ และแพ็กเกจจิ้ง', 'พร้อมร่วมงานกับทีมและรับงานฟรีแลนซ์'],
      work: 'ดูผลงาน', contact: 'ติดต่อจ้างงาน', caption: 'ภาพจำลองจากผลงานที่เลือกมา',
      alt: 'ภาพจำลองบรรจุภัณฑ์ ChaiLai โบรชัวร์ Protech การ์ดแบรนด์ Mango Smith และสื่อสิ่งพิมพ์ Fahworks สีน้ำเงิน',
    },
    disciplines: ['แบรนดิ้ง', 'บรรจุภัณฑ์', 'สิ่งพิมพ์และอีเวนต์', 'สื่อออนไลน์'],
    services: {
      label: 'บริการออกแบบ', title: ['มองภาพใหญ่', 'ใส่ใจทุกรายละเอียด'],
      note: 'เริ่มแบรนด์ใหม่หรืออยากปรับภาพลักษณ์ให้สดใสขึ้น มาช่วยกันทำไอเดียให้เป็นจริง', related: 'ดูตัวอย่างงาน',
      items: [
        { title: 'อัตลักษณ์แบรนด์', body: 'โลโก้ อัตลักษณ์ และระบบภาพที่บอกตัวตนของแบรนด์คุณ' },
        { title: 'บรรจุภัณฑ์และฉลาก', body: 'แนวคิดบรรจุภัณฑ์ ฉลากสินค้า และอาร์ตเวิร์กพร้อมผลิต' },
        { title: 'สิ่งพิมพ์และอีเวนต์', body: 'โบรชัวร์ สื่อการขาย และกราฟิกสำหรับงานอีเวนต์หรือแคมเปญ' },
        { title: 'โซเชียลและดิจิทัล', body: 'ภาพคอนเทนต์ ปกบทความ และกราฟิกโปรโมชันสำหรับสื่อออนไลน์' },
      ],
    },
    process: {
      label: 'ทำงานด้วยกันอย่างไร', title: ['งานที่ดี', 'เริ่มจากการคุยกัน'],
      steps: [
        { title: 'เล่าไอเดียให้ฟัง', body: 'ส่งบรีฟ เป้าหมาย และสิ่งที่อยากได้มาให้ดูก่อน' },
        { title: 'หาทิศทางที่ใช่', body: 'ตกลงขอบเขต ราคา และแนวทางการออกแบบร่วมกัน' },
        { title: 'ลงมือสร้างงาน', body: 'ออกแบบ พูดคุย และปรับรายละเอียดไปด้วยกัน' },
        { title: 'พร้อมนำไปใช้', body: 'รับไฟล์สุดท้ายสำหรับการใช้งานตามที่ตกลง' },
      ],
    },
    contact: {
      label: 'มาสร้างงานดี ๆ ด้วยกัน', title: ['มีไอเดียต่อไปแล้ว?', 'มาทำให้เกิดขึ้นจริง'],
      body: 'เล่าให้ฟังว่ากำลังทำอะไร ต้องการงานแบบไหน และวางแผนใช้เมื่อไร แล้วมาคุยรายละเอียดกัน',
      line: 'ทัก LINE', fastwork: 'จ้างผ่าน Fastwork',
    },
    notice: 'รวมผลงานจากงานประจำและงานว่าจ้าง นำเสนอเพื่อประกอบแฟ้มผลงาน',
  },
};

export const homepageContact = {
  line: 'https://lin.ee/7CHOSkJ',
  fastwork: 'https://fastwork.co/byob/WaCznCMB23?openExternalBrowser=1&source=byob',
  email: 'fah.thawanrat001@gmail.com',
};
