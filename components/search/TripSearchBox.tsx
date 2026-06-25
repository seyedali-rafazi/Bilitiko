'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaBus, FaExchangeAlt, FaSearch, FaTrain } from 'react-icons/fa';
import Tabs from '@/components/ui/Tabs';
import Button from '@/components/ui/Button';
import PersianDatePicker from '@/components/ui/PersianDatePicker';
import { TRANSPORT_CITIES } from '@/lib/constants';
import { addSearchHistory, buildTripSearchUrl } from '@/lib/search-utils';
import type { SearchData, TripType } from '@/lib/types';

type TransportMode = 'bus' | 'train';

const MODE_CONFIG: Record<TransportMode, { icon: typeof FaBus; label: string; path: '/bus/results' | '/train/results' }> = {
  bus: { icon: FaBus, label: 'جستجوی اتوبوس', path: '/bus/results' },
  train: { icon: FaTrain, label: 'جستجوی قطار', path: '/train/results' },
};

const tripTabs = [
  { id: 'roundtrip', label: 'رفت و برگشت' },
  { id: 'oneway', label: 'رفت' },
];

interface TripSearchBoxProps {
  mode: TransportMode;
}

export default function TripSearchBox({ mode }: TripSearchBoxProps) {
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
    if (searchData.origin && searchData.destination) {
      addSearchHistory(`${searchData.origin} به ${searchData.destination}`);
    }
    router.push(buildTripSearchUrl(config.path, searchData, tripType));
  };

  const cityOptions = TRANSPORT_CITIES.map((name) => ({ value: name, label: name }));

  return (
    <div className="container mx-auto px-4 -mt-24 lg:-mt-28 relative z-20 mb-12">
      <div className="bg-white rounded-xl border border-neutral-gray2 search-box-shadow p-5 lg:p-6 max-w-[1226px] mx-auto">
        <Tabs
          tabs={tripTabs}
          activeTab={tripType}
          onChange={(id) => setTripType(id as TripType)}
          className="mb-5 pb-4 border-b border-neutral-gray2"
        />

        <form onSubmit={handleSearch} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-1">
              <label className="field-label">مبدا</label>
              <select
                value={searchData.origin}
                onChange={(e) => setSearchData({ ...searchData, origin: e.target.value })}
                className="search-field appearance-none cursor-pointer"
                required
              >
                <option value="">انتخاب شهر</option>
                {cityOptions.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>

            <div className="lg:col-span-1 relative">
              <label className="field-label">مقصد</label>
              <select
                value={searchData.destination}
                onChange={(e) => setSearchData({ ...searchData, destination: e.target.value })}
                className="search-field appearance-none cursor-pointer"
                required
              >
                <option value="">انتخاب شهر</option>
                {cityOptions.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={swapCities}
                aria-label="جابجایی مبدا و مقصد"
                className="absolute left-3 top-[calc(50%+10px)] -translate-y-1/2 w-8 h-8 bg-primary-tint1 border border-primary-blue rounded-full flex items-center justify-center hover:bg-primary-tint5 transition-colors z-10 hidden lg:flex"
              >
                <FaExchangeAlt className="text-primary-blue text-xs" />
              </button>
            </div>

            <div>
              <PersianDatePicker
                label="تاریخ رفت"
                value={searchData.departureDate}
                onChange={(value) => setSearchData({ ...searchData, departureDate: value })}
                required
                disablePastDates
              />
            </div>

            {tripType === 'roundtrip' && (
              <div>
                <PersianDatePicker
                  label="تاریخ برگشت"
                  value={searchData.returnDate}
                  onChange={(value) => setSearchData({ ...searchData, returnDate: value })}
                  minDate={searchData.departureDate}
                />
              </div>
            )}

            <div>
              <label className="field-label">مسافران</label>
              <select
                value={searchData.passengers}
                onChange={(e) => setSearchData({ ...searchData, passengers: parseInt(e.target.value) })}
                className="search-field appearance-none cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <option key={num} value={num}>{num} نفر</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" size="lg" className="min-w-[160px]">
              <FaSearch className="w-4 h-4" />
              <Icon className="w-4 h-4" />
              <span>{config.label}</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
