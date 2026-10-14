import { api } from '@/lib/api';

export interface AdminVolunteer {
  id: string;
  userId: string;
  qualification: string;
  country: string;
  state: string;
  tasks: string[];
  compensations: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AdminVolunteerListResponse {
  data: AdminVolunteer[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
    nextPage: number | null;
    previousPage: number | null;
    nextLink: string | null;
    previousLink: string | null;
  };
}

function unwrapData(r: any) {
  return r?.data ?? r;
}

export async function fetchAdminVolunteers(): Promise<AdminVolunteer[]> {
  const r: any = await api.get('/volunteer');
  const data = unwrapData(r);
  return Array.isArray(data) ? data : (data?.data ?? []);
}

export function mapAdminVolunteer(api: AdminVolunteer) {
  return {
    id: api.id,
    userId: api.userId,
    qualification: api.qualification,
    country: api.country,
    state: api.state,
    tasks: api.tasks,
    compensations: api.compensations,
    submittedOn: api.createdAt
      ? new Date(api.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
      : '',
    submittedTime: api.createdAt
      ? new Date(api.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      : '',
    status: 'Submitted' as const,
  };
}

export type VolunteerRecord = ReturnType<typeof mapAdminVolunteer>;