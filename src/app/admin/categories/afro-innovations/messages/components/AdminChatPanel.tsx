'use client';

import { useEffect, useMemo, useRef } from 'react';
import {
  AlertTriangle, ArrowLeft, Ban, Building2, Check, CheckCheck,
  Loader2, MessageSquare, MoreVertical, ShieldAlert, ShieldCheck, Target, Unlock,
} from 'lucide-react';
import { Avatar } from '@/app/components/Avatar';
import { formatMessageDay, formatMessageTime } from '@/app/components/messaging/chatTime';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import type { AdminChatMessage, AdminConversation } from '@/lib/adminConversations';
import { cn } from '@/lib/utils';

interface AdminChatPanelProps {
  conversation: AdminConversation | null;
  messages: AdminChatMessage[];
  loading?: boolean;
  actionBusy?: boolean;
  onBack: () => void;
  onBlockToggle: (conversation: AdminConversation) => void;
  onSuspendToggle: (conversation: AdminConversation) => void;
}

export default function AdminChatPanel({
  conversation,
  messages,
  loading = false,
  actionBusy = false,
  onBack,
  onBlockToggle,
  onSuspendToggle,
}: AdminChatPanelProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' });
  }, [messages.length, conversation?.id]);

  const grouped = useMemo(() => {
    const rows: { day: string; messages: AdminChatMessage[] }[] = [];
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
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#453DD8]/10">
          <MessageSquare className="h-7 w-7 text-[#453DD8]" />
        </div>
        <div>
          <p className="text-base font-semibold text-neutral-black">Select a conversation</p>
          <p className="mt-1 text-sm text-neutral-gray-medium">
            Choose a conversation from the list to inspect messages and manage moderation.
          </p>
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
          className="rounded-full p-1.5 text-neutral-gray-dark hover:bg-neutral-gray-light lg:hidden cursor-pointer"
          aria-label="Back to conversations"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <Avatar
          src={conversation.listingImage || conversation.clientAvatar}
          name={conversation.listingName || conversation.clientName}
          size="md"
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <p className="truncate text-sm font-bold text-neutral-black">
              {conversation.clientName}
            </p>
            <span className="text-xs text-neutral-gray-medium">&harr;</span>
            <p className="truncate text-sm font-semibold text-neutral-gray-dark">
              {conversation.innovatorName}
            </p>
            {conversation.blocked && (
              <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold uppercase text-red-700">
                Blocked{conversation.blockScope ? ` (${conversation.blockScope})` : ''}
              </span>
            )}
            {conversation.messagingSuspended && (
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-800">
                Suspended
              </span>
            )}
          </div>
          <div className="mt-0.5 flex flex-wrap items-center gap-3 text-xs text-neutral-gray-medium">
            <span className="truncate font-semibold text-[#453DD8]">{conversation.listingName}</span>
            {conversation.purpose && (
              <span className="inline-flex items-center gap-1 text-[11px]">
                <Target className="h-3 w-3 text-neutral-gray-medium" />
                {conversation.purpose}
              </span>
            )}
            {conversation.organization && (
              <span className="inline-flex items-center gap-1 text-[11px]">
                <Building2 className="h-3 w-3 text-neutral-gray-medium" />
                {conversation.organization}
              </span>
            )}
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="rounded-full p-2 text-neutral-gray-medium transition hover:bg-neutral-gray-light hover:text-neutral-black cursor-pointer"
              aria-label="Conversation moderation actions"
            >
              {actionBusy ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <MoreVertical className="h-4 w-4" />
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem
              disabled={actionBusy}
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
              disabled={actionBusy || !conversation.clientId}
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
      </header>

      {(conversation.blocked || conversation.messagingSuspended) && (
        <div className="space-y-1.5 border-b border-neutral-gray-light bg-white px-4 py-2.5">
          {conversation.blocked && (
            <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-800">
              <Ban className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-600" />
              <div className="min-w-0 flex-1">
                <span className="font-semibold">Conversation Blocked</span>
                {conversation.blockScope && <span> ({conversation.blockScope})</span>}
                {conversation.blockReason && <span>: {conversation.blockReason}</span>}
              </div>
            </div>
          )}
          {conversation.messagingSuspended && (
            <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-600" />
              <div className="min-w-0 flex-1">
                <span className="font-semibold">Messaging Suspended for {conversation.clientName}</span>
                {conversation.suspensionReason && <span>: {conversation.suspensionReason}</span>}
                {conversation.suspendedUntil && (
                  <span className="block text-[11px] text-amber-700">
                    Until {new Date(conversation.suspendedUntil).toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="min-h-0 flex-1 overflow-y-auto px-3 py-4 sm:px-4">
        {loading ? (
          <div className="flex h-full items-center justify-center text-sm text-neutral-gray-medium">
            <Loader2 className="mr-2 h-4 w-4 animate-spin text-[#453DD8]" />
            Loading messages...
          </div>
        ) : messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <p className="text-sm font-semibold text-neutral-black">No messages in this conversation</p>
            <p className="mt-1 text-xs text-neutral-gray-medium">
              Messages exchanged between the sender and the innovator will appear here.
            </p>
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
                {group.messages.map((msg) => {
                  const senderLabel =
                    msg.senderName
                    || (msg.isClient ? conversation.clientName : conversation.innovatorName);
                  return (
                    <div
                      key={msg.id}
                      className={cn('flex', msg.isClient ? 'justify-start' : 'justify-end')}
                    >
                      <div
                        className={cn(
                          'max-w-[82%] rounded-2xl px-3.5 py-2.5 shadow-sm sm:max-w-[72%]',
                          msg.isClient
                            ? 'rounded-bl-sm border border-brand-navy-900 bg-brand-navy-900 text-white'
                            : 'rounded-br-sm border border-neutral-gray-light bg-white text-neutral-black',
                        )}
                      >
                        <div className="mb-1 flex items-center justify-between gap-2">
                          <span
                            className={cn(
                              'text-[11px] font-bold',
                              msg.isClient ? 'text-white/90' : 'text-[#453DD8]',
                            )}
                          >
                            {senderLabel}
                          </span>
                          <span
                            className={cn(
                              'rounded px-1.5 py-0.5 text-[9px] font-semibold uppercase',
                              msg.isClient
                                ? 'bg-white/15 text-white/80'
                                : 'bg-[#453DD8]/10 text-[#453DD8]',
                            )}
                          >
                            {msg.isClient ? 'Sender' : 'Innovator'}
                          </span>
                        </div>
                        <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">
                          {msg.text}
                        </p>
                        <div className="mt-1 flex items-center justify-end gap-1">
                          <span
                            className={cn(
                              'text-[10px]',
                              msg.isClient ? 'text-white/70' : 'text-neutral-gray-medium',
                            )}
                          >
                            {formatMessageTime(msg.createdAt)}
                          </span>
                          {msg.read ? (
                            <CheckCheck
                              className={cn(
                                'h-3.5 w-3.5',
                                msg.isClient ? 'text-red-400' : 'text-brand-red-600',
                              )}
                              aria-label="Read"
                            />
                          ) : (
                            <Check
                              className={cn(
                                'h-3.5 w-3.5',
                                msg.isClient ? 'text-white/70' : 'text-brand-red-600',
                              )}
                              aria-label="Sent"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      <footer className="border-t border-neutral-gray-light bg-white px-4 py-3 text-center text-xs text-neutral-gray-medium">
        Admin moderation view &mdash; use the menu at the top right to block/unblock or suspend/lift suspension on this conversation.
      </footer>
    </div>
  );
}
