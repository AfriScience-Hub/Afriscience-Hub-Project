import { api } from '@/lib/api';
import { INNOVATION_USER_GROUPS } from '@/app/data/mockData';

export interface InnovationPayload {
  image: string;
  innovationName: string;
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

/**
 * Converts a stored file value into the bare storage key the API expects.
 *
 * GET /listings/innovations returns documents/media/images as signed S3 URLs,
 * but PATCH/POST expect the storage key exactly as POST /upload returned it —
 * just the file name, with NO "uploads/" folder. The backend adds that folder
 * itself when signing display URLs, so including it here would store
 * "uploads/uploads/<file>" and every display URL would 404 upstream.
 * Bare keys pass through untouched; external non-bucket URLs are unchanged.
 */
export function toStorageKey(value?: string | null): string {
  if (!value) return '';
  const v = value.trim();
  if (!v) return '';
  // Already a bare storage key — send it exactly as-is.
  if (!/^https?:\/\//i.test(v)) return v.replace(/^\/+/, '');
  // Signed/unsigned URL (incl. the legacy malformed "https://uploads/..." form):
  // the key is only the file path after the "/uploads/" folder.
  const path = v.split(/[?#]/)[0];
  const match = path.match(/\/uploads\/(.+)$/i);
  if (match) return match[1];
  // Not one of our bucket files (e.g. an external link) — leave it as-is.
  return v;
}

function num(v: string) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

export function buildInnovationPayload(input: {
  name: string; profileImage: string | null; country: string; bio: string;
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
  if (Array.isArray(data?.innovations)) return data.innovations;
  if (Array.isArray(data?.listings)) return data.listings;
  if (Array.isArray(r)) return r;
  return [];
}

export async function fetchInnovation(id: string) {
  const r: any = await api.get(`/listings/innovations/${id}`);
  return unwrapData(r);
}