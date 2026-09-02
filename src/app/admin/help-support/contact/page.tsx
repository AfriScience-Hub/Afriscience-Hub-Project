'use client';

import React, { useState } from 'react';
import { Mail, X, ChevronDown, ChevronLeft, ChevronRight, Copy, CheckCircle, Inbox } from 'lucide-react';
import { cn } from '@/lib/utils';

const MOCK_CONTACTS = [
  { id: 'CTK-2024', name: 'John Doe', email: 'john.doe@email.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200', subject: 'Partnership Inquiry', message: 'Hello, I would like to explore partnership opportunities with AfriScience Hub. Our organization focuses on STEM education across West Africa and we believe a collaboration would be mutually beneficial. Could we schedule a call to discuss further?', time: '2 hours ago', timestamp: 'June 5, 2025 at 9:15 AM', status: 'Unread' },
  { id: 'CTK-2023', name: 'Sarah Johnson', email: 'sarah.j@email.com', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200', subject: 'Technical Support Request', message: 'Hi, I\'m having trouble uploading files to my profile. The upload button seems to be unresponsive. I\'ve tried different browsers but the issue persists. Can you help me resolve this?', time: '5 hours ago', timestamp: 'June 5, 2025 at 6:30 AM', status: 'In Progress' },
  { id: 'CTK-2022', name: 'Emeka Okoro', email: 'emeka.o@email.com', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200', subject: 'General Inquiry', message: 'Good day, I would like to know more about the upcoming innovation challenge. What are the eligibility criteria and how can I register my team?', time: '1 day ago', timestamp: 'June 4, 2025 at 2:45 PM', status: 'Resolved' },
  { id: 'CTK-2021', name: 'Amina Bello', email: 'amina.b@email.com', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200', subject: 'Account Issue', message: 'I\'m unable to log in to my account. I\'ve reset my password twice but still can\'t access it. Please assist.', time: '2 days ago', timestamp: 'June 3, 2025 at 10:20 AM', status: 'Resolved' },
  { id: 'CTK-2020', name: 'Kwame Asante', email: 'kwame.a@email.com', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200', subject: 'Feedback', message: 'I just wanted to say that the new dashboard design looks amazing! Great work by the team.', time: '3 days ago', timestamp: 'June 2, 2025 at 4:10 PM', status: 'Resolved' },
];

const STATUS_CONFIG: Record<string, { color: string; bg: string }> = {
  'Unread': { color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200' },
  'In Progress': { color: 'text-orange-700', bg: 'bg-orange-50 border-orange-200' },
  'Resolved': { color: 'text-green-700', bg: 'bg-green-50 border-green-200' },
};

export default function ContactPage() {
  const [selectedContact, setSelectedContact] = useState<typeof MOCK_CONTACTS[0] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-1.5 text-[11px] text-neutral-gray-medium mb-0.5">
          <span>Dashboard</span><span>/</span><span>Help & Support</span><span>/</span>
          <span className="text-neutral-black font-medium">Contact</span>
        </div>
        <h1 className="text-xl font-bold text-neutral-black">Contact Messages</h1>
        <p className="text-xs text-neutral-gray-dark mt-0.5">Messages and inquiries from users reaching out to the platform.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-lg border border-neutral-gray-light bg-white shadow-sm overflow-hidden">
          <div className="overflow-y-auto max-h-[600px]">
            {MOCK_CONTACTS.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="w-12 h-12 rounded-full bg-neutral-bg-light flex items-center justify-center mb-3">
                  <Inbox className="h-6 w-6 text-neutral-gray-medium" />
                </div>
                <p className="text-sm font-medium text-neutral-black">No messages found</p>
                <p className="text-xs text-neutral-gray-medium mt-1">No contact messages at the moment.</p>
              </div>
            ) : MOCK_CONTACTS.map((contact) => {
              const statusStyle = STATUS_CONFIG[contact.status] || STATUS_CONFIG['Unread'];
              return (
                <button
                  key={contact.id}
                  onClick={() => setSelectedContact(contact)}
                  className={cn(
                    "w-full text-left p-4 border-b border-neutral-gray-light hover:bg-neutral-bg-light/50 cursor-pointer transition-colors",
                    selectedContact?.id === contact.id && "bg-[#453DD8]/5 border-l-2 border-l-[#453DD8]"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <img src={contact.avatar} alt={contact.name} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <p className="text-xs font-medium text-neutral-black truncate">{contact.subject}</p>
                        <span className={cn("px-1.5 py-0.5 rounded text-[9px] font-semibold border flex-shrink-0", statusStyle.bg, statusStyle.color)}>
                          {contact.status}
                        </span>
                      </div>
                      <p className="text-[10px] text-neutral-gray-medium">{contact.name} · {contact.email}</p>
                      <p className="text-[10px] text-neutral-gray-medium mt-0.5">{contact.time}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="flex items-center justify-between px-3 py-2 border-t border-neutral-gray-light">
            <p className="text-[11px] text-neutral-gray-dark">Showing 1 to {MOCK_CONTACTS.length} of {MOCK_CONTACTS.length} messages</p>
            <div className="flex items-center gap-1">
              <button className="p-1 rounded hover:bg-neutral-bg-light cursor-pointer"><ChevronLeft className="h-3.5 w-3.5 text-neutral-gray-medium" /></button>
              {[1, 2].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={cn(
                    "w-6 h-6 rounded text-[11px] font-medium cursor-pointer",
                    currentPage === page ? "bg-[#453DD8] text-white" : "hover:bg-neutral-bg-light text-neutral-gray-dark"
                  )}
                >
                  {page}
                </button>
              ))}
              <button className="p-1 rounded hover:bg-neutral-bg-light cursor-pointer"><ChevronRight className="h-3.5 w-3.5 text-neutral-gray-medium" /></button>
            </div>
          </div>
        </div>

        <div className="hidden lg:block">
          {selectedContact ? (
            <ContactDetail contact={selectedContact} onClose={() => setSelectedContact(null)} />
          ) : (
            <div className="rounded-lg border border-neutral-gray-light bg-white shadow-sm h-full flex items-center justify-center">
              <p className="text-xs text-neutral-gray-medium">Select a message to view details</p>
            </div>
          )}
        </div>
      </div>

      {selectedContact && (
        <div className="fixed inset-0 z-50 lg:hidden flex items-center justify-center bg-black/50 p-4" onClick={() => setSelectedContact(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <ContactDetail contact={selectedContact} onClose={() => setSelectedContact(null)} />
          </div>
        </div>
      )}
    </div>
  );
}

function ContactDetail({ contact, onClose }: { contact: typeof MOCK_CONTACTS[0]; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const statusStyle = STATUS_CONFIG[contact.status] || STATUS_CONFIG['Unread'];

  const copyId = () => {
    navigator.clipboard.writeText(contact.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg border border-neutral-gray-light shadow-sm h-full">
      <div className="p-4 border-b border-neutral-gray-light flex items-center justify-between">
        <span className={cn("px-2 py-0.5 rounded text-[10px] font-semibold border", statusStyle.bg, statusStyle.color)}>
          {contact.status}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-neutral-gray-medium">Ticket ID: {contact.id}</span>
          <button onClick={copyId} className="cursor-pointer text-neutral-gray-medium hover:text-neutral-black">
            <Copy className="h-3.5 w-3.5" />
          </button>
          <button onClick={onClose} className="lg:hidden cursor-pointer text-neutral-gray-medium hover:text-neutral-black">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Mail className="h-4 w-4 text-blue-600" />
            <span className="text-xs font-medium text-neutral-black">{contact.subject}</span>
          </div>
          <p className="text-[10px] text-neutral-gray-medium">{contact.time} · {contact.timestamp}</p>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-neutral-black mb-2">Message</h4>
          <p className="text-xs text-neutral-gray-dark leading-relaxed">{contact.message}</p>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-neutral-black mb-2">User Information</h4>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={contact.avatar} alt={contact.name} className="w-8 h-8 rounded-full object-cover" />
              <div>
                <p className="text-xs font-medium text-neutral-black">{contact.name}</p>
                <p className="text-[10px] text-neutral-gray-medium">{contact.email}</p>
              </div>
            </div>
            <button className="text-[10px] text-[#453DD8] font-medium hover:underline cursor-pointer">
              View Profile →
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <button className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#453DD8] text-white text-xs font-medium rounded-lg hover:bg-[#3a33c0] cursor-pointer transition-colors">
            Mark as In Progress
          </button>
          <button className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 border border-green-500 text-green-700 text-xs font-medium rounded-lg hover:bg-green-50 cursor-pointer transition-colors">
            <CheckCircle className="h-3.5 w-3.5" />
            Resolve Ticket
          </button>
        </div>
      </div>
    </div>
  );
}
