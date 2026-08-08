import type { Metadata } from 'next';
import PageLayout from '@/components/layout/PageLayout';
import Hero from '@/components/layout/Hero';
import ContentSection from '@/components/shared/ContentSection';
import { constructMetadata } from '@/lib/seo/metadata';
import { getBreadcrumbSchema } from '@/lib/seo/structured-data';
import StructuredData from '@/components/seo/StructuredData';

export const metadata: Metadata = constructMetadata({
  title: 'راهنمای خرید آنلاین بلیط | آموزش گام‌به‌گام رزرو در بیلیتیکو',
  description: 'آموزش کامل رزرو آنلاین بلیط هواپیما، قطار و اتوبوس در بیلیتیکو. راهنمای مراحل انتخاب پرواز، ثبت اطلاعات مسافران و پرداخت بانکی.',
  path: '/guide',
  keywords: ['راهنمای خرید بلیط', 'چگونه بلیط بخریم', 'آموزش رزرو پرواز', 'راهنمای بیلیتیکو'],
});

const steps = [
  { step: 1, title: 'جستجوی پرواز', desc: 'مبدا، مقصد، تاریخ و تعداد مسافران را وارد کنید.' },
  { step: 2, title: 'انتخاب پرواز', desc: 'از بین پروازهای موجود، مناسب‌ترین را انتخاب کنید.' },
  { step: 3, title: 'ثبت اطلاعات', desc: 'اطلاعات مسافران و تماس را با دقت وارد کنید.' },
  { step: 4, title: 'پرداخت', desc: 'از طریق درگاه امن بانکی پرداخت را انجام دهید.' },
  { step: 5, title: 'دریافت بلیط', desc: 'بلیط به ایمیل و پیامک شما ارسال می‌شود.' },
];

export default function GuidePage() {
  const breadcrumbs = getBreadcrumbSchema([
    { name: 'صفحه اصلی', item: '/' },
    { name: 'راهنمای خرید', item: '/guide' },
  ]);

  return (
    <PageLayout>
      <StructuredData data={breadcrumbs} />
      <Hero title="راهنمای خرید بلیط" subtitle="گام به گام تا دریافت بلیط" height="h-[240px]" />

      <div className="container mx-auto px-4 py-12 max-w-[1224px]">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-12">
          {steps.map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-12 h-12 bg-primary-blue text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="font-bold text-neutral-gray8 mb-2">{item.title}</h3>
              <p className="text-sm text-neutral-gray6">{item.desc}</p>
            </div>
          ))}
        </div>

        <ContentSection title="نکات مهم">
          <ul className="list-disc list-inside space-y-2">
            <li>نام مسافر باید دقیقاً مطابق با مدارک شناسایی باشد</li>
            <li>برای پروازهای خارجی از اعتبار پاسپورت اطمینان حاصل کنید</li>
            <li>حداقل ۲ ساعت قبل از پرواز در فرودگاه حضور داشته باشید</li>
            <li>بلیط را پس از خرید چاپ یا در موبایل ذخیره کنید</li>
          </ul>
        </ContentSection>
      </div>
    </PageLayout>
  );
}
