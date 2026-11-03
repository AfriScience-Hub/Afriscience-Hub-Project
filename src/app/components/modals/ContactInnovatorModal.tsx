'use client';

import { useCallback, useEffect, useState } from 'react';
import { Loader2, X } from 'lucide-react';
import { Avatar } from '../Avatar';
import { toast } from 'sonner';
import {
  findConversationForInnovation,
  fetchMessages,
  markConversationRead,
  sendMessage,
  startConversation,
  type ChatMessage,
  type Conversation,
} from '@/lib/conversations';
import ContactInnovatorForm from './contact-innovator/ContactInnovatorForm';
import ContactInnovatorChat from './contact-innovator/ContactInnovatorChat';

interface ContactInnovatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  innovationId: string;
  innovatorName: string;
  innovatorId?: string;
  innovatorImage?: string;
  innovationImage?: string;
  innovationName: string;
}

type ViewMode = 'form' | 'chat';

export function ContactInnovatorModal({
  isOpen,
  onClose,
  innovationId,
  innovatorName,
  innovatorId,
  innovatorImage,
  innovationImage,
  innovationName,
}: ContactInnovatorModalProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('form');
  const [checking, setChecking] = useState(false);
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [justStarted, setJustStarted] = useState(false);

  const [purpose, setPurpose] = useState('');
  const [organization, setOrganization] = useState('');
  const [otherPurpose, setOtherPurpose] = useState('');
  const [message, setMessage] = useState('');

  const loadMessages = useCallback(async (target: Conversation) => {
    setLoadingMessages(true);
    try {
      const rows = await fetchMessages(target.id, target.participantId);
      setMessages(rows);
      if (target.unreadCount > 0) {
        const newestId = rows[rows.length - 1]?.id;
        void markConversationRead(target.id, newestId)
          .then(() => setMessages((previous) => previous.map((item) => (
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
    setLoadingMessages(false);
    setRefreshing(false);
    setSending(false);
    setSubmitting(false);
    setPurpose('');
    setOrganization('');
    setOtherPurpose('');
    setMessage('');

    findConversationForInnovation(innovationId)
      .then(async (existing) => {
        if (cancelled) return;
        if (!existing) {
          setViewMode('form');
          return;
        }
        setConversation(existing);
        setViewMode('chat');
        await loadMessages(existing);
      })
      .catch((error: any) => {
        if (cancelled) return;
        setViewMode('form');
        toast.error(error?.message || 'Could not check for an existing conversation');
      })
      .finally(() => {
        if (!cancelled) setChecking(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isOpen, innovationId, loadMessages]);

  const handleStartConversation = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!purpose) {
      toast.error('Please select the purpose of contact');
      return;
    }
    if (purpose === 'Other' && !otherPurpose.trim()) {
      toast.error('Please specify the purpose of contact');
      return;
    }
    if (!message.trim()) {
      toast.error('Please enter your message');
      return;
    }

    setSubmitting(true);
    try {
      let started = await startConversation({
        innovationId,
        purpose: purpose === 'Other' ? otherPurpose.trim() : purpose,
        organization: organization.trim() || undefined,
      });
      if (!started) started = await findConversationForInnovation(innovationId);
      if (!started) throw new Error('Conversation started but could not be loaded.');

      setConversation(started);
      if (!started.canSend) {
        setViewMode('chat');
        await loadMessages(started);
        toast.error(started.sendBlockedReason || 'Messaging is currently unavailable for this conversation.');
        return;
      }
      try {
        const sent = await sendMessage(started.id, message.trim(), started.participantId);
        setMessages([sent]);
        setJustStarted(true);
      } catch (sendError: any) {
        toast.error(sendError?.message || 'Conversation started, but the message could not be sent.');
        await loadMessages(started);
      }
      setViewMode('chat');
      setMessage('');
    } catch (error: any) {
      toast.error(error?.message || 'Failed to start the conversation');
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (!justStarted) return;
    const timer = window.setTimeout(() => {
      setJustStarted(false);
    }, 5000);
    return () => window.clearTimeout(timer);
  }, [justStarted]);

  const handleSendReply = async (text: string) => {
    if (!conversation) return;
    setSending(true);
    try {
      const sent = await sendMessage(conversation.id, text, conversation.participantId);
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
      const rows = await fetchMessages(conversation.id, conversation.participantId);
      setMessages(rows);
      if (rows.some((item) => !item.isMine && !item.read)) {
        await markConversationRead(conversation.id, rows[rows.length - 1]?.id).catch(() => undefined);
        setMessages(rows.map((item) => (item.isMine ? item : { ...item, read: true })));
      }
    } catch (error: any) {
      toast.error(error?.message || 'Failed to refresh the conversation');
    } finally {
      setRefreshing(false);
    }
  };

  const handleClose = () => {
    setViewMode('form');
    setConversation(null);
    setMessages([]);
    setChecking(false);
    setJustStarted(false);
    setLoadingMessages(false);
    setRefreshing(false);
    setSending(false);
    setSubmitting(false);
    setPurpose('');
    setOrganization('');
    setOtherPurpose('');
    setMessage('');
    onClose();
  };

  if (!isOpen) return null;

  const hasInnovatorResponded = messages.some((item) => !item.isMine);
  const canReply = (conversation?.canSend ?? true) && (messages.length === 0 || hasInnovatorResponded);
  const headerImage = innovationImage || conversation?.listingImage || innovatorImage;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex flex-shrink-0 items-center gap-3 bg-gradient-to-r from-brand-navy-900 to-brand-navy-800 px-5 py-4">
          <Avatar src={headerImage} name={innovationName || innovatorName} size="md" />
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-bold text-white">Contact Innovator</h2>
            <p className="truncate text-sm text-white/70">{innovatorName} • {innovationName}</p>
          </div>
          <button
            type="button"
            onClick={handleClose}
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
          ) : viewMode === 'form' ? (
            <ContactInnovatorForm
              purpose={purpose}
              organization={organization}
              otherPurpose={otherPurpose}
              message={message}
              submitting={submitting}
              onPurposeChange={setPurpose}
              onOrganizationChange={setOrganization}
              onOtherPurposeChange={setOtherPurpose}
              onMessageChange={setMessage}
              onSubmit={handleStartConversation}
            />
          ) : (
            <ContactInnovatorChat
              innovatorName={innovatorName}
              messages={messages}
              loading={loadingMessages}
              sending={sending}
              canReply={canReply}
              sendBlockedReason={conversation?.sendBlockedReason}
              justStarted={justStarted}
              refreshing={refreshing}
              onSend={handleSendReply}
              onRefresh={() => void handleRefresh()}
            />
          )}
        </div>
      </div>
    </div>
  );
}
