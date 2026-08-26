import {
  LayoutDashboard,
  Users,
  Layers,
  CheckCircle,
  Shield,
  FileText,
  Bell,
  BarChart3,
  Settings,
  HelpCircle,
  Building2,
  Beaker,
  Target,
  Lightbulb,
  Trophy,
  Vote,
  Award,
  BookOpen,
  UserCheck,
  ClipboardList,
  Activity,
} from 'lucide-react';
import { ADMIN_ROUTES } from './routes';

export interface SidebarSubItem {
  label: string;
  href: string;
}

export interface SidebarItem {
  key: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  children?: SidebarSubItem[];
}

export const SIDEBAR_NAV: SidebarItem[] = [
  {
    key: 'dashboard',
    label: 'Dashboard Overview',
    icon: LayoutDashboard,
    href: ADMIN_ROUTES.dashboard,
  },
  {
    key: 'user-management',
    label: 'User Management',
    icon: Users,
    children: [
      { label: 'All Users', href: ADMIN_ROUTES.allUsers },
      { label: 'Admin Management', href: ADMIN_ROUTES.adminManagement },
      { label: 'Roles & Permissions', href: ADMIN_ROUTES.rolesPermissions },
      { label: 'Activity Logs', href: ADMIN_ROUTES.activityLogs },
    ],
  },
  {
    key: 'categories',
    label: 'Categories',
    icon: Layers,
    children: [
      { label: 'Institutes', href: ADMIN_ROUTES.institutes },
      { label: 'Scientists & Technologies', href: ADMIN_ROUTES.scientistsTechnologies },
      { label: 'Special Centres', href: ADMIN_ROUTES.specialCentres },
      { label: 'Afro Innovations', href: ADMIN_ROUTES.afroInnovations },
      { label: 'Competitions', href: ADMIN_ROUTES.competitions },
      { label: 'Voting', href: ADMIN_ROUTES.voting },
      { label: 'Awards', href: ADMIN_ROUTES.awards },
      { label: 'Impact Stories', href: ADMIN_ROUTES.impactStories },
    ],
  },
  {
    key: 'approvals',
    label: 'Approvals',
    icon: CheckCircle,
    href: ADMIN_ROUTES.approvals,
  },
  {
    key: 'verification-centre',
    label: 'Verification Centre',
    icon: Shield,
    href: ADMIN_ROUTES.verificationCentre,
  },
  {
    key: 'invoices',
    label: 'Invoices',
    icon: FileText,
    href: ADMIN_ROUTES.invoices,
  },
  {
    key: 'notifications',
    label: 'Notifications',
    icon: Bell,
    href: ADMIN_ROUTES.notifications,
  },
  {
    key: 'reports-analytics',
    label: 'Reports & Analytics',
    icon: BarChart3,
    href: ADMIN_ROUTES.reportsAnalytics,
  },
  {
    key: 'system-settings',
    label: 'System Settings',
    icon: Settings,
    href: ADMIN_ROUTES.systemSettings,
  },
  {
    key: 'help-support',
    label: 'Help & Support',
    icon: HelpCircle,
    href: ADMIN_ROUTES.helpSupport,
  },
];
