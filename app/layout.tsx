import type { Metadata } from 'next';
import './globals.css';
import AppShell from '@/components/layout/AppShell';
import { constructMetadata } from '@/lib/seo/metadata';
import { getOrganizationSchema, getWebSiteSchema } from '@/lib/seo/structured-data';
import StructuredData from '@/components/seo/StructuredData';

export const metadata: Metadata = constructMetadata();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationSchema = getOrganizationSchema();
  const websiteSchema = getWebSiteSchema();

  return (
    <html lang="fa" dir="rtl">
      <head>
        <StructuredData data={organizationSchema} />
        <StructuredData data={websiteSchema} />
      </head>
      <body className="min-h-screen bg-white antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

