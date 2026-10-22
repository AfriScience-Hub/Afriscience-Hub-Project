export type SubmissionStatus = 'Pending Review' | 'Approved' | 'Rejected' | 'Published';
export type ListingStatus = 'Published' | 'Pending Review' | 'Unpublished';
export type Verification = 'Verified' | 'Pending' | 'Unverified';

export interface AdminCentre {
  id: string;
  name: string;
  description: string;
  focusArea: string;
  country: string;
  city: string;
  /** Who submitted the centre - shown on the submissions table. */
  submittedBy: string;
  submitterEmail: string;
  submittedOn: string;
  submittedTime: string;
  /** Workflow status while the centre is in review. */
  status: SubmissionStatus;
  /** Status shown on the "All Specialist Centres" listing table. */
  listingStatus: ListingStatus;
  verification: Verification;
  views: number;
  image: string;

  // Full record used by the detail modal.
  motto: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  ownership: string;
  categories: string[];
  services: string[];
  scopes: string[];
  policies: string[];
  certifications: string[];
  reason?: string;
}

export const FOCUS_AREAS = [
  'Research Labs',
  'Innovation Hubs',
  'Testing & Certification',
  'Training Centers',
];

/** Platform-wide totals per focus area, used by the overview chart. */
export const FOCUS_AREA_COUNTS: Record<string, number> = {
  'Research Labs': 28,
  'Innovation Hubs': 18,
  'Testing & Certification': 16,
  'Training Centers': 12,
};

const IMG = (id: string) =>
  `https://images.unsplash.com/photo-${id}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400`;

export const ADMIN_CENTRES: AdminCentre[] = [
  {
    id: 'ctr-1',
    name: 'AgroTech Research Centre',
    description: 'Advancing sustainable agriculture in Africa',
    focusArea: 'Research Labs',
    country: 'Kenya',
    city: 'Nairobi',
    submittedBy: 'Dr. Samuel Okafor',
    submitterEmail: 'samuel.okafor@agrotech.org',
    submittedOn: 'Oct 10, 2026',
    submittedTime: '10:24 AM',
    status: 'Pending Review',
    listingStatus: 'Published',
    verification: 'Verified',
    views: 1200,
    image: IMG('1500382017468-9049fed747ef'),
    motto: 'Growing the future of food',
    address: '12 Riverside Drive, Westlands',
    phone: '+254 711 204 880',
    email: 'hello@agrotech.org',
    website: 'agrotech.org',
    ownership: 'Private',
    categories: ['Crop Science', 'Soil & Agronomy', 'Agri-Machinery'],
    services: ['Research & Development', 'Training (Industrial)', 'Quality Control & Assurance'],
    scopes: ['Drought-resistant maize trials', 'Precision irrigation pilots'],
    policies: ['Samples must be logged before entry', 'Field trials require ethics clearance'],
    certifications: ['Kenya Agricultural & Livestock Research Act', 'ISO 9001:2015'],
  },
  {
    id: 'ctr-2',
    name: 'Renewable Energy Testing Lab',
    description: 'Clean energy research and testing facilities',
    focusArea: 'Testing & Certification',
    country: 'Nigeria',
    city: 'Lagos',
    submittedBy: 'Amina Yusuf',
    submitterEmail: 'amina.yusuf@retilabs.com',
    submittedOn: 'Oct 8, 2026',
    submittedTime: '04:15 PM',
    status: 'Approved',
    listingStatus: 'Published',
    verification: 'Verified',
    views: 856,
    image: IMG('1509391366360-2e959784a276'),
    motto: 'Powering a cleaner continent',
    address: '7 Ligali Ayorinde Street, Victoria Island',
    phone: '+234 802 445 1190',
    email: 'lab@retilabs.com',
    website: 'retilabs.com',
    ownership: 'Private',
    categories: ['Solar', 'Wind', 'Energy Storage'],
    services: ['Quality Control & Assurance', 'Research & Development'],
    scopes: ['Panel efficiency testing', 'Battery cycle testing'],
    policies: ['High-voltage benches require two operators'],
    certifications: ['IEC 61215', 'NERC compliance'],
  },
  {
    id: 'ctr-3',
    name: 'Biomedical Innovation Centre',
    description: 'Translating research into real-world health solutions',
    focusArea: 'Innovation Hubs',
    country: 'South Africa',
    city: 'Cape Town',
    submittedBy: 'Daniel Tetteh',
    submitterEmail: 'daniel.t@biomedic.org',
    submittedOn: 'Oct 6, 2026',
    submittedTime: '09:32 AM',
    status: 'Approved',
    listingStatus: 'Pending Review',
    verification: 'Pending',
    views: 940,
    image: IMG('1576086213369-97a306d36557'),
    motto: 'Research that reaches the bedside',
    address: '22 Anker Road, Claremont',
    phone: '+27 21 447 9002',
    email: 'info@biomedic.org',
    website: 'biomedic.org',
    ownership: 'NGO | Charity',
    categories: ['Diagnostics', 'Genomics', 'Clinical Trials'],
    services: ['Research & Development', 'Diagnosis (Screening)'],
    scopes: ['Point-of-care device trials'],
    policies: ['Patient data must be anonymised'],
    certifications: ['South African Health Products Regulatory Authority'],
  },
  {
    id: 'ctr-4',
    name: 'Advanced Materials Laboratory',
    description: "Developing next-gen materials for Africa's industries",
    focusArea: 'Research Labs',
    country: 'Ghana',
    city: 'Accra',
    submittedBy: 'Grace Bello',
    submitterEmail: 'grace.bi@materialsinst.org',
    submittedOn: 'Oct 3, 2026',
    submittedTime: '02:18 PM',
    status: 'Rejected',
    listingStatus: 'Pending Review',
    verification: 'Verified',
    views: 320,
    image: IMG('1581093458791-9f3c3900df4b'),
    motto: 'Stronger materials, stronger industry',
    address: '5 Independence Avenue, Ridge',
    phone: '+233 30 266 4471',
    email: 'lab@materialsinst.org',
    website: 'materialsinst.org',
    ownership: 'Government | Public',
    categories: ['Polymers', 'Composites', 'Metallurgy'],
    services: ['Quality Control & Assurance', 'Testing (Industrial)'],
    scopes: ['Tensile and fatigue testing'],
    policies: ['Protective equipment is mandatory'],
    certifications: ['Ghana Standards Authority'],
    reason: 'Verification documents for the ownership type could not be confirmed.',
  },
  {
    id: 'ctr-5',
    name: 'Digital Manufacturing Hub',
    description: 'Skills, tools and innovation for modern manufacturing',
    focusArea: 'Training Centers',
    country: 'Rwanda',
    city: 'Kigali',
    submittedBy: 'Ikenna Obi',
    submitterEmail: 'ikenna.obi@dmhub.org',
    submittedOn: 'Oct 1, 2026',
    submittedTime: '11:05 AM',
    status: 'Published',
    listingStatus: 'Unpublished',
    verification: 'Unverified',
    views: 1500,
    image: IMG('1567789884554-0b844b597180'),
    motto: 'Build it here',
    address: '3 KG 7 Avenue, Kicukiro',
    phone: '+250 788 310 220',
    email: 'team@dmhub.org',
    website: 'dmhub.org',
    ownership: 'Inter-Government',
    categories: ['3D Printing', 'CNC & Fabrication', 'Automation'],
    services: ['Training (Industrial)', 'Research & Development'],
    scopes: ['Additive manufacturing workshops'],
    policies: ['Machines may not be operated unattended'],
    certifications: ['Rwanda Standards Board'],
  },
  {
    id: 'ctr-6',
    name: 'Climate & Environmental Research',
    description: 'Solutions for a sustainable tomorrow',
    focusArea: 'Research Labs',
    country: 'Morocco',
    city: 'Rabat',
    submittedBy: 'Fatima Zahra',
    submitterEmail: 'fatima.z@climateinst.org',
    submittedOn: 'Sep 28, 2026',
    submittedTime: '03:45 PM',
    status: 'Pending Review',
    listingStatus: 'Pending Review',
    verification: 'Verified',
    views: 410,
    image: IMG('1441974231531-c6227db76b6e'),
    motto: 'Measure, understand, act',
    address: '14 Avenue Moulay Youssef, Agdal',
    phone: '+212 537 77 21 09',
    email: 'contact@climateinst.org',
    website: 'climateinst.org',
    ownership: 'NGO | Charity',
    categories: ['Climate Science', 'Water & Sanitation', 'Biodiversity'],
    services: ['Research & Development', 'Training (Industrial)'],
    scopes: ['Coastal erosion monitoring'],
    policies: ['Field data must be peer reviewed before release'],
    certifications: ['Ministry of Energy, Mines and Environment'],
  },
  {
    id: 'ctr-7',
    name: 'AI & Robotics Innovation Centre',
    description: 'Building intelligent solutions for Africa',
    focusArea: 'Innovation Hubs',
    country: 'Egypt',
    city: 'Cairo',
    submittedBy: 'Omar Hassan',
    submitterEmail: 'omr.h@airobo.org',
    submittedOn: 'Sep 25, 2026',
    submittedTime: '09:17 AM',
    status: 'Approved',
    listingStatus: 'Pending Review',
    verification: 'Pending',
    views: 1100,
    image: IMG('1485827404703-89b55fcc595e'),
    motto: 'Machines that work for us',
    address: '9 Al Bahr Al Azeem Street, Maadi',
    phone: '+20 2 2520 1188',
    email: 'hello@airobo.org',
    website: 'airobo.org',
    ownership: 'Private',
    categories: ['Robotics', 'Computer Vision', 'Applied AI'],
    services: ['Research & Development', 'Training (Industrial)'],
    scopes: ['Autonomous drone navigation'],
    policies: ['Robotic cells must be fenced during test runs'],
    certifications: ['Egyptian Organization for Standardization'],
  },
  {
    id: 'ctr-8',
    name: 'Genomics Research Institute',
    description: 'Genetic research for healthier communities',
    focusArea: 'Research Labs',
    country: 'Nigeria',
    city: 'Abuja',
    submittedBy: 'Chinwe Okofor',
    submitterEmail: 'chinwe.okofor@genomics.ng',
    submittedOn: 'Sep 22, 2026',
    submittedTime: '01:12 AM',
    status: 'Rejected',
    listingStatus: 'Published',
    verification: 'Verified',
    views: 290,
    image: IMG('1532187863486-abf9dbad1b69'),
    motto: 'Reading the code of life',
    address: '21 Independence Avenue, Maitama',
    phone: '+234 9 461 2200',
    email: 'info@genomics.ng',
    website: 'genomics.ng',
    ownership: 'Private',
    categories: ['Sequencing', 'Bioinformatics', 'Genetic Counselling'],
    services: ['Research & Development', 'Diagnosis (Screening)'],
    scopes: ['Rare variant discovery'],
    policies: ['Consent is required for every sample'],
    certifications: ['National Health Research Ethics Committee'],
    reason: 'Submitted gallery images did not meet the media requirements.',
  },
];

/** Headline numbers shown on every specialist centre page. */
export const CENTRE_STATS = {
  total: 86,
  published: 64,
  approved: 64,
  pending: 14,
  rejected: 8,
  unpublished: 8,
};

/** Fake trend deltas so the stat cards match the design mockups. */
export const CENTRE_TRENDS = {
  total: { change: '+12%', positive: true },
  published: { change: '+18%', positive: true },
  approved: { change: '+18%', positive: true },
  pending: { change: '+7%', positive: true },
  rejected: { change: '−5%', positive: false },
  unpublished: { change: '−5%', positive: false },
};
