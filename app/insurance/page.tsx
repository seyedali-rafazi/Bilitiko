import type { Metadata } from 'next';
import InsuranceClient from './InsuranceClient';
import { constructMetadata } from '@/lib/seo/metadata';
import { getBreadcrumbSchema, getTravelServiceSchema } from '@/lib/seo/structured-data';
import StructuredData from '@/components/seo/StructuredData';

export const metadata: Metadata = constructMetadata({
  title: 'خرید بیمه مسافرتی | صدور آنلاین بیمه سفر داخلی و خارجی',
  description: 'خرید و صدور فوری بیمه مسافرتی برای سفرهای داخلی و خارجی با پوشش‌های کامل پزشکی، لغو سفر و گم‌شدن بار در بیلیتیکو.',
  path: '/insurance',
  keywords: ['خرید بیمه مسافرتی', 'بیمه آنلاین سفر', 'بیمه سامان', 'بیمه مسافرتی سامان', 'بیمه مسافرتی کرونا'],
});

export default function InsurancePage() {
  const breadcrumbs = getBreadcrumbSchema([
    { name: 'صفحه اصلی', item: '/' },
    { name: 'بیمه مسافرتی', item: '/insurance' },
  ]);
  const insuranceServiceSchema = getTravelServiceSchema(
    'خرید بیمه مسافرتی',
    'صدور آنی و آنلاین بیمه‌نامه مسافرتی برای تمامی سفرهای داخلی و بین‌المللی با پشتیبانی ۲۴ ساعته.',
    '/insurance'
  );

  return (
    <>
      <StructuredData data={breadcrumbs} />
      <StructuredData data={insuranceServiceSchema} />
      <InsuranceClient />
    </>
  );
}
