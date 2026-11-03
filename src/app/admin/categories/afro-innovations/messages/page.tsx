'use client';

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  ArrowLeft, Loader2, MessageSquare, RefreshCw, Search, X,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  blockAdminConversation,
  fetchAdminConversation,
  fetchAdminConversations,
  fetchAdminMessages,
  liftClientMessagingSuspension,
  suspendClientMessaging,
  unblockAdminConversation,
  type AdminChatMessage,
  type AdminConversation,
  type BlockScope,
} from '@/lib/adminConversations';
import { cn } from '@/lib/utils';
import AdminConversationList from './components/AdminConversationList';
import AdminChatPanel from './components/AdminChatPanel';
import { BlockConversationModal, SuspendMessagingModal } from './components/ModerationModals';

function AdminMessagesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const innovationIdParam = searchParams.get('innovationId') || '';
  const innovationNameParam = searchParams.get('innovationName') || '';
  const conversationIdParam = searchParams.get('conversationId') || '';

  const [conversations, setConversations] = useState<AdminConversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'blocked' | 'suspended'>('all');
  const [activeId, setActiveId] = useState<string | null>(conversationIdParam || null);
  const [messages, setMessages] = useState<AdminChatMessage[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [actionId, setActionId] = useState<string | null>(null);
  const [blockTarget, setBlockTarget] = useState<AdminConversation | null>(null);
  const [suspendTarget, setSuspendTarget] = useState<AdminConversation | null>(null);

  const messagesRequestRef = useRef(0);

  const loadConversations = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const rows = await fetchAdminConversations({
        innovationId: innovationIdParam || undefined,
      });
      setConversations(rows);
    } catch (error: any) {
      setConversations([]);
      setLoadError(error?.message || 'Failed to load conversations.');
    } finally {
      setLoading(false);
    }
  }, [innovationIdParam]);

  useEffect(() => {
    void loadConversations();
  }, [loadConversations]);

  const filteredConversations = useMemo(() => {
    return conversations.filter((item) => {
      if (innovationIdParam && item.listingId && item.listingId !== innovationIdParam) {
        return false;
      }
      if (statusFilter === 'blocked' && !item.blocked) return false;
      if (statusFilter === 'suspended' && !item.messagingSuspended) return false;
      if (statusFilter === 'active' && (item.blocked || item.messagingSuspended)) return false;
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        const hay = `${item.clientName} ${item.innovatorName} ${item.listingName} ${item.lastMessage} ${item.purpose || ''} ${item.organization || ''}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [conversations, innovationIdParam, statusFilter, search]);

  const activeConversation = useMemo(
    () => conversations.find((item) => item.id === activeId) ?? null,
    [conversations, activeId],
  );

  const loadConversationDetailAndMessages = useCallback(async (target: AdminConversation) => {
    const requestId = ++messagesRequestRef.current;
    setMessagesLoading(true);
    setMessages([]);
    try {
      const [detailResult, messagesResult] = await Promise.allSettled([
        fetchAdminConversation(target.id),
        fetchAdminMessages(target.id, target.clientId, target.innovatorId),
      ]);

      if (requestId !== messagesRequestRef.current) return;

      if (detailResult.status === 'fulfilled' && detailResult.value) {
        const detail = detailResult.value;
        setConversations((prev) => prev.map((item) => (
          item.id === detail.id ? { ...item, ...detail } : item
        )));
      }

      if (messagesResult.status === 'fulfilled') {
        setMessages(messagesResult.value);
      } else {
        toast.error(messagesResult.reason?.message || 'Failed to load messages');
      }
    } finally {
      if (requestId === messagesRequestRef.current) {
        setMessagesLoading(false);
      }
    }
  }, []);

  const handleSelect = (conversation: AdminConversation) => {
    setActiveId(conversation.id);
    void loadConversationDetailAndMessages(conversation);
  };

  useEffect(() => {
    if (!conversationIdParam || conversations.length === 0) return;
    const match = conversations.find((c) => c.id === conversationIdParam);
    if (match) {
      setActiveId(match.id);
      void loadConversationDetailAndMessages(match);
    }
  }, [conversationIdParam, conversations, loadConversationDetailAndMessages]);

  const handleBlockToggle = async (conversation: AdminConversation) => {
    if (!conversation.blocked) {
      setBlockTarget(conversation);
      return;
    }
    setActionId(conversation.id);
    try {
      const updated = await unblockAdminConversation(conversation.id);
      setConversations((prev) => prev.map((item) => (
        item.id === conversation.id
          ? {
            ...item,
            ...(updated ?? {}),
            blocked: false,
            blockReason: undefined,
            blockScope: undefined,
            status: 'ACTIVE',
          }
          : item
      )));
      toast.success('Conversation unblocked');
    } catch (error: any) {
      toast.error(error?.message || 'Failed to unblock conversation');
    } finally {
      setActionId(null);
    }
  };

  const handleConfirmBlock = async (payload: { scope: BlockScope; reason: string }) => {
    if (!blockTarget) return;
    const target = blockTarget;
    setActionId(target.id);
    try {
      const updated = await blockAdminConversation(target.id, payload);
      setConversations((prev) => prev.map((item) => (
        item.id === target.id
          ? {
            ...item,
            ...(updated ?? {}),
            blocked: true,
            blockScope: payload.scope,
            blockReason: payload.reason,
            status: 'BLOCKED',
          }
          : item
      )));
      setBlockTarget(null);
      toast.success('Conversation blocked');
    } catch (error: any) {
      toast.error(error?.message || 'Failed to block conversation');
    } finally {
      setActionId(null);
    }
  };

  const handleSuspendToggle = async (conversation: AdminConversation) => {
    if (!conversation.clientId) {
      toast.error('Client user ID is missing on this conversation.');
      return;
    }
    if (!conversation.messagingSuspended) {
      setSuspendTarget(conversation);
      return;
    }
    setActionId(conversation.id);
    try {
      await liftClientMessagingSuspension(conversation.clientId);
      setConversations((prev) => prev.map((item) => (
        item.clientId === conversation.clientId || item.id === conversation.id
          ? {
            ...item,
            messagingSuspended: false,
            suspensionReason: undefined,
            suspendedUntil: undefined,
          }
          : item
      )));
      toast.success('Conversation messaging suspension lifted');
    } catch (error: any) {
      toast.error(error?.message || 'Failed to lift messaging suspension');
    } finally {
      setActionId(null);
    }
  };

  const handleConfirmSuspend = async (payload: { reason: string; durationHours: number }) => {
    if (!suspendTarget || !suspendTarget.clientId) return;
    const target = suspendTarget;
    setActionId(target.id);
    try {
      await suspendClientMessaging(target.clientId, payload);
      const untilIso = new Date(Date.now() + payload.durationHours * 3600_000).toISOString();
      setConversations((prev) => prev.map((item) => (
        item.clientId === target.clientId || item.id === target.id
          ? {
            ...item,
            messagingSuspended: true,
            suspensionReason: payload.reason,
            suspendedUntil: untilIso,
          }
          : item
      )));
      setSuspendTarget(null);
      toast.success('Messaging suspended');
    } catch (error: any) {
      toast.error(error?.message || 'Failed to suspend messaging');
    } finally {
      setActionId(null);
    }
  };

  const clearInnovationFilter = () => {
    setActiveId(null);
    router.push('/admin/categories/afro-innovations/messages');
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="mb-3 flex items-center gap-1.5 text-[11px] text-neutral-gray-medium">
            <Link href="/admin/dashboard" className="hover:underline">Dashboard</Link>
            <span>&rsaquo;</span>
            <Link href="/admin/categories/afro-innovations" className="hover:underline">Afro-Innovations</Link>
            <span>&rsaquo;</span>
            <Link href="/admin/categories/afro-innovations/all" className="hover:underline">All Innovations</Link>
            <span>&rsaquo;</span>
            <span className="font-medium text-neutral-black">Messages</span>
          </div>
          <h1 className="flex items-center gap-2 text-xl font-bold text-neutral-black">
            <MessageSquare className="h-5 w-5 text-[#453DD8]" />
            Innovation Conversations
          </h1>
          <p className="mt-0.5 text-xs text-neutral-gray-medium">
            Review and moderate conversations between users and innovators.
          </p>
        </div>

        <Link
          href="/admin/categories/afro-innovations/all"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-neutral-gray-light bg-white px-3.5 py-2 text-xs font-semibold hover:bg-neutral-bg-light"
        >
          <ArrowLeft className="h-4 w-4" /> Back to All Innovations
        </Link>
      </div>

      {innovationIdParam && (
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#453DD8]/20 bg-[#453DD8]/5 px-4 py-2.5 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#453DD8]">Filtered by Innovation:</span>
            <span className="font-medium text-neutral-black">
              {innovationNameParam || innovationIdParam}
            </span>
          </div>
          <button
            type="button"
            onClick={clearInnovationFilter}
            className="inline-flex items-center gap-1 rounded-md border border-neutral-gray-light bg-white px-2.5 py-1 text-[11px] font-semibold text-neutral-gray-dark hover:bg-neutral-bg-light cursor-pointer"
          >
            <X className="h-3 w-3" /> Show all conversations
          </button>
        </div>
      )}

      {loadError && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-800">
          <span>{loadError}</span>
          <button
            type="button"
            onClick={() => void loadConversations()}
            className="rounded-md border border-red-300 bg-white px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100 cursor-pointer"
          >
            Try again
          </button>
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-neutral-gray-light bg-white shadow-sm">
        <div
          className={cn(
            'flex flex-col gap-2 border-b border-neutral-gray-light bg-gradient-to-r from-[#453DD8]/5 to-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between',
            activeId && 'hidden lg:flex',
          )}
        >
          <div className="flex flex-1 flex-wrap items-center gap-2">
            <span className="whitespace-nowrap rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-[#453DD8] ring-1 ring-[#453DD8]/20">
              {filteredConversations.length} conversation{filteredConversations.length === 1 ? '' : 's'}
            </span>
            <div className="relative min-w-[200px] flex-1 sm:max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-gray-medium" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search sender, innovator, or listing..."
                className="w-full rounded-lg border border-neutral-gray-light bg-white py-1.5 pl-8 pr-3 text-xs text-neutral-black outline-none focus:border-[#453DD8] focus:ring-1 focus:ring-[#453DD8]/30"
              />
            </div>
            <select
              aria-label="Filter by moderation status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
              className="rounded-lg border border-neutral-gray-light bg-white px-3 py-1.5 text-xs font-medium text-neutral-black outline-none focus:border-[#453DD8] cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="blocked">Blocked</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>

          <button
            type="button"
            onClick={() => void loadConversations()}
            disabled={loading}
            className="inline-flex items-center gap-1.5 self-start rounded-lg border border-neutral-gray-light bg-white px-3 py-1.5 text-xs font-semibold text-neutral-gray-dark transition hover:bg-neutral-bg-light disabled:opacity-50 sm:self-auto cursor-pointer"
          >
            <RefreshCw className={cn('h-3.5 w-3.5', loading && 'animate-spin')} />
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="flex min-h-[440px] items-center justify-center text-sm text-neutral-gray-medium">
            <Loader2 className="mr-2 h-4 w-4 animate-spin text-[#453DD8]" />
            Loading conversations...
          </div>
        ) : conversations.length === 0 ? (
          <div className="flex min-h-[420px] flex-col items-center justify-center gap-3 p-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#453DD8]/10">
              <MessageSquare className="h-7 w-7 text-[#453DD8]" />
            </div>
            <div>
              <p className="text-base font-semibold text-neutral-black">No messages yet</p>
              <p className="mt-1 max-w-sm text-xs text-neutral-gray-medium">
                {innovationIdParam
                  ? 'No conversations have been started for this innovation yet.'
                  : 'Conversations between users and innovators will appear here once started.'}
              </p>
            </div>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-[350px_minmax(0,1fr)] xl:grid-cols-[380px_minmax(0,1fr)]">
            <aside
              className={cn(
                'min-h-0 border-neutral-gray-light lg:border-r',
                activeId && 'hidden lg:block',
              )}
            >
              <div className="h-[calc(100dvh-18rem)] min-h-[440px] overflow-y-auto lg:h-[calc(100dvh-16rem)]">
                <AdminConversationList
                  conversations={filteredConversations}
                  activeId={activeId}
                  loading={false}
                  actionId={actionId}
                  onSelect={handleSelect}
                  onBlockToggle={(c) => void handleBlockToggle(c)}
                  onSuspendToggle={(c) => void handleSuspendToggle(c)}
                />
              </div>
            </aside>

            <section className={cn('min-h-0', !activeId && 'hidden lg:block')}>
              <div className="h-[calc(100dvh-18rem)] min-h-[440px] lg:h-[calc(100dvh-16rem)]">
                <AdminChatPanel
                  conversation={activeConversation}
                  messages={messages}
                  loading={messagesLoading}
                  actionBusy={actionId === activeConversation?.id}
                  onBack={() => setActiveId(null)}
                  onBlockToggle={(c) => void handleBlockToggle(c)}
                  onSuspendToggle={(c) => void handleSuspendToggle(c)}
                />
              </div>
            </section>
          </div>
        )}
      </div>

      <BlockConversationModal
        conversation={blockTarget}
        busy={!!blockTarget && actionId === blockTarget.id}
        onClose={() => setBlockTarget(null)}
        onConfirm={(payload) => void handleConfirmBlock(payload)}
      />

      <SuspendMessagingModal
        conversation={suspendTarget}
        busy={!!suspendTarget && actionId === suspendTarget.id}
        onClose={() => setSuspendTarget(null)}
        onConfirm={(payload) => void handleConfirmSuspend(payload)}
      />
    </div>
  );
}

export default function AdminMessagesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[440px] items-center justify-center rounded-xl border border-neutral-gray-light bg-white text-sm text-neutral-gray-medium">
          <Loader2 className="mr-2 h-4 w-4 animate-spin text-[#453DD8]" />
          Loading messages...
        </div>
      }
    >
      <AdminMessagesContent />
    </Suspense>
  );
}
