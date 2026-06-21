import PageLayout from '@/components/layout/PageLayout';
import Hero from '@/components/layout/Hero';
import ContentSection from '@/components/shared/ContentSection';

export default function TermsPage() {
  return (
    <PageLayout>
      <Hero title="قوانین و مقررات" height="h-[200px]" />

      <div className="container mx-auto px-4 py-12 max-w-[1224px]">
        <ContentSection title="شرایط استفاده از خدمات">
          <p>
            با استفاده از خدمات بیلیتو، شما موافقت خود را با تمامی قوانین و
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
            قیمت‌های نمایش داده شده شامل مالیات و عوارض است. بیلیتو حق تغییر
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
