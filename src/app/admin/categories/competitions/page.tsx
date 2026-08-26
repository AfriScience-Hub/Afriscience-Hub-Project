'use client';

import React, { useState } from 'react';
import { Search, Filter, Plus, MoreHorizontal, Trophy } from 'lucide-react';

const mockCompetitions = [
  { id: 1, name: 'AI Africa Challenge 2026', type: 'Afri-Presentations', status: 'Active', participants: 245, deadline: '2026-03-15' },
  { id: 2, name: 'Afri-Anime Finals', type: 'Afri-Anime', status: 'Active', participants: 128, deadline: '2026-02-28' },
  { id: 3, name: 'Afri-Memes Season 3', type: 'Afri-Memes', status: 'Upcoming', participants: 0, deadline: '2026-04-01' },
];

export default function CompetitionsPage() {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-neutral-gray-medium mb-1">
            <span>Dashboard</span><span>›</span><span>Categories</span><span>›</span>
            <span className="text-neutral-black font-medium">Competitions</span>
          </div>
          <h1 className="text-2xl font-bold text-neutral-black flex items-center gap-2">
            <Trophy className="h-6 w-6 text-orange-600" />
            Competitions
          </h1>
          <p className="text-sm text-neutral-gray-dark mt-1">Manage competitions, submissions, and finalists.</p>
        </div>
        <button className="px-4 py-2 bg-brand-navy-900 text-white rounded-lg text-sm font-medium hover:bg-brand-navy-800 cursor-pointer flex items-center gap-2">
          <Plus className="h-4 w-4" /> Create Competition
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm">
          <p className="text-xs text-neutral-gray-medium">Total Competitions</p>
          <p className="text-2xl font-bold text-neutral-black mt-1">12</p>
        </div>
        <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm">
          <p className="text-xs text-neutral-gray-medium">Active</p>
          <p className="text-2xl font-bold text-neutral-black mt-1">7</p>
        </div>
        <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm">
          <p className="text-xs text-neutral-gray-medium">Total Participants</p>
          <p className="text-2xl font-bold text-neutral-black mt-1">1,842</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-gray-medium" />
          <input type="text" placeholder="Search competitions..." value={search} onChange={(e) => setSearch(e.target.value)}
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
                <th className="text-left px-4 py-3 font-medium text-neutral-gray-dark">Name</th>
                <th className="text-left px-4 py-3 font-medium text-neutral-gray-dark">Type</th>
                <th className="text-left px-4 py-3 font-medium text-neutral-gray-dark">Status</th>
                <th className="text-left px-4 py-3 font-medium text-neutral-gray-dark">Participants</th>
                <th className="text-left px-4 py-3 font-medium text-neutral-gray-dark">Deadline</th>
                <th className="text-right px-4 py-3 font-medium text-neutral-gray-dark">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockCompetitions.map((c) => (
                <tr key={c.id} className="border-b border-neutral-gray-light last:border-0 hover:bg-neutral-bg-light/50">
                  <td className="px-4 py-3 font-medium text-neutral-black">{c.name}</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-600">{c.type}</span></td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${c.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'}`}>{c.status}</span>
                  </td>
                  <td className="px-4 py-3 text-neutral-gray-dark">{c.participants}</td>
                  <td className="px-4 py-3 text-neutral-gray-dark">{c.deadline}</td>
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
