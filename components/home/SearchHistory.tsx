'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaChevronLeft, FaChevronRight, FaHistory } from 'react-icons/fa';
import { SEARCH_HISTORY } from '@/lib/constants';
import {
  buildFlightSearchUrl,
  loadSearchHistory,
  parseRouteHistory,
  saveSearchHistory,
} from '@/lib/search-utils';

export default function SearchHistory() {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<string[]>(SEARCH_HISTORY);

  useEffect(() => {
    const stored = loadSearchHistory();
    setItems(stored.length > 0 ? stored : SEARCH_HISTORY);
  }, []);

  const persist = useCallback((next: string[]) => {
    setItems(next);
    saveSearchHistory(next);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = direction === 'left' ? -240 : 240;
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  const clearAll = () => persist([]);

  const removeItem = (index: number) => {
    persist(items.filter((_, i) => i !== index));
  };

  const openRoute = (item: string) => {
    const route = parseRouteHistory(item);
    if (!route) return;
    const today = new Date().toISOString().split('T')[0];
    router.push(
      buildFlightSearchUrl({
        origin: route.origin,
        destination: route.destination,
        departureDate: today,
        passengers: 1,
        flightClass: 'economy',
      })
    );
  };

  if (items.length === 0) return null;

  return (
    <div className="container mx-auto px-4 mb-12 max-w-[1224px]">
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={clearAll}
          className="text-primary-blue text-sm lg:text-lg hover:text-primary-shade1 transition-colors"
        >
          پاک کردن همه
        </button>
        <div className="flex items-center gap-2">
          <span className="text-neutral-gray8 text-base lg:text-lg font-medium">تاریخچه جستجو</span>
          <FaHistory className="text-neutral-gray6 w-5 h-5" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => scroll('right')}
          aria-label="اسکرول به راست"
          className="w-10 h-10 border border-neutral-gray3 rounded-lg flex items-center justify-center shrink-0 hover:border-primary-blue hover:text-primary-blue transition-colors"
        >
          <FaChevronRight className="text-neutral-gray7" />
        </button>

        <div
          ref={scrollRef}
          className="flex-1 flex items-center gap-3 overflow-x-auto scrollbar-hide py-1"
        >
          {items.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="flex items-center gap-3 px-4 py-2.5 bg-white border border-neutral-gray3 rounded-lg whitespace-nowrap shrink-0 hover:border-primary-blue transition-colors"
            >
              <button
                type="button"
                onClick={() => openRoute(item)}
                className="text-sm text-neutral-gray7 hover:text-primary-blue transition-colors"
              >
                {item}
              </button>
              <button
                type="button"
                onClick={() => removeItem(index)}
                aria-label="حذف"
                className="text-neutral-gray5 hover:text-status-error text-xs w-5 h-5 flex items-center justify-center"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => scroll('left')}
          aria-label="اسکرول به چپ"
          className="w-10 h-10 border border-neutral-gray3 rounded-lg flex items-center justify-center shrink-0 hover:border-primary-blue hover:text-primary-blue transition-colors"
        >
          <FaChevronLeft className="text-neutral-gray7" />
        </button>
      </div>
    </div>
  );
}
