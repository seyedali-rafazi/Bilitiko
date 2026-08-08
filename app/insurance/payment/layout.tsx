import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'پرداخت بیمه مسافرتی',
  description: 'پرداخت آنلاین هزینه بیمه‌نامه',
  noindex: true,
});

export default function InsurancePaymentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
