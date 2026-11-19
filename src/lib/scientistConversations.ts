import { api } from '@/lib/api';
import {
  extractArray,
  extractObject,
  getCurrentUserId,
  getListingTypeLabel,
  normalizeConversation,
  normalizeMessage,
  type ChatMessage,
  type Conversation,
} from '@/lib/conversations';

/**
 * Scientist / Technologist messaging API.
 *
 * Endpoints:
 *   POST /scientist-conversations                          start conversation
 *   GET  /scientist-conversations                          my conversations
 *   GET  /scientist-conversations/{id}                     one conversation
 *   GET  /scientist-conversations/{id}/messages            messages
 *   POST /scientist-conversations/{id}/messages            send message
 *   POST /scientist-conversations/{id}/read                mark read
 */

const dbg = (error: unknown) => {
  if (process.env.NODE_ENV !== 'production') console.error(error);
};

/** Forces the scientist listing fields the shared normalizer may not infer. */
function asScientistConversation(rawValue: unknown, currentUserId?: string | null): Conversation {
  const conversation = normalizeConversation(
    {
      ...(rawValue as Record<string, any>),
      listingType: 'SCIENTIST_TECHNOLOGIST',
    },
    currentUserId,
  );
  return {
    ...conversation,
    source: 'scientist',
    listingType: 'SCIENTIST_TECHNOLOGIST',
    listingTypeLabel: getListingTypeLabel('SCIENTIST_TECHNOLOGIST'),
  };
}

/** GET /scientist-conversations - the signed-in user's scientist threads. */
export async function fetchScientistConversations(): Promise<Conversation[]> {
  const response: any = await api.get('/scientist-conversations', { auth: 'required' });
  const currentUserId = getCurrentUserId();
  return extractArray(response, ['conversations', 'scientistConversations'])
    .map((item) => asScientistConversation(item, currentUserId))
    .filter((conversation) => Boolean(conversation.id))
    .sort((a, b) => {
      const aTime = a.lastMessageAt ? new Date(a.lastMessageAt).getTime() : 0;
      const bTime = b.lastMessageAt ? new Date(b.lastMessageAt).getTime() : 0;
      return bTime - aTime;
    });
}

/** GET /scientist-conversations/{id} */
export async function fetchScientistConversation(id: string): Promise<Conversation | null> {
  const response: any = await api.get(`/scientist-conversations/${encodeURIComponent(id)}`, {
    auth: 'required',
  });
  const raw = extractObject(response);
  const conversation = asScientistConversation(raw, getCurrentUserId());
  return conversation.id ? conversation : null;
}

/** Finds the current user's conversation for a scientist listing, if any. */
export async function findScientistConversation(
  scientistId: string,
  scientistName?: string,
): Promise<Conversation | null> {
  if (!scientistId) return null;
  const conversations = await fetchScientistConversations();
  return conversations.find((conversation) => (
    conversation.listingId === scientistId
    || (!!scientistName && conversation.listingName === scientistName)
  )) ?? null;
}

/** POST /scientist-conversations - starts or reopens a conversation. */
export async function startScientistConversation(scientistId: string): Promise<Conversation | null> {
  const response: any = await api.post('/scientist-conversations', { scientistId }, {
    auth: 'required',
  });
  const raw = extractObject(response);
  const conversation = asScientistConversation(raw, getCurrentUserId());
  return conversation.id ? conversation : null;
}

/** GET /scientist-conversations/{id}/messages */
export async function fetchScientistMessages(
  conversationId: string,
  otherUserId?: string,
): Promise<ChatMessage[]> {
  const response: any = await api.get(
    `/scientist-conversations/${encodeURIComponent(conversationId)}/messages`,
    { auth: 'required' },
  );
  const currentUserId = getCurrentUserId();
  return extractArray(response, ['messages'])
    .map((item) => normalizeMessage(item, conversationId, currentUserId, otherUserId))
    .filter((message) => Boolean(message.id))
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
}

/** POST /scientist-conversations/{id}/messages */
export async function sendScientistMessage(
  conversationId: string,
  message: string,
  otherUserId?: string,
): Promise<ChatMessage> {
  const response: any = await api.post(
    `/scientist-conversations/${encodeURIComponent(conversationId)}/messages`,
    { body: message },
    { auth: 'required' },
  );
  const root = extractObject(response);
  const data = (root.data && typeof root.data === 'object') ? root.data : root;
  const raw = data.message && typeof data.message === 'object' ? data.message : (data.data ?? data);
  const normalized = normalizeMessage(raw, conversationId, getCurrentUserId(), otherUserId);
  const result = normalized.text
    ? normalized
    : normalizeMessage({ body: message }, conversationId, getCurrentUserId(), otherUserId);
  return { ...result, isMine: true };
}

/** POST /scientist-conversations/{id}/read */
export async function markScientistConversationRead(
  conversationId: string,
  messageId?: string,
): Promise<void> {
  try {
    await api.post(
      `/scientist-conversations/${encodeURIComponent(conversationId)}/read`,
      messageId ? { messageId } : {},
      { auth: 'required' },
    );
  } catch (error) {
    dbg(error);
    throw error;
  }
}
