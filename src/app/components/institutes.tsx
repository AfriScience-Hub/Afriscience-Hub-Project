/* eslint-disable @next/next/no-img-element */
'use client';

import Link from 'next/link';
import { Star, MapPin } from 'lucide-react';

interface Institute {
  id: number;
  name: string;
  image: string;
  badge: string;
  rating: number;
  location: string;
  description: string;
  tags: string[];
}

const institutes: Institute[] = [
  {
    id: 1,
    name: 'Pan-African University of Science',
    image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=600&h=400&fit=crop',
    badge: 'University',
    rating: 4.8,
    location: 'Nairobi, Kenya',
    description: 'Leading research university focusing on sustainable development and technology.',
    tags: ['Undergraduate Programs', 'Postgraduate Research']
  },
  {
    id: 2,
    name: 'Lagos High School of Science & Tech',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop',
    badge: 'Secondary School',
    rating: 4.8,
    location: 'Lagos, Nigeria',
    description: 'Lagos High School of Science & Tech is a premier secondary institution with a focus on STEM education, robotics, and future...',
    tags: ['Secondary Education', 'Robotics Club']
  },
  {
    id: 3,
    name: 'Cape Town Science Academy',
    image: 'https://images.unsplash.com/photo-1512032917802-6f06ad7cecc7?w=600&h=400&fit=crop',
    badge: 'Primary School',
    rating: 4.7,
    location: 'Cape Town, South Africa',
    description: 'Nurturing young minds through hands-on science experiments and discovery.',
    tags: ['Primary Education', 'Science Fairs']
  }
];

export default function TopRatedInstitutes() {
  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12 gap-3">
          <div className='flex-2 lg:flex-none'>
            <h2 className="text-md md:text-2xl font-bold text-gray-900">Top Rated Institutes</h2>
            <p className="text-xs md:text-sm text-gray-600">Discover verified educational centers of excellence.</p>
          </div>
          <Link href="/institutions" className="text-red-600 hover:text-red-700 font-slim text-xs lg:text-lg flex items-center gap-1 flex-1 lg:flex-none">
            View All <span>→</span>
          </Link>
        </div>

        {/* Institutes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {institutes.map((institute) => (
            <div
              key={institute.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image Container */}
              <div className="relative h-36 w-full bg-gray-300">
                <img
                  src={institute.image}
                  alt={institute.name}
                  className="w-full h-full object-cover"
                />
                {/* Badge */}
                <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
                  {institute.badge}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Name and Rating */}
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-md font-bold text-gray-900 flex-1">{institute.name}</h3>
                  <div className="text-sm flex items-center gap-1 ml-2 whitespace-nowrap">
                    <Star size={16} fill="#FFA500" className="text-orange-500" />
                    <span className="font-semibold text-gray-900">{institute.rating}</span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-1 text-xs text-gray-600 mb-3">
                  <MapPin size={16} className="text-gray-500" />
                  <span>{institute.location}</span>
                </div>

                {/* Description */}
                <p className="text-xs text-gray-600 mb-4">{institute.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {institute.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* View Profile Button */}
                <button className="w-full border border-gray-300 hover:border-gray-400 text-gray-900 hover:bg-gray-50 font-semibold py-2 px-4 rounded-lg transition-colors duration-300 cursor-pointer">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
