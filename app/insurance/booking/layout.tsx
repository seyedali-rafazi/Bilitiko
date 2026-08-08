import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'رزرو بیمه مسافرتی',
  description: 'ثبت اطلاعات برای خرید بیمه مسافرتی',
  noindex: true,
});

export default function InsuranceBookingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
