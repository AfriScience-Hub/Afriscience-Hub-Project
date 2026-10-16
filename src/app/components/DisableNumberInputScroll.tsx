'use client';

import { useEffect } from 'react';

/**
 * Native <input type="number"> elements change their value when the mouse
 * wheel scrolls over them while focused, which hijacks page scrolling.
 * This blurs the input on wheel so scrolling always scrolls the page.
 */
export function DisableNumberInputScroll() {
  useEffect(() => {
    const handler = (e: WheelEvent) => {
      const el = e.target as HTMLElement | null;
      if (el?.tagName === 'INPUT' && (el as HTMLInputElement).type === 'number') {
        (el as HTMLInputElement).blur();
      }
    };
    // Capture phase so it applies even when the input is not focused yet.
    window.addEventListener('wheel', handler, { passive: true, capture: true });
    return () => window.removeEventListener('wheel', handler, { capture: true });
  }, []);

  return null;
}
