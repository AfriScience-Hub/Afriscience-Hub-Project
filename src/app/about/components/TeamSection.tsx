import { Linkedin, X } from 'lucide-react';
import { TEAM } from '../data';

export default function TeamSection() {
  return (
    <div className="py-24 sm:py-32 bg-white relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-brand-navy-900 sm:text-4xl">Our Team</h2>
          <p className="mt-4 text-lg leading-8 text-neutral-gray-dark">
            AfriScience Hub® is built by a team of intellectual and highly motivated individuals with reputable analytical, technical and interpersonal skills.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member) => (
            <div key={member.name} className="group">
              <div className="relative overflow-hidden rounded-2xl bg-neutral-bg-light aspect-[4/5] mb-4">
                <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-brand-navy-900">{member.name}</h3>
                <div className="flex items-center gap-3 mt-1">
                  {member.linkedin && (
                    <span className="text-xs text-neutral-gray-dark flex items-center gap-1">
                      <Linkedin className="h-3 w-3" /> {member.linkedin}
                    </span>
                  )}
                  {member.twitter && (
                    <span className="text-xs text-neutral-gray-dark flex items-center gap-1">
                      <X className="h-3 w-3" /> {member.twitter}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
