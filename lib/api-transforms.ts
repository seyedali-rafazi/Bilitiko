/**
 * Converts API response shapes to the internal frontend types used throughout the app.
 */
import type { Flight, TransportTrip, InsurancePlan } from './types';
import type { ApiFlight, ApiTransportTrip, ApiInsurancePlan } from './api';

export function apiFightToFlight(f: ApiFlight): Flight {
  // Parse ISO departure/arrival times to HH:mm format
  const parseTime = (iso: string) => {
    try {
      return new Date(iso).toLocaleTimeString('fa-IR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
    } catch {
      return iso;
    }
  };

  return {
    _id: f._id,
    airline: f.airline,
    logo: f.logo || '✈️',
    flightNumber: f.flight_number,
    origin: f.origin,
    destination: f.destination,
    departureTime: parseTime(f.departure_time),
    arrivalTime: parseTime(f.arrival_time),
    duration: f.duration,
    price: typeof f.price === 'number' ? f.price : parseFloat(f.price),
    availableSeats: f.available_seats,
    stops: f.stops ?? 0,
    class: (f.flight_class as Flight['class']) ?? 'economy',
    features: f.features ?? [],
  };
}

export function apiTripToTransportTrip(t: ApiTransportTrip): TransportTrip {
  const parseTime = (iso: string) => {
    try {
      return new Date(iso).toLocaleTimeString('fa-IR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
    } catch {
      return iso;
    }
  };

  return {
    _id: t._id,
    company: t.company,
    logo: t.logo || (t.transport_type === 'bus' ? '🚌' : '🚆'),
    tripNumber: t.trip_number,
    origin: t.origin,
    destination: t.destination,
    departureTime: parseTime(t.departure_time),
    arrivalTime: parseTime(t.arrival_time),
    duration: t.duration,
    price: typeof t.price === 'number' ? t.price : parseFloat(t.price),
    availableSeats: t.available_seats,
    features: t.features ?? [],
  };
}

export function apiInsurancePlanToPlan(p: ApiInsurancePlan): InsurancePlan {
  return {
    _id: String(p._id),
    title: p.title,
    price: typeof p.price === 'number' ? p.price : parseFloat(p.price),
    coverage: p.coverage,
    popular: p.popular ?? false,
    features: p.features ?? [],
  };
}
