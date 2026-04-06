/* eslint-disable @next/next/no-img-element */
'use client';

import Link from 'next/link';
import { Calendar, Medal, Award, Trophy } from 'lucide-react';

interface Competition {
  id: number;
  title: string;
  category: string;
  description: string;
  deadline: string;
  image: string;
  prize: number;
}

interface Winner {
  id: number;
  name: string;
  award: string;
  location: string;
  image: string;
}

const competitions: Competition[] = [
  {
    id: 1,
    title: 'Afri - Anime: Malaria Fighters',
    category: 'Afri',
    description: 'Anime challenges young African creatives to explain complex scientific concepts through...',
    deadline: '6/30/2026',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=300&h=200&fit=crop',
    prize: 5
  },
  {
    id: 2,
    title: 'Afri - Presentations: Undergraduate Research Showcase',
    category: 'Afri',
    description: 'Presentations challenges undergraduates and postgraduates to present video research...',
    deadline: '7/15/2026',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop',
    prize: 5
  },
  {
    id: 3,
    title: 'Afri - Memes: Science Humor Challenge',
    category: 'Afri',
    description: 'Memes invites creative minds to produce original, science-themed memes that are funny, factual...',
    deadline: '5/31/2026',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f70504c0d?w=300&h=200&fit=crop',
    prize: 5
  },
  {
    id: 4,
    title: 'Afri - MySpace: Lab & Study Setup Showcase',
    category: 'Afri',
    description: 'MySpace celebrates the diverse spaces where African scientists, students, and innovators work...',
    deadline: '8/15/2026',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop',
    prize: 5
  }
];

const winners: Winner[] = [
  {
    id: 1,
    name: 'Oluwaseun Adeyemi',
    award: 'DEVELOPER\'S AWARD',
    location: 'Nigeria',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop'
  },
  {
    id: 2,
    name: 'Amara Osei',
    award: 'DEVELOPER\'S AWARD',
    location: 'Ghana',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop'
  },
  {
    id: 3,
    name: 'Lindiwe Dlamini',
    award: 'SPONSORSHIP AWARD',
    location: 'South Africa',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop'
  },
  {
    id: 4,
    name: 'Nkechi Okafor-Williams',
    award: 'SPONSORSHIP AWARD',
    location: 'United Kingdom',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop'
  }
];

export default function Programs() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Ongoing Competitions */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center gap-1 lg:gap-3 mb-2">
                  <Trophy className="text-3xl text-red-500"></Trophy>
                  <h2 className="text-md md:text-2xl font-bold text-gray-900">
                    Ongoing Competitions
                  </h2>
                </div>
                <p className="text-xs lg:text-sm text-gray-600">Participate, Innovate, Win.</p>
              </div>
              <Link
                href="/competitions"
                className="text-red-600 hover:text-red-700 font-slim text-sm lg:text-lg whitespace-nowrap ml-4"
              >
                View All →
              </Link>
            </div>

            <div className="space-y-4">
              {competitions.map((competition) => (
                <div
                  key={competition.id}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300 p-2 lg:p-4 flex gap-4"
                >
                  {/* Image */}
                  <div className="w-16 lg:w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-gray-200">
                    <img
                      src={competition.image}
                      alt={competition.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900 text-xs lg:text-sm mb-1 line-clamp-2">
                        {competition.title}
                      </h3>
                      <p className="text-gray-600 text-xs mb-2 line-clamp-1">
                        {competition.description}
                      </p>
                      <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <Calendar size={14} />
                        <span>Deadline: {competition.deadline}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Price and Button */}
                  <div className="flex flex-col items-end justify-between shrink-0">
                    <span className="text-red-600 font-bold text-xs bg-red-200 p-1 rounded-full">${competition.prize}</span>
                    <button className="cursor-pointer bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-3 rounded text-xs transition-colors">
                      Vote Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hall of Fame */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Award className="text-3xl text-red-500"></Award>
                  <h2 className="text-lg md:text-2xl font-bold text-gray-900">
                    Hall of Fame
                  </h2>
                </div>
                <p className="text-gray-600 text-sm">Celebrating excellence in African Science.</p>
              </div>
              <Link
                href="/awards"
                className="text-red-600 hover:text-red-700 font-slim text-xs lg:text-lg whitespace-nowrap ml-4"
              >
                View All →
              </Link>
            </div>

            <div className="space-y-4">
              {winners.map((winner) => (
                <div
                  key={winner.id}
                  className="bg-linear-to-r from-slate-900 to-slate-800 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300 p-6 flex items-center gap-4 relative"
                >
                  {/* Medal Icon */}
                  <div className="absolute top-4 right-4 text-yellow-400">
                    <Medal size={24} className="fill-yellow-400" />
                  </div>

                  {/* Profile Image */}
                  <div className="w-16 h-16 shrink-0 rounded-full overflow-hidden bg-gray-600 border-2 border-yellow-400">
                    <img
                      src={winner.image}
                      alt={winner.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white">
                      {winner.name}
                    </h3>
                    <p className="text-yellow-400 text-xs font-bold mb-1">
                      {winner.award}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {winner.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
