import type { Metadata } from 'next';
import FlightsClient from './FlightsClient';
import { constructMetadata } from '@/lib/seo/metadata';
import { getBreadcrumbSchema, getTravelServiceSchema } from '@/lib/seo/structured-data';
import StructuredData from '@/components/seo/StructuredData';

interface FlightsPageProps {
  searchParams: Promise<{
    origin?: string;
    destination?: string;
    departureDate?: string;
  }>;
}

export async function generateMetadata({ searchParams }: FlightsPageProps): Promise<Metadata> {
  const params = await searchParams;
  const origin = params.origin;
  const destination = params.destination;

  let title = 'رزرو و خرید آنلاین بلیط هواپیما | بیلیتیکو';
  let description = 'جستجو و مقایسه پروازهای داخلی و خارجی از کلیه ایرلاین‌های معتبر با تضمین کمترین قیمت در بیلیتیکو.';

  if (origin && destination) {
    title = `خرید بلیط هواپیما ${origin} به ${destination} | ارزان‌ترین نرخ بیلیتیکو`;
    description = `رزرو و خرید آنلاین بلیط پرواز ${origin} به ${destination}. مشاهده قیمت‌ها، ساعت پرواز و ایرلاین‌های مختلف با پشتیبانی ۲۴ ساعته.`;
  } else if (origin) {
    title = `خرید بلیط هواپیما از ${origin} | رزرو آنلاین بیلیتیکو`;
  } else if (destination) {
    title = `خرید بلیط هواپیما به مقصد ${destination} | رزرو آنلاین بیلیتیکو`;
  }

  return constructMetadata({
    title,
    description,
    path: '/flights',
    keywords: [
      'خرید بلیط هواپیما',
      'رزرو بلیط هواپیما',
      'پرواز داخلی',
      'پرواز خارجی',
      'بلیط چارتر هواپیما',
    ],
  });
}

export default async function FlightsPage() {
  const breadcrumbs = getBreadcrumbSchema([
    { name: 'صفحه اصلی', item: '/' },
    { name: 'جستجوی پرواز', item: '/flights' },
  ]);
  const flightServiceSchema = getTravelServiceSchema(
    'خرید بلیط هواپیما',
    'جستجو و خرید آنلاین بلیط هواپیما تمامی ایرلاین‌های داخلی و بین‌المللی با بهترین قیمت.',
    '/flights'
  );

  return (
    <>
      <StructuredData data={breadcrumbs} />
      <StructuredData data={flightServiceSchema} />
      <FlightsClient />
    </>
  );
}
