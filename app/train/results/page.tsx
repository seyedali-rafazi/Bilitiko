'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useState, useMemo, useCallback, useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import SearchSummary from '@/components/flights/SearchSummary';
import TransportCard from '@/components/transport/TransportCard';
import MobileTransportCard from '@/components/transport/MobileTransportCard';
import TransportToolbar from '@/components/transport/TransportToolbar';
import TransportFiltersSidebar from '@/components/transport/TransportFiltersSidebar';
import TransportResultsHeader from '@/components/transport/TransportResultsHeader';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useAppDispatch } from '@/lib/store/hooks';
import { selectTransport } from '@/lib/store/bookingSlice';
import { getPriceBounds, getUniqueCompanies, type TransportTrip } from '@/lib/transport-utils';
import { transportApi } from '@/lib/api';
import { apiTripToTransportTrip } from '@/lib/api-transforms';
import { useAuth } from '@/hooks/useAuth';

function TrainResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAuth();
  const [sort, setSort] = useState('cheapest');
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, Infinity]);
  const [activeDate, setActiveDate] = useState<string | null>(null);
  const [allTrips, setAllTrips] = useState<TransportTrip[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');

  const origin = searchParams.get('origin');
  const destination = searchParams.get('destination');
  const departureDate = searchParams.get('departureDate');
  const passengers = searchParams.get('passengers');
  const tripType = searchParams.get('tripType');
  const noResults = searchParams.get('empty') === '1';

  const displayDate = activeDate ?? departureDate;

  useEffect(() => {
    setActiveDate(departureDate);
  }, [departureDate]);

  useEffect(() => {
    if (!origin || !destination || !departureDate) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setFetchError('');

    transportApi
      .search({
        transport_type: 'train',
        origin,
        destination,
        departure_date: departureDate,
      })
      .then((res) => {
        setAllTrips(res.map(apiTripToTransportTrip));
      })
      .catch((err: unknown) => {
        setFetchError(err instanceof Error ? err.message : 'خطا در دریافت قطارها');
      })
      .finally(() => setLoading(false));
  }, [origin, destination, departureDate, passengers]);

  const { min: minPrice, max: maxPrice } = useMemo(() => getPriceBounds(allTrips), [allTrips]);

  useEffect(() => {
    if (allTrips.length > 0) setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice, allTrips.length]);

  const toggleCompany = useCallback((company: string) => {
    setSelectedCompanies((prev) =>
      prev.includes(company) ? prev.filter((c) => c !== company) : [...prev, company]
    );
  }, []);

  const trips = useMemo(() => {
    let list = [...allTrips];

    if (selectedCompanies.length > 0) {
      list = list.filter((t) => selectedCompanies.includes(t.company));
    }
    if (priceRange[0] > 0 || priceRange[1] < Infinity) {
      list = list.filter((t) => t.price >= priceRange[0] && t.price <= priceRange[1]);
    }

    if (sort === 'cheapest') list.sort((a, b) => a.price - b.price);
    if (sort === 'earliest') list.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
    if (sort === 'latest') list.sort((a, b) => b.departureTime.localeCompare(a.departureTime));
    return list;
  }, [sort, selectedCompanies, priceRange, allTrips]);

  const basePrice = useMemo(() => {
    if (trips.length > 0) return Math.min(...trips.map((t) => t.price));
    return minPrice;
  }, [trips, minPrice]);

  const handleSelectTrip = (tripId: number) => {
    if (!isLoggedIn) {
      const returnUrl = encodeURIComponent(`/booking?tripId=${tripId}&type=train&passengers=${passengers || '1'}`);
      router.push(`/login?returnUrl=${returnUrl}`);
      return;
    }
    const trip = allTrips.find((t) => t._id === tripId);
    if (trip) {
      dispatch(selectTransport({ trip, transportType: 'train' }));
    }
    router.push(`/booking?tripId=${tripId}&type=train&passengers=${passengers || '1'}`);
  };

  const handleDateSelect = useCallback((date: string) => {
    setActiveDate(date);
    const params = new URLSearchParams(window.location.search);
    params.set('departureDate', date);
    window.history.replaceState(null, '', `/train/results?${params.toString()}`);
  }, []);

  if (loading) {
    return (
      <PageLayout showFooter={false} mobileTitle="نتایج قطار">
        <LoadingSpinner message="در حال جستجو" />
      </PageLayout>
    );
  }

  return (
    <PageLayout showFooter={false} mobileTitle="نتایج قطار">
        <div className="container mx-auto px-0 lg:px-4 py-4 lg:py-8 max-w-[1224px]">
        <div className="px-4 lg:px-0">
          <SearchSummary
            origin={origin}
            destination={destination}
            departureDate={displayDate}
            passengers={passengers}
            flightClass={tripType}
          />
        </div>

        <TransportToolbar
          sort={sort}
          onSortChange={setSort}
          trips={allTrips}
          filteredCount={trips.length}
          selectedCompanies={selectedCompanies}
          priceRange={priceRange}
          departureDate={displayDate}
          onCompanyToggle={toggleCompany}
          onPriceRangeChange={setPriceRange}
          basePrice={basePrice}
          onDateSelect={handleDateSelect}
          type="train"
          companies={getUniqueCompanies(allTrips)}
        />

        <div className="flex gap-4 lg:gap-6 px-4 lg:px-0">
          <TransportFiltersSidebar
            trips={allTrips}
            filteredCount={trips.length}
            selectedCompanies={selectedCompanies}
            priceRange={priceRange}
            departureDate={displayDate}
            onCompanyToggle={toggleCompany}
            onPriceRangeChange={setPriceRange}
            type="train"
            companies={getUniqueCompanies(allTrips)}
          />

          <div className="flex-1 lg:w-[80%] min-w-0">
            <TransportResultsHeader
              sort={sort}
              onSortChange={setSort}
              departureDate={displayDate}
              basePrice={basePrice}
              onDateSelect={handleDateSelect}
            />

            {fetchError ? (
              <div className="bg-white border border-neutral-gray2 rounded-xl p-12 text-center">
                <div className="text-5xl mb-4">⚠️</div>
                <p className="text-lg font-bold text-neutral-gray8 mb-2">خطا در دریافت اطلاعات</p>
                <p className="text-sm text-neutral-gray6 mb-6">{fetchError}</p>
                <button
                  onClick={() => router.push('/train')}
                  className="bg-primary-blue text-white px-6 py-3 rounded-lg text-sm font-medium"
                >
                  جستجوی مجدد
                </button>
              </div>
            ) : noResults || trips.length === 0 ? (
              <div className="bg-white border border-neutral-gray2 rounded-xl p-12 text-center">
                <p className="text-lg font-bold text-neutral-gray8 mb-2">قطاری یافت نشد</p>
                <p className="text-sm text-neutral-gray6 mb-6">لطفاً فیلترها یا تاریخ را تغییر دهید</p>
                <button
                  onClick={() => router.push('/train')}
                  className="bg-primary-blue text-white px-6 py-3 rounded-lg text-sm font-medium"
                >
                  جستجوی مجدد
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {trips.map((trip, index) => (
                  <div key={trip._id}>
                    <div className="hidden lg:block">
                      <TransportCard trip={trip} index={index} onSelect={handleSelectTrip} type="train" />
                    </div>
                    <MobileTransportCard trip={trip} onSelect={handleSelectTrip} type="train" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        </div>
      </PageLayout>
  );
}

export default function TrainResultsPage() {
  return (
    <Suspense fallback={<LoadingSpinner message="در حال جستجو" />}>
      <TrainResultsContent />
    </Suspense>
  );
}
