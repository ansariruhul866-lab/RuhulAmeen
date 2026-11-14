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
    }, 450);
  }, []);

  useEffect(() => {
    // Check if already viewed in this browsing session
    try {
      if (sessionStorage.getItem('ruhul_preloader_shown') === 'true') {
        setVisible(false);
        return;
      }
    } catch {
      // Ignore storage errors
    }

    // Smooth counter from 0 to 100 over ~1.8 seconds
    const duration = 1800;
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      const currentCount = Math.floor(eased * 100);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setTimeout(dismiss, 200);
      }
    };

    const animId = requestAnimationFrame(updateCounter);

    // Escape or any key / click skips preloader immediately
    const handleKeyDown = () => dismiss();
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dismiss]);

  if (!visible) return null;

  return (
    <div
      onClick={dismiss}
      role="status"
      aria-live="polite"
      className={`fixed inset-0 z-[100] flex flex-col justify-between p-8 md:p-16 bg-[#0A0A0B] text-white transition-opacity duration-500 cursor-pointer ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-neutral-500">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--accent,#E5262B)] animate-pulse" />
          <span className="text-white font-display font-bold">RUHUL AMEEN.</span>
        </div>
        <span>SYSTEM LOADING</span>
      </div>

      {/* Center Cinematic Message */}
      <div className="max-w-2xl space-y-4">
        <div className="text-3xl sm:text-5xl md:text-6xl font-display font-black tracking-tighter leading-none">
          ENGINEERING{' '}
          <span className="text-[var(--accent,#E5262B)] accent-text-glow">
            ATTENTION
          </span>
          <br />
          &amp; CODE.
        </div>
        <p className="text-xs sm:text-sm font-mono text-neutral-400 tracking-wider">
          Social Media Management • 4K Video Retention • Next.js 3D Apps
        </p>
      </div>

      {/* Bottom Counter & Skip Cue */}
      <div className="space-y-4">
        {/* Progress bar line */}
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--accent,#E5262B)] transition-all duration-75 shadow-lg shadow-[var(--accent-glow)]"
            style={{ width: `${count}%` }}
          />
        </div>

        <div className="flex items-center justify-between font-mono text-xs">
          <div className="flex items-baseline gap-1 text-2xl sm:text-4xl font-black font-display text-white">
            <span>{count}</span>
            <span className="text-sm font-normal text-[var(--accent,#E5262B)]">%</span>
          </div>

          <div className="text-[11px] text-neutral-500 tracking-wider uppercase">
            Click anywhere or press [ESC] to skip
          </div>
        </div>
      </div>
    </div>
  );
}
