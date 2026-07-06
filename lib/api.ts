/**
 * Central API client for bilitiko-backend (FastAPI, /api/v1/).
 * Base URL is read from NEXT_PUBLIC_API_URL env var.
 */

import { getCookie, setCookie, removeCookie } from "./cookies";
import { decodeJwtExpiry } from "./jwt";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

// ─── Token helpers ────────────────────────────────────────────────────────────
//
// Tokens are stored in cookies rather than localStorage so the browser can
// enforce `Secure` (HTTPS-only) and `SameSite` and auto-expire them once the
// underlying JWT expires. NOTE: these are still plain, JS-readable cookies
// (not `HttpOnly`), since only a server response can set an `HttpOnly`
// cookie — see the security note in `lib/cookies.ts` for what it would take
// to close that gap.

const ACCESS_TOKEN_COOKIE = "bilito-access-token";
const REFRESH_TOKEN_COOKIE = "bilito-refresh-token";

// Fallbacks used only if the JWT's `exp` claim can't be read.
const DEFAULT_ACCESS_MAX_AGE = 60 * 60; // 1 hour
const DEFAULT_REFRESH_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export function getAccessToken(): string | null {
  return getCookie(ACCESS_TOKEN_COOKIE);
}

export function setTokens(access: string, refresh: string) {
  const now = Math.floor(Date.now() / 1000);
  const accessExp = decodeJwtExpiry(access);
  const refreshExp = decodeJwtExpiry(refresh);

  setCookie(ACCESS_TOKEN_COOKIE, access, {
    maxAgeSeconds: accessExp
      ? Math.max(0, accessExp - now)
      : DEFAULT_ACCESS_MAX_AGE,
    sameSite: "Strict",
  });
  setCookie(REFRESH_TOKEN_COOKIE, refresh, {
    maxAgeSeconds: refreshExp
      ? Math.max(0, refreshExp - now)
      : DEFAULT_REFRESH_MAX_AGE,
    sameSite: "Strict",
  });
}

export function clearTokens() {
  removeCookie(ACCESS_TOKEN_COOKIE);
  removeCookie(REFRESH_TOKEN_COOKIE);
}

export function getRefreshToken(): string | null {
  return getCookie(REFRESH_TOKEN_COOKIE);
}

// ─── Core fetch wrapper ───────────────────────────────────────────────────────

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getAccessToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });

  if (!res.ok) {
    let errMsg = `API error ${res.status}`;
    try {
      const err = await res.json();
      errMsg = err.detail ?? err.error ?? errMsg;
    } catch {
      // ignore parse errors
    }
    throw new Error(errMsg);
  }

  // Some endpoints return 204 No Content
  const text = await res.text();
  return text ? (JSON.parse(text) as T) : ({} as T);
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export interface AuthUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
}

/** POST /api/v1/users/login  →  { access_token, refresh_token, token_type, user } */
export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  user?: AuthUser;
}

/** POST /api/v1/users/register  →  user object (201) */
export type RegisterResponse = AuthUser;

export const authApi = {
  login: (email: string, password: string) =>
    request<LoginResponse>("/api/v1/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  register: (data: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    phone: string;
  }) =>
    request<RegisterResponse>("/api/v1/users/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getProfile: () => request<AuthUser>("/api/v1/users/me"),

  updateProfile: (
    data: Partial<Pick<AuthUser, "first_name" | "last_name" | "phone">>,
  ) =>
    request<AuthUser>("/api/v1/users/me", {
      method: "PUT",
      body: JSON.stringify(data),
    }),
};

// ─── Flights ──────────────────────────────────────────────────────────────────

export interface ApiFlight {
  _id: number;
  airline: string;
  logo?: string;
  flight_number: string;
  origin: string;
  destination: string;
  departure_time: string;
  arrival_time: string;
  duration: string;
  price: number | string;
  available_seats: number;
  stops?: number;
  flight_class: string;
  features?: string[];
}

export interface ApiPopularFlight {
  id?: number;
  from_city: string;
  to_city: string;
  from_code: string;
  to_code: string;
  price: string;
  image?: string;
}

export interface ApiDestination {
  id?: number;
  title: string;
  subtitle: string;
  image?: string;
  destination_code: string;
}

export interface ApiCity {
  id?: number;
  code: string;
  name: string;
  country?: string;
}

export const flightsApi = {
  /** GET /api/v1/flights/search?origin=THR&destination=MHD&departure_date=...&flight_class=economy&limit=20 */
  search: (params: {
    origin: string;
    destination: string;
    departure_date: string;
    flight_class?: string;
    limit?: number;
  }) => {
    const qs = new URLSearchParams({
      origin: params.origin,
      destination: params.destination,
      departure_date: params.departure_date,
      flight_class: params.flight_class ?? "economy",
      limit: String(params.limit ?? 20),
    });
    return request<ApiFlight[]>(`/api/v1/flights/search?${qs}`);
  },

  /** GET /api/v1/flights/popular/routes */
  getPopular: () =>
    request<ApiPopularFlight[]>("/api/v1/flights/popular/routes"),

  /** GET /api/v1/flights/destinations/popular */
  getDestinations: () =>
    request<ApiDestination[]>("/api/v1/flights/destinations/popular"),

  /** GET /api/v1/flights/cities/all */
  getCities: () => request<ApiCity[]>("/api/v1/flights/cities/all"),

  /** GET /api/v1/flights/cities/search?q=... */
  searchCities: (q: string) =>
    request<ApiCity[]>(
      `/api/v1/flights/cities/search?q=${encodeURIComponent(q)}`,
    ),
};

// ─── Transport ────────────────────────────────────────────────────────────────

export interface ApiTransportTrip {
  _id: number;
  transport_type: "bus" | "train";
  company: string;
  logo?: string;
  trip_number: string;
  origin: string;
  destination: string;
  departure_time: string;
  arrival_time: string;
  duration: string;
  price: number | string;
  available_seats: number;
  features?: string[];
}

export interface ApiTransportCity {
  name: string;
}

export const transportApi = {
  /** GET /api/v1/transport/search?transport_type=bus&origin=تهران&destination=مشهد&departure_date=...&limit=20 */
  search: (params: {
    transport_type: "bus" | "train";
    origin: string;
    destination: string;
    departure_date: string;
    limit?: number;
  }) => {
    const qs = new URLSearchParams({
      transport_type: params.transport_type,
      origin: params.origin,
      destination: params.destination,
      departure_date: params.departure_date,
      limit: String(params.limit ?? 20),
    });
    return request<ApiTransportTrip[]>(`/api/v1/transport/search?${qs}`);
  },

  /** GET /api/v1/transport/cities/all?transport_type=bus */
  getCities: (transport_type?: "bus" | "train") => {
    const qs = transport_type ? `?transport_type=${transport_type}` : "";
    return request<ApiTransportCity[]>(`/api/v1/transport/cities/all${qs}`);
  },

  /** GET /api/v1/transport/cities/search?q=تهران&transport_type=bus */
  searchCities: (q: string, transport_type?: "bus" | "train") => {
    const qs = new URLSearchParams({ q });
    if (transport_type) qs.set("transport_type", transport_type);
    return request<ApiTransportCity[]>(`/api/v1/transport/cities/search?${qs}`);
  },
};

// ─── Admin ────────────────────────────────────────────────────────────────────

export interface ApiSeedResult {
  success: boolean;
  elapsed_seconds: number;
  summary: Record<string, unknown>;
}

export const adminApi = {
  /**
   * POST /api/v1/admin/seed
   * Generates flights, buses and trains for all city permutations.
   * Requires X-Admin-Key header matching SECRET_KEY in backend .env
   */
  seed: (
    adminKey: string,
    params: { days?: number; trips_per_pair?: number; clean?: boolean } = {},
  ) =>
    request<ApiSeedResult>("/api/v1/admin/seed", {
      method: "POST",
      headers: { "X-Admin-Key": adminKey },
      body: JSON.stringify({
        days: params.days ?? 14,
        trips_per_pair: params.trips_per_pair ?? 3,
        clean: params.clean ?? false,
      }),
    }),

  /** GET /api/v1/admin/seed/status */
  seedStatus: (adminKey: string) =>
    request<Record<string, unknown>>("/api/v1/admin/seed/status", {
      headers: { "X-Admin-Key": adminKey },
    }),
};

// ─── Insurance ────────────────────────────────────────────────────────────────

export interface ApiInsurancePlan {
  _id: number;
  title: string;
  price: number | string;
  coverage: string;
  popular?: boolean;
  features?: string[];
}

export interface ApiInsuranceBookingResponse {
  id: string;
  tracking_code: string;
  status: string;
  plan_id: string;
  plan_title: string;
  plan_price: number;
  plan_coverage: string;
  first_name: string;
  last_name: string;
  destination: string;
  start_date: string;
  end_date: string;
  created_at: string;
}

export const insuranceApi = {
  /** GET /api/v1/insurance/plans */
  getPlans: () => request<ApiInsurancePlan[]>("/api/v1/insurance/plans"),

  /** GET /api/v1/insurance/plans/:id */
  getPlan: (planId: string) =>
    request<ApiInsurancePlan>(`/api/v1/insurance/plans/${planId}`),

  /** POST /api/v1/insurance/bookings */
  createBooking: (data: {
    plan_id: string;
    first_name: string;
    last_name: string;
    national_id: string;
    birth_date: string;
    destination: string;
    start_date: string;
    end_date: string;
    phone: string;
    email: string;
  }) =>
    request<ApiInsuranceBookingResponse>("/api/v1/insurance/bookings", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getMyBookings: () =>
    request<ApiInsuranceBookingResponse[]>(
      "/api/v1/insurance/bookings/my-bookings",
    ),
};

// ─── Bookings ─────────────────────────────────────────────────────────────────

export interface ApiPassenger {
  first_name: string;
  last_name: string;
  national_id: string;
  birth_date: string;
  gender: "male" | "female";
}

export interface ApiBookingResponse {
  _id: string;
  tracking_code: string;
  booking_type: string;
  status: string;
  total_price: number | string;
  created_at: string;
  // flight / transport detail fields (may be absent on older records)
  flight_id?: string;
  transport_trip_id?: string;
  passengers?: ApiPassenger[];
  contact_email?: string;
  contact_phone?: string;
  seat_numbers?: string[];
}

export const bookingsApi = {
  /**
   * POST /api/v1/bookings/
   * Works for both guests (no auth header) and authenticated users.
   * flight bookings: send { booking_type: 'flight', flight_id, ... }
   * bus/train: send { booking_type: 'bus'|'train', transport_trip_id, ... }
   */
  create: (data: {
    booking_type: "flight" | "bus" | "train";
    flight_id?: number;
    transport_trip_id?: number;
    passengers: ApiPassenger[];
    contact_email: string;
    contact_phone: string;
    total_price: number;
    seat_numbers?: string[];
  }) =>
    request<ApiBookingResponse>("/api/v1/bookings/", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  /** GET /api/v1/bookings/my-bookings  (auth required) */
  getMyBookings: () =>
    request<ApiBookingResponse[]>("/api/v1/bookings/my-bookings"),

  /** GET /api/v1/bookings/track/:tracking_code  (public) */
  trackBooking: (trackingCode: string) =>
    request<ApiBookingResponse>(`/api/v1/bookings/track/${trackingCode}`),

  /** PUT /api/v1/bookings/:id/cancel  (auth required) */
  cancelBooking: (bookingId: number) =>
    request<ApiBookingResponse>(`/api/v1/bookings/${bookingId}/cancel`, {
      method: "PUT",
    }),
};
