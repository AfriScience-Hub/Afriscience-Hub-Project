'use client';

import { Check, CheckCheck } from 'lucide-react';
import type { ChatMessage } from '@/lib/conversations';
import { cn } from '@/lib/utils';
import { formatMessageTime } from './chatTime';

interface MessageBubbleProps {
  message: ChatMessage;
  senderName?: string;
  className?: string;
}

/** A single WhatsApp-style chat bubble with sent/read ticks on own messages. */
export function MessageBubble({ message, senderName, className }: MessageBubbleProps) {
  return (
    <div className={cn('flex', message.isMine ? 'justify-end' : 'justify-start', className)}>
      <div
        className={cn(
          'max-w-[82%] rounded-2xl px-3.5 py-2.5 shadow-sm sm:max-w-[72%]',
          message.isMine
            ? 'rounded-br-sm border border-neutral-gray-light bg-white text-neutral-black'
            : 'rounded-bl-sm border border-brand-navy-900 bg-brand-navy-900 text-white',
        )}
      >
        {!message.isMine && senderName && (
          <p className="mb-1 text-[11px] font-bold text-white/80">{senderName}</p>
        )}
        <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">{message.text}</p>
        <div className="mt-1 flex items-center justify-end gap-1">
          <span className={cn(
            'text-[10px]',
            message.isMine ? 'text-neutral-gray-medium' : 'text-white/70',
          )}>
            {formatMessageTime(message.createdAt)}
          </span>
          {message.isMine && (
            message.read ? (
              <CheckCheck className="h-3.5 w-3.5 text-brand-red-600" aria-label="Read" />
            ) : (
              <Check className="h-3.5 w-3.5 text-brand-red-600" aria-label="Sent" />
            )
          )}
        </div>
      </div>
    </div>
  );
}
