'use client';

import { useCallback, useEffect, useState } from 'react';
import { Loader2, Send, X } from 'lucide-react';
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
 * User-facing message modal for a Scientist / Technologist listing.
 * Starts (or reopens) the thread with POST /scientist-conversations, then
 * sends the first message through the dedicated scientist messaging API.
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
  const [starting, setStarting] = useState(false);
  const [justStarted, setJustStarted] = useState(false);
  const [message, setMessage] = useState('');

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
    setStarting(false);
    setMessage('');

    findScientistConversation(scientistId)
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

  const handleStart = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!message.trim()) {
      toast.error('Please enter your message');
      return;
    }
    setStarting(true);
    try {
      let started = await startScientistConversation(scientistId);
      if (!started) started = await findScientistConversation(scientistId);
      if (!started) throw new Error('Conversation started but could not be loaded.');

      setConversation(started);
      if (!started.canSend) {
        await loadMessages(started);
        toast.error(started.sendBlockedReason || 'Messaging is currently unavailable for this conversation.');
        return;
      }
      try {
        const sent = await sendScientistMessage(started.id, message.trim(), started.participantId);
        setMessages([sent]);
        setJustStarted(true);
      } catch (sendError: any) {
        toast.error(sendError?.message || 'Conversation started, but the message could not be sent.');
        await loadMessages(started);
      }
      setMessage('');
    } catch (error: any) {
      toast.error(error?.message || 'Failed to start the conversation');
    } finally {
      setStarting(false);
    }
  };

  useEffect(() => {
    if (!justStarted) return;
    const timer = window.setTimeout(() => setJustStarted(false), 5000);
    return () => window.clearTimeout(timer);
  }, [justStarted]);

  const handleSendReply = async (text: string) => {
    if (!conversation) return;
    setSending(true);
    try {
      const sent = await sendScientistMessage(conversation.id, text, conversation.participantId);
      setMessages((previous) => [...previous, sent]);
      setJustStarted(false);
    } catch (error: any) {
      toast.error(error?.message || 'Failed to send message');
      throw error;
    } finally {
      setSending(false);
    }
  };

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

  const hasScientistResponded = messages.some((item) => !item.isMine);
  const canReply = (conversation?.canSend ?? true) && (messages.length === 0 || hasScientistResponded);
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
              Checking your conversations...
            </div>
          ) : conversation ? (
            <ContactInnovatorChat
              innovatorName={scientistName}
              messages={messages}
              loading={loadingMessages}
              sending={sending}
              canReply={canReply}
              sendBlockedReason={conversation.sendBlockedReason}
              justStarted={justStarted}
              refreshing={refreshing}
              onSend={handleSendReply}
              onRefresh={() => void handleRefresh()}
              roleLabel="scientist"
            />
          ) : (
            <form onSubmit={handleStart} className="flex flex-col gap-4 p-5">
              <div>
                <label htmlFor="scientist-message" className="mb-1.5 block text-sm font-semibold text-neutral-black">
                  Your Message <span className="text-brand-red-600">*</span>
                </label>
                <textarea
                  id="scientist-message"
                  rows={6}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Hello, I would like to discuss your services."
                  className="w-full resize-none rounded-lg border border-neutral-gray-light p-3 text-sm text-neutral-black outline-none focus:border-brand-red-600 focus:ring-1 focus:ring-brand-red-600"
                />
              </div>
              <button
                type="submit"
                disabled={starting || !message.trim()}
                className="inline-flex items-center justify-center gap-2 self-end rounded-lg bg-brand-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {starting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                {starting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
