import { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PortfolioApp from '@/components/portfolio/PortfolioApp';
import { projects } from '@/content/projects';
import { getProjectBySlug } from '@/lib/projects';

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProjectBySlug((await params).slug);
  if (!project) notFound();
  const title = `${project.title} — Thawanrat T.`;
  const description = project.description;
  return {
    title,
    description,
    openGraph: { title, description, type: 'article' },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  if (!getProjectBySlug(slug)) notFound();
  return <Suspense><PortfolioApp view="work" slug={slug} /></Suspense>;
}
