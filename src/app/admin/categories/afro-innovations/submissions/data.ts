export type SubmissionStatus = 'Pending Review' | 'Published' | 'Rejected';

export interface InnovationDoc {
  title: string;
  issuer: string;
  year: string;
  file: string;
}

export interface SubmissionInnovation {
  logo: string;
  name: string;
  description: string;
  idTag: string;
  field: string;
  interests: string[];
  stage: string;
  ownership: string;
  country: string;
  specification: string;
  materials: string[];
  dimensions: string;
  weight: string;
  sdgs: string[];
  userGroups: string[];
  applications: string[];
  impact: string[];
  recommendations: string[];
  cautions: string[];
  licenses: InnovationDoc[];
  awards: InnovationDoc[];
  gallery: { category: string; url: string; caption: string }[];
}

export interface SubmissionInnovator {
  name: string;
  phone: string;
  altPhone: string;
  email: string;
  website: string;
  bio: string;
  socialLinks: { x: string; linkedin: string; facebook: string; instagram: string };
}

export interface SubmissionRecord {
  id: string;
  innovation: SubmissionInnovation;
  submitter: { name: string; email: string; avatar: string };
  submittedOn: string;
  submittedTime: string;
  status: SubmissionStatus;
  publishedBy: { name: string; date: string; avatar: string } | null;
  innovator: SubmissionInnovator;
}

const AVATAR = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100';
const LOGO = 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=200';

const NO_SOCIAL = { x: '', linkedin: '', facebook: '', instagram: '' };

export const SUBMISSIONS: SubmissionRecord[] = [
  {
    id: '1',
    innovation: {
      logo: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=100',
      name: 'AgriSense AI',
      description: 'AI-powered precision agriculture platform for smallholder farmers.',
      idTag: 'AFI-NG-2024-0001',
      field: 'Agriculture & Food',
      interests: ['Investment | Partnership', 'Marketing'],
      stage: 'Prototype',
      ownership: 'Private',
      country: 'Nigeria',
      specification: 'Solar-powered sensor network paired with an AI crop advisory mobile app.',
      materials: ['Aluminium', 'Silicon'],
      dimensions: '120 x 80 x 150 cm',
      weight: '45 kg',
      sdgs: ['Zero Hunger', 'Climate Action'],
      userGroups: ['Farmers', 'Businesses'],
      applications: ['Irrigation', 'Crop monitoring'],
      impact: ['Yield +40%'],
      recommendations: ['Calibrate sensors every planting season.', 'Pair with local extension officers for training.'],
      cautions: ['Keep the hub dry during heavy rainfall.'],
      licenses: [{ title: 'NITDA Product Registration', issuer: 'NITDA', year: '2024', file: 'nitda-cert.pdf' }],
      awards: [],
      gallery: [{ category: 'Finished Work', url: LOGO, caption: 'Deployed unit' }],
    },
    submitter: { name: 'Emeka Okafor', email: 'emeka.okafor@email.com', avatar: AVATAR },
    submittedOn: 'May 27, 2025',
    submittedTime: '10:30 AM',
    status: 'Pending Review',
    publishedBy: null,
    innovator: { name: 'Emeka Okafor', phone: '+234 800 111 2222', altPhone: '+234 800 333 4444', email: 'emeka.okafor@email.com', website: 'www.agrisense.ng', bio: 'Founder focused on AI for smallholder farmers.', socialLinks: { ...NO_SOCIAL, x: '@agrisense', linkedin: 'in/agrisense' } },
  },
  {
    id: '2',
    innovation: {
      logo: 'https://images.unsplash.com/photo-1576671414121-aa0c81c869e1?w=100',
      name: 'MediTrack',
      description: 'Digital health record system for primary healthcare centers.',
      idTag: 'AFI-KE-2024-0002',
      field: 'Health & Biotech',
      interests: ['Investment | Partnership', 'Training | Mentorship'],
      stage: 'In Development',
      ownership: 'Academic',
      country: 'Kenya',
      specification: 'Cloud-hosted electronic medical records with offline-first sync for rural clinics.',
      materials: ['Cloud', 'Mobile'],
      dimensions: '—',
      weight: '—',
      sdgs: ['Good Health & Well-Being'],
      userGroups: ['Healthcare', 'Adults'],
      applications: ['Patient records', 'Appointment scheduling'],
      impact: ['Reduced wait time 30%'],
      recommendations: ['Train clinic staff before rollout.', 'Back up data nightly.'],
      cautions: ['Requires stable connectivity for real-time sync.'],
      licenses: [],
      awards: [{ title: 'Kenya Health Innovation Award', issuer: 'Ministry of Health', year: '2024', file: 'health-award.pdf' }],
      gallery: [{ category: 'Working Materials', url: LOGO, caption: 'Dashboard UI' }],
    },
    submitter: { name: 'Amina Yusuf', email: 'amina.yusuf@email.com', avatar: AVATAR },
    submittedOn: 'May 26, 2025',
    submittedTime: '02:15 PM',
    status: 'Pending Review',
    publishedBy: null,
    innovator: { name: 'Amina Yusuf', phone: '+254 700 000 001', altPhone: '', email: 'amina.yusuf@email.com', website: '', bio: 'Health tech researcher.', socialLinks: { ...NO_SOCIAL, linkedin: 'in/aminayusuf' } },
  },
  {
    id: '3',
    innovation: {
      logo: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=100',
      name: 'SolarKit Pro',
      description: 'Affordable solar energy solution for rural communities.',
      idTag: 'AFI-GH-2024-0003',
      field: 'Energy & Power',
      interests: ['Purchase | Trade', 'Marketing'],
      stage: 'Scale-Up',
      ownership: 'Private',
      country: 'Ghana',
      specification: 'Modular solar home kit with battery storage and mobile monitoring.',
      materials: ['PV Cells', 'Battery'],
      dimensions: '80 x 60 x 40 cm',
      weight: '12 kg',
      sdgs: ['Affordable & Clean Energy', 'Climate Action'],
      userGroups: ['Homes', 'Schools'],
      applications: ['Off-grid power'],
      impact: ['Powered 500 homes'],
      recommendations: ['Install on a south-facing surface.', 'Clean panels monthly.'],
      cautions: ['Do not short-circuit the battery terminals.'],
      licenses: [{ title: 'Ghana Energy Commission Permit', issuer: 'Energy Commission', year: '2023', file: 'ec-permit.pdf' }],
      awards: [{ title: 'West Africa Clean Energy Prize', issuer: 'ECOWAS', year: '2024', file: 'clean-energy.pdf' }],
      gallery: [{ category: 'Finished Work', url: LOGO, caption: 'Solar kit' }],
    },
    submitter: { name: 'Tunde Adeyemi', email: 'tunde.ayemi@email.com', avatar: AVATAR },
    submittedOn: 'May 25, 2025',
    submittedTime: '09:40 AM',
    status: 'Published',
    publishedBy: { name: 'Claire Nwanyanwu', date: 'May 26, 2025', avatar: AVATAR },
    innovator: { name: 'Tunde Adeyemi', phone: '+233 800 222 3333', altPhone: '+233 800 555 6666', email: 'tunde.ayemi@email.com', website: 'www.solarkit.gh', bio: 'Energy entrepreneur.', socialLinks: { ...NO_SOCIAL, x: '@solarkit', facebook: 'solarkitgh' } },
  },
  {
    id: '4',
    innovation: {
      logo: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=100',
      name: 'EduConnect',
      description: 'E-learning platform connecting students to quality tutors.',
      idTag: 'AFI-ZA-2024-0004',
      field: 'Computer & ICT',
      interests: ['Investment | Partnership', 'Sensitization'],
      stage: 'MVP',
      ownership: 'Private',
      country: 'South Africa',
      specification: 'Web and mobile platform matching learners to vetted tutors with live sessions.',
      materials: ['Web App', 'Mobile'],
      dimensions: '—',
      weight: '—',
      sdgs: ['Quality Education', 'Decent Work & Economic Growth'],
      userGroups: ['Students', 'Schools'],
      applications: ['Tutor matching', 'Live classes'],
      impact: ['10k learners onboarded'],
      recommendations: ['Verify tutors before listing.', 'Offer low-bandwidth mode.'],
      cautions: ['Supervise minors during live sessions.'],
      licenses: [],
      awards: [],
      gallery: [],
    },
    submitter: { name: 'James Mensah', email: 'james.mensah@email.com', avatar: AVATAR },
    submittedOn: 'May 24, 2025',
    submittedTime: '04:20 PM',
    status: 'Published',
    publishedBy: { name: 'Claire Nwanyanwu', date: 'May 25, 2025', avatar: AVATAR },
    innovator: { name: 'James Mensah', phone: '+27 71 000 0001', altPhone: '', email: 'james.mensah@email.com', website: '', bio: 'Edtech founder.', socialLinks: { ...NO_SOCIAL, linkedin: 'in/jamesmensah' } },
  },
  {
    id: '5',
    innovation: {
      logo: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=100',
      name: 'WasteWise',
      description: 'Smart waste management and recycling solution.',
      idTag: 'AFI-KE-2024-0005',
      field: 'Waste & Recycling',
      interests: ['Investment | Partnership', 'Marketing'],
      stage: 'Research & Development',
      ownership: 'NGO | Charity',
      country: 'Kenya',
      specification: 'IoT bins with fill-level sensors and a route-optimization dashboard for collectors.',
      materials: ['Sensors', 'Bins'],
      dimensions: '—',
      weight: '—',
      sdgs: ['Sustainable Cities & Communities', 'Responsible Consumption & Production'],
      userGroups: ['Homes', 'Businesses'],
      applications: ['Waste sorting', 'Collection routing'],
      impact: ['Diverted 2k tonnes'],
      recommendations: ['Run community sensitization before deployment.'],
      cautions: ['Handle electronic components as e-waste at end of life.'],
      licenses: [],
      awards: [],
      gallery: [],
    },
    submitter: { name: 'Fatou Ndoye', email: 'fatou.ndoye@email.com', avatar: AVATAR },
    submittedOn: 'May 23, 2025',
    submittedTime: '11:05 AM',
    status: 'Rejected',
    publishedBy: { name: 'Claire Nwanyanwu', date: 'May 24, 2025', avatar: AVATAR },
    innovator: { name: 'Fatou Ndoye', phone: '+221 77 000 0001', altPhone: '', email: 'fatou.ndoye@email.com', website: '', bio: '', socialLinks: { ...NO_SOCIAL } },
  },
  {
    id: '6',
    innovation: {
      logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100',
      name: 'PayBridge',
      description: 'Cross-border payment solution for African businesses.',
      idTag: 'AFI-NG-2024-0006',
      field: 'Computer & ICT',
      interests: ['Investment | Partnership', 'Purchase | Trade'],
      stage: 'Commercialization',
      ownership: 'Corporate',
      country: 'Nigeria',
      specification: 'Unified API for cross-border settlements with FX and compliance tooling.',
      materials: ['API', 'Mobile'],
      dimensions: '—',
      weight: '—',
      sdgs: ['Decent Work & Economic Growth', 'Industry/Innovation/Infrastructure'],
      userGroups: ['Businesses', 'Adults'],
      applications: ['Payments', 'Settlements'],
      impact: ['Processed $2M volume'],
      recommendations: ['Complete KYC before enabling live settlements.'],
      cautions: ['Comply with local FX regulations.'],
      licenses: [{ title: 'CBN Payment Service Licence', issuer: 'Central Bank of Nigeria', year: '2025', file: 'cbn-licence.pdf' }],
      awards: [],
      gallery: [],
    },
    submitter: { name: 'Chinedu Eze', email: 'chinedu.eze@email.com', avatar: AVATAR },
    submittedOn: 'May 22, 2025',
    submittedTime: '01:30 PM',
    status: 'Pending Review',
    publishedBy: null,
    innovator: { name: 'Chinedu Eze', phone: '+234 800 444 5555', altPhone: '', email: 'chinedu.eze@email.com', website: 'www.paybridge.ng', bio: '', socialLinks: { ...NO_SOCIAL, linkedin: 'in/chinedueze' } },
  },
  {
    id: '7',
    innovation: {
      logo: 'https://images.unsplash.com/photo-1508931133504-b84b76ece658?w=100',
      name: 'AquaPure',
      description: 'Affordable water purification system for rural homes.',
      idTag: 'AFI-ZA-2024-0007',
      field: 'Environmental',
      interests: ['Purchase | Trade', 'Sensitization'],
      stage: 'Prototype',
      ownership: 'Private',
      country: 'South Africa',
      specification: 'Gravity-fed ceramic filtration unit requiring no electricity.',
      materials: ['Filter', 'Ceramic'],
      dimensions: '30 x 30 x 50 cm',
      weight: '8 kg',
      sdgs: ['Clean Water & Sanitation', 'Good Health & Well-Being'],
      userGroups: ['Homes', 'Schools'],
      applications: ['Water purification'],
      impact: ['Clean water for 5k homes'],
      recommendations: ['Replace the ceramic filter every 12 months.'],
      cautions: ['Not suitable for chemically contaminated water.'],
      licenses: [{ title: 'SABS Water Quality Certificate', issuer: 'SABS', year: '2024', file: 'sabs-water.pdf' }],
      awards: [],
      gallery: [],
    },
    submitter: { name: 'Lindiwe Dlamini', email: 'lindiwe.dlamini@email.com', avatar: AVATAR },
    submittedOn: 'May 21, 2025',
    submittedTime: '08:15 AM',
    status: 'Published',
    publishedBy: { name: 'Claire Nwanyanwu', date: 'May 22, 2025', avatar: AVATAR },
    innovator: { name: 'Lindiwe Dlamini', phone: '+27 82 000 0002', altPhone: '', email: 'lindiwe.dlamini@email.com', website: '', bio: '', socialLinks: { ...NO_SOCIAL, instagram: 'aquapure' } },
  },
];
