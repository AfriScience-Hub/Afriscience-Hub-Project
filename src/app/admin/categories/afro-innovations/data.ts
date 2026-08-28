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
  { name: 'Health & Biotech', percent: '28.2%', count: 88, color: 'bg-blue-500' },
  { name: 'Agriculture & Food', percent: '21.8%', count: 68, color: 'bg-green-500' },
  { name: 'Energy & Environment', percent: '18.6%', count: 58, color: 'bg-purple-500' },
  { name: 'Education & Learning', percent: '14.1%', count: 44, color: 'bg-orange-500' },
  { name: 'ICT & Software', percent: '9.0%', count: 28, color: 'bg-pink-500' },
  { name: 'Others', percent: '8.3%', count: 26, color: 'bg-gray-300' },
];

export const INNOVATIONS_BY_STAGE = [
  { name: 'Prototype', percent: '32.1%', count: 100, color: 'bg-blue-500' },
  { name: 'In Development', percent: '28.5%', count: 89, color: 'bg-green-500' },
  { name: 'Early Stage', percent: '21.5%', count: 67, color: 'bg-purple-500' },
  { name: 'Growth Stage', percent: '12.2%', count: 38, color: 'bg-orange-500' },
  { name: 'Mature', percent: '5.8%', count: 18, color: 'bg-gray-300' },
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
