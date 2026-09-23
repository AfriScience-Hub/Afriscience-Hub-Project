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
  materialsUsed: string;
  length: number;
  width: number;
  height: number;
  dimensionUnit: string;
  weight: number;
  weightUnit: string;
  userGroups: { userGroup: string; isCustom: boolean }[];
  applications: string;
  impact: string;
  recommendations: string;
  cautions: string;
  documents: { type: string; documentTitle: string; issuer: string; year: number; documentFile: string }[];
  media: { category: string; mediaFile: string }[];
}

const OWNERSHIP: Record<string, string> = {
  Private: 'PRIVATE',
  'Government | Public': 'GOVERNMENT',
  Academic: 'ACADEMIC',
  Mission: 'MISSION',
  Corporate: 'CORPORATE',
  'Inter-Government': 'INTER_GOVERNMENT',
  'NGO | Charity': 'NGO',
  Other: 'OTHER',
};

const STAGE: Record<string, string> = {
  Ideation: 'IDEATION',
  'Research & Development': 'RESEARCH_AND_DEVELOPMENT',
  Prototype: 'PROTOTYPE',
  MVP: 'MVP',
  'Scale-Up': 'SCALE_UP',
  Commercialization: 'COMMERCIALIZATION',
};

const SDG: Record<string, string> = {
  'Good Health & Well-Being': 'Good Health & Well-being',
  'Industry, Innovation & Infrastructure': 'Industry/Innovation/Infrastructure',
};

const MEDIA: Record<string, string> = {
  'Working Materials': 'WORKING_MATERIALS',
  'Work-in-Progress': 'WORK_IN_PROGRESS',
  'Finished Work': 'FINISHED_WORK',
};

const REV = <T extends Record<string, string>>(map: T) =>
  Object.fromEntries(Object.entries(map).map(([k, v]) => [v, k])) as Record<string, string>;

export const OWNERSHIP_REV = REV(OWNERSHIP);
export const STAGE_REV = REV(STAGE);
export const SDG_REV = REV(SDG);
export const MEDIA_REV = REV(MEDIA);

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
}): InnovationPayload {
  const materials = input.innovMaterials.join(', ');
  const docs = [
    ...input.innovLicenses.map(d => ({ type: 'CERTIFICATION', documentTitle: d.title, issuer: d.issuer, year: Number(d.date) || 0, documentFile: d.file })),
    ...input.innovAwards.map(d => ({ type: 'AWARD', documentTitle: d.title, issuer: d.issuer, year: Number(d.date) || 0, documentFile: d.file })),
  ];
  return {
    image: input.profileImage || '',
    innovationName: input.name,
    country: input.country,
    shortDescription: input.bio,
    fields: input.innovFields,
    interests: input.innovInterests.map(i => i.replace(/\s*\|\s*/g, '|')),
    ownership: OWNERSHIP[input.innovOwnership] || input.innovOwnership.toUpperCase().replace(/[^A-Z]+/g, '_'),
    stage: STAGE[input.innovStage] || input.innovStage.toUpperCase().replace(/[^A-Z]+/g, '_'),
    sdgs: input.innovSdgs.map(s => SDG[s] || s),
    specification: materials || input.bio,
    materialsUsed: materials,
    length: num(input.innovDimensions.length),
    width: num(input.innovDimensions.width),
    height: num(input.innovDimensions.height),
    dimensionUnit: (input.innovDimensions.unit || 'cm').toUpperCase(),
    weight: num(input.innovWeight.value),
    weightUnit: (input.innovWeight.unit || 'kg').toUpperCase(),
    userGroups: input.innovUserGroups.map(userGroup => ({
      userGroup,
      isCustom: !INNOVATION_USER_GROUPS.includes(userGroup),
    })),
    applications: input.innovApplications.join('\n'),
    impact: input.innovImpact.join('\n'),
    recommendations: input.innovRecommendations.join('\n'),
    cautions: input.innovCautions.join('\n'),
    documents: docs,
    media: input.innovGallery.map(m => ({
      category: MEDIA[m.category] || m.category,
      mediaFile: m.name,
    })),
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
