'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, Info } from 'lucide-react';

function OptionInfo({ text }: { text: string }) {
  const [tooltipPosition, setTooltipPosition] = useState<{ left: number; top: number } | null>(
    null
  );

  const showTooltip = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const tooltipWidth = 224;
    const tooltipGap = 10;
    const viewportPadding = 12;

    setTooltipPosition({
      left: Math.min(
        rect.right + tooltipGap,
        window.innerWidth - tooltipWidth - viewportPadding
      ),
      top: Math.max(viewportPadding, rect.top - 10),
    });
  };

  return (
    <span
      className="inline-flex cursor-help items-center"
      onMouseEnter={(event) => showTooltip(event.currentTarget)}
      onMouseLeave={() => setTooltipPosition(null)}
      onFocus={(event) => showTooltip(event.currentTarget)}
      onBlur={() => setTooltipPosition(null)}
      tabIndex={0}
    >
      <Info size={13} className="text-gray-400" />
      {tooltipPosition
        ? createPortal(
            <span
              className="pointer-events-none fixed z-9999 w-56 rounded-md bg-[#1f2a3d] px-3 py-2 text-left text-[10px] font-medium leading-4 text-white shadow-lg"
              style={{
                left: tooltipPosition.left,
                top: tooltipPosition.top,
              }}
            >
              {text}
            </span>,
            document.body
          )
        : null}
    </span>
  );
}

export function MultiSelectDropdown({
  label,
  placeholder,
  options,
  maxSelections,
  required,
  tooltips,
}: {
  label: string;
  placeholder: string;
  options: string[];
  maxSelections: number;
  required?: boolean;
  tooltips?: Record<string, string>;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const toggleOption = (option: string) => {
    setSelected((current) => {
      if (current.includes(option)) {
        return current.filter((item) => item !== option);
      }

      if (current.length >= maxSelections) {
        return current;
      }

      return [...current, option];
    });
  };

  return (
    <div>
      <label className="mb-2 block text-[11px] font-semibold text-gray-700 lg:text-xs">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex min-h-10 w-full cursor-pointer items-center justify-between gap-3 rounded-md border border-gray-200 bg-white px-3 py-2 text-left text-xs text-black outline-none"
      >
        <span className={selected.length ? 'text-black' : 'text-gray-400'}>
          {selected.length ? selected.join(', ') : placeholder}
        </span>
        <ChevronDown
          size={14}
          className={`shrink-0 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <p className="mt-1 text-[10px] text-gray-400">
        {selected.length}/{maxSelections} selected
      </p>

      {open ? (
        <div className="mt-2 max-h-60 overflow-y-auto rounded-md border border-gray-200 bg-white p-2 shadow-sm">
          {options.map((option) => {
            const checked = selected.includes(option);
            const disabled = !checked && selected.length >= maxSelections;

            return (
              <label
                key={option}
                className={`flex cursor-pointer items-center justify-between gap-3 rounded-md px-2 py-2 text-xs ${
                  disabled ? 'text-gray-300' : 'text-gray-700 hover:bg-red-50'
                }`}
              >
                <span className="flex min-w-0 items-center gap-2">
                  <input
                    type="checkbox"
                    checked={checked}
                    disabled={disabled}
                    onChange={() => toggleOption(option)}
                    className="h-3 w-3 rounded accent-red-500"
                  />
                  <span>{option}</span>
                </span>
                {tooltips?.[option] ? <OptionInfo text={tooltips[option]} /> : null}
              </label>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export function SingleSelectDropdown({
  label,
  placeholder,
  options,
  required,
  tooltips,
}: {
  label: string;
  placeholder: string;
  options: string[];
  required?: boolean;
  tooltips?: Record<string, string>;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('');

  return (
    <div>
      <label className="mb-2 block text-[11px] font-semibold text-gray-700 lg:text-xs">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex h-10 w-full cursor-pointer items-center justify-between gap-3 rounded-md border border-gray-200 bg-white px-3 text-left text-xs text-black outline-none"
      >
        <span className={selected ? 'text-black' : 'text-gray-400'}>
          {selected || placeholder}
        </span>
        <ChevronDown
          size={14}
          className={`shrink-0 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open ? (
        <div className="mt-2 max-h-60 overflow-y-auto rounded-md border border-gray-200 bg-white p-2 shadow-sm">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                setSelected(option);
                setOpen(false);
              }}
              className={`flex w-full cursor-pointer items-center justify-between gap-3 rounded-md px-2 py-2 text-left text-xs hover:bg-red-50 ${
                selected === option ? 'font-semibold text-red-600' : 'text-gray-700'
              }`}
            >
              <span>{option}</span>
              {tooltips?.[option] ? <OptionInfo text={tooltips[option]} /> : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
