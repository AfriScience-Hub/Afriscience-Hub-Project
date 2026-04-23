'use client';

import { useState } from 'react';
import { Share2, Archive, MapPin, CheckCircle2, Star, ThumbsUp, MessageCircle, GitFork } from 'lucide-react';

// --- Interface for Institute Data ---
interface Institute {
  id: number;
  name: string;
  location: {
    city: string;
    country: string;
  };
  status: 'ONLINE' | 'OFFLINE';
  class: 'Primary' | 'Secondary' | 'Primary & Secondary';
  ownership: string; // From Filter options (Private, Mission, Govt, etc.)
  gender: 'Female' | 'Male' | 'Mixed' | 'Rather not say';
  rating: {
    stars: number; // e.g., 4.8
    count: number; // e.g., 156
  };
  stats: {
    likes: string; // e.g., "4.2k"
    messages: number; // e.g., 156
    forks: number; // e.g., 820
  };
  image: string; // URL to image
}

// --- Mock Data: 5 Schools based on the image ---
const instituteData: Institute[] = [
  {
    id: 1,
    name: "Lagos High School of Science & Tech",
    location: { city: "Lagos", country: "Nigeria" },
    status: "ONLINE",
    class: "Secondary",
    ownership: "Private",
    gender: "Mixed",
    rating: { stars: 4.8, count: 156 },
    stats: { likes: "4.2k", messages: 156, forks: 820 },
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=600&h=400&auto=format&fit=crop" // Gray building/empty space placeholder
  },
  {
    id: 2,
    name: "Cape Town Science Academy",
    location: { city: "Western Cape", country: "South Africa" },
    status: "OFFLINE",
    class: "Primary",
    ownership: "Private",
    gender: "Mixed",
    rating: { stars: 4.7, count: 56 },
    stats: { likes: "1.5k", messages: 56, forks: 180 },
    image: "https://images.unsplash.com/photo-1605333555239-4d6211832043?q=80&w=600&h=400&auto=format&fit=crop" // Apple on books
  },
  {
    id: 3,
    name: "St. Mary's Girls Academy",
    location: { city: "Greater Accra", country: "Ghana" },
    status: "OFFLINE",
    class: "Secondary",
    ownership: "Mission",
    gender: "Female",
    rating: { stars: 4.6, count: 112 },
    stats: { likes: "2.8k", messages: 112, forks: 410 },
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=600&h=400&auto=format&fit=crop" // Kids with backpacks
  },
  {
    id: 4,
    name: "Cairo International School",
    location: { city: "Cairo", country: "Egypt" },
    status: "ONLINE",
    class: "Secondary",
    ownership: "International",
    gender: "Mixed",
    rating: { stars: 4.9, count: 205 },
    stats: { likes: "4.1k", messages: 205, forks: 720 },
    image: "https://images.unsplash.com/photo-1521791136064-7986c292321d?q=80&w=600&h=400&auto=format&fit=crop" // Placeholder image for Cairo
  },
  {
    id: 5,
    name: "Kigali Boys High",
    location: { city: "Kigali City", country: "Rwanda" },
    status: "OFFLINE",
    class: "Secondary",
    ownership: "Government | Public",
    gender: "Male",
    rating: { stars: 4.4, count: 78 },
    stats: { likes: "1.8k", messages: 78, forks: 200 },
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=600&h=400&auto=format&fit=crop" // Kigali Boys High Placeholder
  }
];

// --- Institute Card Sub-Component ---
const InstituteCard = ({ institute }: { institute: Institute }) => (
  <div className="bg-white border border-gray-100 shadow-sm rounded-3xl overflow-hidden flex flex-col hover:border-red-100 transition-colors group">
    {/* Image Header with overlays */}
    <div className="relative aspect-3/2 overflow-hidden">
      <img 
        src={institute.image} 
        alt={institute.name} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      {/* Aspect Ratio Constraint for Image Header */}
      <div className="absolute inset-0 aspect-[16/9] overflow-hidden">
        <img 
          src={institute.image} 
          alt={institute.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Overlays */}
      <div className="absolute top-4 left-4 flex gap-2">
        <div className="w-8 h-8 rounded-full bg-[#0F1D33] text-white flex items-center justify-center font-bold text-sm">
          {institute.id}
        </div>
      </div>
      <div className="absolute top-4 right-4 flex gap-2">
        <button className="w-8 h-8 rounded-full bg-white text-gray-400 flex items-center justify-center hover:bg-gray-100">
          <Share2 size={16} />
        </button>
        <button className="w-8 h-8 rounded-full bg-white text-gray-400 flex items-center justify-center hover:bg-gray-100">
          <Archive size={16} />
        </button>
      </div>

      {/* Status Badge */}
      <div className={`absolute bottom-4 left-4 px-3 py-1 rounded text-xs font-bold ${
        institute.status === 'ONLINE' ? 'bg-red-500 text-white' : 'bg-white text-black'
      }`}>
        {institute.status}
      </div>
    </div>

    {/* Content Body */}
    <div className="p-5  flex flex-col grow">
      {/* Title & Verified Badge */}
      <div className="flex items-center justify-between gap-3 mb-1.5">
        <h3 className={`text-md text-black font-bold hover:text-red-500 leading-tight`}>
          {institute.name}
        </h3>
        <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
      </div>

      {/* Location */}
      <div className="flex items-center gap-2 text-gray-400 text-xs mb-4">
        <MapPin size={14} className="shrink-0" />
        <span>{institute.location.city}, {institute.location.country}</span>
      </div>

      {/* Data Table */}
      <div className="bg-gray-50 border border-gray-100 rounded-t-lg py-3 px-4 grid grid-cols-3 gap-x-2 gap-y-1 text-start">
        <span className="text-xs text-gray-400">Class</span>
        <span className="text-xs text-gray-400">Ownership</span>
        <span className="text-xs text-gray-400">Gender</span>
        <span className="text-xs font-normal text-gray-900 truncate">{institute.class}</span>
        <span className="text-xs font-normal text-gray-900 truncate">{institute.ownership}</span>
        <span className="text-xs font-normal text-gray-900 truncate">{institute.gender}</span>
      </div>

      {/* Rating */}
      <div className="text-xs text-gray-400 flex flex-col mb-4 bg-gray-50 px-4">
        <span>Rating</span>
        <div className="flex items-center gap-1 mt-1.5">
          <Star size={12} className="text-amber-500 fill-amber-500" />
          <span className="text-xs font-bold text-amber-500">{institute.rating.stars.toFixed(1)}</span>
          <span className="text-xs font-semibold text-gray-400">({institute.rating.count} reviews)</span>
        </div>
      </div>

      {/* Spacer and Bottom Stats */}
      <div className="mt-auto border-t px-2 border-gray-100 pt-4 grid grid-cols-3 gap-2 text-xs font-semibold text-gray-400">
        <div className="flex items-center gap-1.5">
          <ThumbsUp size={12} className="text-gray-300" />
          {institute.stats.likes}
        </div>
        <div className="flex items-center gap-1.5">
          <MessageCircle size={12} className="text-gray-300" />
          {institute.stats.messages}
        </div>
        <div className="flex items-center gap-1.5">
          <GitFork size={12} className="text-gray-300" />
          {institute.stats.forks}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <button className="py-2.5 cursor-pointer bg-white text-gray-900 border border-gray-200 rounded-lg text-sm font-bold hover:bg-gray-200">
          Details
        </button>
        <button className="py-2.5 cursor-pointer bg-black text-white rounded-lg text-sm font-bold hover:bg-[#13223f]">
          Contact
        </button>
      </div>
    </div>
  </div>
);

// --- Institutes Results Component (Page-level component to be side-by-side with Filter) ---
export default function InstitutesResults({ data }: { data: Institute[] }) {
  const [resultsCount, setResultsCount] = useState(instituteData.length); // Hardcoded to 5 based on data

  return (
    <main className="p-4 md:p-8 bg-white"> 
      {/* Sub Header for Sorting & Results */}
      <div className="flex items-center justify-between mb-8 gap-4 pb-4 border-b border-gray-100">
        <p className="text-gray-500 text-xs">
          Showing <span className="font-bold text-gray-900">{resultsCount} results</span>
        </p>
        <div className="flex items-center gap-2.5 text-xs text-gray-500">
          Sort by:
          <button className="font-bold text-gray-900 flex items-center gap-1">
            Recommended
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 4.5L6 7.5L3 4.5" stroke="#111827" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </div>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"> {/* Column grid of 2 for md screens and up */}
        {instituteData.map((institute) => (
          <InstituteCard key={institute.id} institute={institute} />
        ))}
      </div>

      {data.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          No institutes match your current filters.
        </div>
      )}
    </main>
  );
}