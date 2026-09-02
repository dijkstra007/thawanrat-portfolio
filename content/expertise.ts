import type { Localized } from '@/lib/types';

type ExpertiseGroup = [string, ...string[]];

export const expertise: Localized<ExpertiseGroup[]> = {
  en: [
    ['Packaging', 'Packaging design', 'Die-line construction', 'Production-ready artwork'],
    ['Brand Identity', 'Brand identities', 'Visual systems', 'Corporate communication'],
    ['Visual Communication', 'Campaign assets', 'Print & digital', 'Out-of-home advertising'],
    ['AI Workflow', 'AI-enhanced workflow', 'Creative development', 'Visual exploration'],
  ],
  th: [
    ['บรรจุ\u2060ภัณฑ์', 'ออกแบบบรรจุ\u2060ภัณฑ์', 'การสร้างไดคัท', 'อาร์ตเวิร์กพร้อมผลิต'],
    ['อัตลักษณ์แบรนด์', 'อัตลักษณ์แบรนด์', 'ระบบภาพลักษณ์', 'การสื่อสารองค์กร'],
    ['การสื่อสารด้วยภาพ', 'สื่อสำหรับแคมเปญ', 'งานพิมพ์และดิจิทัล', 'โฆษณานอกบ้าน'],
    ['เวิร์กโฟลว์ AI', 'กระบวนการทำงานที่เสริมด้วย AI', 'พัฒนาความคิดสร้างสรรค์', 'สำรวจแนวทางภาพ'],
  ],
};
