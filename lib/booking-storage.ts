import type { BookingState } from './store/bookingSlice';
import type { BookingData, Flight, TransportTrip, UserTicket } from './types';

const LEGACY_BOOKING_KEY = 'bookingData';
const REDUX_BOOKING_KEY = 'bilito-booking-redux';

export function bookingStateToData(state: BookingState): BookingData {
  return {
    flightId: state.flight ? String(state.flight._id) : null,
    flight: state.flight ?? undefined,
    tripId: state.trip ? String(state.trip._id) : null,
    transportType: state.transportType ?? undefined,
    trip: state.trip ?? undefined,
    passengers: state.passengers,
    contactInfo: state.contactInfo,
  };
}

/** These finders are only used for recovery from Redux state; real data comes from the API. */
export function findTrip(
  _tripId: string | number,
  _transportType: 'bus' | 'train'
): TransportTrip | undefined {
  return undefined;
}

export function findFlight(_flightId: string | number): Flight | undefined {
  return undefined;
}

export type ResolvedBooking =
  | { kind: 'flight'; flight: Flight; pricePerTicket: number }
  | { kind: 'transport'; trip: TransportTrip; transportType: 'bus' | 'train'; pricePerTicket: number };

export function resolveBooking(data: BookingData): ResolvedBooking | null {
  if (data.flightId || data.flight) {
    const flight = data.flight ?? (data.flightId ? findFlight(data.flightId) : undefined);
    if (flight) {
      return { kind: 'flight', flight, pricePerTicket: flight.price };
    }
  }

  if (data.transportType) {
    const trip =
      data.trip ?? (data.tripId ? findTrip(data.tripId, data.transportType) : undefined);
    if (trip) {
      return {
        kind: 'transport',
        trip,
        transportType: data.transportType,
        pricePerTicket: trip.price,
      };
    }
  }

  return null;
}

export function resolveBookingState(state: BookingState): ResolvedBooking | null {
  return resolveBooking(bookingStateToData(state));
}

export function createTicketFromBooking(
  data: BookingData,
  trackingCode: string
): UserTicket | null {
  const resolved = resolveBooking(data);
  if (!resolved) return null;

  const totalPrice = resolved.pricePerTicket * data.passengers.length;
  const today = new Date().toLocaleDateString('fa-IR');

  if (resolved.kind === 'flight') {
    const { flight } = resolved;
    return {
      _id: trackingCode,
      type: 'flight',
      title: `${flight.origin} → ${flight.destination}`,
      subtitle: `${flight.airline} • ${flight.flightNumber} • ${flight.departureTime}`,
      date: today,
      price: totalPrice,
      status: 'confirmed',
      trackingCode,
      airline: flight.airline,
      from: flight.origin,
      to: flight.destination,
      departureTime: flight.departureTime,
      arrivalTime: flight.arrivalTime,
    };
  }

  const { trip, transportType } = resolved;
  return {
    _id: trackingCode,
    type: transportType,
    title: `${trip.origin} → ${trip.destination}`,
    subtitle: `${trip.company} • ${trip.tripNumber} • ${trip.departureTime}`,
    date: today,
    price: totalPrice,
    status: 'confirmed',
    trackingCode,
    company: trip.company,
    from: trip.origin,
    to: trip.destination,
    departureTime: trip.departureTime,
    arrivalTime: trip.arrivalTime,
  };
}

export function clearBookingStorage() {
  localStorage.removeItem(LEGACY_BOOKING_KEY);
  localStorage.removeItem(REDUX_BOOKING_KEY);
  localStorage.removeItem('selectedFlight');
  localStorage.removeItem('selectedTransport');
  localStorage.removeItem('transportType');
}
