import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'خطای ۴۰۵',
  description: 'متد درخواست مجاز نیست',
  noindex: true,
});

export default function Error405Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
