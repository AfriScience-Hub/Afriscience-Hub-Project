import { normalizeFileSrc } from '@/lib/files';
import { toStorageKey } from '../afro-innovation-listing/innovationApi';
import { limitWords } from '../../wordUtils';
import { EMPTY_DOC, type DocEntry } from '../DocList';
import { formatWorkHours } from './scientistApi';
import type { MediaItem } from './components/ScientistGallerySection';
import type {
  OtherCharge,
  ProfessionalDetails,
  ProfessionalHighlight,
  ScientistContact,
  ScientistFees,
  ScientistProfile,
  ServiceCharge,
} from './types';
import type { ScientistOption, ScientistProfession } from '@/app/data/scientistOptions';

export interface ScientistOptionsLookup {
  fields: ScientistOption[];
  degrees: ScientistOption[];
  services: ScientistOption[];
  professions: ScientistProfession[];
}

export interface MappedScientistRecord {
  profile: ScientistProfile;
  details: ProfessionalDetails;
  fees: ScientistFees;
  scopes: string[];
  policies: string[];
  certifications: DocEntry[];
  achievements: DocEntry[];
  highlight: ProfessionalHighlight;
  media: MediaItem[];
  contact: ScientistContact;
  payingUser: boolean;
  status: string | null;
}

type Lookup = ScientistOptionsLookup;

type Entity = Record<string, unknown>;

function asEntity(value: unknown): Entity | null {
  return value && typeof value === 'object' ? (value as Entity) : null;
}

function text(value: unknown): string {
  return typeof value === 'string' ? value : value == null ? '' : String(value);
}

/** Reads a string from an object using the first non-empty preferred key. */
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

/** Flattens arrays of strings/objects into strings. */
function stringList(value: unknown, keys: string[]): string[] {
  if (Array.isArray(value)) return value.map((entry) => pick(entry, keys)).filter(Boolean);
  if (typeof value === 'string') {
    return value
      .split(/\r?\n|,\s*/)
      .map((entry) => entry.trim())
      .filter(Boolean);
  }
  return [];
}

function resolveName(list: { id: string; name: string }[], id: string, fallback = ''): string {
  return list.find((entry) => entry.id === id)?.name || fallback;
}

function resolveId(list: { id: string; name: string }[], name: string): string {
  return list.find((entry) => entry.name.toLowerCase() === name.toLowerCase())?.id || '';
}

/** Derives a readable file label from a storage key or URL. */
function fileLabel(value: string): string {
  if (!value) return '';
  try {
    const url = new URL(value);
    return decodeURIComponent(url.pathname.split('/').filter(Boolean).pop() || 'Uploaded certificate');
  } catch {
    return value.split('/').filter(Boolean).pop() || 'Uploaded certificate';
  }
}

function mapProfessions(item: Entity, lookup: Lookup): string[] {
  const raw = item.professions;
  if (Array.isArray(raw) && raw.length) {
    return raw
      .map((entry) => {
        const record = asEntity(entry);
        const nested = asEntity(record?.profession);
        const id = text(record?.professionId ?? nested?.id ?? (typeof entry === 'string' ? entry : ''));
        const name =
          pick(nested, ['name', 'title']) ||
          pick(entry, ['name', 'profession', 'title', 'value']) ||
          resolveName(lookup.professions, id);
        return name;
      })
      .filter(Boolean);
  }
  const ids = stringList(item.professionIds, ['id', 'professionId']);
  return ids.map((id) => resolveName(lookup.professions, id)).filter(Boolean);
}

function mapServices(item: Entity, lookup: Lookup): string[] {
  const raw = item.services;
  if (Array.isArray(raw) && raw.length) {
    return raw
      .map((entry) => {
        const record = asEntity(entry);
        const nested = asEntity(record?.serviceOption);
        const id = text(nested?.id ?? record?.serviceOptionId ?? record?.serviceId ?? (typeof entry === 'string' ? entry : ''));
        const name =
          pick(nested, ['name', 'title']) ||
          pick(entry, ['service', 'name', 'title', 'value']) ||
          resolveName(lookup.services, id);
        return name;
      })
      .filter(Boolean);
  }
  const ids = stringList(item.serviceIds, ['id', 'serviceId']);
  return ids.map((id) => resolveName(lookup.services, id)).filter(Boolean);
}

function mapDegree(item: Entity, lookup: Lookup): { degree: string; document: string; documentName: string } {
  const raw = item.degrees;
  if (Array.isArray(raw) && raw.length) {
    const first = asEntity(raw[0]);
    const nested = asEntity(first?.degree);
    const id = text(first?.degreeId ?? nested?.id ?? (typeof raw[0] === 'string' ? raw[0] : ''));
    const name = pick(nested ?? raw[0], ['name', 'degree', 'title', 'value']) || resolveName(lookup.degrees, id);
    const document = toStorageKey(text(
      first?.document ?? first?.certificate ?? first?.degreeCertificate ?? item.degreeCertificate,
    ));
    return { degree: name, document, documentName: fileLabel(document) };
  }
  const direct = pick(item.degree, ['name', 'title', 'value']);
  const id = text(asEntity(item.degree)?.id ?? item.degreeId);
  const document = toStorageKey(text(item.degreeCertificate));
  return {
    degree: direct || resolveName(lookup.degrees, id),
    document,
    documentName: fileLabel(document),
  };
}

function mapServiceCosts(item: Entity, lookup: Lookup, serviceNames: string[]): Record<string, ServiceCharge> {
  const costs: Record<string, ServiceCharge> = {};
  const raw = item.serviceCosts;
  const entries = Array.isArray(raw)
    ? raw
    : raw && typeof raw === 'object'
      ? Object.entries(raw as Record<string, unknown>).map(([key, value]) => ({ serviceOptionId: key, ...(asEntity(value) ?? {}) }))
      : [];

  for (const entry of entries) {
    const record = asEntity(entry) ?? {};
    const nested = asEntity(record.service);
    const id = text(record.serviceOptionId ?? nested?.serviceId ?? record.serviceId ?? record.id);
    const name =
      pick(record, ['serviceName', 'name', 'service']) ||
      pick(nested, ['service', 'name']) ||
      resolveName(lookup.services, id);
    const key = name || serviceNames[0];
    if (!key) continue;
    const min = record.minCost ?? record.min ?? record.amount;
    const max = record.maxCost ?? record.max ?? record.amount;
    costs[key] = {
      description: text(record.description),
      minCost: min == null ? '' : String(min),
      maxCost: max == null ? '' : String(max),
      currency: text(record.currency) || 'USD',
    };
  }

  for (const name of serviceNames) {
    if (!costs[name]) {
      costs[name] = { description: '', minCost: '', maxCost: '', currency: 'USD' };
    }
  }
  return costs;
}

function mapOtherCosts(item: Entity): OtherCharge[] {
  const raw = item.otherCosts;
  if (!Array.isArray(raw)) return [];
  return raw.map((entry) => {
    const record = asEntity(entry) ?? {};
    const amount = record.amount ?? record.minCost;
    return {
      name: text(record.name),
      description: text(record.description),
      minCost: record.minCost != null ? String(record.minCost) : amount != null ? String(amount) : '',
      maxCost: record.maxCost != null ? String(record.maxCost) : amount != null ? String(amount) : '',
      currency: text(record.currency) || 'USD',
    };
  });
}

function mapDocuments(raw: unknown): DocEntry[] {
  if (!Array.isArray(raw)) return [EMPTY_DOC];
  const entries: DocEntry[] = raw.map((entry) => {
    const record = asEntity(entry) ?? {};
    const document = text(record.document ?? record.file ?? record.mediaFile);
    return {
      name: text(record.name ?? record.documentTitle ?? record.title),
      issuer: text(record.issuer),
      year: text(record.year),
      file: null,
      previewUrl: document ? normalizeFileSrc(document) || document : null,
      key: document ? toStorageKey(document) : undefined,
    };
  });
  return entries.length ? entries : [EMPTY_DOC];
}

function mapMedia(raw: unknown): MediaItem[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((entry) => {
      const record = asEntity(entry);
      const value = typeof entry === 'string' ? entry : text(record?.mediaFile ?? record?.url ?? record?.file);
      if (!value) return null;
      const key = toStorageKey(value);
      return {
        file: null,
        previewUrl: normalizeFileSrc(value) || value,
        name: key || value,
        url: key,
      } as MediaItem;
    })
    .filter((entry): entry is MediaItem => entry !== null);
}

function mapHighlight(item: Entity): ProfessionalHighlight {
  const nested = asEntity(item.highlights) ?? {};
  const responseTime = text(nested.responseTime ?? item.responseTime);
  const workDays = stringList(nested.workDays ?? item.workDays, ['day', 'name', 'value']);
  const start = text(nested.startHours ?? item.startHours);
  const end = text(nested.endHours ?? item.endHours);
  const workHours = start && end
    ? [formatWorkHours(start, end)]
    : stringList(nested.workHours ?? item.workHours, ['range', 'value', 'name']);
  return { responseTime, workDays, workHours };
}

/**
 * Maps a stored social platform name onto the form's social keys. `X` and
 * `Twitter` are the same platform and both resolve to the `X` field.
 */
function socialKeyFor(platform: string): keyof ScientistContact['socials'] | null {
  const name = platform.trim().toLowerCase();
  if (name === 'x' || name === 'twitter') return 'X';
  if (name === 'linkedin') return 'LinkedIn';
  if (name === 'instagram') return 'Instagram';
  if (name === 'facebook') return 'Facebook';
  return null;
}

function mapSocials(raw: unknown): ScientistContact['socials'] {
  const socials: ScientistContact['socials'] = { LinkedIn: '', X: '', Instagram: '', Facebook: '' };
  if (Array.isArray(raw)) {
    for (const entry of raw) {
      const record = asEntity(entry) ?? {};
      const platform = text(record.platform ?? record.name);
      const link = text(record.link ?? record.url ?? record.value);
      const key = socialKeyFor(platform);
      if (key) socials[key] = link;
    }
  } else {
    const record = asEntity(raw);
    if (record) {
      for (const [platform, link] of Object.entries(record)) {
        const key = socialKeyFor(platform);
        if (key) socials[key] = text(link);
      }
    }
  }
  return socials;
}

/** Maps a scientist listing response into the form's state shape. */
export function mapScientistRecord(item: unknown, lookup: Lookup): MappedScientistRecord {
  const record = asEntity(item) ?? {};
  const professionNames = mapProfessions(record, lookup);
  const serviceNames = mapServices(record, lookup);
  const degree = mapDegree(record, lookup);

  const profile: ScientistProfile = {
    profileImage: normalizeFileSrc(text(record.profileImage ?? record.image)) || null,
    backgroundImage: normalizeFileSrc(text(record.backgroundImage ?? record.background ?? record.coverImage)) || null,
    profileImageFile: null,
    backgroundImageFile: null,
    name: text(record.name ?? record.fullName),
    country: text(record.country),
    stateRegion: text(record.state ?? record.stateRegion),
    bio: limitWords(text(record.bio), 1000),
  };

  const fieldEntry = Array.isArray(record.fields) ? asEntity(record.fields[0]) : null;
  const fieldName =
    pick(fieldEntry, ['field', 'name', 'title']) ||
    pick(record.field, ['name', 'title', 'value']) ||
    resolveName(lookup.fields, text(fieldEntry?.fieldId ?? record.fieldId));

  const details: ProfessionalDetails = {
    field: fieldName,
    professions: professionNames,
    professionOther: '',
    degree: degree.degree,
    degreeCertificate: degree.document,
    degreeCertificateFile: null,
    degreeCertificateName: degree.documentName,
    services: serviceNames,
  };

  const contact: ScientistContact = {
    socials: mapSocials(record.socials),
  };

  return {
    profile,
    details,
    fees: {
      serviceCosts: mapServiceCosts(record, lookup, serviceNames),
      otherCharges: mapOtherCosts(record),
    },
    scopes: stringList(record.scopes, ['scope', 'name', 'value']),
    policies: stringList(record.policies, ['policy', 'name', 'value']),
    certifications: mapDocuments(record.certificates),
    achievements: mapDocuments(record.achievements),
    highlight: mapHighlight(record),
    media: mapMedia(record.media),
    contact,
    payingUser: record.payingUser === true,
    status: typeof record.status === 'string' ? record.status : null,
  };
}

/** Resolves a service id to its display name (used when building the payload). */
export function serviceNameForId(lookup: Lookup, id: string): string {
  return resolveName(lookup.services, id);
}

/** Resolves a degree name to its id. */
export function degreeIdForName(lookup: Lookup, name: string): string {
  return resolveId(lookup.degrees, name);
}
