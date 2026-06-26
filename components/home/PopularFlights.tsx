'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaPlane } from 'react-icons/fa';
import { POPULAR_FLIGHTS as FALLBACK_FLIGHTS } from '@/lib/constants';
import { buildFlightSearchUrl } from '@/lib/search-utils';
import { flightsApi } from '@/lib/api';
import type { ApiPopularFlight } from '@/lib/api';

const cities = ['تهران', 'مشهد', 'اصفهان', 'کیش'];

interface PopularFlightItem {
  from: string;
  to: string;
  fromCode: string;
  toCode: string;
  price: string;
  image: string;
}

const DEFAULT_IMAGE = '/flight-dubai.webp';

function mapApiToItem(f: ApiPopularFlight): PopularFlightItem {
  const fallback = FALLBACK_FLIGHTS.find(
    (s) => s.fromCode === f.from_code && s.toCode === f.to_code
  );
  return {
    from: f.from_city,
    to: f.to_city,
    fromCode: f.from_code,
    toCode: f.to_code,
    price: f.price,
    image: f.image || fallback?.image || DEFAULT_IMAGE,
  };
}

export default function PopularFlights() {
  const router = useRouter();
  const [activeCity, setActiveCity] = useState('تهران');
  const [allFlights, setAllFlights] = useState<PopularFlightItem[]>([]);

  useEffect(() => {
    flightsApi
      .getPopular()
      .then((res) => setAllFlights(res.map(mapApiToItem)))
      .catch(() => {
        // fall back to static constants
        setAllFlights(
          FALLBACK_FLIGHTS.map((f) => ({
            from: f.from,
            to: f.to,
            fromCode: f.fromCode,
            toCode: f.toCode,
            price: f.price,
            image: f.image,
          }))
        );
      });
  }, []);

  const filtered = allFlights.filter((f) => f.from === activeCity);
  const displayFlights = filtered.length > 0 ? filtered : allFlights;

  const openFlight = (fromCode: string, toCode: string) => {
    const today = new Date().toISOString().split('T')[0];
    router.push(
      buildFlightSearchUrl({
        origin: fromCode,
        destination: toCode,
        departureDate: today,
        passengers: 1,
        flightClass: 'economy',
      })
    );
  };

  
  return (
    <div className="container mx-auto px-4 mb-12 max-w-[1224px]">
      <div className="mb-6 lg:mb-8">
        <h2 className="text-lg lg:text-xl font-bold text-neutral-black mb-4">
          پرطرفدارترین پروازهای داخلی
        </h2>
        <div className="flex items-center gap-2 flex-wrap">
          {cities.map((city) => (
            <button
              key={city}
              type="button"
              onClick={() => setActiveCity(city)}
              className={`px-4 py-1.5 rounded-lg text-sm lg:text-base transition-colors ${
                activeCity === city
                  ? 'bg-primary-tint1 text-primary-blue font-bold border border-primary-blue'
                  : 'bg-white border border-neutral-gray3 text-neutral-gray7 hover:border-primary-blue'
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {displayFlights.map((flight) => (
          <button
            key={`${flight.fromCode}-${flight.toCode}`}
            type="button"
            onClick={() => openFlight(flight.fromCode, flight.toCode)}
            className="text-right border border-neutral-gray2 rounded-xl overflow-hidden hover:shadow-lg hover:border-primary-tint5 transition-all card-hover bg-white"
          >
            <div
              className="h-[88px] bg-cover bg-center bg-neutral-gray3"
              style={{ backgroundImage: flight.image ? `url(${flight.image})` : undefined }}
            />
            <div className="p-4">
              <div className="flex items-center justify-center gap-2 pb-3 border-b border-neutral-gray2 mb-3">
                <span className="text-sm text-primary-blue font-bold">{flight.from}</span>
                <FaPlane className="text-primary-blue text-xs rotate-90" />
                <span className="text-sm text-neutral-gray8 font-bold">{flight.to}</span>
              </div>
              <div>
                <div className="text-xs text-neutral-gray6 mb-1">شروع قیمت از:</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-base font-bold text-neutral-gray9">{flight.price}</span>
                  <span className="text-xs text-neutral-gray6">تومان</span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
