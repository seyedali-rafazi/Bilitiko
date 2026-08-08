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
  title: 'خرید بلیط قطار | رزرو آنلاین بلیط قطار رجا، فدک و شرکت‌های ریلی',
  description: 'رزرو و خرید آنلاین بلیط قطار داخلی، مقایسه حرکت‌ها و قطارهای ۵ ستاره، فدک و رجا با پشتیبانی ۲۴ ساعته در بیلیتیکو.',
  path: '/train',
  keywords: ['خرید بلیط قطار', 'رزرو بلیط قطار', 'بلیط قطار رجا', 'بلیط قطار فدک', 'بلیط قطار ارزان'],
});

export default function TrainPage() {
  const breadcrumbs = getBreadcrumbSchema([
    { name: 'صفحه اصلی', item: '/' },
    { name: 'بلیط قطار', item: '/train' },
  ]);
  const trainServiceSchema = getTravelServiceSchema(
    'خرید بلیط قطار',
    'رزرو و خرید آنلاین بلیط قطار از تمامی شرکت‌های ریلی مانند رجا و فدک با پشتیبانی شبانه‌روزی.',
    '/train'
  );

  return (
    <PageLayout mobileTitle="خرید بلیط قطار">
      <StructuredData data={breadcrumbs} />
      <StructuredData data={trainServiceSchema} />
      <Hero
        title="خرید بلیط قطار"
        subtitle="رزرو آنلاین بلیط قطار داخلی"
        backgroundImage={BANNER_IMAGES.train}
        height="h-[180px] lg:h-[340px]"
      />
      <MobileTripSearchBox mode="train" />
      <div className="hidden lg:block">
        <TripSearchBox mode="train" />
      </div>
    </PageLayout>
  );
}
