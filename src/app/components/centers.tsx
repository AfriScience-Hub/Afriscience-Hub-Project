/* eslint-disable @next/next/no-img-element */
'use client';

import Link from 'next/link';
import { MapPin, Star, Microscope } from 'lucide-react';

interface Center {
  id: number;
  name: string;
  category: string;
  location: string;
  rating: number;
  description: string;
  image: string;
  services: string[];
}

const centers: Center[] = [
  {
    id: 1,
    name: 'Lagos Biomedical...',
    category: 'Medical',
    location: 'Lagos, Nigeria',
    rating: 4.8,
    description: 'Lagos Biomedical Diagnostics Center is a premier medical diagnostics facility offering cutting-edge...',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop',
    services: ['Diagnosis (Screening)', 'Result Interpretation', 'Research & Development']
  },
  {
    id: 2,
    name: 'Nairobi Environmental...',
    category: 'Environmental',
    location: 'Nairobi, Kenya',
    rating: 4.7,
    description: 'Specializing in climate change research, conservation biology, and sustainable resource management acros...',
    image: 'https://images.unsplash.com/photo-1604632992270-ce3650e46abb?w=600&h=400&fit=crop',
    services: ['Research & Development', 'Monitoring', 'Quality Control & Assurance']
  },
  {
    id: 3,
    name: 'Accra AgriTech...',
    category: 'Agriculture',
    location: 'Accra, Ghana',
    rating: 4.9,
    description: 'Cutting-edge agricultural technology center focused on food security, smart farming, and sustainable crop...',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&h=400&fit=crop',
    services: ['Research & Development', 'Diagnosis (Screening)', 'Training (Industrial)']
  }
];

export default function SpecialistCenters() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-2 lg:flex-none justify-between mb-12">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center gap-3 mb-3">
              <Microscope className="text-red-600 text-3xl"></Microscope>
              <h2 className="text-lg lg:text-2xl font-bold text-gray-900">
                Specialist Centers
              </h2>
            </div>
            <p className="text-xs lg:text-md text-gray-600">
              Discover specialized hubs for advanced research and services.
            </p>
          </div>
          <Link href="/institutions" className="text-red-600 hover:text-red-700 font-slim text-xs lg:text-lg flex items-center gap-1 flex-1 lg:flex-none">
            View All →
          </Link>
        </div>

        {/* Centers Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {centers.map((center) => (
            <div
              key={center.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative h-48 bg-gray-200 overflow-hidden">
                <img
                  src={center.image}
                  alt={center.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                {/* Category Badge */}
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-lg text-sm font-bold text-gray-900 shadow-md">
                  {center.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Title with Rating */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-sm lg:text-lg font-bold text-gray-900 leading-tight">
                    {center.name}
                  </h3>
                  <div className="flex items-center gap-1 whitespace-nowrap">
                    <Star size={18} className="text-yellow-400 fill-yellow-400" />
                    <span className="font-bold text-gray-900">{center.rating}</span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 mb-4 text-gray-600">
                  <MapPin size={16} className="text-gray-400 shrink-0" />
                  <span className="text-sm">{center.location}</span>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {center.description}
                </p>

                {/* Services Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {center.services.map((service, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
                    >
                      {service}
                    </span>
                  ))}
                </div>

                {/* View Center Button */}
                <button className="cursor-pointer w-full border-2 border-gray-300 hover:border-gray-400 text-gray-900 font-semibold py-3 rounded-lg transition-colors duration-300">
                  View Center
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
