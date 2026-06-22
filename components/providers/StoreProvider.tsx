'use client';

import { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import { hydrateBooking, type BookingState } from '@/lib/store/bookingSlice';
import { makeStore, type AppStore } from '@/lib/store';
import type { BookingData } from '@/lib/types';

const REDUX_BOOKING_KEY = 'bilito-booking-redux';

function loadPersistedBooking(): BookingState | null {
  if (typeof window === 'undefined') return null;

  try {
    const saved = localStorage.getItem(REDUX_BOOKING_KEY);
    if (saved) {
      return JSON.parse(saved) as BookingState;
    }
  } catch {
    // ignore
  }

  try {
    const legacy = localStorage.getItem('bookingData');
    if (!legacy) return null;

    const data = JSON.parse(legacy) as BookingData;
    if (!data.flight && !data.trip && !data.transportType) return null;

    return {
      flight: data.flight ?? null,
      trip: data.trip ?? null,
      transportType: data.transportType ?? null,
      passengers: data.passengers ?? [],
      contactInfo: data.contactInfo ?? { email: '', phone: '' },
    };
  } catch {
    return null;
  }
}

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
    const persisted = loadPersistedBooking();
    if (persisted) {
      storeRef.current.dispatch(hydrateBooking(persisted));
    }
  }

  useEffect(() => {
    const store = storeRef.current;
    if (!store) return;

    return store.subscribe(() => {
      const booking = store.getState().booking;
      localStorage.setItem(REDUX_BOOKING_KEY, JSON.stringify(booking));
    });
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
