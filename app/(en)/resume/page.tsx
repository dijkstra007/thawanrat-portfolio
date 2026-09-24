import PortfolioApp from '@/components/portfolio/PortfolioApp';
import JsonLd from '@/components/seo/JsonLd';
import { resumeMetadata, resumeJsonLd } from '@/lib/seo';

export const metadata = resumeMetadata('en');

export default function ResumePage() {
  return <><JsonLd data={resumeJsonLd('en')} /><PortfolioApp locale="en" view="resume" /></>;
}
