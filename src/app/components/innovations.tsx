/* eslint-disable @next/next/no-img-element */
'use client';

import Link from 'next/link';

interface Innovation {
  id: number;
  title: string;
  category: string;
  creator: string;
  image: string;
  status: string;
}

const innovations: Innovation[] = [
  {
    id: 1,
    title: 'SolaPump Pro',
    category: 'Affordable & Clean Energy',
    creator: 'Engr. Chidi Okonkwo',
    image: 'https://images.unsplash.com/photo-1509391366360-189c33dd5aab?w=600&h=500&fit=crop',
    status: 'ONLINE'
  },
  {
    id: 2,
    title: 'MalariaScope AI',
    category: 'Good Health & Well-Being',
    creator: 'Dr. Wanjiku Muthoni',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=500&fit=crop',
    status: 'ONLINE'
  },
  {
    id: 3,
    title: 'EcoBrick Builder',
    category: 'Sustainable Cities & Communities',
    creator: 'Kwame Asante',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&h=500&fit=crop',
    status: 'ONLINE'
  }
];

export default function TrendingInnovations() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex md:flex-row md:items-end md:justify-between mb-12">
          <div className='flex-2 lg:flex-none'>
            <h2 className="text-md lg:text-2xl font-bold text-gray-900">
              Trending Innovations
            </h2>
            <p className="text-xs lg:text-sm text-gray-600">
              Breakthrough solutions tackling African challenges.
            </p>
          </div>
          <Link
            href="/innovations"
            className="text-red-600 hover:text-red-700 flex-1 lg:flex-none text-xs lg:text-lg font-slim mt-4 md:mt-0 inline-block"
          >
            View All →
          </Link>
        </div>

        {/* Innovation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {innovations.map((innovation) => (
            <div
              key={innovation.id}
              className="relative h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group"
            >
              {/* Background Image */}
              <img
                src={innovation.image}
                alt={innovation.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Dark Overlay Gradient */}
              <div className="absolute inset-0 bg-black/60"></div>

              {/* Status Badge */}
              <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded font-semibold lg:font-bold text-xs lg:text-sm">
                {innovation.status}
              </div>

              {/* Category Badge */}
              <div className="absolute top-4 right-4 bg-gray-50/60 backdrop-blur truncate w-40  text-gray-900 px-3 py-1 rounded text-xs font-medium">
                {innovation.category}
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="text-md md:text-xl font-bold text-white mb-1">
                  {innovation.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  by {innovation.creator}
                </p>

                {/* Learn More Button */}
                <button className="w-full bg-white hover:bg-gray-100 cursor-pointer text-gray-900 font-semibold py-3 rounded-lg transition-colors duration-300">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
