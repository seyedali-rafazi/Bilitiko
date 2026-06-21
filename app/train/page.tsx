import PageLayout from '@/components/layout/PageLayout';
import Hero from '@/components/layout/Hero';
import MobileTripSearchBox from '@/components/search/MobileTripSearchBox';
import TripSearchBox from '@/components/search/TripSearchBox';

export default function TrainPage() {
  return (
    <PageLayout mobileTitle="خرید بلیط قطار">
      <Hero
        title="خرید بلیط قطار"
        subtitle="رزرو آنلاین بلیط قطار داخلی"
        height="h-[180px] lg:h-[340px]"
      />
      <MobileTripSearchBox mode="train" />
      <div className="hidden lg:block">
        <TripSearchBox mode="train" />
      </div>
    </PageLayout>
  );
}
