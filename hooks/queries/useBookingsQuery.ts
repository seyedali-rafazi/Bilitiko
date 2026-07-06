import { useQuery } from '@tanstack/react-query';
import { bookingsApi } from '@/lib/api';

export const bookingQueryKeys = {
  myBookings: () => ['bookings', 'my-bookings'] as const,
  track: (code: string) => ['bookings', 'track', code] as const,
};

export function useMyBookings(enabled = true) {
  return useQuery({
    queryKey: bookingQueryKeys.myBookings(),
    queryFn: () => bookingsApi.getMyBookings(),
    enabled,
  });
}

export function useTrackBooking(trackingCode: string | null) {
  return useQuery({
    queryKey: bookingQueryKeys.track(trackingCode ?? ''),
    queryFn: () => bookingsApi.trackBooking(trackingCode!),
    enabled: Boolean(trackingCode),
  });
}
