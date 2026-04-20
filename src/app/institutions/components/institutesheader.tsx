'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { MdSchool, MdApartment } from 'react-icons/md';

export default function InstitutesHeader() {
  const [activeTab, setActiveTab] = useState('primary');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="sticky top-16 z-40 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-16 py-8 ">
        {/* Header Content */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-8">
          {/* Left Section - Title and Subtitle */}
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
              Institutes Directory
            </h1>
            <p className="text-md text-gray-500">
              Discover top educational centers across Africa
            </p>
          </div>

          {/* Right Section - Search Bar */}
          <div className="flex-1 lg:max-w-md">
            <div className="relative text-black">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search schools, location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="flex gap-1 bg-gray-100 w-fit p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('primary')}
            className={`flex items-center gap-2 px-6 cursor-pointer py-3 shadow-sm rounded-lg font-semibold transition-colors border ${
              activeTab === 'primary'
                ? 'bg-white text-red-500 border-white'
                : 'bg-gray-200 text-gray-500 border-gray-200 hover:border-gray-300'
            }`}
          >
            <MdSchool className="w-5 h-5" />
            Primary & Secondary
          </button>
          <button
            onClick={() => setActiveTab('universities')}
            className={`flex items-center gap-2 px-6 py-3 cursor-pointer shadow-sm rounded-lg font-semibold transition-colors border ${
              activeTab === 'universities'
                ? 'bg-white text-red-500 border-white'
                : 'bg-gray-200 text-gray-500 border-gray-200 hover:border-gray-300'
            }`}
          >
            <MdApartment className="w-5 h-5" />
            Universities
          </button>
        </div>
      </div>
    </div>
  );
}
