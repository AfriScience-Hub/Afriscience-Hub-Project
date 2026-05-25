'use client';

import {
  BookOpen,
  Lightbulb,
  Users,
  TrendingUp,
  Award,
  Heart,
  Link2,
  Trophy,
} from 'lucide-react';

const actionItems = [
  {
    title: 'Inform',
    description:
      'Provide resourceful information to our users on scientific & technological concerns.',
    icon: BookOpen,
    color: '#E53E3E', // Red
  },
  {
    title: 'Promote Innovations',
    description:
      'Build a platform for African inventors/innovators to publish their crafts for global recognition.',
    icon: Lightbulb,
    color: '#E53E3E', // Red
  },
  {
    title: 'Train',
    description:
      'Connect users to professionals, institutions and corporations with the capacity to train them on scientific techniques/methods on different levels.',
    icon: Users,
    color: '#E53E3E', // Red
  },
  {
    title: 'Invest',
    description:
      'Facilitate partnership opportunities between African inventors/innovators and potential investors – African and International (non-African).',
    icon: TrendingUp,
    color: '#E53E3E', // Red
  },
  {
    title: 'Award',
    description:
      'Recognize individuals, professionals, institutes and corporations with outstanding performance in our enlightenment programmes/schemes.',
    icon: Award,
    color: '#E53E3E', // Red
  },
  {
    title: 'Impact',
    description:
      'Cause positive changes and outcomes in the lives of our users and the society at large.',
    icon: Heart,
    color: '#E53E3E', // Red
  },
  {
    title: 'Link',
    description:
      'Interconnect users to easily find, interact and build strong bonds with one another to serve their respective needs.',
    icon: Link2,
    color: '#E53E3E', // Red
  },
  {
    title: 'Compete',
    description:
      'Give Africans an opportunity to compete in scientific & technological events where their skills and crafts will gain them global recognition.',
    icon: Trophy,
    color: '#E53E3E', // Red
  },
];

export default function Purpose() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-5xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-red-600 font-semibold text-sm uppercase tracking-wider mb-2">
            Our Purpose
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Mission & Vision
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-md">
            As a scientific & technological hub, we envision becoming a globally recognized 
            platform, and a frontier network in science & technology space.
          </p>
        </div>

        {/* Action Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {actionItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-start"
              >
                {/* Icon */}
                <div className="p-3 gap-3 flex">
                  <IconComponent
                    size={20}
                    color={item.color}
                    strokeWidth={2}
                  />
                {/* Title */}
                <h3 className="font-bold text-lg text-gray-900 mb-3">
                  {item.title}
                </h3>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
