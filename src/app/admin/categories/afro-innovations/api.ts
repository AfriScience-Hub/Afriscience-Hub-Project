import { api } from '@/lib/api';

export interface AdminInnovation {
  id: string;
  userId: string;
  idTag: string;
  image: string;
  innovationName: string;
  country: string;
  shortDescription: string;
  ownership: string;
  stage: string;
  specification: string;
  materialsUsed: string;
  length: string;
  width: string;
  height: string;
  dimensionUnit: string;
  weight: string;
  weightUnit: string;
  applications: string;
  impact: string;
  recommendations: string;
  cautions: string;
  status: string;
  reviewedBy: string | null;
  reasonForRejection: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AdminInnovationListResponse {
  data: AdminInnovation[];
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

export async function fetchAdminInnovations(): Promise<AdminInnovation[]> {
  const r: any = await api.get('/listings/innovations/admin/list');
  const data = unwrapData(r);
  return Array.isArray(data) ? data : (data?.data ?? []);
}

export async function approveInnovation(id: string) {
  return api.post(`/listings/innovations/admin/approval/${id}`);
}

export async function rejectInnovation(id: string, reason: string) {
  return api.post(`/listings/innovations/admin/rejection/${id}`, { reason });
}

/** Maps the API status enum to the UI status label. */
export function mapApiStatus(apiStatus: string): 'Pending Review' | 'Published' | 'Rejected' {
  switch (apiStatus) {
    case 'APPROVED':
      return 'Published';
    case 'REJECTED':
      return 'Rejected';
    case 'PENDING':
    default:
      return 'Pending Review';
  }
}

/**
 * Maps an admin-listing API record to the `SubmissionRecord` shape used by the
 * admin tables/modal. Fields the API does not yet return are filled with safe
 * empty defaults so the UI degrades gracefully until those endpoints land.
 */
export function mapAdminInnovation(api: AdminInnovation) {
  const split = (v: string | undefined) => (v ? String(v).split('\n').filter(Boolean) : []);
  return {
    id: api.id,
    innovation: {
      logo: api.image || '',
      name: api.innovationName || '',
      description: api.shortDescription || '',
      idTag: api.idTag || '',
      field: '',
      interests: [] as string[],
      stage: api.stage || '',
      ownership: api.ownership || '',
      country: api.country || '',
      specification: api.specification || '',
      materials: api.materialsUsed ? String(api.materialsUsed).split(', ').filter(Boolean) : [],
      dimensions: `${api.length || ''} x ${api.width || ''} x ${api.height || ''} ${api.dimensionUnit || ''}`.trim(),
      weight: `${api.weight || ''} ${api.weightUnit || ''}`.trim(),
      sdgs: [] as string[],
      userGroups: [] as string[],
      applications: split(api.applications),
      impact: split(api.impact),
      recommendations: split(api.recommendations),
      cautions: split(api.cautions),
      licenses: [] as any[],
      awards: [] as any[],
      gallery: [] as any[],
    },
    submitter: { name: '', email: '', avatar: '' },
    submittedOn: api.createdAt
      ? new Date(api.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
      : '',
    submittedTime: api.createdAt
      ? new Date(api.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      : '',
    status: mapApiStatus(api.status),
    verified: false,
    publishedBy: api.reviewedBy
      ? { name: api.reviewedBy, date: api.updatedAt || '', avatar: '' }
      : null,
    innovator: {
      name: '',
      username: '',
      phone: '',
      altPhone: '',
      email: '',
      website: '',
      bio: '',
      socialLinks: { x: '', linkedin: '', facebook: '', instagram: '' },
    },
    reasonForRejection: api.reasonForRejection || '',
    reviewedBy: api.reviewedBy || '',
  };
}
