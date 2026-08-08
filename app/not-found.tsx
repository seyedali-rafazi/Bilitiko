import type { Metadata } from 'next';
import Link from 'next/link';
import PageLayout from '@/components/layout/PageLayout';
import Button from '@/components/ui/Button';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = constructMetadata({
  title: 'صفحه یافت نشد (۴۰۴)',
  description: 'صفحه مورد نظر یافت نشد',
  noindex: true,
});

export default function NotFound() {
  return (
    <PageLayout showFooter={false} mobileTitle="صفحه یافت نشد">
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <p className="text-8xl font-bold text-primary-tint1 mb-2">404</p>
        <h1 className="text-xl font-bold text-neutral-gray8 mb-2">صفحه مورد نظر یافت نشد</h1>
        <p className="text-sm text-neutral-gray6 mb-8">آدرس وارد شده اشتباه است یا صفحه حذف شده</p>
        <Link href="/"><Button>بازگشت به صفحه اصلی</Button></Link>
      </div>
    </PageLayout>
  );
}
