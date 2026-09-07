import PortfolioApp from '@/components/portfolio/PortfolioApp';
import { workMetadata } from '@/lib/seo';

export const metadata = workMetadata('en');

export default function WorkPage() {
  return <PortfolioApp locale="en" view="work" />;
}
