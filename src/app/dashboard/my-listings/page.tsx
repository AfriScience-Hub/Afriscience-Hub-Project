'use client';

import Link from 'next/link';
import { Edit, Eye, Plus, Star, ThumbsUp, Trash2, ExternalLink, Archive } from 'lucide-react';

const listings = [
  {
    title: 'SolaPump Pro',
    category: 'Afro-Innovation',
    status: 'Verified',
    tone: 'bg-green-100 text-green-700',
    stats: ['12,050', '3,400', '24'],
    image: 'from-sky-300 via-slate-500 to-emerald-300',
  },
  {
    title: 'AquaPure Filter System',
    category: 'Afro-Innovation',
    status: 'Verified',
    tone: 'bg-green-100 text-green-700',
    stats: ['3,230', '2,100', '18'],
    image: 'from-cyan-100 via-blue-200 to-slate-300',
  },
  {
    title: 'EcoBrick Builder',
    category: 'Afro-Innovation',
    status: 'Pending Verification',
    tone: 'bg-yellow-100 text-yellow-700',
    stats: ['1,450', '340', '3'],
    image: 'from-slate-900 via-slate-700 to-yellow-300',
  },
  {
    title: 'Dr. Amara Okafor - Scientist',
    category: 'Scientist / Technologist',
    status: 'Verified',
    tone: 'bg-green-100 text-green-700',
    stats: ['5,600', '1,230', '15'],
    image: 'from-emerald-200 via-lime-100 to-slate-300',
  },
];

export default function MyListingsPage() {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-950 lg:text-2xl">My Listings</h1>
          <p className="mt-1 text-xs text-gray-400 lg:text-sm">4 listings created</p>
        </div>
        <Link
          href="/dashboard/upload-new-listing"
          className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-red-500 px-4 py-2 text-xs font-semibold text-white hover:bg-red-600 lg:text-sm"
        >
          <Plus size={16} />
          <span>New Listing</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {listings.map((listing) => (
          <article key={listing.title} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className={`relative h-36 bg-gradient-to-r ${listing.image}`}>
              <div className="absolute inset-0 bg-black/10" />
              <span className={`absolute right-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold ${listing.tone}`}>
                {listing.status}
              </span>
            </div>
            <div className="p-4">
              <h2 className="text-sm font-bold text-gray-950 lg:text-base">{listing.title}</h2>
              <p className="mt-1 text-xs font-medium text-red-500">{listing.category}</p>
              <div className="mt-3 flex items-center gap-4 border-b border-gray-200 pb-3 text-xs text-gray-400">
                <span className="flex items-center gap-1"><Eye size={14} /> {listing.stats[0]}</span>
                <span className="flex items-center gap-1"><ThumbsUp size={14} /> {listing.stats[1]}</span>
                <span className="flex items-center gap-1"><Star size={14} /> {listing.stats[2]}</span>
              </div>
              <div className="mt-3 grid grid-cols-[1fr_1fr_auto_auto] gap-2">
                <button className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50">
                  <Edit size={13} /> Edit
                </button>
                <button className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50">
                  <ExternalLink size={13} /> Preview
                </button>
                <button className="grid h-9 w-9 cursor-pointer place-items-center rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50" aria-label="Archive listing">
                  <Archive size={15} />
                </button>
                <button className="grid h-9 w-9 cursor-pointer place-items-center rounded-md border border-gray-200 text-red-500 hover:bg-red-50" aria-label="Delete listing">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
