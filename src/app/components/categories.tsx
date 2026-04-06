'use client';

import Link from 'next/link';
import { Building2, Users, Microscope, Lightbulb, Trophy } from 'lucide-react';

interface Category {
  id: number;
  title: string;
  icon: React.ReactNode;
  image: string;
  href: string;
  highlight?: boolean;
}

const categories: Category[] = [
  {
    id: 1,
    title: 'Institutes',
    icon: <Building2 size={28} />,
    image: 'url(\'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=400&fit=crop\')',
    href: '/institutions'
  },
  {
    id: 2,
    title: 'Scientists',
    icon: <Users size={28} />,
    image: 'url(\'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop\')',
    href: '/scientists'
  },
  {
    id: 3,
    title: 'Specialist Centers',
    icon: <Microscope size={28} />,
    image: 'url(\'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&h=400&fit=crop\')',
    href: '/centers'
  },
  {
    id: 4,
    title: 'Afro-Innovations',
    icon: <Lightbulb size={28} />,
    image: 'url(\'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop\')',
    href: '/innovations'
  },
  {
    id: 5,
    title: 'Competitions',
    icon: <Trophy size={28} />,
    image: 'url(\'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop\')',
    href: '/competitions'
  }
];

export default function Categories() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Categories</h2>
          <p className="text-md text-gray-500">
            Navigate the AfriScience Hub® ecosystem by category.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link key={category.id} href={category.href}>
              <div className="transition-all duration-300 hover:-translate-y-2 cursor-pointer group">
                {/* Image Section */}
                <div
                  className="relative h-36 rounded-t-2xl overflow-hidden bg-cover bg-center"
                  style={{
                    backgroundImage: category.image,
                  }}
                >
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-[#0B1D35]/70 group-hover:bg-black/50 transition-colors duration-300"></div>

                  {/* Icon */}
                  <div className="absolute inset-0 flex justify-center items-center">
                    <div
                      className="flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300 bg-white text-gray-900 group-hover:bg-red-600 group-hover:text-white shadow-lg"
                    >
                      {category.icon}
                    </div>
                  </div>
                </div>

                {/* Title Section */}
                <div className="bg-gray-200 rounded-b-2xl p-4">
                  <div className="text-center">
                    <h3 className="text-sm font-bold transition-colors duration-300 text-gray-900 group-hover:text-red-600">
                      {category.title}
                    </h3>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
