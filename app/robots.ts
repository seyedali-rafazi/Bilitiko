import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/seo/site-config';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteConfig.domain;

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/admin/*',
          '/dashboard',
          '/dashboard/*',
          '/api/*',
          '/account',
          '/profile',
          '/wallet',
          '/booking',
          '/confirmation',
          '/payment',
          '/payment/*',
          '/login',
          '/register',
          '/forgot-password',
          '/insurance/booking',
          '/insurance/payment',
          '/insurance/confirmation',
          '/insurance/results',
          '/bus/results',
          '/train/results',
          '/405',
        ],
      },
      {
        userAgent: 'GPTBot',
        disallow: ['/api/*', '/admin/*'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
