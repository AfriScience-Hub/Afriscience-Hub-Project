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

export const INDUSTRIES = [
  'Architecture & Designs', 'Artificial Intelligence', 'Banking & Finance', 'Beauty & Aesthetics',
  'Building & Construction', 'Building Materials', 'Cements & Tiles', 'Computer & ICT',
  'Education', 'Electricals & Wiring', 'Electronics & Gadgets', 'Equipment & Machineries',
  'Fishing & Aquaculture', 'Food & Eateries', 'Forestry & Mining', 'Furniture & Timber',
  'Healthcare & Medicals', 'Hotels & Accommodations', 'Housing & Real Estate', 'Insurance',
  'Media & Communications', 'Oil & Gas', 'Pharmacy & Drugs', 'Pipes & Plumbing',
  'Plants & Animals', 'Plastics & Rubber', 'Repairs & Maintenance', 'Research & Development',
  'Retail & Wholesale', 'Roofing & Plasters', 'Supermarkets & Stores', 'Technology',
  'Telecommunications', 'Textile & Clothing', 'Tools & Spare Parts', 'Tourism & Hospitality',
  'Transportation', 'Vehicles & Automobiles'
];

export const COUNTRIES = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia',
  'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus',
  'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil',
  'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia', 'Cameroon', 'Canada',
  'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica',
  'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic',
  'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia',
  'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada',
  'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India',
  'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Ivory Coast', 'Jamaica', 'Japan', 'Jordan',
  'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho',
  'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia',
  'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia',
  'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru',
  'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia',
  'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines',
  'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia',
  'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia',
  'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands',
  'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname',
  'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo',
  'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine',
  'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu',
  'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
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
