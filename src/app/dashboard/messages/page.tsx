'use client';

import { MOCK_MESSAGES } from '../data';
import MessageList from './components/MessageList';

export default function MessagesPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-neutral-gray-light bg-white shadow-sm overflow-hidden">
        <div className="p-5 border-b border-neutral-gray-light">
          <h2 className="text-xl font-bold text-neutral-black">Messages</h2>
          <p className="text-sm text-neutral-gray-medium mt-0.5">View and manage your conversations</p>
        </div>
        <MessageList messages={MOCK_MESSAGES} />
      </div>
    </div>
  );
}
