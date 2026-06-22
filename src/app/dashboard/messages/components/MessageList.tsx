'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { Message } from '../../data';

interface MessageListProps {
  messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
  return (
    <div className="divide-y divide-neutral-gray-light">
      {messages.map(msg => (
        <div key={msg.id} className={cn("flex items-start gap-4 px-5 py-4 hover:bg-neutral-bg-light cursor-pointer transition-colors", msg.unread && "bg-blue-50/30")}>
          <Image src={msg.avatar} alt={msg.from} width={40} height={40} className="rounded-full object-cover flex-shrink-0 border border-neutral-gray-light" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className={cn("text-sm truncate", msg.unread ? "font-bold text-neutral-black" : "font-medium text-neutral-gray-dark")}>{msg.from}</p>
              <span className="text-xs text-neutral-gray-medium flex-shrink-0 ml-2">{msg.time}</span>
            </div>
            <p className={cn("text-sm truncate", msg.unread ? "font-medium text-neutral-black" : "text-neutral-gray-medium")}>{msg.subject}</p>
            <p className="text-xs text-neutral-gray-medium truncate mt-0.5">{msg.preview}</p>
          </div>
          {msg.unread && <div className="h-2.5 w-2.5 rounded-full bg-brand-red-600 flex-shrink-0 mt-2" />}
        </div>
      ))}
    </div>
  );
}
