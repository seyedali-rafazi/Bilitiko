'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DESTINATIONS as FALLBACK_DESTINATIONS } from '@/lib/constants';
import { buildFlightSearchUrl } from '@/lib/search-utils';
import { flightsApi } from '@/lib/api';
import type { ApiDestination } from '@/lib/api';

interface DestinationItem {
  title: string;
  subtitle: string;
  image: string;
  destinationCode: string;
}

function mapApiToItem(d: ApiDestination): DestinationItem {
  return {
    title: d.title,
    subtitle: d.subtitle,
    image: d.image || '',
    destinationCode: d.destination_code,
  };
}

export default function DestinationCards() {
  const router = useRouter();
  const [destinations, setDestinations] = useState<DestinationItem[]>(FALLBACK_DESTINATIONS);

  useEffect(() => {
    flightsApi
      .getDestinations()
      .then((res) => {
        if (res.length > 0) setDestinations(res.map(mapApiToItem));
      })
      .catch(() => {
        // keep fallback on error
      });
  }, []);

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

  if (destinations.length < 3) return null;

  return (
    <div className="container mx-auto px-4 mb-12 max-w-[1224px]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        {destinations.slice(0, 2).map((dest) => (
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
              style={{ backgroundImage: dest.image ? `url(${dest.image})` : undefined }}
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
          onClick={() => openDestination(destinations[2].destinationCode)}
          onKeyDown={(e) => e.key === 'Enter' && openDestination(destinations[2].destinationCode)}
          role="button"
          tabIndex={0}
        >
          <div className="absolute inset-0 bg-gradient-to-l from-[#010846]/70 via-[#010846]/30 to-transparent z-10" />
          <div
            className="absolute inset-0 bg-cover bg-center bg-neutral-gray3 transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: destinations[2].image ? `url(${destinations[2].image})` : undefined }}
          />
          <div className="absolute bottom-5 right-5 text-white z-20 text-right">
            <h3 className="text-lg lg:text-xl font-bold mb-2">{destinations[2].title}</h3>
            <span className="inline-block px-4 py-2 border border-white/80 rounded-lg text-xs lg:text-sm hover:bg-white/15 transition-colors">
              {destinations[2].subtitle}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
