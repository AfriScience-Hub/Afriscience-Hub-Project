'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

/**
 * Options used by the scientist/technologist listing form.
 *
 * These come from the same endpoints the admin Manage Options page uses:
 *   GET /scientists/options/{FIELD|DEGREE|SERVICE}
 *   GET /scientists/professions
 */

export type ScientistOptionType = 'FIELD' | 'DEGREE' | 'SERVICE';

export interface ScientistOption {
  id: string;
  name: string;
  isActive: boolean;
}

export interface ScientistProfession {
  id: string;
  name: string;
  fieldId: string;
  fieldName: string;
  isActive: boolean;
  /** Optional admin note. Not provided by the API yet — UI is ready for it. */
  note?: string;
}

function listFrom<T>(response: unknown): T[] {
  const payload = (response as { data?: unknown })?.data ?? response;
  const root = payload as Record<string, unknown> | undefined;
  if (Array.isArray(payload)) return payload as T[];
  const candidates = ['data', 'options', 'professions', 'fields', 'services', 'degrees', 'items', 'results'];
  for (const key of candidates) {
    if (Array.isArray(root?.[key])) return root[key] as T[];
  }
  return [];
}

function asRecord(item: unknown): Record<string, unknown> {
  return item && typeof item === 'object' ? (item as Record<string, unknown>) : {};
}

function toOption(item: unknown): ScientistOption {
  const record = asRecord(item);
  const id = record.id ?? record._id ?? record.optionId ?? record.name ?? '';
  return {
    id: String(id),
    name: String(record.name ?? record.label ?? record.content ?? ''),
    isActive: record.isActive !== false,
  };
}

function toProfession(item: unknown): ScientistProfession {
  const record = asRecord(item);
  const rawField = record.field;
  const nestedField = rawField && typeof rawField === 'object' ? asRecord(rawField) : undefined;
  const fieldId = String(record.fieldId ?? nestedField?.id ?? '');
  const fieldName = String(
    (typeof rawField === 'string' ? rawField : undefined) ??
      nestedField?.name ??
      record.fieldName ??
      '',
  );
  const id = record.id ?? record._id ?? record.professionId ?? record.name ?? '';
  return {
    id: String(id),
    name: String(record.name ?? record.label ?? record.content ?? ''),
    fieldId,
    fieldName,
    isActive: record.isActive !== false,
    note: String(record.note ?? record.notes ?? record.description ?? '').trim() || undefined,
  };
}

export async function fetchScientistOptions(type: ScientistOptionType): Promise<ScientistOption[]> {
  const res = await api.get(`/scientists/options/${type}`);
  return listFrom<unknown>(res)
    .map(toOption)
    .filter((option) => option.isActive && option.name.trim().length > 0);
}

export async function fetchScientistProfessions(): Promise<ScientistProfession[]> {
  const res = await api.get('/scientists/professions');
  return listFrom<unknown>(res)
    .map(toProfession)
    .filter((profession) => profession.isActive && profession.name.trim().length > 0);
}

interface ScientistOptionsState {
  fields: ScientistOption[];
  degrees: ScientistOption[];
  services: ScientistOption[];
  professions: ScientistProfession[];
  loading: boolean;
}

const EMPTY_STATE: ScientistOptionsState = {
  fields: [],
  degrees: [],
  services: [],
  professions: [],
  loading: true,
};

/** Loads every option list the scientist listing form needs. */
export function useScientistOptions() {
  const [state, setState] = useState<ScientistOptionsState>(EMPTY_STATE);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const [fields, degrees, services, professions] = await Promise.all([
        fetchScientistOptions('FIELD').catch(() => []),
        fetchScientistOptions('DEGREE').catch(() => []),
        fetchScientistOptions('SERVICE').catch(() => []),
        fetchScientistProfessions().catch(() => []),
      ]);

      if (cancelled) return;
      setState({ fields, degrees, services, professions, loading: false });
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
