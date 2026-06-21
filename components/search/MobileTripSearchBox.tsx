'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaBus, FaExchangeAlt, FaTrain } from 'react-icons/fa';
import Button from '@/components/ui/Button';
import PersianDatePicker from '@/components/ui/PersianDatePicker';
import { CITIES } from '@/lib/constants';
import { addSearchHistory, buildTripSearchUrl } from '@/lib/search-utils';
import type { SearchData, TripType } from '@/lib/types';

type TransportMode = 'bus' | 'train';

const MODE_CONFIG: Record<TransportMode, { icon: typeof FaBus; label: string; path: '/bus/results' | '/train/results' }> = {
  bus: { icon: FaBus, label: 'جستجوی اتوبوس', path: '/bus/results' },
  train: { icon: FaTrain, label: 'جستجوی قطار', path: '/train/results' },
};

const tripTypes: { id: TripType; label: string }[] = [
  { id: 'oneway', label: 'رفت' },
  { id: 'roundtrip', label: 'رفت و برگشت' },
];

interface MobileTripSearchBoxProps {
  mode: TransportMode;
}

export default function MobileTripSearchBox({ mode }: MobileTripSearchBoxProps) {
  const router = useRouter();
  const config = MODE_CONFIG[mode];
  const Icon = config.icon;

  const [tripType, setTripType] = useState<TripType>('roundtrip');
  const [searchData, setSearchData] = useState<SearchData>({
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
    flightClass: 'economy',
  });

  const swapCities = () => {
    setSearchData((s) => ({ ...s, origin: s.destination, destination: s.origin }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const originName = CITIES.find((c) => c.code === searchData.origin)?.name;
    const destName = CITIES.find((c) => c.code === searchData.destination)?.name;
    if (originName && destName) {
      addSearchHistory(`${originName} به ${destName}`);
    }
    router.push(buildTripSearchUrl(config.path, searchData, tripType));
  };

  const cityOptions = CITIES.map((c) => ({ value: c.code, label: c.name }));

  return (
    <div className="px-4 -mt-6 relative z-10 mb-6 lg:hidden">
      <div className="bg-white rounded-xl border border-neutral-gray2 search-box-shadow p-4">
        <div className="flex gap-2 mb-4 overflow-x-auto">
          {tripTypes.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTripType(t.id)}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium ${
                tripType === t.id
                  ? 'bg-primary-blue text-white'
                  : 'bg-neutral-gray1 text-neutral-gray7'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSearch} className="space-y-3">
          <select
            value={searchData.origin}
            onChange={(e) => setSearchData({ ...searchData, origin: e.target.value })}
            className="w-full h-12 px-4 border border-neutral-gray3 rounded-lg text-sm input-focus"
            required
          >
            <option value="">مبدا</option>
            {cityOptions.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>

          <div className="flex justify-center -my-1 relative z-10">
            <button
              type="button"
              onClick={swapCities}
              className="w-9 h-9 bg-primary-tint1 border border-primary-blue rounded-full flex items-center justify-center"
            >
              <FaExchangeAlt className="text-primary-blue text-sm rotate-90" />
            </button>
          </div>

          <select
            value={searchData.destination}
            onChange={(e) => setSearchData({ ...searchData, destination: e.target.value })}
            className="w-full h-12 px-4 border border-neutral-gray3 rounded-lg text-sm input-focus"
            required
          >
            <option value="">مقصد</option>
            {cityOptions.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>

          <div className="grid grid-cols-2 gap-3">
            <div className={tripType !== 'roundtrip' ? 'col-span-2' : ''}>
              <PersianDatePicker
                value={searchData.departureDate}
                onChange={(value) => setSearchData({ ...searchData, departureDate: value })}
                placeholder="تاریخ رفت"
                required
              />
            </div>
            {tripType === 'roundtrip' && (
              <PersianDatePicker
                value={searchData.returnDate}
                onChange={(value) => setSearchData({ ...searchData, returnDate: value })}
                placeholder="تاریخ برگشت"
                minDate={searchData.departureDate}
              />
            )}
            <select
              value={searchData.passengers}
              onChange={(e) => setSearchData({ ...searchData, passengers: parseInt(e.target.value) })}
              className={`h-12 px-3 border border-neutral-gray3 rounded-lg text-sm input-focus ${
                tripType !== 'roundtrip' ? 'col-span-1' : ''
              }`}
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>{n} مسافر</option>
              ))}
            </select>
          </div>

          <Button type="submit" fullWidth>
            <span>{config.label}</span>
            <Icon className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
