'use client';

import FlightFiltersContent, { type FlightFiltersContentProps } from '@/components/flights/FlightFiltersContent';

type FlightFiltersSidebarProps = FlightFiltersContentProps;

export default function FlightFiltersSidebar(props: FlightFiltersSidebarProps) {
  return (
    <aside className="hidden lg:block w-[20%] shrink-0">
      <div className="sticky top-4">
        <FlightFiltersContent {...props} />
      </div>
    </aside>
  );
}
