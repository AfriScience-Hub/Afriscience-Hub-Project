'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { isValidLink } from '../data';

interface LinkInputProps {
  value: string;
  onChange: (value: string) => void;
  id?: string;
  label?: string;
  placeholder?: string;
  /** Icon shown in the box to the left of the input */
  leading?: React.ReactNode;
  /** Classes for the leading icon box (color/brand styling) */
  leadingCls?: string;
}

/**
 * Link field with a leading icon box. The format error only appears once
 * the user has typed something and it is not a valid http(s) URL.
 */
export default function LinkInput({ value, onChange, id, label, placeholder, leading, leadingCls }: LinkInputProps) {
  const invalid = value.trim() !== '' && !isValidLink(value);

  return (
    <div>
      {label && (
        <label htmlFor={id} className="text-xs font-medium text-neutral-black block mb-1.5">
          {label}
        </label>
      )}
      <div className="flex items-center gap-2">
        {leading && (
          <span
            className={cn(
              'w-9 h-9 rounded-lg border border-neutral-gray-light grid place-items-center flex-shrink-0 bg-white',
              leadingCls
            )}
            aria-hidden="true"
          >
            {leading}
          </span>
        )}
        <input
          id={id}
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            'flex-1 min-w-0 px-3 py-2 text-xs text-neutral-black rounded-lg border bg-white outline-none',
            invalid ? 'border-brand-red-600' : 'border-neutral-gray-light focus:border-[#453DD8]'
          )}
        />
      </div>
      {invalid && (
        <p className="text-[11px] text-brand-red-600 mt-1">Enter a valid link (e.g. https://example.com).</p>
      )}
    </div>
  );
}
