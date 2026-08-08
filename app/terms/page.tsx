import type { Metadata } from 'next';
import PageLayout from '@/components/layout/PageLayout';
import Hero from '@/components/layout/Hero';
import ContentSection from '@/components/shared/ContentSection';
import { constructMetadata } from '@/lib/seo/metadata';
import { getBreadcrumbSchema } from '@/lib/seo/structured-data';
import StructuredData from '@/components/seo/StructuredData';

export const metadata: Metadata = constructMetadata({
  title: 'قوانین و مقررات | شرایط استفاده از بیلیتیکو',
  description: 'قوانین و مقررات خرید و رزرو آنلاین بلیط هواپیما، قطار و اتوبوس، شرایط استرداد، حقوق مسافران و حریم خصوصی در بیلیتیکو.',
  path: '/terms',
  keywords: ['قوانین بیلیتیکو', 'مقررات خرید بلیط', 'شرایط استرداد', 'حریم خصوصی بیلیتیکو'],
});

export default function TermsPage() {
  const breadcrumbs = getBreadcrumbSchema([
    { name: 'صفحه اصلی', item: '/' },
    { name: 'قوانین و مقررات', item: '/terms' },
  ]);

  return (
    <PageLayout>
      <StructuredData data={breadcrumbs} />
      <Hero title="قوانین و مقررات" height="h-[200px]" />

      <div className="container mx-auto px-4 py-12 max-w-[1224px]">
        <ContentSection title="شرایط استفاده از خدمات">
          <p>
            با استفاده از خدمات بیلیتیکو، شما موافقت خود را با تمامی قوانین و
            مقررات ذکر شده در این صفحه اعلام می‌کنید.
          </p>
        </ContentSection>

        <ContentSection title="مسئولیت کاربر">
          <ul className="list-disc list-inside space-y-2">
            <li>ارائه اطلاعات صحیح و کامل هنگام ثبت نام و رزرو</li>
            <li>حفظ امنیت حساب کاربری و رمز عبور</li>
            <li>رعایت قوانین حمل و نقل هوایی</li>
          </ul>
        </ContentSection>

        <ContentSection title="قیمت‌گذاری">
          <p>
            قیمت‌های نمایش داده شده شامل مالیات و عوارض است. بیلیتیکو حق تغییر
            قیمت را تا زمان تأیید نهایی رزرو محفوظ می‌دارد.
          </p>
        </ContentSection>

        <ContentSection title="حریم خصوصی">
          <p>
            اطلاعات شخصی شما مطابق با قوانین حفاظت از داده‌ها نگهداری می‌شود و
            بدون اجازه شما در اختیار اشخاص ثالث قرار نمی‌گیرد.
          </p>
        </ContentSection>
      </div>
    </PageLayout>
  );
}
