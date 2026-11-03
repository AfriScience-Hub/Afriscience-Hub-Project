'use client';

import { MessageCircle } from 'lucide-react';

export default function MessagesEmptyState() {
  return (
    <div className="flex h-full min-h-[420px] flex-col items-center justify-center p-8 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-red-50">
        <MessageCircle className="h-9 w-9 text-brand-red-500" />
      </div>
      <h3 className="mt-5 text-lg font-bold text-neutral-black">No messages yet</h3>
      <p className="mt-1 max-w-sm text-sm text-neutral-gray-medium">
        When you contact an innovator, your conversations will appear here.
      </p>
    </div>
  );
}
