'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, FileText, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/app/components/ui/Button';
import { normalizeFileSrc } from '@/lib/files';
import { deleteInnovation, fetchInnovationDrafts } from '../innovationApi';
import DraftRowMenu from './DraftRowMenu';

interface DraftListViewProps {
  onBack: () => void;
  onContinue: (id: string) => Promise<void>;
}

function draftDate(value?: string | null): string {
  if (!value) return 'Not saved yet';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return 'Not saved yet';
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

/** Infers which listing category a draft belongs to. */
function categoryLabel(draft: any): string {
  const raw = draft.listingType ?? draft.listingCategory ?? draft.categoryId ?? draft.category;
  if (raw) {
    return String(raw)
      .replace(/[-_]/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, (c: string) => c.toUpperCase());
  }
  if (draft.innovationName || draft.innovFields || draft.materialsUsed) return 'Afro-Innovation';
  return 'Listing';
}

/** Lists saved listing drafts in a row/table style layout. */
export default function DraftListView({ onBack, onContinue }: DraftListViewProps) {
  const [drafts, setDrafts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await fetchInnovationDrafts();
      setDrafts(Array.isArray(list) ? list : []);
    } catch (e: any) {
      setError(e?.message || 'Failed to load drafts');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  const handleContinue = async (id: string) => {
    setBusyId(id);
    try {
      await onContinue(id);
    } catch (e: any) {
      toast.error(e?.message || 'Failed to open draft');
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete the draft "${name}"? This cannot be undone.`)) return;
    setBusyId(id);
    try {
      await deleteInnovation(id);
      setDrafts((prev) => prev.filter((d) => String(d.id) !== id));
      toast.success('Draft deleted');
    } catch (e: any) {
      toast.error(e?.message || 'Failed to delete draft');
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              aria-label="Back to listing categories"
              className="cursor-pointer rounded-lg border border-neutral-gray-light p-2 text-neutral-gray-dark transition-colors hover:bg-neutral-bg-light"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div>
              <h2 className="text-xl font-bold text-neutral-black">Listing Drafts</h2>
              <p className="text-sm text-neutral-gray-medium">
                Continue a saved listing draft or delete the ones you no longer need.
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={onBack}>Back to Categories</Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-neutral-gray-light bg-white shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center gap-2 px-6 py-16 text-sm text-neutral-gray-medium">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading drafts...
          </div>
        ) : error ? (
          <div className="px-6 py-12 text-center">
            <p className="text-sm text-red-600">{error}</p>
            <Button variant="outline" onClick={() => void load()} className="mt-4">Try again</Button>
          </div>
        ) : drafts.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-bg-light">
              <FileText className="h-6 w-6 text-neutral-gray-medium" />
            </div>
            <h3 className="text-base font-semibold text-neutral-black">No drafts yet</h3>
            <p className="mx-auto mt-1 max-w-sm text-sm text-neutral-gray-medium">
              Saving a listing as a draft will keep it here so you can finish it later.
            </p>
            <Button onClick={onBack} className="mt-5">Start a listing</Button>
          </div>
        ) : (
          <>
            <div className="hidden grid-cols-[minmax(0,1fr)_160px_140px_44px] gap-4 border-b border-neutral-gray-light bg-neutral-bg-light px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-neutral-gray-medium md:grid">
              <span>Draft</span>
              <span>Category</span>
              <span>Last saved</span>
              <span className="sr-only">Actions</span>
            </div>
            <ul className="divide-y divide-neutral-gray-light">
              {drafts.map((draft) => {
                const id = String(draft.id ?? draft._id ?? draft.draftId ?? '');
                if (!id) return null;
                const title = draft.innovationName || draft.name || draft.title || 'Untitled listing';
                const image = normalizeFileSrc(draft.image);
                const busy = busyId === id;
                return (
                  <li
                    key={id}
                    className="grid grid-cols-[minmax(0,1fr)_44px] items-center gap-4 px-5 py-4 transition-colors hover:bg-neutral-bg-light/60 md:grid-cols-[minmax(0,1fr)_160px_140px_44px]"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-neutral-gray-light bg-neutral-bg-light">
                        {image ? (
                          <Image src={image} alt={title} fill sizes="48px" className="object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <FileText className="h-5 w-5 text-neutral-gray-medium" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-neutral-black">{title}</p>
                        <p className="truncate text-xs text-neutral-gray-medium">
                          {draft.country || 'No country selected'} · {categoryLabel(draft)} · Draft
                        </p>
                      </div>
                    </div>

                    <span className="hidden truncate text-xs text-neutral-gray-dark md:block">
                      {categoryLabel(draft)}
                    </span>
                    <span className="hidden text-xs text-neutral-gray-medium md:block">
                      {draftDate(draft.updatedAt || draft.createdAt)}
                    </span>

                    <DraftRowMenu
                      title={title}
                      busy={busy}
                      onContinue={() => void handleContinue(id)}
                      onDelete={() => void handleDelete(id, title)}
                    />
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
