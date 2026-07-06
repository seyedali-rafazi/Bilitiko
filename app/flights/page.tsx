"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState, useMemo, useCallback, useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import SearchSummary from "@/components/flights/SearchSummary";
import FlightCard from "@/components/flights/FlightCard";
import MobileFlightCard from "@/components/flights/MobileFlightCard";
import FlightToolbar from "@/components/flights/FlightToolbar";
import FlightFiltersSidebar from "@/components/flights/FlightFiltersSidebar";
import FlightResultsHeader from "@/components/flights/FlightResultsHeader";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useAppDispatch } from "@/lib/store/hooks";
import { selectFlight } from "@/lib/store/bookingSlice";
import { getPriceBounds } from "@/lib/flight-utils";
import { useFlightSearch } from "@/hooks/queries";
import { useAuth } from "@/hooks/useAuth";

function FlightsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAuth();
  const [sort, setSort] = useState("cheapest");
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [selectedStops, setSelectedStops] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, Infinity]);
  const [activeDate, setActiveDate] = useState<string | null>(null);

  const origin = searchParams.get("origin");
  const destination = searchParams.get("destination");
  const departureDate = searchParams.get("departureDate");
  const passengers = searchParams.get("passengers");
  const flightClass = searchParams.get("flightClass");
  const noResults = searchParams.get("empty") === "1";

  const displayDate = activeDate ?? departureDate;

  useEffect(() => {
    setActiveDate(departureDate);
  }, [departureDate]);

  const {
    data: allFlights = [],
    isLoading,
    error,
  } = useFlightSearch({
    origin,
    destination,
    departureDate: displayDate,
    flightClass,
  });

  const fetchError = error
    ? error instanceof Error
      ? error.message
      : "خطا در دریافت پروازها"
    : "";

  const { min: minPrice, max: maxPrice } = useMemo(
    () => getPriceBounds(allFlights),
    [allFlights],
  );

  useEffect(() => {
    if (allFlights.length > 0) setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice, allFlights.length]);

  const toggleAirline = useCallback((airline: string) => {
    setSelectedAirlines((prev) =>
      prev.includes(airline)
        ? prev.filter((a) => a !== airline)
        : [...prev, airline],
    );
  }, []);

  const toggleStops = useCallback((stops: number) => {
    setSelectedStops((prev) =>
      prev.includes(stops) ? prev.filter((s) => s !== stops) : [...prev, stops],
    );
  }, []);

  const flights = useMemo(() => {
    let list = [...allFlights];

    if (selectedAirlines.length > 0) {
      list = list.filter((f) => selectedAirlines.includes(f.airline));
    }
    if (selectedStops.length > 0) {
      list = list.filter((f) => selectedStops.includes(f.stops));
    }
    if (priceRange[0] > 0 || priceRange[1] < Infinity) {
      list = list.filter(
        (f) => f.price >= priceRange[0] && f.price <= priceRange[1],
      );
    }

    if (sort === "cheapest") list.sort((a, b) => a.price - b.price);
    if (sort === "earliest")
      list.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
    if (sort === "latest")
      list.sort((a, b) => b.departureTime.localeCompare(a.departureTime));
    return list;
  }, [sort, selectedAirlines, selectedStops, priceRange, allFlights]);

  const basePrice = useMemo(() => {
    if (flights.length > 0) return Math.min(...flights.map((f) => f.price));
    return minPrice;
  }, [flights, minPrice]);

  const handleSelectFlight = (flightId: number) => {
    if (!isLoggedIn) {
      const returnUrl = encodeURIComponent(
        `/booking?flightId=${flightId}&passengers=${passengers}`,
      );
      router.push(`/login?returnUrl=${returnUrl}`);
      return;
    }
    const flight = allFlights.find((f) => f._id === flightId);
    if (flight) {
      dispatch(selectFlight(flight));
    }
    router.push(`/booking?flightId=${flightId}&passengers=${passengers}`);
  };

  const handleDateSelect = useCallback((date: string) => {
    setActiveDate(date);
    const params = new URLSearchParams(window.location.search);
    params.set("departureDate", date);
    window.history.replaceState(null, "", `/flights?${params.toString()}`);
  }, []);

  if (isLoading) {
    return (
      <PageLayout showFooter={false} mobileTitle="نتایج جستجو">
        <LoadingSpinner message="در حال جستجوی پرواز…" />
      </PageLayout>
    );
  }

  return (
    <PageLayout showFooter={false} mobileTitle="نتایج جستجو">
      <div className="container mx-auto px-0 lg:px-4 py-4 lg:py-8 max-w-[1224px]">
        <div className="px-4 lg:px-0">
          <SearchSummary
            origin={origin}
            destination={destination}
            departureDate={displayDate}
            passengers={passengers}
            flightClass={flightClass}
          />
        </div>

        <FlightToolbar
          sort={sort}
          onSortChange={setSort}
          flights={allFlights}
          filteredCount={flights.length}
          selectedAirlines={selectedAirlines}
          selectedStops={selectedStops}
          priceRange={priceRange}
          departureDate={displayDate}
          onAirlineToggle={toggleAirline}
          onStopsToggle={toggleStops}
          onPriceRangeChange={setPriceRange}
          basePrice={basePrice}
          onDateSelect={handleDateSelect}
        />

        <div className="flex gap-4 lg:gap-6 px-4 lg:px-0">
          <FlightFiltersSidebar
            flights={allFlights}
            filteredCount={flights.length}
            selectedAirlines={selectedAirlines}
            selectedStops={selectedStops}
            priceRange={priceRange}
            departureDate={displayDate}
            onAirlineToggle={toggleAirline}
            onStopsToggle={toggleStops}
            onPriceRangeChange={setPriceRange}
          />

          <div className="flex-1 lg:w-[80%] min-w-0">
            <FlightResultsHeader
              sort={sort}
              onSortChange={setSort}
              departureDate={displayDate}
              basePrice={basePrice}
              onDateSelect={handleDateSelect}
            />

            {fetchError ? (
              <div className="bg-white border border-neutral-gray2 rounded-xl p-12 text-center">
                <div className="text-5xl mb-4">⚠️</div>
                <p className="text-lg font-bold text-neutral-gray8 mb-2">
                  خطا در دریافت اطلاعات
                </p>
                <p className="text-sm text-neutral-gray6 mb-6">{fetchError}</p>
                <button
                  onClick={() => router.push("/")}
                  className="bg-primary-blue text-white px-6 py-3 rounded-lg text-sm font-medium"
                >
                  جستجوی مجدد
                </button>
              </div>
            ) : noResults || flights.length === 0 ? (
              <div className="bg-white border border-neutral-gray2 rounded-xl p-12 text-center">
                <p className="text-lg font-bold text-neutral-gray8 mb-2">
                  پروازی یافت نشد
                </p>
                <p className="text-sm text-neutral-gray6 mb-6">
                  لطفاً فیلترها یا تاریخ را تغییر دهید
                </p>
                <button
                  onClick={() => router.push("/")}
                  className="bg-primary-blue text-white px-6 py-3 rounded-lg text-sm font-medium"
                >
                  جستجوی مجدد
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {flights.map((flight, index) => (
                  <div key={flight._id}>
                    <div className="hidden lg:block">
                      <FlightCard
                        flight={flight}
                        index={index}
                        onSelect={handleSelectFlight}
                      />
                    </div>
                    <MobileFlightCard
                      flight={flight}
                      onSelect={handleSelectFlight}
                    />
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

export default function FlightsPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <FlightsContent />
    </Suspense>
  );
}
