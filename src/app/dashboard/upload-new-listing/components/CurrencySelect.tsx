'use client';

import { ALL_CURRENCIES } from './primary-secondary-listing/data';

/** Returns the narrow currency symbol, falling back to the currency code. */
function getSymbol(code: string): string {
  try {
    const parts = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: code,
      currencyDisplay: 'narrowSymbol',
    }).formatToParts(0);
    return parts.find((part) => part.type === 'currency')?.value || code;
  } catch {
    return code;
  }
}

const CURRENCY_OPTIONS = ALL_CURRENCIES.map((code) => ({ code, symbol: getSymbol(code) }));

interface CurrencySelectProps {
  value: string;
  onChange: (code: string) => void;
  className?: string;
}

/** Currency picker covering every supported world currency with its symbol. */
export default function CurrencySelect({ value, onChange, className }: CurrencySelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Currency"
      className={className}
    >
      {CURRENCY_OPTIONS.map(({ code, symbol }) => (
        <option key={code} value={code}>{symbol} {code}</option>
      ))}
    </select>
  );
}
