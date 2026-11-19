'use client';

import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import ScientistMessagesView from './ScientistMessagesView';

export default function ScientistMessagesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[440px] items-center justify-center rounded-xl border border-neutral-gray-light bg-white text-sm text-neutral-gray-medium">
          <Loader2 className="mr-2 h-4 w-4 animate-spin text-[#453DD8]" /> Loading messages...
        </div>
      }
    >
      <ScientistMessagesView />
    </Suspense>
  );
}
