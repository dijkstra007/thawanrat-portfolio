export type Locale = 'en' | 'th';

export type Localized<T> = Record<Locale, T>;

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
  images?: string[];
};

export type ProjectRecord = Omit<Project, 'title' | 'meta' | 'description'> & {
  copy: Localized<Pick<Project, 'title' | 'meta' | 'description'>>;
};

export type Experience = {
  role: string;
  company: string;
  year: string;
  detail: string;
};
