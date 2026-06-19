'use client';

import { useState } from 'react';
import { X, Send, Phone, MoreVertical } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../../lib/utils';

interface Message {
  id: string;
  sender: 'user' | 'provider';
  text: string;
  timestamp: Date;
}

interface MessagingModalProps {
  isOpen: boolean;
  onClose: () => void;
  providerName: string;
  providerImage?: string;
}

export function MessagingModal({
  isOpen,
  onClose,
  providerName,
  providerImage
}: MessagingModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'provider',
      text: 'Hello! How can I help you today?',
      timestamp: new Date(Date.now() - 1000 * 60 * 5)
    }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setInputText('');

    // Simulate provider response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'provider',
        text: 'Thank you for your message. I will get back to you shortly.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, response]);
    }, 1500);
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
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl h-[600px] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-navy-900 to-brand-navy-800 px-6 py-4 flex items-center justify-between rounded-t-2xl flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white overflow-hidden">
              {providerImage ? (
                <img src={providerImage} alt={providerName} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full bg-brand-red-100 flex items-center justify-center text-brand-red-600 font-bold">
                  {providerName.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <h2 className="text-base font-bold text-white">{providerName}</h2>
              <p className="text-xs text-white/70">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <Phone className="h-4 w-4 text-white" />
            </button>
            <button className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <MoreVertical className="h-4 w-4 text-white" />
            </button>
            <button
              onClick={onClose}
              className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-neutral-bg-light">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.sender === 'user' ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[70%] rounded-2xl px-4 py-3",
                  message.sender === 'user'
                    ? "bg-brand-red-600 text-white"
                    : "bg-white border border-neutral-gray-light text-neutral-black"
                )}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p
                  className={cn(
                    "text-xs mt-1",
                    message.sender === 'user'
                      ? "text-white/70"
                      : "text-neutral-gray-medium"
                  )}
                >
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="border-t border-neutral-gray-light p-4 bg-white rounded-b-2xl flex-shrink-0">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSend();
                }
              }}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 rounded-xl border border-neutral-gray-light focus:ring-2 focus:ring-brand-red-600 focus:border-brand-red-600 transition-all"
            />
            <Button
              onClick={handleSend}
              className="bg-brand-red-600 hover:bg-brand-red-700 px-6"
              disabled={!inputText.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-neutral-gray-medium mt-2 text-center">
            Press Enter to send
          </p>
        </div>
      </div>
    </div>
  );
}
