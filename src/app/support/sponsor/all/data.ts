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
