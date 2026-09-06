import { Suspense } from 'react';
import type { Metadata } from 'next';
import PortfolioApp from '@/components/portfolio/PortfolioApp';

export const metadata: Metadata = {
  title: 'Work — Thawanrat T.',
  description: 'Explore packaging, branding, digital design, and campaign projects by Thawanrat T.',
};

export default function WorkPage() {
  return <Suspense><PortfolioApp view="work" /></Suspense>;
}
