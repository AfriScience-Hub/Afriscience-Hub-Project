'use client';

import { useState, useMemo } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import SearchModal from '../components/search';
import Link from 'next/link';
import {HelpCircle} from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  items: FAQItem[];
}

const faqData: FAQCategory[] = [
  {
    title: 'About the Platform',
    items: [
      {
        question: 'What is this platform about?',
        answer: 'It\'s a centralized hub for science & technology — connecting schools, learners, professionals, establishments, innovators and opportunities across all levels.'
      },
      {
        question: 'Who can use it?',
        answer: 'Students, teachers, parents, professionals, corporations, specialists and institutions from primary to tertiary levels.'
      }
    ]
  },
  {
    title: 'Institutes',
    items: [
      {
        question: 'What Institutes can be listed?',
        answer: '"Universities" alongside "Primary & Secondary Schools" globally can be listed. Listed institutes must have the capacity to host African students and help them facilitate their academic requirements.'
      },
      {
        question: 'How can a school get listed?',
        answer: 'Schools can apply through our "Add Institution" feature. Our verification team reviews details before publishing.'
      },
      {
        question: 'How do you ensure schools are genuine?',
        answer: 'Each listing is verified through trusted verification channels before being made public.'
      }
    ]
  },
  {
    title: 'Scientists & Technologists',
    items: [
      {
        question: 'Who can be listed as Scientists & Technologists?',
        answer: 'Professionals globally that can offer services in different science and technology fields can be listed.'
      },
      {
        question: 'How do I get listed as a Scientist or Technologist?',
        answer: 'Sign in, visit the "Scientists & Technologists" section on your dashboard, and click on "add Scientist & Technologist" to list your services under selected category.'
      },
      {
        question: 'How can I delist my services as a Scientist or Technologist?',
        answer: 'Sign in, visit the "Scientists & Technologists" section on your dashboard, select the preferred profile and click on "remove Scientist & Technologist" to delist and deactivate your profile as a Scientist & Technologist. Note that deactivation will clear all your stats and reactivation will require a fresh subscription fee.'
      }
    ]
  },
  {
    title: 'Specialist Centers',
    items: [
      {
        question: 'What Specialist Centers can be listed?',
        answer: 'Specialist establishments globally can be listed. These establishments must be capable of hosting African users and helping them facilitate their travel requirements.'
      },
      {
        question: 'How can I get my Specialist Establishment listed?',
        answer: 'Sign in, visit the "Specialist Centers" section on your dashboard, and click on "add Specialist Center" publish your establishment under selected category.'
      },
      {
        question: 'How can I delist my Specialist Center?',
        answer: 'Sign in, visit the "Specialist Center" section on your dashboard, select the preferred center and click on "remove Specialist Center" to delist and deactivate that center. Note that deactivation will clear all the stats of the center and reactivation will require a fresh subscription fee.'
      }
    ]
  },
  {
    title: 'Afro - Innovations',
    items: [
      {
        question: 'Who can publish their innovations?',
        answer: 'Only inventors and innovators of African descent.'
      },
      {
        question: 'How can I get my Innovations published?',
        answer: 'Sign in, visit the "Afro – Innovations" section on your dashboard, and click on "add Innovations" publish your innovation under selected category.'
      },
      {
        question: 'How can I delist my Innovation?',
        answer: 'Sign in, visit the "Afro – Innovations" section on your dashboard, select the preferred innovation and click on "remove Innovation" to delist and deactivate that innovation. Note that deactivation will clear all the stats on the innovation and reactivation will require a fresh subscription fee.'
      }
    ]
  },
  {
    title: 'Competitions',
    items: [
      {
        question: 'Who can participate in competitions?',
        answer: 'Only individuals of African descent, currently residing in any African country.'
      },
      {
        question: 'How do I participate in competitions?',
        answer: 'Sign in, visit the "Competitions" section on your dashboard, and register under your preferred category.'
      },
      {
        question: 'Are there prizes or certificates?',
        answer: 'Yes. Winners receive digital certificates, recognition badges, and sometimes sponsored competition\'s prizes.'
      }
    ]
  },
  {
    title: 'Voting',
    items: [
      {
        question: 'Who can vote?',
        answer: 'Our community of users signed into the platform is eligible to vote.'
      },
      {
        question: 'Why do we need to vote?',
        answer: 'Votes enable the platform to take unbiased decisions on important aspects of the platform. Votes help us understand the mind of our users on different subject matters.'
      },
      {
        question: 'What do we vote on?',
        answer: 'Decision making aspects of our network that directly affect our community of users are subject to voting. That way, we capture a fair representation of the opinion of our users before implementation.'
      }
    ]
  },
  {
    title: 'Awards',
    items: [
      {
        question: 'Why are awards given?',
        answer: 'Awards are given to recognize the outstanding performance of individuals and brands in our different enlightenment programs/schemes. We reward users for their skill, craft, dedication and support which in turn gains them global recognition through our platform.'
      },
      {
        question: 'Who gets awards?',
        answer: 'Professionals, competitors, corporations, students, institutes, specialist centers, team members, sponsors, innovators and donors.'
      },
      {
        question: 'How unique are the awards?',
        answer: 'Every award presented is verifiable in our platform. Given that our platform is global, awards from us are considered authentic and well deserved.'
      },
      {
        question: 'In what forms are the awards?',
        answer: 'Depending on what you\'re recognized for, our awards can be in a form of scholarships, plaques, certificates, medals, grand prices and publicity.'
      }
    ]
  },
  {
    title: 'Sponsors',
    items: [
      {
        question: 'Who are sponsors?',
        answer: 'These are individuals or brands that are in an existing partnership with our network. Sponsors help us expand operations across the African continent and beyond. Our sponsors are genuine and of good reputation.'
      },
      {
        question: 'What is my benefit as a sponsor?',
        answer: 'As a sponsor, we help you grow your business and influence globally. We can also provide technical support for your brand in areas our expertise cover.'
      }
    ]
  },
  {
    title: 'Volunteering',
    items: [
      {
        question: 'Who are volunteers?',
        answer: 'Volunteers are individuals that work with the network towards expanding its global reach. They become team members by sharing in the same goals of the network and working towards actualizing them.'
      },
      {
        question: 'What are my tasks as a volunteer?',
        answer: 'Volunteers are involved in regional activities like marketing, surveys, supervision, hosting, coordinating, etc.'
      },
      {
        question: 'What are my benefits as a volunteer?',
        answer: 'As a volunteer, you maintain close contact with the network. Depending on level of input and qualification, you can obtain reference letters, become fully employed with us and enjoy other monetary/non-monetary benefits.'
      },
      {
        question: 'How do I volunteer?',
        answer: 'You can become a volunteer for the platform by applying under the "Become a Volunteer" section on your dashboard.'
      }
    ]
  },
  {
    title: 'Donations',
    items: [
      {
        question: 'Who can donate?',
        answer: 'Individuals and brands that believe in the solutions our network create. Anyone that appreciates our efforts towards solving the problems that plague the African continent can donate to our course.'
      },
      {
        question: 'How are my donations used?',
        answer: 'Donations help us run our operations, expand our network and stabilize our internal framework.'
      },
      {
        question: 'How are donors recognized?',
        answer: 'Donors are highly appreciated by our network. We recognize them through honorary awards, annual publications and partnerships.'
      }
    ]
  },
  {
    title: 'Accounts and Privacy',
    items: [
      {
        question: 'How do I create, manage or delete my account?',
        answer: 'Click "Sign Up" or "Profile Settings" to create or manage your account respectively. Contact support for deletion requests.'
      },
      {
        question: 'How is my data protected?',
        answer: 'All personal data is encrypted and used strictly within our privacy guidelines.'
      }
    ]
  },
  {
    title: 'Technical and Support',
    items: [
      {
        question: 'What if I can\'t log in?',
        answer: 'Use the "Forgot Password" option or contact support for assistance.'
      },
      {
        question: 'How can I report an issue or give feedback?',
        answer: 'To report issues, use our "Feedback" icon located at the bottom-right section of your screen. Alternatively, you can visit our "Contact" page or email us directly.'
      }
    ]
  }
];

function FAQAccordion({ category, searchQuery }: { category: FAQCategory; searchQuery: string }) {
  const [expanded, setExpanded] = useState<number | null>(null);

  // Filter items based on search query
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return category.items;
    
    const query = searchQuery.toLowerCase();
    return category.items.filter(item =>
      item.question.toLowerCase().includes(query) ||
      item.answer.toLowerCase().includes(query)
    );
  }, [category.items, searchQuery]);

  // Don't render category if no items match search
  if (filteredItems.length === 0) return null;

  return (
   <div className="mb-8">
      {/* Category Title - Gray Background */}
      <div className="bg-gray-100 px-6 py-4 rounded-t-xl border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
      </div>

      {/* Accordion Items - White Card Style */}
      <div className="bg-white rounded-b-xl border border-gray-200 border-t-0 overflow-hidden shadow-sm">
        {filteredItems.map((item, index) => (
          <div 
            key={index} 
            className="border-b border-gray-100 last:border-b-0"
          >
            <button
              className="w-full px-6 py-5 text-left flex justify-between items-center group hover:bg-gray-50 transition-all duration-200"
              onClick={() => setExpanded(expanded === index ? null : index)}
            >
              <span className="lg:text-[17px] text-gray-800 group-hover:text-red-600 transition-colors duration-200">
                {item.question}
              </span>
              
              {/* Caret Down Icon */}
              <span className="ml-4 shrink-0 text-gray-400 group-hover:text-red-500 transition-colors duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-5 h-5 transition-transform duration-300 ${expanded === index ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>

            {/* Answer with smooth transition */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                expanded === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-6 pb-6 pt-2 text-gray-600 text-[15.5px] leading-relaxed border-t border-gray-100">
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header onSearchOpen={() => setSearchOpen(true)} />

      {/* Hero Section */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <HelpCircle className="text-4xl text-red-500"></HelpCircle>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-md text-gray-600 max-w-xl mx-auto">
            Find answers to common questions about AfriScience Hub, our services, and how to make the most of our platform.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-black"
            />
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="flex-1 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {faqData.map((category, index) => (
            <FAQAccordion
              key={index}
              category={category}
              searchQuery={searchQuery}
            />
          ))}
          
          {searchQuery.trim() && faqData.every(category =>
            category.items.every(item =>
              !item.question.toLowerCase().includes(searchQuery.toLowerCase()) &&
              !item.answer.toLowerCase().includes(searchQuery.toLowerCase())
            )
          ) && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No results found for &quot;{searchQuery}&quot;. Try a different search term.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="mt-5 mb-10">
        <div className="max-w-4xl mx-auto bg-[#071D35] px-4 py-8 lg:rounded-xl text-center">
          <h2 className="text-xl lg:text-2xl font-bold text-white mb-3">
            Still have questions?
          </h2>
          <p className="text-gray-300 mb-8 text-sm lg:text-md">
            Our support team is here to help you.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-gray-900 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
