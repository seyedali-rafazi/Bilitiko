import type { Metadata } from 'next';
import PageLayout from '@/components/layout/PageLayout';
import Hero from '@/components/layout/Hero';
import MobileSearchBox from '@/components/mobile/MobileSearchBox';
import FlightSearchBox from '@/components/home/FlightSearchBox';
import SearchHistory from '@/components/home/SearchHistory';
import DestinationCards from '@/components/home/DestinationCards';
import PopularFlights from '@/components/home/PopularFlights';
import AdvantagesSection from '@/components/home/AdvantagesSection';
import FAQSection from '@/components/home/FAQSection';
import { BANNER_IMAGES, FAQS } from '@/lib/constants';
import { constructMetadata } from '@/lib/seo/metadata';
import { getFAQPageSchema } from '@/lib/seo/structured-data';
import StructuredData from '@/components/seo/StructuredData';

export const metadata: Metadata = constructMetadata({
  title: 'رزرو آنلاین بلیط هواپیما، قطار، اتوبوس و بیمه مسافرتی | بیلیتیکو',
  description: 'خرید آنلاین بلیط هواپیما داخلی و خارجی، بلیط قطار و اتوبوس، و بیمه مسافرتی با تضمین بهترین قیمت و پشتیبانی ۲۴ ساعته در سامانه بیلیتیکو.',
  path: '/',
});

export default function Home() {
  const faqSchema = getFAQPageSchema(FAQS);

  return (
    <PageLayout>
      <StructuredData data={faqSchema} />
      <Hero
        title="راحتی و سرعت در رزرو بلیط هواپیما با بیلیتیکو"
        backgroundImage={BANNER_IMAGES.flight}
        height="h-[180px] lg:h-[340px]"
      />
      <MobileSearchBox />
      <div className="hidden lg:block">
        <FlightSearchBox />
      </div>
      <SearchHistory />
      <DestinationCards />
      <PopularFlights />
      <AdvantagesSection />
      <FAQSection />
    </PageLayout>
  );
}
