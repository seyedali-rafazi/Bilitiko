import type { Metadata } from 'next';
import { siteConfig } from './site-config';

interface MetadataProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noindex?: boolean;
  type?: 'website' | 'article';
  keywords?: string[];
}

/**
 * Utility to generate Next.js Metadata for any page
 */
export function constructMetadata({
  title,
  description,
  path = '',
  image = siteConfig.ogImage,
  noindex = false,
  type = 'website',
  keywords = [],
}: MetadataProps = {}): Metadata {
  const fullTitle = title ? siteConfig.titleTemplate.replace('%s', title) : siteConfig.defaultTitle;
  const fullDescription = description || siteConfig.defaultDescription;
  
  // Format URL cleanly avoiding double slashes
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const canonicalUrl = `${siteConfig.domain}${path === '' ? '' : cleanPath}`;
  const imageUrl = image.startsWith('http') ? image : `${siteConfig.domain}${image.startsWith('/') ? image : `/${image}`}`;

  const defaultKeywords = [
    'بیلیتیکو',
    'خرید بلیط هواپیما',
    'بلیط هواپیما ارزان',
    'رزرو آنلاین بلیط',
    'بلیط قطار',
    'بلیط اتوبوس',
    'بیمه مسافرتی',
    'بلیط چارتری',
    'بلیط سیستمی',
  ];

  const allKeywords = Array.from(new Set([...defaultKeywords, ...keywords]));

  return {
    title: title ? title : siteConfig.defaultTitle,
    description: fullDescription,
    keywords: allKeywords,
    metadataBase: new URL(siteConfig.domain),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'fa-IR': canonicalUrl,
      },
    },
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url: canonicalUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title || siteConfig.name,
        },
      ],
      locale: siteConfig.locale,
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images: [imageUrl],
    },
    robots: noindex
      ? {
          index: false,
          follow: false,
          nocache: true,
          googleBot: {
            index: false,
            follow: false,
            'max-video-preview': -1,
            'max-image-preview': 'none',
            'max-snippet': -1,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
  };
}
