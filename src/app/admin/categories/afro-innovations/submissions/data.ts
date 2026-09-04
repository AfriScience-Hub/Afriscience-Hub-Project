export type SubmissionStatus = 'Pending Review' | 'Published' | 'Rejected';

export interface SubmissionRecord {
  id: string;
  innovation: {
    logo: string;
    name: string;
    description: string;
    idTag: string;
    field: string;
    stage: string;
    ownership: string;
    country: string;
    materials: string[];
    dimensions: string;
    weight: string;
    sdgs: string[];
    userGroups: string[];
    applications: string[];
    impact: string[];
    gallery: { category: string; url: string; caption: string }[];
  };
  submitter: { name: string; email: string; avatar: string };
  submittedOn: string;
  submittedTime: string;
  status: SubmissionStatus;
  publishedBy: { name: string; date: string; avatar: string } | null;
  innovator: { name: string; phone: string; email: string; website: string; bio: string };
}

const AVATAR = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100';
const LOGO = 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=200';

export const SUBMISSIONS: SubmissionRecord[] = [
  {
    id: '1',
    innovation: { logo: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=100', name: 'AgriSense AI', description: 'AI-powered precision agriculture platform for smallholder farmers.', idTag: 'AFI-NG-2024-0001', field: 'Agriculture & Food', stage: 'Prototype', ownership: 'Private', country: 'Nigeria', materials: ['Aluminium', 'Silicon'], dimensions: '120 x 80 x 150 cm', weight: '45 kg', sdgs: ['Zero Hunger', 'Climate Action'], userGroups: ['Farmers', 'Businesses'], applications: ['Irrigation', 'Crop monitoring'], impact: ['Yield +40%'], gallery: [{ category: 'Finished Work', url: LOGO, caption: 'Deployed unit' }] },
    submitter: { name: 'Emeka Okafor', email: 'emeka.okafor@email.com', avatar: AVATAR },
    submittedOn: 'May 27, 2025',
    submittedTime: '10:30 AM',
    status: 'Pending Review',
    publishedBy: null,
    innovator: { name: 'Emeka Okafor', phone: '+234 800 111 2222', email: 'emeka.okafor@email.com', website: 'www.agrisense.ng', bio: 'Founder focused on AI for smallholder farmers.' },
  },
  {
    id: '2',
    innovation: { logo: 'https://images.unsplash.com/photo-1576671414121-aa0c81c869e1?w=100', name: 'MediTrack', description: 'Digital health record system for primary healthcare centers.', idTag: 'AFI-KE-2024-0002', field: 'Health & Biotech', stage: 'In Development', ownership: 'Academic', country: 'Kenya', materials: ['Cloud', 'Mobile'], dimensions: '—', weight: '—', sdgs: ['Good Health'], userGroups: ['Hospitals', 'Patients'], applications: ['Patient records'], impact: ['Reduced wait time 30%'], gallery: [{ category: 'Working Materials', url: LOGO, caption: 'Dashboard UI' }] },
    submitter: { name: 'Amina Yusuf', email: 'amina.yusuf@email.com', avatar: AVATAR },
    submittedOn: 'May 26, 2025',
    submittedTime: '02:15 PM',
    status: 'Pending Review',
    publishedBy: null,
    innovator: { name: 'Amina Yusuf', phone: '+254 700 000 001', email: 'amina.yusuf@email.com', website: '', bio: 'Health tech researcher.' },
  },
  {
    id: '3',
    innovation: { logo: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=100', name: 'SolarKit Pro', description: 'Affordable solar energy solution for rural communities.', idTag: 'AFI-GH-2024-0003', field: 'Energy & Environment', stage: 'Early Stage', ownership: 'Private', country: 'Ghana', materials: ['PV Cells', 'Battery'], dimensions: '80 x 60 x 40 cm', weight: '12 kg', sdgs: ['Affordable Energy'], userGroups: ['Homes', 'Schools'], applications: ['Off-grid power'], impact: ['Powered 500 homes'], gallery: [{ category: 'Finished Work', url: LOGO, caption: 'Solar kit' }] },
    submitter: { name: 'Tunde Adeyemi', email: 'tunde.ayemi@email.com', avatar: AVATAR },
    submittedOn: 'May 25, 2025',
    submittedTime: '09:40 AM',
    status: 'Published',
    publishedBy: { name: 'Claire Nwanyanwu', date: 'May 26, 2025', avatar: AVATAR },
    innovator: { name: 'Tunde Adeyemi', phone: '+234 800 222 3333', email: 'tunde.ayemi@email.com', website: 'www.solarkit.gh', bio: 'Energy entrepreneur.' },
  },
  {
    id: '4',
    innovation: { logo: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=100', name: 'EduConnect', description: 'E-learning platform connecting students to quality tutors.', idTag: 'AFI-ZA-2024-0004', field: 'Education & Learning', stage: 'Prototype', ownership: 'Private', country: 'South Africa', materials: ['Web App'], dimensions: '—', weight: '—', sdgs: ['Quality Education'], userGroups: ['Students', 'Schools'], applications: ['Tutor matching'], impact: ['10k learners onboarded'], gallery: [] },
    submitter: { name: 'James Mensah', email: 'james.mensah@email.com', avatar: AVATAR },
    submittedOn: 'May 24, 2025',
    submittedTime: '04:20 PM',
    status: 'Published',
    publishedBy: { name: 'Claire Nwanyanwu', date: 'May 25, 2025', avatar: AVATAR },
    innovator: { name: 'James Mensah', phone: '+27 71 000 0001', email: 'james.mensah@email.com', website: '', bio: 'Edtech founder.' },
  },
  {
    id: '5',
    innovation: { logo: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=100', name: 'WasteWise', description: 'Smart waste management and recycling solution.', idTag: 'AFI-KE-2024-0005', field: 'Energy & Environment', stage: 'In Development', ownership: 'NGO | Charity', country: 'Kenya', materials: ['Sensors', 'Bins'], dimensions: '—', weight: '—', sdgs: ['Sustainable Cities'], userGroups: ['Cities', 'Homes'], applications: ['Waste sorting'], impact: ['Diverted 2k tonnes'], gallery: [] },
    submitter: { name: 'Fatou Ndoye', email: 'fatou.ndoye@email.com', avatar: AVATAR },
    submittedOn: 'May 23, 2025',
    submittedTime: '11:05 AM',
    status: 'Rejected',
    publishedBy: { name: 'Claire Nwanyanwu', date: 'May 24, 2025', avatar: AVATAR },
    innovator: { name: 'Fatou Ndoye', phone: '+221 77 000 0001', email: 'fatou.ndoye@email.com', website: '', bio: '' },
  },
  {
    id: '6',
    innovation: { logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100', name: 'PayBridge', description: 'Cross-border payment solution for African businesses.', idTag: 'AFI-NG-2024-0006', field: 'ICT & Software', stage: 'Growth Stage', ownership: 'Corporate', country: 'Nigeria', materials: ['API', 'Mobile'], dimensions: '—', weight: '—', sdgs: ['Decent Work'], userGroups: ['Businesses', 'Adults'], applications: ['Payments'], impact: ['Processed $2M volume'], gallery: [] },
    submitter: { name: 'Chinedu Eze', email: 'chinedu.eze@email.com', avatar: AVATAR },
    submittedOn: 'May 22, 2025',
    submittedTime: '01:30 PM',
    status: 'Pending Review',
    publishedBy: null,
    innovator: { name: 'Chinedu Eze', phone: '+234 800 444 5555', email: 'chinedu.eze@email.com', website: 'www.paybridge.ng', bio: '' },
  },
  {
    id: '7',
    innovation: { logo: 'https://images.unsplash.com/photo-1508931133504-b84b76ece658?w=100', name: 'AquaPure', description: 'Affordable water purification system for rural homes.', idTag: 'AFI-ZA-2024-0007', field: 'Health & Biotech', stage: 'Prototype', ownership: 'Private', country: 'South Africa', materials: ['Filter', 'Ceramic'], dimensions: '30 x 30 x 50 cm', weight: '8 kg', sdgs: ['Clean Water'], userGroups: ['Homes', 'Schools'], applications: ['Water purification'], impact: ['Clean water for 5k homes'], gallery: [] },
    submitter: { name: 'Lindiwe Dlamini', email: 'lindiwe.dlamini@email.com', avatar: AVATAR },
    submittedOn: 'May 21, 2025',
    submittedTime: '08:15 AM',
    status: 'Published',
    publishedBy: { name: 'Claire Nwanyanwu', date: 'May 22, 2025', avatar: AVATAR },
    innovator: { name: 'Lindiwe Dlamini', phone: '+27 82 000 0002', email: 'lindiwe.dlamini@email.com', website: '', bio: '' },
  },
];
