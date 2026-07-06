/**
 * Best-effort, dependency-free decoding of a JWT payload.
 * This does NOT verify the signature — it's only used client-side to read
 * the `exp` claim so we can align cookie lifetimes with real token expiry.
 * Never trust this for authorization decisions; that must happen server-side.
 */
export function decodeJwtExpiry(token: string): number | null {
  try {
    const payload = token.split('.')[1];
    if (!payload) return null;

    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const json =
      typeof window !== 'undefined'
        ? decodeURIComponent(
            atob(base64)
              .split('')
              .map((c) => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
              .join('')
          )
        : Buffer.from(base64, 'base64').toString('utf-8');

    const data = JSON.parse(json) as { exp?: number };
    return typeof data.exp === 'number' ? data.exp : null;
  } catch {
    return null;
  }
}
