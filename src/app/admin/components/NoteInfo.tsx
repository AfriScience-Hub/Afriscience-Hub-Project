'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Info } from 'lucide-react';

interface NoteInfoProps {
  /** Text shown when the icon is clicked. */
  note: string;
  /** Tooltip width in pixels. */
  width?: number;
}

/**
 * Click-to-open info icon used in the admin option tables. The popover is
 * rendered in a portal so table scroll containers never clip it.
 */
export default function NoteInfo({ note, width = 256 }: NoteInfoProps) {
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);

  useEffect(() => {
    if (!pos) return;
    const close = () => setPos(null);
    window.addEventListener('scroll', close, true);
    window.addEventListener('resize', close);
    return () => {
      window.removeEventListener('scroll', close, true);
      window.removeEventListener('resize', close);
    };
  }, [pos]);

  const toggle = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    if (pos) {
      setPos(null);
      return;
    }
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    setPos({
      left: Math.min(rect.right + 10, window.innerWidth - width - 12),
      top: Math.max(12, rect.top - 12),
    });
  };

  return (
    <span
      role="button"
      tabIndex={0}
      aria-label="Show note"
      onClick={toggle}
      onBlur={() => setPos(null)}
      className="inline-flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center"
    >
      <Info className="h-3.5 w-3.5 text-blue-500" />
      {pos && createPortal(
        <span
          className="pointer-events-none fixed z-[9999] rounded-lg bg-brand-navy-900 px-3 py-2 text-[11px] font-medium leading-4 text-white shadow-lg"
          style={{ left: pos.left, top: pos.top, width }}
        >
          {note}
        </span>,
        document.body,
      )}
    </span>
  );
}
