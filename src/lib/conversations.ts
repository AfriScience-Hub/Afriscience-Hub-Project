import { api } from '@/lib/api';
import { getStoredToken } from '@/lib/authStorage';

export const LISTING_TYPES = [
  { value: 'AFRO_INNOVATION', label: 'Afro-Innovation' },
  { value: 'INSTITUTE', label: 'Institute' },
  { value: 'SCIENTIST_TECHNOLOGIST', label: 'Scientist & Technologist' },
  { value: 'SPECIAL_CENTER', label: 'Special center' },
] as const;

function normalizeListingType(...values: unknown[]): string {
  const raw = textOf(...values).toUpperCase().replace(/[\s-]+/g, '_');
  if (!raw) return 'AFRO_INNOVATION';
  if (raw.includes('INSTITUTE')) return 'INSTITUTE';
  if (raw.includes('SCIENT') || raw.includes('TECHNOLOG')) return 'SCIENTIST_TECHNOLOGIST';
  if (raw.includes('SPECIAL') || raw.includes('CENTRE') || raw.includes('CENTER')) return 'SPECIAL_CENTER';
  return 'AFRO_INNOVATION';
}

export function getListingTypeLabel(type: string): string {
  return LISTING_TYPES.find((option) => option.value === type)?.label ?? LISTING_TYPES[0].label;
}

export interface Conversation {
  id: string;
  listingId: string;
  listingName: string;
  listingType: string;
  listingTypeLabel: string;
  listingImage?: string;
  participantId?: string;
  participantName: string;
  participantAvatar?: string;
  lastMessage: string;
  lastMessageAt: string | null;
  lastMessageSenderId?: string;
  unreadCount: number;
  purpose?: string;
  organization?: string;
  /** The signed-in user's role in this thread. */
  role?: string;
  status?: string;
  /** Authoritative composer state from the API. */
  canSend: boolean;
  sendBlockedReason?: string;
  blocked?: boolean;
  lastReadAt?: string;
  /** Demo conversation used to preview the messaging design. */
  isDemo?: boolean;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  text: string;
  senderId?: string;
  senderName?: string;
  createdAt: string;
  isMine: boolean;
  read: boolean;
}

export interface StartConversationInput {
  innovationId: string;
  purpose: string;
  organization?: string;
}

const dbg = (error: unknown) => {
  if (process.env.NODE_ENV !== 'production') console.error(error);
};

function decodeTokenUserId(): string | null {
  if (typeof window === 'undefined') return null;
  const token = getStoredToken('user');
  if (!token) return null;
  try {
    const segment = token.split('.')[1];
    if (!segment) return null;
    const normalized = segment.replace(/-/g, '+').replace(/_/g, '/');
    const padded = normalized + '='.repeat((4 - (normalized.length % 4)) % 4);
    const json = JSON.parse(decodeURIComponent(
      atob(padded).split('').map((c) => '%' + ('0' + c.charCodeAt(0).toString(16)).slice(-2)).join(''),
    ));
    return String(json?.sub || json?.userId || json?.id || json?.user?.id || '') || null;
  } catch {
    return null;
  }
}

/** The signed-in user's id, read from the access token when available. */
export function getCurrentUserId(): string | null {
  return decodeTokenUserId();
}

function asRecord(value: unknown): Record<string, any> {
  return value && typeof value === 'object' ? value as Record<string, any> : {};
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

function personName(value: unknown): string {
  const record = asRecord(value);
  const profile = asRecord(record.profile);
  const nested = asRecord(record.user ?? record.participant);
  return textOf(
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
  );
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

function extractArray(payload: unknown, keys: string[]): any[] {
  const root = asRecord(payload);
  const data = root.data ?? payload;
  if (Array.isArray(data)) return data;
  const dataRecord = asRecord(data);
  for (const key of keys) {
    if (Array.isArray(dataRecord[key])) return dataRecord[key];
  }
  for (const key of ['data', 'items', 'results', 'records']) {
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

function normalizeConversation(rawValue: unknown, currentUserId?: string | null): Conversation {
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
  const viewer = asRecord(raw.currentUser ?? raw.viewer ?? raw.user);
  const viewerId = idOf(viewer) || currentUserId;
  const otherCandidates = [
    raw.counterparty,
    raw.otherUser,
    raw.otherParticipant,
    raw.innovator,
    raw.receiver,
    raw.recipient,
    raw.participant,
    ...participants,
    raw.user,
    raw.creator,
  ];

  const other = otherCandidates.find((candidate) => {
    const candidateId = idOf(candidate);
    return candidateId && candidateId !== viewerId;
  }) ?? otherCandidates.find(Boolean) ?? {};

  const lastMessageRaw = raw.lastMessage ?? raw.latestMessage ?? raw.message;
  const lastMessageRecord = asRecord(lastMessageRaw);
  const lastMessageText = typeof lastMessageRaw === 'string'
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

  const lastMessageAt = textOf(
    raw.lastMessageAt,
    raw.lastMessageTime,
    raw.updatedAt,
    lastMessageRecord.at,
    lastMessageRecord.createdAt,
    lastMessageRecord.timestamp,
    raw.createdAt,
  ) || null;

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
      'Listing',
    ),
    listingType,
    listingTypeLabel: getListingTypeLabel(listingType),
    listingImage: textOf(
      raw.listingImage,
      listingInfo.image,
      listingInfo.displayPhoto,
      listingInfo.profileImage,
    ) || undefined,
    participantId: idOf(other) || textOf(raw.participantId, raw.recipientId, raw.receiverId) || undefined,
    participantName: textOf(
      raw.participantName,
      raw.otherUserName,
      personName(other),
      'Innovator',
    ),
    participantAvatar: personAvatar(other) || textOf(raw.participantAvatar, raw.otherUserAvatar) || undefined,
    lastMessage: lastMessageText,
    lastMessageAt,
    lastMessageSenderId: textOf(
      raw.lastMessageSenderId,
      lastMessageRecord.senderId,
      lastMessageRecord.sender?.id,
      raw.lastSenderId,
    ) || undefined,
    unreadCount: Number(raw.unreadCount ?? raw.unreadMessages ?? raw.unread ?? 0) || 0,
    purpose: textOf(raw.purpose, raw.reason) || undefined,
    organization: textOf(raw.organization, raw.organizationName) || undefined,
    role: textOf(raw.role) || undefined,
    status: textOf(raw.status) || undefined,
    canSend: raw.canSend !== false,
    sendBlockedReason: textOf(raw.sendBlockedReason, raw.blockedReason) || undefined,
    blocked: Boolean(raw.block) || String(raw.status ?? '').toUpperCase() === 'BLOCKED',
    lastReadAt: textOf(raw.lastReadAt) || undefined,
  };
}

function normalizeMessage(
  rawValue: unknown,
  conversationId: string,
  currentUserId?: string | null,
  otherUserId?: string,
): ChatMessage {
  const raw = asRecord(rawValue);
  const sender = asRecord(raw.sender ?? raw.user ?? raw.author);
  const senderUser = asRecord(sender.user ?? sender.participant);
  const senderId = textOf(
    raw.senderId,
    raw.sender_id,
    sender.id,
    sender._id,
    senderUser.id,
    senderUser._id,
    raw.userId,
    raw.createdBy,
  ) || undefined;

  let isMine: boolean | undefined;
  if (typeof raw.isMine === 'boolean') isMine = raw.isMine;
  else if (typeof raw.isOwn === 'boolean') isMine = raw.isOwn;
  else if (typeof raw.own === 'boolean') isMine = raw.own;
  else if (raw.direction === 'OUTGOING' || raw.direction === 'outgoing') isMine = true;
  else if (raw.direction === 'INCOMING' || raw.direction === 'incoming') isMine = false;
  else if (currentUserId && senderId) isMine = senderId === currentUserId;
  else if (otherUserId && senderId) isMine = senderId !== otherUserId;

  const readValue = raw.isRead ?? raw.read ?? raw.seen ?? raw.isSeen;
  const status = String(raw.status ?? raw.messageStatus ?? '').toUpperCase();
  const read = readValue === true
    || Boolean(raw.readAt)
    || Boolean(raw.seenAt)
    || ['READ', 'SEEN'].includes(status);

  return {
    id: textOf(raw.id, raw._id, raw.messageId) || `message-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    conversationId: textOf(raw.conversationId, conversationId),
    text: textOf(raw.body, raw.message, raw.content, raw.text, raw.inquiry),
    senderId,
    senderName: textOf(raw.senderName, personName(sender)) || undefined,
    createdAt: textOf(raw.createdAt, raw.timestamp, raw.sentAt, raw.date) || new Date().toISOString(),
    isMine: isMine ?? false,
    read,
  };
}

/** GET /conversations - the signed-in user's conversations. */
export async function fetchConversations(): Promise<Conversation[]> {
  const response: any = await api.get('/conversations?limit=100', { auth: 'required' });
  const currentUserId = getCurrentUserId();
  return extractArray(response, ['conversations'])
    .map((item) => normalizeConversation(item, currentUserId))
    .filter((conversation) => Boolean(conversation.id))
    .sort((a, b) => {
      const aTime = a.lastMessageAt ? new Date(a.lastMessageAt).getTime() : 0;
      const bTime = b.lastMessageAt ? new Date(b.lastMessageAt).getTime() : 0;
      return bTime - aTime;
    });
}

/** GET /conversations/{id} - a single conversation. */
export async function fetchConversation(id: string): Promise<Conversation | null> {
  const response: any = await api.get(`/conversations/${encodeURIComponent(id)}`, { auth: 'required' });
  const raw = extractObject(response);
  const conversation = normalizeConversation(raw, getCurrentUserId());
  return conversation.id ? conversation : null;
}

/** Finds the current user's conversation for a listing, if one exists. */
export async function findConversationForInnovation(innovationId: string): Promise<Conversation | null> {
  if (!innovationId) return null;
  const conversations = await fetchConversations();
  return conversations.find((conversation) => conversation.listingId === innovationId) ?? null;
}

/** POST /conversations - starts or reopens a conversation about an innovation. */
export async function startConversation(input: StartConversationInput): Promise<Conversation | null> {
  const response: any = await api.post('/conversations', {
    innovationId: input.innovationId,
    purpose: input.purpose,
    organizationName: input.organization || undefined,
  }, { auth: 'required' });
  const raw = extractObject(response);
  const conversation = normalizeConversation(raw, getCurrentUserId());
  return conversation.id ? conversation : null;
}

/** GET /conversations/{id}/messages */
export async function fetchMessages(
  conversationId: string,
  otherUserId?: string,
): Promise<ChatMessage[]> {
  const response: any = await api.get(
    `/conversations/${encodeURIComponent(conversationId)}/messages?limit=100`,
    { auth: 'required' },
  );
  const currentUserId = getCurrentUserId();
  return extractArray(response, ['messages'])
    .map((item) => normalizeMessage(item, conversationId, currentUserId, otherUserId))
    .filter((message) => Boolean(message.id))
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
}

/** POST /conversations/{id}/messages */
export async function sendMessage(
  conversationId: string,
  message: string,
  otherUserId?: string,
): Promise<ChatMessage> {
  const response: any = await api.post(
    `/conversations/${encodeURIComponent(conversationId)}/messages`,
    { body: message },
    { auth: 'required' },
  );
  const root = asRecord(response);
  const data = asRecord(root.data ?? root);
  const raw = data.message && typeof data.message === 'object'
    ? data.message
    : asRecord(data.data ?? data);
  const normalized = normalizeMessage(raw, conversationId, getCurrentUserId(), otherUserId);
  const messageResult = normalized.text
    ? normalized
    : normalizeMessage({ body: message }, conversationId, getCurrentUserId(), otherUserId);
  // A successfully returned send is always the signed-in user's message.
  return { ...messageResult, isMine: true };
}

/** POST /conversations/{id}/read - marks messages in a conversation as read. */
export async function markConversationRead(conversationId: string, messageId?: string): Promise<void> {
  try {
    await api.post(
      `/conversations/${encodeURIComponent(conversationId)}/read`,
      messageId ? { messageId } : {},
      { auth: 'required' },
    );
  } catch (error) {
    dbg(error);
    throw error;
  }
}
