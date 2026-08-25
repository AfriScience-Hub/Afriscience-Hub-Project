'use client';

import {
  Building2, CheckCircle, Flag, ShieldCheck, Trophy, MapPin, Calendar
} from 'lucide-react';

interface Institute {
  [key: string]: any;
}

export default function OverviewTab({ institute }: { institute: Institute }) {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
        <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
          <Building2 className="h-5 w-5 text-brand-red-600" /> Institute Overview
        </h3>
        <p className="text-neutral-gray-dark leading-relaxed">
          {institute.description}
        </p>

        {institute.yearEstablished && (
          <div className="mt-4 flex items-center gap-2 text-sm text-neutral-gray-dark">
            <Calendar className="h-4 w-4 text-neutral-gray-medium" />
            <span>Established: <strong>{institute.yearEstablished}</strong></span>
          </div>
        )}

        {institute.landmass && (
          <div className="mt-2 flex items-center gap-2 text-sm text-neutral-gray-dark">
            <MapPin className="h-4 w-4 text-neutral-gray-medium" />
            <span>Landmass: <strong>{institute.landmass}</strong></span>
          </div>
        )}

        {institute.campuses && institute.campuses.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-bold text-neutral-black mb-2">Campuses</h4>
            <div className="flex flex-wrap gap-2">
              {institute.campuses.map((c: string, i: number) => (
                <span key={i} className="text-xs px-2.5 py-1 rounded bg-brand-navy-50 text-brand-navy-900 border border-brand-navy-100">{c}</span>
              ))}
            </div>
          </div>
        )}

        {institute.subInstitutions && institute.subInstitutions.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-bold text-neutral-black mb-2">Sub-Institutions</h4>
            <div className="grid gap-2 sm:grid-cols-2">
              {institute.subInstitutions.map((inst: string, i: number) => (
                <div key={i} className="flex items-center gap-2 text-sm text-neutral-gray-dark">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-red-600 flex-shrink-0" />
                  {inst}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

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
            {institute.policies.map((policy: string, idx: number) => {
              const [title, ...rest] = policy.split(': ');
              return (
                <li key={idx} className="text-sm text-neutral-gray-dark">
                  <span className="font-bold text-neutral-black">{title}</span>
                  {rest.length > 0 && <span>: {rest.join(': ')}</span>}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {institute.ranking && Array.isArray(institute.ranking) && institute.ranking.length > 0 && (
        <section className="bg-white rounded-xl p-6 shadow-sm border border-neutral-gray-light">
          <h3 className="text-lg font-bold text-neutral-black mb-4 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-purple-600" /> Rankings
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {institute.ranking.map((rank: any, idx: number) => (
              <div key={idx} className="p-4 rounded-xl bg-purple-50 border border-purple-100">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm font-bold text-neutral-black">{rank.name}</p>
                  {rank.basis && <p className="text-[10px] text-neutral-gray-medium text-right ml-2 leading-tight">{rank.basis}</p>}
                </div>
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1 rounded bg-white text-purple-700 font-bold text-sm shadow-sm border border-purple-100">
                    {rank.current}
                  </div>
                  {rank.past && rank.past !== 'N/A' && (
                    <div className="text-xs text-neutral-gray-medium">
                      Past: <span className="font-medium text-neutral-gray-dark">{rank.past}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
