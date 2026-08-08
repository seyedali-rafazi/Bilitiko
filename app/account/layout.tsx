import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'تنظیمات حساب کاربری',
  description: 'تنظیمات حساب کاربری بیلیتیکو',
  noindex: true,
});

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
