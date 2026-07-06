/**
 * Minimal cookie helpers used for storing auth tokens client-side.
 *
 * IMPORTANT SECURITY NOTE:
 * Cookies set from client-side JavaScript (via `document.cookie`) can NEVER
 * be marked `HttpOnly`. That flag can only be set by the server in a
 * `Set-Cookie` response header. That means a token stored this way is still
 * readable by any JavaScript running on the page, exactly like
 * `localStorage` — it does NOT protect against XSS on its own.
 *
 * What this DOES improve over `localStorage`:
 *  - `Secure`      → the cookie is only ever sent over HTTPS.
 *  - `SameSite`    → mitigates the cookie being replayed on cross-site
 *                    requests/navigations.
 *  - `Max-Age`     → the browser expires/deletes the cookie automatically
 *                    once the token itself expires (localStorage never
 *                    expires anything).
 *  - Not included in `localStorage`/DevTools "Application > Local Storage"
 *    dumps, some browser extensions, or generic `JSON.stringify(localStorage)`
 *    exfiltration scripts that specifically target localStorage.
 *
 * For real protection against token theft via XSS you need the backend to
 * issue the tokens as `HttpOnly; Secure; SameSite=Strict` cookies directly
 * (via `Set-Cookie`) and have the frontend call the API with
 * `credentials: 'include'` instead of attaching an `Authorization` header.
 * That requires backend changes and is out of scope for this frontend-only
 * change — see the note left in `lib/api.ts`.
 */

export interface CookieOptions {
  /** Seconds until the cookie expires. Omit for a session cookie. */
  maxAgeSeconds?: number;
  path?: string;
  sameSite?: 'Strict' | 'Lax' | 'None';
  /** Defaults to `true` when the page is served over HTTPS. */
  secure?: boolean;
}

export function setCookie(name: string, value: string, options: CookieOptions = {}): void {
  if (typeof document === 'undefined') return;

  const { maxAgeSeconds, path = '/', sameSite = 'Strict' } = options;
  const secure =
    options.secure ?? (typeof window !== 'undefined' && window.location.protocol === 'https:');

  let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; path=${path}; SameSite=${sameSite}`;

  if (typeof maxAgeSeconds === 'number') {
    cookie += `; Max-Age=${Math.max(0, Math.floor(maxAgeSeconds))}`;
  }
  // SameSite=None requires Secure per the spec, so force it in that case too.
  if (secure || sameSite === 'None') {
    cookie += '; Secure';
  }

  document.cookie = cookie;
}

export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;

  const escaped = encodeURIComponent(name).replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1');
  const match = document.cookie.match(new RegExp(`(?:^|; )${escaped}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function removeCookie(name: string, path = '/'): void {
  if (typeof document === 'undefined') return;
  document.cookie = `${encodeURIComponent(name)}=; path=${path}; Max-Age=0; SameSite=Strict`;
}
