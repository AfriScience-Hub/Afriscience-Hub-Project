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
  'Ethiopia', 'Zimbabwe', 'Rwanda', 'Senegal', 'Côte d\'Ivoire', 'Cameroon', 'Tunisia',
  'Algeria', 'Botswana', 'Namibia', 'Zambia', 'Mozambique'
];

export const SPONSORSHIP_TIERS = [
  { name: 'Bronze', amount: '$500/year', benefits: 'Basic visibility & quarterly reports' },
  { name: 'Silver', amount: '$2,500/year', benefits: 'Enhanced visibility & priority placement' },
  { name: 'Gold', amount: '$10,000/year', benefits: 'Premium visibility & exclusive access' },
  { name: 'Platinum', amount: '$25,000+/year', benefits: 'Maximum visibility & strategic partnership' }
];

export interface CatalogItem {
  name: string;
  price: string;
}
