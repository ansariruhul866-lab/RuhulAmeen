'use client';

import { useState, useEffect, useCallback } from 'react';

export function Preloader() {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  const dismiss = useCallback(() => {
    setFading(true);
    setTimeout(() => {
      setVisible(false);
      try {
        sessionStorage.setItem('ruhul_preloader_shown', 'true');
      } catch {
        // Storage might be restricted
      }
    }, 400);
  }, []);

  useEffect(() => {
    // Check if already viewed in this browsing session or testing with query param
    try {
      if (
        sessionStorage.getItem('ruhul_preloader_shown') === 'true' ||
        window.location.search.includes('nopreload=true')
      ) {
        setVisible(false);
        return;
      }
    } catch {
      // Ignore storage errors
    }

    // Smooth counter from 0 to 100 over ~1.6 seconds
    const duration = 1600;
    const startTime = performance.now();

    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) * (1 - progress);
      const currentCount = Math.floor(eased * 100);

      setCount(currentCount);

      if (progress >= 1) {
        clearInterval(interval);
        setTimeout(dismiss, 150);
      }
    }, 25);

    const handleKeyDown = () => dismiss();
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dismiss]);

  if (!visible) return null;

  return (
    <div
      onClick={dismiss}
      role="status"
      aria-live="polite"
      className={`fixed inset-0 z-[100] flex flex-col justify-between p-8 md:p-14 bg-[#0A0A0B] text-white transition-opacity duration-500 cursor-pointer ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Top-Left Huge Counter - Matching Reference Board Panel 1 */}
      <div className="flex items-start justify-between">
        <div className="flex items-baseline font-mono font-black text-5xl sm:text-7xl md:text-8xl tracking-tighter text-white">
          <span>{count}</span>
          <span className="text-2xl sm:text-4xl text-[var(--accent,#E5262B)] font-sans ml-1">%</span>
        </div>
        <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 pt-2 hidden sm:block">
          ESC / CLICK TO SKIP
        </div>
      </div>

      {/* Center Tagline with Accent Keyword - Exactly Matching Reference Board Panel 1 */}
      <div className="text-center px-4">
        <p className="font-mono text-xs sm:text-sm md:text-base uppercase tracking-[0.25em] text-neutral-200">
          EVERY CLICK DRIVES REAL{' '}
          <span className="text-[var(--accent,#E5262B)] font-bold accent-text-glow">
            GROWTH
          </span>
        </p>
      </div>

      {/* Bottom Subtle Progress Line */}
      <div className="w-full">
        <div className="w-full h-0.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--accent,#E5262B)] transition-all duration-75 shadow-lg shadow-[var(--accent-glow)]"
            style={{ width: `${count}%` }}
          />
        </div>
      </div>
    </div>
  );
}
