import { api } from '@/lib/api';
import { normalizeFileSrc } from '@/lib/files';
import { formatAmountDisplay } from '@/lib/amounts';
import { fetchScientistOptions, fetchScientistProfessions } from '@/app/data/scientistOptions';

/**
 * Public (visitor) scientist & technologist API.
 *
 *   GET /scientists/listings/public        → every approved public listing
 *   GET /scientists/listings/public/{id}   → one public listing
 *
 * Filters come from the shared option endpoints:
 *   GET /scientists/options/{FIELD|DEGREE|SERVICE}
 *   GET /scientists/professions
 */

export interface PublicScientistContact {
  phone: string;
  email: string;
  website: string;
  linkedin: string;
  twitter: string;
  instagram: string;
  facebook: string;
}

export interface PublicScientist {
  id: string;
  createdAt: string;
  name: string;
  title: string;
  field: string;
  fields: string[];
  professions: string[];
  degrees: string[];
  services: string[];
  scopes: string[];
  policies: string[];
  certifications: { name: string; issuer: string; year: string }[];
  achievements: { title: string; description: string }[];
  serviceCost: { service: string; range: string }[];
  otherFees: { name: string; amount: string }[];
  gallery: string[];
  bio: string;
  image: string;
  backgroundImage: string;
  location: string;
  country: string;
  state: string;
  status: string;
  verified: boolean;
  rating: number;
  reviews: number;
  views: number;
  likes: number;
  favorites: number;
  shares: number;
  bookingsCount: number;
  responseTime: string;
  availability: { workDays: string; time: string };
  contact: PublicScientistContact;
  testimonials: unknown[];
}

type Entity = Record<string, unknown>;

const FALLBACK_IMAGE = 'https://placehold.co/960x640/0f172a/94a3b8/png?text=Scientist';

function asEntity(value: unknown): Entity | null {
  return value && typeof value === 'object' && !Array.isArray(value) ? (value as Entity) : null;
}

function text(value: unknown): string {
  return typeof value === 'string' ? value : value == null ? '' : String(value);
}

function pick(item: unknown, keys: string[]): string {
  if (typeof item === 'string') return item.trim();
  const record = asEntity(item);
  if (!record) return '';
  for (const key of keys) {
    const value = record[key];
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return '';
}

function stringList(value: unknown, keys: string[]): string[] {
  if (Array.isArray(value)) {
    return value
      .map((entry) => (typeof entry === 'string' ? entry.trim() : pick(entry, keys)))
      .filter(Boolean);
  }
  if (typeof value === 'string') {
    return value.split(/\r?\n|,\s*/).map((entry) => entry.trim()).filter(Boolean);
  }
  return [];
}

/** Reads the display name of one list entry, including nested objects. */
function entryName(entry: unknown, nestedKeys: string[]): string {
  if (typeof entry === 'string') return entry.trim();
  const record = asEntity(entry);
  if (!record) return '';
  for (const key of nestedKeys) {
    const value = record[key];
    const nested = asEntity(value);
    if (nested) {
      const name = pick(nested, ['name', 'title', 'label', 'value']);
      if (name) return name;
    }
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return pick(record, ['name', 'title', 'label', 'value', 'field', 'profession', 'degree', 'service', 'role']);
}

/**
 * Flattens relation lists such as:
 *   professions: [{ profession: { name: "Thoracic Surgeon" } }]
 *   fields:      [{ field: { name: "Medical" } }]
 * into plain display names.
 */
function namedList(value: unknown, nestedKeys: string[]): string[] {
  if (Array.isArray(value)) {
    return value.map((entry) => entryName(entry, nestedKeys)).filter(Boolean);
  }
  if (typeof value === 'string') {
    return value.split(/\r?\n|,\s*/).map((entry) => entry.trim()).filter(Boolean);
  }
  const single = entryName(value, nestedKeys);
  return single ? [single] : [];
}

function extractList(response: unknown): Entity[] {
  const payload = (response as { data?: unknown })?.data ?? response;
  if (Array.isArray(payload)) return payload as Entity[];
  const root = asEntity(payload);
  if (!root) return [];
  for (const key of ['data', 'listings', 'scientists', 'items', 'results', 'records']) {
    const value = root[key];
    if (Array.isArray(value)) return value as Entity[];
  }
  return [];
}

function extractEntity(response: unknown): Entity | null {
  const payload = (response as { data?: unknown })?.data ?? response;
  const record = asEntity(payload);
  if (!record) return null;
  return asEntity(record.listing) ?? asEntity(record.scientist) ?? asEntity(record.data) ?? record;
}

function fileUrl(value: unknown): string {
  const raw = text(value);
  return raw ? normalizeFileSrc(raw) || '' : '';
}

function currencyLabel(code: string): string {
  const currency = code.trim().toUpperCase();
  if (!currency) return '$';
  return currency;
}

function amountRange(min: unknown, max: unknown, currency: string): string {
  const minText = min == null || min === '' ? '' : formatAmountDisplay(text(min));
  const maxText = max == null || max === '' ? '' : formatAmountDisplay(text(max));
  if (!minText && !maxText) return '';
  if (minText && maxText && minText !== maxText) return `${currencyLabel(currency)} ${minText} – ${maxText}`;
  return `${currencyLabel(currency)} ${minText || maxText}`;
}

function mapSocials(raw: unknown): Record<string, string> {
  const result: Record<string, string> = {};
  if (Array.isArray(raw)) {
    for (const entry of raw) {
      const record = asEntity(entry) ?? {};
      const platform = text(record.platform ?? record.name).trim().toLowerCase();
      const link = text(record.link ?? record.url ?? record.value);
      if (platform && link) result[platform] = link;
    }
  } else {
    const record = asEntity(raw);
    if (record) {
      for (const [platform, link] of Object.entries(record)) {
        const value = text(link);
        if (platform && value) result[platform.trim().toLowerCase()] = value;
      }
    }
  }
  return result;
}

function mapServiceCosts(record: Entity, serviceNames: string[]): PublicScientist['serviceCost'] {
  const raw = record.serviceCosts ?? record.serviceCost ?? record.serviceCharges;
  const rows: { service: string; range: string }[] = [];

  const push = (service: string, min: unknown, max: unknown, currency: string) => {
    const range = amountRange(min, max, currency || 'USD');
    if (service && range) rows.push({ service, range });
  };

  if (Array.isArray(raw)) {
    for (const entry of raw) {
      const row = asEntity(entry) ?? {};
      const nested = asEntity(row.service);
      const service =
        pick(row, ['serviceName', 'service', 'name']) ||
        pick(nested, ['name', 'service']) ||
        serviceNames[rows.length] ||
        '';
      push(
        service,
        row.minCost ?? row.min ?? row.amount,
        row.maxCost ?? row.max ?? row.amount,
        text(row.currency),
      );
    }
  } else {
    const row = asEntity(raw);
    if (row) {
      Object.entries(row).forEach(([, value], index) => {
        const entry = asEntity(value) ?? {};
        push(
          pick(entry, ['serviceName', 'service', 'name']) || serviceNames[index] || '',
          entry.minCost ?? entry.min ?? entry.amount,
          entry.maxCost ?? entry.max ?? entry.amount,
          text(entry.currency),
        );
      });
    }
  }
  return rows;
}

function mapOtherFees(record: Entity): PublicScientist['otherFees'] {
  const raw = record.otherCosts ?? record.otherCharges ?? record.otherFees;
  if (!Array.isArray(raw)) return [];
  return raw
    .map((entry) => {
      const row = asEntity(entry) ?? {};
      const name = text(row.name ?? row.title);
      const amount = amountRange(
        row.minCost ?? row.amount,
        row.maxCost ?? row.amount,
        text(row.currency) || 'USD',
      );
      return name ? { name, amount: amount || '—' } : null;
    })
    .filter((item): item is { name: string; amount: string } => item !== null);
}

function mapCertifications(record: Entity): PublicScientist['certifications'] {
  const raw = record.certificates ?? record.certifications;
  if (!Array.isArray(raw)) return [];
  return raw
    .map((entry) => {
      const row = asEntity(entry) ?? {};
      const name = text(row.name ?? row.title);
      if (!name) return null;
      return { name, issuer: text(row.issuer), year: text(row.year) };
    })
    .filter((item): item is { name: string; issuer: string; year: string } => item !== null);
}

function mapAchievements(record: Entity): PublicScientist['achievements'] {
  const raw = record.achievements;
  if (!Array.isArray(raw)) return [];
  return raw
    .map((entry) => {
      const row = asEntity(entry) ?? {};
      const title = text(row.title ?? row.name);
      if (!title) return null;
      const description =
        text(row.description) ||
        [text(row.issuer), text(row.year)].filter(Boolean).join(', ');
      return { title, description };
    })
    .filter((item): item is { title: string; description: string } => item !== null);
}

function mapGallery(record: Entity): string[] {
  const raw = record.media ?? record.gallery;
  if (!Array.isArray(raw)) return [];
  return raw
    .map((entry) => {
      const row = asEntity(entry);
      const value = typeof entry === 'string' ? entry : text(row?.mediaFile ?? row?.url ?? row?.file);
      return fileUrl(value);
    })
    .filter(Boolean);
}

/** Maps one public listing payload into the shape the public page renders. */
export function mapPublicScientist(raw: Entity): PublicScientist {
  const row = asEntity(raw.listing) ?? asEntity(raw.scientist) ?? raw;
  const user = asEntity(row.user) ?? asEntity(row.submitter) ?? {};
  const profile = asEntity(row.profile) ?? {};
  const highlights = asEntity(row.highlights) ?? {};

  const fields = namedList(row.fields ?? row.field, ['field']);
  const professions = namedList(row.professions ?? row.profession, ['profession']);
  const degrees = namedList(row.degrees ?? row.degree, ['degree']);
  const services = namedList(row.services ?? row.serviceOptions ?? row.service, ['serviceOption', 'service']);
  const scopes = stringList(row.scopes, ['scope', 'name', 'value']);
  const policies = stringList(row.policies, ['policy', 'name', 'value']);

  const country = text(row.country);
  const state = text(row.state ?? row.stateRegion ?? row.city);
  const socials = mapSocials(row.socials ?? row.socialLinks);

  const profileImage = fileUrl(row.profileImage ?? profile.displayPhoto ?? row.image);
  const backgroundImage = fileUrl(row.backgroundImage ?? row.background ?? row.coverImage);

  const workDays = stringList(highlights.workDays ?? row.workDays, ['day', 'name', 'value']);
  const startHours = text(highlights.startHours ?? row.startHours);
  const endHours = text(highlights.endHours ?? row.endHours);
  const timeRange =
    startHours && endHours ? `${startHours} - ${endHours}` : stringList(row.workHours, ['range', 'value']).join(', ');

  const rawStatus = text(row.status).toUpperCase();
  const status = row.isActive === false || rawStatus === 'INACTIVE' ? 'Offline' : 'Online';

  return {
    id: text(row.id ?? row._id ?? row.scientistListingId ?? row.listingId),
    createdAt: text(row.createdAt ?? row.publishedAt ?? row.approvedAt),
    name: text(row.name ?? row.fullName) || text(user.fullName) || 'Scientist / Technologist',
    title: professions[0] || fields[0] || 'Scientist / Technologist',
    field: fields[0] || '',
    fields,
    professions,
    degrees,
    services,
    scopes,
    policies,
    certifications: mapCertifications(row),
    achievements: mapAchievements(row),
    serviceCost: mapServiceCosts(row, services),
    otherFees: mapOtherFees(row),
    gallery: mapGallery(row),
    bio: text(row.bio ?? row.shortDescription),
    image: profileImage || backgroundImage || FALLBACK_IMAGE,
    backgroundImage,
    location: [state, country].filter(Boolean).join(', '),
    country,
    state,
    status,
    verified: row.isVerified === true || row.verified === true,
    rating: Number(row.rating ?? row.averageRating ?? 0) || 0,
    reviews: Number(row.reviews ?? row.reviewCount ?? 0) || 0,
    views: Number(row.views ?? row.viewCount ?? 0) || 0,
    likes: Number(row.likes ?? row.likeCount ?? 0) || 0,
    favorites: Number(row.favorites ?? 0) || 0,
    shares: Number(row.shares ?? row.shareCount ?? 0) || 0,
    bookingsCount: Number(row.bookings ?? row.bookingCount ?? 0) || 0,
    responseTime: text(highlights.responseTime ?? row.responseTime),
    availability: {
      workDays: workDays.join(', '),
      time: timeRange,
    },
    contact: {
      phone: text(user.phone) || text(row.phone),
      email: text(user.email) || text(row.email),
      website: text(profile.website) || text(row.website),
      linkedin: socials.linkedin ?? '',
      twitter: socials.x ?? socials.twitter ?? '',
      instagram: socials.instagram ?? '',
      facebook: socials.facebook ?? '',
    },
    testimonials: [],
  };
}

/** GET /scientists/listings/public */
export async function fetchPublicScientists(): Promise<PublicScientist[]> {
  const response = await api.get('/scientists/listings/public', { auth: 'none' });
  return extractList(response)
    .map(mapPublicScientist)
    .filter((scientist) => Boolean(scientist.id));
}

/** GET /scientists/listings/public/{id} */
export async function fetchPublicScientist(id: string): Promise<PublicScientist | null> {
  const response = await api.get(`/scientists/listings/public/${encodeURIComponent(id)}`, { auth: 'optional' });
  const raw = extractEntity(response);
  if (!raw) return null;
  const scientist = mapPublicScientist(raw);
  return scientist.id ? scientist : null;
}

export interface ScientistFilterOptions {
  fields: string[];
  degrees: string[];
  services: string[];
  /** Profession names grouped by their parent field name. */
  professionsByField: Record<string, string[]>;
  /** Optional admin note per profession name (UI ready, endpoint pending). */
  professionNotes: Record<string, string>;
}

/** Loads every sidebar filter option from the shared option endpoints. */
export async function fetchScientistFilterOptions(): Promise<ScientistFilterOptions> {
  const [fields, degrees, services, professions] = await Promise.all([
    fetchScientistOptions('FIELD').catch(() => []),
    fetchScientistOptions('DEGREE').catch(() => []),
    fetchScientistOptions('SERVICE').catch(() => []),
    fetchScientistProfessions().catch(() => []),
  ]);

  const professionsByField: Record<string, string[]> = {};
  const professionNotes: Record<string, string> = {};
  const fieldNameById = new Map(fields.map((field) => [field.id, field.name]));

  professions.forEach((profession) => {
    const fieldName = profession.fieldName || fieldNameById.get(profession.fieldId) || '';
    if (!fieldName) return;
    (professionsByField[fieldName] ??= []).push(profession.name);
    if (profession.note) professionNotes[profession.name] = profession.note;
  });

  return {
    fields: fields.map((field) => field.name),
    degrees: degrees.map((degree) => degree.name),
    services: services.map((service) => service.name),
    professionsByField,
    professionNotes,
  };
}
