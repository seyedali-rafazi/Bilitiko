'use client';

import { useState } from 'react';
import { FaFilter, FaSort, FaCalendarAlt } from 'react-icons/fa';
import BottomSheet from '@/components/mobile/BottomSheet';
import FlightFiltersContent, { type FlightFiltersContentProps } from '@/components/flights/FlightFiltersContent';
import { Button } from '@/components/ui/shadcn/button';
import { buildDatePriceStrip, formatDateLabel, formatPriceShort } from '@/lib/flight-utils';
import { cn } from '@/lib/utils';

interface FlightToolbarProps extends FlightFiltersContentProps {
  sort: string;
  onSortChange: (sort: string) => void;
  basePrice: number;
  onDateSelect: (date: string) => void;
}

const sortOptions = [
  { id: 'cheapest', label: 'ارزان‌ترین' },
  { id: 'earliest', label: 'زودترین پرواز' },
  { id: 'latest', label: 'دیرترین پرواز' },
  { id: 'shortest', label: 'کوتاه‌ترین' },
];

export default function FlightToolbar({
  sort,
  onSortChange,
  basePrice,
  onDateSelect,
  ...filterProps
}: FlightToolbarProps) {
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const dateStrip = buildDatePriceStrip(filterProps.departureDate, basePrice);

  return (
    <>
      <div className="flex items-center gap-2 px-4 py-3 overflow-x-auto lg:hidden">
        <button
          onClick={() => setSortOpen(true)}
          className="shrink-0 flex items-center gap-2 px-3 py-2 bg-white border border-neutral-gray3 rounded-lg text-sm"
        >
          <FaSort className="text-primary-blue" />
          <span>مرتب‌سازی</span>
        </button>
        <button
          onClick={() => setFilterOpen(true)}
          className="shrink-0 flex items-center gap-2 px-3 py-2 bg-white border border-neutral-gray3 rounded-lg text-sm"
        >
          <FaFilter className="text-primary-blue" />
          <span>فیلتر</span>
        </button>
        <button
          onClick={() => setCalendarOpen(true)}
          className="shrink-0 flex items-center gap-2 px-3 py-2 bg-white border border-neutral-gray3 rounded-lg text-sm"
        >
          <FaCalendarAlt className="text-primary-blue" />
          <span>تقویم قیمت</span>
        </button>
      </div>

      <BottomSheet open={sortOpen} onClose={() => setSortOpen(false)} title="مرتب‌سازی">
        <div className="space-y-2">
          {sortOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => {
                onSortChange(opt.id);
                setSortOpen(false);
              }}
              className={cn(
                'w-full text-right px-4 py-3 rounded-lg text-sm transition-colors',
                sort === opt.id ? 'bg-primary-tint1 text-primary-blue font-bold' : 'text-neutral-gray8'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </BottomSheet>

      <BottomSheet open={filterOpen} onClose={() => setFilterOpen(false)} title="فیلتر پروازها">
        <FlightFiltersContent {...filterProps} compact />
        <Button onClick={() => setFilterOpen(false)} className="w-full mt-4 sticky bottom-0">
          اعمال فیلتر
        </Button>
      </BottomSheet>

      <BottomSheet open={calendarOpen} onClose={() => setCalendarOpen(false)} title="قیمت بر اساس تاریخ">
        <div className="grid grid-cols-3 gap-2">
          {dateStrip.map(({ date, price, isCenter }) => {
            const { day, month, weekday } = formatDateLabel(date);
            return (
              <button
                key={date}
                type="button"
                onClick={() => {
                  onDateSelect(date);
                  setCalendarOpen(false);
                }}
                className={cn(
                  'flex flex-col items-center py-3 px-2 rounded-xl border transition-all',
                  isCenter
                    ? 'bg-primary text-primary-foreground border-primary shadow-md'
                    : 'bg-white border-neutral-gray3 hover:border-primary hover:bg-primary-tint1'
                )}
              >
                <span className={cn('text-[10px]', isCenter ? 'text-primary-foreground/80' : 'text-muted-foreground')}>
                  {weekday}
                </span>
                <span className="text-sm font-bold">{day}</span>
                <span className={cn('text-[10px]', isCenter ? 'text-primary-foreground/80' : 'text-muted-foreground')}>
                  {month}
                </span>
                <span className={cn('text-xs font-bold mt-1', !isCenter && 'text-primary')}>
                  {formatPriceShort(price)}
                </span>
              </button>
            );
          })}
        </div>
      </BottomSheet>
    </>
  );
}
