'use client';

import { useEffect, useMemo, useRef } from 'react';
import {
  AlertCircle, ArrowLeft, CheckCheck, Loader2, MoreVertical,
} from 'lucide-react';
import { Avatar } from '@/app/components/Avatar';
import { MessageBubble } from '@/app/components/messaging/MessageBubble';
import { ChatComposer } from '@/app/components/messaging/ChatComposer';
import { formatMessageDay } from '@/app/components/messaging/chatTime';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import type { ChatMessage, Conversation } from '@/lib/conversations';

interface ChatPanelProps {
  conversation: Conversation | null;
  messages: ChatMessage[];
  loading?: boolean;
  sending?: boolean;
  markingRead?: boolean;
  onBack: () => void;
  onSend: (message: string) => Promise<void>;
  onMarkRead: () => void;
}

export default function ChatPanel({
  conversation,
  messages,
  loading = false,
  sending = false,
  markingRead = false,
  onBack,
  onSend,
  onMarkRead,
}: ChatPanelProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' });
  }, [messages.length, conversation?.id]);

  const grouped = useMemo(() => {
    const rows: { day: string; messages: ChatMessage[] }[] = [];
    messages.forEach((message) => {
      const day = formatMessageDay(message.createdAt);
      const last = rows[rows.length - 1];
      if (last && last.day === day) last.messages.push(message);
      else rows.push({ day, messages: [message] });
    });
    return rows;
  }, [messages]);

  if (!conversation) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 bg-neutral-bg-light/40 p-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-red-50">
          <CheckCheck className="h-7 w-7 text-brand-red-500" />
        </div>
        <div>
          <p className="text-base font-semibold text-neutral-black">Select to start messaging</p>
          <p className="mt-1 text-sm text-neutral-gray-medium">Choose a conversation from the list to view the chat.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col bg-neutral-bg-light/40">
      <header className="flex items-center gap-3 border-b border-neutral-gray-light bg-white px-3 py-3 sm:px-4">
        <button
          type="button"
          onClick={onBack}
          className="rounded-full p-1.5 text-neutral-gray-dark hover:bg-neutral-gray-light lg:hidden"
          aria-label="Back to conversations"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <Avatar src={conversation.participantAvatar} name={conversation.participantName} size="md" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate text-sm font-bold text-neutral-black">{conversation.participantName}</p>
            {conversation.isDemo && (
              <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-amber-700">
                Demo
              </span>
            )}
          </div>
          <p className="truncate text-xs font-medium text-brand-red-600">{conversation.listingName}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="rounded-full p-2 text-neutral-gray-medium transition hover:bg-neutral-gray-light hover:text-neutral-black"
              aria-label="Conversation actions"
            >
              {markingRead
                ? <Loader2 className="h-4 w-4 animate-spin" />
                : <MoreVertical className="h-4 w-4" />}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem
              disabled={conversation.unreadCount === 0 || conversation.isDemo}
              onSelect={onMarkRead}
            >
              <CheckCheck className="h-4 w-4 text-brand-red-600" />
              Mark as read
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto px-3 py-4 sm:px-4">
        {loading ? (
          <div className="flex h-full items-center justify-center text-sm text-neutral-gray-medium">
            <Loader2 className="mr-2 h-4 w-4 animate-spin text-brand-red-600" />
            Loading messages...
          </div>
        ) : messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <p className="text-sm font-semibold text-neutral-black">No messages yet</p>
            <p className="mt-1 text-xs text-neutral-gray-medium">Send a message to start this conversation.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {grouped.map((group) => (
              <div key={group.day} className="space-y-3">
                <div className="flex justify-center">
                  <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-medium text-neutral-gray-medium shadow-sm ring-1 ring-neutral-gray-light">
                    {group.day}
                  </span>
                </div>
                {group.messages.map((message) => (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    senderName={conversation.participantName}
                  />
                ))}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      <footer className="border-t border-neutral-gray-light bg-white p-3 sm:p-4">
        {conversation.isDemo ? (
          <p className="py-2 text-center text-xs text-neutral-gray-medium">
            Demo conversation preview — sending is disabled.
          </p>
        ) : conversation.canSend === false ? (
          <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            {conversation.sendBlockedReason || 'Messaging is currently unavailable for this conversation.'}
          </div>
        ) : (
          <ChatComposer
            onSend={onSend}
            disabled={sending || loading}
            placeholder="Type a message..."
          />
        )}
      </footer>
    </div>
  );
}
