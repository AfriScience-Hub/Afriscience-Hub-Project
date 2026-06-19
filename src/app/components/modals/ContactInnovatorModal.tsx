'use client';

import { useState } from 'react';
import { X, Send, Mail, User, Building2, Target, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../../lib/utils';
import { toast } from 'sonner';

interface Message {
  id: string;
  sender: 'user' | 'system' | 'innovator';
  text: string;
  timestamp: Date;
}

interface ContactInnovatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  innovatorName: string;
  innovatorImage?: string;
  innovationName: string;
}

type ViewMode = 'form' | 'chat';

export function ContactInnovatorModal({
  isOpen,
  onClose,
  innovatorName,
  innovatorImage,
  innovationName
}: ContactInnovatorModalProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('form');
  
  // Form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [organization, setOrganization] = useState('');
  const [purpose, setPurpose] = useState('');

  // Chat state
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatInput, setChatInput] = useState('');

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!fullName.trim()) {
      toast.error('Please enter your full name');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    if (!message.trim()) {
      toast.error('Please enter your message');
      return;
    }

    // Create initial messages for chat
    const initialMessages: Message[] = [
      {
        id: '1',
        sender: 'user',
        text: message,
        timestamp: new Date()
      },
      {
        id: '2',
        sender: 'system',
        text: 'Your message has been received. The innovator will respond shortly.',
        timestamp: new Date(Date.now() + 1000)
      }
    ];

    setMessages(initialMessages);
    setViewMode('chat');
    toast.success('Message sent successfully!');
  };

  const handleSendChatMessage = () => {
    if (!chatInput.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: chatInput,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setChatInput('');

    // Simulate system response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'system',
        text: 'Your follow-up message has been sent. The innovator will be notified.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, response]);
    }, 1000);

    toast.success('Follow-up message sent');
  };

  const handleClose = () => {
    setViewMode('form');
    setFullName('');
    setEmail('');
    setMessage('');
    setOrganization('');
    setPurpose('');
    setMessages([]);
    setChatInput('');
    onClose();
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-navy-900 to-brand-navy-800 px-6 py-5 flex items-center justify-between rounded-t-2xl flex-shrink-0">
          <div>
            <h2 className="text-xl font-bold text-white">Contact Innovator</h2>
            <p className="text-sm text-white/70 mt-1">{innovatorName} • {innovationName}</p>
          </div>
          <button
            onClick={handleClose}
            className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="h-5 w-5 text-white" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          
          {/* FORM VIEW */}
          {viewMode === 'form' && (
            <form onSubmit={handleSubmitForm} className="p-6 space-y-5">
              
              {/* Trust Message */}
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 flex gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-blue-900 font-medium">Platform-Facilitated Communication</p>
                  <p className="text-xs text-blue-800 mt-1">
                    All communications are facilitated through AfriScience Hub to ensure quality and proper engagement.
                  </p>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-sm font-bold text-neutral-black mb-2">
                  Full Name <span className="text-brand-red-600">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-gray-medium pointer-events-none" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-gray-light focus:ring-2 focus:ring-brand-red-600 focus:border-brand-red-600 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-bold text-neutral-black mb-2">
                  Email Address <span className="text-brand-red-600">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-gray-medium pointer-events-none" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-gray-light focus:ring-2 focus:ring-brand-red-600 focus:border-brand-red-600 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-bold text-neutral-black mb-2">
                  Message / Inquiry <span className="text-brand-red-600">*</span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell the innovator about your interest, questions, or proposal..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-gray-light focus:ring-2 focus:ring-brand-red-600 focus:border-brand-red-600 transition-all resize-none"
                  required
                />
                <p className="text-xs text-neutral-gray-medium mt-1.5">
                  {message.length} / 1000 characters
                </p>
              </div>

              {/* Organization (Optional) */}
              <div>
                <label className="block text-sm font-bold text-neutral-black mb-2">
                  Organization / Company <span className="text-neutral-gray-medium text-xs font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-gray-medium pointer-events-none" />
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="Your organization name"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-gray-light focus:ring-2 focus:ring-brand-red-600 focus:border-brand-red-600 transition-all"
                  />
                </div>
              </div>

              {/* Purpose (Optional) */}
              <div>
                <label className="block text-sm font-bold text-neutral-black mb-2">
                  Purpose <span className="text-neutral-gray-medium text-xs font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <Target className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-gray-medium pointer-events-none" />
                  <select
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-gray-light focus:ring-2 focus:ring-brand-red-600 focus:border-brand-red-600 transition-all appearance-none bg-white"
                  >
                    <option value="">Select purpose of contact</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="funding">Funding / Investment</option>
                    <option value="inquiry">General Inquiry</option>
                    <option value="partnership">Partnership</option>
                    <option value="research">Research Interest</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full bg-brand-red-600 hover:bg-brand-red-700 py-3 text-base font-bold"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </form>
          )}

          {/* CHAT VIEW */}
          {viewMode === 'chat' && (
            <div className="flex flex-col h-full">
              
              {/* Success Banner */}
              <div className="p-4 bg-green-50 border-b border-green-100 flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-green-900">Message Sent Successfully</p>
                  <p className="text-xs text-green-700">You can continue the conversation below</p>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-neutral-bg-light min-h-[300px]">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex",
                      msg.sender === 'user' ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[75%] rounded-2xl px-4 py-3",
                        msg.sender === 'user'
                          ? "bg-brand-red-600 text-white"
                          : msg.sender === 'system'
                          ? "bg-blue-100 text-blue-900 border border-blue-200"
                          : "bg-white border border-neutral-gray-light text-neutral-black"
                      )}
                    >
                      {msg.sender === 'system' && (
                        <div className="flex items-center gap-2 mb-1">
                          <AlertCircle className="h-3.5 w-3.5" />
                          <span className="text-xs font-bold uppercase">System</span>
                        </div>
                      )}
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                      <p
                        className={cn(
                          "text-xs mt-1",
                          msg.sender === 'user'
                            ? "text-white/70"
                            : msg.sender === 'system'
                            ? "text-blue-700"
                            : "text-neutral-gray-medium"
                        )}
                      >
                        {formatTime(msg.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust Message in Chat */}
              <div className="px-6 py-3 bg-amber-50 border-t border-amber-100">
                <p className="text-xs text-amber-800 text-center leading-relaxed">
                  <AlertCircle className="inline h-3 w-3 mr-1 -mt-0.5" />
                  All communications are facilitated through AfriScience Hub to ensure quality and proper engagement.
                </p>
              </div>

              {/* Input Area */}
              <div className="border-t border-neutral-gray-light p-4 bg-white rounded-b-2xl">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSendChatMessage();
                      }
                    }}
                    placeholder="Type a follow-up message..."
                    className="flex-1 px-4 py-3 rounded-xl border border-neutral-gray-light focus:ring-2 focus:ring-brand-red-600 focus:border-brand-red-600 transition-all"
                  />
                  <Button
                    onClick={handleSendChatMessage}
                    className="bg-brand-red-600 hover:bg-brand-red-700 px-6"
                    disabled={!chatInput.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-neutral-gray-medium mt-2 text-center">
                  Press Enter to send
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
