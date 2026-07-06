import { useQuery } from '@tanstack/react-query';
import { flightsApi } from '@/lib/api';
import { apiFightToFlight } from '@/lib/api-transforms';

export const flightQueryKeys = {
  search: (params: {
    origin: string;
    destination: string;
    departureDate: string;
    flightClass: string;
  }) => ['flights', 'search', params] as const,
  popular: () => ['flights', 'popular'] as const,
  destinations: () => ['flights', 'destinations'] as const,
  cities: () => ['flights', 'cities'] as const,
};

export function useFlightSearch(params: {
  origin: string | null;
  destination: string | null;
  departureDate: string | null;
  flightClass?: string | null;
}) {
  const enabled = Boolean(params.origin && params.destination && params.departureDate);

  return useQuery({
    queryKey: flightQueryKeys.search({
      origin: params.origin ?? '',
      destination: params.destination ?? '',
      departureDate: params.departureDate ?? '',
      flightClass: params.flightClass ?? 'economy',
    }),
    queryFn: () =>
      flightsApi
        .search({
          origin: params.origin!,
          destination: params.destination!,
          departure_date: params.departureDate!,
          flight_class: params.flightClass ?? 'economy',
        })
        .then((res) => res.map(apiFightToFlight)),
    enabled,
  });
}

export function usePopularFlights() {
  return useQuery({
    queryKey: flightQueryKeys.popular(),
    queryFn: () => flightsApi.getPopular(),
  });
}

export function usePopularDestinations() {
  return useQuery({
    queryKey: flightQueryKeys.destinations(),
    queryFn: () => flightsApi.getDestinations(),
  });
}

export function useFlightCities() {
  return useQuery({
    queryKey: flightQueryKeys.cities(),
    queryFn: () => flightsApi.getCities(),
    staleTime: 10 * 60 * 1000, // 10 minutes – cities rarely change
  });
}
