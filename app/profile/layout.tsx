import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'پروفایل کاربری و بلیط‌های من',
  description: 'مدیریت حساب کاربری و مشاهده بلیط‌های خریداری شده',
  noindex: true,
});

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
