export interface Competition {
  id: number;
  name: string;
  category: string;
  categoryColor: string;
  country: string;
  participants: number;
  votes: number;
  status: 'Ongoing' | 'Upcoming' | 'Completed';
  endsIn?: string;
  endDate?: string;
  /** ISO date (YYYY-MM-DD) used for date-range filtering */
  endDateISO?: string;
  logo: string;
  expected?: number;
  startsIn?: string;
  startDate?: string;
  /** ISO date (YYYY-MM-DD) used for date-range filtering */
  startDateISO?: string;
}

const LOGO = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wZXRpdGlvbnxlbnwxfHx8fDE3NzIzODY1MzV8MA&ixlib=rb-4.1.0&q=80&w=1080';

export const ONGOING_COMPETITIONS: Competition[] = [
  { id: 1, name: 'AI for Africa Challenge 2025', category: 'Technology', categoryColor: 'bg-blue-100 text-blue-700', country: 'Nigeria', participants: 512, votes: 18245, status: 'Ongoing', endsIn: '12 days left', endDate: 'Jun 08, 2025', endDateISO: '2025-06-08', logo: LOGO },
  { id: 2, name: 'Young Innovators Africa', category: 'Innovation', categoryColor: 'bg-purple-100 text-purple-700', country: 'Ghana', participants: 423, votes: 12876, status: 'Ongoing', endsIn: '18 days left', endDate: 'Jun 14, 2025', endDateISO: '2025-06-14', logo: LOGO },
  { id: 3, name: 'Africa Green Energy Prize', category: 'Environment', categoryColor: 'bg-green-100 text-green-700', country: 'Kenya', participants: 367, votes: 9432, status: 'Ongoing', endsIn: '24 days left', endDate: 'Jun 20, 2025', endDateISO: '2025-06-20', logo: LOGO },
  { id: 4, name: 'African Research Excellence', category: 'Research', categoryColor: 'bg-orange-100 text-orange-700', country: 'South Africa', participants: 298, votes: 7654, status: 'Ongoing', endsIn: '27 days left', endDate: 'Jun 23, 2025', endDateISO: '2025-06-23', logo: LOGO },
];

export const UPCOMING_COMPETITIONS: Competition[] = [
  { id: 5, name: 'Robotics Africa Cup 2025', category: 'Technology', categoryColor: 'bg-blue-100 text-blue-700', country: 'Nigeria', participants: 0, votes: 0, status: 'Upcoming', expected: 312, startsIn: 'Starts in 8 days', startDate: 'Jun 05, 2025', startDateISO: '2025-06-05', logo: LOGO },
  { id: 6, name: 'Healthcare Innovation Challenge', category: 'Health', categoryColor: 'bg-pink-100 text-pink-700', country: 'Kenya', participants: 0, votes: 0, status: 'Upcoming', expected: 280, startsIn: 'Starts in 18 days', startDate: 'Jun 15, 2025', startDateISO: '2025-06-15', logo: LOGO },
  { id: 7, name: 'Agritech Solutions Africa', category: 'Agriculture', categoryColor: 'bg-green-100 text-green-700', country: 'South Africa', participants: 0, votes: 0, status: 'Upcoming', expected: 256, startsIn: 'Starts in 23 days', startDate: 'Jun 20, 2025', startDateISO: '2025-06-20', logo: LOGO },
  { id: 8, name: 'STEM Hackathon Africa', category: 'Education', categoryColor: 'bg-yellow-100 text-yellow-700', country: 'Ghana', participants: 0, votes: 0, status: 'Upcoming', expected: 350, startsIn: 'Starts in 31 days', startDate: 'Jun 28, 2025', startDateISO: '2025-06-28', logo: LOGO },
];

export const STATS = [
  { label: 'Total Competitions', value: '24', change: '↑ 14.3% this month', positive: true, iconBg: 'bg-purple-100 text-purple-600', icon: 'trophy' },
  { label: 'Ongoing', value: '8', sub: 'In progress', iconBg: 'bg-blue-100 text-blue-600', icon: 'play' },
  { label: 'Upcoming', value: '6', sub: 'Starts soon', iconBg: 'bg-orange-100 text-orange-600', icon: 'calendar' },
  { label: 'Completed', value: '10', sub: 'This year', iconBg: 'bg-green-100 text-green-600', icon: 'check' },
  { label: 'Total Participants', value: '3,142', change: '↑ 21.6% this month', positive: true, iconBg: 'bg-indigo-100 text-indigo-600', icon: 'users' },
  { label: 'Total Votes Cast', value: '128,547', change: '↑ 18.7% this month', positive: true, iconBg: 'bg-yellow-100 text-yellow-600', icon: 'star' },
  { label: 'Total Votes Boosted', value: '38,420', change: '↑ 9.4% this month', positive: true, iconBg: 'bg-pink-100 text-pink-600', icon: 'boost' },
];

export const PARTICIPANTS_BY_TYPE = [
  { name: 'Afri-Anime', percent: '32.5%', count: 1020, color: '#3B82F6' },
  { name: 'Afri-Presentations', percent: '27.5%', count: 865, color: '#22C55E' },
  { name: 'Afri-Memes', percent: '22.4%', count: 704, color: '#A855F7' },
  { name: 'Afri-MySpace', percent: '17.6%', count: 553, color: '#F97316' },
];

export const PARTICIPANTS_BY_COUNTRY = [
  { name: 'Nigeria', percent: '28.4%', count: 892, color: '#3B82F6' },
  { name: 'Kenya', percent: '20.7%', count: 651, color: '#22C55E' },
  { name: 'Ghana', percent: '16.3%', count: 512, color: '#A855F7' },
  { name: 'South Africa', percent: '13.9%', count: 438, color: '#F97316' },
  { name: 'Egypt', percent: '10.1%', count: 317, color: '#EAB308' },
  { name: 'Other African Countries', percent: '10.6%', count: 332, color: '#D1D5DB' },
];

export const BOOST_VOTE_PACKAGES = [
  { name: 'Starter (50 votes)', percent: '36.5%', count: 420, color: '#3B82F6' },
  { name: 'Bronze (100 votes)', percent: '26.9%', count: 310, color: '#22C55E' },
  { name: 'Silver (250 votes)', percent: '18.7%', count: 215, color: '#A855F7' },
  { name: 'Gold (500 votes)', percent: '12.2%', count: 140, color: '#F97316' },
  { name: 'Platinum (1,000 votes)', percent: '5.7%', count: 65, color: '#EAB308' },
];

export const TOP_VOTED_PARTICIPANTS = [
  { name: 'Chidera Okafor', meta: 'Afri-Anime · Nigeria', value: '12,480' },
  { name: 'Amara Nwosu', meta: 'Afri-Anime · Kenya', value: '11,230' },
  { name: 'David Nnaji', meta: 'Afri-Memes · Egypt', value: '10,915' },
  { name: 'Grace Bello', meta: 'Afri-Presentations · Nigeria', value: '9,870' },
  { name: 'Yaw Boateng', meta: 'Afri-MySpace · Ghana', value: '9,245' },
];

export const TOP_BOOSTED_PARTICIPANTS = [
  { name: 'Amara Nwosu', meta: 'Afri-Anime · Kenya', value: '4,850' },
  { name: 'Chidera Okafor', meta: 'Afri-Anime · Nigeria', value: '4,320' },
  { name: 'Zainab Osei', meta: 'Afri-Memes · South Africa', value: '3,940' },
  { name: 'Ikemefuna Obi', meta: 'Afri-MySpace · Rwanda', value: '3,510' },
  { name: 'Fatima Bello', meta: 'Afri-Presentations · Egypt', value: '3,225' },
];

export const VOTES_DATA = [
  { label: 'May 20', value: 15000 },
  { label: 'May 21', value: 18000 },
  { label: 'May 22', value: 22000 },
  { label: 'May 23', value: 19000 },
  { label: 'May 24', value: 25000 },
  { label: 'May 25', value: 28000 },
  { label: 'May 26', value: 24000 },
  { label: 'May 27', value: 30000 },
];

export const BOOST_VOTE_TRENDS = [
  { label: 'May 20', value: 3200 },
  { label: 'May 21', value: 4100 },
  { label: 'May 22', value: 3900 },
  { label: 'May 23', value: 5200 },
  { label: 'May 24', value: 4800 },
  { label: 'May 25', value: 6100 },
  { label: 'May 26', value: 5700 },
  { label: 'May 27', value: 6800 },
];

export const TREND_DATA = [
  { label: 'May 20', value: 10 },
  { label: 'May 21', value: 12 },
  { label: 'May 22', value: 14 },
  { label: 'May 23', value: 16 },
  { label: 'May 24', value: 18 },
  { label: 'May 25', value: 20 },
  { label: 'May 26', value: 22 },
  { label: 'May 27', value: 24 },
];

export const COMPETITION_PAGES = [
  { label: 'All Competitions', description: 'Browse and manage competitions', icon: 'manage', href: '/admin/categories/competitions/all' },
  { label: 'View Submissions', description: 'Review all submissions', icon: 'submissions', href: '/admin/categories/competitions/submissions' },
];
