export type SubmissionStatus = 'Pending Review' | 'Approved' | 'Rejected' | 'Published';
export type ListingStatus = 'Published' | 'Pending Review' | 'Unpublished';
export type Verification = 'Verified' | 'Pending' | 'Unverified';

export interface ServiceCost {
  service: string;
  range: string;
}

export interface OtherFee {
  name: string;
  amount: string;
}

export interface Credential {
  name: string;
  issuer: string;
  year: string;
}

export interface Achievement {
  title: string;
  description: string;
}

export interface AdminScientist {
  id: string;
  name: string;
  title: string;
  field: string;
  professions: string[];
  degrees: string[];
  location: string;
  country: string;
  city: string;
  /** Who submitted the scientist - shown on the submissions table. */
  submittedBy: string;
  submitterEmail: string;
  submittedOn: string;
  submittedTime: string;
  /** Admin who published the listing, once it is live. */
  publishedBy?: string;
  /** Workflow status while the listing is in review. */
  status: SubmissionStatus;
  /** Status shown on the "All Scientists" listing table. */
  listingStatus: ListingStatus;
  verification: Verification;
  views: number;
  image: string;

  // Full record used by the detail modal.
  bio: string;
  phone: string;
  email: string;
  website: string;
  services: string[];
  scopes: string[];
  serviceCost: ServiceCost[];
  otherFees: OtherFee[];
  certifications: Credential[];
  policies: string[];
  achievements: Achievement[];
  reason?: string;
}

/** Headline numbers shown on every scientist & technologist page. */
export const SCIENTIST_STATS = {
  total: 112,
  published: 78,
  approved: 78,
  pending: 19,
  rejected: 9,
  unpublished: 15,
};

/** Fake trend deltas so the stat cards match the design mockups. */
export const SCIENTIST_TRENDS = {
  total: { change: '+15%', positive: true },
  published: { change: '+21%', positive: true },
  approved: { change: '+21%', positive: true },
  pending: { change: '+6%', positive: true },
  rejected: { change: '−4%', positive: false },
  unpublished: { change: '−4%', positive: false },
};

/** Platform-wide totals per field, used by the overview bar chart. */
export const FIELD_COUNTS: Record<string, number> = {
  Medical: 24,
  Engineering: 19,
  'Computer & ICT': 16,
  Agriculture: 13,
  Pharmaceutical: 11,
  Environmental: 9,
};

const IMG = (id: string) =>
  `https://images.unsplash.com/photo-${id}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400`;

export const ADMIN_SCIENTISTS: AdminScientist[] = [
  {
    id: 'sci-1',
    name: 'Dr. Amara Okafor',
    title: 'Pharmaceutical Scientist',
    field: 'Pharmaceutical',
    professions: ['Clinical Pharmacologist', 'Drug Discovery Scientist', 'Toxicologist'],
    degrees: ['Doctoral'],
    location: 'Lagos, Nigeria',
    country: 'Nigeria',
    city: 'Lagos',
    submittedBy: 'Dr. Amara Okafor',
    submitterEmail: 'amara.okafor@pharmalink.ng',
    publishedBy: 'A. Diallo',
    submittedOn: 'Oct 12, 2026',
    submittedTime: '09:41 AM',
    status: 'Pending Review',
    listingStatus: 'Published',
    verification: 'Verified',
    views: 5200,
    image: IMG('1573496359142-b8d87734a5a2'),
    bio: 'Dedicated Clinical Pharmacologist with over 12 years of experience in drug discovery and toxicology. Passionate about developing affordable medicines for tropical diseases and mentoring the next generation of African scientists.',
    phone: '+234 803 441 2280',
    email: 'amara.okafor@pharmalink.ng',
    website: 'pharmalink.ng',
    services: ['Research & Development', 'Consultancy', 'Education & Training', 'Lab Analysis & Equipment Expert'],
    scopes: ['Herbal Medicine Analysis', 'Clinical Trials Supervision'],
    serviceCost: [
      { service: 'Consultancy', range: '100,000 - 150,000' },
      { service: 'Research & Development', range: '500,000 - 1,000,000' },
      { service: 'Education & Training', range: '150,000 - 200,000' },
    ],
    otherFees: [
      { name: 'Travel / Home Service Fee', amount: '20,000' },
      { name: 'Report Duplication', amount: '5,000' },
    ],
    certifications: [
      { name: 'PhD in Pharmacology', issuer: 'University of Lagos', year: '2015' },
      { name: 'Certified Clinical Research Professional', issuer: 'ACRP', year: '2018' },
    ],
    policies: [
      'All consultations must be booked 48 hours in advance.',
      'Research data remains confidential property of the client.',
      '50% deposit required for project initiation.',
    ],
    achievements: [
      { title: 'Best Researcher Award 2022', description: 'Awarded by the Nigerian Academy of Science for breakthrough in malaria treatment.' },
      { title: 'Published 20+ Papers', description: 'Author of numerous peer-reviewed articles in international journals.' },
    ],
  },
  {
    id: 'sci-2',
    name: 'Eng. Kwame Mensah',
    title: 'Structural & Civil Engineer',
    field: 'Engineering',
    professions: ['Civil Engineer', 'Structural Engineer'],
    degrees: ['Masters'],
    location: 'Accra, Ghana',
    country: 'Ghana',
    city: 'Accra',
    submittedBy: 'Eng. Kwame Mensah',
    submitterEmail: 'k.mensah@buildright.gh',
    publishedBy: 'A. Diallo',
    submittedOn: 'Oct 9, 2026',
    submittedTime: '02:07 PM',
    status: 'Approved',
    listingStatus: 'Published',
    verification: 'Verified',
    views: 3100,
    image: IMG('1560250097-0b93528c311a'),
    bio: 'Structural engineer with 14 years delivering bridges, commercial towers and low-cost housing across West Africa. Specialist in seismic resilience and sustainable concrete mixes.',
    phone: '+233 24 771 0093',
    email: 'k.mensah@buildright.gh',
    website: 'buildright.gh',
    services: ['Project Management', 'Consultancy', 'Architecture & Framework Design'],
    scopes: ['Structural load assessment', 'Foundation redesign'],
    serviceCost: [
      { service: 'Consultancy', range: '80,000 - 120,000' },
      { service: 'Project Management', range: '400,000 - 900,000' },
    ],
    otherFees: [{ name: 'Site Survey Travel', amount: '15,000' }],
    certifications: [
      { name: 'MSc Structural Engineering', issuer: 'KNUST', year: '2011' },
      { name: 'Chartered Engineer (CEng)', issuer: 'GhIE', year: '2016' },
    ],
    policies: ['Site visits scheduled every Tuesday and Thursday.'],
    achievements: [
      { title: 'Adinkra Footbridge', description: 'Lead engineer on the award-winning pedestrian bridge in Kumasi.' },
    ],
  },
  {
    id: 'sci-3',
    name: 'Fatima El-Sayed',
    title: 'Machine Learning Engineer',
    field: 'Computer & ICT',
    professions: ['Machine Learning Engineer', 'Data Scientist'],
    degrees: ['Masters'],
    location: 'Cairo, Egypt',
    country: 'Egypt',
    city: 'Cairo',
    submittedBy: 'Fatima El-Sayed',
    submitterEmail: 'fatima@neuralaxis.io',
    publishedBy: 'M. Osei',
    submittedOn: 'Oct 7, 2026',
    submittedTime: '11:23 AM',
    status: 'Approved',
    listingStatus: 'Pending Review',
    verification: 'Pending',
    views: 2400,
    image: IMG('1580489944761-15a19d654956'),
    bio: 'Machine learning engineer building Arabic-language NLP systems and demand forecasting models for African supply chains.',
    phone: '+20 100 442 7781',
    email: 'fatima@neuralaxis.io',
    website: 'neuralaxis.io',
    services: ['Modeling & Simulation', 'Research & Development', 'Education & Training'],
    scopes: ['Demand forecasting', 'Arabic NLP pipelines'],
    serviceCost: [
      { service: 'Modeling & Simulation', range: '250,000 - 450,000' },
      { service: 'Education & Training', range: '90,000 - 140,000' },
    ],
    otherFees: [{ name: 'Cloud Compute Pass-through', amount: 'at cost' }],
    certifications: [
      { name: 'MSc Artificial Intelligence', issuer: 'Cairo University', year: '2019' },
      { name: 'TensorFlow Developer Certificate', issuer: 'Google', year: '2021' },
    ],
    policies: ['Model source code is handed over only after full payment.'],
    achievements: [
      { title: 'Arabic Sentiment Benchmark', description: 'Open-sourced the largest dialect-aware sentiment dataset for North Africa.' },
    ],
  },
  {
    id: 'sci-4',
    name: 'Dr. Grace Njeri',
    title: 'Soil Scientist',
    field: 'Agriculture',
    professions: ['Soil Scientist', 'Agronomist'],
    degrees: ['Doctoral'],
    location: 'Nairobi, Kenya',
    country: 'Kenya',
    city: 'Nairobi',
    submittedBy: 'Dr. Grace Njeri',
    submitterEmail: 'g.njeri@soillab.ke',
    publishedBy: 'M. Osei',
    submittedOn: 'Oct 4, 2026',
    submittedTime: '08:15 AM',
    status: 'Rejected',
    listingStatus: 'Pending Review',
    verification: 'Verified',
    views: 1800,
    image: IMG('1594744803329-e58b31de8bf5'),
    bio: 'Soil scientist working on fertility restoration for smallholder farms, with a focus on microbiome-informed amendments.',
    phone: '+254 722 330 441',
    email: 'g.njeri@soillab.ke',
    website: 'soillab.ke',
    services: ['Fieldwork', 'Lab Analysis & Equipment Expert', 'Consultancy'],
    scopes: ['Soil fertility mapping', 'Microbiome assays'],
    serviceCost: [
      { service: 'Fieldwork', range: '60,000 - 100,000' },
      { service: 'Lab Analysis & Equipment Expert', range: '120,000 - 200,000' },
    ],
    otherFees: [{ name: 'Sample Logistics', amount: '12,000' }],
    certifications: [
      { name: 'PhD Soil Science', issuer: 'University of Nairobi', year: '2017' },
    ],
    policies: ['Minimum 10 samples per laboratory batch.'],
    achievements: [
      { title: 'Rift Valley Restoration', description: 'Led a 3-year soil restoration program across 4 counties.' },
    ],
    reason: 'Degree certificate upload was unreadable and could not be verified.',
  },
  {
    id: 'sci-5',
    name: 'Samuel Adeyemi',
    title: 'Renewable Energy Engineer',
    field: 'Engineering',
    professions: ['Renewable Energy Engineer', 'Solar Installer'],
    degrees: ['Bachelors'],
    location: 'Lagos, Nigeria',
    country: 'Nigeria',
    city: 'Lagos',
    submittedBy: 'Samuel Adeyemi',
    submitterEmail: 'sam@solargrid.ng',
    publishedBy: 'A. Diallo',
    submittedOn: 'Oct 1, 2026',
    submittedTime: '04:52 PM',
    status: 'Published',
    listingStatus: 'Unpublished',
    verification: 'Unverified',
    views: 2900,
    image: IMG('1519085360753-af0119f7cbe7'),
    bio: 'Solar installer and power systems engineer delivering microgrids to off-grid communities in northern Nigeria.',
    phone: '+234 806 118 2204',
    email: 'sam@solargrid.ng',
    website: 'solargrid.ng',
    services: ['Fabrication & Installation', 'Repairs & Maintenance'],
    scopes: ['Microgrid design', 'Battery bank sizing'],
    serviceCost: [
      { service: 'Fabrication & Installation', range: '300,000 - 800,000' },
    ],
    otherFees: [{ name: 'Travel to Site', amount: '25,000' }],
    certifications: [{ name: 'BEng Electrical Engineering', issuer: 'ABU Zaria', year: '2018' }],
    policies: ['Warranty covers 12 months on installation labour only.'],
    achievements: [{ title: '40 Community Microgrids', description: 'Installed solar microgrids serving 12,000 households.' }],
  },
  {
    id: 'sci-6',
    name: 'Dr. Amina Bello',
    title: 'Environmental Scientist',
    field: 'Environmental',
    professions: ['Environmental Scientist', 'Climate Researcher'],
    degrees: ['Doctoral'],
    location: 'Rabat, Morocco',
    country: 'Morocco',
    city: 'Rabat',
    submittedBy: 'Dr. Amina Bello',
    submitterEmail: 'a.bello@climateinst.org',
    publishedBy: 'M. Osei',
    submittedOn: 'Sep 27, 2026',
    submittedTime: '01:38 PM',
    status: 'Pending Review',
    listingStatus: 'Pending Review',
    verification: 'Verified',
    views: 1500,
    image: IMG('1544005313-94ddf0286df2'),
    bio: 'Climate researcher modelling coastal erosion and water stress across the Maghreb, advising ministries on adaptation policy.',
    phone: '+212 537 77 44 12',
    email: 'a.bello@climateinst.org',
    website: 'climateinst.org',
    services: ['Research & Development', 'Content Creation', 'Consultancy'],
    scopes: ['Coastal erosion modelling', 'Basin water balance'],
    serviceCost: [{ service: 'Research & Development', range: '400,000 - 750,000' }],
    otherFees: [{ name: 'Dataset Licence', amount: '40,000' }],
    certifications: [{ name: 'PhD Environmental Science', issuer: 'Mohammed V University', year: '2016' }],
    policies: ['Peer-reviewed publication required before data release.'],
    achievements: [{ title: 'Maghreb Water Atlas', description: 'Principal author of the regional water stress atlas.' }],
  },
  {
    id: 'sci-7',
    name: 'Dr. Tunde Bakare',
    title: 'Veterinary Epidemiologist',
    field: 'Veterinary',
    professions: ['Veterinary Epidemiologist', 'Wildlife Conservationist'],
    degrees: ['Doctoral'],
    location: 'Ibadan, Nigeria',
    country: 'Nigeria',
    city: 'Ibadan',
    submittedBy: 'Dr. Tunde Bakare',
    submitterEmail: 'tunde.bakare@vetwatch.ng',
    publishedBy: 'A. Diallo',
    submittedOn: 'Sep 24, 2026',
    submittedTime: '10:06 AM',
    status: 'Approved',
    listingStatus: 'Published',
    verification: 'Pending',
    views: 2100,
    image: IMG('1537368910025-700350fe46c7'),
    bio: 'Veterinary epidemiologist tracking zoonotic disease spillover between wildlife reserves and pastoral communities.',
    phone: '+234 809 220 7715',
    email: 'tunde.bakare@vetwatch.ng',
    website: 'vetwatch.ng',
    services: ['Fieldwork', 'Research & Development', 'Education & Training'],
    scopes: ['Outbreak trace modelling', 'Serological surveillance'],
    serviceCost: [{ service: 'Fieldwork', range: '180,000 - 320,000' }],
    otherFees: [{ name: 'Sample Cold Chain', amount: '35,000' }],
    certifications: [{ name: 'DVM', issuer: 'University of Ibadan', year: '2012' }],
    policies: ['Field teams require 10 days mobilisation notice.'],
    achievements: [{ title: 'Rabies Elimination Pilot', description: 'Designed the ring-vaccination protocol now used in three states.' }],
  },
  {
    id: 'sci-8',
    name: 'Nadia Traore',
    title: 'Food Scientist',
    field: 'Food & Nutrition',
    professions: ['Food Scientist', 'Quality Assurance Officer'],
    degrees: ['Masters'],
    location: 'Bamako, Mali',
    country: 'Mali',
    city: 'Bamako',
    submittedBy: 'Nadia Traore',
    submitterEmail: 'nadia@safeharvest.ml',
    publishedBy: 'M. Osei',
    submittedOn: 'Sep 21, 2026',
    submittedTime: '03:29 PM',
    status: 'Rejected',
    listingStatus: 'Published',
    verification: 'Verified',
    views: 980,
    image: IMG('1573497019940-1c28c88b4f3e'),
    bio: 'Food scientist specialising in post-harvest loss reduction and shelf-life extension for shea, maize and horticultural produce.',
    phone: '+223 66 41 20 88',
    email: 'nadia@safeharvest.ml',
    website: 'safeharvest.ml',
    services: ['Lab Analysis & Equipment Expert', 'Consultancy', 'Project Management'],
    scopes: ['Shelf-life trials', 'HACCP system design'],
    serviceCost: [{ service: 'Lab Analysis & Equipment Expert', range: '150,000 - 260,000' }],
    otherFees: [{ name: 'Sample Collection', amount: '18,000' }],
    certifications: [{ name: 'MSc Food Science', issuer: 'University of Bamako', year: '2020' }],
    policies: ['Retest requests accepted within 14 days of report issue.'],
    achievements: [{ title: 'Shea Shelf-Life Protocol', description: 'Reduced shea butter spoilage by 38% across cooperative partners.' }],
    reason: 'Portfolio gallery did not meet the required media standards.',
  },
];
