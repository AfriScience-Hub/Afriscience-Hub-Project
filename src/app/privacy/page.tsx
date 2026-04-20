'use client';

import { Shield, Eye, UserCheck, Lock, Users, Mail, Link as LinkIcon, RefreshCw } from 'lucide-react';
import Header from '../components/header';
import Footer from '../components/footer';
import SearchModal from '../components/search';
import { useState } from 'react';

const sections = [
  {
    id: 1,
    title: "Introduction",
    icon: Shield,
    iconColor: "text-red-500",
    bgColor: "bg-red-100",
    content: (
      <p className="text-gray-700 leading-relaxed">
        Welcome to AfriScience Hub, a science and technology based platform designed to connect learners, professionals, innovators and institutions. We value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you visit or interact with our platform.
      </p>
    )
  },
  {
    id: 2,
    title: "Information We Collect",
    icon: Eye,
    iconColor: "text-blue-500",
    bgColor: "bg-blue-100",
    content: (
      <div className="text-gray-700 leading-relaxed">
        <p className="mb-4">We collect information to improve user experience and maintain platform security. This may include:</p>
        <ul className="list-disc pl-6 space-y-3">
          <li><span className="font-medium">Personal Information:</span> name, email, contact details, qualifications, age, expertise, and account credentials.</li>
          <li><span className="font-medium">Non-Personal Information:</span> browser type, IP address, device information, and interaction data.</li>
        </ul>
      </div>
    )
  },
  {
    id: 3,
    title: "How We Use Your Information",
    icon: UserCheck,
    iconColor: "text-emerald-500",
    bgColor: "bg-emerald-100",
    content: (
      <div className="text-gray-700 leading-relaxed">
        <p className="mb-4">We use collected data to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Create and manage user accounts.</li>
          <li>Verify and list institutes, professionals, specialist centers and innovations.</li>
          <li>Register participants for competitions and events.</li>
          <li>Connect similar expertise.</li>
          <li>Analyze usage to enhance learning tools and platform features.</li>
          <li>Communicate updates, opportunities, or events.</li>
        </ul>
      </div>
    )
  },
  {
    id: 4,
    title: "Data Sharing and Disclosure",
    icon: Users,
    iconColor: "text-purple-500",
    bgColor: "bg-purple-100",
    content: (
      <div className="text-gray-700 leading-relaxed">
        <p className="mb-4">We do not sell your data. However, we may share limited information:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>With verified partners and sponsors to facilitate services we offer to our users especially in areas like competitions, awards and innovations.</li>
          <li>When required by law or government authorities.</li>
        </ul>
      </div>
    )
  },
  {
    id: 5,
    title: "Data Storage and Security",
    icon: Lock,
    iconColor: "text-violet-500",
    bgColor: "bg-violet-100",
    content: (
      <p className="text-gray-700 leading-relaxed">
        Your information is stored securely and protected using modern encryption and access control methods. Only authorized personnel can access personal data.
      </p>
    )
  },
  {
    id: 6,
    title: "Children’s Privacy",
    icon: Users,
    iconColor: "text-teal-500",
    bgColor: "bg-teal-100",
    content: (
      <p className="text-gray-700 leading-relaxed">
        We recognize the importance of protecting minors. For users under 18, parental or institutional consent may be required before registration or participation.
      </p>
    )
  },
  {
    id: 7,
    title: "Your Data Rights",
    icon: Shield,
    iconColor: "text-amber-500",
    bgColor: "bg-amber-100",
    content: (
      <p className="text-gray-700 leading-relaxed">
        You can request to access, update, or delete your data at any time by contacting our support team at{' '}
        <a href="mailto:support@afrisciencehub.com" className="text-red-600 hover:underline font-medium">
          support@afrisciencehub.com
        </a>
      </p>
    )
  },
  {
    id: 8,
    title: "Third-Party Links",
    icon: LinkIcon,
    iconColor: "text-rose-500",
    bgColor: "bg-rose-100",
    content: (
      <p className="text-gray-700 leading-relaxed">
        Our platform may contain links to educational and other science-related resources. We are not responsible for the privacy practices of external websites.
      </p>
    )
  },
  {
    id: 9,
    title: "Policy Updates",
    icon: RefreshCw,
    iconColor: "text-cyan-500",
    bgColor: "bg-cyan-100",
    content: (
      <p className="text-gray-700 leading-relaxed">
        We may update this policy occasionally. The latest version will always be available on this page.
      </p>
    )
  },
  {
    id: 10,
    title: "Contact Us",
    icon: Mail,
    iconColor: "text-indigo-500",
    bgColor: "bg-indigo-100",
    content: (
      <p className="text-gray-700 leading-relaxed">
        For privacy concerns or requests, email{' '}
        <a href="mailto:support@afrisciencehub.com" className="text-red-600 hover:underline font-medium">
          support@afrisciencehub.com
        </a>
      </p>
    )
  },
];

export default function PrivacyPolicyPage() {
  const [searchOpen, setSearchOpen] = useState(false);
  const handleSearchOpen = () => setSearchOpen(true);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearchOpen={handleSearchOpen} />

      <div className="max-w-3xl mx-auto px-4 py-24">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
            <Shield className="w-9 h-9 text-blue-600" />
          </div>
          <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-3">Privacy Policy</h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Your privacy is important to us. Learn how we collect, use, and protect your personal information.
          </p>
        </div>

        {/* Content Card */}
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

          {/* Footer */}
          <div className="border-t border-gray-100 bg-gray-50 px-10 py-8 text-center">
            <p className="text-sm text-gray-500">
              Last updated: April 4, 2026
            </p>
          </div>
        </div>
      </div>

      <Footer />
      {/* Search Modal - Renders over entire page */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}