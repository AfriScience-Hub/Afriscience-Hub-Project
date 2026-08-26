'use client';

import React from 'react';
import { HelpCircle, MessageCircle, Book, FileText, Mail, Phone } from 'lucide-react';

const helpTopics = [
  { title: 'Getting Started', description: 'Learn the basics of managing the platform', icon: Book },
  { title: 'User Management', description: 'How to manage users, roles, and permissions', icon: HelpCircle },
  { title: 'Content Moderation', description: 'Approve, reject, and manage listings', icon: FileText },
  { title: 'Troubleshooting', description: 'Common issues and how to resolve them', icon: MessageCircle },
];

export default function HelpSupportPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-black">Help & Support</h1>
        <p className="text-sm text-neutral-gray-dark mt-1">Get help with managing the platform.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {helpTopics.map((topic) => (
          <div key={topic.title} className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="p-2 bg-neutral-bg-light rounded-lg w-fit mb-3">
              <topic.icon className="h-5 w-5 text-neutral-gray-dark" />
            </div>
            <h3 className="text-sm font-semibold text-neutral-black">{topic.title}</h3>
            <p className="text-xs text-neutral-gray-dark mt-1">{topic.description}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-neutral-black mb-4">Contact Support</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 rounded-lg border border-neutral-gray-light">
            <Mail className="h-5 w-5 text-neutral-gray-medium" />
            <div>
              <p className="text-sm font-medium text-neutral-black">Email</p>
              <p className="text-xs text-neutral-gray-dark">support@afrisciencehub.com</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg border border-neutral-gray-light">
            <Phone className="h-5 w-5 text-neutral-gray-medium" />
            <div>
              <p className="text-sm font-medium text-neutral-black">Phone</p>
              <p className="text-xs text-neutral-gray-dark">+234 800 123 4567</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-neutral-gray-light bg-white p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-neutral-black mb-4">FAQs</h3>
        <div className="space-y-3">
          {[
            'How do I approve a new institution?',
            'How do I create a new competition?',
            'How do I export user data?',
            'How do I manage sponsor applications?',
          ].map((faq, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-neutral-gray-light hover:bg-neutral-bg-light cursor-pointer">
              <HelpCircle className="h-4 w-4 text-neutral-gray-medium flex-shrink-0" />
              <span className="text-sm text-neutral-black">{faq}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
