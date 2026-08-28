export interface Competition {
  id: number;
  name: string;
  category: string;
  categoryColor: string;
  participants: number;
  votes: number;
  status: 'Ongoing' | 'Upcoming' | 'Completed';
  endsIn?: string;
  endDate?: string;
  logo: string;
  expected?: number;
  startsIn?: string;
  startDate?: string;
}

const LOGO = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wZXRpdGlvbnxlbnwxfHx8fDE3NzIzODY1MzV8MA&ixlib=rb-4.1.0&q=80&w=1080';

export const ONGOING_COMPETITIONS: Competition[] = [
  { id: 1, name: 'AI for Africa Challenge 2025', category: 'Technology', categoryColor: 'bg-blue-100 text-blue-700', participants: 512, votes: 18245, status: 'Ongoing', endsIn: '12 days left', endDate: 'Jun 08, 2025', logo: LOGO },
  { id: 2, name: 'Young Innovators Africa', category: 'Innovation', categoryColor: 'bg-purple-100 text-purple-700', participants: 423, votes: 12876, status: 'Ongoing', endsIn: '18 days left', endDate: 'Jun 14, 2025', logo: LOGO },
  { id: 3, name: 'Africa Green Energy Prize', category: 'Environment', categoryColor: 'bg-green-100 text-green-700', participants: 367, votes: 9432, status: 'Ongoing', endsIn: '24 days left', endDate: 'Jun 20, 2025', logo: LOGO },
  { id: 4, name: 'African Research Excellence', category: 'Research', categoryColor: 'bg-orange-100 text-orange-700', participants: 298, votes: 7654, status: 'Ongoing', endsIn: '27 days left', endDate: 'Jun 23, 2025', logo: LOGO },
];

export const UPCOMING_COMPETITIONS: Competition[] = [
  { id: 5, name: 'Robotics Africa Cup 2025', category: 'Technology', categoryColor: 'bg-blue-100 text-blue-700', participants: 0, votes: 0, status: 'Upcoming', expected: 312, startsIn: 'Starts in 8 days', startDate: 'Jun 05, 2025', logo: LOGO },
  { id: 6, name: 'Healthcare Innovation Challenge', category: 'Health', categoryColor: 'bg-pink-100 text-pink-700', participants: 0, votes: 0, status: 'Upcoming', expected: 280, startsIn: 'Starts in 18 days', startDate: 'Jun 15, 2025', logo: LOGO },
  { id: 7, name: 'Agritech Solutions Africa', category: 'Agriculture', categoryColor: 'bg-green-100 text-green-700', participants: 0, votes: 0, status: 'Upcoming', expected: 256, startsIn: 'Starts in 23 days', startDate: 'Jun 20, 2025', logo: LOGO },
  { id: 8, name: 'STEM Hackathon Africa', category: 'Education', categoryColor: 'bg-yellow-100 text-yellow-700', participants: 0, votes: 0, status: 'Upcoming', expected: 350, startsIn: 'Starts in 31 days', startDate: 'Jun 28, 2025', logo: LOGO },
];

export const STATS = [
  { label: 'Total Competitions', value: '24', change: '↑ 14.3% this month', positive: true, iconBg: 'bg-purple-100 text-purple-600', icon: 'trophy' },
  { label: 'Upcoming', value: '6', sub: 'Starts soon', iconBg: 'bg-orange-100 text-orange-600', icon: 'calendar' },
  { label: 'Ongoing', value: '8', sub: 'In progress', iconBg: 'bg-blue-100 text-blue-600', icon: 'play' },
  { label: 'Completed', value: '10', sub: 'This year', iconBg: 'bg-green-100 text-green-600', icon: 'check' },
  { label: 'Total Participants', value: '3,142', change: '↑ 21.6% this month', positive: true, iconBg: 'bg-indigo-100 text-indigo-600', icon: 'users' },
  { label: 'Total Votes Cast', value: '128,547', change: '↑ 18.7% this month', positive: true, iconBg: 'bg-yellow-100 text-yellow-600', icon: 'star' },
];

export const TABS = ['Overview', 'All Competitions', 'Submissions', 'Judges', 'Leaderboard', 'Categories', 'Reports'];

export const PARTICIPANTS_BY_TYPE = [
  { name: 'Students', percent: '42.5%', count: 1336, color: 'bg-blue-500' },
  { name: 'Researchers', percent: '23.1%', count: 725, color: 'bg-green-500' },
  { name: 'Startups', percent: '16.8%', count: 528, color: 'bg-purple-500' },
  { name: 'Institutions', percent: '11.2%', count: 352, color: 'bg-orange-500' },
  { name: 'Others', percent: '6.4%', count: 202, color: 'bg-gray-300' },
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

export const QUICK_ACTIONS = [
  { label: 'View Dashboard', description: 'Overview and analytics', icon: 'dashboard' },
  { label: 'Manage Competitions', description: 'All competitions list', icon: 'manage' },
  { label: 'View Submissions', description: 'Review all submissions', icon: 'submissions' },
  { label: 'Judges Management', description: 'Manage judges and scoring', icon: 'judges' },
  { label: 'Leaderboard', description: 'View all leaderboards', icon: 'leaderboard' },
  { label: 'Competition Categories', description: 'Manage categories', icon: 'categories' },
  { label: 'Settings', description: 'Competition settings', icon: 'settings' },
];
