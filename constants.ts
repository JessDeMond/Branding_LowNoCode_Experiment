import { Project, Note, NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Notes', href: '#notes' },
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Sentient Interfaces',
    description: 'An exploration into AI-driven UI patterns that predict user intent before interaction.',
    tags: ['React', 'AI', 'UX Research'],
    category: 'Engineering',
    year: '2023'
  },
  {
    id: '2',
    title: 'Void System Design',
    description: 'A comprehensive design system for high-frequency trading platforms focusing on data density and clarity.',
    tags: ['Figma', 'Design Systems', 'FinTech'],
    category: 'Design',
    year: '2023'
  },
  {
    id: '3',
    title: 'Echo Analytics',
    description: 'Real-time data visualization dashboard for distributed IoT sensor networks.',
    tags: ['D3.js', 'WebSocket', 'IoT'],
    category: 'Engineering',
    year: '2022'
  },
  {
    id: '4',
    title: 'Neural Narrative',
    description: 'Generative storytelling engine helping authors overcome writer’s block.',
    tags: ['LLM', 'Python', 'Creative Tools'],
    category: 'Experiment',
    year: '2023'
  },
  {
    id: '5',
    title: 'Chroma Finance',
    description: 'Mobile-first banking experience redefining how Gen Z interacts with traditional savings accounts.',
    tags: ['React Native', 'Mobile', 'Strategy'],
    category: 'Strategy',
    year: '2022'
  },
  {
    id: '6',
    title: 'Aether Lens',
    description: 'AR experiment overlaying historical architectural data onto modern cityscapes.',
    tags: ['Three.js', 'WebXR', 'History'],
    category: 'Experiment',
    year: '2021'
  },
  {
    id: '7',
    title: 'Flow State Editor',
    description: 'A distraction-free markdown editor for technical writers with built-in diagramming tools.',
    tags: ['Electron', 'Typescript', 'Productivity'],
    category: 'Engineering',
    year: '2021'
  }
];

export const NOTES: Note[] = [
  {
    id: '1',
    title: 'The Liquid Interface',
    date: 'Oct 12, 2023',
    summary: 'Why modern UI is moving away from rigid grids towards fluid, organic spatial computing.',
  },
  {
    id: '2',
    title: 'System Thinking in Chaos',
    date: 'Sep 28, 2023',
    summary: 'Applying control theory to manage creative team workflows and output consistency.',
  },
  {
    id: '3',
    title: 'Dark Mode is Dead',
    date: 'Aug 15, 2023',
    summary: 'Or rather, high contrast pure black is. The case for charcoal and deep navy.',
  }
];

export const BIO_TAGS = [
  "Systems Thinker",
  "AI Power User",
  "Future Focused",
  "React",
  "Product Design"
];