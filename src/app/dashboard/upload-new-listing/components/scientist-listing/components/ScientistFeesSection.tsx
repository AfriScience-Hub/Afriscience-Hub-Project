'use client';

import { Plus, X, DollarSign } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/app/components/ui/Button';
import CollapsibleSection from '../../CollapsibleSection';
import { CURRENCIES } from '../../../data';
import type { OtherCharge, ScientistFees, ServiceCharge } from '../types';

interface ScientistFeesSectionProps {
  services: string[];
  fees: ScientistFees;
  onChange: (patch: Partial<ScientistFees>) => void;
}

const EMPTY_CHARGE: OtherCharge = { name: '', description: '', cost: '', currency: 'USD' };
const DEFAULT_CHARGE: ServiceCharge = { description: '', costRange: '', currency: 'USD' };

export default function ScientistFeesSection({ services, fees, onChange }: ScientistFeesSectionProps) {
  const inputClass = 'w-full rounded-lg border border-neutral-gray-light px-3 py-2.5 text-sm focus:border-brand-red-600 focus:ring-1 focus:ring-brand-red-600';

  const updateServiceCost = (service: string, patch: Partial<ServiceCharge>) => {
    onChange({
      serviceCosts: {
        ...fees.serviceCosts,
        [service]: { ...DEFAULT_CHARGE, ...fees.serviceCosts[service], ...patch },
      },
    });
  };

  const updateCharge = (idx: number, patch: Partial<OtherCharge>) => {
    onChange({
      otherCharges: fees.otherCharges.map((charge, i) => (i === idx ? { ...charge, ...patch } : charge)),
    });
  };

  return (
    <CollapsibleSection title="Service Costs & Other Charges" icon={<DollarSign className="h-5 w-5 text-brand-red-600" />} defaultOpen={false}>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-neutral-black mb-1">
            Service Cost <span className="text-red-500">*</span>
            <span className="text-[10px] font-normal text-neutral-gray-medium"> (costs can be in USD or local currency — automatically lists all selected services)</span>
          </label>
          {services.length > 0 ? (
            <div className="space-y-3">
              {services.map((service, idx) => {
                const cost = fees.serviceCosts[service] || DEFAULT_CHARGE;
                return (
                  <div key={service} className="rounded-lg border border-neutral-gray-light bg-neutral-bg-light/50 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-red-600 text-[10px] font-bold text-white">{idx + 1}</span>
                      <p className="text-sm font-bold text-neutral-black">{service}</p>
                    </div>
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={cost.description}
                        onChange={(e) => updateServiceCost(service, { description: e.target.value })}
                        className={inputClass}
                        placeholder="Service description"
                      />
                      <div className="grid grid-cols-3 gap-2">
                        <input
                          type="text"
                          value={cost.costRange}
                          onChange={(e) => updateServiceCost(service, { costRange: e.target.value })}
                          className={`${inputClass} col-span-2`}
                          placeholder="Cost range e.g. 5,000 - 20,000"
                        />
                        <select
                          value={cost.currency}
                          onChange={(e) => updateServiceCost(service, { currency: e.target.value })}
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
            Other Charges <span className="text-red-500">*</span>
            <span className="text-[10px] font-normal text-neutral-gray-medium"> (multiple entries allowed)</span>
          </label>
          <div className="space-y-3">
            {fees.otherCharges.map((charge, idx) => (
              <div key={idx} className="rounded-lg border border-neutral-gray-light p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-neutral-gray-medium">
                    <DollarSign className="h-3.5 w-3.5" /> Charge {idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => onChange({ otherCharges: fees.otherCharges.filter((_, i) => i !== idx) })}
                    className="cursor-pointer text-red-400 hover:text-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="space-y-2">
                  <input type="text" value={charge.name} onChange={(e) => updateCharge(idx, { name: e.target.value })} className={inputClass} placeholder="Charge name" />
                  <input type="text" value={charge.description} onChange={(e) => updateCharge(idx, { description: e.target.value })} className={inputClass} placeholder="Charge description" />
                  <div className="grid grid-cols-3 gap-2">
                    <input type="text" value={charge.cost} onChange={(e) => updateCharge(idx, { cost: e.target.value })} className={`${inputClass} col-span-2`} placeholder="Cost" />
                    <select value={charge.currency} onChange={(e) => updateCharge(idx, { currency: e.target.value })} className={`${inputClass} cursor-pointer`}>
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
              if (fees.otherCharges.length >= 20) return toast.error('Maximum number of charges reached');
              onChange({ otherCharges: [...fees.otherCharges, { ...EMPTY_CHARGE }] });
            }}
          >
            <Plus className="mr-1 h-4 w-4" /> Add Charge
          </Button>
        </div>
      </div>
    </CollapsibleSection>
  );
}
