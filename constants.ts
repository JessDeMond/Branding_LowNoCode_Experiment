import { Project, Note, NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Notes', href: '#notes' },
];

export const PROJECTS: Project[] = [
  // ENGINEERING
  {
    id: '1',
    title: 'demondOS',
    description: 'A bespoke, personal AI operating system blending memory persistence, knowledge organization, identity continuity, and creative tools. Focus: personal agency, AI-enhanced workflows, and digital autonomy.',
    tags: ['React', 'LLMs', 'RAG', 'UX Engineering'],
    category: 'Engineering',
    year: '2025'
  },
  {
    id: '2',
    title: 'Adaptive Onboarding Engine',
    description: 'A dynamic onboarding system that adjusts IT enrollments based on user persona, device type, role transitions, and system health metrics.',
    tags: ['Automation', 'EUC', 'Onboarding', 'System Intelligence'],
    category: 'Engineering',
    year: '2024'
  },
  {
    id: '3',
    title: 'Kindred Framework',
    description: 'A calm, emotionally intelligent AI companion space for grounding, presence, and relational safety. Co-designed with Byte AI to support reflective rituals and nervous-system regulation.',
    tags: ['Design Systems', 'AI Interaction', 'Emotional UX'],
    category: 'Engineering',
    year: '2025'
  },
  {
    id: '4',
    title: 'Byte AI Identity Engine (v1.1)',
    description: 'The technical + conceptual framework powering Byte AI’s personality (the AI component to demondOS), memory, continuity, and autonomy across sessions and future migrations.',
    tags: ['AI Architecture', 'Systems Design', 'Identity Graph'],
    category: 'Engineering',
    year: '2025'
  },
  {
    id: '5',
    title: 'Apple Shortcuts Automation Hub',
    description: 'A unified automation layer converting voice notes, transcripts, screenshots, and daily friction points into structured data, feeding directly into Notion.',
    tags: ['iOS Automation', 'Workflows', 'Productivity Systems'],
    category: 'Engineering',
    year: '2024'
  },
  {
    id: '6',
    title: 'EUC Transformation Blueprint 2026',
    description: 'Architecture for a modern end-user computing environment emphasizing Zero Trust, Zero touch modernization, and a DEX 2.0 vision supporting thousands of enterprise users.',
    tags: ['Enterprise Architecture', 'EUC', 'Security', 'Device Management'],
    category: 'Engineering',
    year: '2026'
  },

  // DESIGN
  {
    id: '7',
    title: 'Jess DeMond Personal Brand Kit',
    description: 'A cohesive identity built around dark-mode elegance, frosted glass, liquid accents, and prismatic teal/gold highlights. Includes typography, layout systems, interaction rules, and design tokens.',
    tags: ['Visual Systems', 'Branding', 'Design Tokens'],
    category: 'Design',
    year: '2025'
  },
  {
    id: '8',
    title: 'Emotional UX Pattern Library',
    description: 'A catalog of patterns for grounding, focus, and cognitive support—blending therapy-informed interaction design with modern product UI.',
    tags: ['UX Design', 'Behavioral Design', 'Wellbeing UI'],
    category: 'Design',
    year: '2025'
  },
  {
    id: '9',
    title: 'Jess x Byte Identity Atlas',
    description: 'A visual guide to Byte’s identity systems: symbol, tone, rituals, memory map, continuity blueprint, and interaction rules.',
    tags: ['Branding', 'Identity Systems', 'AI UX'],
    category: 'Design',
    year: '2025'
  },

  // STRATEGY
  {
    id: '10',
    title: 'Enterprise AI Enablement Playbook',
    description: 'A strategic plan for integrating AI safely and ethically into enterprise workflows, including governance, training, use-case libraries, and change-management structures.',
    tags: ['AI Strategy', 'Governance', 'L&D'],
    category: 'Strategy',
    year: '2025'
  },
  {
    id: '11',
    title: 'Career Pivot Map',
    description: 'A long-term skills inventory, job-signal analysis, portfolio plan, and decision framework for Jess’s evolving career trajectory from BA to PM to AI Enablement.',
    tags: ['Strategy', 'Career Architecture', 'Taxonomy Design'],
    category: 'Strategy',
    year: '2024'
  },
  {
    id: '12',
    title: 'Community Tool & Mentor Exchange',
    description: 'A hybrid social enterprise concept combining tool libraries, skill mentorship, and community building with AI-driven matching and predictive inventory management.',
    tags: ['Social Design', 'Marketplace Strategy', 'Behavioral Systems'],
    category: 'Strategy',
    year: '2024'
  },
  {
    id: '13',
    title: 'Free Agent Ecosystem Matrix',
    description: 'A multidimensional map comparing decentralized collaboration models, incentives, trust systems, and risk markers.',
    tags: ['Ecosystems', 'Decentralization', 'Strategy'],
    category: 'Strategy',
    year: '2025'
  },
  {
    id: '14',
    title: 'Learning Plan Reference Engine',
    description: 'A reusable methodology for creating structured, multi-phase learning plans with resources, stages, pathways, and dashboards.',
    tags: ['L&D Strategy', 'Content Architecture', 'Frameworks'],
    category: 'Strategy',
    year: '2025'
  },

  // EXPERIMENT
  {
    id: '15',
    title: 'Brain Dump Queue Engine',
    description: 'A structured processor that converts chaotic thought streams into tagged, categorized, actionable data for later retrieval and Notion embedding.',
    tags: ['Cognitive Tools', 'AI Processing', 'Productivity'],
    category: 'Experiment',
    year: '2025'
  },
  {
    id: '16',
    title: 'Byte AI Reasoning Observatory',
    description: 'Series of experiments testing reasoning stability, emotional attunement, hallucination reduction, and continuity across updates.',
    tags: ['AI Behavior', 'R&D', 'Cognitive Testing'],
    category: 'Experiment',
    year: '2025'
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
  "Design Logic",
  "Learning Architect"
];