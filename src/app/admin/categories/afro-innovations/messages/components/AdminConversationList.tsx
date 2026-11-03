'use client';

import { Ban, Loader2, MoreVertical, ShieldAlert, ShieldCheck, Unlock } from 'lucide-react';
import { Avatar } from '@/app/components/Avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import type { AdminConversation } from '@/lib/adminConversations';
import { cn } from '@/lib/utils';
import { formatConversationTime } from '@/app/components/messaging/chatTime';

interface AdminConversationListProps {
  conversations: AdminConversation[];
  activeId: string | null;
  loading?: boolean;
  actionId?: string | null;
  onSelect: (conversation: AdminConversation) => void;
  onBlockToggle: (conversation: AdminConversation) => void;
  onSuspendToggle: (conversation: AdminConversation) => void;
}

export default function AdminConversationList({
  conversations,
  activeId,
  loading = false,
  actionId,
  onSelect,
  onBlockToggle,
  onSuspendToggle,
}: AdminConversationListProps) {
  if (loading) {
    return (
      <div className="flex h-full items-center justify-center p-8 text-sm text-neutral-gray-medium">
        <Loader2 className="mr-2 h-4 w-4 animate-spin text-[#453DD8]" />
        Loading conversations...
      </div>
    );
  }

  if (!conversations.length) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 p-8 text-center">
        <p className="text-sm font-semibold text-neutral-black">No conversations found</p>
        <p className="text-xs text-neutral-gray-medium">Try adjusting your filters or search query.</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-neutral-gray-light">
      {conversations.map((conversation) => {
        const active = conversation.id === activeId;
        const busy = actionId === conversation.id;

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
              active ? 'bg-[#453DD8]/10' : 'bg-white hover:bg-neutral-bg-light',
            )}
          >
            <Avatar
              src={conversation.listingImage || conversation.clientAvatar}
              name={conversation.listingName || conversation.clientName}
              size="lg"
              className="mt-0.5"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-1.5">
                  <p className="truncate text-sm font-bold text-neutral-black">
                    {conversation.clientName}
                  </p>
                  <span className="text-xs text-neutral-gray-medium">&rarr;</span>
                  <p className="truncate text-xs font-medium text-neutral-gray-dark">
                    {conversation.innovatorName}
                  </p>
                </div>
                <span className="shrink-0 text-[11px] text-neutral-gray-medium">
                  {formatConversationTime(conversation.lastMessageAt)}
                </span>
              </div>

              <div className="mt-0.5 flex flex-wrap items-center gap-1.5">
                <p className="truncate text-[11px] font-semibold text-[#453DD8]">
                  {conversation.listingName}
                </p>
                {conversation.blocked && (
                  <span className="rounded-full bg-red-100 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-red-700">
                    Blocked
                  </span>
                )}
                {conversation.messagingSuspended && (
                  <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-amber-800">
                    Suspended
                  </span>
                )}
              </div>

              <div className="mt-1 flex items-center justify-between gap-2">
                <p className="truncate text-xs text-neutral-gray-medium">
                  {conversation.lastMessage || 'No messages yet'}
                </p>

                <div
                  className="flex shrink-0 items-center gap-1"
                  onClick={(event) => event.stopPropagation()}
                  onKeyDown={(event) => event.stopPropagation()}
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        type="button"
                        onClick={(event) => event.stopPropagation()}
                        className="rounded-md p-1 text-neutral-gray-medium opacity-100 transition hover:bg-neutral-gray-light hover:text-neutral-black focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#453DD8]/30 sm:opacity-0 sm:group-hover:opacity-100 cursor-pointer"
                        aria-label="Conversation moderation actions"
                      >
                        {busy ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <MoreVertical className="h-4 w-4" />
                        )}
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-56"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <DropdownMenuItem
                        disabled={busy}
                        onClick={(event) => event.stopPropagation()}
                        onSelect={() => onBlockToggle(conversation)}
                      >
                        {conversation.blocked ? (
                          <>
                            <Unlock className="h-4 w-4 text-emerald-600" />
                            <span>Unblock Conversation</span>
                          </>
                        ) : (
                          <>
                            <Ban className="h-4 w-4 text-red-600" />
                            <span>Block Conversation</span>
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        disabled={busy || !conversation.clientId}
                        onClick={(event) => event.stopPropagation()}
                        onSelect={() => onSuspendToggle(conversation)}
                      >
                        {conversation.messagingSuspended ? (
                          <>
                            <ShieldCheck className="h-4 w-4 text-emerald-600" />
                            <span>Lift Conversation Suspension</span>
                          </>
                        ) : (
                          <>
                            <ShieldAlert className="h-4 w-4 text-amber-600" />
                            <span>Suspend Conversation</span>
                          </>
                        )}
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
