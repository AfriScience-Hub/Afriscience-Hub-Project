'use client';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { MoreHorizontal } from 'lucide-react';

export interface MenuItem {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  danger?: boolean;
}

export default function TableActionMenu({ items, triggerIcon }: { items: MenuItem[]; triggerIcon?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const updatePosition = () => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const menuWidth = 176;
    const menuHeight = items.length * 36 + 8;
    let top = rect.bottom + 6;
    let left = rect.right - menuWidth;
    // flip upward if off-screen bottom
    if (top + menuHeight > window.innerHeight) top = rect.top - menuHeight - 6;
    if (left < 8) left = 8;
    if (top < 8) top = 8;
    setPos({ top, left });
  };

  useEffect(() => {
    if (!open) return;
    updatePosition();
    const onDown = (e: MouseEvent) => {
      if (btnRef.current?.contains(e.target as Node)) return;
      if (menuRef.current?.contains(e.target as Node)) return;
      setOpen(false);
    };
    const onScroll = () => setOpen(false);
    document.addEventListener('mousedown', onDown);
    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', onScroll);
    return () => {
      document.removeEventListener('mousedown', onDown);
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', onScroll);
    };
  }, [open, items.length]);

  return (
    <>
      <button
        ref={btnRef}
        onClick={(e) => { e.stopPropagation(); updatePosition(); setOpen((v) => !v); }}
        className="p-1.5 rounded-lg hover:bg-neutral-bg-light cursor-pointer border border-transparent hover:border-neutral-gray-light"
      >
        {triggerIcon || <MoreHorizontal className="h-4 w-4 text-neutral-gray-dark" />}
      </button>
      {open && typeof document !== 'undefined' && createPortal(
        <div
          ref={menuRef}
          style={{ top: pos.top, left: pos.left }}
          className="fixed w-44 bg-white rounded-xl border border-neutral-gray-light shadow-xl py-1 z-[9999]"
        >
          {items.map((it, i) => (
            <button
              key={i}
              onClick={() => { setOpen(false); it.onClick(); }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-xs text-left hover:bg-neutral-bg-light cursor-pointer ${it.danger ? 'text-red-600 hover:bg-red-50' : 'text-neutral-black'}`}
            >
              {it.icon}<span>{it.label}</span>
            </button>
          ))}
        </div>,
        document.body
      )}
    </>
  );
}
