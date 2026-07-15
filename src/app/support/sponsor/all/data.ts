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

export interface Sponsor {
  id: number;
  name: string;
  image: string;
  industries: string[];
  status: string;
  tier: string;
  country: string;
  state: string;
  catalog: string[];
  motto: string;
  description: string;
}

export const MOCK_SPONSORS: Sponsor[] = [
  {
    id: 1,
    name: 'TechConnect Africa',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400',
    industries: ['Technology', 'Telecommunications', 'Artificial Intelligence'],
    status: 'Online',
    tier: 'Platinum',
    country: 'Nigeria',
    state: 'Lagos',
    catalog: ['Software Development', 'Cloud Solutions', 'AI Integration'],
    motto: 'Connecting Africa to the Digital Future',
    description: 'Leading technology solutions provider across West Africa.'
  },
  {
    id: 2,
    name: 'AfriMed Healthcare',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400',
    industries: ['Healthcare & Medicals', 'Pharmacy & Drugs'],
    status: 'Online',
    tier: 'Gold',
    country: 'South Africa',
    state: 'Gauteng',
    catalog: ['Medical Equipment', 'Hospital Supplies', 'Diagnostics'],
    motto: 'Health for All Africans',
    description: 'Comprehensive healthcare solutions and medical equipment supplier.'
  },
  {
    id: 3,
    name: 'GreenBuild Construction',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400',
    industries: ['Building & Construction', 'Architecture & Designs', 'Roofing & Plasters'],
    status: 'Online',
    tier: 'Silver',
    country: 'Kenya',
    state: 'Nairobi',
    catalog: ['Construction Services', 'Project Management', 'Green Building'],
    motto: 'Building Sustainable Futures',
    description: 'Sustainable construction and green building specialists.'
  },
  {
    id: 4,
    name: 'EduTech Solutions',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400',
    industries: ['Education', 'Technology'],
    status: 'Online',
    tier: 'Bronze',
    country: 'Ghana',
    state: 'Greater Accra',
    catalog: ['E-Learning Platforms', 'Educational Software', 'Training Programs'],
    motto: 'Empowering Through Education',
    description: 'Innovative educational technology and learning solutions provider.'
  },
  {
    id: 5,
    name: 'AgriSupply Network',
    image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400',
    industries: ['Plants & Animals', 'Fishing & Aquaculture', 'Food & Eateries'],
    status: 'Online',
    tier: 'Silver',
    country: 'Tanzania',
    state: 'Dar es Salaam',
    catalog: ['Agricultural Equipment', 'Seeds & Fertilizers', 'Training'],
    motto: 'Growing Africa\'s Agricultural Future',
    description: 'Complete agricultural supply chain and equipment provider.'
  },
  {
    id: 6,
    name: 'PowerGrid Systems',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400',
    industries: ['Electricals & Wiring', 'Equipment & Machineries'],
    status: 'Offline',
    tier: 'Gold',
    country: 'Egypt',
    state: 'Cairo',
    catalog: ['Electrical Systems', 'Wiring Solutions', 'Power Distribution'],
    motto: 'Powering Africa Forward',
    description: 'Electrical systems and power distribution specialists.'
  }
];
