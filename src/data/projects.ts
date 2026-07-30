export interface Project {
  slug: string;
  number: string;
  type: string;
  name: string;
  title: string;
  summary: string;
  tags: string[];
  repository?: string;
  live?: string;
  packageUrl?: string;
  image?: string;
  imageAlt?: string;
  problem: string;
  contribution: string[];
  decisions: string[];
  verification: string[];
}

export const projects: Project[] = [
  {
    slug: 'local-web-clipper',
    number: '01',
    type: 'Browser extension',
    name: 'Local Web Clipper',
    title: 'Save web content as Markdown without requiring Obsidian.',
    summary:
      'A fork of Obsidian Web Clipper with local-folder, Downloads, and Clipboard destinations added without rewriting the extraction and template pipeline.',
    tags: ['TypeScript', 'Browser extensions', 'File System Access API'],
    repository: 'https://github.com/DigitalOutbreak/local-web-clipper',
    problem:
      'The upstream clipper produces useful Markdown, but its normal workflow assumes Obsidian. I wanted the same extraction and template behavior with destinations that also work for plain local files.',
    contribution: [
      'Added a small destination abstraction after Markdown generation so the existing extraction, filters, highlights, reader, and YouTube behavior could remain unchanged.',
      'Implemented local-directory saving, a browser Downloads fallback, and Clipboard output.',
      'Kept the original project attribution and documented where the fork differs from upstream.',
    ],
    decisions: [
      'Use the File System Access API only after explicit user permission.',
      'Persist the selected directory handle in IndexedDB and request permission again when needed.',
      'Keep unsupported browsers useful through relative Downloads paths instead of failing.',
      'Sanitize filenames and add a timestamp when a local file already exists.',
    ],
    verification: [
      'Build the Chromium extension and load the generated dist folder as an unpacked extension.',
      'Run the existing test suite with npm test.',
      'Check local folder, Downloads, and Clipboard output separately because each destination has different browser constraints.',
    ],
  },
  {
    slug: 'cramforge',
    number: '02',
    type: 'Study tooling',
    name: 'CramForge',
    title: 'Turn DRM-free EPUBs into local reading and study material.',
    summary:
      'A local-first Next.js starter that imports owned books, exposes chapter content, and creates Markdown study packs without bundling private books or locking users to one model provider.',
    tags: ['Next.js', 'TypeScript', 'EPUB', 'Local-first'],
    repository: 'https://github.com/DigitalOutbreak/cramforge',
    problem:
      'I wanted a reusable study workspace for books I own without checking copyrighted source material into a public repository or requiring one AI provider.',
    contribution: [
      'Built an EPUB import workflow that creates a local catalog and chapter reader.',
      'Generated a predictable Markdown study-pack structure for summaries, flashcards, quizzes, cram notes, and agent instructions.',
      'Kept the starter empty so other people can add only material they have the right to use.',
    ],
    decisions: [
      'Treat Markdown as the handoff format between the reader, the user, and whichever coding agent or model they choose.',
      'Store imported source material locally instead of shipping books with the repository.',
      'Separate import scripts, reader routes, book assets, and generated study materials so each part can be replaced independently.',
    ],
    verification: [
      'Run the production build and lint checks.',
      'Import a DRM-free EPUB and confirm its manifest, chapters, assets, and study-pack files are created.',
      'Open the imported book in the chapter reader and confirm the generated Markdown can be used outside the app.',
    ],
  },
  {
    slug: 'workflow',
    number: '03',
    type: 'Developer tooling',
    name: 'Workflow',
    title: 'Reusable project scaffolding for AI-assisted coding.',
    summary:
      'A public package with product and marketing-site setup paths, shared project context, focused feature workflows, and delivery guidance across several coding agents.',
    tags: ['Agent skills', 'npm', 'Project scaffolding'],
    repository: 'https://github.com/DigitalOutbreak/workflow',
    packageUrl: 'https://www.npmjs.com/package/@digitaloutbreak/workflow',
    problem:
      'Starting projects with different coding agents kept producing the same missing context, inconsistent setup, and delivery questions. I wanted one repeatable starting point that still leaves room for the project itself.',
    contribution: [
      'Created separate workflow-init and site-init paths for product applications and marketing sites.',
      'Packaged reusable context documents, feature and cleanup skills, and delivery guidance for multiple coding agents.',
      'Added idempotent setup behavior so an existing project can be inventoried or refreshed without blindly replacing its files.',
    ],
    decisions: [
      'Use the open agent-skills standard where possible instead of tying the package to one coding agent.',
      'Keep project strategy and delivery context in normal Markdown files that remain useful without an agent.',
      'Separate marketing-site setup from application feature workflows because they need different levels of process.',
    ],
    verification: [
      'Install the package into a temporary project and inspect the generated files.',
      'Run the product and site setup paths independently.',
      'Use npm package dry runs and local install checks before publishing package changes.',
    ],
  },
  {
    slug: 'world-of-doors',
    number: '04',
    type: 'Client work',
    name: 'World of Doors',
    title: 'Website and internal tools for an operating service business.',
    summary:
      'Ongoing client work spanning the public website, local-search pages, dashboard and CRM planning, and customer workflows.',
    tags: ['Astro', 'Web development', 'Internal tools', 'CRM'],
    live: 'https://worldofdoors.org',
    image: '/projects/world-of-doors.png',
    imageAlt: 'World of Doors website shown on a desktop browser',
    problem:
      'The business needs a trustworthy public site that generates local leads, plus clearer internal workflows after a customer submits a form or calls.',
    contribution: [
      'Maintain and improve the public website, service pages, local-search content, and conversion paths.',
      'Work on internal dashboards, CRM workflows, and planning around how leads and jobs move through the business.',
      'Handle the work as an ongoing client relationship rather than a one-time page build.',
    ],
    decisions: [
      'Keep the public marketing surface separate from private operational tooling.',
      'Prioritize service clarity, local proof, and contact paths before adding decorative features.',
      'Treat CRM and workflow changes as business-process work, not just interface work.',
    ],
    verification: [
      'Check the public production routes on desktop and mobile after releases.',
      'Review forms, calls to action, service-page navigation, and local content as complete customer paths.',
      'Keep private operational details out of the public case study while linking to the production website as visible proof.',
    ],
  },
];

export const featuredProjects = [
  projects.find((project) => project.slug === 'local-web-clipper')!,
  projects.find((project) => project.slug === 'cramforge')!,
  projects.find((project) => project.slug === 'world-of-doors')!,
];
