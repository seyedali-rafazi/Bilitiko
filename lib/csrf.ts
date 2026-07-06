import { getCookie } from "./cookies";

const CSRF_STORAGE_KEY = "bilito_csrf_token";
const CSRF_COOKIE = "csrf_token";

let csrfToken: string | null = null;

/** Persist the CSRF token returned by login/refresh/me for cross-origin API calls. */
export function setCsrfToken(token: string | null | undefined): void {
  if (!token) return;
  csrfToken = token;
  try {
    sessionStorage.setItem(CSRF_STORAGE_KEY, token);
  } catch {
    // ignore quota / private-mode errors
  }
}

export function clearCsrfToken(): void {
  csrfToken = null;
  try {
    sessionStorage.removeItem(CSRF_STORAGE_KEY);
  } catch {
    // ignore
  }
}

/** Token for X-CSRF-Token: in-memory, then sessionStorage, then same-origin cookie. */
export function getCsrfToken(): string | null {
  if (csrfToken) return csrfToken;

  if (typeof window !== "undefined") {
    try {
      const stored = sessionStorage.getItem(CSRF_STORAGE_KEY);
      if (stored) {
        csrfToken = stored;
        return stored;
      }
    } catch {
      // ignore
    }
  }

  return getCookie(CSRF_COOKIE);
}
