const siteUrl = 'https://www.joeyalvarado.dev';
const personId = `${siteUrl}/about#joey-alvarado`;

const sameAs = [
  'https://github.com/DigitalOutbreak',
  'https://www.linkedin.com/in/joeyalvarado',
  'https://x.com/joeydgafos',
];

const person = {
  '@type': 'Person',
  '@id': personId,
  name: 'Joey Alvarado',
  url: `${siteUrl}/about`,
  image: `${siteUrl}/joey-alvarado-portrait.jpg`,
  jobTitle: 'Software Developer',
  description:
    'Chicago-area software developer building Rust backend systems, TypeScript applications, websites, and internal tools for small businesses.',
  sameAs,
  knowsAbout: [
    'Rust programming',
    'Backend development',
    'TypeScript',
    'JavaScript',
    'React',
    'Next.js',
    'Astro',
    'Browser extensions',
    'Web development',
    'Internal tools',
  ],
};

export const homeStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      name: 'Joey Alvarado',
      alternateName: 'joeyalvarado.dev',
      url: `${siteUrl}/`,
      author: { '@id': personId },
    },
    person,
  ],
};

export const aboutStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${siteUrl}/about#profile-page`,
  url: `${siteUrl}/about`,
  name: 'About Joey Alvarado',
  mainEntity: person,
};
