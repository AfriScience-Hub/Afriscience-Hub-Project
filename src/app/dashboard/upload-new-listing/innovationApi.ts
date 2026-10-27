import { api } from '@/lib/api';
import { INNOVATION_USER_GROUPS } from '@/app/data/mockData';

export interface InnovationPayload {
  image: string;
  innovationName: string;
  /** false = Free Plan (single entry per category), true = annual Paid Plan. */
  payingUser: boolean;
  country: string;
  shortDescription: string;
  fields: string[];
  interests: string[];
  ownership: string;
  stage: string;
  sdgs: string[];
  specification: string;
  materialsUsed: string[];
  length: number;
  width: number;
  height: number;
  dimensionUnit: string;
  weight: number;
  weightUnit: string;
  userGroups: { userGroup: string; isCustom: boolean }[];
  applications: string[];
  impact: string[];
  recommendations: string[];
  cautions: string[];
  documents: { type: string; documentTitle: string; issuer: string; year: number; documentFile: string }[];
  media: { category: string; mediaFile: string }[];
  socials: { platform: string; link: string }[];
}

export const OWNERSHIP: Record<string, string> = {
  Private: 'PRIVATE',
  'Government | Public': 'GOVERNMENT_PUBLIC',
  Academic: 'ACADEMIC',
  Mission: 'MISSION',
  Corporate: 'CORPORATE',
  'Inter-Government': 'INTER_GOVERNMENT',
  'NGO | Charity': 'NGO_CHARITY',
  Other: 'OTHER',
};

export const STAGE: Record<string, string> = {
  Ideation: 'IDEATION',
  'Research & Development': 'RESEARCH_AND_DEVELOPMENT',
  Prototype: 'PROTOTYPE',
  MVP: 'MVP',
  'Scale-Up': 'SCALE_UP',
  Commercialization: 'COMMERCIALIZATION',
};

export const SDG: Record<string, string> = {
  'Good Health & Well-Being': 'Good Health & Well-being',
  'Industry, Innovation & Infrastructure': 'Industry/Innovation/Infrastructure',
};

export const MEDIA: Record<string, string> = {
  'Working Materials': 'WORKING_MATERIALS',
  'Work-in-Progress': 'WORK_IN_PROGRESS',
  'Finished Work': 'FINISHED_WORK',
};

export const DIMENSION_UNIT_PAYLOAD: Record<string, string> = { mm: 'MM', cm: 'CM', in: 'INCH', ft: 'FT', m: 'M' };
// The form dropdown shows "t" for tonnes but the API enum is TONNES.
export const WEIGHT_UNIT_PAYLOAD: Record<string, string> = { mg: 'MG', g: 'G', oz: 'OZ', lb: 'LB', kg: 'KG', t: 'TONNES' };

export { INNOVATION_USER_GROUPS } from '@/app/data/mockData';

const REV = <T extends Record<string, string>>(map: T) =>
  Object.fromEntries(Object.entries(map).map(([k, v]) => [v, k])) as Record<string, string>;

export const OWNERSHIP_REV = REV(OWNERSHIP);
export const STAGE_REV = REV(STAGE);
export const SDG_REV = REV(SDG);
export const MEDIA_REV = REV(MEDIA);

const S3_BUCKET_HOST = /^https?:\/\/afriscience-buckset\.s3\.[^/]+\//i;

/** Removes the public "uploads/" folder from a storage key. */
function stripUploadsPrefix(key: string): string {
  return key.replace(/^(?:uploads\/)+/i, '').replace(/^\/+/, '');
}

function decodeKey(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

/**
 * Converts a stored file value into the bare storage key the API expects.
 *
 * GET /listings/innovations returns documents/media/images as signed S3 URLs,
 * but PATCH/POST expect the storage key exactly as POST /upload returned it —
 * just the file name, with NO "uploads/" folder. The backend adds that folder
 * itself when signing display URLs, so including it here would store
 * "uploads/uploads/<file>" and every display URL would 404 upstream.
 *
 * URLs are never sent to the API: bucket URLs and ordinary /uploads/ URLs are
 * reduced to their key, and an unrecognised URL falls back to its last path
 * segment so the 255-character field limit cannot be breached.
 */
export function toStorageKey(value?: string | null): string {
  if (!value) return '';
  let v = value.trim();
  if (!v) return '';

  // Some API clients return a URL-encoded URL (https%3A%2F%2F...).
  if (!/^https?:\/\//i.test(v) && /^https?%3A%2F%2F/i.test(v)) {
    v = decodeKey(v);
  }

  // Already a bare storage key — remove the public uploads folder if present.
  if (!/^https?:\/\//i.test(v)) return stripUploadsPrefix(v);

  const path = v.split(/[?#]/)[0];

  // Legacy malformed form: "https://uploads/<key>".
  const legacy = path.match(/^https?:\/\/uploads\/(.+)$/i);
  if (legacy) return stripUploadsPrefix(decodeKey(legacy[1]));

  // Our private S3 bucket: everything after the host is the key.
  if (S3_BUCKET_HOST.test(path)) {
    return stripUploadsPrefix(decodeKey(path.replace(S3_BUCKET_HOST, '')));
  }

  // Any other URL that exposes the uploads folder.
  const uploads = path.match(/\/uploads\/(.+)$/i);
  if (uploads) return stripUploadsPrefix(decodeKey(uploads[1]));

  // Unknown host: never send a URL where the API expects a key. Use the last
  // path segment as a best-effort key.
  try {
    const segments = new URL(path).pathname.split('/').filter(Boolean);
    return stripUploadsPrefix(decodeKey(segments.pop() || ''));
  } catch {
    return stripUploadsPrefix(decodeKey(path));
  }
}

function num(v: string) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

export function buildInnovationPayload(input: {
  name: string; profileImage: string | null; payingUser: boolean; country: string; bio: string;
  innovFields: string[]; innovInterests: string[]; innovOwnership: string; innovStage: string;
  innovSdgs: string[]; innovMaterials: string[];
  innovDimensions: { length: string; width: string; height: string; unit: string };
  innovWeight: { value: string; unit: string };
  innovUserGroups: string[]; innovApplications: string[]; innovImpact: string[];
  innovRecommendations: string[]; innovCautions: string[];
  innovLicenses: { title: string; issuer: string; date: string; file: string }[];
  innovAwards: { title: string; issuer: string; date: string; file: string }[];
  innovGallery: { category: string; name: string }[];
  socialHandles: { name: string; link: string }[];
  /**
   * The user groups the user can pick from the options list. Anything else
   * the user typed is sent with `isCustom: true`.
   */
  knownUserGroups?: string[];
}): InnovationPayload {
  const docs = [
    ...input.innovLicenses.map(d => ({ type: 'CERTIFICATION', documentTitle: d.title, issuer: d.issuer, year: Number(d.date) || 0, documentFile: toStorageKey(d.file) })),
    ...input.innovAwards.map(d => ({ type: 'AWARD', documentTitle: d.title, issuer: d.issuer, year: Number(d.date) || 0, documentFile: toStorageKey(d.file) })),
  ];
  return {
    // The API stores keys, not URLs — normalize every file field (signed URLs
    // coming back from an edit prefill would otherwise be re-submitted as-is).
    image: toStorageKey(input.profileImage),
    innovationName: input.name,
    payingUser: input.payingUser,
    country: input.country,
    shortDescription: input.bio,
    fields: input.innovFields,
    interests: input.innovInterests.map(i => i.replace(/\s*\|\s*/g, '|')),
    ownership: OWNERSHIP[input.innovOwnership] || input.innovOwnership.toUpperCase().replace(/[^A-Z]+/g, '_'),
    stage: STAGE[input.innovStage] || input.innovStage.toUpperCase().replace(/[^A-Z]+/g, '_'),
    sdgs: input.innovSdgs.map(s => SDG[s] || s),
    specification: input.innovMaterials.join(', ') || input.bio,
    materialsUsed: input.innovMaterials,
    length: num(input.innovDimensions.length),
    width: num(input.innovDimensions.width),
    height: num(input.innovDimensions.height),
    dimensionUnit: DIMENSION_UNIT_PAYLOAD[input.innovDimensions.unit] || input.innovDimensions.unit.toUpperCase(),
    weight: num(input.innovWeight.value),
    weightUnit: WEIGHT_UNIT_PAYLOAD[(input.innovWeight.unit || 'kg').toLowerCase()] || 'KG',
    userGroups: input.innovUserGroups.map(userGroup => ({
      userGroup,
      isCustom: !(input.knownUserGroups ?? INNOVATION_USER_GROUPS).includes(userGroup),
    })),
    applications: input.innovApplications,
    impact: input.innovImpact,
    recommendations: input.innovRecommendations,
    cautions: input.innovCautions,
    documents: docs,
    media: input.innovGallery.map(m => ({
      category: MEDIA[m.category] || m.category,
      mediaFile: toStorageKey(m.name),
    })),
    socials: input.socialHandles
      .map(s => ({ platform: s.name.trim(), link: s.link.trim() }))
      .filter(s => s.platform && s.link),
  };
}

function unwrapData(r: any) {
  return r?.data ?? r;
}

export async function createInnovation(body: InnovationPayload) {
  const r = await api.post('/listings/innovations', body as unknown as Record<string, unknown>);
  return unwrapData(r);
}

export async function updateInnovation(id: string, body: InnovationPayload) {
  const r = await api.patch(`/listings/innovations/${id}`, body as unknown as Record<string, unknown>);
  return unwrapData(r);
}

export async function fetchInnovations() {
  const r: any = await api.get('/listings/innovations');
  const data = unwrapData(r);
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.innovations)) return data.innovations;
  if (Array.isArray(data?.listings)) return data.listings;
  if (Array.isArray(r)) return r;
  return [];
}

export async function fetchInnovation(id: string) {
  const r: any = await api.get(`/listings/innovations/${id}`);
  return unwrapData(r);
}

/** Creates a new Afro-Innovation draft (the form can be incomplete). */
export async function createInnovationDraft(body: InnovationPayload) {
  const r = await api.post('/listings/innovations/drafts', body as unknown as Record<string, unknown>);
  return unwrapData(r);
}

/** Updates an existing draft. */
export async function updateInnovationDraft(id: string, body: InnovationPayload) {
  const r = await api.patch(`/listings/innovations/${id}`, body as unknown as Record<string, unknown>);
  return unwrapData(r);
}

/** Promotes a saved draft to a listing and sends it for review. */
export async function submitInnovationDraft(id: string, body: InnovationPayload) {
  const r = await api.post(`/listings/innovations/${id}/submit`, body as unknown as Record<string, unknown>);
  return unwrapData(r);
}

/** Lists the current user's listing drafts. */
export async function fetchInnovationDrafts() {
  const r: any = await api.get('/listings/innovations?status=DRAFT');
  const data = unwrapData(r);
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.innovations)) return data.innovations;
  if (Array.isArray(data?.listings)) return data.listings;
  if (Array.isArray(r)) return r;
  return [];
}

/** Deletes an innovation (used for drafts from the drafts list). */
export async function deleteInnovation(id: string) {
  const r = await api.delete(`/listings/innovations/${id}`);
  return unwrapData(r);
}