import { api } from '@/lib/api';
import { getListingTypeLabel } from '@/lib/conversations';

export type BlockScope = 'BOTH' | 'CLIENT';

export interface AdminConversation {
  id: string;
  listingId: string;
  listingName: string;
  listingType: string;
  listingTypeLabel: string;
  listingImage?: string;
  clientId: string;
  clientName: string;
  clientEmail?: string;
  clientAvatar?: string;
  innovatorId: string;
  innovatorName: string;
  innovatorEmail?: string;
  innovatorAvatar?: string;
  purpose?: string;
  organization?: string;
  lastMessage: string;
  lastMessageAt: string | null;
  lastMessageSenderId?: string;
  messageCount: number;
  status: string;
  blocked: boolean;
  blockScope?: string;
  blockReason?: string;
  messagingSuspended: boolean;
  suspensionReason?: string;
  suspendedUntil?: string;
}

export interface AdminChatMessage {
  id: string;
  conversationId: string;
  text: string;
  senderId?: string;
  senderName?: string;
  senderRole?: 'CLIENT' | 'INNOVATOR' | string;
  createdAt: string;
  isClient: boolean;
  read: boolean;
}

export interface AdminConversationFilters {
  innovationId?: string;
  listingType?: string;
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}

function asRecord(value: unknown): Record<string, any> {
  return value && typeof value === 'object' ? (value as Record<string, any>) : {};
}

function textOf(...values: unknown[]): string {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) return value.trim();
    if (typeof value === 'number') return String(value);
  }
  return '';
}

function idOf(value: unknown): string {
  const record = asRecord(value);
  const nested = asRecord(record.user ?? record.profile ?? record.participant);
  return textOf(
    record.id,
    record._id,
    record.userId,
    nested.id,
    nested._id,
    nested.userId,
    record.value,
  );
}

function personName(value: unknown, fallback = ''): string {
  const record = asRecord(value);
  const profile = asRecord(record.profile);
  const nested = asRecord(record.user ?? record.participant);
  return (
    textOf(
      record.fullName,
      record.name,
      record.username,
      record.displayName,
      profile.fullName,
      profile.name,
      nested.fullName,
      nested.name,
      nested.username,
      record.email,
    ) || fallback
  );
}

function personEmail(value: unknown): string {
  const record = asRecord(value);
  const nested = asRecord(record.user ?? record.participant);
  return textOf(record.email, nested.email);
}

function personAvatar(value: unknown): string {
  const record = asRecord(value);
  const profile = asRecord(record.profile);
  const nested = asRecord(record.user ?? record.participant);
  return textOf(
    record.avatar,
    record.displayPhoto,
    record.avatarUrl,
    record.profileImage,
    record.photo,
    profile.avatar,
    profile.displayPhoto,
    profile.avatarUrl,
    nested.avatar,
    nested.displayPhoto,
    nested.avatarUrl,
    nested.profileImage,
  );
}

function normalizeListingType(...values: unknown[]): string {
  const raw = textOf(...values).toUpperCase().replace(/[\s-]+/g, '_');
  if (!raw) return 'AFRO_INNOVATION';
  if (raw.includes('INSTITUTE')) return 'INSTITUTE';
  if (raw.includes('SCIENT') || raw.includes('TECHNOLOG')) return 'SCIENTIST_TECHNOLOGIST';
  if (raw.includes('SPECIAL') || raw.includes('CENTRE') || raw.includes('CENTER')) return 'SPECIAL_CENTER';
  return 'AFRO_INNOVATION';
}

function extractArray(payload: unknown, keys: string[]): any[] {
  const root = asRecord(payload);
  const data = root.data ?? payload;
  if (Array.isArray(data)) return data;
  const dataRecord = asRecord(data);
  for (const key of keys) {
    if (Array.isArray(dataRecord[key])) return dataRecord[key];
  }
  for (const key of ['data', 'items', 'results', 'records', 'conversations', 'messages']) {
    if (Array.isArray(dataRecord[key])) return dataRecord[key];
  }
  if (Array.isArray(root.items)) return root.items;
  if (Array.isArray(root.results)) return root.results;
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

export function normalizeAdminConversation(rawValue: unknown): AdminConversation {
  const raw = asRecord(rawValue);
  const listing = asRecord(
    raw.listing ?? raw.innovation ?? raw.listingDetails ?? raw.innovationDetails ?? raw.subjectListing,
  );
  const listingInfo = asRecord(listing.innovation ?? listing.listing ?? listing.details ?? listing);
  const listingType = normalizeListingType(
    raw.listingType,
    raw.listing_type,
    raw.listingCategory,
    raw.category,
    listingInfo.listingType,
    listingInfo.type,
    raw.type,
  );

  const participants = Array.isArray(raw.participants) ? raw.participants : [];
  const clientParticipant = participants.find((p: any) => {
    const r = String(p?.role ?? '').toUpperCase();
    return ['CLIENT', 'SENDER', 'INQUIRER', 'VISITOR', 'INITIATOR', 'USER'].includes(r);
  });
  const ownerParticipant = participants.find((p: any) => {
    const r = String(p?.role ?? '').toUpperCase();
    return ['OWNER', 'INNOVATOR', 'LISTING_OWNER', 'CREATOR', 'RECIPIENT', 'RECEIVER'].includes(r);
  });

  const clientObj = asRecord(
    raw.client
      ?? raw.sender
      ?? raw.initiator
      ?? raw.inquirer
      ?? raw.visitor
      ?? clientParticipant
      ?? participants[0]
      ?? raw.user,
  );
  const innovatorObj = asRecord(
    raw.innovator
      ?? raw.owner
      ?? raw.listingOwner
      ?? raw.creator
      ?? raw.recipient
      ?? raw.receiver
      ?? ownerParticipant
      ?? participants[1]
      ?? listingInfo.user
      ?? listingInfo.creator,
  );

  const clientId =
    idOf(clientObj)
    || textOf(raw.clientUserId, raw.clientId, raw.senderId, raw.initiatorId, raw.userId);
  const innovatorId =
    idOf(innovatorObj)
    || textOf(raw.innovatorId, raw.ownerId, raw.listingOwnerId, raw.recipientId, listingInfo.userId);

  const lastMessageRaw = raw.lastMessage ?? raw.latestMessage ?? raw.message;
  const lastMessageRecord = asRecord(lastMessageRaw);
  const lastMessageText =
    typeof lastMessageRaw === 'string'
      ? lastMessageRaw
      : textOf(
          lastMessageRecord.body,
          lastMessageRecord.preview,
          lastMessageRecord.message,
          lastMessageRecord.content,
          lastMessageRecord.text,
          raw.lastMessageText,
          raw.preview,
          raw.messagePreview,
        );

  const lastMessageAt =
    textOf(
      raw.lastMessageAt,
      raw.lastMessageTime,
      raw.updatedAt,
      lastMessageRecord.at,
      lastMessageRecord.createdAt,
      lastMessageRecord.timestamp,
      raw.createdAt,
    ) || null;

  const blockRecord = asRecord(raw.block ?? raw.blockInfo ?? raw.blockedInfo);
  const statusStr = textOf(raw.status, 'ACTIVE').toUpperCase();
  const isBlocked =
    Boolean(raw.isBlocked ?? raw.blocked ?? raw.block)
    || statusStr === 'BLOCKED';

  const suspensionRecord = asRecord(
    raw.messagingSuspension
      ?? raw.suspension
      ?? clientObj.messagingSuspension
      ?? clientObj.suspension,
  );
  const suspendedUntil = textOf(
    raw.messagingSuspendedUntil,
    raw.suspendedUntil,
    suspensionRecord.expiresAt,
    suspensionRecord.until,
    suspensionRecord.suspendedUntil,
    clientObj.messagingSuspendedUntil,
  );
  const isSuspended =
    Boolean(
      raw.isMessagingSuspended
        ?? raw.messagingSuspended
        ?? raw.clientMessagingSuspended
        ?? raw.isSuspended
        ?? raw.suspended
        ?? clientObj.messagingSuspended
        ?? clientObj.isMessagingSuspended
        ?? (raw.messagingSuspension && typeof raw.messagingSuspension === 'object')
        ?? (suspendedUntil && new Date(suspendedUntil).getTime() > Date.now()),
    ) || statusStr === 'SUSPENDED';

  return {
    id: textOf(raw.id, raw._id, raw.conversationId),
    listingId: textOf(
      raw.listingId,
      raw.innovationId,
      listingInfo.id,
      listingInfo._id,
      raw.listing?.id,
    ),
    listingName: textOf(
      raw.listingName,
      raw.innovationName,
      listingInfo.innovationName,
      listingInfo.name,
      listingInfo.title,
      raw.subject,
      'Innovation Listing',
    ),
    listingType,
    listingTypeLabel: getListingTypeLabel(listingType),
    listingImage:
      textOf(
        raw.listingImage,
        listingInfo.image,
        listingInfo.displayPhoto,
        listingInfo.profileImage,
      ) || undefined,
    clientId,
    clientName: personName(clientObj, textOf(raw.clientName, raw.senderName, 'User')),
    clientEmail: personEmail(clientObj) || textOf(raw.clientEmail) || undefined,
    clientAvatar: personAvatar(clientObj) || textOf(raw.clientAvatar) || undefined,
    innovatorId,
    innovatorName: personName(
      innovatorObj,
      textOf(raw.innovatorName, raw.ownerName, listingInfo.creator, 'Innovator'),
    ),
    innovatorEmail: personEmail(innovatorObj) || textOf(raw.innovatorEmail) || undefined,
    innovatorAvatar: personAvatar(innovatorObj) || textOf(raw.innovatorAvatar) || undefined,
    purpose: textOf(raw.purpose, raw.reason) || undefined,
    organization: textOf(raw.organizationName, raw.organization) || undefined,
    lastMessage: lastMessageText,
    lastMessageAt,
    lastMessageSenderId:
      textOf(
        raw.lastMessageSenderId,
        lastMessageRecord.senderId,
        lastMessageRecord.sender?.id,
        raw.lastSenderId,
      ) || undefined,
    messageCount: Number(raw.messageCount ?? raw.messagesCount ?? raw.totalMessages ?? 0) || 0,
    status: statusStr,
    blocked: isBlocked,
    blockScope: textOf(blockRecord.scope, raw.blockScope) || undefined,
    blockReason: textOf(blockRecord.reason, raw.blockReason, raw.blockedReason) || undefined,
    messagingSuspended: isSuspended,
    suspensionReason:
      textOf(
        suspensionRecord.reason,
        raw.suspensionReason,
        raw.messagingSuspensionReason,
      ) || undefined,
    suspendedUntil: suspendedUntil || undefined,
  };
}

export function normalizeAdminMessage(
  rawValue: unknown,
  conversationId: string,
  clientId?: string,
  innovatorId?: string,
): AdminChatMessage {
  const raw = asRecord(rawValue);
  const sender = asRecord(raw.sender ?? raw.user ?? raw.author);
  const senderUser = asRecord(sender.user ?? sender.participant);
  const senderId =
    textOf(
      raw.senderId,
      raw.sender_id,
      sender.id,
      sender._id,
      senderUser.id,
      senderUser._id,
      raw.userId,
      raw.createdBy,
    ) || undefined;

  const senderRole = textOf(raw.senderRole, sender.role, raw.role).toUpperCase();
  let isClient = false;
  if (clientId && senderId) {
    isClient = senderId === clientId;
  } else if (innovatorId && senderId) {
    isClient = senderId !== innovatorId;
  } else if (['CLIENT', 'SENDER', 'INQUIRER', 'VISITOR', 'INITIATOR'].includes(senderRole)) {
    isClient = true;
  }

  const readValue = raw.isRead ?? raw.read ?? raw.seen ?? raw.isSeen;
  const status = String(raw.status ?? raw.messageStatus ?? '').toUpperCase();
  const read =
    readValue === true
    || Boolean(raw.readAt)
    || Boolean(raw.seenAt)
    || ['READ', 'SEEN'].includes(status);

  return {
    id:
      textOf(raw.id, raw._id, raw.messageId)
      || `msg-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    conversationId: textOf(raw.conversationId, conversationId),
    text: textOf(raw.body, raw.message, raw.content, raw.text, raw.inquiry),
    senderId,
    senderName: textOf(raw.senderName, personName(sender)) || undefined,
    senderRole: senderRole || undefined,
    createdAt:
      textOf(raw.createdAt, raw.timestamp, raw.sentAt, raw.date) || new Date().toISOString(),
    isClient,
    read,
  };
}

/** GET /admin/conversations */
export async function fetchAdminConversations(
  filters: AdminConversationFilters = {},
): Promise<AdminConversation[]> {
  const params = new URLSearchParams();
  if (filters.innovationId) params.set('innovationId', filters.innovationId);
  if (filters.listingType && filters.listingType !== 'all') {
    params.set('listingType', filters.listingType);
  }
  if (filters.status && filters.status !== 'all') params.set('status', filters.status);
  if (filters.search?.trim()) params.set('search', filters.search.trim());
  params.set('limit', String(filters.limit ?? 100));
  if (filters.page) params.set('page', String(filters.page));

  const query = params.toString();
  const response: any = await api.get(`/admin/conversations${query ? `?${query}` : ''}`, {
    auth: 'required',
  });
  return extractArray(response, ['conversations'])
    .map((item) => normalizeAdminConversation(item))
    .filter((conversation) => Boolean(conversation.id))
    .sort((a, b) => {
      const aTime = a.lastMessageAt ? new Date(a.lastMessageAt).getTime() : 0;
      const bTime = b.lastMessageAt ? new Date(b.lastMessageAt).getTime() : 0;
      return bTime - aTime;
    });
}

/** GET /admin/conversations/:conversationId */
export async function fetchAdminConversation(
  conversationId: string,
): Promise<AdminConversation | null> {
  const response: any = await api.get(
    `/admin/conversations/${encodeURIComponent(conversationId)}`,
    { auth: 'required' },
  );
  const raw = extractObject(response);
  const conversation = normalizeAdminConversation(raw);
  return conversation.id ? conversation : null;
}

/** GET /admin/conversations/:conversationId/messages */
export async function fetchAdminMessages(
  conversationId: string,
  clientId?: string,
  innovatorId?: string,
): Promise<AdminChatMessage[]> {
  const response: any = await api.get(
    `/admin/conversations/${encodeURIComponent(conversationId)}/messages?limit=100`,
    { auth: 'required' },
  );
  return extractArray(response, ['messages'])
    .map((item) => normalizeAdminMessage(item, conversationId, clientId, innovatorId))
    .filter((message) => Boolean(message.id))
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
}

/** PATCH /admin/conversations/:conversationId/block */
export async function blockAdminConversation(
  conversationId: string,
  payload: { scope: BlockScope; reason: string },
): Promise<AdminConversation | null> {
  const response: any = await api.patch(
    `/admin/conversations/${encodeURIComponent(conversationId)}/block`,
    {
      scope: payload.scope,
      reason: payload.reason.trim(),
    },
    { auth: 'required' },
  );
  const raw = extractObject(response);
  const normalized = normalizeAdminConversation(raw);
  return normalized.id ? normalized : null;
}

/** PATCH /admin/conversations/:conversationId/unblock */
export async function unblockAdminConversation(
  conversationId: string,
): Promise<AdminConversation | null> {
  const response: any = await api.patch(
    `/admin/conversations/${encodeURIComponent(conversationId)}/unblock`,
    {},
    { auth: 'required' },
  );
  const raw = extractObject(response);
  const normalized = normalizeAdminConversation(raw);
  return normalized.id ? normalized : null;
}

/** PATCH /admin/conversations/users/:clientUserId/messaging-suspension */
export async function suspendClientMessaging(
  clientUserId: string,
  payload: { reason: string; durationHours: number },
): Promise<unknown> {
  const response: any = await api.patch(
    `/admin/conversations/users/${encodeURIComponent(clientUserId)}/messaging-suspension`,
    {
      reason: payload.reason.trim(),
      durationHours: Number(payload.durationHours),
    },
    { auth: 'required' },
  );
  return response?.data ?? response;
}

/** DELETE /admin/conversations/users/:clientUserId/messaging-suspension */
export async function liftClientMessagingSuspension(
  clientUserId: string,
): Promise<unknown> {
  const response: any = await api.delete(
    `/admin/conversations/users/${encodeURIComponent(clientUserId)}/messaging-suspension`,
    { auth: 'required' },
  );
  return response?.data ?? response;
}
