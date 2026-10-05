'use client';

import { Building2, PenTool, Flag, DollarSign, FileText } from 'lucide-react';
import InfoTooltip from '../../components/InfoTooltip';
import { SERVICE_DESCRIPTIONS } from '../../data';

interface ServiceCost {
  service: string;
  range: string;
}

interface OtherFee {
  name: string;
  amount: string;
}

interface OverviewTabProps {
  center: {
    description?: string;
    services?: string[];
    scopes?: string[];
    serviceCost?: ServiceCost[];
    otherFees?: OtherFee[];
    policies?: string[];
  };
}

export default function OverviewTab({ center }: OverviewTabProps) {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
        <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
          <Building2 className="h-5 w-5 text-brand-navy-900" /> About
        </h3>
        <p className="text-neutral-gray-dark leading-relaxed">{center.description}</p>
      </section>

      <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
        <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
          <PenTool className="h-5 w-5 text-brand-red-600" /> Services
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(center.services || []).map((service, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 rounded-lg border border-neutral-gray-light bg-neutral-bg-light/50">
              <div className="h-2 w-2 rounded-full bg-brand-red-600 flex-shrink-0" />
              <span className="text-neutral-gray-dark text-sm font-medium flex-1">{service}</span>
              {SERVICE_DESCRIPTIONS[service] && <InfoTooltip text={SERVICE_DESCRIPTIONS[service]} />}
            </div>
          ))}
        </div>
      </section>

      {center.scopes && center.scopes.length > 0 && (
        <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
          <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
            <Flag className="h-5 w-5 text-brand-navy-900" /> Specialized Scopes
          </h3>
          <div className="flex flex-wrap gap-2">
            {center.scopes.map((scope, idx) => (
              <span key={idx} className="px-3 py-1.5 rounded-full bg-brand-navy-100 text-brand-navy-900 text-sm font-medium border border-brand-navy-100">
                {scope}
              </span>
            ))}
          </div>
        </section>
      )}

      <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
        <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2 uppercase tracking-wide">
          <DollarSign className="h-5 w-5 text-green-600" /> Service Fees
        </h3>
        {center.serviceCost && center.serviceCost.length > 0 ? (
          <div className="overflow-hidden rounded-lg border border-neutral-gray-light">
            <table className="w-full text-sm text-left">
              <thead className="bg-neutral-bg-light text-neutral-gray-dark font-semibold border-b border-neutral-gray-light">
                <tr>
                  <th className="px-4 py-3">Service</th>
                  <th className="px-4 py-3">Estimated Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-gray-light">
                {center.serviceCost.map((cost, idx) => (
                  <tr key={idx} className="hover:bg-neutral-bg-light/50">
                    <td className="px-4 py-3 font-medium text-neutral-black">{cost.service}</td>
                    <td className="px-4 py-3 text-brand-navy-900 font-bold">{cost.range}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-neutral-gray-medium italic">Contact for pricing details.</p>
        )}
      </section>

      <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
        <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2 uppercase tracking-wide">
          <DollarSign className="h-5 w-5 text-amber-600" /> Other Fees
        </h3>
        {center.otherFees && center.otherFees.length > 0 ? (
          <div className="overflow-hidden rounded-lg border border-neutral-gray-light">
            <table className="w-full text-sm text-left">
              <thead className="bg-neutral-bg-light text-neutral-gray-dark font-semibold border-b border-neutral-gray-light">
                <tr>
                  <th className="px-4 py-3">Fee</th>
                  <th className="px-4 py-3">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-gray-light">
                {center.otherFees.map((fee, idx) => (
                  <tr key={idx} className="hover:bg-neutral-bg-light/50">
                    <td className="px-4 py-3 font-medium text-neutral-black">{fee.name}</td>
                    <td className="px-4 py-3 text-brand-navy-900 font-bold">{fee.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-neutral-gray-medium italic">No additional fees listed.</p>
        )}
      </section>

      <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
        <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5 text-neutral-gray-dark" /> Engagement Policies
        </h3>
        {center.policies && center.policies.length > 0 ? (
          <ul className="list-disc list-inside space-y-2 text-sm text-neutral-gray-dark">
            {center.policies.map((policy, idx) => (
              <li key={idx}>{policy}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-neutral-gray-medium italic">No policies listed.</p>
        )}
      </section>
    </div>
  );
}
