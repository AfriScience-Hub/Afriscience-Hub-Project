
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Format a count: below 1,000 shows as-is; 1,000+ shortens with "k" (e.g. 1.2k). */
export function formatCount(num: number | null | undefined): string {
  const n = Number(num ?? 0);
  if (!Number.isFinite(n) || n < 1000) return Math.max(0, Math.floor(n)).toLocaleString();
  return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
}

/** Format an ISO date string as "Month Year" (e.g. "March 2021"). */
export function formatJoinedDate(dateString?: string | null): string | null {
  if (!dateString) return null;
  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

/**
 * Format a price for display.
 *
 * The API stores prices in the smallest unit, so the stored value is divided
 * by 100 to show the real amount (e.g. "5000" -> "50"). No currency symbol is
 * added - the platform does not fix a currency for innovation prices.
 */
export function formatPrice(value?: string | number | null): string {
  if (value === null || value === undefined || value === '') return '—';
  const n = Number(value);
  if (!Number.isFinite(n)) return '—';
  return (n / 100).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

/**
 * A price ready for an editable field: divided by 100 and without thousands
 * separators so it stays easy to type into.
 */
export function priceToInput(value?: string | number | null): string {
  if (value === null || value === undefined || value === '') return '';
  const n = Number(value);
  if (!Number.isFinite(n)) return '';
  return String(n / 100);
}

/**
 * Converts a price typed into a form back into the unit the API stores
 * (the smallest unit), so editing does not change the amount.
 */
export function priceToStorage(value?: string | number | null): string {
  if (value === null || value === undefined || value === '') return '';
  const n = Number(value);
  if (!Number.isFinite(n)) return '';
  return String(Math.round(n));
}
