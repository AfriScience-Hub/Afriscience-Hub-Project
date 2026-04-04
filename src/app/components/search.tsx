'use client';

import { useState } from 'react';
import { X, Search as SearchIcon, Building2, Users, Microscope, Lightbulb, Trophy } from 'lucide-react';
import Link from 'next/link';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-40 overflow-y-auto max-w-full hide-scrollbar mx-auto">
      {/* Header with close button */}
      <div className="flex justify-end p-4" >
        <button
          onClick={onClose}
          className="p-2 mt-14 text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
        >
          <X size={28} />
        </button>
      </div>
      <div className="justify-center bg-white border-b border-gray-200 px-6 py-4 flex items-center">
        <h1 className="text-2xl font-bold text-gray-900">Explore the Ecosystem</h1>
      </div>

      {/* Search Input */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="relative mb-12">
          <input
            type="text"
            placeholder="Search institutes, scientists, innovations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-3 pl-12 border border-gray-300 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <SearchIcon size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-600" />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Institutes Card */}
          <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <Building2 size={28} className="text-red-600" />
              <Link href="/institutes" className="text-red-600 hover:text-red-700 font-medium text-sm flex items-center gap-1">
                Explore <span>→</span>
              </Link>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Institutes</h3>
            <p className="text-gray-600 text-sm mb-4">
              Find top African research institutes and universities.
            </p>
            <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-3">
              Popular / Featured
            </div>
            <ul className="space-y-2">
              <li className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-red-600 mt-1">•</span>
                <span>University of Cape Town</span>
              </li>
              <li className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-red-600 mt-1">•</span>
                <span>Makerere University</span>
              </li>
              <li className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-red-600 mt-1">•</span>
                <span>Cairo University</span>
              </li>
            </ul>
          </div>

          {/* Scientists Card */}
          <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <Users size={28} className="text-red-600" />
              <Link href="/scientists" className="text-red-600 hover:text-red-700 font-medium text-sm flex items-center gap-1">
                Explore <span>→</span>
              </Link>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Scientists</h3>
            <p className="text-gray-600 text-sm mb-4">
              Connect with leading experts across various fields.
            </p>
            <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-3">
              Popular / Featured
            </div>
            <ul className="space-y-2">
              <li className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-red-600 mt-1">•</span>
                <span>Dr. Sarah K.</span>
              </li>
              <li className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-red-600 mt-1">•</span>
                <span>Prof. Ahmed M.</span>
              </li>
              <li className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-red-600 mt-1">•</span>
                <span>Dr. Ngozi O.</span>
              </li>
            </ul>
          </div>

          {/* Specialist Centers Card */}
          <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <Microscope size={28} className="text-red-600" />
              <Link href="/centers" className="text-red-600 hover:text-red-700 font-medium text-sm flex items-center gap-1">
                Explore <span>→</span>
              </Link>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Specialist Centers</h3>
            <p className="text-gray-600 text-sm mb-4">
              Discover specialized hubs for advanced research.
            </p>
            <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-3">
              Popular / Featured
            </div>
            <ul className="space-y-2">
              <li className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-red-600 mt-1">•</span>
                <span>Kenya Medical Research Institute</span>
              </li>
              <li className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-red-600 mt-1">•</span>
                <span>CSIR South Africa</span>
              </li>
            </ul>
          </div>

          {/* Afro-Innovations Card */}
          <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <Lightbulb size={28} className="text-red-600" />
              <Link href="/innovations" className="text-red-600 hover:text-red-700 font-medium text-sm flex items-center gap-1">
                Explore <span>→</span>
              </Link>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Afro-Innovations</h3>
            <p className="text-gray-600 text-sm mb-4">
              Explore groundbreaking innovations from Africa.
            </p>
            <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-3">
              Popular / Featured
            </div>
            <ul className="space-y-2">
              <li className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-red-600 mt-1">•</span>
                <span>Solar Water Purifier</span>
              </li>
              <li className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-red-600 mt-1">•</span>
                <span>AgriTech Drone</span>
              </li>
              <li className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-red-600 mt-1">•</span>
                <span>Mobile Health App</span>
              </li>
            </ul>
          </div>

          {/* Competitions Card */}
          <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <Trophy size={28} className="text-red-600" />
              <Link href="/competitions" className="text-red-600 hover:text-red-700 font-medium text-sm flex items-center gap-1">
                Explore <span>→</span>
              </Link>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Competitions</h3>
            <p className="text-gray-600 text-sm mb-4">
              Participate in challenges and win awards.
            </p>
            <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-3">
              Popular / Featured
            </div>
            <ul className="space-y-2">
              <li className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-red-600 mt-1">•</span>
                <span>Africa Prize for Engineering</span>
              </li>
              <li className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-red-600 mt-1">•</span>
                <span>Innovation Challenge 2024</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
