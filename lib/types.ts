export type ProjectCategory = 'Packaging' | 'Campaign' | 'Branding' | 'Digital';

export type CategoryFilter = ProjectCategory | 'All';

export type ProjectVisual =
  | 'fruit'
  | 'blue'
  | 'water'
  | 'ink'
  | 'peach'
  | 'electric'
  | 'paper'
  | 'violet'
  | 'sun'
  | 'red'
  | 'lime'
  | 'slate';

export type Project = {
  id: number;
  title: string;
  category: ProjectCategory;
  meta: string;
  year: string;
  visual: ProjectVisual;
  description: string;
};

export type Experience = {
  role: string;
  company: string;
  year: string;
  detail: string;
};
