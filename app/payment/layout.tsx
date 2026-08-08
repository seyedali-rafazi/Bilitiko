import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'درگاه پرداخت آنلاین',
  description: 'مرحله پرداخت بانکی و تأیید تراکنش',
  noindex: true,
});

export default function PaymentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
