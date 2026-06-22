import PageLayout from '@/components/layout/PageLayout';
import Hero from '@/components/layout/Hero';
import ContentSection from '@/components/shared/ContentSection';

export default function AboutPage() {
  return (
    <PageLayout mobileTitle="درباره ما">
      <Hero title="درباره بیلیتیکو" subtitle="همراه شما در هر سفر" height="h-[240px]" />

      <div className="container mx-auto px-4 py-12 max-w-[1224px]">
        <ContentSection title="ما کیستیم؟">
          <p>
            بیلیتیکو یک پلتفرم آنلاین رزرو بلیط هواپیما است که با هدف ارائه بهترین
            تجربه خرید بلیط برای مسافران ایرانی طراحی شده است. ما با همکاری
            بیش از ۵۰۰ ایرلاین داخلی و بین‌المللی، امکان جستجو و خرید بلیط را
            در کمترین زمان فراهم کرده‌ایم.
          </p>
        </ContentSection>

        <ContentSection title="ماموریت ما">
          <p>
            هدف ما ساده‌سازی فرآیند رزرو بلیط هواپیما و ارائه کمترین نرخ به
            همراه بهترین خدمات پشتیبانی است. تیم بیلیتیکو ۲۴ ساعته آماده پاسخگویی
            به سوالات شماست.
          </p>
        </ContentSection>

        <ContentSection title="ارزش‌های ما">
          <ul className="list-disc list-inside space-y-2">
            <li>شفافیت در قیمت‌گذاری</li>
            <li>پشتیبانی ۲۴ ساعته</li>
            <li>امنیت در پرداخت</li>
            <li>تجربه کاربری عالی</li>
          </ul>
        </ContentSection>
      </div>
    </PageLayout>
  );
}
