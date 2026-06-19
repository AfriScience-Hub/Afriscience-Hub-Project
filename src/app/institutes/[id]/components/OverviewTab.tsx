'use client';

import {
  Building2, CheckCircle, Flag, ShieldCheck, Trophy
} from 'lucide-react';

interface Institute {
  [key: string]: any;
}

export default function OverviewTab({ institute }: { institute: Institute }) {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {institute.description && (
        <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
          <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
            <Building2 className="h-5 w-5 text-brand-red-600" /> Institute Overview
          </h3>
          <p className="text-neutral-gray-dark leading-relaxed">
            {institute.description}
          </p>
        </section>
      )}

      <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
        <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-brand-red-600" /> Services
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {institute.services?.map((service: string, idx: number) => (
            <div key={idx} className="flex items-center gap-3 p-3 rounded-lg border border-neutral-gray-light bg-neutral-bg-light/50">
              <div className="h-2 w-2 rounded-full bg-brand-red-600" />
              <span className="text-neutral-gray-dark text-sm font-medium">{service}</span>
            </div>
          ))}
        </div>
      </section>

      {institute.scopes && institute.scopes.length > 0 && (
        <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
          <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
            <Flag className="h-5 w-5 text-brand-navy-900" /> Scopes
          </h3>
          <div className="flex flex-wrap gap-2">
            {institute.scopes.map((scope: string, idx: number) => (
              <span key={idx} className="px-3 py-1.5 rounded-full bg-brand-navy-100 text-brand-navy-900 text-sm font-medium border border-brand-navy-100">
                {scope}
              </span>
            ))}
          </div>
        </section>
      )}

      {institute.policies && institute.policies.length > 0 && (
        <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
          <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-brand-navy-900" /> Policies
          </h3>
          <ul className="space-y-3">
            {institute.policies.map((policy: string, idx: number) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-neutral-gray-dark">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-brand-navy-900 flex-shrink-0" />
                {policy}
              </li>
            ))}
          </ul>
        </section>
      )}

      {institute.ranking && Array.isArray(institute.ranking) && institute.ranking.length > 0 && (
        <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
          <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-purple-600" /> Ranking
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {institute.ranking.map((rank: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-purple-50 border border-purple-100">
                <div>
                  <p className="text-sm font-bold text-neutral-black">{rank.name}</p>
                  <p className="text-xs text-neutral-gray-medium">{rank.year}</p>
                </div>
                <div className="px-3 py-1 rounded bg-white text-purple-700 font-bold text-sm shadow-sm border border-purple-100">
                  {rank.rank}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
