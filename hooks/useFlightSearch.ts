'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CITIES } from '@/lib/constants';
import {
  addSearchHistory,
  buildFlightSearchUrl,
  createDefaultSearchData,
  validateFlightSearch,
  type FlightSearchErrors,
} from '@/lib/search-utils';
import type { SearchData } from '@/lib/types';

export function useFlightSearch() {
  const router = useRouter();
  const [searchData, setSearchData] = useState<SearchData>(createDefaultSearchData);
  const [errors, setErrors] = useState<FlightSearchErrors>({});

  const swapCities = useCallback(() => {
    setSearchData((s) => ({ ...s, origin: s.destination, destination: s.origin }));
    setErrors({});
  }, []);

  const updateField = useCallback(<K extends keyof SearchData>(key: K, value: SearchData[K]) => {
    setSearchData((s) => ({ ...s, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }, []);

  const submitSearch = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault();

      const validation = validateFlightSearch(searchData);
      if (Object.keys(validation).length > 0) {
        setErrors(validation);
        return;
      }

      const originName = CITIES.find((c) => c.code === searchData.origin)?.name;
      const destName = CITIES.find((c) => c.code === searchData.destination)?.name;

      const url = buildFlightSearchUrl(searchData);
      router.push(url);

      if (originName && destName) {
        try {
          addSearchHistory(`${originName} به ${destName}`);
        } catch {
          // navigation already started
        }
      }
    },
    [router, searchData]
  );

  return {
    searchData,
    setSearchData,
    errors,
    swapCities,
    updateField,
    submitSearch,
  };
}
