import type { UserTicket } from '@/lib/types';
import type { ApiBookingResponse, ApiInsuranceBookingResponse } from '@/lib/api';

const VALID_STATUSES = new Set<string>(['confirmed', 'pending', 'cancelled']);

export function safePrice(raw: number | string | undefined | null): number {
  if (raw == null) return 0;
  const n = typeof raw === 'number' ? raw : parseFloat(String(raw));
  return isNaN(n) ? 0 : n;
}

export function safeStatus(raw: string | undefined | null): UserTicket['status'] {
  const s = (raw ?? '').toLowerCase();
  return VALID_STATUSES.has(s) ? (s as UserTicket['status']) : 'confirmed';
}

export function bookingToTicket(b: ApiBookingResponse): UserTicket {
  const passenger = b.passengers?.[0];
  const passengerName = passenger ? `${passenger.first_name} ${passenger.last_name}` : '';
  const type = (b.booking_type ?? 'flight') as UserTicket['type'];
  const titleMap: Record<string, string> = {
    flight: 'بلیط پرواز', bus: 'بلیط اتوبوس', train: 'بلیط قطار',
  };

  return {
    _id: String(b._id ?? b.tracking_code),
    type,
    title: titleMap[type] ?? 'بلیط',
    subtitle: passengerName,
    date: (b.created_at ?? '').slice(0, 10),
    price: safePrice(b.total_price),
    status: safeStatus(b.status),
    trackingCode: b.tracking_code ?? '',
    seatNumbers: b.seat_numbers,
  };
}

export function insuranceBookingToTicket(b: ApiInsuranceBookingResponse): UserTicket {
  return {
    _id: b.tracking_code,
    type: 'insurance',
    title: b.plan_title ?? 'بیمه مسافرتی',
    subtitle: `${b.first_name ?? ''} ${b.last_name ?? ''} • ${b.destination ?? ''}`.trim(),
    date: b.start_date ?? '',
    price: safePrice(b.plan_price),
    status: 'confirmed',
    trackingCode: b.tracking_code ?? '',
    planId: b.plan_id,
    coverage: b.plan_coverage,
    destination: b.destination,
  };
}
