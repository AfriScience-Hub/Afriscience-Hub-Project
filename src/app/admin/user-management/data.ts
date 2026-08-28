export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: string;
  status: 'Active' | 'Pending' | 'Suspended' | 'Deleted';
  verification: 'Verified' | 'Unverified';
  country: string;
  joined: string;
  lastActive: string;
  userId: string;
  idType: string;
  idNumber: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  totalListings: number;
  totalInvoices: number;
  totalDonations: string;
  lastLoginIp: string;
}

const AVATAR = 'https://images.unsplash.com/photo-1670881391783-9c55ba592f93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXQlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NzIzODM4NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080';

export const MOCK_USERS: User[] = [
  { id: 1, name: 'Dr. John Okofor', email: 'john.okafor@email.com', phone: '+234 810 123 4567', avatar: AVATAR, role: 'Scientist', status: 'Active', verification: 'Verified', country: 'Nigeria', joined: 'May 28, 2025', lastActive: '2 mins ago', userId: 'USR-00001', idType: 'National ID', idNumber: 'NIN-12345678901', emailVerified: true, phoneVerified: true, totalListings: 8, totalInvoices: 5, totalDonations: '₦120,000', lastLoginIp: '197.210.45.23' },
  { id: 2, name: 'Prof. Amina Yusuf', email: 'amina.yusuf@email.com', phone: '+234 802 345 6789', avatar: AVATAR, role: 'Institute Admin', status: 'Active', verification: 'Verified', country: 'Nigeria', joined: 'May 27, 2025', lastActive: '15 mins ago', userId: 'USR-00002', idType: 'National ID', idNumber: 'NIN-98765432100', emailVerified: true, phoneVerified: true, totalListings: 12, totalInvoices: 3, totalDonations: '₦250,000', lastLoginIp: '197.210.45.24' },
  { id: 3, name: 'University of Lagos', email: 'info@unilag.edu.ng', phone: '+234 1 234 5678', avatar: AVATAR, role: 'Institute', status: 'Active', verification: 'Verified', country: 'Nigeria', joined: 'May 26, 2025', lastActive: '1 hour ago', userId: 'USR-00003', idType: 'CAC Registration', idNumber: 'CAC-12345', emailVerified: true, phoneVerified: true, totalListings: 45, totalInvoices: 12, totalDonations: '₦1,500,000', lastLoginIp: '197.210.45.30' },
  { id: 4, name: 'Tunde Adewale', email: 'tunde.adewale@email.com', phone: '+234 706 456 7890', avatar: AVATAR, role: 'Innovator', status: 'Pending', verification: 'Unverified', country: 'Nigeria', joined: 'May 26, 2025', lastActive: '3 hours ago', userId: 'USR-00004', idType: 'National ID', idNumber: 'NIN-56789012345', emailVerified: false, phoneVerified: false, totalListings: 2, totalInvoices: 0, totalDonations: '₦0', lastLoginIp: '197.210.45.25' },
  { id: 5, name: 'Grace Mensah', email: 'grace.mensah@email.com', phone: '+233 24 567 8901', avatar: AVATAR, role: 'Researcher', status: 'Active', verification: 'Verified', country: 'Ghana', joined: 'May 25, 2025', lastActive: '1 day ago', userId: 'USR-00005', idType: 'National ID', idNumber: 'GHA-123456789', emailVerified: true, phoneVerified: true, totalListings: 5, totalInvoices: 2, totalDonations: '₦85,000', lastLoginIp: '197.210.45.26' },
  { id: 6, name: 'AI Innovators Hub', email: 'contact@aiinnovators.africa', phone: '+254 712 345 678', avatar: AVATAR, role: 'Organization', status: 'Active', verification: 'Verified', country: 'Kenya', joined: 'May 24, 2025', lastActive: '2 days ago', userId: 'USR-00006', idType: 'CAC Registration', idNumber: 'CAC-67890', emailVerified: true, phoneVerified: true, totalListings: 18, totalInvoices: 7, totalDonations: '₦500,000', lastLoginIp: '197.210.45.27' },
  { id: 7, name: 'Dr. Fatou Diop', email: 'fatou.diop@email.com', phone: '+221 77 123 4567', avatar: AVATAR, role: 'Scientist', status: 'Suspended', verification: 'Verified', country: 'Senegal', joined: 'May 23, 2025', lastActive: '5 days ago', userId: 'USR-00007', idType: 'National ID', idNumber: 'SEN-987654321', emailVerified: true, phoneVerified: true, totalListings: 3, totalInvoices: 1, totalDonations: '₦45,000', lastLoginIp: '197.210.45.28' },
  { id: 8, name: 'Kwame Boating', email: 'kwame.boating@email.com', phone: '+233 50 678 9012', avatar: AVATAR, role: 'Student', status: 'Active', verification: 'Unverified', country: 'Ghana', joined: 'May 23, 2025', lastActive: '7 mins ago', userId: 'USR-00008', idType: 'Student ID', idNumber: 'STU-123456', emailVerified: false, phoneVerified: true, totalListings: 1, totalInvoices: 0, totalDonations: '₦10,000', lastLoginIp: '197.210.45.29' },
  { id: 9, name: 'Nairobi Tech Center', email: 'hello@nairobitech.ke', phone: '+254 20 234 5678', avatar: AVATAR, role: 'Centre', status: 'Active', verification: 'Verified', country: 'Kenya', joined: 'May 22, 2025', lastActive: '12 hours ago', userId: 'USR-00009', idType: 'CAC Registration', idNumber: 'KE-CAC-11111', emailVerified: true, phoneVerified: true, totalListings: 22, totalInvoices: 9, totalDonations: '₦750,000', lastLoginIp: '197.210.45.31' },
  { id: 10, name: 'Hauwa Muhammad', email: 'hauwa.muhammad@email.com', phone: '+234 809 876 5432', avatar: AVATAR, role: 'Researcher', status: 'Active', verification: 'Verified', country: 'Nigeria', joined: 'May 22, 2025', lastActive: '1 day ago', userId: 'USR-00010', idType: 'National ID', idNumber: 'NIN-45678901234', emailVerified: true, phoneVerified: true, totalListings: 6, totalInvoices: 3, totalDonations: '₦95,000', lastLoginIp: '197.210.45.32' },
];

export const STATS = [
  { label: 'Total Users', value: '18,542', change: '↑ 12.5% this month', positive: true },
  { label: 'Active Users', value: '12,847', change: '↑ 8.3% this month', positive: true },
  { label: 'New Users (This Month)', value: '2,153', change: '↑ 15.7% from last month', positive: true },
  { label: 'Verified Users', value: '9,623', change: '51.9% of total users', positive: true },
  { label: 'Suspended Users', value: '72', change: '↓ 2 from last month', positive: false },
  { label: 'Users with Listings', value: '7,458', change: '40.2% of total users', positive: true },
];

export const TABS = ['All Users', 'Verified', 'Unverified', 'Active', 'Suspended', 'Pending Approval', 'Deleted'];

export const ROLES = ['All Roles', 'Scientist', 'Institute Admin', 'Institute', 'Innovator', 'Researcher', 'Organization', 'Student', 'Centre'];
export const STATUSES = ['All Status', 'Active', 'Pending', 'Suspended', 'Deleted'];
export const VERIFICATIONS = ['All Verification', 'Verified', 'Unverified'];
export const COUNTRIES = ['All Country', 'Nigeria', 'Ghana', 'Kenya', 'Senegal', 'South Africa', 'Tanzania', 'Uganda'];
