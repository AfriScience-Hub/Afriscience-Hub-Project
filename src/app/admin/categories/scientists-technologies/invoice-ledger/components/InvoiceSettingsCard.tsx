'use client';

import { useEffect, useState } from 'react';
import { Loader2, RefreshCw, Save, Settings2 } from 'lucide-react';
import { toast } from 'sonner';
import { fetchInvoiceSettings, updateInvoiceSettings, type InvoiceSettings } from '../api';

interface FormState {
  commissionPercent: string;
  taxPercent: string;
  processingFeePercent: string;
}

function toForm(settings: InvoiceSettings): FormState {
  return {
    commissionPercent: String(settings.commissionPercent ?? ''),
    taxPercent: String(settings.taxPercent ?? ''),
    processingFeePercent: String(settings.processingFeePercent ?? ''),
  };
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Unable to load invoice settings.';
}

/** Global commission, tax and Flutterwave processing-fee settings. */
export default function InvoiceSettingsCard() {
  const [settings, setSettings] = useState<InvoiceSettings | null>(null);
  const [form, setForm] = useState<FormState>({ commissionPercent: '', taxPercent: '', processingFeePercent: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const row = await fetchInvoiceSettings();
      setSettings(row);
      setForm(toForm(row));
    } catch (loadError) {
      setError(errorMessage(loadError));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void load(); }, []);

  const handleSave = async () => {
    const commission = Number(form.commissionPercent);
    const tax = Number(form.taxPercent);
    const processing = Number(form.processingFeePercent);

    if ([commission, tax, processing].some((value) => !Number.isFinite(value) || value < 0 || value > 100)) {
      toast.error('Each percentage must be between 0 and 100.');
      return;
    }
    if (processing >= 100) {
      toast.error('Processing fee must be less than 100.');
      return;
    }

    setSaving(true);
    try {
      const updated = await updateInvoiceSettings({
        commissionPercent: commission,
        taxPercent: tax,
        processingFeePercent: processing,
      });
      setSettings(updated);
      setForm(toForm(updated));
      toast.success('Invoice settings updated.');
    } catch (saveError) {
      toast.error(saveError instanceof Error ? saveError.message : 'Unable to update invoice settings.');
    } finally {
      setSaving(false);
    }
  };

  const fields: { key: keyof FormState; label: string; hint: string }[] = [
    { key: 'commissionPercent', label: 'Commission %', hint: 'Platform commission on new invoices.' },
    { key: 'taxPercent', label: 'Tax %', hint: 'Tax added before processing fees.' },
    { key: 'processingFeePercent', label: 'Processing fee %', hint: 'Flutterwave processing fee.' },
  ];

  return (
    <div className="rounded-xl border border-neutral-gray-light bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="h-9 w-9 rounded-lg bg-purple-100 text-purple-600 grid place-items-center shrink-0">
            <Settings2 className="h-4 w-4" />
          </span>
          <div>
            <h2 className="text-sm font-bold text-neutral-black">Invoice settings</h2>
            <p className="text-[11px] text-neutral-gray-medium mt-0.5">
              Snapshot values applied to newly created invoices.
            </p>
          </div>
        </div>
        {settings?.updatedAt && (
          <span className="text-[10px] text-neutral-gray-medium whitespace-nowrap">
            Updated {settings.updatedAt.slice(0, 10)}
          </span>
        )}
      </div>

      {loading ? (
        <div className="py-5 text-xs text-neutral-gray-medium flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading settings...
        </div>
      ) : error ? (
        <div className="mt-4 flex items-center justify-between gap-3 rounded-lg bg-red-50 border border-red-100 px-3 py-2">
          <p className="text-xs text-red-700">{error}</p>
          <button onClick={() => void load()} className="text-xs font-semibold text-red-700 inline-flex items-center gap-1">
            <RefreshCw className="h-3.5 w-3.5" /> Retry
          </button>
        </div>
      ) : (
        <>
          <div className="grid sm:grid-cols-3 gap-3 mt-4">
            {fields.map((field) => (
              <label key={field.key} className="block">
                <span className="text-[11px] font-semibold text-neutral-gray-dark">{field.label}</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={form[field.key]}
                  onChange={(event) => setForm((current) => ({ ...current, [field.key]: event.target.value }))}
                  className="mt-1 w-full px-3 py-2 rounded-lg border border-neutral-gray-light text-xs focus:ring-2 focus:ring-[#453DD8] outline-none"
                />
                <span className="text-[10px] text-neutral-gray-medium mt-1 block">{field.hint}</span>
              </label>
            ))}
          </div>
          <div className="flex justify-end mt-3">
            <button
              onClick={() => void handleSave()}
              disabled={saving}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#453DD8] text-white text-xs font-semibold hover:bg-[#372fb5] cursor-pointer disabled:opacity-50"
            >
              {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
              {saving ? 'Saving...' : 'Save settings'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
