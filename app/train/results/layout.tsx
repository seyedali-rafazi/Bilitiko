import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'نتایج جستجوی قطار',
  description: 'نتایج جستجوی قطارهای بین شهری',
  path: '/train',
  noindex: true,
});

export default function TrainResultsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
