import type { APIRoute } from 'astro';
import { projects } from '../data/projects';

const siteUrl = 'https://www.joeyalvarado.dev';

const projectLinks = projects
  .map((project) => {
    const repositoryNote = project.repositoryNote ? ` ${project.repositoryNote}` : '';
    return `- [${project.name}](${siteUrl}/projects/${project.slug}): ${project.title} ${project.summary}${repositoryNote}`;
  })
  .join('\n');

const content = `# Joey Alvarado

> Joey Alvarado is a software developer in the Chicago area with experience shipping websites and internal tools for small businesses. His current technical focus includes Rust, backend systems, TypeScript, and practical web development.

Joey's professional background combines hands-on development with project delivery. He builds client websites, dashboards, and CRM workflows, and he uses focused software projects to demonstrate systems thinking, testing, and backend development.

Primary skills include Rust, TypeScript, JavaScript, Python, HTML, CSS, React, Next.js, Astro, SQL, Git, GitHub, and Figma. Joey is open to software development opportunities.

## Candidate profile

- [Home](${siteUrl}/): Short introduction, skills, experience, and featured work
- [Résumé](${siteUrl}/resume): Web résumé with experience, projects, and technical skills
- [Downloadable résumé](${siteUrl}/joey-alvarado-resume.pdf): One-page PDF résumé
- [Work history](${siteUrl}/work): Freelance development and previous web development and project management experience
- [About](${siteUrl}/about): Personal background, approach to learning software, and interests outside work
- [Contact](${siteUrl}/contact): Professional contact options

## Selected projects

${projectLinks}

## Professional profiles

- [GitHub](https://github.com/DigitalOutbreak): Public source code and project repositories
- [LinkedIn](https://www.linkedin.com/in/joeyalvarado): Professional profile and work history
- [X](https://x.com/joeynalvarado): Software, technology, and personal updates

## Writing

- [Notes](${siteUrl}/blog): Technical notes about Rust, backend systems, browser extensions, and local-first tooling
`;

export const GET: APIRoute = () =>
  new Response(`${content.trim()}\n`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
