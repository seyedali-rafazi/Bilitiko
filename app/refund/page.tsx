import PageLayout from '@/components/layout/PageLayout';
import Hero from '@/components/layout/Hero';
import ContentSection from '@/components/shared/ContentSection';

export default function RefundPage() {
  return (
    <PageLayout>
      <Hero title="استرداد بلیط" subtitle="راهنمای کامل استرداد بلیط هواپیما" height="h-[240px]" />

      <div className="container mx-auto px-4 py-12 max-w-[1224px]">
        <ContentSection title="شرایط استرداد">
          <p>
            امکان استرداد بلیط با توجه به قوانین هر ایرلاین متفاوت است. به طور کلی
            بلیط‌های سیستمی و چارتری قوانین متفاوتی برای استرداد دارند.
          </p>
        </ContentSection>

        <ContentSection title="مراحل استرداد">
          <ol className="list-decimal list-inside space-y-3">
            <li>وارد حساب کاربری خود شوید</li>
            <li>به بخش «سفرهای من» بروید</li>
            <li>بلیط مورد نظر را انتخاب کنید</li>
            <li>روی دکمه «درخواست استرداد» کلیک کنید</li>
            <li>مبلغ استرداد طبق قوانین ایرلاین به حساب شما واریز می‌شود</li>
          </ol>
        </ContentSection>

        <ContentSection title="زمان بازگشت وجه">
          <p>
            مبلغ استرداد معمولاً بین ۳ تا ۱۴ روز کاری به حساب بانکی شما واریز
            می‌شود. برای بلیط‌های چارتری ممکن است این زمان متفاوت باشد.
          </p>
        </ContentSection>

        <ContentSection title="تماس با پشتیبانی">
          <p>
            برای استرداد فوری یا سوالات بیشتر با پشتیبانی ۲۴ ساعته بیلیتو تماس
            بگیرید: 021-4045
          </p>
        </ContentSection>
      </div>
    </PageLayout>
  );
}
