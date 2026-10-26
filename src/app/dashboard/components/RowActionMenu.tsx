'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { MoreVertical } from 'lucide-react';

export interface RowActionItem {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
}

interface RowActionMenuProps {
  items: RowActionItem[];
  label?: string;
}

/**
 * Compact action dropdown for the user-side listings/submissions tables.
 * Rendered in a portal so the table's horizontal scroll container cannot clip it.
 */
export default function RowActionMenu({ items, label = 'Row actions' }: RowActionMenuProps) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const updatePosition = () => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const menuWidth = 160;
    const menuHeight = items.length * 36 + 8;
    let top = rect.bottom + 6;
    let left = rect.right - menuWidth;
    if (top + menuHeight > window.innerHeight) top = rect.top - menuHeight - 6;
    if (left < 8) left = 8;
    if (top < 8) top = 8;
    setPos({ top, left });
  };

  useEffect(() => {
    if (!open) return;
    updatePosition();
    const onDown = (event: MouseEvent) => {
      if (btnRef.current?.contains(event.target as Node)) return;
      if (menuRef.current?.contains(event.target as Node)) return;
      setOpen(false);
    };
    const close = () => setOpen(false);
    document.addEventListener('mousedown', onDown);
    window.addEventListener('scroll', close, true);
    window.addEventListener('resize', close);
    return () => {
      document.removeEventListener('mousedown', onDown);
      window.removeEventListener('scroll', close, true);
      window.removeEventListener('resize', close);
    };
  }, [open, items.length]);

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={(event) => {
          event.stopPropagation();
          updatePosition();
          setOpen((value) => !value);
        }}
        className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-transparent text-neutral-gray-dark transition-colors hover:border-brand-red-100 hover:bg-brand-red-50 hover:text-brand-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red-200"
      >
        <MoreVertical className="h-4 w-4" />
      </button>

      {open &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={menuRef}
            role="menu"
            style={{ top: pos.top, left: pos.left }}
            className="fixed z-[9999] w-40 rounded-xl border border-neutral-gray-light bg-white py-1 shadow-xl"
          >
            {items.map((item) => (
              <button
                key={item.label}
                type="button"
                role="menuitem"
                onClick={() => {
                  setOpen(false);
                  item.onClick();
                }}
                className="flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-left text-xs font-medium text-neutral-black transition-colors hover:bg-brand-red-50 hover:text-brand-red-700"
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>,
          document.body
        )}
    </>
  );
}
