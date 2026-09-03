import { featuredProjectIds, projects } from '@/content/projects';
import type { CategoryFilter, Locale, Project, ProjectRecord } from '@/lib/types';

function localizeProject(project: ProjectRecord, locale: Locale): Project {
  const { copy, categoryLabel, localizedImages, ...details } = project;
  return {
    ...details,
    ...(localizedImages ? { images: localizedImages[locale] } : {}),
    ...(categoryLabel ? { categoryLabel: categoryLabel[locale] } : {}),
    ...copy[locale],
  };
}

export function getProjectById(id: number, locale: Locale = 'en') {
  const project = projects.find((item) => item.id === id);
  if (!project) {
    throw new Error(`Unknown project id: ${id}`);
  }
  return localizeProject(project, locale);
}

export function getFeaturedProjects(locale: Locale = 'en') {
  return featuredProjectIds.map((id) => getProjectById(id, locale));
}

export function filterProjects(filter: CategoryFilter, locale: Locale = 'en') {
  const matchingProjects = filter === 'All'
    ? projects
    : projects.filter((project) => project.category === filter);

  return matchingProjects.map((project) => localizeProject(project, locale));
}

export function adjacentProject(current: Project, offset: number, locale: Locale = 'en') {
  const index = projects.findIndex((project) => project.id === current.id);
  const nextProject = projects[(index + offset + projects.length) % projects.length];
  return getProjectById(nextProject.id, locale);
}

export function hasPreviousProject(current: Project) {
  const index = projects.findIndex((project) => project.id === current.id);
  return index > 0;
}
