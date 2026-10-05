'use client';

import {
  Briefcase, PenTool, Flag, DollarSign, FileText
} from 'lucide-react';
import InfoTooltip from '@/app/components/ui/InfoTooltip';
import { SCIENTIST_SERVICE_DESCRIPTIONS } from '../../data';

interface ProfileTabProps {
  scientist: any;
}

export default function ProfileTab({ scientist }: ProfileTabProps) {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Bio */}
      <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
        <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-brand-navy-900" /> Professional Bio
        </h3>
        <p className="text-neutral-gray-dark leading-relaxed">
          {scientist.bio}
        </p>
      </section>

      {/* Services */}
      <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
        <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
          <PenTool className="h-5 w-5 text-brand-red-600" /> Services
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(scientist.services || []).map((service: string, idx: number) => (
            <div key={idx} className="flex items-center gap-3 p-3 rounded-lg border border-neutral-gray-light bg-neutral-bg-light/50">
              <div className="h-2 w-2 rounded-full bg-brand-red-600 flex-shrink-0" />
              <span className="text-neutral-gray-dark text-sm font-medium flex-1">{service}</span>
              {SCIENTIST_SERVICE_DESCRIPTIONS[service] && <InfoTooltip text={SCIENTIST_SERVICE_DESCRIPTIONS[service]} />}
            </div>
          ))}
        </div>
      </section>

      {/* Scopes */}
      {scientist.scopes && (
        <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
          <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
            <Flag className="h-5 w-5 text-brand-navy-900" /> Specialized Scopes
          </h3>
          <div className="flex flex-wrap gap-2">
            {scientist.scopes.map((scope: string, idx: number) => (
              <span key={idx} className="px-3 py-1.5 rounded-full bg-brand-navy-100 text-brand-navy-900 text-sm font-medium border border-brand-navy-100">
                {scope}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Service Costs */}
      <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
        <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-green-600" /> Service Costs
        </h3>
        {scientist.serviceCost && scientist.serviceCost.length > 0 ? (
          <div className="overflow-hidden rounded-lg border border-neutral-gray-light">
            <table className="w-full text-sm text-left">
              <thead className="bg-neutral-bg-light text-neutral-gray-dark font-semibold border-b border-neutral-gray-light">
                <tr>
                  <th className="px-4 py-3">Service</th>
                  <th className="px-4 py-3">Estimated Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-gray-light">
                {scientist.serviceCost.map((cost: any, idx: number) => (
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

      {/* Other Charges */}
      <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
        <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-amber-600" /> Other Charges
        </h3>
        {scientist.otherFees && scientist.otherFees.length > 0 ? (
          <div className="overflow-hidden rounded-lg border border-neutral-gray-light">
            <table className="w-full text-sm text-left">
              <thead className="bg-neutral-bg-light text-neutral-gray-dark font-semibold border-b border-neutral-gray-light">
                <tr>
                  <th className="px-4 py-3">Charge</th>
                  <th className="px-4 py-3">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-gray-light">
                {scientist.otherFees.map((fee: any, idx: number) => (
                  <tr key={idx} className="hover:bg-neutral-bg-light/50">
                    <td className="px-4 py-3 font-medium text-neutral-black">{fee.name}</td>
                    <td className="px-4 py-3 text-brand-navy-900 font-bold">{fee.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-neutral-gray-medium italic">No additional charges listed.</p>
        )}
      </section>

      {/* Engagement Policies */}
      <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
        <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5 text-neutral-gray-dark" /> Engagement Policies
        </h3>
        <ul className="list-disc list-inside space-y-2 text-sm text-neutral-gray-dark">
          {(scientist.policies || []).map((policy: string, idx: number) => (
            <li key={idx}>{policy}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
