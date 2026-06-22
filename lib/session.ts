import type { UserSession, UserTicket, InsuranceBookingData } from './types';

const USER_KEY = 'bilito-user-session';
const TICKETS_KEY = 'bilito-user-tickets';
const INSURANCE_BOOKING_KEY = 'bilito-insurance-booking';

function getStorage(): Storage | null {
  if (typeof window === 'undefined') return null;
  return localStorage;
}

function migrateFromSessionStorage(key: string) {
  if (typeof window === 'undefined') return;
  const legacy = sessionStorage.getItem(key);
  if (legacy && !localStorage.getItem(key)) {
    localStorage.setItem(key, legacy);
    sessionStorage.removeItem(key);
  }
}

function readJSON<T>(key: string, fallback: T): T {
  const storage = getStorage();
  if (!storage) return fallback;
  migrateFromSessionStorage(key);
  try {
    const raw = storage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key: string, value: unknown) {
  const storage = getStorage();
  if (!storage) return;
  storage.setItem(key, JSON.stringify(value));
}

function removeKey(key: string) {
  const storage = getStorage();
  if (!storage) return;
  storage.removeItem(key);
  sessionStorage.removeItem(key);
}

export function getUser(): UserSession | null {
  return readJSON<UserSession | null>(USER_KEY, null);
}

export function setUser(user: UserSession) {
  writeJSON(USER_KEY, user);
}

export function clearUser() {
  removeKey(USER_KEY);
  removeKey(TICKETS_KEY);
  removeKey(INSURANCE_BOOKING_KEY);
}

export function isLoggedIn(): boolean {
  return getUser() !== null;
}

export function getTickets(): UserTicket[] {
  return readJSON<UserTicket[]>(TICKETS_KEY, []);
}

export function addTicket(ticket: UserTicket) {
  const tickets = getTickets();
  writeJSON(TICKETS_KEY, [ticket, ...tickets]);
}

export function getFlightTickets(): UserTicket[] {
  return getTickets().filter((t) => t.type === 'flight');
}

export function getInsuranceTickets(): UserTicket[] {
  return getTickets().filter((t) => t.type === 'insurance');
}

export function generateTrackingCode(prefix: string): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const rand = Math.floor(Math.random() * 9000 + 1000);
  return `${prefix}-${date}-${rand}`;
}

export function getInsuranceBooking(): InsuranceBookingData | null {
  return readJSON<InsuranceBookingData | null>(INSURANCE_BOOKING_KEY, null);
}

export function setInsuranceBooking(data: InsuranceBookingData) {
  writeJSON(INSURANCE_BOOKING_KEY, data);
}

export function clearInsuranceBooking() {
  removeKey(INSURANCE_BOOKING_KEY);
}

export function getUserDisplayName(user: UserSession | null): string {
  if (!user) return 'کاربر مهمان';
  return `${user.firstName} ${user.lastName}`.trim() || 'کاربر بیلیتیکو';
}

export function getUserInitials(user: UserSession | null): string {
  if (!user) return 'ب';
  const f = user.firstName?.charAt(0) ?? '';
  const l = user.lastName?.charAt(0) ?? '';
  return (f + l).trim() || user.phone.slice(-2);
}
