import { api } from '@/lib/api';
import { normalizeFileSrc } from '@/lib/files';
import { formatAmountDisplay } from '@/lib/amounts';
import type {
  Achievement,
  AdminScientist,
  Credential,
  ListingStatus,
  OtherFee,
  ServiceCost,
  SubmissionStatus,
  Verification,
} from './data';

const FALLBACK_IMAGE = '/littleLogo.png';

type Entity = Record<string, unknown>;

function asEntity(value: unknown): Entity | null {
  return value && typeof value === 'object' ? (value as Entity) : null;
}

function text(value: unknown): string {
  if (typeof value === 'string') return value.trim();
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  return '';
}

/** Normalises a stored file key / URL / `{ url }` object into a viewable src. */
function fileUrl(value: unknown): string {
  if (typeof value === 'string') return normalizeFileSrc(value.trim()) || '';
  const record = asEntity(value);
  if (!record) return '';
  return normalizeFileSrc(text(record.url ?? record.key ?? record.file ?? record.path)) || '';
}

function pick(item: unknown, keys: string[]): string {
  if (typeof item === 'string') return item.trim();
  const record = asEntity(item);
  if (!record) return '';
  for (const key of keys) {
    const value = record[key];
    const parsed = text(value);
    if (parsed) return parsed;
    const nested = asEntity(value);
    if (nested) {
      const nestedName = text(nested.name ?? nested.title ?? nested.value);
      if (nestedName) return nestedName;
    }
  }
  return '';
}

/** Flattens arrays of strings / objects into a string list. */
function toList(value: unknown, keys: string[]): string[] {
  if (Array.isArray(value)) {
    return value
      .map((entry) => {
        if (typeof entry === 'string') return entry.trim();
        const record = asEntity(entry);
        if (!record) return '';
        for (const key of keys) {
          const item = record[key];
          const parsed = text(item);
          if (parsed) return parsed;
          const nested = asEntity(item);
          if (nested) {
            const nestedName = text(nested.name ?? nested.title ?? nested.value);
            if (nestedName) return nestedName;
          }
        }
        return text(record.name ?? record.title ?? record.value);
      })
      .filter(Boolean);
  }
  const single = text(value);
  if (!single) {
    if (value && typeof value === 'object') return toList([value], keys);
    return [];
  }
  return single
    .split(/\r?\n|,\s*/)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function unwrapData(response: unknown): unknown {
  const data = (response as { data?: unknown })?.data ?? response;
  return (data as { data?: unknown })?.data ?? data;
}

function extractList(response: unknown): unknown[] {
  const payload = unwrapData(response);
  if (Array.isArray(payload)) return payload;
  const root = asEntity(payload);
  if (!root) return [];
  for (const key of ['listings', 'scientists', 'items', 'results', 'records']) {
    if (Array.isArray(root[key])) return root[key] as unknown[];
  }
  return [];
}

/** Unwraps a single record that may be nested under a named key. */
function extractEntity(response: unknown): unknown {
  const payload = unwrapData(response);
  const root = asEntity(payload);
  if (!root) return payload;
  for (const key of ['listing', 'scientist', 'item', 'record', 'submission']) {
    if (asEntity(root[key])) return root[key];
  }
  return payload;
}

function mapSubmissionStatus(raw: unknown, record?: Entity): SubmissionStatus {
  const status = text(raw).toUpperCase();
  switch (status) {
    case 'APPROVED':
    case 'VERIFIED':
      return 'Approved';
    case 'PUBLISHED':
    case 'ACTIVE':
    case 'LIVE':
      return 'Published';
    case 'REJECTED':
      return 'Rejected';
    case 'PENDING':
    case 'PENDING_REVIEW':
    case 'PENDING_UPDATE':
    case 'UNDER_REVIEW':
    case 'DRAFT':
      return 'Pending Review';
    default:
      if (record && (record.isPublished === true || record.published === true || record.isActive === true)) {
        return 'Published';
      }
      return 'Pending Review';
  }
}

function mapListingStatus(status: SubmissionStatus): ListingStatus {
  if (status === 'Approved' || status === 'Published') return 'Published';
  if (status === 'Rejected') return 'Unpublished';
  return 'Pending Review';
}

function mapVerification(record: Entity, status: SubmissionStatus): Verification {
  if (record.isVerified === true || record.verified === true) return 'Verified';
  if (status === 'Pending Review') return 'Pending';
  return 'Unverified';
}

function formatDateParts(raw: unknown): { date: string; time: string } {
  const value = text(raw);
  if (!value) return { date: '', time: '' };
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return { date: value, time: '' };
  return {
    date: date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
  };
}

function money(value: unknown): string {
  if (value == null || value === '') return '';
  const display = formatAmountDisplay(value as string | number);
  return display === '—' ? '' : display;
}

function moneyFromMinor(record: Entity, majorKey: string, minorKey: string): string {
  const major = money(record[majorKey]);
  if (major) return major;
  const rawMinor = record[minorKey];
  if (rawMinor == null || rawMinor === '') return '';
  const minor = Number(rawMinor);
  return Number.isFinite(minor) ? money(minor / 100) : '';
}

function mapServiceCosts(record: Entity): ServiceCost[] {
  const raw = record.serviceCosts;
  if (!Array.isArray(raw)) return [];
  return raw
    .map((entry): ServiceCost | null => {
      const row = asEntity(entry);
      if (!row) return null;
      const service =
        pick(row, ['serviceName', 'name', 'service']) ||
        pick(row.serviceOption, ['name', 'title']) ||
        pick(row.service, ['name', 'title']);
      const min = moneyFromMinor(row, 'minCost', 'minCostMinor');
      const max = moneyFromMinor(row, 'maxCost', 'maxCostMinor');
      const single = money(row.amount) || moneyFromMinor(row, 'amount', 'amountMinor');
      const currency = text(row.currency);
      const low = min || single;
      const range = low && max
        ? `${low} – ${max}${currency ? ` ${currency}` : ''}`
        : low || max
          ? `${low || max}${currency ? ` ${currency}` : ''}`
          : '';
      if (!service && !range) return null;
      return {
        service: service || 'Service',
        range: range || '—',
        description: text(row.description) || undefined,
        min: low || undefined,
        max: max || undefined,
        currency: currency || undefined,
      };
    })
    .filter((item): item is ServiceCost => item !== null);
}

function mapOtherFees(record: Entity): OtherFee[] {
  const raw = record.otherCosts;
  if (!Array.isArray(raw)) return [];
  return raw
    .map((entry): OtherFee | null => {
      const row = asEntity(entry);
      if (!row) return null;
      const name = text(row.name);
      const serviceName =
        pick(row.service, ['service', 'name', 'title']) ||
        pick(row.serviceOption, ['name', 'title']);
      const min =
        moneyFromMinor(row, 'minCost', 'minCostMinor') ||
        money(row.amount) ||
        moneyFromMinor(row, 'amount', 'amountMinor');
      const max = moneyFromMinor(row, 'maxCost', 'maxCostMinor');
      const currency = text(row.currency);
      const amount = min || max
        ? `${min || max}${max && min ? ` – ${max}` : ''}${currency ? ` ${currency}` : ''}`
        : '';
      if (!name && !amount) return null;
      return {
        name: name || serviceName || 'Other fee',
        amount: amount || '—',
        description: text(row.description) || undefined,
        service: serviceName || undefined,
        min: min || undefined,
        max: max || undefined,
        currency: currency || undefined,
      };
    })
    .filter((item): item is OtherFee => item !== null);
}

function mapCertifications(record: Entity): Credential[] {
  const raw = record.certificates;
  if (!Array.isArray(raw)) return [];
  return raw
    .map((entry): Credential | null => {
      const row = asEntity(entry);
      if (!row) return null;
      const name = text(row.name ?? row.title);
      if (!name) return null;
      return {
        name,
        issuer: text(row.issuer),
        year: text(row.year),
        document: fileUrl(row.document ?? row.file ?? row.certificate) || undefined,
      };
    })
    .filter((item): item is Credential => item !== null);
}

function mapAchievements(record: Entity): Achievement[] {
  const raw = record.achievements;
  if (!Array.isArray(raw)) return [];
  return raw
    .map((entry): Achievement | null => {
      const row = asEntity(entry);
      if (!row) return null;
      const title = text(row.name ?? row.title);
      if (!title) return null;
      const issuer = text(row.issuer);
      const year = text(row.year);
      return {
        title,
        description: [issuer, year].filter(Boolean).join(', '),
        document: fileUrl(row.document ?? row.file ?? row.achievement) || undefined,
        issuer: issuer || undefined,
        year: year || undefined,
      };
    })
    .filter((item): item is Achievement => item !== null);
}

function mapSocials(record: Entity): { platform: string; link: string }[] {
  const raw = record.socials ?? record.socialLinks;
  if (Array.isArray(raw)) {
    return raw
      .map((entry) => {
        const row = asEntity(entry);
        if (!row) return null;
        const platform = text(row.platform ?? row.name);
        const link = text(row.link ?? row.url ?? row.value);
        return platform && link ? { platform, link } : null;
      })
      .filter((item): item is { platform: string; link: string } => item !== null);
  }
  const row = asEntity(raw);
  if (row) {
    return Object.entries(row)
      .map(([platform, link]) => ({ platform, link: text(link) }))
      .filter((item) => item.link);
  }
  return [];
}

function firstText(value: unknown): string {
  return toList(value, ['name', 'title', 'value'])[0] || '';
}

/** First uploaded degree certificate on the record. */
function firstDegreeDocument(value: unknown): string {
  if (!Array.isArray(value)) return fileUrl(value);
  for (const entry of value) {
    const row = asEntity(entry);
    if (!row) continue;
    const document = fileUrl(row.document ?? row.file ?? row.certificate);
    if (document) return document;
  }
  return '';
}

function mapScientist(record: unknown): AdminScientist {
  const outer = asEntity(record) ?? {};
  const row = asEntity(outer.listing) ?? asEntity(outer.scientist) ?? outer;
  const status = mapSubmissionStatus(row.status, row);
  const listingStatus = mapListingStatus(status);
  const professions = toList(row.professions ?? row.profession, ['name', 'profession', 'title']);
  const fields = toList(row.fields ?? row.field, ['field', 'name', 'title']);
  const services = toList(row.services ?? row.serviceOptions ?? row.service, ['name', 'serviceOption', 'service', 'title']);
  const degrees = toList(row.degrees ?? row.degree, ['name', 'degree', 'title']);
  const rawHighlights = asEntity(row.highlights) ?? {};
  const start = text(rawHighlights.startHours ?? row.startHours);
  const end = text(rawHighlights.endHours ?? row.endHours);
  const submitted = formatDateParts(row.createdAt ?? row.submittedAt ?? row.created_at);
  const reviewer = asEntity(row.reviewer);
  const user = asEntity(row.submitter) ?? asEntity(row.user) ?? asEntity(row.innovator) ?? {};
  const profile = asEntity(row.profile) ?? {};
  const country = text(row.country);
  const city = text(row.state ?? row.stateRegion ?? row.city);
  const field = fields[0] || firstText(row.field) || '';
  const profession = professions[0] || field;
  const name = text(row.name ?? row.fullName) || text(user.fullName);
  const profileImage = fileUrl(row.profileImage ?? profile.displayPhoto ?? row.image) || '';
  const backgroundImage = fileUrl(row.backgroundImage ?? row.background) || '';
  const image = profileImage || FALLBACK_IMAGE;
  const payingUser = row.payingUser === true;
  const rawStatus = text(row.status).toUpperCase();
  const pendingUpdate = row.pendingUpdate === true || row.hasPendingUpdate === true || rawStatus.includes('UPDATE');

  return {
    id: text(row.id ?? row._id ?? row.scientistListingId ?? row.listingId),
    name: name || 'Scientist / Technologist',
    title: profession || field || 'Scientist / Technologist',
    field,
    professions,
    degrees,
    location: [city, country].filter(Boolean).join(', '),
    country,
    city,
    submittedBy:
      pick(row, ['submittedBy', 'submitterName']) ||
      text(user.name ?? user.fullName) ||
      name,
    submitterEmail:
      text(user.email) ||
      text(row.submitterEmail ?? row.submittedByEmail ?? row.email),
    submittedOn: submitted.date,
    submittedTime: submitted.time,
    publishedBy: reviewer
      ? [text(reviewer.firstName), text(reviewer.lastName)].filter(Boolean).join(' ')
      : text(row.publishedBy),
    status,
    listingStatus,
    verification: mapVerification(row, status),
    rating: Number(row.rating ?? row.averageRating ?? 0) || 0,
    bookings: Number(row.bookings ?? row.bookingCount ?? 0) || 0,
    subscription: payingUser ? 'Pro Plan' : 'Free Plan',
    pendingUpdate,
    views: Number(row.views ?? row.viewCount ?? 0) || 0,
    image,
    profileImage: profileImage || undefined,
    backgroundImage: backgroundImage || undefined,
    bio: text(row.bio ?? row.shortDescription),
    phone: text(user.phone),
    email: text(user.email),
    website: text(user.website),
    services,
    degreeDocument: firstDegreeDocument(row.degrees) || undefined,
    scopes: toList(row.scopes, ['scope', 'name', 'value']),
    serviceCost: mapServiceCosts(row),
    otherFees: mapOtherFees(row),
    certifications: mapCertifications(row),
    policies: toList(row.policies, ['policy', 'name', 'value']),
    achievements: mapAchievements(row),
    socials: mapSocials(row),
    reason: text(row.reasonForRejection ?? row.reason ?? row.rejectionReason),
    highlights: {
      responseTime: text(rawHighlights.responseTime ?? row.responseTime),
      workDays: toList(rawHighlights.workDays ?? row.workDays, ['day', 'name', 'value']),
      startHours: start,
      endHours: end,
    },
  };
}

/** GET /scientists/listings/admin — every listing in the review workflow. */
export async function fetchAdminScientistListings(): Promise<AdminScientist[]> {
  const response = await api.get('/scientists/listings/admin');
  return extractList(response).map(mapScientist);
}

/** GET /scientists/listings/admin/{id} — full listing for review. */
export async function fetchAdminScientistListing(id: string): Promise<AdminScientist> {
  const response = await api.get(`/scientists/listings/admin/${id}`);
  return mapScientist(extractEntity(response));
}

/** POST /scientists/listings/admin/{id}/approve */
export async function approveAdminScientistListing(id: string) {
  return api.post(`/scientists/listings/admin/${id}/approve`);
}

/** POST /scientists/listings/admin/{id}/reject */
export async function rejectAdminScientistListing(id: string, reason: string) {
  return api.post(`/scientists/listings/admin/${id}/reject`, { reason });
}

/** Toggles the public verification badge on a scientist listing. */
export async function setScientistVerification(id: string, isVerified: boolean) {
  return api.patch(`/scientists/listings/${id}`, { isVerified });
}

/** GET /scientists/listings/public — approved listings currently on the platform. */
export async function fetchPublicScientistListings(): Promise<AdminScientist[]> {
  const response = await api.get('/scientists/listings/public');
  return extractList(response).map(mapScientist);
}

/** GET /scientists/listings/public/{id} — one public listing. */
export async function fetchPublicScientistListing(id: string): Promise<AdminScientist> {
  const response = await api.get(`/scientists/listings/public/${id}`);
  return mapScientist(extractEntity(response));
}
