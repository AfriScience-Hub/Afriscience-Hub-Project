'use client';

import { FileText, ShieldCheck, User, Users, Scale, AlertTriangle, Ban, Gavel, Mail } from 'lucide-react';
import Header from '../components/header';
import Footer from '../components/footer';
import SearchModal from '../components/search';
import { useState } from 'react';

const sections = [
  {
    id: 1,
    title: "Overview",
    icon: FileText,
    iconColor: "text-red-500",
    bgColor: "bg-red-100",
    content: (
      <p className="text-gray-700 leading-relaxed">
        These Terms govern your use of AfriScience Hub, including access to academic institutes, professionals, specialist centers, innovations, competitions, and awards.
      </p>
    )
  },
  {
    id: 2,
    title: "Acceptance of Terms",
    icon: ShieldCheck,
    iconColor: "text-emerald-500",
    bgColor: "bg-emerald-100",
    content: (
      <p className="text-gray-700 leading-relaxed">
        By using our platform, you agree to comply with these Terms of Service and all applicable laws.
      </p>
    )
  },
  {
    id: 3,
    title: "Eligibility and Account Responsibilities",
    icon: User,
    iconColor: "text-blue-500",
    bgColor: "bg-blue-100",
    content: (
      <p className="text-gray-700 leading-relaxed">
        Users must provide accurate information when registering. You are responsible for maintaining the confidentiality of your login credentials.
      </p>
    )
  },
  {
    id: 4,
    title: "Use of the Platform",
    icon: Users,
    iconColor: "text-purple-500",
    bgColor: "bg-purple-100",
    content: (
      <div className="text-gray-700 leading-relaxed">
        <p className="mb-4">
          Our platform is designed to support learning, discovery, and healthy academic competition. You agree to use it only for lawful and educational purposes, including:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Accessing verified school listings</li>
          <li>Reaching out to professionals</li>
          <li>Accessing specialist centers</li>
          <li>Publicizing innovations</li>
          <li>Registering for science competitions</li>
          <li>Giving donations</li>
          <li>Seeking partnerships</li>
          <li>Volunteering</li>
          <li>Obtaining awards</li>
        </ul>
      </div>
    )
  },
  {
    id: 5,
    title: "Intellectual Property",
    icon: Scale,
    iconColor: "text-amber-500",
    bgColor: "bg-amber-100",
    content: (
      <p className="text-gray-700 leading-relaxed">
        All materials on this site—including text, logos, images, and databases—are protected by copyright laws and belong to AfriScience Hub or its partners.
      </p>
    )
  },
  {
    id: 6,
    title: "User Conduct",
    icon: AlertTriangle,
    iconColor: "text-yellow-500",
    bgColor: "bg-yellow-100",
    content: (
      <div className="text-gray-700 leading-relaxed">
        <p className="mb-4">You agree not to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Upload false, misleading, or plagiarized content.</li>
          <li>Misuse any information about listed individuals and establishments.</li>
          <li>Attempt to hack, disrupt, or exploit the site.</li>
        </ul>
      </div>
    )
  },
  {
    id: 7,
    title: "Disclaimers and Limitation of Liability",
    icon: Ban,
    iconColor: "text-rose-500",
    bgColor: "bg-rose-100",
    content: (
      <p className="text-gray-700 leading-relaxed">
        We provide science/technology based information and resources &quot;as is.&quot; We are not liable for any loss resulting from use of the platform, listings, or external content.
      </p>
    )
  },
  {
    id: 8,
    title: "Termination",
    icon: Ban,
    iconColor: "text-gray-500",
    bgColor: "bg-gray-100",
    content: (
      <p className="text-gray-700 leading-relaxed">
        We reserve the right to suspend or terminate any account that violates these terms.
      </p>
    )
  },
  {
    id: 9,
    title: "Governing Law",
    icon: Gavel,
    iconColor: "text-violet-500",
    bgColor: "bg-violet-100",
    content: (
      <p className="text-gray-700 leading-relaxed">
        These Terms are governed by the laws of Nigeria, without regard to conflict of law principles.
      </p>
    )
  },
  {
    id: 10,
    title: "Contact",
    icon: Mail,
    iconColor: "text-indigo-500",
    bgColor: "bg-indigo-100",
    content: (
      <p className="text-gray-700 leading-relaxed">
        For inquiries, email us at{' '}
        <a 
          href="mailto:support@afrisciencehub.com" 
          className="text-red-600 hover:underline font-medium"
        >
          support@afrisciencehub.com
        </a>
      </p>
    )
  },
];

export default function TermsOfServicePage() {
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSearchOpen = () => setSearchOpen(true);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearchOpen={handleSearchOpen} />

      <div className="max-w-5xl mx-auto px-4 py-24">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
            <FileText className="w-9 h-9 text-blue-600" />
          </div>
          <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-3">Terms of Service</h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Please read these terms carefully before using AfriScience Hub. By using our platform, you agree to these terms.
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 md:p-14 space-y-14">
            {sections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <div key={section.id} className="scroll-mt-20">
                  <div className="flex flex-col lg:flex-row items-start gap-5 mb-6">
                    <div className={`w-10 h-10 rounded-2xl shrink-0 flex items-center justify-center ${section.bgColor}`}>
                      <IconComponent className={`w-5 h-5 ${section.iconColor}`} />
                    </div>
                    <div>
                      <h2 className="text-xl lg:text-2xl font-semibold text-gray-900">
                        {section.id}. {section.title}
                      </h2>
                    </div>
                  </div>
                  <div className="lg:pl-14">
                    {section.content}
                  </div>

                  {index !== sections.length - 1 && (
                    <div className="h-px bg-gray-100 mt-14" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Last Updated */}
          <div className="border-t border-gray-100 bg-gray-50 px-10 py-8 text-center">
            <p className="text-sm text-gray-500">
              Last updated: April 4, 2026
            </p>
          </div>
        </div>
      </div>

      <Footer />

      {/* Search Modal */}
      <SearchModal 
        isOpen={searchOpen} 
        onClose={() => setSearchOpen(false)} 
      />
    </div>
  );
}