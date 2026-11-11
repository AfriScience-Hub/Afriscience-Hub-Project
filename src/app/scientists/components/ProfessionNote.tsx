'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Info } from 'lucide-react';

interface ProfessionNoteProps {
  note: string;
}

/** Click-to-open info icon for profession notes in the public filter sidebar. */
export default function ProfessionNote({ note }: ProfessionNoteProps) {
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
      left: Math.min(rect.right + 8, window.innerWidth - 236 - 12),
      top: Math.max(12, rect.top - 8),
    });
  };

  return (
    <span
      role="button"
      tabIndex={0}
      aria-label="Profession note"
      onClick={toggle}
      onBlur={() => setPos(null)}
      className="inline-flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center"
    >
      <Info className="h-3.5 w-3.5 text-blue-400" />
      {pos && createPortal(
        <span
          className="pointer-events-none fixed z-[9999] w-56 rounded-lg bg-brand-navy-900 px-3 py-2 text-left text-[10px] font-medium leading-4 text-white shadow-lg"
          style={{ left: pos.left, top: pos.top }}
        >
          {note}
        </span>,
        document.body,
      )}
    </span>
  );
}
