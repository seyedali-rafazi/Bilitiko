export function digitsOnly(value: string, maxLength?: number): string {
  const digits = value.replace(/\D/g, '');
  return maxLength !== undefined ? digits.slice(0, maxLength) : digits;
}

/** Formats as 3498-2345-1234-6542 */
export function formatCardNumber(value: string): string {
  const digits = digitsOnly(value, 16);
  return digits.replace(/(\d{4})(?=\d)/g, '$1-');
}

/** Formats as MM/YY — typing 4534 becomes 45/34 */
export function formatExpiry(value: string): string {
  const digits = digitsOnly(value, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export function formatCvv(value: string): string {
  return digitsOnly(value, 4);
}

export function isCardNumberComplete(value: string): boolean {
  return digitsOnly(value).length === 16;
}

export function isExpiryComplete(value: string): boolean {
  return digitsOnly(value).length === 4;
}
