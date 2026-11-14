export function JsonLd() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ruhul Ameen',
    jobTitle: 'Creative Developer & Video Retention Engineer',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lucknow',
      addressRegion: 'Uttar Pradesh',
      addressCountry: 'India',
    },
    url: 'https://ruhulameen.com',
    sameAs: [
      'https://github.com',
      'https://twitter.com',
      'https://youtube.com',
      'https://linkedin.com',
    ],
    knowsAbout: [
      'Video Editing',
      'Thumbnail Design',
      'Next.js Web Development',
      'Three.js 3D Interactive Graphics',
      'Technical SEO',
      'AI Workflow Automation',
    ],
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Ruhul Ameen Creative Studio',
    image: 'https://ruhulameen.com/og-image.jpg',
    telephone: '+919999999999',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lucknow',
      addressRegion: 'Uttar Pradesh',
      addressCountry: 'India',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}
