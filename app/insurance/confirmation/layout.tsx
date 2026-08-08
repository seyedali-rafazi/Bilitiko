import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'تأییدیه صدور بیمه‌نامه',
  description: 'خلاصه و دانلود بیمه‌نامه مسافرتی',
  noindex: true,
});

export default function InsuranceConfirmationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
