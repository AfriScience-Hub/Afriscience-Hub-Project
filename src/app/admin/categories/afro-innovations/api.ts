import { api } from '@/lib/api';

export interface AdminInnovationDoc {
  type?: string;
  documentTitle?: string;
  title?: string;
  issuer?: string;
  year?: string | number;
  documentFile?: string;
  file?: string;
}

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
  materialsUsed: string | string[];
  length: string;
  width: string;
  height: string;
  dimensionUnit: string;
  weight: string;
  weightUnit: string;
  applications: string | string[];
  impact: string | string[];
  recommendations: string | string[];
  cautions: string | string[];
  status: string;
  isVerified?: boolean;
  verified?: boolean;
  reviewedBy: string | null;
  reasonForRejection: string | null;
  createdAt: string;
  updatedAt: string;

  // Array fields returned by the list endpoint
  fields?: { field: string }[] | string[];
  interests?: { interest: string }[] | string[];
  sdgs?: { sdg: string }[] | string[];
  userGroups?: { userGroup: string }[] | string[];
  documents?: AdminInnovationDoc[];
  media?: { category: string; mediaFile?: string; url?: string; caption?: string }[];
  submitter?: { name: string; email: string; avatar: string };
  innovator?: {
    name: string;
    username: string;
    phone: string;
    altPhone: string;
    email: string;
    website: string;
    bio: string;
    socialLinks: { x: string; linkedin: string; facebook: string; instagram: string };
  };
  user?: {
    fullName?: string;
    phone?: string;
    email?: string;
    website?: string;
  };
  profile?: {
    username?: string;
    website?: string;
  };
  reviewer?: {
    firstName?: string;
    lastName?: string;
  };
  socials?: { platform: string; link: string }[];
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

/** Verifies or unverifies a published innovation. */
export async function setInnovationVerification(id: string, isVerified: boolean) {
  const r = await api.post(`/listings/innovations/admin/verify/${id}`, { isVerified });
  return unwrapData(r);
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

/** Normalises a value that may be a string, an array of strings, or an array of objects with a named property. */
function toStringArray(v: any, key?: string): string[] {
  if (v == null) return [];
  if (Array.isArray(v)) {
    return v.map(item => {
      if (typeof item === 'string') return item;
      if (item && typeof item === 'object' && key) return String(item[key] ?? '');
      return String(item);
    }).filter(Boolean);
  }
  if (typeof v === 'string') {
    return String(v).split(/\n|,/).map(s => s.trim()).filter(Boolean);
  }
  return [];
}

export function mapAdminInnovation(api: AdminInnovation) {
  const split = (v: string | undefined) => (v ? String(v).split('\n').filter(Boolean) : []);
  const toArray = (v: any, key?: string) => toStringArray(v, key);

  const materials = toArray(api.materialsUsed);
  const dimensions = `${api.length || ''} x ${api.width || ''} x ${api.height || ''} ${api.dimensionUnit || ''}`.trim();
  const weight = `${api.weight || ''} ${api.weightUnit || ''}`.trim();

  const field = Array.isArray(api.fields)
    ? api.fields.map(f => (typeof f === 'string' ? f : f.field)).filter(Boolean)[0] || ''
    : (api.fields ? String(api.fields) : '');
  const interests = toArray(api.interests, 'interest');
  const sdgs = toArray(api.sdgs, 'sdg');
  const userGroups = toArray(api.userGroups, 'userGroup');
  const applications = toArray(api.applications);
  const impact = toArray(api.impact);
  const recommendations = toArray(api.recommendations);
  const cautions = toArray(api.cautions);

  const toDoc = (d: AdminInnovationDoc) => ({
    title: d.documentTitle || d.title || '',
    issuer: d.issuer || '',
    year: d.year ? String(d.year) : '',
    file: d.documentFile || d.file || '',
  });

  const allDocs: AdminInnovationDoc[] = Array.isArray(api.documents) ? api.documents : [];

  const licenses: { title: string; issuer: string; year: string; file: string }[] = allDocs
    .filter(d => !d.type || d.type === 'CERTIFICATION')
    .map(toDoc);

  const awards: { title: string; issuer: string; year: string; file: string }[] = allDocs
    .filter(d => d.type === 'AWARD')
    .map(toDoc);

  const gallery: { category: string; url: string; caption: string }[] = Array.isArray(api.media)
    ? api.media.map(m => ({ category: m.category, url: m.mediaFile || m.url || '', caption: m.caption || '' }))
    : [];

  const socials: { platform: string; link: string }[] = Array.isArray(api.socials)
    ? api.socials.filter(s => s.link && s.link.trim()).map(s => ({ platform: s.platform, link: s.link }))
    : [];

  return {
    id: api.id,
    innovation: {
      logo: api.image || '',
      name: api.innovationName || '',
      description: api.shortDescription || '',
      idTag: api.idTag || '',
      field: field,
      interests: interests,
      stage: api.stage || '',
      ownership: api.ownership || '',
      country: api.country || '',
      specification: api.specification || '',
      materials: materials,
      dimensions: dimensions,
      weight: weight,
      sdgs: sdgs,
      userGroups: userGroups,
      applications: applications,
      impact: impact,
      recommendations: recommendations,
      cautions: cautions,
      licenses: licenses,
      awards: awards,
      gallery: gallery,
    },
    submitter: api.submitter ? { name: api.submitter.name, email: api.submitter.email, avatar: api.submitter.avatar || '' } : { name: '', email: '', avatar: '' },
    user: api.user ? { fullName: api.user.fullName, phone: api.user.phone, email: api.user.email, website: api.user.website } : { fullName: '', phone: '', email: '', website: '' },
    profile: api.profile ? { username: api.profile.username, website: api.profile.website } : { username: '', website: '' },
    submittedOn: api.createdAt
      ? new Date(api.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
      : '',
    submittedTime: api.createdAt
      ? new Date(api.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      : '',
    status: mapApiStatus(api.status),
    verified: Boolean(api.isVerified ?? api.verified),
    publishedBy: api.reviewer
      ? {
        name: `${api.reviewer.firstName || ''} ${api.reviewer.lastName || ''}`.trim() || '—',
        date: api.updatedAt
          ? new Date(api.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
          : '',
        avatar: '',
      }
      : null,
    innovator: {
      name: api.user?.fullName || api.innovator?.name || '',
      username: api.profile?.username || api.innovator?.username || '',
      phone: api.user?.phone || api.innovator?.phone || '',
      altPhone: api.innovator?.altPhone || '',
      email: api.user?.email || api.innovator?.email || '',
      website: api.profile?.website || api.innovator?.website || '',
      bio: api.innovator?.bio || '',
      socialLinks: api.innovator?.socialLinks || { x: '', linkedin: '', facebook: '', instagram: '' },
    },
    socials: socials,
    reasonForRejection: api.reasonForRejection || '',
    reviewedBy: api.reviewer
      ? `${api.reviewer.firstName || ''} ${api.reviewer.lastName || ''}`.trim()
      : api.reviewedBy || '',
  };
}
