'use client';

import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, MoreHorizontal } from 'lucide-react';

interface LedgerActionMenuProps {
  canSettle: boolean;
  onSettle: () => void;
}

const MENU_WIDTH = 144;
const MENU_HEIGHT = 38;

/** Row action menu for the invoice ledger. */
export default function LedgerActionMenu({ canSettle, onSettle }: LedgerActionMenuProps) {
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const close = () => setPosition(null);

  useEffect(() => {
    if (!position) return;

    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) close();
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };

    document.addEventListener('mousedown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    window.addEventListener('resize', close);
    window.addEventListener('scroll', close, true);
    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
      window.removeEventListener('resize', close);
      window.removeEventListener('scroll', close, true);
    };
  }, [position]);

  const toggle = () => {
    if (position) {
      close();
      return;
    }
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const opensUp = rect.bottom + 4 + MENU_HEIGHT > window.innerHeight;
    setPosition({
      top: opensUp ? rect.top - MENU_HEIGHT - 4 : rect.bottom + 4,
      left: Math.max(8, Math.min(rect.right - MENU_WIDTH, window.innerWidth - MENU_WIDTH - 8)),
    });
  };

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={!!position}
        aria-label="Ledger actions"
        onClick={toggle}
        className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-neutral-gray-light bg-white text-neutral-gray-dark hover:bg-neutral-bg-light cursor-pointer"
      >
        <MoreHorizontal className="h-3.5 w-3.5" />
      </button>

      {position && (
        <div
          role="menu"
          className="fixed z-[80] overflow-hidden rounded-lg border border-neutral-gray-light bg-white shadow-lg"
          style={{ top: position.top, left: position.left, width: MENU_WIDTH }}
        >
          <button
            type="button"
            role="menuitem"
            disabled={!canSettle}
            onClick={() => {
              close();
              if (canSettle) onSettle();
            }}
            className="flex w-full items-center gap-2 px-3 py-2 text-left text-[11px] font-semibold text-neutral-black hover:bg-neutral-bg-light cursor-pointer disabled:cursor-not-allowed disabled:text-neutral-gray-light disabled:hover:bg-white"
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            Settle
          </button>
        </div>
      )}
    </div>
  );
}
