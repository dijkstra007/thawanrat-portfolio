import PortfolioApp from '@/components/portfolio/PortfolioApp';
import JsonLd from '@/components/seo/JsonLd';
import { resumeMetadata, resumeJsonLd } from '@/lib/seo';

export const metadata = resumeMetadata('th');

export default function ResumePage() {
  return <><JsonLd data={resumeJsonLd('th')} /><PortfolioApp locale="th" view="resume" /></>;
}
