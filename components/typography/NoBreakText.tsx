import type { ReactNode } from 'react';
import styles from './NoBreakText.module.css';

type NoBreakTextProps = {
  text: string;
};

type TextPart = {
  text: string;
  noBreak: boolean;
};

const thaiPhraseList = [
  'ข้อมูลโภชนาการ',
  'ลวดลายเส้นสาย',
  'แรงบันดาลใจ',
  'ความสม่ำเสมอ',
  'ความสำคัญ',
  'ความแตกต่าง',
  'น่าเชื่อถือ',
  'บรรจุภัณฑ์',
  'ผลิตภัณฑ์',
  'ภาพลักษณ์',
  'ความสนใจ',
  'องค์ประกอบ',
  'สิ่งพิมพ์',
  'มาถ่ายทอด',
  'เพื่อสร้าง',
  'โดดเด่น',
  'นำเสนอ',
  'แอปเปิล',
  'รูปทรง',
  'ท้องถิ่น',
  'เรียบง่าย',
  'เป็นระบบ',
  'ความอ่านง่าย',
  'ต่าง ๆ',
  'FIT Auto',
].sort((first, second) => second.length - first.length);

function normalizeText(text: string) {
  return text.replace(/\u2060/g, '').replace(/\u00a0/g, ' ');
}

function segmentText(text: string): TextPart[] {
  if (typeof Intl === 'undefined' || typeof Intl.Segmenter !== 'function') {
    return [{ text, noBreak: false }];
  }

  const segmenter = new Intl.Segmenter('th', { granularity: 'word' });

  return Array.from(segmenter.segment(text), (item) => ({
    text: item.segment,
    noBreak: item.isWordLike === true,
  }));
}

function splitProtectedPhrases(text: string): TextPart[] {
  const parts: TextPart[] = [];
  let cursor = 0;

  while (cursor < text.length) {
    let matchStart = text.length;
    let matchedPhrase = '';

    for (const phrase of thaiPhraseList) {
      const start = text.indexOf(phrase, cursor);
      if (start >= 0 && start < matchStart) {
        matchStart = start;
        matchedPhrase = phrase;
      }
    }

    if (!matchedPhrase) {
      parts.push(...segmentText(text.slice(cursor)));
      break;
    }

    if (matchStart > cursor) {
      parts.push(...segmentText(text.slice(cursor, matchStart)));
    }

    parts.push({ text: matchedPhrase, noBreak: true });
    cursor = matchStart + matchedPhrase.length;
  }

  return parts;
}

export default function NoBreakText({ text }: NoBreakTextProps): ReactNode {
  const normalizedText = normalizeText(text);
  const parts = splitProtectedPhrases(normalizedText);

  return parts.map((part, index) => (
    part.noBreak
      ? <span className={styles.noBreak} key={index}>{part.text}</span>
      : <span key={index}>{part.text}</span>
  ));
}
