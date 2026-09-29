export interface Innovation {
  id: number;
  name: string;
  category: string;
  country: string;
  status: 'Approved' | 'Pending' | 'Rejected';
  submitted: string;
  logo: string;
  views?: number;
  description?: string;
}

const LOGO = 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwaW5ub3ZhdGlvbnxlbnwxfHx8fDE3NzIzODY1MzV8MA&ixlib=rb-4.1.0&q=80&w=1080';

export const MOCK_INNOVATIONS: Innovation[] = [
  { id: 1, name: 'Solar Water Purifier', category: 'Clean Water Solution', country: 'Nigeria', status: 'Approved', submitted: 'May 27, 2025', logo: LOGO, views: 5621, description: 'Clean Water Solution' },
  { id: 2, name: 'AfriCrop AI', category: 'Agriculture', country: 'Kenya', status: 'Approved', submitted: 'May 26, 2025', logo: LOGO, views: 4823, description: 'Agriculture' },
  { id: 3, name: 'PowerGen Hybrid', category: 'Energy', country: 'South Africa', status: 'Approved', submitted: 'May 25, 2025', logo: LOGO, views: 3982, description: 'Energy' },
  { id: 4, name: 'MedAlert Africa', category: 'Health Tech', country: 'Ghana', status: 'Approved', submitted: 'May 24, 2025', logo: LOGO, views: 2346, description: 'Health Tech' },
  { id: 5, name: 'EcoBrick', category: 'Recycling Solution', country: 'Tanzania', status: 'Approved', submitted: 'May 23, 2025', logo: LOGO, views: 2715, description: 'Recycling Solution' },
];

export const PENDING_APPROVALS: Innovation[] = [
  { id: 6, name: 'Solar Water Purifier', category: 'Clean Water Solution', country: 'Nigeria', status: 'Pending', submitted: '2 hours ago', logo: LOGO },
  { id: 7, name: 'AfriCrop AI', category: 'Agriculture', country: 'Kenya', status: 'Pending', submitted: '5 hours ago', logo: LOGO },
  { id: 8, name: 'M-Tenda', category: 'E-commerce Platform', country: 'Uganda', status: 'Pending', submitted: '1 day ago', logo: LOGO },
  { id: 9, name: 'EcoBrick', category: 'Recycling Solution', country: 'Tanzania', status: 'Pending', submitted: '1 day ago', logo: LOGO },
  { id: 10, name: 'MedAlert Africa', category: 'Health Tech', country: 'Ghana', status: 'Pending', submitted: '2 days ago', logo: LOGO },
];

export const RECENTLY_ADDED: Innovation[] = [
  { id: 11, name: 'Smart Irrigation System', category: 'Agriculture', country: 'Nigeria', status: 'Approved', submitted: 'May 27, 2025', logo: LOGO },
  { id: 12, name: 'Waste4Wealth', category: 'Environment', country: 'Kenya', status: 'Approved', submitted: 'May 26, 2025', logo: LOGO },
  { id: 13, name: 'Learnova', category: 'Education', country: 'South Africa', status: 'Approved', submitted: 'May 25, 2025', logo: LOGO },
  { id: 14, name: 'AfriSafe', category: 'Security', country: 'Ghana', status: 'Approved', submitted: 'May 24, 2025', logo: LOGO },
  { id: 15, name: 'PowerGen Hybrid', category: 'Energy', country: 'Tanzania', status: 'Approved', submitted: 'May 23, 2025', logo: LOGO },
];

export const STATS = [
  { label: 'Total Innovations', value: '312', change: '↑ 18.3% this month', positive: true, iconBg: 'bg-purple-100 text-purple-600', icon: 'lightbulb' },
  { label: 'Pending Approval', value: '18', change: '↓ 6 from last month', positive: false, iconBg: 'bg-orange-100 text-orange-600', icon: 'clock' },
  { label: 'Approved', value: '256', change: '82.1% of total', positive: true, iconBg: 'bg-green-100 text-green-600', icon: 'check' },
  { label: 'Rejected', value: '12', change: '↓ 2 from last month', positive: false, iconBg: 'bg-red-100 text-red-600', icon: 'x' },
  { label: 'Total Views', value: '48,721', change: '↑ 24.6% this month', positive: true, iconBg: 'bg-blue-100 text-blue-600', icon: 'eye' },
  { label: 'Total Shares', value: '9,842', change: '↑ 16.8% this month', positive: true, iconBg: 'bg-teal-100 text-teal-600', icon: 'share' },
];

export const TABS = ['Overview', 'Recent Innovations', 'Top Rated', 'Top Viewed', 'Top Categories', 'Geographic Distribution'];

export const INNOVATIONS_BY_CATEGORY = [
  { name: 'Health & Biotech', percent: '28.2%', count: 88, color: '#3B82F6' },
  { name: 'Agriculture & Food', percent: '21.8%', count: 68, color: '#22C55E' },
  { name: 'Energy & Environment', percent: '18.6%', count: 58, color: '#A855F7' },
  { name: 'Education & Learning', percent: '14.1%', count: 44, color: '#F97316' },
  { name: 'ICT & Software', percent: '9.0%', count: 28, color: '#EC4899' },
  { name: 'Others', percent: '8.3%', count: 26, color: '#D1D5DB' },
];

export const INNOVATIONS_BY_STAGE = [
  { name: 'Prototype', percent: '32.1%', count: 100, color: '#3B82F6' },
  { name: 'In Development', percent: '28.5%', count: 89, color: '#22C55E' },
  { name: 'Early Stage', percent: '21.5%', count: 67, color: '#A855F7' },
  { name: 'Growth Stage', percent: '12.2%', count: 38, color: '#F97316' },
  { name: 'Mature', percent: '5.8%', count: 18, color: '#D1D5DB' },
];

export const GROWTH_DATA = [
  { label: 'May 1', value: 50 },
  { label: 'May 7', value: 100 },
  { label: 'May 14', value: 175 },
  { label: 'May 21', value: 275 },
  { label: 'May 27', value: 312 },
];

export const QUICK_ACTIONS = [
  { label: 'View Dashboard', description: 'Overview and analytics', icon: 'dashboard' },
  { label: 'Manage Content', description: 'View and manage all innovations', icon: 'content' },
  { label: 'View Approvals', description: 'Review pending submissions', icon: 'approvals' },
  { label: 'Add Innovation', description: 'Create a new innovation', icon: 'add' },
];

export const INNOVATIONS_BY_INTEREST = [
  { name: 'Investment | Partnership', percent: '32.4%', count: 101, color: '#3B82F6' },
  { name: 'Purchase | Trade', percent: '26.1%', count: 81, color: '#22C55E' },
  { name: 'Marketing', percent: '18.8%', count: 59, color: '#A855F7' },
  { name: 'Training | Mentorship', percent: '13.5%', count: 42, color: '#F97316' },
  { name: 'Sensitization', percent: '9.2%', count: 29, color: '#EC4899' },
];

export const INNOVATIONS_BY_OWNERSHIP = [
  { name: 'Private', percent: '41.0%', count: 128, color: '#3B82F6' },
  { name: 'Academic', percent: '22.4%', count: 70, color: '#22C55E' },
  { name: 'Corporate', percent: '17.3%', count: 54, color: '#A855F7' },
  { name: 'NGO | Charity', percent: '11.5%', count: 36, color: '#F97316' },
  { name: 'Government | Public', percent: '7.8%', count: 24, color: '#EC4899' },
];

export const INNOVATIONS_BY_COUNTRY = [
  { name: 'Nigeria', percent: '29.5%', count: 92, color: '#3B82F6' },
  { name: 'Kenya', percent: '23.7%', count: 74, color: '#22C55E' },
  { name: 'South Africa', percent: '19.6%', count: 61, color: '#A855F7' },
  { name: 'Ghana', percent: '15.4%', count: 48, color: '#F97316' },
  { name: 'Rwanda', percent: '11.8%', count: 37, color: '#EC4899' },
];

export const NEW_SUBMISSIONS = [
  { id: 101, name: 'HydroBloom', meta: 'AgriTech · Nigeria', time: '2 hours ago', logo: LOGO },
  { id: 102, name: 'MediLink', meta: 'Health Tech · Kenya', time: '5 hours ago', logo: LOGO },
  { id: 103, name: 'SolarGrid', meta: 'Energy · Ghana', time: '1 day ago', logo: LOGO },
  { id: 104, name: 'EduSpark', meta: 'Education · South Africa', time: '1 day ago', logo: LOGO },
  { id: 105, name: 'AquaSense', meta: 'Clean Water · Rwanda', time: '2 days ago', logo: LOGO },
];

export const REJECTED_INNOVATIONS = [
  { id: 201, name: 'CryptoFarm', reason: 'Misleading claims', logo: LOGO },
  { id: 202, name: 'QuickMed AI', reason: 'Unverified medical advice', logo: LOGO },
  { id: 203, name: 'GreenDiesel', reason: 'Plagiarised content', logo: LOGO },
  { id: 204, name: 'PayFast Africa', reason: 'Spam / duplicate', logo: LOGO },
  { id: 205, name: 'AgroBoost', reason: 'Inaccurate data', logo: LOGO },
];

export const TOP_SHARED_INNOVATIONS = [
  { id: 301, name: 'Solar Water Purifier', meta: 'Clean Water Solution', shares: 1842, logo: LOGO },
  { id: 302, name: 'AfriCrop AI', meta: 'Agriculture', shares: 1520, logo: LOGO },
  { id: 303, name: 'PowerGen Hybrid', meta: 'Energy', shares: 1284, logo: LOGO },
  { id: 304, name: 'MedAlert Africa', meta: 'Health Tech', shares: 986, logo: LOGO },
  { id: 305, name: 'EcoBrick', meta: 'Recycling Solution', shares: 741, logo: LOGO },
];
