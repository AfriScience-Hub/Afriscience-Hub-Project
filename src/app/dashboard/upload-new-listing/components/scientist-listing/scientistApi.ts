import { api } from '@/lib/api';
import { toStorageKey } from '../afro-innovation-listing/innovationApi';

/**
 * Scientist / Technologist listing API.
 *
 * Endpoints:
 *   POST   /scientists/listing                         create draft
 *   POST   /scientists/listings/{id}/submit           submit for review
 *   GET    /scientists/listings                       my listings
 *   GET    /scientists/listings/{id}                  one listing
 *   PATCH  /scientists/listings/{id}                  update listing
 *   POST   /scientists/listings/{id}/upgrade          upgrade to Pro
 *
 * The listing price is resolved from the managed scientist price table. The
 * resolve endpoint is not part of the form endpoints, so it is isolated in
 * `fetchScientistPrice` below and can be swapped without touching the form.
 */

export interface ScientistServiceCost {
  serviceOptionId: string;
  description: string;
  minCost: number;
  maxCost: number;
}

export interface ScientistOtherCost {
  name: string;
  description: string;
  amount: number;
}

export interface ScientistDegreeEntry {
  degreeId: string;
  document: string;
}

export interface ScientistCertificate {
  name: string;
  issuer: string;
  year: string;
  document: string;
}

export interface ScientistAchievement {
  name: string;
  issuer: string;
  year: string;
  document: string;
}

export interface ScientistHighlights {
  responseTime: string;
  workDays: string[];
  startHours: string;
  endHours: string;
}

export interface ScientistPayload {
  name: string;
  bio: string;
  country: string;
  state: string;
  profileImage: string;
  backgroundImage: string;
  professionIds: string[];
  services: string[];
  serviceCosts: ScientistServiceCost[];
  otherCosts: ScientistOtherCost[];
  degrees: ScientistDegreeEntry[];
  scopes: string[];
  policies: string[];
  certificates: ScientistCertificate[];
  achievements: ScientistAchievement[];
  media: string[];
  socials: { platform: string; link: string }[];
  highlights: ScientistHighlights;
}

function unwrapData(r: any) {
  return r?.data ?? r;
}

function listFrom(response: unknown): any[] {
  const payload = (response as { data?: unknown })?.data ?? response;
  const root = payload as Record<string, unknown> | undefined;
  if (Array.isArray(payload)) return payload;
  const candidates = ['data', 'listings', 'scientists', 'items', 'results'];
  for (const key of candidates) {
    if (Array.isArray(root?.[key])) return root[key] as any[];
  }
  return [];
}

function num(value: string | number | undefined | null): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

/** Reads the first time range ("9:00 AM – 5:00 PM" or "09:00 – 17:00") into 24h values. */
export function parseWorkHours(range?: string): { startHours: string; endHours: string } {
  if (!range) return { startHours: '', endHours: '' };
  const matches = [...range.matchAll(/(\d{1,2}):(\d{2})\s*(AM|PM)?/gi)];
  const timed = matches.filter((match) => match[3] || Number(match[1]) <= 23);
  if (timed.length < 2) return { startHours: '', endHours: '' };
  const to24 = (match: RegExpMatchArray) => {
    let hour = Number(match[1]);
    const suffix = (match[3] || '').toUpperCase();
    if (suffix) {
      hour %= 12;
      if (suffix === 'PM') hour += 12;
    }
    return `${String(hour).padStart(2, '0')}:${match[2]}`;
  };
  return { startHours: to24(timed[0]), endHours: to24(timed[1]) };
}

/** Converts 24h "09:00" values back into the readable range used by the form. */
export function formatWorkHours(start?: string, end?: string): string {
  if (!start || !end) return '';
  const format = (value: string) => {
    const [hourString, minute = '00'] = value.split(':');
    const hour = Number(hourString);
    const suffix = hour >= 12 ? 'PM' : 'AM';
    return `${hour % 12 || 12}:${minute} ${suffix}`;
  };
  return `${format(start)} – ${format(end)}`;
}

export interface BuildScientistPayloadInput {
  name: string;
  bio: string;
  country: string;
  state: string;
  profileImage: string | null;
  backgroundImage: string | null;
  professionNames: string[];
  professionOther: string;
  serviceNames: string[];
  degreeName: string;
  degreeCertificate: string;
  /** name -> { description, minCost, maxCost } */
  serviceCosts: Record<string, { description: string; minCost: string; maxCost: string }>;
  otherCosts: { name: string; description: string; minCost: string; maxCost: string }[];
  scopes: string[];
  policies: string[];
  certificates: { name: string; issuer: string; year: string; document: string }[];
  achievements: { name: string; issuer: string; year: string; document: string }[];
  media: string[];
  socials: Record<string, string>;
  highlights: { responseTime: string; workDays: string[]; workHours: string[] };
  /** Lookup lists from `useScientistOptions`. */
  professions: { id: string; name: string }[];
  services: { id: string; name: string }[];
  degrees: { id: string; name: string }[];
}

export function buildScientistPayload(input: BuildScientistPayloadInput): ScientistPayload {
  const professionByName = new Map(input.professions.map((p) => [p.name.toLowerCase(), p.id]));
  const professionIds = input.professionNames
    .map((name) => {
      if (name === 'Other') {
        const other = input.professionOther.trim().toLowerCase();
        return other ? professionByName.get(other) : undefined;
      }
      return professionByName.get(name.toLowerCase());
    })
    .filter((id): id is string => Boolean(id));

  const serviceByName = new Map(input.services.map((s) => [s.name.toLowerCase(), s.id]));
  const serviceIds = input.serviceNames
    .map((name) => serviceByName.get(name.toLowerCase()))
    .filter((id): id is string => Boolean(id));

  const degree = input.degrees.find((d) => d.name.toLowerCase() === input.degreeName.toLowerCase());

  const hours = input.highlights.workHours[0];
  const { startHours, endHours } = parseWorkHours(hours);

  return {
    name: input.name.trim(),
    bio: input.bio.trim(),
    country: input.country,
    state: input.state,
    profileImage: toStorageKey(input.profileImage),
    backgroundImage: toStorageKey(input.backgroundImage),
    professionIds,
    services: serviceIds,
    serviceCosts: input.serviceNames
      .map((name) => {
        const cost = input.serviceCosts[name];
        return {
          serviceOptionId: serviceByName.get(name.toLowerCase()) || '',
          description: cost?.description?.trim() || '',
          minCost: num(cost?.minCost),
          maxCost: num(cost?.maxCost),
        };
      })
      .filter((cost) => cost.serviceOptionId),
    otherCosts: input.otherCosts
      .filter((cost) => cost.name.trim())
      .map((cost) => ({
        name: cost.name.trim(),
        description: cost.description.trim(),
        amount: num(cost.maxCost || cost.minCost),
      })),
    degrees: degree
      ? [{ degreeId: degree.id, document: toStorageKey(input.degreeCertificate) }]
      : [],
    scopes: input.scopes.map((s) => s.trim()).filter(Boolean),
    policies: input.policies.map((p) => p.trim()).filter(Boolean),
    certificates: input.certificates
      .filter((c) => c.name.trim())
      .map((c) => ({
        name: c.name.trim(),
        issuer: c.issuer.trim(),
        year: String(c.year || ''),
        document: toStorageKey(c.document),
      })),
    achievements: input.achievements
      .filter((a) => a.name.trim())
      .map((a) => ({
        name: a.name.trim(),
        issuer: a.issuer.trim(),
        year: String(a.year || ''),
        document: toStorageKey(a.document),
      })),
    media: input.media.map((m) => toStorageKey(m)).filter(Boolean),
    socials: Object.entries(input.socials)
      .map(([platform, link]) => ({ platform, link: link.trim() }))
      .filter((s) => s.link),
    highlights: {
      responseTime: input.highlights.responseTime,
      workDays: input.highlights.workDays,
      startHours,
      endHours,
    },
  };
}

/** Creates a scientist listing draft (the form may be incomplete). */
export async function createScientistDraft(body: ScientistPayload) {
  const r = await api.post('/scientists/listings', body as unknown as Record<string, unknown>);
  return unwrapData(r);
}

/** Updates an existing scientist listing or draft. */
export async function updateScientistListing(id: string, body: ScientistPayload) {
  const r = await api.patch(`/scientists/listings/${id}`, body as unknown as Record<string, unknown>);
  return unwrapData(r);
}

/** Submits a scientist listing for review. */
export async function submitScientistListing(id: string, payingUser: boolean) {
  const r = await api.post(`/scientists/listings/${id}/submit`, { payingUser });
  return unwrapData(r);
}

/** Upgrades an existing scientist listing to the Pro plan. */
export async function upgradeScientistListing(id: string) {
  const r = await api.post(`/scientists/listings/${id}/upgrade`);
  return unwrapData(r);
}

export async function fetchScientistListings(): Promise<any[]> {
  const r = await api.get('/scientists/listings');
  return listFrom(r);
}

export async function fetchScientistListing(id: string): Promise<any> {
  const r = await api.get(`/scientists/listings/${id}`);
  return unwrapData(r);
}

/** Lists the current user's scientist drafts (filtered from the listings call). */
export async function fetchScientistDrafts(): Promise<any[]> {
  const r = await api.get('/scientists/listings');
  return listFrom(r).filter((draft) => {
    if (!draft?.status) return true;
    return String(draft.status).trim().toUpperCase() === 'DRAFT';
  });
}

/** Best-effort delete for scientist drafts. */
export async function deleteScientistDraft(id: string) {
  const r = await api.delete(`/scientists/listings/${id}`);
  return unwrapData(r);
}

export interface ScientistPriceQuote {
  /** Raw price in the smallest unit (display with formatPrice). */
  price: string;
  /** Raw additional charge in the smallest unit. */
  extraCharge: string;
  location?: string;
  type?: string;
}

function priceValue(record: Record<string, unknown>): string {
  const raw = record.amountMinor ?? record.price ?? record.amount ?? record.amountMinorUnits;
  if (raw == null || raw === '') return '';
  return String(raw);
}

function extraValue(record: Record<string, unknown>): string {
  const raw =
    record.extraChargeMinor ??
    record.extra_charge_minor ??
    record.extraCharge ??
    record.extra_charge ??
    record.additionalCharge;
  return raw == null ? '' : String(raw);
}

/**
 * Resolves the listing price for a scientist with the given number of
 * professions. The resolve endpoint is the only price source used by the
 * listing form; predictions never hard-code amounts.
 */
export async function fetchScientistPrice(
  professionCount: number,
  match?: { location?: string; type?: string },
): Promise<ScientistPriceQuote | null> {
  const count = Math.max(1, professionCount);
  const r: any = await api.get(`/scientists/prices/resolve?professionCount=${count}`);
  const data = unwrapData(r);
  const records = Array.isArray(data) ? data : listFrom(data);
  const list = records.length ? records : data && typeof data === 'object' ? [data] : [];
  if (!list.length) return null;

  const normalize = (value: unknown) => String(value ?? '').toUpperCase().replace(/[^A-Z]/g, '');
  const location = match?.location ? normalize(match.location) : '';
  const type = match?.type ? normalize(match.type) : '';

  const scored = list
    .map((item: any) => {
      const record = (item ?? {}) as Record<string, unknown>;
      const itemLocation = normalize(record.location);
      const itemType = normalize(record.type);
      let score = 0;
      if (location && itemLocation === location) score += 2;
      if (type && itemType === type) score += 1;
      return { record, score };
    })
    .sort((a, b) => b.score - a.score);

  const best = scored[0]?.record;
  if (!best) return null;
  return {
    price: priceValue(best),
    extraCharge: extraValue(best),
    location: typeof best.location === 'string' ? best.location : undefined,
    type: typeof best.type === 'string' ? best.type : undefined,
  };
}
