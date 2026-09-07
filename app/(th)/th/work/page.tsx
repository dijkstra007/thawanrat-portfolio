import PortfolioApp from '@/components/portfolio/PortfolioApp';
import { workMetadata } from '@/lib/seo';

export const metadata = workMetadata('th');

export default function WorkPage() {
  return <PortfolioApp locale="th" view="work" />;
}
