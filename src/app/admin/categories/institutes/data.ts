export interface Institute {
  id: number;
  name: string;
  country: string;
  countryCode: string;
  type: string;
  status: 'Verified' | 'Pending' | 'Rejected';
  submitted: string;
  logo: string;
  views?: number;
}

const LOGO = 'https://images.unsplash.com/photo-1562774053-701939374585?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwYnVpbGRpbmd8ZW58MHx8fHwxNzcyMzg2NTM1fDA&ixlib=rb-4.1.0&q=80&w=1080';

export const MOCK_INSTITUTES: Institute[] = [
  { id: 1, name: 'University of Lagos', country: 'Nigeria', countryCode: '🇳🇬', type: 'University', status: 'Verified', submitted: 'May 27, 2025', logo: LOGO, views: 4892 },
  { id: 2, name: 'University of Cape Town', country: 'South Africa', countryCode: '🇿🇦', type: 'University', status: 'Verified', submitted: 'May 26, 2025', logo: LOGO, views: 3421 },
  { id: 3, name: 'Makerere University', country: 'Uganda', countryCode: '🇺🇬', type: 'University', status: 'Verified', submitted: 'May 26, 2025', logo: LOGO, views: 2985 },
  { id: 4, name: 'University of Nairobi', country: 'Kenya', countryCode: '🇰🇪', type: 'University', status: 'Verified', submitted: 'May 25, 2025', logo: LOGO, views: 2456 },
  { id: 5, name: 'Obafemi Awolowo University', country: 'Nigeria', countryCode: '🇳🇬', type: 'University', status: 'Verified', submitted: 'May 25, 2025', logo: LOGO, views: 1967 },
];

export const PENDING_APPROVALS: Institute[] = [
  { id: 6, name: 'African Institute of Biotechnology', country: 'Kenya', countryCode: '🇰🇪', type: 'Research Institute', status: 'Pending', submitted: '2 hours ago', logo: LOGO },
  { id: 7, name: 'Kampala International University', country: 'Uganda', countryCode: '🇺🇬', type: 'University', status: 'Pending', submitted: '5 hours ago', logo: LOGO },
  { id: 8, name: 'Lagos Business School', country: 'Nigeria', countryCode: '🇳🇬', type: 'Training Institute', status: 'Pending', submitted: '1 day ago', logo: LOGO },
  { id: 9, name: 'Rwanda Center for Data Science', country: 'Rwanda', countryCode: '🇷🇼', type: 'Research Center', status: 'Pending', submitted: '1 day ago', logo: LOGO },
];

export const RECENTLY_ADDED: Institute[] = [
  { id: 10, name: 'University of Rwanda', country: 'Rwanda', countryCode: '🇷🇼', type: 'University', status: 'Verified', submitted: 'May 27, 2025', logo: LOGO },
  { id: 11, name: 'Covenant University', country: 'Nigeria', countryCode: '🇳🇬', type: 'University', status: 'Verified', submitted: 'May 26, 2025', logo: LOGO },
  { id: 12, name: 'Strathmore University', country: 'Kenya', countryCode: '🇰🇪', type: 'University', status: 'Verified', submitted: 'May 26, 2025', logo: LOGO },
  { id: 13, name: 'Mangosuthu University', country: 'South Africa', countryCode: '🇿🇦', type: 'University', status: 'Verified', submitted: 'May 25, 2025', logo: LOGO },
  { id: 14, name: 'University of Lusaka', country: 'Zambia', countryCode: '🇿🇲', type: 'University', status: 'Verified', submitted: 'May 25, 2025', logo: LOGO },
];

export const STATS = [
  { label: 'Total Institutes', value: '1,248', change: '↑ 12.5% this month', positive: true, iconBg: 'bg-purple-100 text-purple-600' },
  { label: 'Pending Approval', value: '45', change: '↓ 8 from last month', positive: false, iconBg: 'bg-orange-100 text-orange-600' },
  { label: 'Verified Institutes', value: '896', change: '71.8% of total', positive: true, iconBg: 'bg-green-100 text-green-600' },
  { label: 'Rejected', value: '32', change: '↓ 3 from last month', positive: false, iconBg: 'bg-red-100 text-red-600' },
  { label: 'Total Views', value: '28,490', change: '↑ 18.2% this month', positive: true, iconBg: 'bg-blue-100 text-blue-600' },
];

export const TABS = ['Overview', 'Recent Institutes', 'Top Rated', 'Top Viewed', 'Geographic Distribution'];

export const INSTITUTES_BY_TYPE = [
  { name: 'Universities', percent: '42.3%', count: 528, color: 'bg-blue-500' },
  { name: 'Research Institutes', percent: '21.6%', count: 269, color: 'bg-green-500' },
  { name: 'Training Institutes', percent: '16.8%', count: 210, color: 'bg-purple-500' },
  { name: 'NGO & Centers', percent: '11.4%', count: 142, color: 'bg-orange-500' },
  { name: 'Others', percent: '7.9%', count: 99, color: 'bg-gray-300' },
];

export const TOP_COUNTRIES = [
  { name: 'Nigeria', flag: '🇳🇬', count: 528, percent: '42.3%' },
  { name: 'Ghana', flag: '🇬🇭', count: 186, percent: '14.9%' },
  { name: 'Kenya', flag: '🇰🇪', count: 143, percent: '11.5%' },
  { name: 'South Africa', flag: '🇿🇦', count: 128, percent: '10.3%' },
  { name: 'Egypt', flag: '🇪🇬', count: 95, percent: '7.6%' },
];

export const GROWTH_DATA = [
  { label: 'May 1', value: 250 },
  { label: 'May 7', value: 400 },
  { label: 'May 14', value: 750 },
  { label: 'May 21', value: 1100 },
  { label: 'May 28', value: 1248 },
];

export const QUICK_ACTIONS = [
  { label: 'View Dashboard', description: 'Overview and analytics', icon: 'dashboard' },
  { label: 'Manage Content', description: 'View and manage all Institutes', icon: 'content' },
  { label: 'View Approvals', description: 'Review pending submissions', icon: 'approvals' },
  { label: 'Add Institute', description: 'Add a new Institute', icon: 'add' },
];
