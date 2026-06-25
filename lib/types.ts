export type TripType = 'roundtrip' | 'oneway' | 'multi';
export type FlightClass = 'economy' | 'business' | 'first';

export interface SearchData {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  passengers: number;
  flightClass: FlightClass;
}

export interface City {
  code: string;
  name: string;
}

export interface Flight {
  _id: number;
  airline: string;
  logo: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  availableSeats: number;
  stops: number;
  class: FlightClass;
  features: string[];
}

export interface TransportTrip {
  _id: number;
  company: string;
  logo: string;
  tripNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  availableSeats: number;
  features: string[];
}

export interface Passenger {
  id: number;
  firstName: string;
  lastName: string;
  nationalId: string;
  birthDate: string;
  gender: 'male' | 'female';
}

export interface ContactInfo {
  email: string;
  phone: string;
}

export interface BookingData {
  flightId?: string | null;
  flight?: Flight;
  tripId?: string | null;
  transportType?: 'bus' | 'train';
  trip?: TransportTrip;
  passengers: Passenger[];
  contactInfo: ContactInfo;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Destination {
  title: string;
  subtitle: string;
  image: string;
  destinationCode: string;
}

export interface PopularFlight {
  from: string;
  to: string;
  fromCode: string;
  toCode: string;
  price: string;
  image: string;
}

export interface UserSession {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  loggedInAt: string;
}

export type TicketStatus = 'confirmed' | 'pending' | 'cancelled';
export type TicketType = 'flight' | 'insurance' | 'bus' | 'train';

export interface UserTicket {
  _id: string;
  type: TicketType;
  title: string;
  subtitle: string;
  date: string;
  price: number;
  status: TicketStatus;
  trackingCode: string;
  airline?: string;
  from?: string;
  to?: string;
  planId?: string;
  coverage?: string;
  destination?: string;
  company?: string; // For bus/train
  departureTime?: string;
  arrivalTime?: string;
  seatNumbers?: string[];
}

export interface InsurancePlan {
  _id: string;
  title: string;
  price: number;
  coverage: string;
  popular?: boolean;
  features: string[];
}

export interface InsuranceBookingData {
  planId: string;
  firstName: string;
  lastName: string;
  nationalId: string;
  birthDate: string;
  destination: string;
  startDate: string;
  endDate: string;
  phone: string;
  email: string;
}
