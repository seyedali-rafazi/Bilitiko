import type { Metadata } from 'next';
import ContactClient from './ContactClient';
import { constructMetadata } from '@/lib/seo/metadata';
import { getBreadcrumbSchema, getOrganizationSchema } from '@/lib/seo/structured-data';
import StructuredData from '@/components/seo/StructuredData';

export const metadata: Metadata = constructMetadata({
  title: 'تماس با ما | پشتیبانی ۲۴ ساعته بیلیتیکو',
  description: 'ارتباط با تیم پشتیبانی ۲۴ ساعته بیلیتیکو. پاسخگویی آنلاین، تلفنی و ایمیل برای رزرو بلیط هواپیما، قطار و اتوبوس.',
  path: '/contact',
  keywords: ['تماس با بیلیتیکو', 'پشتیبانی بیلیتیکو', 'تلفن بیلیتیکو', 'آدرس بیلیتیکو'],
});

export default function ContactPage() {
  const breadcrumbs = getBreadcrumbSchema([
    { name: 'صفحه اصلی', item: '/' },
    { name: 'تماس با ما', item: '/contact' },
  ]);
  const organizationSchema = getOrganizationSchema();

  return (
    <>
      <StructuredData data={breadcrumbs} />
      <StructuredData data={organizationSchema} />
      <ContactClient />
    </>
  );
}
