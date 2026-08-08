import { siteConfig } from './site-config';

/**
 * Generate Schema.org Organization JSON-LD
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': `${siteConfig.domain}/#organization`,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteConfig.domain,
    logo: `${siteConfig.domain}/airplane.webp`,
    image: `${siteConfig.domain}/airplane.webp`,
    description: siteConfig.defaultDescription,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.contact.address,
      addressLocality: siteConfig.contact.city,
      addressCountry: siteConfig.contact.country,
    },
    sameAs: [
      siteConfig.social.telegram,
      siteConfig.social.instagram,
      siteConfig.social.twitter,
      siteConfig.social.linkedin,
    ],
    priceRange: '$$',
  };
}

/**
 * Generate Schema.org WebSite JSON-LD with Sitelinks Search Box
 */
export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.domain}/#website`,
    url: siteConfig.domain,
    name: siteConfig.name,
    description: siteConfig.defaultDescription,
    publisher: {
      '@id': `${siteConfig.domain}/#organization`,
    },
    inLanguage: 'fa-IR',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.domain}/flights?origin={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate Schema.org BreadcrumbList JSON-LD
 */
export function getBreadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item.startsWith('http') ? item.item : `${siteConfig.domain}${item.item.startsWith('/') ? item.item : `/${item.item}`}`,
    })),
  };
}

/**
 * Generate Schema.org FAQPage JSON-LD
 */
export function getFAQPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate Schema.org Service JSON-LD for travel products
 */
export function getTravelServiceSchema(serviceName: string, description: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    serviceType: serviceName,
    provider: {
      '@type': 'TravelAgency',
      name: siteConfig.name,
      url: siteConfig.domain,
    },
    areaServed: 'IR',
    description,
    url: `${siteConfig.domain}${path}`,
  };
}
