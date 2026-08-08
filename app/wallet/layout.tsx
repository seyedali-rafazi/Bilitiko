import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'کیف پول کاربری',
  description: 'مدیریت موجودی کیف پول در بیلیتیکو',
  noindex: true,
});

export default function WalletLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
