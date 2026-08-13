export const TIER_BENEFITS: Record<string, string[]> = {
  Bronze: [
    'Webspace Marketing',
    'AfriScience Hub Sponsorship Badge',
    'Certificate of Sponsorship',
    'Feature in Newsletters',
    'Invitation to annual Sponsor\'s Networking Events',
    '15 catalog entries max.',
    '1 industry selection max.',
  ],
  Silver: [
    'Webspace Marketing',
    'AfriScience Hub Sponsorship Badge',
    'Certificate of Sponsorship',
    'Feature in Newsletters',
    'Invitation to annual Sponsor\'s Networking Events',
    '60 catalog entries max.',
    '5 industry selections max.',
    'Feature across social platforms',
    'Feature in annual Sponsorship Magazine',
    'Event branding opportunities',
  ],
  Gold: [
    'Webspace Marketing',
    'AfriScience Hub Sponsorship Badge',
    'Certificate of Sponsorship',
    'Feature in Newsletters',
    'Invitation to annual Sponsor\'s Networking Events',
    'Unlimited catalog entries',
    'Unlimited industry selections',
    'Feature across social platforms',
    'Feature in annual Sponsorship Magazine',
    'Event branding opportunities',
    'Logo display on homepage',
    'Talent pipeline partnerships',
    'Technical support partnerships',
    'Champion of African Science & Technology honorary award presentation',
  ],
  Platinum: [
    'Webspace Marketing',
    'AfriScience Hub Sponsorship Badge',
    'Certificate of Sponsorship',
    'Feature in Newsletters',
    'Invitation to annual Sponsor\'s Networking Events',
    'Unlimited catalog entries',
    'Unlimited industry selections',
    'Feature across social platforms',
    'Feature in annual Sponsorship Magazine',
    'Event branding opportunities',
    'Logo display on homepage',
    'Talent pipeline Access',
    'Technical support Access',
    'Innovation Access',
    'Champion of African Science & Technology honorary award presentation',
    'Custom research collaborations',
    'Award ceremony naming rights',
    'Analytics Access',
    'VIP access to all AfriScience Hub events',
  ],
};

export const SPONSORSHIP_TIERS = [
  {
    name: 'Bronze',
    amount: '$2,500/year',
    badge: '🥉',
    benefits: 'Basic visibility',
    color: 'border-amber-700',
  },
  {
    name: 'Silver',
    amount: '$10,000/year',
    badge: '🥈',
    benefits: 'Enhanced visibility & priority placement',
    color: 'border-slate-400',
  },
  {
    name: 'Gold',
    amount: '$100,000/year',
    badge: '🥇',
    benefits: 'Premium visibility & exclusive access',
    color: 'border-amber-500',
  },
  {
    name: 'Platinum',
    amount: '$500,000+/year',
    badge: '💎',
    benefits: 'Maximum visibility & other strategic partnerships',
    color: 'border-brand-navy-900',
  },
];

export interface CatalogEntry {
  productName: string;
  currency: 'local' | 'USD';
  price: string;
  ashDiscountPrice: string;
  specifications: string[];
  images: File[];
}

export interface LicenseEntry {
  name: string;
  issuedBy: string;
  year: string;
  document: File | null;
}

export interface AwardEntry {
  name: string;
  awardedBy: string;
  year: string;
  document: File | null;
}
