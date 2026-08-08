import type { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'تأیید نهایی رزرو',
  description: 'تأییدیه و خلاصه رزرو بلیط',
  noindex: true,
});

export default function ConfirmationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
