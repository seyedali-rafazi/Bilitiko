import Link from 'next/link';
import { IconType } from 'react-icons';
import { getCityName } from '@/lib/search-utils';

interface TripSearchSummaryProps {
  origin: string | null;
  destination: string | null;
  departureDate: string | null;
  passengers: string | null;
  tripType?: string | null;
  icon: IconType;
  title: string;
  backHref: string;
}

export default function TripSearchSummary({
  origin,
  destination,
  departureDate,
  passengers,
  tripType,
  icon: Icon,
  title,
  backHref,
}: TripSearchSummaryProps) {
  return (
    <div className="bg-white border border-neutral-gray2 rounded-xl search-box-shadow p-4 lg:p-6 mb-6 lg:mb-8">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary-blue p-2 rounded-lg">
            <Icon className="text-white text-lg" />
          </div>
          <h2 className="text-xl lg:text-2xl font-bold text-neutral-gray8">{title}</h2>
        </div>
        <Link href={backHref} className="text-sm text-primary-blue font-medium whitespace-nowrap hover:underline">
          جستجوی مجدد
        </Link>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <div className="bg-primary-tint1 rounded-xl p-3 lg:p-4 text-right">
          <span className="text-neutral-gray6 text-xs lg:text-sm block mb-1">مسیر</span>
          <span className="font-bold text-neutral-gray8 text-sm lg:text-base">
            {getCityName(origin)} ← {getCityName(destination)}
          </span>
        </div>
        <div className="bg-primary-tint1 rounded-xl p-3 lg:p-4 text-right">
          <span className="text-neutral-gray6 text-xs lg:text-sm block mb-1">تاریخ</span>
          <span className="font-bold text-neutral-gray8 text-sm lg:text-base ltr-input inline-block">
            {departureDate || '—'}
          </span>
        </div>
        <div className="bg-primary-tint1 rounded-xl p-3 lg:p-4 text-right">
          <span className="text-neutral-gray6 text-xs lg:text-sm block mb-1">مسافران</span>
          <span className="font-bold text-neutral-gray8 text-sm lg:text-base">{passengers || '1'} نفر</span>
        </div>
        <div className="bg-primary-tint1 rounded-xl p-3 lg:p-4 text-right">
          <span className="text-neutral-gray6 text-xs lg:text-sm block mb-1">نوع سفر</span>
          <span className="font-bold text-neutral-gray8 text-sm lg:text-base">
            {tripType === 'roundtrip' ? 'رفت و برگشت' : 'رفت'}
          </span>
        </div>
      </div>
    </div>
  );
}
