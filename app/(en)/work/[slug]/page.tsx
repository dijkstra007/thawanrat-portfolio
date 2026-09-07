import { notFound } from 'next/navigation';
import PortfolioApp from '@/components/portfolio/PortfolioApp';
import JsonLd from '@/components/seo/JsonLd';
import { projects } from '@/content/projects';
import { getProjectBySlug } from '@/lib/projects';
import { projectMetadata, projectJsonLd } from '@/lib/seo';

export const dynamicParams = false;
export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const project = getProjectBySlug((await params).slug, 'en');
  if (!project) notFound();
  return projectMetadata(project, 'en');
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug, 'en');
  if (!project) notFound();
  return <><JsonLd data={projectJsonLd(project, 'en')} /><PortfolioApp locale="en" view="work" slug={slug} /></>;
}
