'use client';

import { useState } from 'react';
import { FaPlane, FaExchangeAlt } from 'react-icons/fa';
import Button from '@/components/ui/Button';
import PersianDatePicker from '@/components/ui/PersianDatePicker';
import { CITIES } from '@/lib/constants';
import { useFlightSearch } from '@/hooks/useFlightSearch';
import type { SearchData, TripType } from '@/lib/types';

const tripTypes: { id: TripType; label: string }[] = [
  { id: 'oneway', label: 'رفت' },
  { id: 'roundtrip', label: 'رفت و برگشت' },
  { id: 'multi', label: 'چند مسیره' },
];

export default function MobileSearchBox() {
  const [tripType, setTripType] = useState<TripType>('roundtrip');
  const [flightType, setFlightType] = useState('system');
  const { searchData, errors, swapCities, updateField, submitSearch } = useFlightSearch();

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

        <div className="flex gap-2 mb-4">
          {[
            { id: 'charter', label: 'چارتر' },
            { id: 'system', label: 'سیستمی' },
            { id: 'international', label: 'خارجی' },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setFlightType(t.id)}
              className={`flex-1 py-2 rounded-lg text-xs border ${
                flightType === t.id
                  ? 'bg-primary-tint1 border-primary-blue text-primary-blue font-bold'
                  : 'border-neutral-gray3 text-neutral-gray6'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <form onSubmit={submitSearch} noValidate className="space-y-3">
          <div className="relative">
            <select
              value={searchData.origin}
              onChange={(e) => updateField('origin', e.target.value)}
              className={`w-full h-12 px-4 border rounded-lg text-sm input-focus ${
                errors.origin ? 'border-status-error' : 'border-neutral-gray3'
              }`}
            >
              <option value="">مبدا</option>
              {cityOptions.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
            {errors.origin && <p className="text-xs text-status-error mt-1">{errors.origin}</p>}
          </div>

          <div className="flex justify-center -my-1 relative z-10">
            <button
              type="button"
              onClick={swapCities}
              className="w-9 h-9 bg-primary-tint1 border border-primary-blue rounded-full flex items-center justify-center"
            >
              <FaExchangeAlt className="text-primary-blue text-sm rotate-90" />
            </button>
          </div>

          <div>
            <select
              value={searchData.destination}
              onChange={(e) => updateField('destination', e.target.value)}
              className={`w-full h-12 px-4 border rounded-lg text-sm input-focus ${
                errors.destination ? 'border-status-error' : 'border-neutral-gray3'
              }`}
            >
              <option value="">مقصد</option>
              {cityOptions.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
            {errors.destination && <p className="text-xs text-status-error mt-1">{errors.destination}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className={tripType !== 'roundtrip' ? 'col-span-2' : ''}>
              <PersianDatePicker
                value={searchData.departureDate}
                onChange={(value) => updateField('departureDate', value)}
                placeholder="تاریخ رفت"
                required
              />
              {errors.departureDate && <p className="text-xs text-status-error mt-1">{errors.departureDate}</p>}
            </div>
            {tripType === 'roundtrip' && (
              <PersianDatePicker
                value={searchData.returnDate}
                onChange={(value) => updateField('returnDate', value)}
                placeholder="تاریخ برگشت"
                minDate={searchData.departureDate}
              />
            )}
            <select
              value={searchData.passengers}
              onChange={(e) => updateField('passengers', parseInt(e.target.value))}
              className="h-12 px-3 border border-neutral-gray3 rounded-lg text-sm input-focus"
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>{n} مسافر</option>
              ))}
            </select>
            <select
              value={searchData.flightClass}
              onChange={(e) => updateField('flightClass', e.target.value as SearchData['flightClass'])}
              className="h-12 px-3 border border-neutral-gray3 rounded-lg text-sm input-focus"
            >
              <option value="economy">اقتصادی</option>
              <option value="business">بیزینس</option>
              <option value="first">فرست</option>
            </select>
          </div>

          <Button type="submit" fullWidth>
            <span>جستجوی پرواز</span>
            <FaPlane className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
