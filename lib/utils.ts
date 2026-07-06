import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Convert all Western/Latin digits (0-9) in a string to Persian digits (۰-۹). */
export function toPersianNum(value: string | number): string {
  const map: Record<string, string> = {
    "0": "۰",
    "1": "۱",
    "2": "۲",
    "3": "۳",
    "4": "۴",
    "5": "۵",
    "6": "۶",
    "7": "۷",
    "8": "۸",
    "9": "۹",
  };
  return String(value).replace(/[0-9]/g, (d) => map[d]);
}

/**
 * Return the current date/time adjusted to Tehran local time (Asia/Tehran).
 * Useful for "today" comparisons and date-picker initialisation.
 */
export function getTehranNow(): Date {
  const tehranStr = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Tehran",
  });
  return new Date(tehranStr);
}
