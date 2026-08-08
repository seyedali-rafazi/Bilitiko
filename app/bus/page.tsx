import type { Metadata } from 'next';
import PageLayout from '@/components/layout/PageLayout';
import Hero from '@/components/layout/Hero';
import MobileTripSearchBox from '@/components/search/MobileTripSearchBox';
import TripSearchBox from '@/components/search/TripSearchBox';
import { BANNER_IMAGES } from '@/lib/constants';
import { constructMetadata } from '@/lib/seo/metadata';
import { getBreadcrumbSchema, getTravelServiceSchema } from '@/lib/seo/structured-data';
import StructuredData from '@/components/seo/StructuredData';

export const metadata: Metadata = constructMetadata({
  title: 'خرید بلیط اتوبوس بین شهری | رزرو سریع و ارزان بلیط اتوبوس در بیلیتیکو',
  description: 'خرید آنلاین بلیط اتوبوس بین شهری، مقایسه قیمت شرکت‌های اتوبوس‌رانی، انتخاب صندلی و رزرو با تضمین بهترین نرخ در بیلیتیکو.',
  path: '/bus',
  keywords: ['خرید بلیط اتوبوس', 'رزرو بلیط اتوبوس', 'بلیط اتوبوس بین شهری', 'اتوبوس VIP', 'بلیط اتوبوس ارزان'],
});

export default function BusPage() {
  const breadcrumbs = getBreadcrumbSchema([
    { name: 'صفحه اصلی', item: '/' },
    { name: 'بلیط اتوبوس', item: '/bus' },
  ]);
  const busServiceSchema = getTravelServiceSchema(
    'خرید بلیط اتوبوس',
    'رزرو و خرید آنلاین بلیط اتوبوس بین شهری از تمامی شرکت‌های اتوبوس‌رانی با بهترین قیمت.',
    '/bus'
  );

  return (
    <PageLayout mobileTitle="بلیط اتوبوس">
      <StructuredData data={breadcrumbs} />
      <StructuredData data={busServiceSchema} />
      <Hero
        title="خرید بلیط اتوبوس"
        subtitle="جستجو و خرید آنلاین بلیط اتوبوس بین‌شهری"
        backgroundImage={BANNER_IMAGES.bus}
        height="h-[180px] lg:h-[340px]"
      />
      <MobileTripSearchBox mode="bus" />
      <div className="hidden lg:block">
        <TripSearchBox mode="bus" />
      </div>
    </PageLayout>
  );
}
