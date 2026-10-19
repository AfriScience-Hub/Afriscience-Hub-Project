'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import {
  INNOVATION_FIELDS,
  INNOVATION_INTERESTS,
  INNOVATION_OWNERSHIP,
  INNOVATION_SDGS,
  INNOVATION_STAGES
} from './mockData';

export type InnovationOptionType = 'FIELD' | 'INTEREST' | 'STAGE' | 'OWNERSHIP' | 'SDG';

export interface InnovationOption {
  id: string;
  /** Display name of the option. */
  content: string;
  isActive?: boolean;
  /** Optional description shown in info tooltips. */
  notes?: string;
  count?: number;
}

/**
 * Static lists used only as a fallback when the options endpoint cannot be
 * reached, so the filters/forms never render empty.
 */
const FALLBACKS: Record<string, string[]> = {
  FIELD: INNOVATION_FIELDS,
  INTEREST: INNOVATION_INTERESTS,
  STAGE: INNOVATION_STAGES,
  OWNERSHIP: INNOVATION_OWNERSHIP,
  SDG: INNOVATION_SDGS
};

/**
 * GET /api/v1/listings/innovations/options[?type=FIELD]
 *
 * Returns the selectable options the admin manages from the dashboard
 * (fields, interests, stages, ownership, SDGs…). Passing `type` narrows the
 * result to a single kind of option.
 */
export async function fetchInnovationOptions(type?: InnovationOptionType): Promise<InnovationOption[]> {
  const endpoint = type
    ? `/listings/innovations/options?type=${encodeURIComponent(type)}`
    : '/listings/innovations/options';

  const res: any = await api.get(endpoint);
  const data = res?.data ?? res;
  const list: any[] = Array.isArray(data) ? data : (data?.options ?? []);

  return list
    .map((o) => ({
      id: String(o?.id ?? o?.content ?? o?.name ?? ''),
      content: String(o?.content ?? o?.name ?? o?.label ?? ''),
      isActive: o?.isActive,
      notes: o?.notes ?? o?.note,
      count: o?.count,
    }))
    .filter((o) => o.content);
}

/** Display names of a list of options. */
export function optionNames(options: InnovationOption[] | undefined): string[] {
  return (options ?? []).map((o) => o.content);
}

interface UseOptionsOptions {
  /** Include options the admin has deactivated (used when editing a record). */
  includeInactive?: boolean;
}

/**
 * Fetches several option types in parallel and returns them keyed by type.
 *
 * Falls back to the bundled static lists if the endpoint is unavailable, so
 * the UI always has something to show.
 */
export function useInnovationOptionsMap(
  types: InnovationOptionType[],
  { includeInactive = false }: UseOptionsOptions = {}
) {
  const [options, setOptions] = useState<Record<string, InnovationOption[]>>({});
  const [loading, setLoading] = useState(true);

  const typeKey = types.join(',');
  const includeInactiveKey = includeInactive ? '1' : '0';

  useEffect(() => {
    let cancelled = false;
    const wanted = typeKey ? typeKey.split(',') : [];

    (async () => {
      setLoading(true);
      const entries = await Promise.all(
        wanted.map(async (type) => {
          try {
            const list = await fetchInnovationOptions(type as InnovationOptionType);
            const visible = list.filter((o) => includeInactiveKey === '1' || o.isActive !== false);
            return [type, visible.length ? visible : fallbackOptions(type)] as const;
          } catch {
            return [type, fallbackOptions(type)] as const;
          }
        })
      );
      if (cancelled) return;
      setOptions(Object.fromEntries(entries));
      setLoading(false);
    })();

    return () => { cancelled = true; };
  }, [typeKey, includeInactiveKey]);

  return { options, loading };
}

/** Static fallback options for a type. */
function fallbackOptions(type: string): InnovationOption[] {
  return (FALLBACKS[type] ?? []).map((content, i) => ({
    id: `${type}-${i}`,
    content,
    isActive: true,
  }));
}

/**
 * Fetches the options for a single type.
 */
export function useInnovationOptions(type: InnovationOptionType, opts: UseOptionsOptions = {}) {
  const { options, loading } = useInnovationOptionsMap([type], opts);
  const list = options[type] ?? [];
  return { options: list, names: optionNames(list), loading };
}
