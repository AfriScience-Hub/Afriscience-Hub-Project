
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
