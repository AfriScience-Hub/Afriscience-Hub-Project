'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import {
  blockAdminScientistConversation,
  fetchAdminScientistConversation,
  fetchAdminScientistConversations,
  fetchAdminScientistMessages,
  unblockAdminScientistConversation,
} from '@/lib/adminScientistConversations';
import type {
  AdminChatMessage,
  AdminConversation,
  BlockScope,
} from '@/lib/adminConversations';

const BASE_PATH = '/admin/categories/scientists-technologies/messages';

/** State and moderation handlers for the scientist conversations page. */
export function useScientistMessages() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const scientistIdParam = searchParams.get('scientistId') || '';
  const scientistNameParam = searchParams.get('scientistName') || '';
  const conversationIdParam = searchParams.get('conversationId') || '';

  const [conversations, setConversations] = useState<AdminConversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'blocked'>('all');
  const [activeId, setActiveId] = useState<string | null>(conversationIdParam || null);
  const [messages, setMessages] = useState<AdminChatMessage[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [actionId, setActionId] = useState<string | null>(null);
  const [blockTarget, setBlockTarget] = useState<AdminConversation | null>(null);
  const messagesRequestRef = useRef(0);

  const loadConversations = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const rows = await fetchAdminScientistConversations({
        scientistId: scientistIdParam || undefined,
      });
      setConversations(rows);
    } catch (error: any) {
      setConversations([]);
      setLoadError(error?.message || 'Failed to load conversations.');
    } finally {
      setLoading(false);
    }
  }, [scientistIdParam]);

  useEffect(() => { void loadConversations(); }, [loadConversations]);

  const filteredConversations = useMemo(() => conversations.filter((item) => {
    if (scientistIdParam && item.listingId && item.listingId !== scientistIdParam) return false;
    if (statusFilter === 'blocked' && !item.blocked) return false;
    if (statusFilter === 'active' && item.blocked) return false;
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      const hay = `${item.clientName} ${item.innovatorName} ${item.listingName} ${item.lastMessage} ${item.purpose || ''} ${item.organization || ''}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  }), [conversations, scientistIdParam, statusFilter, search]);

  const activeConversation = useMemo(
    () => conversations.find((item) => item.id === activeId) ?? null,
    [conversations, activeId],
  );

  const loadDetailAndMessages = useCallback(async (target: AdminConversation) => {
    const requestId = ++messagesRequestRef.current;
    setMessagesLoading(true);
    setMessages([]);
    try {
      const [detailResult, messagesResult] = await Promise.allSettled([
        fetchAdminScientistConversation(target.id),
        fetchAdminScientistMessages(target.id, target.clientId, target.innovatorId),
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
      if (requestId === messagesRequestRef.current) setMessagesLoading(false);
    }
  }, []);

  const handleSelect = (conversation: AdminConversation) => {
    setActiveId(conversation.id);
    void loadDetailAndMessages(conversation);
  };

  useEffect(() => {
    if (!conversationIdParam || conversations.length === 0) return;
    const match = conversations.find((c) => c.id === conversationIdParam);
    if (match) {
      setActiveId(match.id);
      void loadDetailAndMessages(match);
    }
  }, [conversationIdParam, conversations, loadDetailAndMessages]);

  const handleBlockToggle = async (conversation: AdminConversation) => {
    if (!conversation.blocked) {
      setBlockTarget(conversation);
      return;
    }
    setActionId(conversation.id);
    try {
      const updated = await unblockAdminScientistConversation(conversation.id);
      setConversations((prev) => prev.map((item) => (
        item.id === conversation.id
          ? { ...item, ...(updated ?? {}), blocked: false, blockReason: undefined, blockScope: undefined, status: 'ACTIVE' }
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
      const updated = await blockAdminScientistConversation(target.id, payload);
      setConversations((prev) => prev.map((item) => (
        item.id === target.id
          ? { ...item, ...(updated ?? {}), blocked: true, blockScope: payload.scope, blockReason: payload.reason, status: 'BLOCKED' }
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

  const clearScientistFilter = () => {
    setActiveId(null);
    router.push(BASE_PATH);
  };

  return {
    scientistIdParam,
    scientistNameParam,
    basePath: BASE_PATH,
    conversations,
    loading,
    loadError,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    activeId,
    setActiveId,
    messages,
    messagesLoading,
    actionId,
    blockTarget,
    setBlockTarget,
    filteredConversations,
    activeConversation,
    loadConversations,
    handleSelect,
    handleBlockToggle,
    handleConfirmBlock,
    clearScientistFilter,
  };
}
