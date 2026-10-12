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

// Placeholder data — awaiting backend endpoints.
export const MOCK_INNOVATIONS: Innovation[] = [];
export const PENDING_APPROVALS: Innovation[] = [];
export const RECENTLY_ADDED: Innovation[] = [];

export const STATS: {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  iconBg: string;
  icon: string;
}[] = [];

export const INNOVATIONS_BY_CATEGORY: { name: string; percent: string; count: number; color: string }[] = [];
export const INNOVATIONS_BY_STAGE: { name: string; percent: string; count: number; color: string }[] = [];
export const INNOVATIONS_BY_INTEREST: { name: string; percent: string; count: number; color: string }[] = [];
export const INNOVATIONS_BY_OWNERSHIP: { name: string; percent: string; count: number; color: string }[] = [];
export const INNOVATIONS_BY_COUNTRY: { name: string; percent: string; count: number; color: string }[] = [];
export const GROWTH_DATA: { label: string; value: number }[] = [];

export const NEW_SUBMISSIONS: { id: number; name: string; meta: string; time: string; logo: string }[] = [];
export const REJECTED_INNOVATIONS: { id: number; name: string; reason: string; logo: string }[] = [];
export const TOP_SHARED_INNOVATIONS: { id: number; name: string; meta: string; shares: number; logo: string }[] = [];

export const QUICK_ACTIONS = [
  { label: 'View Dashboard', description: 'Overview and analytics', icon: 'dashboard' },
  { label: 'Manage Content', description: 'View and manage all innovations', icon: 'content' },
  { label: 'View Approvals', description: 'Review pending submissions', icon: 'approvals' },
  { label: 'Add Innovation', description: 'Create a new innovation', icon: 'add' },
];

export { LOGO };
