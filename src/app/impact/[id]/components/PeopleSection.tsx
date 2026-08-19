'use client';

import Image from 'next/image';
import { Linkedin, Twitter, Instagram, Facebook } from 'lucide-react';
import type { ImpactPerson, ImpactProgram } from '@/app/data/impactData';

const sectionTitle: Record<ImpactProgram, string> = {
  'Career Support': "Owner's Information",
  'Research Support': "Researcher's Information",
  'Educational Scholarship': "Beneficiary's Information",
};

export default function PeopleSection({
  program,
  people,
}: {
  program: ImpactProgram;
  people: ImpactPerson[];
}) {
  if (!people.length) return null;

  return (
    <div className="p-6 sm:p-8 border-b border-neutral-gray-light">
      <h2 className="text-xl font-bold text-neutral-black mb-5">{sectionTitle[program]}</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {people.map((person) => (
          <div
            key={person.name}
            className="rounded-xl border border-neutral-gray-light bg-neutral-bg-light/50 p-4 flex gap-4"
          >
            <div className="relative h-16 w-16 rounded-full overflow-hidden shrink-0 bg-neutral-gray-light">
              <Image
                src={person.image}
                alt={person.name}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-neutral-black truncate">{person.name}</p>
              {person.role && (
                <p className="text-xs text-neutral-gray-medium mb-2">{person.role}</p>
              )}
              {person.socials && (
                <div className="flex items-center gap-2 mt-1">
                  {person.socials.linkedin && (
                    <a
                      href={person.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-gray-medium hover:text-brand-navy-900"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  )}
                  {person.socials.twitter && (
                    <a
                      href={person.socials.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-gray-medium hover:text-brand-navy-900"
                    >
                      <Twitter className="h-4 w-4" />
                    </a>
                  )}
                  {person.socials.instagram && (
                    <a
                      href={person.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-gray-medium hover:text-brand-navy-900"
                    >
                      <Instagram className="h-4 w-4" />
                    </a>
                  )}
                  {person.socials.facebook && (
                    <a
                      href={person.socials.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-gray-medium hover:text-brand-navy-900"
                    >
                      <Facebook className="h-4 w-4" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
