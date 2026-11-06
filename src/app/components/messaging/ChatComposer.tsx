'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { cn } from '@/lib/utils';

interface ChatComposerProps {
  onSend: (message: string) => Promise<void> | void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

/** Shared message input used by the public contact modal and the dashboard. */
export function ChatComposer({
  onSend,
  disabled = false,
  placeholder = 'Type a message...',
  className,
}: ChatComposerProps) {
  const [value, setValue] = useState('');
  const [sending, setSending] = useState(false);

  const submit = async () => {
    const text = value.trim();
    if (!text || disabled || sending) return;
    setSending(true);
    try {
      await onSend(text);
      setValue('');
    } catch {
      // The parent surfaces the error; keep the draft so it can be retried.
    } finally {
      setSending(false);
    }
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        void submit();
      }}
      className={cn('flex items-end gap-2', className)}
    >
      <textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            void submit();
          }
        }}
        rows={1}
        placeholder={placeholder}
        disabled={disabled || sending}
        className="max-h-28 min-h-11 flex-1 resize-none rounded-xl border border-neutral-gray-light bg-white px-3.5 py-3 text-sm text-neutral-black outline-none transition focus:border-brand-navy-900 focus:ring-2 focus:ring-brand-navy-900/20 disabled:cursor-not-allowed disabled:bg-neutral-bg-light disabled:text-neutral-gray-medium"
      />
      <Button
        type="submit"
        size="icon"
        loading={sending}
        disabled={disabled || !value.trim()}
        className="h-11 w-11 shrink-0 rounded-xl"
        aria-label="Send message"
      >
        {!sending && <Send className="h-4 w-4" />}
      </Button>
    </form>
  );
}
