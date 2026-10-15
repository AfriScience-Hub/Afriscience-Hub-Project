'use client';

import React, { useState } from 'react';
import { GripVertical, Trash2, Plus } from 'lucide-react';
import CollapsibleSection from './CollapsibleSection';

interface ListSectionProps {
  number: number;
  title: string;
  subtitle: string;
  items: string[];
  onChange: (items: string[]) => void;
  /** Label for the add button shown below the list */
  addLabel: string;
  /** Input placeholder */
  placeholder: string;
}

/**
 * Numbered list section (Registration Requirements, Rules and
 * Guidelines, Screening and Selection, Judging Criteria): one input per
 * row with a drag handle, a delete button and an add button below.
 */
export default function ListSection({ number, title, subtitle, items, onChange, addLabel, placeholder }: ListSectionProps) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  const update = (index: number, text: string) =>
    onChange(items.map((item, i) => (i === index ? text : item)));

  const add = () => onChange([...items, '']);
  const remove = (index: number) => onChange(items.filter((_, i) => i !== index));

  const handleDrop = (targetIndex: number) => {
    if (dragIndex === null || dragIndex === targetIndex) return;
    const next = [...items];
    const [moved] = next.splice(dragIndex, 1);
    next.splice(targetIndex, 0, moved);
    onChange(next);
  };

  return (
    <CollapsibleSection number={number} title={title} subtitle={subtitle}>
      {items.length === 0 ? (
        <p className="text-xs text-neutral-gray-medium mb-3">Nothing here yet — add your first point below.</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li
              key={index}
              draggable={dragIndex === index}
              onDragStart={() => setDragIndex(index)}
              onDragEnd={() => { setDragIndex(null); setOverIndex(null); }}
              onDragOver={(e) => { e.preventDefault(); setOverIndex(index); }}
              onDrop={(e) => { e.preventDefault(); handleDrop(index); setOverIndex(null); }}
              className={`flex items-center gap-2 rounded-lg ${overIndex === index && dragIndex !== index ? 'ring-1 ring-[#453DD8]/40' : ''}`}
            >
              <span
                onMouseDown={() => setDragIndex(index)}
                className="text-neutral-gray-light hover:text-neutral-gray-medium cursor-grab flex-shrink-0"
                aria-hidden="true"
              >
                <GripVertical className="h-4 w-4" />
              </span>
              <input
                type="text"
                value={item}
                onChange={(e) => update(index, e.target.value)}
                placeholder={placeholder}
                className="flex-1 min-w-0 px-3 py-2 text-xs text-neutral-black rounded-lg border border-neutral-gray-light bg-white outline-none focus:border-[#453DD8]"
              />
              <button
                type="button"
                onClick={() => remove(index)}
                aria-label={`Remove item ${index + 1}`}
                className="h-8 w-8 rounded-lg grid place-items-center text-brand-red-600 hover:bg-brand-red-100/50 cursor-pointer flex-shrink-0"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}
      <button
        type="button"
        onClick={add}
        className="mt-3 flex items-center gap-1.5 px-3 py-1.5 border border-[#453DD8]/40 bg-white rounded-lg text-xs font-medium text-[#453DD8] hover:bg-[#453DD8]/5 cursor-pointer"
      >
        <Plus className="h-3.5 w-3.5" /> {addLabel}
      </button>
    </CollapsibleSection>
  );
}
