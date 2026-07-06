/**
 * Central API client for bilitiko-backend (FastAPI, /api/v1/).
 * Base URL is read from NEXT_PUBLIC_API_URL env var.
 */

import { getCookie } from "./cookies";
import { clearCsrfToken, getCsrfToken, setCsrfToken } from "./csrf";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

// ─── Auth model ───────────────────────────────────────────────────────────────
//
// Access/refresh tokens are issued by the backend as `HttpOnly; Secure`
// cookies (see `bilitiko-backend`'s `core/security.py`). They are NEVER
// exposed to JavaScript, so this client has no `getAccessToken`/`setTokens`
// functions anymore — the browser attaches the cookies automatically to
// every request as long as we use `credentials: 'include'`.
//
// The backend also sets a separate, readable `csrf_token` cookie. We echo
// its value back as an `X-CSRF-Token` header on state-changing requests
// (double-submit cookie pattern) so a third-party site can't rely on the
// browser silently attaching our auth cookie to a forged request.

const CSRF_COOKIE = "csrf_token";
const CSRF_HEADER = "X-CSRF-Token";
const MUTATING_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"]);

// ─── Core fetch wrapper ───────────────────────────────────────────────────────

async function doFetch(path: string, options: RequestInit): Promise<Response> {
  const method = (options.method ?? "GET").toUpperCase();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (MUTATING_METHODS.has(method)) {
    const csrfToken = getCsrfToken();
    if (csrfToken) headers[CSRF_HEADER] = csrfToken;
  }

  return fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
    // Send the httpOnly auth cookies with every request, including
    // cross-site ones (frontend and backend are on different domains).
    credentials: "include",
  });
}

let refreshInFlight: Promise<boolean> | null = null;

/** POST /api/v1/users/refresh — rotates the access/refresh cookies. */
function refreshAccessToken(): Promise<boolean> {
  if (!refreshInFlight) {
    refreshInFlight = doFetch("/api/v1/users/refresh", { method: "POST" })
      .then((r) => r.ok)
      .catch(() => false)
      .finally(() => {
        refreshInFlight = null;
      });
  }
  return refreshInFlight;
}

const AUTH_ENDPOINTS_WITHOUT_RETRY = [
  "/api/v1/users/login",
  "/api/v1/users/refresh",
];

function captureCsrfFromAuthResponse(data: unknown): void {
  if (
    data &&
    typeof data === "object" &&
    "csrf_token" in data &&
    typeof (data as { csrf_token?: unknown }).csrf_token === "string"
  ) {
    setCsrfToken((data as { csrf_token: string }).csrf_token);
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {},
  allowRetry = true,
): Promise<T> {
  let res = await doFetch(path, options);

  // Transparently refresh an expired access token once, then retry.
  if (
    res.status === 401 &&
    allowRetry &&
    !AUTH_ENDPOINTS_WITHOUT_RETRY.some((p) => path.startsWith(p))
  ) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      res = await doFetch(path, options);
    }
  }

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
  const data = text ? (JSON.parse(text) as T) : ({} as T);
  captureCsrfFromAuthResponse(data);
  return data;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export interface AuthUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  csrf_token?: string;
}

/** POST /api/v1/users/register  →  user object (201) */
export type RegisterResponse = AuthUser;

export const authApi = {
  /** POST /api/v1/users/login  →  sets httpOnly auth cookies, returns the user profile. */
  login: (email: string, password: string) =>
    request<AuthUser>("/api/v1/users/login", {
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

  /** POST /api/v1/users/refresh — rotates the access/refresh cookies. */
  refresh: () => request<AuthUser>("/api/v1/users/refresh", { method: "POST" }),

  /** POST /api/v1/users/logout — clears all auth cookies server-side. */
  logout: () =>
    request<{ detail: string }>("/api/v1/users/logout", { method: "POST" }).then(
      (res) => {
        clearCsrfToken();
        return res;
      },
    ),

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
