'use client';

import Link from 'next/link';
import { Handshake } from 'lucide-react';

const partners = [
  { id: 1, name: 'UNESCO', fullName: 'UNESCO' },
  { id: 2, name: 'BMGF', fullName: 'Bill & Melinda Gates Foundation' },
  { id: 3, name: 'WHO', fullName: 'World Health Organization' },
  { id: 4, name: 'AU', fullName: 'African Union' },
  { id: 5, name: 'USAID', fullName: 'USAID' },
  { id: 6, name: 'EC', fullName: 'European Commission' },
  { id: 7, name: 'MCF', fullName: 'Mastercard Foundation' },
  { id: 8, name: 'WT', fullName: 'World Trade' },
  { id: 9, name: 'FF', fullName: 'Ford Foundation' },
  { id: 10, name: 'AfDB', fullName: 'African Development Bank' }
];

export default function Partners() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <style>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .marquee {
          display: flex;
          gap: 1.5rem;
          animation: scroll-left 10s linear infinite;
        }
        .marquee:hover {
          animation-play-state: paused;
        }
        .marquee-item {
          flex: 0 0 auto;
          cursor: pointer;
          min-width: 220px;
          padding: 1.5rem;
          background-color: #f3f4f6;
          border-radius: 0.75rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .marquee-item:hover {
          transform: translateY(-5px);
        }
        .marquee-name {
          font-size: 1.5rem;
          font-weight: 700;
          color: #9ca3af;
          margin-bottom: 0.5rem;
        }
        .marquee-fullname {
          font-size: 0.875rem;
          color: #9ca3af;
        }
      `}
      </style>
      <div className="">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Handshake className="text-4xl text-red-500"></Handshake>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              Our Partners & Sponsors
            </h2>
          </div>
          <p className="text-sm lg:text-lg text-gray-600">
            Trusted by leading organizations across Africa and beyond.
          </p>
        </div>

        {/* Partners Marquee */}
        <div className="mb-16 rounded-lg py-8 overflow-auto hide-scrollbar">
          <div className="marquee">
            {/* First set of partners */}
            {partners.map((partner) => (
              <div key={`${partner.id}-1`} className="marquee-item">
                <div className="marquee-name">{partner.name}</div>
                <div className="marquee-fullname">{partner.fullName}</div>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {partners.map((partner) => (
              <div key={`${partner.id}-2`} className="marquee-item">
                <div className="marquee-name">{partner.name}</div>
                <div className="marquee-fullname">{partner.fullName}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative rounded-3xl max-w-5xl mx-auto overflow-hidden bg-linear-to-r from-slate-900 via-orange-950 to-red-600 p-12 md:p-16 text-center">
          <h3 className="text-xl md:text-3xl font-bold text-white mb-4">
            Ready to Showcase Your Innovation?
          </h3>
          <p className="text-md text-gray-100 mb-8 max-w-2xl mx-auto">
            Join thousands of scientists, students, and institutes transforming the future of Africa.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-white hover:bg-gray-100 text-red-600 font-semibold px-8 py-4 rounded-lg transition-colors duration-300"
          >
            Create Your Profile
          </Link>
        </div>
      </div>
    </section>
  );
}
