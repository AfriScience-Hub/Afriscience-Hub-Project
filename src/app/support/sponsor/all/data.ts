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
  'Nigeria', 'South Africa', 'Kenya', 'Ghana', 'Egypt', 'Morocco', 'Tanzania', 'Uganda',
  'Ethiopia', 'Zimbabwe', 'Rwanda', 'Senegal', 'Côte d\'Ivoire', 'Cameroon', 'Tunisia'
];

export interface Sponsor {
  id: number;
  name: string;
  image: string;
  industry: string;
  status: string;
  country: string;
  state: string;
  catalog: string[];
  badge: string;
  motto: string;
  description: string;
}

export const MOCK_SPONSORS: Sponsor[] = [
  {
    id: 1,
    name: 'TechConnect Africa',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400',
    industry: 'Technology',
    status: 'Online',
    country: 'Nigeria',
    state: 'Lagos',
    catalog: ['Software Development', 'Cloud Solutions', 'AI Integration'],
    badge: '⭐ Premium',
    motto: 'Connecting Africa to the Digital Future',
    description: 'Leading technology solutions provider across West Africa.'
  },
  {
    id: 2,
    name: 'AfriMed Healthcare',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400',
    industry: 'Healthcare & Medicals',
    status: 'Online',
    country: 'South Africa',
    state: 'Gauteng',
    catalog: ['Medical Equipment', 'Hospital Supplies', 'Diagnostics'],
    badge: '🏆 Verified',
    motto: 'Health for All Africans',
    description: 'Comprehensive healthcare solutions and medical equipment supplier.'
  },
  {
    id: 3,
    name: 'GreenBuild Construction',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400',
    industry: 'Building & Construction',
    status: 'Online',
    country: 'Kenya',
    state: 'Nairobi',
    catalog: ['Construction Services', 'Project Management', 'Green Building'],
    badge: '🌱 Eco-Certified',
    motto: 'Building Sustainable Futures',
    description: 'Sustainable construction and green building specialists.'
  },
  {
    id: 4,
    name: 'EduTech Solutions',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400',
    industry: 'Education',
    status: 'Online',
    country: 'Ghana',
    state: 'Greater Accra',
    catalog: ['E-Learning Platforms', 'Educational Software', 'Training Programs'],
    badge: '📚 Certified',
    motto: 'Empowering Through Education',
    description: 'Innovative educational technology and learning solutions provider.'
  },
  {
    id: 5,
    name: 'AgriSupply Network',
    image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400',
    industry: 'Plants & Animals',
    status: 'Online',
    country: 'Tanzania',
    state: 'Dar es Salaam',
    catalog: ['Agricultural Equipment', 'Seeds & Fertilizers', 'Training'],
    badge: '🌾 Trusted',
    motto: 'Growing Africa\'s Agricultural Future',
    description: 'Complete agricultural supply chain and equipment provider.'
  },
  {
    id: 6,
    name: 'PowerGrid Systems',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400',
    industry: 'Electricals & Wiring',
    status: 'Offline',
    country: 'Egypt',
    state: 'Cairo',
    catalog: ['Electrical Systems', 'Wiring Solutions', 'Power Distribution'],
    badge: '⚡ Certified',
    motto: 'Powering Africa Forward',
    description: 'Electrical systems and power distribution specialists.'
  }
];
