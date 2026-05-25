'use client';

import {
  Shield,
  Star,
  Award,
  Users,
  Zap,
  Globe,
  Heart,
} from 'lucide-react';

const coreValues = [
  {
    title: 'Integrity',
    description:
      'We believe in the culture of doing the right thing always. Our decisions and actions are rooted in transparency, ethics, consistency, fairness, accountability, and authenticity.',
    icon: Shield,
  },
  {
    title: 'Excellence',
    description:
      'We are committed to maintaining the highest standards in everything we do – from information dissemination, to quality services and network stabilization.',
    icon: Star,
  },
  {
    title: 'Accountability',
    description:
      'We take ownership of our representations, decisions, and actions. We always stand by our commitments.',
    icon: Award,
  },
  {
    title: 'User-Centric',
    description:
      'We prioritize finding and creating solutions to the needs of our users. Their satisfaction is at the heart of our operations.',
    icon: Users,
  },
  {
    title: 'Innovation',
    description:
      'We seek to always improve our system of operations; to adapt, evolve, and meet the continuous advancements in the science & technology space.',
    icon: Zap,
  },
  {
    title: 'Collaboration',
    description:
      'We welcome constructive communications, partnerships and collaborations with different parties and our network. Such collaborations create limitless possibilities and opportunities for great achievements.',
    icon: Globe,
  },
  {
    title: 'Community Impact',
    description:
      'We operate with deep sense of responsibility towards impacting communities and societies in ways that drive structural, functional and economic development/growth.',
    icon: Heart,
  },
];

export default function CoreValue() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-4">
            Our Core Values
          </h2>
          <p className="text-gray-600 text-md">
            Our culture is built on a foundation of strong principles that guide every interaction.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreValues.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <div
                key={index}
                className="p-8 bg-gray-50 rounded-lg hover:shadow-md transition-shadow"
              >
                {/* Icon */}
                <div className="mb-4 inline-block p-3 bg-white rounded-lg">
                  <IconComponent
                    size={24}
                    color="#E53E3E"
                    strokeWidth={2}
                  />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-widest">
                  {value.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
