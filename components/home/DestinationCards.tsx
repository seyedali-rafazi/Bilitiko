'use client';

import { useRouter } from 'next/navigation';
import { DESTINATIONS } from '@/lib/constants';
import { buildFlightSearchUrl } from '@/lib/search-utils';

export default function DestinationCards() {
  const router = useRouter();

  const openDestination = (destinationCode: string) => {
    const today = new Date().toISOString().split('T')[0];
    router.push(
      buildFlightSearchUrl({
        origin: 'THR',
        destination: destinationCode,
        departureDate: today,
        passengers: 1,
        flightClass: 'economy',
      })
    );
  };

  return (
    <div className="container mx-auto px-4 mb-12 max-w-[1224px]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        {DESTINATIONS.slice(0, 2).map((dest) => (
          <div
            key={dest.destinationCode}
            className="relative h-[152px] rounded-xl overflow-hidden group cursor-pointer"
            onClick={() => openDestination(dest.destinationCode)}
            onKeyDown={(e) => e.key === 'Enter' && openDestination(dest.destinationCode)}
            role="button"
            tabIndex={0}
          >
            <div className="absolute inset-0 bg-gradient-to-l from-[#010846]/70 via-[#010846]/30 to-transparent z-10" />
            <div
              className="absolute inset-0 bg-cover bg-center bg-neutral-gray3 transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url(${dest.image})` }}
            />
            <div className="absolute bottom-5 right-5 text-white z-20 text-right">
              <h3 className="text-lg lg:text-xl font-bold mb-2">{dest.title}</h3>
              <span className="inline-block px-4 py-2 border border-white/80 rounded-lg text-xs lg:text-sm hover:bg-white/15 transition-colors">
                {dest.subtitle}
              </span>
            </div>
          </div>
        ))}

        <div
          className="relative h-[152px] md:h-[328px] md:row-span-2 rounded-xl overflow-hidden group cursor-pointer"
          onClick={() => openDestination(DESTINATIONS[2].destinationCode)}
          onKeyDown={(e) => e.key === 'Enter' && openDestination(DESTINATIONS[2].destinationCode)}
          role="button"
          tabIndex={0}
        >
          <div className="absolute inset-0 bg-gradient-to-l from-[#010846]/70 via-[#010846]/30 to-transparent z-10" />
          <div
            className="absolute inset-0 bg-cover bg-center bg-neutral-gray3 transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url(${DESTINATIONS[2].image})` }}
          />
          <div className="absolute bottom-5 right-5 text-white z-20 text-right">
            <h3 className="text-lg lg:text-xl font-bold mb-2">{DESTINATIONS[2].title}</h3>
            <span className="inline-block px-4 py-2 border border-white/80 rounded-lg text-xs lg:text-sm hover:bg-white/15 transition-colors">
              {DESTINATIONS[2].subtitle}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
