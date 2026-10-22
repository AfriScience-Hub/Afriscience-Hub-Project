import { api } from '@/lib/api';

/**
 * The API stores competition types, categories and media types as enums, while
 * the form works with readable labels. These maps convert between the two.
 */
export const COMPETITION_TYPE_API: Record<string, string> = {
  'Afri-Anime': 'AFRI_ANIME',
  'Afri-Presentations': 'AFRI_PRESENTATION',
  'Afri-Memes': 'AFRI_MEMES',
  'Afri-MySpace': 'AFRI_MYSPACE',
};

export const CATEGORY_API: Record<string, string> = {
  'General (18+)': 'GENERAL_18_PLUS',
  'Lower Primary': 'LOWER_PRIMARY',
  'Upper Primary': 'UPPER_PRIMARY',
  'Junior Secondary': 'JUNIOR_SECONDARY',
  'Senior Secondary': 'SENIOR_SECONDARY',
  'Undergraduates': 'UNDERGRADUATES',
  'Graduates': 'GRADUATES',
};

export const MEDIA_TYPE_API: Record<string, string> = {
  'Image': 'IMAGE',
  'Video': 'VIDEO',
  'Audio': 'AUDIO',
  'Document': 'DOCUMENT',
};

export interface CreateCompetitionPayload {
  /** Storage key of the uploaded cover image. */
  displayImage?: string;
  type: string;
  country: string;
  category: string;
  year: number;
  fee: number;
  startDate: string;
  submissionDeadline: string;
  votingDeadline: string;
  about: { shortDescription: string; description: string };
  requirements: { content: string }[];
  rules: { content: string }[];
  screening: { content: string }[];
  prizes: { amount: number; description: string }[];
  mediaSettings: {
    allowedMediaTypes: string[];
    maxFiles: number;
    maxFileSizeMB: number;
  };
  scoringCriteria: { name: string; weight: number }[];
}

/**
 * POST /api/v1/admin/competitions
 *
 * Creates the competition as a DRAFT (`status: "DRAFT"`). This is the "save as
 * draft" call, and it is also the first half of publishing: the returned
 * `data.id` is what `/publish` is called with.
 */
export async function createCompetitionDraft(body: CreateCompetitionPayload) {
  const r: any = await api.post('/admin/competitions', body as unknown as Record<string, unknown>);
  return r?.data ?? r;
}

/** POST /api/v1/admin/competitions/{id}/publish — moves a draft to live. */
export async function publishCompetition(id: string) {
  const r: any = await api.post(`/admin/competitions/${id}/publish`);
  return r?.data ?? r;
}

/** PUT /api/v1/admin/competitions/{id}/about */
export async function updateCompetitionAbout(id: string, body: { shortDescription: string; description: string }) {
  const r: any = await api.put(`/admin/competitions/${id}/about`, body as unknown as Record<string, unknown>);
  return r?.data ?? r;
}

/** PUT /api/v1/admin/competitions/{id}/requirements */
export async function updateCompetitionRequirements(id: string, body: { requirements: { content: string; order: number }[] }) {
  const r: any = await api.put(`/admin/competitions/${id}/requirements`, body as unknown as Record<string, unknown>);
  return r?.data ?? r;
}

/** PUT /api/v1/admin/competitions/{id}/rules */
export async function updateCompetitionRules(id: string, body: { rules: { content: string; order: number }[] }) {
  const r: any = await api.put(`/admin/competitions/${id}/rules`, body as unknown as Record<string, unknown>);
  return r?.data ?? r;
}

/** PUT /api/v1/admin/competitions/{id}/screening */
export async function updateCompetitionScreening(id: string, body: { screeningItems: { content: string; order: number }[] }) {
  const r: any = await api.put(`/admin/competitions/${id}/screening`, body as unknown as Record<string, unknown>);
  return r?.data ?? r;
}

/** PUT /api/v1/admin/competitions/{id}/prizes */
export async function updateCompetitionPrizes(id: string, body: { prizes: { position: number; amount: number; description: string }[] }) {
  const r: any = await api.put(`/admin/competitions/${id}/prizes`, body as unknown as Record<string, unknown>);
  return r?.data ?? r;
}

/** PUT /api/v1/admin/competitions/{id}/media-settings */
export async function updateCompetitionMediaSettings(id: string, body: {
  allowedMediaTypes: string[];
  maxFiles: number;
  maxFileSizeMB: number;
  maxVideoDurationSeconds?: number;
}) {
  const r: any = await api.put(`/admin/competitions/${id}/media-settings`, body as unknown as Record<string, unknown>);
  return r?.data ?? r;
}

/** PUT /api/v1/admin/competitions/{id}/scoring-criteria */
export async function updateCompetitionScoringCriteria(id: string, body: {
  criteria: { name: string; description?: string; weight: number; order: number }[];
}) {
  const r: any = await api.put(`/admin/competitions/${id}/scoring-criteria`, body as unknown as Record<string, unknown>);
  return r?.data ?? r;
}
