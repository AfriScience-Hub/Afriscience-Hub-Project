'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface NumberInputProps {
  value: string;
  onChange: (value: string) => void;
  id?: string;
  placeholder?: string;
  ariaLabel?: string;
  className?: string;
  /** Red border when the typed amount is out of range */
  invalid?: boolean;
}

/** Keys that must keep working (navigation, editing shortcuts). */
const BLOCKED = /[a-zA-Z+\-.]/;

/**
 * Digits-only number input: letters, "+", "-", "." and the scroll wheel
 * cannot change the value (no typing letters, no scroll-to-increment).
 */
export default function NumberInput({ value, onChange, id, placeholder, ariaLabel, className, invalid }: NumberInputProps) {
  return (
    <input
      id={id}
      type="number"
      inputMode="numeric"
      value={value}
      placeholder={placeholder}
      aria-label={ariaLabel}
      onChange={(e) => onChange(e.target.value.replace(/\D/g, ''))}
      onKeyDown={(e) => {
        // Ctrl/Cmd shortcuts (copy/paste/select-all) stay available.
        if (e.ctrlKey || e.metaKey) return;
        if (BLOCKED.test(e.key)) e.preventDefault();
      }}
      onWheel={(e) => e.currentTarget.blur()}
      className={cn(
        'w-full px-3 py-2 text-xs text-neutral-black rounded-lg border bg-white outline-none',
        invalid ? 'border-brand-red-600' : 'border-neutral-gray-light focus:border-[#453DD8]',
        className
      )}
    />
  );
}
