'use client';

import React, { useState } from 'react';
import { Search, Filter, MoreHorizontal, Vote } from 'lucide-react';

const mockVoting = [
  { id: 1, competition: 'AI Africa Challenge', category: 'Senior Secondary', votes: 3921, status: 'Active', endsIn: '2 days' },
  { id: 2, competition: 'Afri-Anime Finals', category: 'Open', votes: 2145, status: 'Active', endsIn: '5 days' },
  { id: 3, competition: 'Afri-Presentations', category: 'Undergraduates', votes: 1876, status: 'Ended', endsIn: '—' },
];

export default function VotingPage() {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-neutral-gray-medium mb-1">
            <span>Dashboard</span><span>›</span><span>Categories</span><span>›</span>
            <span className="text-neutral-black font-medium">Voting</span>
          </div>
          <h1 className="text-2xl font-bold text-neutral-black flex items-center gap-2">
            <Vote className="h-6 w-6 text-red-600" />
            Voting
          </h1>
          <p className="text-sm text-neutral-gray-dark mt-1">Monitor live voting across competitions.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm">
          <p className="text-xs text-neutral-gray-medium">Total Votes Today</p>
          <p className="text-2xl font-bold text-neutral-black mt-1">3,921</p>
          <p className="text-xs text-green-600 mt-1">↑ 15.2% today</p>
        </div>
        <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm">
          <p className="text-xs text-neutral-gray-medium">Active Polls</p>
          <p className="text-2xl font-bold text-neutral-black mt-1">2</p>
        </div>
        <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm">
          <p className="text-xs text-neutral-gray-medium">Total All-Time Votes</p>
          <p className="text-2xl font-bold text-neutral-black mt-1">48,293</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-gray-medium" />
          <input type="text" placeholder="Search voting..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-neutral-gray-light focus:border-brand-red-600 focus:ring-1 focus:ring-brand-red-600 outline-none" />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-neutral-gray-light rounded-lg text-sm font-medium text-neutral-gray-dark hover:bg-neutral-bg-light cursor-pointer">
          <Filter className="h-4 w-4" /> Filters
        </button>
      </div>

      <div className="rounded-xl border border-neutral-gray-light bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-gray-light bg-neutral-bg-light">
                <th className="text-left px-4 py-3 font-medium text-neutral-gray-dark">Competition</th>
                <th className="text-left px-4 py-3 font-medium text-neutral-gray-dark">Category</th>
                <th className="text-left px-4 py-3 font-medium text-neutral-gray-dark">Status</th>
                <th className="text-left px-4 py-3 font-medium text-neutral-gray-dark">Votes</th>
                <th className="text-left px-4 py-3 font-medium text-neutral-gray-dark">Ends In</th>
                <th className="text-right px-4 py-3 font-medium text-neutral-gray-dark">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockVoting.map((v) => (
                <tr key={v.id} className="border-b border-neutral-gray-light last:border-0 hover:bg-neutral-bg-light/50">
                  <td className="px-4 py-3 font-medium text-neutral-black">{v.competition}</td>
                  <td className="px-4 py-3 text-neutral-gray-dark">{v.category}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${v.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-600'}`}>{v.status}</span>
                  </td>
                  <td className="px-4 py-3 font-medium text-neutral-black">{v.votes.toLocaleString()}</td>
                  <td className="px-4 py-3 text-neutral-gray-dark">{v.endsIn}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="p-1 hover:bg-neutral-bg-light rounded cursor-pointer"><MoreHorizontal className="h-4 w-4 text-neutral-gray-medium" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
