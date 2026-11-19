import { api } from '@/lib/api';
import {
  normalizeAdminConversation,
  normalizeAdminMessage,
  type AdminChatMessage,
  type AdminConversation,
  type BlockScope,
} from '@/lib/adminConversations';

/**
 * Admin moderation API for Scientist / Technologist conversations.
 *
 * Endpoints:
 *   GET   /admin/scientist-conversations
 *   GET   /admin/scientist-conversations/{id}
 *   GET   /admin/scientist-conversations/{id}/messages
 *   PATCH /admin/scientist-conversations/{id}/block
 *   PATCH /admin/scientist-conversations/{id}/unblock
 */

function asRecord(value: unknown): Record<string, any> {
  return value && typeof value === 'object' ? (value as Record<string, any>) : {};
}

function extractArray(payload: unknown): any[] {
  const root = asRecord(payload);
  const data = root.data ?? payload;
  if (Array.isArray(data)) return data;
  const record = asRecord(data);
  for (const key of ['conversations', 'scientistConversations', 'data', 'items', 'results', 'records']) {
    if (Array.isArray(record[key])) return record[key];
  }
  return [];
}

function extractObject(payload: unknown): Record<string, any> {
  const root = asRecord(payload);
  const data = root.data ?? payload;
  if (data && typeof data === 'object' && !Array.isArray(data)) {
    const record = asRecord(data);
    return asRecord(record.conversation ?? record.data ?? record);
  }
  return {};
}

/** Adds the scientist listing hint without losing the API's own fields. */
function withScientistType(raw: unknown): Record<string, any> {
  return { ...asRecord(raw), listingType: 'SCIENTIST_TECHNOLOGIST' };
}

export interface AdminScientistConversationFilters {
  scientistId?: string;
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}

/** GET /admin/scientist-conversations */
export async function fetchAdminScientistConversations(
  _filters: AdminScientistConversationFilters = {},
): Promise<AdminConversation[]> {
  const response: any = await api.get('/admin/scientist-conversations', { auth: 'required' });
  return extractArray(response)
    .map((item) => normalizeAdminConversation(withScientistType(item)))
    .filter((conversation) => Boolean(conversation.id))
    .sort((a, b) => {
      const aTime = a.lastMessageAt ? new Date(a.lastMessageAt).getTime() : 0;
      const bTime = b.lastMessageAt ? new Date(b.lastMessageAt).getTime() : 0;
      return bTime - aTime;
    });
}

/** GET /admin/scientist-conversations/{id} */
export async function fetchAdminScientistConversation(
  conversationId: string,
): Promise<AdminConversation | null> {
  const response: any = await api.get(
    `/admin/scientist-conversations/${encodeURIComponent(conversationId)}`,
    { auth: 'required' },
  );
  const conversation = normalizeAdminConversation(withScientistType(extractObject(response)));
  return conversation.id ? conversation : null;
}

/** GET /admin/scientist-conversations/{id}/messages */
export async function fetchAdminScientistMessages(
  conversationId: string,
  clientId?: string,
  innovatorId?: string,
): Promise<AdminChatMessage[]> {
  const response: any = await api.get(
    `/admin/scientist-conversations/${encodeURIComponent(conversationId)}/messages`,
    { auth: 'required' },
  );
  return extractArray(response)
    .map((item) => normalizeAdminMessage(item, conversationId, clientId, innovatorId))
    .filter((message) => Boolean(message.id))
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
}

/** PATCH /admin/scientist-conversations/{id}/block */
export async function blockAdminScientistConversation(
  conversationId: string,
  payload: { scope: BlockScope; reason: string },
): Promise<AdminConversation | null> {
  const response: any = await api.patch(
    `/admin/scientist-conversations/${encodeURIComponent(conversationId)}/block`,
    { scope: payload.scope, reason: payload.reason.trim() },
    { auth: 'required' },
  );
  const conversation = normalizeAdminConversation(withScientistType(extractObject(response)));
  return conversation.id ? conversation : null;
}

/** PATCH /admin/scientist-conversations/{id}/unblock */
export async function unblockAdminScientistConversation(
  conversationId: string,
): Promise<AdminConversation | null> {
  const response: any = await api.patch(
    `/admin/scientist-conversations/${encodeURIComponent(conversationId)}/unblock`,
    {},
    { auth: 'required' },
  );
  const conversation = normalizeAdminConversation(withScientistType(extractObject(response)));
  return conversation.id ? conversation : null;
}
