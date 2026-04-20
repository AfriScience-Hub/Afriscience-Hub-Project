'use client';

import { Cookie, Info, HelpCircle, Settings, RefreshCw, Mail } from 'lucide-react';
import Header from '../components/header';
import Footer from '../components/footer';
import SearchModal from '../components/search';
import { useState } from 'react';

const sections = [
  {
    id: 1,
    title: "Introduction",
    icon: Info,
    iconColor: "text-red-500",
    bgColor: "bg-red-100",
    content: (
      <p className="text-gray-700 leading-relaxed">
        Our platform uses cookies to improve site functionality and user experience.
      </p>
    )
  },
  {
    id: 2,
    title: "What Are Cookies?",
    icon: HelpCircle,
    iconColor: "text-blue-500",
    bgColor: "bg-blue-100",
    content: (
      <p className="text-gray-700 leading-relaxed">
        Cookies are small text files stored on your device that help us remember preferences and understand how you use our site.
      </p>
    )
  },
  {
    id: 3,
    title: "How We Use Cookies",
    icon: Cookie,
    iconColor: "text-emerald-500",
    bgColor: "bg-emerald-100",
    content: (
      <div className="text-gray-700 leading-relaxed">
        <p className="mb-4">We use cookies to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Keep you signed in.</li>
          <li>Remember user preferences and language settings.</li>
          <li>Analyze traffic to improve features.</li>
          <li>Display relevant science and technology contents.</li>
        </ul>
      </div>
    )
  },
  {
    id: 4,
    title: "Managing Cookies",
    icon: Settings,
    iconColor: "text-purple-500",
    bgColor: "bg-purple-100",
    content: (
      <p className="text-gray-700 leading-relaxed">
        You can modify your browser settings to accept, block, or delete cookies. However, some site functions may not work properly if cookies are disabled.
      </p>
    )
  },
  {
    id: 5,
    title: "Policy Updates",
    icon: RefreshCw,
    iconColor: "text-cyan-500",
    bgColor: "bg-cyan-100",
    content: (
      <p className="text-gray-700 leading-relaxed">
        We may revise this Cookie Policy to reflect platform improvements.
      </p>
    )
  },
  {
    id: 6,
    title: "Contact",
    icon: Mail,
    iconColor: "text-indigo-500",
    bgColor: "bg-indigo-100",
    content: (
      <p className="text-gray-700 leading-relaxed">
        If you have questions about our use of cookies, reach us at{' '}
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

export default function Cookies() {
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSearchOpen = () => setSearchOpen(true);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearchOpen={handleSearchOpen} />

      <div className="max-w-3xl mx-auto px-4 py-24">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
            <Cookie className="w-9 h-9 text-orange-600" />
          </div>
          <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-3">Cookie Policy</h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Learn how we use cookies to improve your experience on AfriScience Hub.
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

        {/* Cookie Preferences Box */}
        <div className="mt-10 bg-orange-50 border border-orange-100 rounded-3xl p-8 md:p-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-9 h-9 bg-orange-100 rounded-2xl flex items-center justify-center">
              <Cookie className="w-5 h-5 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Cookie Preferences</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Most web browsers automatically accept cookies, but you can usually modify your browser settings to decline cookies if you prefer. Check your browser&apos;s help section for more information.
          </p>
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