import { formatAmountDisplay } from '@/lib/amounts';

export function formatAdminMoney(amount: number | string | null | undefined, currency = 'USD'): string {
  if (amount === null || amount === undefined || amount === '') return '—';
  const value = typeof amount === 'number' ? amount : Number(String(amount).replace(/,/g, ''));
  if (!Number.isFinite(value)) return '—';
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
      currencyDisplay: 'narrowSymbol',
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `${currency || ''} ${formatAmountDisplay(value)}`.trim();
  }
}
