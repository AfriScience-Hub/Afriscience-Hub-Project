'use client';

import { useEffect, useRef } from 'react';
import { AlertCircle, CheckCircle, Loader2, RefreshCw } from 'lucide-react';
import { MessageBubble } from '@/app/components/messaging/MessageBubble';
import { ChatComposer } from '@/app/components/messaging/ChatComposer';
import { formatMessageDay } from '@/app/components/messaging/chatTime';
import type { ChatMessage } from '@/lib/conversations';
import { cn } from '@/lib/utils';

interface ContactInnovatorChatProps {
  innovatorName: string;
  messages: ChatMessage[];
  loading: boolean;
  sending: boolean;
  canReply: boolean;
  sendBlockedReason?: string;
  justStarted: boolean;
  refreshing: boolean;
  onSend: (message: string) => Promise<void>;
  onRefresh: () => void;
}

export default function ContactInnovatorChat({
  innovatorName,
  messages,
  loading,
  sending,
  canReply,
  sendBlockedReason,
  justStarted,
  refreshing,
  onSend,
  onRefresh,
}: ContactInnovatorChatProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' });
  }, [messages.length]);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {justStarted && (
        <div className="flex items-center gap-3 border-b border-green-100 bg-green-50 p-4">
          <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600" />
          <div>
            <p className="text-sm font-medium text-green-900">Message sent successfully</p>
            <p className="text-xs text-green-700">The innovator will respond in this conversation.</p>
          </div>
        </div>
      )}

      <div className="min-h-[280px] flex-1 space-y-3 overflow-y-auto bg-neutral-bg-light p-5">
        {loading ? (
          <div className="flex h-full items-center justify-center text-sm text-neutral-gray-medium">
            <Loader2 className="mr-2 h-4 w-4 animate-spin text-brand-red-600" />
            Loading conversation...
          </div>
        ) : messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <p className="text-sm font-semibold text-neutral-black">No messages yet</p>
            <p className="mt-1 text-xs text-neutral-gray-medium">
              {canReply ? 'Send your first message below.' : 'Waiting for the innovator to respond.'}
            </p>
          </div>
        ) : (
          messages.map((message, index) => {
            const day = formatMessageDay(message.createdAt);
            const previousDay = index > 0 ? formatMessageDay(messages[index - 1].createdAt) : null;
            return (
              <div key={message.id} className="space-y-3">
                {day !== previousDay && (
                  <div className="flex justify-center">
                    <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-medium text-neutral-gray-medium shadow-sm ring-1 ring-neutral-gray-light">
                      {day}
                    </span>
                  </div>
                )}
                <MessageBubble message={message} senderName={innovatorName} />
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      <div className="border-t border-neutral-gray-light bg-white p-4">
        {!canReply && (
          <div className="mb-3 flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>
              {sendBlockedReason
                || `Waiting for ${innovatorName || 'the innovator'} to respond before you can send another message.`}
            </span>
            {!sendBlockedReason && (
              <button
                type="button"
                onClick={onRefresh}
                disabled={refreshing}
                className="ml-auto inline-flex shrink-0 items-center gap-1 rounded-md border border-amber-300 bg-white px-2 py-1 font-semibold text-amber-800 hover:bg-amber-100 disabled:opacity-50"
              >
                <RefreshCw className={cn('h-3 w-3', refreshing && 'animate-spin')} />
                Check
              </button>
            )}
          </div>
        )}
        <ChatComposer
          onSend={onSend}
          disabled={!canReply || loading || sending}
          placeholder={canReply ? 'Type your reply...' : sendBlockedReason ? 'Messaging is unavailable...' : 'Waiting for a response...'}
        />
      </div>
    </div>
  );
}
