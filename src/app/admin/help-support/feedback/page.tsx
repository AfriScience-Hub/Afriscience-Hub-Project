'use client';

import React, { useState } from 'react';
import { MessageCircle, AlertTriangle, CheckCircle, ThumbsUp, X, ChevronDown, ChevronLeft, ChevronRight, Copy, Inbox } from 'lucide-react';
import { cn } from '@/lib/utils';

const CATEGORIES = ['All Categories', 'Suggestion', 'Report', 'Sponsorship & Partnership', 'Complaint', 'Other'];
const TYPES = ['All Types', 'Institutes', 'Scientists & Technologies', 'Specialist Centers', 'Afro-Innovations', 'Voting', 'Competition', 'Awards'];
const STATUSES = ['All Status', 'Unread', 'In Progress', 'Resolved'];

const MOCK_TICKETS = [
  { id: 'ITK-1024', title: 'Kindly help me upload my project...', type: 'Afro-Innovations', time: '2 mins ago', timestamp: 'June 5, 2025 at 11:24 AM', status: 'Unread', category: 'Complaint', message: 'Kindly help me upload my project. I keep getting an error when I try to submit. Thanks.', user: { name: 'John Doe', email: 'john.doe@email.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200' } },
  { id: 'ITK-1023', title: 'Great platform! Just wanted to say...', type: 'Institutes', time: '15 mins ago', timestamp: 'June 5, 2025 at 11:09 AM', status: 'Unread', category: 'Suggestion', message: 'Great platform! Just wanted to say how much I love what you are doing for African science and technology. Keep it up!', user: { name: 'Sarah Johnson', email: 'sarah.j@email.com', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200' } },
  { id: 'ITK-1022', title: 'There is an issue with voting. It keeps...', type: 'Voting', time: '1 hour ago', timestamp: 'June 5, 2025 at 10:24 AM', status: 'In Progress', category: 'Complaint', message: 'There is an issue with voting. It keeps saying my vote has already been submitted even though I haven\'t voted yet. Please fix this.', user: { name: 'Emeka Okoro', email: 'emeka.o@email.com', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200' } },
  { id: 'ITK-1021', title: 'Please I can\'t access my account', type: 'Awards', time: '2 hours ago', timestamp: 'June 5, 2025 at 9:24 AM', status: 'In Progress', category: 'Report', message: 'Please I can\'t access my account. I\'ve tried resetting my password but I\'m not receiving the reset email. Can you help?', user: { name: 'Amina Bello', email: 'amina.b@email.com', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200' } },
  { id: 'ITK-1020', title: 'Love the impact stories section', type: 'Scientists & Technologies', time: '3 hours ago', timestamp: 'June 5, 2025 at 8:24 AM', status: 'Resolved', category: 'Suggestion', message: 'Love the impact stories section! It\'s really inspiring to see all the great work being done across Africa. Please keep adding more stories.', user: { name: 'Kwame Asante', email: 'kwame.a@email.com', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200' } },
  { id: 'ITK-1019', title: 'The link to the institute is not working', type: 'Institutes', time: '5 hours ago', timestamp: 'June 5, 2025 at 6:24 AM', status: 'In Progress', category: 'Report', message: 'The link to the institute is not working. When I click on it, it shows a 404 error. Please fix this.', user: { name: 'Chioma Nwosu', email: 'chioma.n@email.com', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200' } },
  { id: 'ITK-1018', title: 'I want to partner with Afrisciencehub', type: 'Specialist Centers', time: '1 day ago', timestamp: 'June 4, 2025 at 11:24 AM', status: 'Resolved', category: 'Sponsorship & Partnership', message: 'I want to partner with Afrisciencehub. Our organization is interested in sponsoring some of your programs. How can we proceed?', user: { name: 'David Osei', email: 'david.o@email.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200' } },
  { id: 'ITK-1017', title: 'Payment issue on competition entry', type: 'Competition', time: '2 days ago', timestamp: 'June 3, 2025 at 3:10 PM', status: 'Resolved', category: 'Other', message: 'I tried to pay for my competition entry but the payment did not go through. My account was debited though.', user: { name: 'Fatima Ali', email: 'fatima.ali@email.com', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200' } },
];

const STATUS_CONFIG: Record<string, { color: string; bg: string }> = {
  'Unread': { color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200' },
  'In Progress': { color: 'text-orange-700', bg: 'bg-orange-50 border-orange-200' },
  'Resolved': { color: 'text-green-700', bg: 'bg-green-50 border-green-200' },
};

const CATEGORY_ICON: Record<string, { icon: React.ComponentType<{ className?: string }>; color: string; bg: string }> = {
  'Complaint': { icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
  'Suggestion': { icon: ThumbsUp, color: 'text-green-600', bg: 'bg-green-50' },
  'Report': { icon: AlertTriangle, color: 'text-orange-600', bg: 'bg-orange-50' },
  'Sponsorship & Partnership': { icon: MessageCircle, color: 'text-purple-600', bg: 'bg-purple-50' },
  'Other': { icon: MessageCircle, color: 'text-blue-600', bg: 'bg-blue-50' },
};

export default function FeedbackPage() {
  const [selectedTicket, setSelectedTicket] = useState<typeof MOCK_TICKETS[0] | null>(null);
  const [categoryFilter, setCategoryFilter] = useState(CATEGORIES[0]);
  const [typeFilter, setTypeFilter] = useState(TYPES[0]);
  const [statusFilter, setStatusFilter] = useState(STATUSES[0]);
  const [currentPage, setCurrentPage] = useState(1);

  const stats = [
    { label: 'All', value: MOCK_TICKETS.length, icon: MessageCircle, bg: 'bg-purple-50', color: 'text-purple-600' },
    { label: 'Unread', value: MOCK_TICKETS.filter(t => t.status === 'Unread').length, icon: MessageCircle, bg: 'bg-blue-50', color: 'text-blue-600' },
    { label: 'In Progress', value: MOCK_TICKETS.filter(t => t.status === 'In Progress').length, icon: AlertTriangle, bg: 'bg-orange-50', color: 'text-orange-600' },
    { label: 'Resolved', value: MOCK_TICKETS.filter(t => t.status === 'Resolved').length, icon: CheckCircle, bg: 'bg-green-50', color: 'text-green-600' },
    { label: 'Feedback', value: MOCK_TICKETS.filter(t => t.category === 'Suggestion').length, icon: ThumbsUp, bg: 'bg-blue-50', color: 'text-blue-600' },
    { label: 'Complaints', value: MOCK_TICKETS.filter(t => t.category === 'Complaint').length, icon: AlertTriangle, bg: 'bg-red-50', color: 'text-red-600' },
  ];

  const filteredTickets = MOCK_TICKETS.filter((ticket) => {
    const matchesCategory = categoryFilter === CATEGORIES[0] || ticket.category === categoryFilter;
    const matchesType = typeFilter === TYPES[0] || ticket.type === typeFilter;
    const matchesStatus = statusFilter === STATUSES[0] || ticket.status === statusFilter;
    return matchesCategory && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center gap-1.5 text-[11px] text-neutral-gray-medium mb-0.5">
          <span>Dashboard</span><span>/</span><span>Help & Support</span><span>/</span>
          <span className="text-neutral-black font-medium">Feedback</span>
        </div>
        <h1 className="text-xl font-bold text-neutral-black">Help & Support</h1>
        <p className="text-xs text-neutral-gray-dark mt-0.5">All messages, feedback and complaints from users.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-neutral-gray-light bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2.5 mb-2">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center ${stat.bg}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
              <span className="text-xs font-medium text-neutral-gray-dark">{stat.label}</span>
            </div>
            <p className="text-2xl font-bold text-neutral-black">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {[
          { value: categoryFilter, options: CATEGORIES, onChange: setCategoryFilter },
          { value: typeFilter, options: TYPES, onChange: setTypeFilter },
          { value: statusFilter, options: STATUSES, onChange: setStatusFilter },
        ].map((filter, idx) => (
          <div key={idx} className="relative">
            <select
              value={filter.value}
              onChange={(e) => filter.onChange(e.target.value)}
              className="appearance-none px-3 py-1.5 pr-8 text-xs border border-neutral-gray-light rounded-lg text-neutral-gray-dark bg-white hover:bg-neutral-bg-light cursor-pointer outline-none"
            >
              {filter.options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-neutral-gray-medium pointer-events-none" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-lg border border-neutral-gray-light bg-white shadow-sm overflow-hidden">
          <div className="overflow-y-auto max-h-[500px]">
            {filteredTickets.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="w-12 h-12 rounded-full bg-neutral-bg-light flex items-center justify-center mb-3">
                  <Inbox className="h-6 w-6 text-neutral-gray-medium" />
                </div>
                <p className="text-sm font-medium text-neutral-black">No messages found</p>
                <p className="text-xs text-neutral-gray-medium mt-1 text-center">No messages match your selected filters. Try changing the filters.</p>
              </div>
            ) : filteredTickets.map((ticket) => {
              const iconConfig = CATEGORY_ICON[ticket.category] || CATEGORY_ICON['Other'];
              const Icon = iconConfig.icon;
              const statusStyle = STATUS_CONFIG[ticket.status] || STATUS_CONFIG['Unread'];
              return (
                <button
                  key={ticket.id}
                  onClick={() => setSelectedTicket(ticket)}
                  className={cn(
                    "w-full text-left p-4 border-b border-neutral-gray-light hover:bg-neutral-bg-light/50 cursor-pointer transition-colors",
                    selectedTicket?.id === ticket.id && "bg-[#453DD8]/5 border-l-2 border-l-[#453DD8]"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${iconConfig.bg}`}>
                      <Icon className={`h-4 w-4 ${iconConfig.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <p className="text-xs font-medium text-neutral-black truncate">{ticket.title}</p>
                        <span className={cn("px-1.5 py-0.5 rounded text-[9px] font-semibold border flex-shrink-0", statusStyle.bg, statusStyle.color)}>
                          {ticket.status}
                        </span>
                      </div>
                      <p className="text-[10px] text-neutral-gray-medium">{ticket.type} · {ticket.category}</p>
                      <p className="text-[10px] text-neutral-gray-medium mt-0.5">{ticket.time}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="flex items-center justify-between px-3 py-2 border-t border-neutral-gray-light">
            <p className="text-[11px] text-neutral-gray-dark">Showing 1 to {filteredTickets.length} of {filteredTickets.length} tickets</p>
            <div className="flex items-center gap-1">
              <button className="p-1 rounded hover:bg-neutral-bg-light cursor-pointer"><ChevronLeft className="h-3.5 w-3.5 text-neutral-gray-medium" /></button>
              {[1, 2, 3].map((page) => (
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
              <span className="text-neutral-gray-medium px-0.5">…</span>
              <button className="w-6 h-6 rounded text-[11px] font-medium hover:bg-neutral-bg-light text-neutral-gray-dark cursor-pointer">10</button>
              <button className="p-1 rounded hover:bg-neutral-bg-light cursor-pointer"><ChevronRight className="h-3.5 w-3.5 text-neutral-gray-medium" /></button>
            </div>
          </div>
        </div>

        <div className="hidden lg:block">
          {selectedTicket ? (
            <TicketDetail ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />
          ) : (
            <div className="rounded-lg border border-neutral-gray-light bg-white shadow-sm h-full flex items-center justify-center min-h-[300px]">
              <p className="text-xs text-neutral-gray-medium">Select a message to view details</p>
            </div>
          )}
        </div>
      </div>

      {selectedTicket && (
        <div className="fixed inset-0 z-50 lg:hidden flex items-center justify-center bg-black/50 p-4" onClick={() => setSelectedTicket(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <TicketDetail ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />
          </div>
        </div>
      )}
    </div>
  );
}

function TicketDetail({ ticket, onClose }: { ticket: typeof MOCK_TICKETS[0]; onClose: () => void }) {
  const statusStyle = STATUS_CONFIG[ticket.status] || STATUS_CONFIG['Unread'];

  const copyId = () => {
    navigator.clipboard.writeText(ticket.id);
  };

  return (
    <div className="bg-white rounded-lg border border-neutral-gray-light shadow-sm h-full">
      <div className="p-4 border-b border-neutral-gray-light flex items-center justify-between">
        <span className={cn("px-2 py-0.5 rounded text-[10px] font-semibold border", statusStyle.bg, statusStyle.color)}>
          {ticket.status}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-neutral-gray-medium">Ticket ID: {ticket.id}</span>
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
            <MessageCircle className="h-4 w-4 text-blue-600" />
            <span className="text-xs font-medium text-neutral-black">{ticket.type} · {ticket.category}</span>
          </div>
          <p className="text-[10px] text-neutral-gray-medium">{ticket.time} · {ticket.timestamp}</p>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-neutral-black mb-2">Message</h4>
          <p className="text-xs text-neutral-gray-dark leading-relaxed">{ticket.message}</p>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-neutral-black mb-2">User Information</h4>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={ticket.user.avatar} alt={ticket.user.name} className="w-8 h-8 rounded-full object-cover" />
              <div>
                <p className="text-xs font-medium text-neutral-black">{ticket.user.name}</p>
                <p className="text-[10px] text-neutral-gray-medium">{ticket.user.email}</p>
              </div>
            </div>
            <button className="text-[10px] text-[#453DD8] font-medium hover:underline cursor-pointer">
              View Profile →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-xs font-semibold text-neutral-black mb-1">Category</h4>
            <p className="text-[10px] text-neutral-gray-dark">{ticket.category}</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-neutral-black mb-1">Type</h4>
            <p className="text-[10px] text-neutral-gray-dark">{ticket.type}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <button className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#453DD8] text-white text-xs font-medium rounded-lg hover:bg-[#3a33c0] cursor-pointer transition-colors">
            <AlertTriangle className="h-3.5 w-3.5" />
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
