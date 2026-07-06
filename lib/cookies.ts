/**
 * Minimal cookie helpers.
 *
 * Auth tokens (`access_token`, `refresh_token`) are issued by the backend as
 * `HttpOnly; Secure` cookies (see `bilitiko-backend`'s `core/security.py`).
 * They can NEVER be read or set from this file — that's the point of
 * `HttpOnly`, it protects the tokens from being stolen via XSS.
 *
 * The backend also sets one *non*-httpOnly cookie, `csrf_token`, specifically
 * so the frontend can read it and echo it back as an `X-CSRF-Token` header on
 * state-changing requests (double-submit cookie pattern, see `lib/api.ts`).
 * `getCookie` below exists to support that.
 */

export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;

  const escaped = encodeURIComponent(name).replace(
    /([.$?*|{}()[\]\\/+^])/g,
    "\\$1",
  );
  const match = document.cookie.match(new RegExp(`(?:^|; )${escaped}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}
