'use client';

import { useState } from 'react';
import { HandCoins, ExternalLink, Search, X, ChevronDown, CheckCircle2, XCircle, Clock } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/app/components/ui/Button';
import { MOCK_DONATIONS, DONATION_PROGRAMS, DONATION_YEARS, type Donation } from '../data';
import { cn } from '@/lib/utils';

export default function Donations() {
  const [programFilter, setProgramFilter] = useState('All Programs');
  const [yearFilter, setYearFilter] = useState('All Years');
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);

  const filtered = MOCK_DONATIONS.filter(d => {
    const matchProgram = programFilter === 'All Programs' || d.program === programFilter;
    const matchYear = yearFilter === 'All Years' || d.date.startsWith(yearFilter);
    return matchProgram && matchYear;
  });

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <HandCoins className="h-6 w-6 text-brand-red-600" />
            <div>
              <h2 className="text-xl font-bold text-neutral-black">Donations</h2>
              <p className="text-sm text-neutral-gray-medium">View and manage your donation history.</p>
            </div>
          </div>
          <Link href="/donate">
            <Button className="bg-brand-red-600 hover:bg-brand-red-700">
              <HandCoins className="h-4 w-4 mr-1" /> Make Donations
            </Button>
          </Link>
        </div>
      </div>

      <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-gray-medium pointer-events-none" />
            <select
              value={programFilter}
              onChange={e => setProgramFilter(e.target.value)}
              className="w-full rounded-lg border border-neutral-gray-light pl-10 pr-8 py-2 text-sm appearance-none bg-white focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
            >
              {DONATION_PROGRAMS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-gray-medium pointer-events-none" />
          </div>
          <div className="relative w-32">
            <select
              value={yearFilter}
              onChange={e => setYearFilter(e.target.value)}
              className="w-full rounded-lg border border-neutral-gray-light px-3 py-2 text-sm appearance-none bg-white focus:ring-1 focus:ring-brand-red-600 focus:border-brand-red-600"
            >
              {DONATION_YEARS.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-gray-medium pointer-events-none" />
          </div>
          {(programFilter !== 'All Programs' || yearFilter !== 'All Years') && (
            <button
              onClick={() => { setProgramFilter('All Programs'); setYearFilter('All Years'); }}
              className="text-xs text-brand-red-600 hover:text-brand-red-700 font-medium flex items-center gap-1"
            >
              <X className="h-3 w-3" /> Clear Filters
            </button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-gray-light">
                <th className="text-left py-3 px-2 font-semibold text-neutral-black text-xs uppercase tracking-wider">Reference</th>
                <th className="text-left py-3 px-2 font-semibold text-neutral-black text-xs uppercase tracking-wider">Program</th>
                <th className="text-left py-3 px-2 font-semibold text-neutral-black text-xs uppercase tracking-wider">Amount</th>
                <th className="text-left py-3 px-2 font-semibold text-neutral-black text-xs uppercase tracking-wider">Date</th>
                <th className="text-left py-3 px-2 font-semibold text-neutral-black text-xs uppercase tracking-wider">Status</th>
                <th className="text-right py-3 px-2 font-semibold text-neutral-black text-xs uppercase tracking-wider">Details</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-neutral-gray-medium text-sm">No donations found.</td>
                </tr>
              ) : (
                filtered.map(donation => (
                  <tr key={donation.id} className="border-b border-neutral-gray-light last:border-0 hover:bg-neutral-bg-light transition-colors">
                    <td className="py-3 px-2 font-medium text-neutral-black">{donation.referenceNo}</td>
                    <td className="py-3 px-2 text-neutral-gray-dark">{donation.program}</td>
                    <td className="py-3 px-2 font-semibold text-neutral-black">{donation.currency} {donation.amount}</td>
                    <td className="py-3 px-2 text-neutral-gray-dark">{donation.date}</td>
                    <td className="py-3 px-2">
                      <span className={cn(
                        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold",
                        donation.status === 'Completed' ? "bg-green-50 text-green-700" :
                        donation.status === 'Pending' ? "bg-amber-50 text-amber-700" :
                        "bg-red-50 text-red-700"
                      )}>
                        {donation.status === 'Completed' ? <CheckCircle2 className="h-3 w-3" /> :
                         donation.status === 'Pending' ? <Clock className="h-3 w-3" /> :
                         <XCircle className="h-3 w-3" />}
                        {donation.status}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <button
                        onClick={() => setSelectedDonation(donation)}
                        className="inline-flex items-center gap-1 text-brand-red-600 hover:text-brand-red-700 text-xs font-medium"
                      >
                        View <ExternalLink className="h-3 w-3" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-neutral-gray-medium mt-4">{filtered.length} donation{filtered.length !== 1 ? 's' : ''}</p>
      </div>

      {selectedDonation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-neutral-black">Donation Details</h3>
              <button onClick={() => setSelectedDonation(null)} className="text-slate-400 hover:text-neutral-black transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-neutral-gray-light">
                <span className="text-sm text-neutral-gray-medium">Reference No</span>
                <span className="text-sm font-semibold text-neutral-black">{selectedDonation.referenceNo}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-neutral-gray-light">
                <span className="text-sm text-neutral-gray-medium">Program</span>
                <span className="text-sm font-semibold text-neutral-black">{selectedDonation.program}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-neutral-gray-light">
                <span className="text-sm text-neutral-gray-medium">Amount</span>
                <span className="text-sm font-semibold text-neutral-black">{selectedDonation.currency} {selectedDonation.amount}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-neutral-gray-light">
                <span className="text-sm text-neutral-gray-medium">Date</span>
                <span className="text-sm font-semibold text-neutral-black">{selectedDonation.date}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-neutral-gray-light">
                <span className="text-sm text-neutral-gray-medium">Status</span>
                <span className={cn(
                  "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold",
                  selectedDonation.status === 'Completed' ? "bg-green-50 text-green-700" :
                  selectedDonation.status === 'Pending' ? "bg-amber-50 text-amber-700" :
                  "bg-red-50 text-red-700"
                )}>
                  {selectedDonation.status === 'Completed' ? <CheckCircle2 className="h-3.5 w-3.5" /> :
                   selectedDonation.status === 'Pending' ? <Clock className="h-3.5 w-3.5" /> :
                   <XCircle className="h-3.5 w-3.5" />}
                  {selectedDonation.status}
                </span>
              </div>
            </div>
            <div className="mt-6">
              <Button onClick={() => setSelectedDonation(null)} className="w-full bg-brand-red-600 hover:bg-brand-red-700">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
