import PageLayout from '@/components/layout/PageLayout';
import Hero from '@/components/layout/Hero';
import MobileTripSearchBox from '@/components/search/MobileTripSearchBox';
import TripSearchBox from '@/components/search/TripSearchBox';

export default function BusPage() {
  return (
    <PageLayout mobileTitle="بلیط اتوبوس">
      <Hero
        title="خرید بلیط اتوبوس"
        subtitle="جستجو و خرید آنلاین بلیط اتوبوس بین‌شهری"
        height="h-[180px] lg:h-[340px]"
      />
      <MobileTripSearchBox mode="bus" />
      <div className="hidden lg:block">
        <TripSearchBox mode="bus" />
      </div>
    </PageLayout>
  );
}
