'use client';

import { MoreVertical, CheckCheck, Loader2 } from 'lucide-react';
import { Avatar } from '@/app/components/Avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import type { Conversation } from '@/lib/conversations';
import { cn } from '@/lib/utils';
import { formatConversationTime } from '@/app/components/messaging/chatTime';

interface ConversationListProps {
  conversations: Conversation[];
  activeId: string | null;
  loading?: boolean;
  markingId?: string | null;
  onSelect: (conversation: Conversation) => void;
  onMarkRead: (conversation: Conversation) => void;
}

export default function ConversationList({
  conversations,
  activeId,
  loading = false,
  markingId,
  onSelect,
  onMarkRead,
}: ConversationListProps) {
  if (loading) {
    return (
      <div className="flex h-full items-center justify-center p-8 text-sm text-neutral-gray-medium">
        <Loader2 className="mr-2 h-4 w-4 animate-spin text-brand-red-600" />
        Loading conversations...
      </div>
    );
  }

  if (!conversations.length) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 p-8 text-center">
        <p className="text-sm font-semibold text-neutral-black">No conversations here</p>
        <p className="text-xs text-neutral-gray-medium">Try another listing filter.</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-neutral-gray-light">
      {conversations.map((conversation) => {
        const active = conversation.id === activeId;
        return (
          <div
            key={conversation.id}
            role="button"
            tabIndex={0}
            onClick={() => onSelect(conversation)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onSelect(conversation);
              }
            }}
            className={cn(
              'group flex cursor-pointer items-start gap-3 px-4 py-3.5 transition-colors',
              active ? 'bg-brand-red-50/70' : 'bg-white hover:bg-neutral-bg-light',
            )}
          >
            <Avatar
              src={conversation.participantAvatar}
              name={conversation.participantName}
              size="lg"
              className={cn('mt-0.5', conversation.unreadCount > 0 && 'ring-brand-red-200')}
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-1.5">
                  <p className={cn(
                    'truncate text-sm',
                    conversation.unreadCount > 0 ? 'font-bold text-neutral-black' : 'font-semibold text-neutral-gray-dark',
                  )}>
                    {conversation.participantName}
                  </p>
                  {conversation.isDemo && (
                    <span className="shrink-0 rounded-full bg-amber-100 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-amber-700">
                      Demo
                    </span>
                  )}
                </div>
                <span className="shrink-0 text-[11px] text-neutral-gray-medium">
                  {formatConversationTime(conversation.lastMessageAt)}
                </span>
              </div>
              <p className="mt-0.5 truncate text-[11px] font-medium text-brand-red-600">
                {conversation.listingTypeLabel}
              </p>
        <div className="mt-1 flex items-center justify-between gap-2">
          <p className={cn(
            'truncate text-xs',
            conversation.unreadCount > 0 ? 'font-medium text-neutral-black' : 'text-neutral-gray-medium',
          )}>
            {conversation.lastMessage || 'No messages yet'}
          </p>
          <div
            className="flex shrink-0 items-center gap-1"
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(event) => event.stopPropagation()}
          >
            {conversation.unreadCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-red-600 px-1.5 text-[10px] font-bold text-white">
                {conversation.unreadCount > 99 ? '99+' : conversation.unreadCount}
              </span>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  onClick={(event) => event.stopPropagation()}
                  className="rounded-md p-1 text-neutral-gray-medium opacity-100 transition hover:bg-neutral-gray-light hover:text-neutral-black focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red-200 sm:opacity-0 sm:group-hover:opacity-100"
                  aria-label="Conversation actions"
                >
                  {markingId === conversation.id
                    ? <Loader2 className="h-4 w-4 animate-spin" />
                    : <MoreVertical className="h-4 w-4" />}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-44"
                onClick={(event) => event.stopPropagation()}
              >
                <DropdownMenuItem
                  disabled={conversation.unreadCount === 0 || conversation.isDemo}
                  onClick={(event) => event.stopPropagation()}
                  onSelect={() => {
                    onMarkRead(conversation);
                  }}
                >
                  <CheckCheck className="h-4 w-4 text-brand-red-600" />
                  Mark as read
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
