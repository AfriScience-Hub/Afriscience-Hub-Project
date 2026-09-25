const COUNTRY_CURRENCY: Record<string, string> = {
  NG: 'NGN', GH: 'GHS', KE: 'KES', ZA: 'ZAR', EG: 'EGP', ET: 'ETB', TZ: 'TZS',
  UG: 'UGX', RW: 'RWF', ZM: 'ZMW', ZW: 'ZWL', BW: 'BWP', MW: 'MWK', CM: 'XAF',
  CI: 'XOF', SN: 'XOF', ML: 'XOF', BF: 'XOF', TG: 'XOF', BJ: 'XOF', NE: 'XOF',
  GA: 'XAF', CG: 'XAF', TD: 'XAF', CF: 'XAF', GQ: 'XAF', GN: 'GNF', LR: 'LRD',
  SL: 'SLL', GM: 'GMD', MR: 'MRU', CV: 'CVE', ST: 'STN', DJ: 'DJF', SO: 'SOS',
  SD: 'SDG', SS: 'SSP', LY: 'LYD', TN: 'TND', DZ: 'DZD', MA: 'MAD', AO: 'AOA',
  MZ: 'MZN', NA: 'NAD', LS: 'LSL', SZ: 'SZL', MG: 'MGA', MU: 'MUR', SC: 'SCR',
  KM: 'KMF', BI: 'BIF', ER: 'ERN', MLI: 'XOF',
  CD: 'CDF', GW: 'XOF',
  US: 'USD', GB: 'GBP', CA: 'CAD', AU: 'AUD', NZ: 'NZD', DE: 'EUR', FR: 'EUR',
  IT: 'EUR', ES: 'EUR', PT: 'EUR', NL: 'EUR', BE: 'EUR', IE: 'EUR', AT: 'EUR',
  GR: 'EUR', FI: 'EUR', LU: 'EUR', CY: 'EUR', MT: 'EUR', SK: 'EUR', SI: 'EUR',
  LV: 'EUR', LT: 'EUR', EE: 'EUR', CH: 'CHF', SE: 'SEK', NO: 'NOK', DK: 'DKK',
  IS: 'ISK', PL: 'PLN', CZ: 'CZK', HU: 'HUF', RO: 'RON', BG: 'BGN', HR: 'HRK',
  RS: 'RSD', UA: 'UAH', TR: 'TRY', RU: 'RUB', IN: 'INR', PK: 'PKR', BD: 'BDT',
  LK: 'LKR', NP: 'NPR', AF: 'AFN', CN: 'CNY', JP: 'JPY', KR: 'KRW', HK: 'HKD',
  TH: 'THB', VN: 'VND', MY: 'MYR', SG: 'SGD', ID: 'IDR', PH: 'PHP', AE: 'AED',
  SA: 'SAR', QA: 'QAR', KW: 'KWD', BH: 'BHD', OM: 'OMR', JO: 'JOD', LB: 'LBP',
  IL: 'ILS', IR: 'IRR', IQ: 'IQD', SY: 'SYP', YE: 'YER', BR: 'BRL', MX: 'MXN',
  AR: 'ARS', CL: 'CLP', CO: 'COP', PE: 'PEN', EC: 'USD', VE: 'VES', PY: 'PYG',
  UY: 'UYU', BO: 'BOB', CR: 'CRC', PA: 'USD', GT: 'GTQ', HN: 'HNL', NI: 'NIO',
  SV: 'USD', DO: 'DOP', CU: 'CUP', JM: 'JMD', TT: 'TTD',
};

export function getCurrencyForCountry(code?: string | null): string {
  if (!code) return 'USD';
  return COUNTRY_CURRENCY[code.trim().toUpperCase()] ?? 'USD';
}

export function currencySymbol(currency: string): string {
  try {
    return new Intl.NumberFormat('en', { style: 'currency', currency }).format(0).replace(/[\d.,\s]/g, '').trim() || currency;
  } catch {
    return currency;
  }
}

export function formatMinor(value: number | string | null | undefined, currency = 'USD'): string {
  const num = Number(value ?? 0) || 0;
  try {
    return new Intl.NumberFormat('en', { style: 'currency', currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num);
  } catch {
    return `${currency} ${num.toFixed(2)}`;
  }
}

export function formatMajor(value: number | string | null | undefined, currency = 'USD'): string {
  const num = Number(value ?? 0) || 0;
  try {
    return new Intl.NumberFormat('en', { style: 'currency', currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num);
  } catch {
    return `${currency} ${num.toFixed(2)}`;
  }
}

/** Wallet balances arrive already normalised (see walletSlice.toActual). */
export function formatISOString(value?: string | null): string {
  if (!value) return '\u2014';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: 'numeric' }).format(d);
}

export function formatDateTime(value?: string | null): string {
  if (!value) return '\u2014';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat('en', {
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
  }).format(d);
}

export function shortReference(ref: string): string {
  const clean = ref?.replace(/[^a-zA-Z0-9]/g, '') || '';
  if (!clean) return '\u2014';
  return clean.length <= 12 ? clean : `#${clean.slice(0, 10)}\u2026`;
}

export function statusTone(status: string): string {
  switch ((status || '').toUpperCase()) {
    case 'COMPLETED':
    case 'SUCCESS':
      return 'bg-green-100 text-green-800';
    case 'PENDING':
      return 'bg-yellow-100 text-yellow-800';
    case 'CANCELLED':
    case 'FAILED':
    case 'DECLINED':
      return 'bg-red-100 text-red-700';
    case 'RESERVED':
    case 'RESERVATION':
      return 'bg-blue-100 text-blue-700';
    default:
      return 'bg-neutral-gray-light text-neutral-gray-dark';
  }
}

export const WALLET_MODAL_OVERLAY =
  'fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto';