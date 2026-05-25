/* eslint-disable @next/next/no-img-element */
'use client';

import { FaInstagram, FaTwitter } from 'react-icons/fa';

const teamMembers = [
  {
    name: 'Umenne Udochukwu Gerald',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
    social: [
      { platform: 'twitter', handle: '@umennegarald', url: 'https://twitter.com' },
      { platform: 'instagram', handle: '@umennegarald', url: 'https://instagram.com' },
    ],
  },
  {
    name: 'Azubuike Godspower Ikechukwu',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop',
    social: [
      { platform: 'twitter', handle: '@azubuikegodpower', url: 'https://twitter.com' },
      { platform: 'instagram', handle: '@azubuikegodpower', url: 'https://instagram.com' },
    ],
  },
  {
    name: 'Obiamalu Chidubem Paschal',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop',
    social: [
      { platform: 'twitter', handle: '@obiamalupaschal', url: 'https://twitter.com' },
      { platform: 'instagram', handle: '@obiamalupaschal', url: 'https://instagram.com' },
    ],
  },
  {
    name: 'Linus Chidimma Ngwee',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop',
    social: [
      { platform: 'twitter', handle: '@linuschidimma', url: 'https://twitter.com' },
      { platform: 'instagram', handle: '@linuschidimma', url: 'https://instagram.com' },
    ],
  },
];

export default function Team() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-4">
            Our Team
          </h2>
          <p className="text-gray-600 text-md max-w-2xl mx-auto">
            AfriScience Hub® is built by a team of intellectual and highly motivated individuals 
            with reputable analytical, technical and interpersonal skills.
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-start flex flex-col items-center">
              {/* Member Image */}
              <div className="mb-6 overflow-hidden rounded-2xl h-80">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>

              {/* Member Name */}
              <h3 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">
                {member.name}
              </h3>

              {/* Social Media Links */}
              <div className="flex flex-col items-start w-full gap-2">
                {member.social.map((social, socialIndex) => (
                  <a
                    key={socialIndex}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.handle}
                    className="flex items-center gap-1 text-xs text-gray-600 hover:text-red-600 transition-colors"
                  >
                    {social.platform === 'instagram' ? (
                      <FaInstagram size={16} />
                    ) : (
                      <FaTwitter size={16} />
                    )}
                    <span>{social.handle}</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
