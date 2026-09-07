import PortfolioApp from '@/components/portfolio/PortfolioApp';
import JsonLd from '@/components/seo/JsonLd';
import { homeMetadata, personJsonLd } from '@/lib/seo';

export const metadata = homeMetadata('en');

export default function HomePage() {
  return <><JsonLd data={personJsonLd('en')} /><PortfolioApp locale="en" /></>;
}
