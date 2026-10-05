'use client';

import { Plus, X, DollarSign } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/app/components/ui/Button';
import { CURRENCIES } from '../data';
import type { CenterFees, OtherFee, ServiceFee } from '../types';

interface CenterFeesSectionProps {
  services: string[];
  fees: CenterFees;
  onChange: (patch: Partial<CenterFees>) => void;
}

const EMPTY_FEE: OtherFee = { name: '', description: '', cost: '', currency: 'USD' };
const DEFAULT_SERVICE_FEE: ServiceFee = { description: '', costRange: '', currency: 'USD' };

export default function CenterFeesSection({ services, fees, onChange }: CenterFeesSectionProps) {
  const inputClass = 'w-full rounded-lg border border-neutral-gray-light px-3 py-2.5 text-sm focus:border-brand-red-600 focus:ring-1 focus:ring-brand-red-600';

  const updateServiceFee = (service: string, patch: Partial<ServiceFee>) => {
    onChange({
      serviceFees: {
        ...fees.serviceFees,
        [service]: { ...DEFAULT_SERVICE_FEE, ...fees.serviceFees[service], ...patch },
      },
    });
  };

  const updateOtherFee = (idx: number, patch: Partial<OtherFee>) => {
    onChange({
      otherFees: fees.otherFees.map((fee, i) => (i === idx ? { ...fee, ...patch } : fee)),
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-neutral-black mb-1">
          Service Fee <span className="text-red-500">*</span>
          <span className="text-[10px] font-normal text-neutral-gray-medium"> (costs can be in USD or local currency — auto-lists all selected services)</span>
        </label>
        {services.length > 0 ? (
          <div className="space-y-3">
            {services.map((service, idx) => {
              const fee = fees.serviceFees[service] || DEFAULT_SERVICE_FEE;
              return (
                <div key={service} className="rounded-lg border border-neutral-gray-light bg-neutral-bg-light/50 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-red-600 text-[10px] font-bold text-white">{idx + 1}</span>
                    <p className="text-sm font-bold text-neutral-black">{service}</p>
                  </div>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={fee.description}
                      onChange={(e) => updateServiceFee(service, { description: e.target.value })}
                      className={inputClass}
                      placeholder="Service description"
                    />
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="text"
                        value={fee.costRange}
                        onChange={(e) => updateServiceFee(service, { costRange: e.target.value })}
                        className={`${inputClass} col-span-2`}
                        placeholder="Cost range e.g. 10,000 - 50,000"
                      />
                      <select
                        value={fee.currency}
                        onChange={(e) => updateServiceFee(service, { currency: e.target.value })}
                        className={`${inputClass} cursor-pointer`}
                      >
                        {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-xs italic text-neutral-gray-medium">Select services first — each selected service will be listed here automatically.</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-black mb-1">
          Other Fees <span className="text-red-500">*</span>
          <span className="text-[10px] font-normal text-neutral-gray-medium"> (multiple entries allowed)</span>
        </label>
        <div className="space-y-3">
          {fees.otherFees.map((fee, idx) => (
            <div key={idx} className="rounded-lg border border-neutral-gray-light p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-neutral-gray-medium">
                  <DollarSign className="h-3.5 w-3.5" /> Charge {idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => onChange({ otherFees: fees.otherFees.filter((_, i) => i !== idx) })}
                  className="cursor-pointer text-red-400 hover:text-red-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-2">
                <input type="text" value={fee.name} onChange={(e) => updateOtherFee(idx, { name: e.target.value })} className={inputClass} placeholder="Charge name" />
                <input type="text" value={fee.description} onChange={(e) => updateOtherFee(idx, { description: e.target.value })} className={inputClass} placeholder="Charge description" />
                <div className="grid grid-cols-3 gap-2">
                  <input type="text" value={fee.cost} onChange={(e) => updateOtherFee(idx, { cost: e.target.value })} className={`${inputClass} col-span-2`} placeholder="Cost" />
                  <select value={fee.currency} onChange={(e) => updateOtherFee(idx, { currency: e.target.value })} className={`${inputClass} cursor-pointer`}>
                    {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="mt-3 border-dashed"
          onClick={() => {
            if (fees.otherFees.length >= 20) return toast.error('Maximum number of charges reached');
            onChange({ otherFees: [...fees.otherFees, { ...EMPTY_FEE }] });
          }}
        >
          <Plus className="mr-1 h-4 w-4" /> Add Charge
        </Button>
      </div>
    </div>
  );
}
