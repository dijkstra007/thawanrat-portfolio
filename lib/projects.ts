import { featuredProjectIds, projects } from '@/content/projects';
import type { CategoryFilter, Project } from '@/lib/types';

export function getProjectById(id: number) {
  const project = projects.find((item) => item.id === id);
  if (!project) {
    throw new Error(`Unknown project id: ${id}`);
  }
  return project;
}

export function getFeaturedProjects() {
  return featuredProjectIds.map((id) => getProjectById(id));
}

export function filterProjects(filter: CategoryFilter) {
  if (filter === 'All') return projects;
  return projects.filter((project) => project.category === filter);
}

export function adjacentProject(current: Project, offset: number) {
  const index = projects.findIndex((project) => project.id === current.id);
  return projects[(index + offset + projects.length) % projects.length];
}

export function hasPreviousProject(current: Project) {
  const index = projects.findIndex((project) => project.id === current.id);
  return index > 0;
}
