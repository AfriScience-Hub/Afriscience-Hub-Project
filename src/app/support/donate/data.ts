export const CAUSES = [
  {
    id: 'competition-support',
    title: 'Competition Support',
    emoji: '🏆',
    description: 'Provide support to enable AfriScience Hub organize annual competitions in more African countries. Help us cover more grounds in bringing more African talents to limelight through competitions.',
    target: 5000000,
    raised: 0,
    color: 'bg-amber-50 border-amber-200',
  },
  {
    id: 'career-support',
    title: 'Career Support',
    emoji: '💡',
    description: 'Encourage Africa\'s top graduating tertiary students by providing them a financial head-start in their chosen career path. Help us create more jobs across the continent',
    target: 5000000,
    raised: 0,
    color: 'bg-blue-50 border-blue-200',
  },
  {
    id: 'research-support',
    title: 'Research Support',
    emoji: '🔬',
    description: 'Provide financial aid to African researchers to help them access materials and equipment needed to advance scientific and technological studies across the continent.',
    target: 10000000,
    raised: 0,
    color: 'bg-purple-50 border-purple-200',
  },
  {
    id: 'educational-scholarships',
    title: 'Educational Scholarships (Tertiary)',
    emoji: '🎓',
    description: 'Provide educational scholarships to current African tertiary students that lack the resources required to complete their programs in science and technology related fields.',
    target: 15000000,
    raised: 0,
    color: 'bg-emerald-50 border-emerald-200',
  },
];

type CurrencyInfo = { code: string; name: string; symbol: string };

function detectLocalCurrency(): CurrencyInfo {
  try {
    const locale = typeof navigator !== 'undefined' ? navigator.language : 'en-US';
    const region = new Intl.Locale(locale).region;
    if (!region) return { code: 'USD', name: 'US Dollar', symbol: '$' };
    const parts = new Intl.NumberFormat(locale, { style: 'currency', currencyDisplay: 'code' }).formatToParts(0);
    const code = parts.find(p => p.type === 'currency')?.value || 'USD';
    const display = new Intl.DisplayNames([locale], { type: 'currency' }).of(code) || code;
    const sym = new Intl.NumberFormat(locale, { style: 'currency', currency: code, currencyDisplay: 'symbol' })
      .formatToParts(0).find(p => p.type === 'currency')?.value || code;
    return { code, name: display, symbol: sym };
  } catch {
    return { code: 'USD', name: 'US Dollar', symbol: '$' };
  }
}

export function getDonationCurrencies(): CurrencyInfo[] {
  const local = detectLocalCurrency();
  const usd: CurrencyInfo = { code: 'USD', name: 'US Dollar', symbol: '$' };
  if (local.code === 'USD') return [usd];
  return [usd, local];
}
