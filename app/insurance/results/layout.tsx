import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'نتایج جستجوی بیمه',
  description: 'نتایج جستجوی پلن‌های بیمه مسافرتی',
  path: '/insurance',
  noindex: true,
});

export default function InsuranceResultsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
