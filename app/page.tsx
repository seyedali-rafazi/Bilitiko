import PageLayout from '@/components/layout/PageLayout';
import Hero from '@/components/layout/Hero';
import MobileSearchBox from '@/components/mobile/MobileSearchBox';
import FlightSearchBox from '@/components/home/FlightSearchBox';
import SearchHistory from '@/components/home/SearchHistory';
import DestinationCards from '@/components/home/DestinationCards';
import PopularFlights from '@/components/home/PopularFlights';
import AdvantagesSection from '@/components/home/AdvantagesSection';
import FAQSection from '@/components/home/FAQSection';
import { BANNER_IMAGES } from '@/lib/constants';

export default function Home() {
  return (
    <PageLayout>
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
