'use client';

import {
  Building2,
  BookOpen,
  Users,
  Lightbulb,
  Trophy,
  Medal,
  LucideIcon,
} from 'lucide-react';

interface Section {
  title: string;
  description: string;
  icon: LucideIcon;
  items: ListItem[];
}
interface ListItem {
  label: string;
  sublabel?: string; // The '?' makes it optional
}

const sections : Section[] = [
  {
    title: 'Institutes',
    description:
      'We feature different scientific & technological institutes in Africa, alongside partnering international (non-African) institutes.',
    icon: Building2,
    items: [
      { label: 'Primary & Secondary', sublabel: '(Elementary/Basic and High Schools)' },
      { label: 'Tertiary', sublabel: '(Universities, Colleges and Polytechnics)' },
      { label: 'Research', sublabel: '(Independent/Private, Government, University, Councils)' },
      { label: 'Specialized', sublabel: '(Monomechanics and College of Education)' },
    ],
  },
  {
    title: 'Fields',
    description:
      'We outline scientific & technological fields of study peculiar to African academic curriculum and provide detailed information about them.',
    icon: BookOpen,
    items: [
      { label: 'Field objectives' },
      { label: 'Specialization areas' },
      { label: 'Study institutions' },
      { label: 'Career opportunities' },
    ],
  },
  {
    title: 'Specialist Centers',
    description:
      'We feature licensed African and International (non-African) establishments/centers that render scientific & technological services in specific fields.',
    icon: Users,
    items: [
      { label: 'Engineering' },
      { label: 'Biology' },
      { label: 'IVF' },
      { label: 'Dialysis' },
      { label: 'Orthopedics' },
      { label: 'Cardiology' },
      { label: 'Psychiatry' },
    ],
  },
  {
    title: 'Afro-Innovations',
    description:
      'We use our platform to publicize the skills and creativity of African innovators/inventors, for a global recognition of their craft and investment opportunities.',
    icon: Lightbulb,
    items: [],
  },
  {
    title: 'Competitions',
    description:
      'We organize annual intellectual and skill based competitions for Africans under different categories.',
    icon: Trophy,
    items: [],
  },
  {
    title: 'Awards',
    description:
      'We recognize the outstanding performance of individuals, professionals, institutions and corporations in our enlightenment programmes/schemes.',
    icon: Medal,
    items: [],
  },
];

export default function WhatWeDo() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-4">
            What We Do
          </h2>
          <p className="text-gray-600 text-md">
            AfriScience Hub® offers solutions in diverse scientific & technological sectors.
          </p>
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <div
                key={index}
                className="p-8 bg-white rounded-lg shadow-sm"
              >
                {/* Icon and Title */}
                <div className="flex items-start mb-4">
                  <div className="p-2 lg:p-3 bg-red-50 rounded-lg mr-4">
                    <IconComponent
                      size={20}
                      color="#E53E3E"
                      strokeWidth={2}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 uppercase lg:tracking-widest">
                    {section.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {section.description}
                </p>

                {/* Items List */}
                {section.items.length > 0 && (
                  <ul className="space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start text-sm text-gray-600">
                        <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 shrink-0"></span>
                        <div>
                          <span className="text-gray-900 font-medium">{item.label}</span>
                          {item.sublabel && (
                            <span className="text-gray-500"> {item.sublabel}</span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
