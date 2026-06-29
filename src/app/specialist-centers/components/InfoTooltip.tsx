'use client';

import { useState, useRef, useEffect } from 'react';
import { Info } from 'lucide-react';
import { createPortal } from 'react-dom';

interface InfoTooltipProps {
  text: string;
}

export default function InfoTooltip({ text }: InfoTooltipProps) {
  const [show, setShow] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!show) return;
    const onScroll = () => setShow(false);
    window.addEventListener('scroll', onScroll, true);
    return () => window.removeEventListener('scroll', onScroll, true);
  }, [show]);

  const toggle = () => {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setCoords({ top: rect.top - 8, left: rect.left + rect.width / 2 });
    }
    setShow(v => !v);
  };

  return (
    <span className="relative inline-flex">
      <button
        ref={btnRef}
        type="button"
        className="text-blue-400 hover:text-blue-600 transition-colors"
        onClick={toggle}
        onBlur={() => setShow(false)}
      >
        <Info className="h-3 w-3" />
      </button>
      {show && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed z-[9999] px-2.5 py-1.5 rounded-lg bg-brand-navy-900 text-white text-[10px] leading-tight whitespace-nowrap shadow-lg pointer-events-none"
          style={{ top: coords.top, left: coords.left, transform: 'translate(-50%, -100%)' }}
        >
          {text}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-brand-navy-900" />
        </div>,
        document.body
      )}
    </span>
  );
}
