'use client';

import { useState, useEffect } from 'react';

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [label, setLabel] = useState<string | null>(null);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    // Check if device supports fine mouse pointer
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;
    
    // Defer enabling to after mount
    const timeout = setTimeout(() => setEnabled(true), 100);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const customLabel = target.closest('[data-cursor]')?.getAttribute('data-cursor');
      setLabel(customLabel || null);

      const isInteractive =
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        window.getComputedStyle(target).cursor === 'pointer';

      setIsPointer(isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none fixed z-50 transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div
        className={`flex items-center justify-center rounded-full transition-all duration-200 ${
          label
            ? 'w-16 h-16 bg-[var(--accent,#E5262B)] text-white text-[11px] font-mono font-bold uppercase tracking-wider shadow-lg shadow-[var(--accent-glow)]'
            : isPointer
            ? 'w-10 h-10 bg-[var(--accent,#E5262B)]/20 border border-[var(--accent,#E5262B)] backdrop-blur-[1px]'
            : 'w-4 h-4 bg-[var(--accent,#E5262B)]/85 rounded-full'
        }`}
      >
        {label && <span>{label}</span>}
      </div>
    </div>
  );
}
