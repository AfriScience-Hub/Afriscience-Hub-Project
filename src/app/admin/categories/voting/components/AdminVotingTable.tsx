'use client';

import Image from 'next/image';

interface FinalistRow {
  id: string;
  name: string;
  competition: string;
  category: string;
  year: number;
  country: string;
  image: string;
  votes: number;
  position: number;
  afriScienceScore: number;
  overallPerformance: number;
}

interface Props {
  rows: FinalistRow[];
}

export default function AdminVotingTable({ rows }: Props) {
  if (rows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center rounded-xl border-2 border-dashed border-neutral-gray-light bg-white">
        <p className="font-medium text-neutral-black">No finalists found</p>
        <p className="text-xs text-neutral-gray-medium mt-1">Try adjusting your filters or search.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-neutral-gray-light bg-white shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-gray-light bg-neutral-bg-light">
              <th className="text-left px-3 py-3 font-semibold text-neutral-gray-dark whitespace-nowrap">Rank</th>
              <th className="text-left px-3 py-3 font-semibold text-neutral-gray-dark">Finalist</th>
              <th className="text-left px-3 py-3 font-semibold text-neutral-gray-dark">Competition</th>
              <th className="text-left px-3 py-3 font-semibold text-neutral-gray-dark">Category</th>
              <th className="text-left px-3 py-3 font-semibold text-neutral-gray-dark">Year</th>
              <th className="text-left px-3 py-3 font-semibold text-neutral-gray-dark">Country</th>
              <th className="text-right px-3 py-3 font-semibold text-neutral-gray-dark">Votes</th>
              <th className="text-right px-3 py-3 font-semibold text-neutral-gray-dark">Score</th>
              <th className="text-right px-3 py-3 font-semibold text-neutral-gray-dark">Overall</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((f) => (
              <tr key={f.id} className="border-b border-neutral-gray-light last:border-0 hover:bg-neutral-bg-light/50">
                <td className="px-3 py-3">
                  <span className={`inline-flex h-6 min-w-6 px-1.5 items-center justify-center rounded-full text-xs font-bold ${f.position === 1 ? 'bg-amber-400 text-white' : f.position === 2 ? 'bg-slate-400 text-white' : f.position === 3 ? 'bg-amber-700 text-white' : 'bg-neutral-bg-light text-neutral-gray-dark border'}`}>
                    {f.position}
                  </span>
                </td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-2.5 min-w-[160px]">
                    <Image src={f.image} alt={f.name} width={32} height={32} className="rounded-full object-cover h-8 w-8 shrink-0" />
                    <span className="font-medium text-neutral-black whitespace-nowrap">{f.name}</span>
                  </div>
                </td>
                <td className="px-3 py-3 text-neutral-gray-dark whitespace-nowrap">{f.competition}</td>
                <td className="px-3 py-3 text-neutral-gray-dark whitespace-nowrap">{f.category}</td>
                <td className="px-3 py-3 text-neutral-gray-dark">{f.year}</td>
                <td className="px-3 py-3 text-neutral-gray-dark whitespace-nowrap">{f.country}</td>
                <td className="px-3 py-3 text-right font-semibold text-neutral-black">{f.votes.toLocaleString()}</td>
                <td className="px-3 py-3 text-right text-neutral-gray-dark">{f.afriScienceScore}</td>
                <td className="px-3 py-3 text-right text-neutral-gray-dark">{f.overallPerformance}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
