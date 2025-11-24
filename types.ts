export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  category: 'Engineering' | 'Design' | 'Strategy' | 'Experiment';
  year?: string;
}

export interface Note {
  id: string;
  title: string;
  date: string;
  summary: string;
  content?: string;
  readTime?: string;
  tags?: string[];
  category?: 'Design' | 'Tech' | 'Systems' | 'Personal';
}

export interface NavItem {
  label: string;
  href: string;
}

export type ViewState = 'home' | 'work' | 'notes';