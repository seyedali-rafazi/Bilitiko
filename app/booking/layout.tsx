import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'تکمیل اطلاعات مسافران',
  description: 'مرحله ورود اطلاعات مسافران و رزرو بلیط',
  noindex: true,
});

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
