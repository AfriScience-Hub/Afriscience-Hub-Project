export interface Admin {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: string;
  status: 'Active' | 'Inactive' | 'Pending';
  adminId: string;
  location: string;
  joined: string;
  lastLogin: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  twoFactorAuth: boolean;
  lastPasswordChange: string;
  lastLoginIp: string;
  permissions: string;
  permissionCount: number;
  description: string;
}

const AVATAR = 'https://images.unsplash.com/photo-1670881391783-9c55ba592f93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXQlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NzIzODM4NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080';

export const MOCK_ADMINS: Admin[] = [
  { id: 1, name: 'Claire Iwuanyanwu', email: 'claire@afrisciencehub.org', phone: '+234 810 123 4567', avatar: AVATAR, role: 'Super Admin', status: 'Active', adminId: 'ADM-0001', location: 'Lagos, Nigeria', joined: 'Jan 5, 2025', lastLogin: 'Today, 8:34 AM', emailVerified: true, phoneVerified: true, twoFactorAuth: true, lastPasswordChange: 'Apr 12, 2025, 9:15 AM', lastLoginIp: '197.210.45.23', permissions: 'All Permissions', permissionCount: 28, description: 'Full system access with all permissions' },
  { id: 2, name: 'Chibuike Okonkwo', email: 'chibuike@afrisciencehub.org', phone: '+234 802 345 6789', avatar: AVATAR, role: 'Admin', status: 'Active', adminId: 'ADM-0002', location: 'Lagos, Nigeria', joined: 'Jan 12, 2025', lastLogin: 'Today, 7:12 AM', emailVerified: true, phoneVerified: true, twoFactorAuth: true, lastPasswordChange: 'Mar 20, 2025', lastLoginIp: '197.210.45.24', permissions: 'All Permissions', permissionCount: 25, description: 'Manage platform operations' },
  { id: 3, name: 'Faith Nwafor', email: 'faith@afrisciencehub.org', phone: '+234 706 456 7890', avatar: AVATAR, role: 'Content Admin', status: 'Active', adminId: 'ADM-0003', location: 'Abuja, Nigeria', joined: 'Jan 20, 2025', lastLogin: 'Yesterday, 11:45 PM', emailVerified: true, phoneVerified: true, twoFactorAuth: false, lastPasswordChange: 'Feb 15, 2025', lastLoginIp: '197.210.45.25', permissions: 'Content Management', permissionCount: 12, description: 'Manage content and listings' },
  { id: 4, name: 'Prince Egwu', email: 'prince@afrisciencehub.org', phone: '+234 809 876 5432', avatar: AVATAR, role: 'Support Admin', status: 'Active', adminId: 'ADM-0004', location: 'Port Harcourt, Nigeria', joined: 'Feb 2, 2025', lastLogin: 'Yesterday, 6:30 PM', emailVerified: true, phoneVerified: false, twoFactorAuth: false, lastPasswordChange: 'Jan 10, 2025', lastLoginIp: '197.210.45.26', permissions: 'Support & Tickets', permissionCount: 8, description: 'Handle support and enquiries' },
  { id: 5, name: 'Treasure Umeh', email: 'treasure@afrisciencehub.org', phone: '+234 811 234 5678', avatar: AVATAR, role: 'Finance Admin', status: 'Active', adminId: 'ADM-0005', location: 'Lagos, Nigeria', joined: 'Feb 15, 2025', lastLogin: 'May 27, 2025', emailVerified: true, phoneVerified: true, twoFactorAuth: true, lastPasswordChange: 'May 1, 2025', lastLoginIp: '197.210.45.27', permissions: 'Finance & Invoices', permissionCount: 10, description: 'Manage invoices and payments' },
  { id: 6, name: 'Dennis Ajaegbu', email: 'dennis@afrisciencehub.org', phone: '+234 803 456 7890', avatar: AVATAR, role: 'Community Admin', status: 'Inactive', adminId: 'ADM-0006', location: 'Enugu, Nigeria', joined: 'Mar 3, 2025', lastLogin: 'May 20, 2025', emailVerified: true, phoneVerified: true, twoFactorAuth: false, lastPasswordChange: 'Mar 15, 2025', lastLoginIp: '197.210.45.28', permissions: 'Community Management', permissionCount: 14, description: 'Manage community interactions' },
  { id: 7, name: 'Carita Ese', email: 'carita@afrisciencehub.org', phone: '+234 705 678 9012', avatar: AVATAR, role: 'Tech Admin', status: 'Active', adminId: 'ADM-0007', location: 'Lagos, Nigeria', joined: 'Mar 10, 2025', lastLogin: 'Today, 8:05 AM', emailVerified: true, phoneVerified: true, twoFactorAuth: true, lastPasswordChange: 'Apr 28, 2025', lastLoginIp: '197.210.45.29', permissions: 'Technical Access', permissionCount: 20, description: 'System configuration and integrations' },
  { id: 8, name: 'Alex Eze', email: 'alex@afrisciencehub.org', phone: '+234 812 345 6789', avatar: AVATAR, role: 'Analytics Admin', status: 'Active', adminId: 'ADM-0008', location: 'Lagos, Nigeria', joined: 'Apr 18, 2025', lastLogin: 'May 26, 2025', emailVerified: true, phoneVerified: true, twoFactorAuth: false, lastPasswordChange: 'Apr 18, 2025', lastLoginIp: '197.210.45.30', permissions: 'Analytics & Reports', permissionCount: 8, description: 'View and export analytics' },
];

export const STATS = [
  { label: 'Total Admins', value: '18', change: '↑ 2 new this month', positive: true, icon: 'users' },
  { label: 'Super Admins', value: '3', change: '16.7% of total admins', positive: true, icon: 'crown' },
  { label: 'Active Admins', value: '17', change: '94.4% of total admins', positive: true, icon: 'shield-check' },
  { label: 'Inactive Admins', value: '1', change: '↓ 1 from last month', positive: false, icon: 'shield-off' },
  { label: 'Pending Invitations', value: '2', change: 'Awaiting acceptance', positive: true, icon: 'mail' },
];

export const TABS = ['All Admins', 'Active', 'Inactive', 'Pending Invitations'];

export const ROLES = ['All Roles', 'Super Admin', 'Admin', 'Content Admin', 'Support Admin', 'Finance Admin', 'Community Admin', 'Tech Admin', 'Analytics Admin'];
export const STATUSES = ['All Status', 'Active', 'Inactive', 'Pending'];
