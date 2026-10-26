import { api } from '@/lib/api';
import { normalizeFileSrc } from '@/lib/files';

export interface VisitorInnovationFilters {
  field?: string;
  interests?: string[];
  sdgs?: string[];
  stage?: string;
  ownership?: string;
  country?: string;
  page?: number;
}

export interface VisitorInnovationResponse {
  data: any[];
  pagination: any;
}

/**
 * GET /api/v1/listings/innovations/list/visitors?fields=...&interests=...&sdgs=...&stage=...&ownership=...&country=...&page=1&limit=10
 * Returns approved innovations for visitors, filtered by the given params.
 */
export async function fetchVisitorInnovations(filters: VisitorInnovationFilters = {}): Promise<VisitorInnovationResponse> {
  const params = new URLSearchParams();
  if (filters.field) params.set('fields', filters.field);
  if (filters.interests?.length) params.set('interests', filters.interests.join('|'));
  if (filters.sdgs?.length) params.set('sdgs', filters.sdgs.join('|'));
  if (filters.stage) params.set('stage', filters.stage);
  if (filters.ownership) params.set('ownership', filters.ownership);
  if (filters.country) params.set('country', filters.country);
  if (filters.page) params.set('page', String(filters.page));

  const endpoint = `/listings/innovations/list/visitors?${params.toString()}`;
  const r: any = await api.get(endpoint);
  const data = r?.data ?? r;
  return {
    data: Array.isArray(data) ? data : (data?.data ?? []),
    pagination: data?.pagination ?? r?.pagination ?? null,
  };
}

/**
 * GET /api/v1/listings/innovations?status=APPROVED
 * Returns every approved innovation (no pagination params required).
 */
export async function fetchApprovedInnovations(): Promise<any[]> {
  const r: any = await api.get('/listings/innovations?status=APPROVED');
  const data = r?.data ?? r;
  return Array.isArray(data) ? data : (data?.data ?? []);
}

/**
 * GET /api/v1/listings/innovations/list/visitors/{id}
 * Returns a single innovation for the visitor detail page.
 */
export async function fetchVisitorInnovationById(id: string): Promise<any> {
  const r: any = await api.get(`/listings/innovations/list/visitors/${id}`);
  const data = r?.data ?? r;
  return data;
}

/** Shown when an innovation has no usable image, so the card never breaks. */
const IMAGE_FALLBACK = 'https://placehold.co/1080x720/0f172a/94a3b8/png?text=Innovation';

/**
 * Normalises a value that may arrive as a plain string, a delimited string,
 * a single object, an array of strings or an array of objects into a list of
 * display strings.
 *
 * `keys` lists the object properties to try, in order of preference, so the
 * same helper works for `field`, `interest`, `sdg`, `userGroup`, `stage`, etc.
 */
function toList(value: unknown, keys: string[]): string[] {
  if (value == null) return [];

  const fromObject = (obj: Record<string, unknown>): string => {
    for (const key of keys) {
      const v = obj[key];
      if (typeof v === 'string' && v.trim()) return v.trim();
      if (v != null && typeof v !== 'object') return String(v);
    }
    return '';
  };

  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (item == null) return '';
        if (typeof item === 'string') return item.trim();
        if (typeof item === 'object') return fromObject(item as Record<string, unknown>);
        return String(item);
      })
      .filter(Boolean);
  }

  if (typeof value === 'string') {
    return value.split(/[|,\n]/).map((s) => s.trim()).filter(Boolean);
  }

  if (typeof value === 'object') {
    const single = fromObject(value as Record<string, unknown>);
    return single ? [single] : [];
  }

  return [];
}

/** Maps a raw visitor-listing record into the card's Innovation shape. */
export function mapVisitorInnovation(raw: any): any {
  const splitLines = (v: unknown) => (v ? String(v).split('\n').filter(Boolean) : []);
  const splitPipe = (v: unknown) => (v ? String(v).split('|').filter(Boolean) : []);
  const splitComma = (v: unknown) => (v ? String(v).split(', ').filter(Boolean) : []);

  // Fields arrive as an array of objects ({ field: 'Medical' }); the API also
  // exposes a couple of legacy aliases, so every shape is accepted.
  const fieldList = toList(
    raw.fields ?? raw.field ?? raw.category ?? raw.sector ?? raw.industry
      ?? raw.profile?.fields ?? raw.profile?.field ?? raw.profile?.category,
    ['field', 'name', 'title', 'value', 'label'],
  );
  const interestList = toList(raw.interests, ['interest', 'name', 'title', 'value', 'label']);
  const sdgList = toList(raw.sdgs, ['sdg', 'name', 'title', 'value', 'label', 'goal']);
  const userGroupList = toList(raw.userGroups, ['userGroup', 'group', 'name', 'title', 'value', 'label']);
  const stageList = toList(raw.stage, ['stage', 'name', 'title', 'value', 'label']);
  const ownershipList = toList(raw.ownership, ['ownership', 'name', 'title', 'value', 'label']);

  // --- Media gallery -------------------------------------------------------
  // The API returns a flat `media` array; each item carries a category and a
  // file. We bucket them into the three gallery tabs the design expects.
  const MEDIA_CATEGORIES = ['Working Materials', 'Work in Progress', 'Finished Work'];
  const normalizeCat = (v: unknown) => String(v ?? '').toLowerCase().replace(/[^a-z]/g, '');

  const mediaItems = Array.isArray(raw.media) ? raw.media : [];
  const buckets = new Map<string, { type: 'image' | 'video'; url: string; caption: string }[]>();
  MEDIA_CATEGORIES.forEach(cat => buckets.set(normalizeCat(cat), []));

  mediaItems.forEach((m: any) => {
    const file = m?.mediaFile || m?.file || m?.url || m?.image || '';
    const url = normalizeFileSrc(file) || '';
    if (!url) return;
    const isVideo = m?.type === 'video' || /\.(mp4|webm|mov|avi|m4v)$/i.test(String(file));
    const item = {
      type: (isVideo ? 'video' : 'image') as 'image' | 'video',
      url,
      caption: m?.caption || m?.mediaCaption || m?.title || m?.name || '',
    };
    const key = normalizeCat(m?.category);
    const target = buckets.has(key) ? key : normalizeCat(MEDIA_CATEGORIES[0]);
    buckets.get(target)!.push(item);
  });

  const mediaGallery = MEDIA_CATEGORIES.map(cat => ({
    category: cat,
    items: buckets.get(normalizeCat(cat))!,
  }));

  // --- Documents (licenses/certifications + honorary awards) ---------------
  const documents = Array.isArray(raw.documents) ? raw.documents : [];

  const licensesCertifications = documents
    .filter((d: any) => !d?.type || d.type === 'CERTIFICATION')
    .map((d: any) => ({
      name: d?.documentTitle || d?.title || '',
      issuer: d?.issuer || '',
      year: d?.year ? Number(d.year) : '',
      file: normalizeFileSrc(d?.documentFile || d?.file) || '',
    }));

  const honoraryAwards = documents
    .filter((d: any) => d?.type === 'AWARD')
    .map((d: any) => ({
      title: d?.documentTitle || d?.title || '',
      year: d?.year ? Number(d.year) : '',
      organization: d?.issuer || '',
      image: normalizeFileSrc(d?.documentFile || d?.file) || '',
    }));

  return {
    id: raw.id || raw._id || '',
    name: raw.innovationName || raw.name || '',
    idTag: raw.idTag || '',
    field: fieldList,
    interests: interestList,
    ownership: ownershipList.join(', '),
    stage: stageList.join(', '),
    sdgs: sdgList,
    image: normalizeFileSrc(raw.image || raw.displayPhoto || raw.profileImage || raw.avatar || raw.photo) || IMAGE_FALLBACK,
    status: 'Online',
    verified: Boolean(raw.isVerified ?? raw.verified),
    country: raw.country || '',
    state: raw.state || '',
    location: raw.location || raw.country || '',
    description: raw.shortDescription || raw.description || '',
    createdAt: raw.createdAt || raw.created_at || null,
    dimensions: {
      length: String(raw.length || ''),
      width: String(raw.width || ''),
      height: String(raw.height || ''),
      weight: String(raw.weight || ''),
    },
    userGroups: userGroupList,
    applications: splitLines(raw.applications),
    impact: splitLines(raw.impact),
    specifications: {
      materials: splitComma(raw.materialsUsed),
      dimensions: `${raw.length || ''} X ${raw.width || ''} X ${raw.height || ''} ${raw.dimensionUnit || ''}`.trim(),
      weight: `${raw.weight || ''}${raw.weightUnit ? raw.weightUnit.toLowerCase() : ''}`.trim(),
    },
    licensesCertifications,
    recommendations: splitLines(raw.recommendations),
    cautions: splitLines(raw.cautions),
    honoraryAwards,
    mediaGallery,
    views: Number(raw.views || 0),
    likes: Number(raw.likes || 0),
    favorites: Number(raw.favorites || 0),
    shares: Number(raw.shares || 0),
    creator: raw.creator || raw.submitterName || raw.user?.fullName || raw.fullName || '',
    creatorUsername: raw.profile?.username || raw.username || '',
    creatorImage: raw.creatorImage || raw.user?.avatar || raw.avatar || '',
    creatorBio: raw.creatorBio || raw.bio || '',
    creatorSpecializations: [],
    creatorExperience: '',
    creatorAffiliation: '',
  };
}
