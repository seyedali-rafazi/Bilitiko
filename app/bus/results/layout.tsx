import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'نتایج جستجوی اتوبوس',
  description: 'نتایج جستجوی اتوبوس‌های بین شهری',
  path: '/bus',
  noindex: true,
});

export default function BusResultsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
