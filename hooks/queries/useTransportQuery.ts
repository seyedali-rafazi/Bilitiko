import { useQuery } from '@tanstack/react-query';
import { transportApi } from '@/lib/api';
import { apiTripToTransportTrip } from '@/lib/api-transforms';

export const transportQueryKeys = {
  search: (params: {
    transport_type: 'bus' | 'train';
    origin: string;
    destination: string;
    departureDate: string;
  }) => ['transport', 'search', params] as const,
  cities: (transport_type?: 'bus' | 'train') => ['transport', 'cities', transport_type] as const,
};

export function useTransportSearch(params: {
  transport_type: 'bus' | 'train';
  origin: string | null;
  destination: string | null;
  departureDate: string | null;
}) {
  const enabled = Boolean(params.origin && params.destination && params.departureDate);

  return useQuery({
    queryKey: transportQueryKeys.search({
      transport_type: params.transport_type,
      origin: params.origin ?? '',
      destination: params.destination ?? '',
      departureDate: params.departureDate ?? '',
    }),
    queryFn: () =>
      transportApi
        .search({
          transport_type: params.transport_type,
          origin: params.origin!,
          destination: params.destination!,
          departure_date: params.departureDate!,
        })
        .then((res) => res.map(apiTripToTransportTrip)),
    enabled,
  });
}

export function useTransportCities(transport_type?: 'bus' | 'train') {
  return useQuery({
    queryKey: transportQueryKeys.cities(transport_type),
    queryFn: () => transportApi.getCities(transport_type),
    staleTime: 10 * 60 * 1000,
  });
}
