'use client';

import Link from 'next/link';
import { ArrowLeft, Loader2, MessageSquare, RefreshCw, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import AdminConversationList from '../../afro-innovations/messages/components/AdminConversationList';
import AdminChatPanel from '../../afro-innovations/messages/components/AdminChatPanel';
import { BlockConversationModal } from '../../afro-innovations/messages/components/ModerationModals';
import { useScientistMessages } from './useScientistMessages';

/** Admin moderation inbox for conversations on scientist/technologist listings. */
export default function ScientistMessagesView() {
  const m = useScientistMessages();

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="mb-3 flex items-center gap-1.5 text-[11px] text-neutral-gray-medium">
            <Link href="/admin/dashboard" className="hover:underline">Dashboard</Link>
            <span>&rsaquo;</span>
            <Link href="/admin/categories/scientists-technologies" className="hover:underline">Scientists &amp; Technologists</Link>
            <span>&rsaquo;</span>
            <Link href="/admin/categories/scientists-technologies/all" className="hover:underline">All Scientists</Link>
            <span>&rsaquo;</span>
            <span className="font-medium text-neutral-black">Messages</span>
          </div>
          <h1 className="flex items-center gap-2 text-xl font-bold text-neutral-black">
            <MessageSquare className="h-5 w-5 text-[#453DD8]" />
            Scientist Conversations
          </h1>
          <p className="mt-0.5 text-xs text-neutral-gray-medium">
            Review and moderate conversations between users and scientists or technologists.
          </p>
        </div>
        <Link
          href="/admin/categories/scientists-technologies/all"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-neutral-gray-light bg-white px-3.5 py-2 text-xs font-semibold hover:bg-neutral-bg-light"
        >
          <ArrowLeft className="h-4 w-4" /> Back to All Scientists
        </Link>
      </div>

      {m.scientistIdParam && (
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#453DD8]/20 bg-[#453DD8]/5 px-4 py-2.5 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#453DD8]">Filtered by Listing:</span>
            <span className="font-medium text-neutral-black">{m.scientistNameParam || m.scientistIdParam}</span>
          </div>
          <button
            type="button"
            onClick={m.clearScientistFilter}
            className="inline-flex items-center gap-1 rounded-md border border-neutral-gray-light bg-white px-2.5 py-1 text-[11px] font-semibold text-neutral-gray-dark hover:bg-neutral-bg-light cursor-pointer"
          >
            <X className="h-3 w-3" /> Show all conversations
          </button>
        </div>
      )}

      {m.loadError && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-800">
          <span>{m.loadError}</span>
          <button
            type="button"
            onClick={() => void m.loadConversations()}
            className="rounded-md border border-red-300 bg-white px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100 cursor-pointer"
          >
            Try again
          </button>
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-neutral-gray-light bg-white shadow-sm">
        <div className={cn(
          'flex flex-col gap-2 border-b border-neutral-gray-light bg-gradient-to-r from-[#453DD8]/5 to-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between',
          m.activeId && 'hidden lg:flex',
        )}>
          <div className="flex flex-1 flex-wrap items-center gap-2">
            <span className="whitespace-nowrap rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-[#453DD8] ring-1 ring-[#453DD8]/20">
              {m.filteredConversations.length} conversation{m.filteredConversations.length === 1 ? '' : 's'}
            </span>
            <div className="relative min-w-[200px] flex-1 sm:max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-gray-medium" />
              <input
                type="text"
                value={m.search}
                onChange={(e) => m.setSearch(e.target.value)}
                placeholder="Search sender, scientist, or listing..."
                className="w-full rounded-lg border border-neutral-gray-light bg-white py-1.5 pl-8 pr-3 text-xs text-neutral-black outline-none focus:border-[#453DD8] focus:ring-1 focus:ring-[#453DD8]/30"
              />
            </div>
            <select
              aria-label="Filter by moderation status"
              value={m.statusFilter}
              onChange={(e) => m.setStatusFilter(e.target.value as typeof m.statusFilter)}
              className="rounded-lg border border-neutral-gray-light bg-white px-3 py-1.5 text-xs font-medium text-neutral-black outline-none focus:border-[#453DD8] cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>
          <button
            type="button"
            onClick={() => void m.loadConversations()}
            disabled={m.loading}
            className="inline-flex items-center gap-1.5 self-start rounded-lg border border-neutral-gray-light bg-white px-3 py-1.5 text-xs font-semibold text-neutral-gray-dark transition hover:bg-neutral-bg-light disabled:opacity-50 sm:self-auto cursor-pointer"
          >
            <RefreshCw className={cn('h-3.5 w-3.5', m.loading && 'animate-spin')} />
            Refresh
          </button>
        </div>

        {m.loading ? (
          <div className="flex min-h-[440px] items-center justify-center text-sm text-neutral-gray-medium">
            <Loader2 className="mr-2 h-4 w-4 animate-spin text-[#453DD8]" /> Loading conversations...
          </div>
        ) : m.conversations.length === 0 ? (
          <div className="flex min-h-[420px] flex-col items-center justify-center gap-3 p-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#453DD8]/10">
              <MessageSquare className="h-7 w-7 text-[#453DD8]" />
            </div>
            <div>
              <p className="text-base font-semibold text-neutral-black">No messages yet</p>
              <p className="mt-1 max-w-sm text-xs text-neutral-gray-medium">
                {m.scientistIdParam
                  ? 'No conversations have been started for this listing yet.'
                  : 'Conversations between users and scientists will appear here once started.'}
              </p>
            </div>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-[350px_minmax(0,1fr)] xl:grid-cols-[380px_minmax(0,1fr)]">
            <aside className={cn('min-h-0 border-neutral-gray-light lg:border-r', m.activeId && 'hidden lg:block')}>
              <div className="h-[calc(100dvh-18rem)] min-h-[440px] overflow-y-auto lg:h-[calc(100dvh-16rem)]">
                <AdminConversationList
                  conversations={m.filteredConversations}
                  activeId={m.activeId}
                  loading={false}
                  actionId={m.actionId}
                  onSelect={m.handleSelect}
                  onBlockToggle={(c) => void m.handleBlockToggle(c)}
                />
              </div>
            </aside>
            <section className={cn('min-h-0', !m.activeId && 'hidden lg:block')}>
              <div className="h-[calc(100dvh-18rem)] min-h-[440px] lg:h-[calc(100dvh-16rem)]">
                <AdminChatPanel
                  conversation={m.activeConversation}
                  messages={m.messages}
                  loading={m.messagesLoading}
                  actionBusy={m.actionId === m.activeConversation?.id}
                  onBack={() => m.setActiveId(null)}
                  onBlockToggle={(c) => void m.handleBlockToggle(c)}
                />
              </div>
            </section>
          </div>
        )}
      </div>

      <BlockConversationModal
        conversation={m.blockTarget}
        busy={!!m.blockTarget && m.actionId === m.blockTarget.id}
        onClose={() => m.setBlockTarget(null)}
        onConfirm={(payload) => void m.handleConfirmBlock(payload)}
      />
    </div>
  );
}
