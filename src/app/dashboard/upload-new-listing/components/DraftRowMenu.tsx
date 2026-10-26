'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Loader2, MoreVertical, PencilLine, Trash2 } from 'lucide-react';

interface DraftRowMenuProps {
  title: string;
  busy: boolean;
  onContinue: () => void;
  onDelete: () => void;
}

const MENU_WIDTH = 208;
const MENU_HEIGHT = 96;
const GAP = 8;
const EDGE = 8;

function positionFor(rect: DOMRect, height = MENU_HEIGHT, width = MENU_WIDTH) {
  const spaceBelow = window.innerHeight - rect.bottom;
  const openUp = spaceBelow < height + GAP && rect.top > height + GAP;
  const desiredTop = openUp ? rect.top - height - GAP : rect.bottom + GAP;
  const top = Math.min(Math.max(EDGE, desiredTop), window.innerHeight - height - EDGE);
  const left = Math.min(Math.max(EDGE, rect.right - width), window.innerWidth - width - EDGE);
  return { top, left };
}

/**
 * Row action menu for a draft. The dropdown is portalled to <body> and fixed
 * to the trigger so it is never clipped by the scroll container, and it flips
 * above the button when there is not enough room below.
 */
export default function DraftRowMenu({ title, busy, onContinue, onDelete }: DraftRowMenuProps) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    if (!open && buttonRef.current) {
      setPosition(positionFor(buttonRef.current.getBoundingClientRect()));
    }
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!open) return;

    const place = () => {
      const button = buttonRef.current;
      if (!button) return;
      const rect = button.getBoundingClientRect();
      setPosition(positionFor(rect, menuRef.current?.offsetHeight, menuRef.current?.offsetWidth));
    };

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (buttonRef.current?.contains(target) || menuRef.current?.contains(target)) return;
      setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    // Measure the real menu height on the first frame, then keep it anchored
    // while the page or an inner container scrolls.
    const frame = window.requestAnimationFrame(place);
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('scroll', place, true);
    window.addEventListener('resize', place);

    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('scroll', place, true);
      window.removeEventListener('resize', place);
    };
  }, [open]);

  const runAndClose = (action: () => void) => {
    setOpen(false);
    action();
  };

  return (
    <div className="relative flex justify-end">
      <button
        ref={buttonRef}
        type="button"
        disabled={busy}
        onClick={toggle}
        aria-label={`Actions for ${title}`}
        aria-haspopup="menu"
        aria-expanded={open}
        className="cursor-pointer rounded-lg border border-neutral-gray-light p-2 text-neutral-gray-dark transition-colors hover:bg-white disabled:opacity-40"
      >
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <MoreVertical className="h-4 w-4" />}
      </button>

      {open && position && createPortal(
        <div
          ref={menuRef}
          role="menu"
          style={{ position: 'fixed', top: position.top, left: position.left }}
          className="z-[120] w-52 overflow-hidden rounded-xl border border-neutral-gray-light bg-white py-1 shadow-xl"
        >
          <button
            type="button"
            role="menuitem"
            onClick={() => runAndClose(onContinue)}
            className="flex w-full cursor-pointer items-center gap-2 px-4 py-2.5 text-left text-sm text-neutral-gray-dark transition-colors hover:bg-neutral-bg-light"
          >
            <PencilLine className="h-4 w-4 text-brand-red-600" /> Continue submission
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={() => runAndClose(onDelete)}
            className="flex w-full cursor-pointer items-center gap-2 px-4 py-2.5 text-left text-sm text-red-600 transition-colors hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" /> Delete draft
          </button>
        </div>,
        document.body
      )}
    </div>
  );
}
