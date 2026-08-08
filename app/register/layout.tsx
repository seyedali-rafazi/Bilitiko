import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'ثبت نام در بیلیتیکو',
  description: 'ایجاد حساب کاربری جدید در بیلیتیکو',
  noindex: true,
});

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
