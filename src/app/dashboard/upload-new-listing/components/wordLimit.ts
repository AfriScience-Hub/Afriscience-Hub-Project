'use client';

export const DESCRIPTION_WORD_LIMIT = 20;

/** Counts whitespace-separated words. */
export function countWords(value: string): number {
  return value.trim() ? value.trim().split(/\s+/).length : 0;
}

/** Trims a value to a maximum number of whitespace-separated words. */
export function limitWords(value: string, max = DESCRIPTION_WORD_LIMIT): string {
  const words = value.trim().split(/\s+/).filter(Boolean);
  if (words.length <= max) return value;
  return words.slice(0, max).join(' ');
}
