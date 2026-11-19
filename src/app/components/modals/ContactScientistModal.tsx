'use client';

import { useCallback, useEffect, useState } from 'react';
import { Loader2, X } from 'lucide-react';
import { toast } from 'sonner';
import { Avatar } from '../Avatar';
import {
  fetchScientistMessages,
  findScientistConversation,
  markScientistConversationRead,
  sendScientistMessage,
  startScientistConversation,
} from '@/lib/scientistConversations';
import type { ChatMessage, Conversation } from '@/lib/conversations';
import ContactInnovatorChat from './contact-innovator/ContactInnovatorChat';

interface ContactScientistModalProps {
  isOpen: boolean;
  onClose: () => void;
  scientistId: string;
  scientistName: string;
  scientistImage?: string;
}

/**
 * User-facing conversation modal for a Scientist / Technologist listing.
 *
 * It deliberately opens straight into a chat interface: existing history is
 * loaded when available, otherwise the composer starts the conversation on the
 * first send. This mirrors the Afro-Innovation "Message Innovator" chat rather
 * than a one-off message form.
 */
export function ContactScientistModal({
  isOpen,
  onClose,
  scientistId,
  scientistName,
  scientistImage,
}: ContactScientistModalProps) {
  const [checking, setChecking] = useState(false);
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [sending, setSending] = useState(false);
  const [justStarted, setJustStarted] = useState(false);

  const loadMessages = useCallback(async (target: Conversation) => {
    setLoadingMessages(true);
    try {
      const rows = await fetchScientistMessages(target.id, target.participantId);
      setMessages(rows);
      if (target.unreadCount > 0) {
        void markScientistConversationRead(target.id, rows[rows.length - 1]?.id)
          .then(() => setMessages((prev) => prev.map((item) => (
            item.isMine ? item : { ...item, read: true }
          ))))
          .catch(() => undefined);
      }
      return rows;
    } catch (error: any) {
      toast.error(error?.message || 'Failed to load this conversation');
      return [] as ChatMessage[];
    } finally {
      setLoadingMessages(false);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;

    setChecking(true);
    setConversation(null);
    setMessages([]);
    setJustStarted(false);
    setSending(false);

    findScientistConversation(scientistId, scientistName)
      .then(async (existing) => {
        if (cancelled || !existing) return;
        setConversation(existing);
        await loadMessages(existing);
      })
      .catch((error: any) => {
        if (!cancelled) toast.error(error?.message || 'Could not check for an existing conversation');
      })
      .finally(() => {
        if (!cancelled) setChecking(false);
      });

    return () => { cancelled = true; };
  }, [isOpen, scientistId, loadMessages]);

  /** Sends through the existing thread, starting it first when needed. */
  const handleSend = async (text: string) => {
    if (sending) return;
    setSending(true);
    try {
      let target = conversation;
      if (!target) {
        target = await startScientistConversation(scientistId);
        if (!target) target = await findScientistConversation(scientistId, scientistName);
        if (!target) throw new Error('Conversation started but could not be loaded.');
        setConversation(target);
      }

      if (target.canSend === false) {
        toast.error(target.sendBlockedReason || 'Messaging is currently unavailable for this conversation.');
        throw new Error(target.sendBlockedReason || 'Messaging is unavailable');
      }

      const isFirstMessage = messages.length === 0;
      const sent = await sendScientistMessage(target.id, text, target.participantId);
      setMessages((previous) => [...previous, sent]);
      if (isFirstMessage) setJustStarted(true);
    } catch (error: any) {
      toast.error(error?.message || 'Failed to send message');
      throw error;
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    if (!justStarted) return;
    const timer = window.setTimeout(() => setJustStarted(false), 5000);
    return () => window.clearTimeout(timer);
  }, [justStarted]);

  const handleRefresh = async () => {
    if (!conversation || refreshing) return;
    setRefreshing(true);
    try {
      const rows = await fetchScientistMessages(conversation.id, conversation.participantId);
      setMessages(rows);
      if (rows.some((item) => !item.isMine && !item.read)) {
        await markScientistConversationRead(conversation.id, rows[rows.length - 1]?.id).catch(() => undefined);
        setMessages(rows.map((item) => (item.isMine ? item : { ...item, read: true })));
      }
    } catch (error: any) {
      toast.error(error?.message || 'Failed to refresh the conversation');
    } finally {
      setRefreshing(false);
    }
  };

  if (!isOpen) return null;

  // Keep the conversation open for replies regardless of who spoke last;
  // canSend reflects API-level blocks only.
  const canReply = conversation?.canSend !== false;
  const headerImage = scientistImage || conversation?.listingImage;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex flex-shrink-0 items-center gap-3 bg-gradient-to-r from-brand-navy-900 to-brand-navy-800 px-5 py-4">
          <Avatar src={headerImage} name={scientistName} size="md" />
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-bold text-white">Message Scientist</h2>
            <p className="truncate text-sm text-white/70">{scientistName}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-white" />
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
          {checking ? (
            <div className="flex min-h-[320px] flex-1 items-center justify-center text-sm text-neutral-gray-medium">
              <Loader2 className="mr-2 h-4 w-4 animate-spin text-brand-red-600" />
              Loading conversation...
            </div>
          ) : (
            <ContactInnovatorChat
              innovatorName={scientistName}
              messages={messages}
              loading={loadingMessages}
              sending={sending}
              canReply={canReply}
              sendBlockedReason={conversation?.sendBlockedReason}
              justStarted={justStarted}
              refreshing={refreshing}
              onSend={handleSend}
              onRefresh={() => void handleRefresh()}
              roleLabel="scientist"
            />
          )}
        </div>
      </div>
    </div>
  );
}
