import type { Flight } from './types';

/** Derives the unique set of airlines present in the given flights array. */
export function getUniqueAirlines(flights: Flight[]): string[] {
  return Array.from(new Set(flights.map((f) => f.airline))).sort();
}

// Keep static list for fallback / legacy references
export const AIRLINES = ['ماهان', 'ایران‌ایر', 'آتا', 'قشم‌ایر', 'زاگرس', 'کاسپین', 'آسمان'];

export const STOP_OPTIONS = [
  { value: 0, label: 'بدون توقف' },
  { value: 1, label: '۱ توقف' },
];

export const SORT_OPTIONS = [
  { id: 'cheapest', label: 'ارزان‌ترین' },
  { id: 'earliest', label: 'زودترین پرواز' },
  { id: 'latest', label: 'دیرترین پرواز' },
  { id: 'shortest', label: 'کوتاه‌ترین' },
];

export function formatPriceShort(price: number): string {
  if (price >= 1_000_000) {
    return `${(price / 1_000_000).toFixed(1)}M`;
  }
  return price.toLocaleString('fa-IR');
}

export function formatPriceFull(price: number): string {
  return price.toLocaleString('fa-IR');
}

export function getPriceBounds(flights: Flight[]): { min: number; max: number } {
  if (flights.length === 0) return { min: 0, max: 0 };
  const prices = flights.map((f) => f.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

export function buildPriceHistogram(flights: Flight[], buckets = 8): number[] {
  if (flights.length === 0) return Array(buckets).fill(0);
  const { min, max } = getPriceBounds(flights);
  const range = max - min || 1;
  const counts = Array(buckets).fill(0);
  flights.forEach((f) => {
    const idx = Math.min(buckets - 1, Math.floor(((f.price - min) / range) * buckets));
    counts[idx]++;
  });
  return counts;
}

export function parseIsoDate(isoDate: string): { year: number; month: number; day: number } {
  const [year, month, day] = isoDate.split('-').map(Number);
  return { year, month, day };
}

export function addDays(isoDate: string, days: number): string {
  const { year, month, day } = parseIsoDate(isoDate);
  const d = new Date(year, month - 1, day);
  d.setDate(d.getDate() + days);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${dd}`;
}

export function formatDateLabel(isoDate: string): { day: string; month: string; weekday: string } {
  const { year, month, day } = parseIsoDate(isoDate);
  const d = new Date(year, month - 1, day);
  const weekday = d.toLocaleDateString('fa-IR', { weekday: 'short' });
  const dayLabel = d.toLocaleDateString('fa-IR', { day: 'numeric' });
  const monthLabel = d.toLocaleDateString('fa-IR', { month: 'short' });
  return { day: dayLabel, month: monthLabel, weekday };
}

export function buildDatePriceStrip(centerDate: string | null, basePrice: number) {
  const center = centerDate || new Date().toISOString().slice(0, 10);
  return Array.from({ length: 9 }, (_, i) => {
    const offset = i - 4;
    const date = addDays(center, offset);
    const price = Math.round(basePrice * (1 + offset * 0.04 + (Math.abs(offset) % 2) * 0.02));
    return { date, offset, price, isCenter: date === center };
  });
}

export function getStopsLabel(stops: number): string {
  if (stops === 0) return 'بدون توقف';
  return `${stops.toLocaleString('fa-IR')} توقف`;
}
