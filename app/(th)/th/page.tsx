import PortfolioApp from '@/components/portfolio/PortfolioApp';
import JsonLd from '@/components/seo/JsonLd';
import { homeMetadata, personJsonLd } from '@/lib/seo';

export const metadata = homeMetadata('th');

export default function HomePage() {
  return <><JsonLd data={personJsonLd('th')} /><PortfolioApp locale="th" /></>;
}
