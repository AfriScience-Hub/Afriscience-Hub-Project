'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';
import { cn } from '../../lib/utils';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  items: FAQItem[];
}

const FAQ_DATA: FAQCategory[] = [
  {
    title: "About the Platform",
    items: [
      {
        question: "What is this platform about?",
        answer: "It's a centralized hub for science & technology — connecting schools, learners, professionals, establishments, innovators and opportunities across all levels."
      },
      {
        question: "Who can use it?",
        answer: "Students, teachers, parents, professionals, corporations, specialists and institutions from primary to tertiary levels."
      }
    ]
  },
  {
    title: "Institutes",
    items: [
      {
        question: "What Institutes can be listed?",
        answer: "\"Universities\" alongside \"Primary & Secondary Schools\" globally can be listed. Listed institutes must have the capacity to host African students and help them facilitate their academic requirements."
      },
      {
        question: "How can a school get listed?",
        answer: "Schools can apply through our \"Add Institution\" feature. Our verification team reviews details before publishing."
      },
      {
        question: "How do you ensure schools are genuine?",
        answer: "Each listing is verified through trusted verification channels before being made public."
      }
    ]
  },
  {
    title: "Scientists & Technologists",
    items: [
      {
        question: "Who can be listed as Scientists & Technologists?",
        answer: "Professionals globally that can offer services in different science and technology fields can be listed."
      },
      {
        question: "How do I get listed as a Scientist or Technologist?",
        answer: "Sign in, visit the \"Scientists & Technologists\" section on your dashboard, and click on \"add Scientist & Technologist\" to list your services under selected category."
      },
      {
        question: "How can I delist my services as a Scientist or Technologist?",
        answer: "Sign in, visit the \"Scientists & Technologists\" section on your dashboard, select the preferred profile and click on \"remove Scientist & Technologist\" to delist and deactivate your profile as a Scientist & Technologist. Note that deactivation will clear all your stats and reactivation will require a fresh subscription fee."
      }
    ]
  },
  {
    title: "Specialist Centers",
    items: [
      {
        question: "What Specialist Centers can be listed?",
        answer: "Specialist establishments globally can be listed. These establishments must be capable of hosting African users and helping them facilitate their travel requirements."
      },
      {
        question: "How can I get my Specialist Establishment listed?",
        answer: "Sign in, visit the \"Specialist Centers\" section on your dashboard, and click on \"add Specialist Center\" publish your establishment under selected category."
      },
      {
        question: "How can I delist my Specialist Center?",
        answer: "Sign in, visit the \"Specialist Center\" section on your dashboard, select the preferred center and click on \"remove Specialist Center\" to delist and deactivate that center. Note that deactivation will clear all the stats of the center and reactivation will require a fresh subscription fee."
      }
    ]
  },
  {
    title: "Afro-Innovations",
    items: [
      {
        question: "Who can publish their innovations?",
        answer: "Only inventors and innovators of African descent."
      },
      {
        question: "How can I get my Innovations published?",
        answer: "Sign in, visit the \"Afro – Innovations\" section on your dashboard, and click on \"add Innovations\" publish your innovation under selected category."
      },
      {
        question: "How can I delist my Innovation?",
        answer: "Sign in, visit the \"Afro – Innovations\" section on your dashboard, select the preferred innovation and click on \"remove Innovation\" to delist and deactivate that innovation. Note that deactivation will clear all the stats on the innovation and reactivation will require a fresh subscription fee."
      }
    ]
  },
  {
    title: "Competitions",
    items: [
      {
        question: "Who can participate in competitions?",
        answer: "Only individuals of African descent, currently residing in any African country."
      },
      {
        question: "How do I participate in competitions?",
        answer: "Sign in, visit the \"Competitions\" section on your dashboard, and register under your preferred category."
      },
      {
        question: "Are there prizes or certificates?",
        answer: "Yes. Winners receive digital certificates, recognition badges, and sometimes sponsored competition's prizes."
      }
    ]
  },
  {
    title: "Voting",
    items: [
      {
        question: "Who can vote?",
        answer: "Our community of users signed into the platform is eligible to vote."
      },
      {
        question: "Why do we need to vote?",
        answer: "Votes enable the platform to take unbiased decisions on important aspects of the platform. Votes help us understand the mind of our users on different subject matters."
      },
      {
        question: "What do we vote on?",
        answer: "Decision making aspects of our network that directly affect our community of users are subject to voting. That way, we capture a fair representation of the opinion of our users before implementation."
      }
    ]
  },
  {
    title: "Awards",
    items: [
      {
        question: "Why are awards given?",
        answer: "Awards are given to recognize the outstanding performance of individuals and brands in our different enlightenment programs/schemes. We reward users for their skill, craft, dedication and support which in turn gains them global recognition through our platform."
      },
      {
        question: "Who gets awards?",
        answer: "Professionals, competitors, corporations, students, institutes, specialist centers, team members, sponsors, innovators and donors."
      },
      {
        question: "How unique are the awards?",
        answer: "Every award presented is verifiable in our platform. Given that our platform is global, awards from us are considered authentic and well deserved."
      },
      {
        question: "In what forms are the awards?",
        answer: "Depending on what you're recognized for, our awards can be in a form of scholarships, plaques, certificates, medals, grand prices and publicity."
      }
    ]
  },
  {
    title: "Sponsors",
    items: [
      {
        question: "Who are sponsors?",
        answer: "These are individuals or brands that are in an existing partnership with our network. Sponsors help us expand operations across the African continent and beyond. Our sponsors are genuine and of good reputation."
      },
      {
        question: "What is my benefit as a sponsor?",
        answer: "As a sponsor, we help you grow your business and influence globally. We can also provide technical support for your brand in areas our expertise cover."
      }
    ]
  },
  {
    title: "Volunteering",
    items: [
      {
        question: "Who are volunteers?",
        answer: "Volunteers are individuals that work with the network towards expanding its global reach. They become team members by sharing in the same goals of the network and working towards actualizing them."
      },
      {
        question: "What are my tasks as a volunteer?",
        answer: "Volunteers are involved in regional activities like marketing, surveys, supervision, hosting, coordinating, etc."
      },
      {
        question: "What are my benefits as a volunteer?",
        answer: "As a volunteer, you maintain close contact with the network. Depending on level of input and qualification, you can obtain reference letters, become fully employed with us and enjoy other monetary/non-monetary benefits."
      },
      {
        question: "How do I volunteer?",
        answer: "You can become a volunteer for the platform by applying under the \"Become a Volunteer\" section on your dashboard."
      }
    ]
  },
  {
    title: "Donations",
    items: [
      {
        question: "Who can donate?",
        answer: "Individuals and brands that believe in the solutions our network create. Anyone that appreciates our efforts towards solving the problems that plague the African continent can donate to our course."
      },
      {
        question: "How are my donations used?",
        answer: "Donations help us run our operations, expand our network and stabilize our internal framework."
      },
      {
        question: "How are donors recognized?",
        answer: "Donors are highly appreciated by our network. We recognize them through honorary awards, annual publications and partnerships."
      }
    ]
  },
  {
    title: "Accounts and Privacy",
    items: [
      {
        question: "How do I create, manage or delete my account?",
        answer: "Click \"Sign Up\" or \"Profile Settings\" to create or manage your account respectively. Contact support for deletion requests."
      },
      {
        question: "How is my data protected?",
        answer: "All personal data is encrypted and used strictly within our privacy guidelines."
      }
    ]
  },
  {
    title: "Technical and Support",
    items: [
      {
        question: "What if I can't log in?",
        answer: "Use the \"Forgot Password\" option or contact support for assistance."
      },
      {
        question: "How can I report an issue or give feedback?",
        answer: "To report issues, use our \"Feedback\" icon located at the bottom-right section of your screen. Alternatively, you can visit our \"Contact\" page or email us directly."
      }
    ]
  }
];

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (categoryIndex: number, itemIndex: number) => {
    const key = `${categoryIndex}-${itemIndex}`;
    setOpenItems(prev => 
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const filteredData = FAQ_DATA.map(category => ({
    ...category,
    items: category.items.filter(item => 
      searchTerm === '' ||
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  return (
    <div className="min-h-screen bg-neutral-bg-light py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-brand-red-100 mb-4">
            <HelpCircle className="h-8 w-8 text-brand-red-600" />
          </div>
          <h1 className="text-4xl font-bold text-neutral-black mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-neutral-gray-dark max-w-2xl mx-auto">
            Find answers to common questions about AfriScience Hub, our services, and how to make the most of our platform.
          </p>
        </div>

        {/* Search */}
        <div className="mb-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-gray-medium" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-neutral-gray-light focus:ring-2 focus:ring-brand-red-600 focus:border-brand-red-600 transition-all text-base"
            />
          </div>
        </div>

        {/* FAQ Categories */}
        {filteredData.length > 0 ? (
          <div className="space-y-8">
            {filteredData.map((category, categoryIndex) => (
              <div key={categoryIndex} className="rounded-2xl border border-neutral-gray-light bg-white shadow-sm overflow-hidden">
                <div className="bg-neutral-bg-light px-6 py-4 border-b border-neutral-gray-light">
                  <h2 className="text-xl font-bold text-neutral-black">{category.title}</h2>
                </div>
                <div className="divide-y divide-neutral-gray-light">
                  {category.items.map((item, itemIndex) => {
                    const key = `${categoryIndex}-${itemIndex}`;
                    const isOpen = openItems.includes(key);
                    
                    return (
                      <div key={itemIndex} className="group">
                        <button
                          onClick={() => toggleItem(categoryIndex, itemIndex)}
                          className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-neutral-bg-light/50 transition-colors"
                        >
                          <span className="font-semibold text-neutral-black pr-4 group-hover:text-brand-red-600 transition-colors">
                            {item.question}
                          </span>
                          <ChevronDown className={cn(
                            "h-5 w-5 text-neutral-gray-medium flex-shrink-0 transition-transform",
                            isOpen && "rotate-180"
                          )} />
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-5 animate-in slide-in-from-top-1 duration-200">
                            <p className="text-neutral-gray-dark leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 rounded-2xl border border-neutral-gray-light bg-white">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-neutral-bg-light mb-4">
              <Search className="h-8 w-8 text-neutral-gray-medium" />
            </div>
            <h3 className="font-bold text-neutral-black mb-2">No Results Found</h3>
            <p className="text-neutral-gray-medium">
              Try adjusting your search term or browse through all categories.
            </p>
          </div>
        )}

        {/* Contact Support */}
        <div className="mt-12 text-center p-8 rounded-2xl bg-gradient-to-r from-brand-navy-900 to-brand-navy-800 text-white">
          <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
          <p className="text-white/90 mb-4">
            Our support team is here to help you.
          </p>
          <a 
            href="mailto:support@afrisciencehub.com"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-brand-navy-900 font-bold hover:bg-neutral-bg-light transition-colors"
          >
            Contact Support
          </a>
        </div>

      </div>
    </div>
  );
}
