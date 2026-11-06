'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Loader2, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import {
  fetchConversations,
  fetchMessages,
  LISTING_TYPES,
  markConversationRead,
  sendMessage,
  type ChatMessage,
  type Conversation,
} from '@/lib/conversations';
import { cn } from '@/lib/utils';
import ChatPanel from './components/ChatPanel';
import ConversationList from './components/ConversationList';
import MessagesEmptyState from './components/MessagesEmptyState';
import { DEMO_CONVERSATION, DEMO_MESSAGES } from './demoConversation';

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [listingFilter, setListingFilter] = useState('all');
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [markingId, setMarkingId] = useState<string | null>(null);
  const messagesRequestRef = useRef(0);
  const activeIdRef = useRef<string | null>(null);

  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  const loadConversations = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const rows = await fetchConversations();
      setConversations(rows);
    } catch (error: any) {
      setConversations([]);
      setLoadError(error?.message || 'Failed to load conversations.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadConversations();
  }, [loadConversations]);

  const allConversations = useMemo(() => {
    if (conversations.length > 0) return conversations;
    return [DEMO_CONVERSATION];
  }, [conversations]);

  const filteredConversations = useMemo(() => {
    if (listingFilter === 'all') return allConversations;
    return allConversations.filter((conversation) => conversation.listingType === listingFilter);
  }, [allConversations, listingFilter]);

  const activeConversation = useMemo(
    () => allConversations.find((conversation) => conversation.id === activeId) ?? null,
    [allConversations, activeId],
  );

  const activeMessages = activeConversation?.isDemo ? DEMO_MESSAGES : messages;

  const markRead = useCallback(async (conversation: Conversation, notify = true, messageId?: string) => {
    if (conversation.isDemo || conversation.unreadCount === 0) return;
    setMarkingId(conversation.id);
    try {
      await markConversationRead(conversation.id, messageId);
      setConversations((previous) => previous.map((item) => (
        item.id === conversation.id ? { ...item, unreadCount: 0 } : item
      )));
      if (activeIdRef.current === conversation.id) {
        setMessages((previous) => previous.map((item) => (
          item.isMine ? item : { ...item, read: true }
        )));
      }
      if (notify) toast.success('Conversation marked as read');
    } catch (error: any) {
      if (notify) toast.error(error?.message || 'Failed to mark conversation as read');
    } finally {
      setMarkingId(null);
    }
  }, []);

  const loadMessages = useCallback(async (conversation: Conversation) => {
    if (conversation.isDemo) return;
    const requestId = ++messagesRequestRef.current;
    setMessagesLoading(true);
    setMessages([]);
    try {
      const rows = await fetchMessages(conversation.id, conversation.participantId);
      if (requestId !== messagesRequestRef.current) return;
      setMessages(rows);
      if (conversation.unreadCount > 0) {
        void markRead(conversation, false, rows[rows.length - 1]?.id);
      }
    } catch (error: any) {
      if (requestId !== messagesRequestRef.current) return;
      toast.error(error?.message || 'Failed to load messages');
    } finally {
      if (requestId === messagesRequestRef.current) setMessagesLoading(false);
    }
  }, [markRead]);

  const handleSelect = (conversation: Conversation) => {
    setActiveId(conversation.id);
    if (conversation.isDemo) {
      messagesRequestRef.current += 1;
      setMessages([]);
      setMessagesLoading(false);
      return;
    }
    void loadMessages(conversation);
  };

  const handleFilterChange = (value: string) => {
    messagesRequestRef.current += 1;
    setListingFilter(value);
    setActiveId(null);
    setMessages([]);
    setMessagesLoading(false);
  };

  const handleSend = async (text: string) => {
    if (!activeConversation || activeConversation.isDemo) return;
    setSending(true);
    try {
      const sent = await sendMessage(activeConversation.id, text, activeConversation.participantId);
      setMessages((previous) => [...previous, sent]);
      setConversations((previous) => previous.map((conversation) => (
        conversation.id === activeConversation.id
          ? {
            ...conversation,
            lastMessage: text,
            lastMessageAt: sent.createdAt,
            lastMessageSenderId: sent.senderId,
          }
          : conversation
      )));
    } catch (error: any) {
      toast.error(error?.message || 'Failed to send message');
      throw error;
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-neutral-black">Messages</h2>
        <p className="mt-0.5 text-sm text-neutral-gray-medium">View and continue your conversations</p>
      </div>

      {loadError && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-brand-red-200 bg-brand-red-50 px-4 py-3 text-sm text-brand-red-800">
          <span>{loadError} Showing the conversation preview below.</span>
          <button
            type="button"
            onClick={() => void loadConversations()}
            className="rounded-md border border-brand-red-300 bg-white px-3 py-1.5 text-xs font-semibold text-brand-red-700 hover:bg-brand-red-100"
          >
            Try again
          </button>
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-neutral-gray-light bg-white shadow-sm">
        <div className={cn(
          'flex flex-col gap-2 border-b border-neutral-gray-light bg-gradient-to-r from-brand-red-50/80 to-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between',
          activeId && 'hidden lg:flex',
        )}>
          <div className="flex flex-wrap items-center gap-2">
            <span className="whitespace-nowrap rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-brand-red-700 ring-1 ring-brand-red-100">
              {filteredConversations.length} chat{filteredConversations.length === 1 ? '' : 's'}
            </span>
            <select
              id="listing-filter"
              aria-label="Filter by listing type"
              value={listingFilter}
              onChange={(event) => handleFilterChange(event.target.value)}
              className="w-full min-w-[190px] rounded-lg border border-brand-navy-900 bg-white px-3 py-2 text-sm font-medium text-neutral-black outline-none transition focus:border-brand-navy-900 focus:ring-2 focus:ring-brand-navy-900/20 sm:w-auto"
            >
              <option value="all">All Listings</option>
              {LISTING_TYPES.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={() => void loadConversations()}
            disabled={loading}
            className="inline-flex items-center gap-2 self-start rounded-lg border border-brand-red-200 bg-white px-3 py-2 text-xs font-semibold text-brand-red-700 transition hover:bg-brand-red-50 disabled:opacity-50 sm:self-auto"
          >
            <RefreshCw className={cn('h-3.5 w-3.5', loading && 'animate-spin')} />
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="flex min-h-[420px] items-center justify-center text-sm text-neutral-gray-medium">
            <Loader2 className="mr-2 h-4 w-4 animate-spin text-brand-red-600" />
            Loading conversations...
          </div>
        ) : allConversations.length === 0 ? (
          <MessagesEmptyState />
        ) : (
          <div className="lg:grid lg:grid-cols-[340px_minmax(0,1fr)] xl:grid-cols-[370px_minmax(0,1fr)]">
            <aside className={cn(
              'min-h-0 border-neutral-gray-light lg:border-r',
              activeId && 'hidden lg:block',
            )}>
              <div className="h-[calc(100dvh-19rem)] min-h-[440px] overflow-y-auto lg:h-[calc(100dvh-17rem)]">
                <ConversationList
                  conversations={filteredConversations}
                  activeId={activeId}
                  loading={false}
                  markingId={markingId}
                  onSelect={handleSelect}
                  onMarkRead={(conversation) => void markRead(conversation)}
                />
              </div>
            </aside>

            <section className={cn('min-h-0', !activeId && 'hidden lg:block')}>
              <div className="h-[calc(100dvh-19rem)] min-h-[440px] lg:h-[calc(100dvh-17rem)]">
                <ChatPanel
                  conversation={activeConversation}
                  messages={activeMessages}
                  loading={messagesLoading}
                  sending={sending}
                  markingRead={markingId === activeConversation?.id}
                  onBack={() => setActiveId(null)}
                  onSend={handleSend}
                  onMarkRead={() => {
                    if (activeConversation) {
                      void markRead(activeConversation, true, messages[messages.length - 1]?.id);
                    }
                  }}
                />
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
