import { CITIES } from './constants';
import type { SearchData } from './types';

export function getCityName(code: string | null | undefined): string {
  if (!code) return '—';
  return CITIES.find((c) => c.code === code)?.name ?? code;
}

export function buildFlightSearchUrl(data: Partial<SearchData>): string {
  const params = new URLSearchParams();
  if (data.origin) params.set('origin', data.origin);
  if (data.destination) params.set('destination', data.destination);
  if (data.departureDate) params.set('departureDate', data.departureDate);
  if (data.returnDate) params.set('returnDate', data.returnDate);
  if (data.passengers) params.set('passengers', String(data.passengers));
  if (data.flightClass) params.set('flightClass', data.flightClass);
  return `/flights?${params.toString()}`;
}

export function buildTripSearchUrl(
  basePath: '/bus/results' | '/train/results',
  data: Partial<SearchData>,
  tripType: string
): string {
  const params = new URLSearchParams();
  if (data.origin) params.set('origin', data.origin);
  if (data.destination) params.set('destination', data.destination);
  if (data.departureDate) params.set('departureDate', data.departureDate);
  if (tripType === 'roundtrip' && data.returnDate) params.set('returnDate', data.returnDate);
  if (data.passengers) params.set('passengers', String(data.passengers));
  params.set('tripType', tripType);
  return `${basePath}?${params.toString()}`;
}

export function parseRouteHistory(item: string): { origin: string; destination: string } | null {
  const parts = item.split(' به ');
  if (parts.length !== 2) return null;
  const origin = CITIES.find((c) => c.name === parts[0].trim())?.code;
  const destination = CITIES.find((c) => c.name === parts[1].trim())?.code;
  if (!origin || !destination) return null;
  return { origin, destination };
}

export const SEARCH_HISTORY_KEY = 'bilito-search-history';

export function loadSearchHistory(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(SEARCH_HISTORY_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function saveSearchHistory(items: string[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(items.slice(0, 12)));
  } catch {
    // ignore quota / private mode errors
  }
}

export function addSearchHistory(routeLabel: string): void {
  try {
    const items = loadSearchHistory().filter((i) => i !== routeLabel);
    saveSearchHistory([routeLabel, ...items]);
  } catch {
    // ignore storage errors — must not block navigation
  }
}

export function getDefaultDepartureDate(): string {
  return new Date().toISOString().split('T')[0];
}

export function createDefaultSearchData(): SearchData {
  return {
    origin: '',
    destination: '',
    departureDate: getDefaultDepartureDate(),
    returnDate: '',
    passengers: 1,
    flightClass: 'economy',
  };
}

export type FlightSearchErrors = Partial<Record<'origin' | 'destination' | 'departureDate', string>>;

export function validateFlightSearch(data: SearchData): FlightSearchErrors {
  const errors: FlightSearchErrors = {};
  if (!data.origin) errors.origin = 'مبدا را انتخاب کنید';
  if (!data.destination) errors.destination = 'مقصد را انتخاب کنید';
  if (!data.departureDate) errors.departureDate = 'تاریخ رفت را انتخاب کنید';
  if (data.origin && data.destination && data.origin === data.destination) {
    errors.destination = 'مقصد باید با مبدا متفاوت باشد';
  }
  return errors;
}
