import type { ChatMessage, Conversation } from '@/lib/conversations';

const DEMO_DAY = '2026-11-02T';
const at = (time: string) => `${DEMO_DAY}${time}.000Z`;

/**
 * Temporary design preview. Remove this once the real conversation flow has
 * been tested end-to-end.
 */
export const DEMO_CONVERSATION: Conversation = {
  id: 'demo-conversation',
  listingId: 'demo-solar-irrigation',
  listingName: 'Solar-Powered Irrigation System',
  listingType: 'AFRO_INNOVATION',
  listingTypeLabel: 'Afro-Innovation',
  participantId: 'demo-innovator',
  participantName: 'Dr. Wanjiku Muthoni',
  participantAvatar: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=100',
  lastMessage: 'That sounds great. I can share the deployment plan with you.',
  lastMessageAt: at('09:42'),
  lastMessageSenderId: 'demo-innovator',
  unreadCount: 1,
  canSend: true,
  purpose: 'Investment | Partnership',
  organization: 'GreenFuture Capital',
  isDemo: true,
};

export const DEMO_MESSAGES: ChatMessage[] = [
  {
    id: 'demo-message-1',
    conversationId: DEMO_CONVERSATION.id,
    text: 'Hello Dr. Muthoni, I came across your solar-powered irrigation system and would like to discuss a partnership.',
    senderId: 'demo-user',
    createdAt: at('09:05'),
    isMine: true,
    read: true,
  },
  {
    id: 'demo-message-2',
    conversationId: DEMO_CONVERSATION.id,
    text: 'Hi! Thank you for reaching out. I would be glad to discuss this further.',
    senderId: 'demo-innovator',
    senderName: DEMO_CONVERSATION.participantName,
    createdAt: at('09:18'),
    isMine: false,
    read: true,
  },
  {
    id: 'demo-message-3',
    conversationId: DEMO_CONVERSATION.id,
    text: 'We are particularly interested in how the system performs during the dry season.',
    senderId: 'demo-user',
    createdAt: at('09:30'),
    isMine: true,
    read: false,
  },
  {
    id: 'demo-message-4',
    conversationId: DEMO_CONVERSATION.id,
    text: 'That sounds great. I can share the deployment plan with you.',
    senderId: 'demo-innovator',
    senderName: DEMO_CONVERSATION.participantName,
    createdAt: at('09:42'),
    isMine: false,
    read: false,
  },
];
