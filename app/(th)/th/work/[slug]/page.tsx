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
  const project = getProjectBySlug((await params).slug, 'th');
  if (!project) notFound();
  return projectMetadata(project, 'th');
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug, 'th');
  if (!project) notFound();
  return <><JsonLd data={projectJsonLd(project, 'th')} /><PortfolioApp locale="th" view="work" slug={slug} /></>;
}
