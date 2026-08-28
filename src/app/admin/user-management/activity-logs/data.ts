export interface ActivityLog {
  id: number;
  date: string;
  time: string;
  relativeTime: string;
  userName: string;
  userEmail: string;
  userAvatar: string;
  role: string;
  action: string;
  actionIcon: 'create' | 'update' | 'approve' | 'send' | 'generate' | 'fail' | 'reply' | 'delete';
  description: string;
  ipAddress: string;
  country: string;
  city: string;
  status: 'Success' | 'Failed';
  userAgent?: string;
  targetUser?: string;
  targetUserEmail?: string;
  targetRole?: string;
  userId?: string;
  timeTaken?: string;
  device?: string;
  browser?: string;
  platform?: string;
}

const AVATAR = 'https://images.unsplash.com/photo-1670881391783-9c55ba592f93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXQlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NzIzODM4NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080';

export const MOCK_ACTIVITIES: ActivityLog[] = [
  {
    id: 1, date: 'May 27, 2025', time: '10:24:32 AM', relativeTime: '2 mins ago',
    userName: 'Claire Iwuanyanwu', userEmail: 'claire@afrisciencehub.org', userAvatar: AVATAR,
    role: 'Super Admin', action: 'Created User', actionIcon: 'create',
    description: 'Created new user Dr. John Okafor (Scientist)',
    ipAddress: '197.210.45.23', country: 'Nigeria', city: 'Lagos', status: 'Success',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    targetUser: 'Dr. John Okafor', targetUserEmail: 'john.okafor@email.com', targetRole: 'Scientist',
    userId: 'USR-001234', timeTaken: '1.34 seconds', device: 'Desktop', browser: 'Chrome 125.0.0', platform: 'Windows',
  },
  {
    id: 2, date: 'May 27, 2025', time: '10:15:18 AM', relativeTime: '11 mins ago',
    userName: 'Chibuike Okonkwo', userEmail: 'chibuike@afrisciencehub.org', userAvatar: AVATAR,
    role: 'Admin', action: 'Updated Role', actionIcon: 'update',
    description: 'Updated role for Faith Nwafor to Content Admin',
    ipAddress: '41.203.18.111', country: 'Nigeria', city: 'Enugu', status: 'Success',
  },
  {
    id: 3, date: 'May 27, 2025', time: '09:58:07 AM', relativeTime: '28 mins ago',
    userName: 'Faith Nwafor', userEmail: 'faith@afrisciencehub.org', userAvatar: AVATAR,
    role: 'Content Admin', action: 'Approved Listing', actionIcon: 'approve',
    description: 'Approved listing: University of Ibadan',
    ipAddress: '105.112.40.67', country: 'Nigeria', city: 'Ibadan', status: 'Success',
  },
  {
    id: 4, date: 'May 27, 2025', time: '09:41:33 AM', relativeTime: '45 mins ago',
    userName: 'Prince Egwu', userEmail: 'prince@afrisciencehub.org', userAvatar: AVATAR,
    role: 'Support Admin', action: 'Sent Notification', actionIcon: 'send',
    description: 'Sent notification to 245 users (New Competition)',
    ipAddress: '197.210.45.23', country: 'Nigeria', city: 'Lagos', status: 'Success',
  },
  {
    id: 5, date: 'May 27, 2025', time: '09:21:45 AM', relativeTime: '1 hour ago',
    userName: 'Treasure Umeh', userEmail: 'treasure@afrisciencehub.org', userAvatar: AVATAR,
    role: 'Finance Admin', action: 'Generated Invoice', actionIcon: 'generate',
    description: 'Generated invoice INV-2025-00045 for Dr. Sarah Musa',
    ipAddress: '41.203.18.111', country: 'Nigeria', city: 'Abuja', status: 'Success',
  },
  {
    id: 6, date: 'May 27, 2025', time: '09:10:56 AM', relativeTime: '1 hour ago',
    userName: 'System', userEmail: 'system@afrisciencehub.org', userAvatar: AVATAR,
    role: 'System', action: 'Failed Login', actionIcon: 'fail',
    description: 'Failed login attempt for admin@afrisciencehub.org',
    ipAddress: '154.16.22.89', country: 'United States', city: 'New York', status: 'Failed',
  },
  {
    id: 7, date: 'May 27, 2025', time: '08:55:18 AM', relativeTime: '2 hours ago',
    userName: 'Dennis Ajaegbu', userEmail: 'dennis@afrisciencehub.org', userAvatar: AVATAR,
    role: 'Community Admin', action: 'Replied to Ticket', actionIcon: 'reply',
    description: 'Replied to support ticket #TKT-2025-0123',
    ipAddress: '197.210.45.23', country: 'Nigeria', city: 'Port Harcourt', status: 'Success',
  },
  {
    id: 8, date: 'May 27, 2025', time: '08:32:10 AM', relativeTime: '2 hours ago',
    userName: 'Carita Ese', userEmail: 'carita@afrisciencehub.org', userAvatar: AVATAR,
    role: 'Tech Admin', action: 'Deleted Content', actionIcon: 'delete',
    description: 'Deleted Innovation AI Crop Predictor',
    ipAddress: '105.112.40.67', country: 'Nigeria', city: 'Enugu', status: 'Success',
  },
];

export const STATS = [
  { label: 'Total Activities', value: '2,456', sub: 'All time activities', iconBg: 'bg-purple-100 text-purple-600' },
  { label: "Today's Activities", value: '156', sub: '↑ 12.5% from yesterday', positive: true, iconBg: 'bg-green-100 text-green-600' },
  { label: 'Admin Activities', value: '78', sub: "50.0% of today's activities", iconBg: 'bg-pink-100 text-pink-600' },
  { label: 'User Activities', value: '78', sub: "50.0% of today's activities", iconBg: 'bg-blue-100 text-blue-600' },
  { label: 'Security Events', value: '9', sub: '↑ 2 critical events', positive: false, iconBg: 'bg-red-100 text-red-600' },
  { label: 'Data Changes', value: '112', sub: 'Today', iconBg: 'bg-indigo-100 text-indigo-600' },
];

export const ACTIONS = ['All Actions', 'Created User', 'Updated Role', 'Approved Listing', 'Sent Notification', 'Generated Invoice', 'Failed Login', 'Replied to Ticket', 'Deleted Content'];
export const USERS = ['All Users', 'Claire Iwuanyanwu', 'Chibuike Okonkwo', 'Faith Nwafor', 'Prince Egwu', 'Treasure Umeh', 'Dennis Ajaegbu', 'Carita Ese', 'System'];
export const ROLES = ['All Roles', 'Super Admin', 'Admin', 'Content Admin', 'Support Admin', 'Finance Admin', 'Community Admin', 'Tech Admin', 'Analytics Admin'];
