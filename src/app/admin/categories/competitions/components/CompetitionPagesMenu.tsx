'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { createPortal } from 'react-dom';
import { usePathname } from 'next/navigation';
import { MoreHorizontal, Trophy, CheckCircle } from 'lucide-react';
import { COMPETITION_PAGES } from '../data';

const PAGE_ICONS: Record<string, React.ElementType> = {
  manage: Trophy,
  submissions: CheckCircle,
};

const MENU_WIDTH = 240; // w-60
const ITEM_HEIGHT = 44; // per-item estimate used for the flip-up check
const EDGE_GAP = 8;

/**
 * The ⋮ (kebab) menu on the Competitions overview page.
 * Opens a dropdown listing every connected competition sub-page.
 *
 * The panel is portaled to document.body with fixed positioning and is
 * clamped to the viewport on both edges, so it stays fully visible whether
 * the trigger sits on the right of the header (desktop) or wrapped to the
 * left on a second row (mobile).
 */
export default function CompetitionPagesMenu() {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const updatePosition = useCallback(() => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const menuHeight = COMPETITION_PAGES.length * ITEM_HEIGHT + 8;

    // Prefer opening below the trigger; flip above when it would overflow.
    let top = rect.bottom + 6;
    if (top + menuHeight > window.innerHeight - EDGE_GAP) top = rect.top - menuHeight - 6;

    // Anchor to the trigger's right edge, then clamp inside the viewport so
    // the panel never opens off-screen to the left (mobile) or right.
    let left = rect.right - MENU_WIDTH;
    if (left < EDGE_GAP) left = EDGE_GAP;
    if (left + MENU_WIDTH > window.innerWidth - EDGE_GAP) left = window.innerWidth - MENU_WIDTH - EDGE_GAP;

    setPos({ top: Math.max(EDGE_GAP, top), left });
  }, []);

  useEffect(() => {
    if (!open) return;
    updatePosition();
    const handleOutside = (e: MouseEvent) => {
      if (menuRef.current?.contains(e.target as Node)) return;
      if (btnRef.current?.contains(e.target as Node)) return;
      setOpen(false);
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const handleClose = () => setOpen(false);
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleEscape);
    window.addEventListener('scroll', handleClose, true);
    window.addEventListener('resize', handleClose);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleEscape);
      window.removeEventListener('scroll', handleClose, true);
      window.removeEventListener('resize', handleClose);
    };
  }, [open, updatePosition]);

  return (
    <>
      <button
        ref={btnRef}
        onClick={() => setOpen(!open)}
        aria-label="Competition pages menu"
        aria-expanded={open}
        className="p-2 rounded-lg border border-neutral-gray-light bg-white hover:bg-neutral-bg-light cursor-pointer"
      >
        <MoreHorizontal className="h-4 w-4 text-neutral-gray-medium" />
      </button>
      {open &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={menuRef}
            style={{ position: 'fixed', top: pos.top, left: pos.left, width: MENU_WIDTH }}
            className="bg-white border border-neutral-gray-light rounded-lg shadow-lg py-1 z-50"
          >
            {COMPETITION_PAGES.map((page) => {
              const Icon = PAGE_ICONS[page.icon] || Trophy;
              const isActive = pathname === page.href;
              return (
                <Link
                  key={page.label}
                  href={page.href}
                  onClick={() => setOpen(false)}
                  className={`w-full flex items-start gap-2.5 px-3 py-2 hover:bg-neutral-bg-light cursor-pointer text-left ${isActive ? 'bg-neutral-bg-light' : ''}`}
                >
                  <div className="p-1.5 rounded-lg bg-purple-50 mt-0.5">
                    <Icon className="h-3.5 w-3.5 text-purple-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-medium text-neutral-black">{page.label}</p>
                    <p className="text-[9px] text-neutral-gray-medium">{page.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>,
          document.body
        )}
    </>
  );
}
