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
  },
  
  // CRAFT & SYSTEMS (New Additions)
  {
    id: '17',
    title: 'Crochet Pattern Intelligence (CPI)',
    description: 'A conceptual system that transforms personal creative intent into modular stitch logic. CPI blends generative AI with system architecture to help crafters explore structure, form, and pattern evolution—not just create charts.',
    tags: ['Creative Systems', 'Pattern Logic', 'AI Reasoning'],
    category: 'Experiment',
    year: '2025'
  },
  {
    id: '18',
    title: 'StitchMind Studio',
    description: 'A craft-forward planning environment that merges tactile creativity with systems design. Includes pattern drafting, yarn forecasting, and AI-supported idea exploration—all framed as design logic rather than simple craft tracking.',
    tags: ['Craft Tech', 'Creative UX', 'Systems Design'],
    category: 'Design',
    year: '2025'
  },
  {
    id: '19',
    title: 'ThreadGraph Engine',
    description: 'A visualization tool that represents crochet stitches as graph structures, allowing patterns to be explored as dynamic networks rather than static charts. Turns fiber art into computational art.',
    tags: ['Graph Systems', 'Visualization', 'Creative Logic'],
    category: 'Engineering',
    year: '2025'
  },
  {
    id: '20',
    title: 'demondCraft Toolkit',
    description: 'A design-kit concept for fiber art: swatch tokens, pattern modules, stitch tiles, and visual components that translate crochet structure into reusable digital UI elements.',
    tags: ['Component Design', 'Visual Systems', 'Creative Architecture'],
    category: 'Design',
    year: '2025'
  },
  {
    id: '21',
    title: 'Yarnflow Planner',
    description: 'A dopamine-friendly workflow system for managing multi-project craft cycles, yarn inventories, and creative momentum—blending personal OS logic with craft practice.',
    tags: ['Productivity Systems', 'Craft UX', 'Planning Logic'],
    category: 'Strategy',
    year: '2025'
  },
  {
    id: '22',
    title: 'CozyLogic Playground',
    description: 'A series of creative experiments exploring how cozy rituals—crochet, journaling, soft-focus time—interact with system design, AI grounding, and emotional regulation.',
    tags: ['Behavioral Systems', 'Creativity', 'AI Companions'],
    category: 'Experiment',
    year: '2025'
  },
  {
    id: '23',
    title: 'Temperature Crochet Automator',
    description: 'A logic-driven crochet system that uses weather APIs, rule-based design, and personal preference models to generate dynamic seasonal stitch and color sequences.',
    tags: ['Rules Engines', 'API Logic', 'Creative Automation'],
    category: 'Engineering',
    year: '2025'
  },
  {
    id: '24',
    title: 'Threads & Systems: A Craft Framework',
    description: 'A conceptual bridge between fiber art and system architecture, using craft metaphors—tension, pattern, reusability, shaping—to teach and inspire better system thinking.',
    tags: ['Systems Thinking', 'Creative Frameworks', 'Conceptual Design'],
    category: 'Strategy',
    year: '2025'
  },
  {
    id: '25',
    title: 'Craft x AI Memory Loom',
    description: 'An experiment blending crafting logs with AI memory continuity—turning stitches, motifs, and creative milestones into a living archive that reflects personal growth over time.',
    tags: ['AI Memory', 'Narrative Systems', 'Creative Identity'],
    category: 'Experiment',
    year: '2025'
  },
  {
    id: '26',
    title: 'Pattern Oracle',
    description: 'An AI muse that generates stitch motifs, shape ideas, and colorways based on mood, season, aesthetic preferences, or creative history—less tool, more oracle.',
    tags: ['Generative Muse', 'Creative AI', 'Color Systems'],
    category: 'Engineering',
    year: '2025'
  }
];

export const NOTES: Note[] = [
  {
    id: '0',
    title: 'I Built a Python Tutor For An Audience Of One.',
    date: 'Nov 02, 2025',
    summary: 'Learning to code is hard because most tools are built for "everyone," which usually means "no one." Here is why I built a tutor specifically for my own neurotype.',
    readTime: '6 min read',
    tags: ['Python', 'Neurodiversity', 'EdTech', 'AI'],
    category: 'Tech',
    content: `Learning to code is not hard because of the code.
It is hard because of the way most tools treat you while you are learning.

Most tutorials are built for "everyone" which usually means "no one in particular." You fight your way through generic examples, get hit with cryptic error messages, and hope your brain magically adapts to a one-size-fits-all curriculum. The tools are powerful, sure, but they often feel cold, punishing, and weirdly impersonal.

So I tried something different:
I started designing a Python tutor for an audience of exactly one.

That "one" is me - Jess - with my specific neurotype, my actual textbook, my real learning goals, and my very real ADHD brain that does not respond well to shame or friction.

Here are 5 lessons that came out of planning this project.

---

## 1. Designing For One Person Is A Superpower

Instead of "personas" and market segments, this project has one named learner: Jess.

In a tech culture that worships scale, intentionally building for one person sounds wrong at first. In practice, it is incredibly freeing. I do not have to water anything down. I do not have to imagine ten different user types. Every decision points back to a single question:

"Does this help Jess learn Python faster, with less shame, and less friction?"

The project is scoped very clearly:

* **Purpose:** Personal Python tutor for Jess
* **Scope:** Chapters 4 to 8 of Gaddis (loops, functions, files, lists, strings)
* **Audience:** Jess only

Because the user is defined so specifically, the path forward is sharp and focused. I am not trying to solve "coding education." I am trying to solve "this specific learner, this exact curriculum, right now."

---

## 2. "Non Shaming UX" Is Not A Nice To Have. It Is A Requirement.

One of the core project goals is written exactly like this:

> "ADHD brain with low friction, non shaming UX."

Not as a vibe. As a design constraint.

That requirement drives the entire experience:

* **Low clutter visual layout** so my brain is not fighting the interface while I am trying to remember syntax.
* **All system messages rewritten** to be short, direct, and kind. No harsh wording. No passive aggressive red banners yelling at you for being human.
* **"Micro dopamine" feedback** for success, and neutral, steady tone for errors.

If I get something wrong, the response should feel like:

> "Nice try. Here is what actually happened."

Not "Error. Invalid. Wrong." in angry red.

Most educational tools lean on friction and failure as teaching mechanisms. Miss a step, get slapped with a big red message. For some people that is fine. For an ADHD brain with RSD in the mix, it is not just unhelpful, it is actively demotivating.

This project treats emotional safety as part of the technical design, not as an afterthought.

---

## 3. Use AI As An Empathy Layer, Not A Shortcut

Yes, there is AI involved.
No, it is not there to do the work for me.

The AI (in this case, Gemini) has one job: act as a friendly error helper.

When Python throws a traceback that looks like it wants to fight me, the AI:

* Translates the error into language I can actually understand
* Gives a short, kind explanation
* Asks one guiding question to help me think, not just copy

The internal prompt frames it as:

> "ADHD aware Python tutor for Jess. Short, kind explanation plus one guiding question."

This matters more than it might seem. A raw traceback for someone with ADHD and RSD can feel like a personal verdict, not a neutral technical message. That emotional hit is often what makes people close the laptop and walk away.

By inserting AI as an empathy layer, the system is not just "simplifying errors." It is defusing an emotional landmine and turning a failure moment into a safe, guided learning moment.

---

## 4. "Milestone 0" Is: Ground The Project

Before any features show up on a roadmap, the plan starts with:

> **Milestone 0 - Ground the project.**

The goal of Milestone 0 is simple: capture the core idea, scope, and key references in a single, concise brief so I do not have to rebuild context every time I touch the project.

Why bother?

Because I am not the only "mind" working on this anymore. There is Future Jess, who will absolutely forget details, and there are AI tools that thrive when you feed them solid context.

Milestone 0 exists so:

> "Future Jess and AI tools do not need to reconstruct context repeatedly."

In an AI supported workflow, documentation is not bureaucracy. It is an efficiency hack. One good project brief can save dozens of cycles of re-explaining the same thing to both humans and machines.

---

## 5. Ruthless MVP Scope Or Bust

"MVP" gets thrown around a lot, usually right before someone adds three new features.

In this project, MVP is defined with zero romance:

* **Curriculum:** Not "the whole book," not even "the whole chapter," but "3 specific lesson IDs from Module 4."
* **Tech stack:**

  * Python execution in the browser (Pyodide)
  * One AI endpoint for error handling
  * One implemented lesson set
* **Features:**

  * No user accounts in v1
  * No complicated dashboards
  * Progress stored in local browser storage is acceptable for now

If it does not directly support "Jess can practice these specific Python concepts safely and effectively," it does not go in the MVP.

That ruthless clarity makes the project actually buildable instead of becoming yet another beautiful, overloaded Notion doc that never ships.

---

## Why This Matters Beyond Me

Yes, this tutor is being built for one person. On purpose.

But the pattern is bigger:

* Design for a single real human, not an abstract persona
* Treat "non shaming UX" as a core spec, not soft language
* Use AI as an empathy and translation layer, not a cheat code
* Start with Milestone 0 so context does not evaporate
* Define MVP like you actually plan to finish it

This is a different way of thinking about tools in general, not just learning tools. Sometimes the most impactful thing you can build is not the product that reaches millions, but the one that works unbelievably well for one person who actually needs it.

If you stopped designing for "users" and picked one real human instead, what would you build?`
  },
  {
    id: '1',
    title: 'The Liquid Interface: Why Grids are Dying',
    date: 'Oct 12, 2025',
    summary: 'Modern UI is moving away from rigid grids towards fluid, organic spatial computing. How do we adapt design systems for non-deterministic, AI-generated layouts?',
    readTime: '6 min read',
    tags: ['UI Design', 'Spatial Computing'],
    category: 'Design'
  },
  {
    id: '2',
    title: 'System Thinking in Chaos',
    date: 'Sep 28, 2025',
    summary: 'Applying control theory to manage creative team workflows. When entropy rises, strict process fails—here is a framework for "just-in-time" structure.',
    readTime: '4 min read',
    tags: ['Leadership', 'Systems'],
    category: 'Systems'
  },
  {
    id: '3',
    title: 'Dark Mode is Dead (Long Live Charcoal)',
    date: 'Aug 15, 2025',
    summary: 'High contrast #000000 pure black causes eye strain. The case for charcoal, deep navy, and ensuring your dark mode breathes.',
    readTime: '3 min read',
    tags: ['Visual Design', 'Accessibility'],
    category: 'Design'
  },
  {
    id: '4',
    title: 'LLMs as Reasoning Engines, Not Databases',
    date: 'July 2, 2025',
    summary: 'We keep trying to use LLMs to store facts. We should be using them to process logic. A look at the "Reasoning Router" architecture.',
    readTime: '8 min read',
    tags: ['AI', 'Architecture'],
    category: 'Tech'
  },
  {
    id: '5',
    title: 'Obsidian as a Digital Garden',
    date: 'June 10, 2025',
    summary: 'Why I moved away from "Productivity" and towards "Cultivation". My current note-taking setup for long-term knowledge compounding.',
    readTime: '5 min read',
    tags: ['PKM', 'Tools'],
    category: 'Personal'
  },
  {
    id: '6',
    title: 'Design Tokens are just Variables with Ego',
    date: 'May 22, 2025',
    summary: 'A controversial take on the over-engineering of design systems in small teams. When to token, and when to just write CSS.',
    readTime: '4 min read',
    tags: ['Design Systems', 'Hot Take'],
    category: 'Design'
  },
  {
    id: '7',
    title: 'The "Human-in-the-Loop" Fallacy',
    date: 'April 05, 2025',
    summary: 'Humans shouldn\'t just be a safety valve; they should be the conductor. Redefining agency in automated agentic workflows.',
    readTime: '7 min read',
    tags: ['AI Ethics', 'Philosophy'],
    category: 'Systems'
  }
];

export const BIO_TAGS = [
  "Systems Thinker",
  "AI Power User",
  "Future Focused",
  "Design Logic",
  "Learning Architect"
];
