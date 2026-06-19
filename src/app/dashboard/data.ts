import { LayoutDashboard, User, ListChecks, UploadCloud, Briefcase, MessageCircle, FileText, Bell, Star, ShieldCheck, Settings, Eye, ThumbsUp, Share2, Clock, ArrowUpRight, CalendarCheck, Users, Trophy, Award, HandCoins, Archive } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type SidebarTab = 'overview' | 'profile' | 'listings' | 'upload' | 'services' | 'messages' | 'invoices' | 'notifications' | 'reviews' | 'verification' | 'settings' | 'donations' | 'archive' | 'awards';

export const SIDEBAR_ITEMS: { key: SidebarTab; label: string; icon: LucideIcon }[] = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard },
  { key: 'profile', label: 'My Profile', icon: User },
  { key: 'listings', label: 'My Listings', icon: ListChecks },
  { key: 'upload', label: 'Upload New Listing', icon: UploadCloud },
  { key: 'services', label: 'My Services', icon: Briefcase },
  { key: 'messages', label: 'Messages', icon: MessageCircle },
  { key: 'invoices', label: 'Invoices', icon: FileText },
  { key: 'notifications', label: 'Notifications', icon: Bell },
  { key: 'reviews', label: 'Reviews', icon: Star },
  { key: 'verification', label: 'Verification Status', icon: ShieldCheck },
  { key: 'settings', label: 'Settings', icon: Settings },
  { key: 'donations', label: 'Donations', icon: HandCoins },
  { key: 'archive', label: 'Archive', icon: Archive },
  { key: 'awards', label: 'Awards', icon: Award },
];

export const TAB_TO_PATH: Record<SidebarTab, string> = {
  overview: '/dashboard/overview',
  profile: '/dashboard/my-profile',
  listings: '/dashboard/my-listings',
  upload: '/dashboard/upload-new-listing',
  services: '/dashboard/my-services',
  messages: '/dashboard/messages',
  invoices: '/dashboard/invoices',
  notifications: '/dashboard/notifications',
  reviews: '/dashboard/reviews',
  verification: '/dashboard/verification-status',
  settings: '/dashboard/settings',
  donations: '/dashboard/donations',
  archive: '/dashboard/archive',
  awards: '/dashboard/awards',
};

export const PATH_TO_TAB: Record<string, SidebarTab> = {
  '/dashboard/overview': 'overview',
  '/dashboard/my-profile': 'profile',
  '/dashboard/my-listings': 'listings',
  '/dashboard/upload-new-listing': 'upload',
  '/dashboard/my-services': 'services',
  '/dashboard/messages': 'messages',
  '/dashboard/invoices': 'invoices',
  '/dashboard/notifications': 'notifications',
  '/dashboard/reviews': 'reviews',
  '/dashboard/verification-status': 'verification',
  '/dashboard/settings': 'settings',
  '/dashboard/donations': 'donations',
  '/dashboard/archive': 'archive',
  '/dashboard/awards': 'awards',
};

export const SUMMARY_CARDS = [
  { label: 'Total Listings', value: '12', change: '+2', icon: Eye, color: 'bg-blue-50 border-blue-100' },
  { label: 'Active Services', value: '2', change: '0', icon: Briefcase, color: 'bg-green-50 border-green-100' },
  { label: 'Profile Views', value: '1,847', change: '+18%', icon: Eye, color: 'bg-purple-50 border-purple-100' },
  { label: 'Total Inquiries', value: '64', change: '+8', icon: MessageCircle, color: 'bg-amber-50 border-amber-100' },
  { label: 'Completed Bookings', value: '28', change: '+5', icon: CalendarCheck, color: 'bg-teal-50 border-teal-100' },
];

export const LISTING_STATUS_CARDS = [
  { label: 'Verified', value: 8, color: 'bg-gradient-to-br from-green-50 to-green-100 border-green-200 text-green-700' },
  { label: 'Pending Verification', value: 3, color: 'bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200 text-amber-700' },
  { label: 'Rejected', value: 1, color: 'bg-gradient-to-br from-red-50 to-red-100 border-red-200 text-red-700' },
];

export const RECENT_ACTIVITY = [
  { id: 1, icon: Eye, text: 'Your "Solar-Powered Irrigation System" listing was viewed 45 times today', time: '2 hours ago' },
  { id: 2, icon: MessageCircle, text: 'New inquiry from Kwame Asante about "AI Crop Disease Detection"', time: '5 hours ago' },
  { id: 3, icon: ThumbsUp, text: 'Your innovation "Bio-Plastic from Cassava Waste" received 12 new likes', time: '1 day ago' },
  { id: 4, icon: Star, text: 'Dr. Wanjiku Muthoni left a 5-star review on your profile', time: '2 days ago' },
  { id: 5, icon: Share2, text: 'Your listing was shared on Twitter by AfriScience Hub', time: '3 days ago' },
];

export function getProfileCompletion(user: { name: string; email: string; phone: string; avatar: string }) {
  const nameSet = !!(user.name && user.name !== 'Guest User');
  const emailSet = !!(user.email && user.email !== 'guest@afrisciencehub.com');
  const phoneSet = !!user.phone;
  const avatarSet = !!user.avatar;
  const checks = [
    { label: 'Full Name', done: nameSet },
    { label: 'Email Address', done: emailSet },
    { label: 'Phone Number', done: phoneSet },
    { label: 'Profile Photo', done: avatarSet },
  ];
  const pct = Math.round((checks.filter(c => c.done).length / checks.length) * 100);
  return { checks, pct };
}

export interface Listing {
  id: number;
  name: string;
  image: string;
  category: string;
  status: 'Verified' | 'Pending Verification' | 'Rejected';
  views: number;
  likes: number;
  reviews: number;
}

export const MOCK_LISTINGS: Listing[] = [
  { id: 1, name: 'Solar-Powered Irrigation System', image: 'https://images.unsplash.com/photo-1621976360623-e6d4ea676f27?auto=format&fit=crop&q=80&w=300', category: 'Green Technology', status: 'Verified', views: 1247, likes: 38, reviews: 156 },
  { id: 2, name: 'Bio-Plastic from Cassava Waste', image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=300', category: 'Bio-Materials', status: 'Pending Verification', views: 892, likes: 22, reviews: 98 },
  { id: 3, name: 'AI Crop Disease Detection', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=300', category: 'AgriTech', status: 'Verified', views: 2156, likes: 51, reviews: 312 },
];

export interface Service {
  id: string;
  name: string;
  description: string;
  costRange: string;
  status: 'Active' | 'Draft';
  bookings: number;
  views: number;
}

export const MOCK_SERVICES: Service[] = [
  { id: '1', name: 'Solar Irrigation Consultation', description: 'Expert advice on solar-powered irrigation systems for African farms.', costRange: '₦100 – ₦150', status: 'Active', bookings: 12, views: 340 },
  { id: '2', name: 'AgriTech Workshop Training', description: 'Hands-on training sessions for modern agricultural technology adoption.', costRange: '₦150 – ₦200', status: 'Active', bookings: 8, views: 215 },
  { id: '3', name: 'Innovation Mentorship Program', description: 'One-on-one mentorship for aspiring innovators and entrepreneurs.', costRange: '₦50 – ₦100', status: 'Draft', bookings: 0, views: 45 },
];

export interface Invoice {
  id: string;
  service: string;
  provider: string;
  client: string;
  amount: string;
  status: 'Pending' | 'Awaiting Confirmation' | 'Paid' | 'Rejected';
  date: string;
  dueDate: string;
  paidDate?: string;
}

export const MOCK_INVOICES: Invoice[] = [
  { id: 'INV-2024-0045', service: 'Solar Installation Consultation', provider: 'GreenTech Solutions', client: 'Amara Farms Ltd', amount: '₦25,000', status: 'Pending', date: '2024-04-01', dueDate: '2024-04-15' },
  { id: 'INV-2024-0044', service: 'AgriTech Training Workshop', provider: 'You', client: 'Kwame Agro Cooperative', amount: '₦180,000', status: 'Awaiting Confirmation', date: '2024-03-28', dueDate: '2024-04-10' },
  { id: 'INV-2024-0043', service: 'Innovation Audit', provider: 'TechConsult Services', client: 'You', amount: '₦50,000', status: 'Paid', date: '2024-03-25', dueDate: '2024-04-05', paidDate: '2024-03-30' },
  { id: 'INV-2024-0042', service: 'Mentorship Program - 3 Months', provider: 'You', client: 'StartUp Accelerator Hub', amount: '₦120,000', status: 'Paid', date: '2024-03-20', dueDate: '2024-04-01', paidDate: '2024-03-29' },
  { id: 'INV-2024-0041', service: 'Technical Review Service', provider: 'Engineering Consult Ltd', client: 'You', amount: '₦35,000', status: 'Rejected', date: '2024-03-15', dueDate: '2024-03-30' },
];

export interface Message {
  id: number;
  from: string;
  avatar: string;
  subject: string;
  preview: string;
  time: string;
  unread: boolean;
}

export const MOCK_MESSAGES: Message[] = [
  { id: 1, from: 'Dr. Wanjiku Muthoni', avatar: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=100', subject: 'Partnership Inquiry', preview: 'Hi, I came across your innovation and would love to discuss a potential collaboration...', time: '2 hours ago', unread: true },
  { id: 2, from: 'Kwame Asante', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100', subject: 'EcoBrick Materials', preview: 'Could you share more details about the recycled plastic sourcing process?', time: '1 day ago', unread: true },
  { id: 3, from: 'AfriScience Hub Team', avatar: 'https://images.unsplash.com/photo-1670881391783-9c55ba592f93?auto=format&fit=crop&q=80&w=100', subject: 'Welcome to the Platform!', preview: 'Thank you for joining AfriScience Hub. Here are some tips to get started...', time: '2 days ago', unread: false },
];

export interface Notification {
  id: number;
  type: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: LucideIcon;
}

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 1, type: 'impact', title: 'Impact Application Approved', message: 'Your Impact Application for "Solar Irrigation" has been approved!', time: '1 hour ago', read: false, icon: Users },
  { id: 2, type: 'competition', title: 'New Competition Open', message: 'New competition "Green Innovation Award 2024" is now open for submissions', time: '3 hours ago', read: false, icon: Trophy },
  { id: 3, type: 'award', title: 'Innovator of the Month', message: 'Congratulations! You have been awarded the "Innovator of the Month" badge', time: '1 day ago', read: true, icon: Award },
  { id: 4, type: 'message', title: 'New Message', message: 'New message from Dr. Wanjiku Muthoni regarding partnership inquiry', time: '2 days ago', read: true, icon: MessageCircle },
  { id: 5, type: 'invoice', title: 'Invoice Paid', message: 'Invoice INV-2024-0043 has been paid', time: '2 days ago', read: false, icon: FileText },
  { id: 6, type: 'booking', title: 'New Booking', message: 'New booking for "AgriTech Workshop Training" received', time: '3 days ago', read: true, icon: CalendarCheck },
];

export interface Review {
  id: number;
  reviewer: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
}

export const MOCK_REVIEWS: Review[] = [
  { id: 1, reviewer: 'Dr. Wanjiku Muthoni', avatar: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=100', rating: 5, date: '2 days ago', comment: 'Exceptional work! The solar irrigation consultation was thorough and practical.' },
  { id: 2, reviewer: 'Kwame Asante', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100', rating: 4, date: '1 week ago', comment: 'Great insights on sustainable farming practices. Very knowledgeable.' },
  { id: 3, reviewer: 'Amara Okafor', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100', rating: 5, date: '2 weeks ago', comment: 'The AgriTech workshop was incredibly valuable. Highly recommend!' },
];

export const COST_RANGES = [
  '₦10 – ₦50', '₦50 – ₦100', '₦100 – ₦150', '₦150 – ₦200',
  '₦200 – ₦500', '₦500 – ₦1,000', '₦1,000+'
];

export interface Donation {
  id: string;
  referenceNo: string;
  program: string;
  amount: string;
  currency: string;
  date: string;
  status: 'Completed' | 'Pending' | 'Failed';
}

export const MOCK_DONATIONS: Donation[] = [
  { id: '1', referenceNo: 'DON-2026-00001', program: 'General Support', amount: '250.00', currency: 'USD', date: '2026-03-15', status: 'Completed' },
  { id: '2', referenceNo: 'DON-2026-00002', program: 'Competition Support', amount: '100.00', currency: 'USD', date: '2026-02-20', status: 'Completed' },
  { id: '3', referenceNo: 'DON-2026-00003', program: 'Educational Scholarships (Tertiary)', amount: '500.00', currency: 'USD', date: '2026-01-10', status: 'Completed' },
  { id: '4', referenceNo: 'DON-2025-00004', program: 'Research Support', amount: '75.00', currency: 'EUR', date: '2025-12-05', status: 'Completed' },
  { id: '5', referenceNo: 'DON-2025-00005', program: 'Career Support', amount: '150.00', currency: 'USD', date: '2025-11-18', status: 'Completed' },
  { id: '6', referenceNo: 'DON-2025-00006', program: 'General Support', amount: '50.00', currency: 'GBP', date: '2025-10-22', status: 'Failed' },
];

export const DONATION_PROGRAMS = ['All Programs', 'General Support', 'Competition Support', 'Career Support', 'Research Support', 'Educational Scholarships (Tertiary)'];
export const DONATION_YEARS = ['All Years', '2026', '2025'];
