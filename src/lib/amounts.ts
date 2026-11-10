/**
 * Helpers for editable money amounts (service costs, other charges and admin
 * price dialogs). These are kept in their own module so every client bundle
 * gets a stable import instead of relying on a large shared utils module.
 */

/**
 * Adds thousands separators while an amount is being typed, keeping an
 * optional decimal part. The stored value should still use parseAmountInput.
 */
export function formatAmountInput(value?: string | number | null): string {
  if (value === null || value === undefined || value === '') return '';
  const raw = String(value).replace(/,/g, '');
  const hasDecimal = raw.includes('.');
  const [integerPart, ...rest] = raw.split('.');
  const digits = integerPart.replace(/[^\d]/g, '');
  const decimals = rest.join('').replace(/[^\d]/g, '').slice(0, 2);
  const formatted = digits ? Number(digits).toLocaleString('en-US') : '';
  if (hasDecimal) return `${formatted || '0'}.${decimals}`;
  return formatted;
}

/** Removes the separators added by formatAmountInput. */
export function parseAmountInput(value: string): string {
  return value.replace(/,/g, '');
}

/** Formats an already stored amount for display (no /100 conversion). */
export function formatAmountDisplay(value?: string | number | null): string {
  if (value === null || value === undefined || value === '') return '—';
  const n = Number(String(value).replace(/,/g, ''));
  if (!Number.isFinite(n)) return String(value);
  return n.toLocaleString('en-US', { maximumFractionDigits: 2 });
}
