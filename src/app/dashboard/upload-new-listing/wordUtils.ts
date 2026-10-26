/** Word helpers shared by the Afro-Innovation form and its validation. */

export const MAX_BIO_WORDS = 500;

/** Counts words using whitespace as the separator. */
export function countWords(value: string): number {
  const trimmed = value.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

/** Truncates a string to at most `max` whitespace-separated words. */
export function limitWords(value: string, max = MAX_BIO_WORDS): string {
  const trimmed = value.trim();
  if (!trimmed) return '';
  const words = trimmed.split(/\s+/);
  return words.length > max ? words.slice(0, max).join(' ') : value;
}
