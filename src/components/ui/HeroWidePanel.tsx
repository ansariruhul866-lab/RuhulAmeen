'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, RotateCcw } from 'lucide-react';
import { playClickSound, playHoverSound } from '@/lib/sound';
import { HeroSmokeCanvas } from './HeroSmokeCanvas';
import { HeroGlassShatter } from './HeroGlassShatter';

export function HeroWidePanel() {
  const panelRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotX: 0, rotY: 0, mouseX: 50, mouseY: 50 });

  // Animation timeline state
  const [animKey, setAnimKey] = useState(0);
  const [smokeActive, setSmokeActive] = useState(true);
  const [shatterProgress, setShatterProgress] = useState(0); // 0 = scattered, 1 = assembled
  const [seamFlash, setSeamFlash] = useState(0); // 1 = bright flash, 0 = dissolved

  // Trigger the cinematic smoke-to-fixed-glass sequence
  const startSequence = useCallback(() => {
    setSmokeActive(true);
    setShatterProgress(0);
    setSeamFlash(0);

    const startTime = performance.now();
    let frameId: number;

    const animate = (now: number) => {
      const elapsed = now - startTime;

      // 0ms - 550ms: Pure smoke billowing, shards scattered at progress 0
      // 550ms - 1750ms: Magnetic reverse shatter / broken glass gets fixed (progress 0 -> 1)
      if (elapsed < 550) {
        setShatterProgress(0);
      } else if (elapsed < 1750) {
        const p = (elapsed - 550) / 1200;
        setShatterProgress(p);
      } else {
        setShatterProgress(1);
      }

      // 1700ms - 2250ms: Seam weld energy flash sweeps and dissolves
      if (elapsed >= 1700 && elapsed < 2250) {
        const flashProgress = (elapsed - 1700) / 550;
        const flash = flashProgress < 0.25 ? flashProgress / 0.25 : 1 - (flashProgress - 0.25) / 0.75;
        setSeamFlash(flash);
      } else if (elapsed >= 2250) {
        setSeamFlash(0);
      }

      if (elapsed < 2400) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    // Check prefers-reduced-motion
    if (typeof window !== 'undefined') {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mq.matches) {
        setSmokeActive(false);
        setShatterProgress(1);
        setSeamFlash(0);
        return;
      }
    }

    const cleanup = startSequence();
    return () => cleanup?.();
  }, [animKey, startSequence]);

  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClickSound();
    setAnimKey((prev) => prev + 1);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -4;
    const rotY = ((x - centerX) / centerX) * 5;

    setTilt({
      rotX,
      rotY,
      mouseX: (x / rect.width) * 100,
      mouseY: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotX: 0, rotY: 0, mouseX: 50, mouseY: 50 });
  };

  return (
    <div className="w-full max-w-full overflow-hidden flex items-center justify-center py-2 sm:py-6 [perspective:1400px]">
      {/* Ambient Soft Red Backlight Glow behind panel */}
      <div
        className="absolute w-[80%] max-w-4xl h-[320px] md:h-[420px] bg-[var(--accent,#E5262B)]/18 blur-[100px] rounded-full pointer-events-none -z-10 transition-transform duration-300"
        style={{
          transform: `translate3d(${tilt.rotY * 2}px, ${-tilt.rotX * 2}px, 0)`,
        }}
      />

      {/* ONE WIDE FRAMED GLASS PANEL */}
      <div
        ref={panelRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full max-w-6xl min-h-[560px] sm:min-h-[580px] lg:h-[620px] rounded-[28px] sm:rounded-[36px] md:rounded-[44px] border border-white/15 bg-gradient-to-b from-white/[0.08] via-neutral-950/90 to-[#0A0A0B]/98 backdrop-blur-2xl shadow-[0_30px_90px_rgba(0,0,0,0.85),0_0_60px_rgba(229,38,43,0.14)] overflow-hidden transition-transform duration-150 ease-out flex flex-col justify-between p-6 sm:p-10 md:p-16 select-none"
        style={{
          transform: `rotateX(${tilt.rotX}deg) rotateY(${tilt.rotY}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Soft Glare Highlight Tracking Cursor */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-30"
          style={{
            background: `radial-gradient(circle 420px at ${tilt.mouseX}% ${tilt.mouseY}%, rgba(255,255,255,0.09) 0%, transparent 75%)`,
          }}
        />

        {/* 1. CINEMATIC SMOKE CANVAS LAYER (first smoke billows and fades) */}
        <HeroSmokeCanvas
          key={`smoke-${animKey}`}
          active={smokeActive}
          onSmokeComplete={() => setSmokeActive(false)}
        />

        {/* 2. BROKEN GLASS GETS FIXED ANIMATION (shards assemble into place) */}
        <HeroGlassShatter
          progress={shatterProgress}
          seamFlash={seamFlash}
        />

        {/* 3. AMBIENT RED RIM LIGHTING BEHIND RUHUL (Atmospheric glow, NO red rectangles on image) */}
        <div
          className="absolute right-0 sm:right-12 md:right-24 bottom-0 w-[300px] sm:w-[480px] md:w-[560px] h-[340px] sm:h-[500px] pointer-events-none z-10 opacity-70 transition-opacity duration-700"
          style={{
            opacity: 0.3 + 0.5 * shatterProgress,
          }}
        >
          {/* Soft atmospheric radial gradient behind silhouette */}
          <div className="w-full h-full rounded-full bg-gradient-to-tr from-[var(--accent,#E5262B)]/35 via-[var(--accent,#E5262B)]/15 to-transparent blur-[80px]" />
        </div>

        {/* 4. RIGHT-CENTER: CLEAN CUTOUT PHOTO OF RUHUL AMEEN (Completely unobstructed, no red rectangles!) */}
        <div
          className="absolute right-0 sm:right-4 md:right-12 lg:right-20 bottom-0 w-[200px] sm:w-[360px] md:w-[460px] lg:w-[520px] h-[58%] sm:h-[80%] md:h-[94%] pointer-events-none z-20 flex items-end justify-center transition-all duration-700"
          style={{
            transform: `translate3d(${tilt.rotY * 0.7}px, ${-tilt.rotX * 0.7}px, 20px) scale(${0.95 + 0.05 * shatterProgress})`,
            opacity: Math.max(0.15, Math.min(1, (shatterProgress - 0.2) / 0.8)),
            filter: `blur(${(1 - shatterProgress) * 4}px)`,
          }}
        >
          <div className="relative w-full h-full">
            <Image
              src="/images/profile-cutout.png"
              alt="Ruhul Ameen"
              fill
              sizes="(max-width: 768px) 210px, 520px"
              priority
              className="object-contain object-bottom filter contrast-[1.05] brightness-[1.02] drop-shadow-[0_25px_45px_rgba(0,0,0,0.95)]"
            />
          </div>
        </div>

        {/* 5. LEFT OVERLAY: NAME + ROLE + TWO BUTTONS */}
        <div
          className="relative z-30 max-w-sm sm:max-w-lg md:max-w-xl my-auto space-y-3 sm:space-y-6 pt-2 sm:pt-4 transition-all duration-700"
          style={{
            transform: `translate3d(${tilt.rotY * 0.4}px, ${-tilt.rotX * 0.4}px, 35px) translateY(${(1 - shatterProgress) * 16}px)`,
            opacity: Math.max(0.2, Math.min(1, (shatterProgress - 0.1) / 0.9)),
          }}
        >
          {/* Huge Name in Bold Uppercase Grotesque Display font */}
          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tight text-white leading-[0.94] drop-shadow-lg">
            RUHUL <br className="sm:hidden" />AMEEN
          </h1>

          {/* Role Line */}
          <p className="text-[10px] sm:text-xs md:text-sm font-mono uppercase tracking-widest text-neutral-300 font-semibold leading-relaxed drop-shadow max-w-[240px] sm:max-w-none">
            VIDEO EDITOR • THUMBNAIL DESIGNER • WEB DEVELOPER
          </p>

          {/* Two Clean Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 pt-1 sm:pt-2">
            <Link
              href="#work"
              onClick={playClickSound}
              onMouseEnter={playHoverSound}
              className="px-5 sm:px-8 py-2.5 sm:py-4 rounded-full bg-[var(--accent,#E5262B)] hover:bg-[var(--accent-hover,#ff3338)] text-white font-mono font-bold text-[11px] sm:text-xs uppercase tracking-wider transition-all hover:scale-105 shadow-xl shadow-[var(--accent,#E5262B)]/35 flex items-center gap-2"
            >
              <span>View my work</span>
              <ArrowUpRight className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            </Link>

            <Link
              href="#contact"
              onClick={playClickSound}
              onMouseEnter={playHoverSound}
              className="px-5 sm:px-8 py-2.5 sm:py-4 rounded-full border border-white/25 bg-black/40 hover:bg-white/10 hover:border-[var(--accent,#E5262B)] backdrop-blur-xl text-[11px] sm:text-xs font-mono font-medium text-white transition-all shadow-lg flex items-center gap-2"
            >
              <span>Get in touch</span>
              <ArrowUpRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[var(--accent,#E5262B)]" />
            </Link>
          </div>
        </div>

        {/* 6. BOTTOM BAR: FOOTER LABELS & REPLAY INTRO BUTTON */}
        <div className="relative z-30 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-neutral-500 pt-3 sm:pt-4 border-t border-white/5">
          <div className="flex items-center gap-3">
            <span>PORTFOLIO 2026</span>
            <button
              onClick={handleReplay}
              title="Replay cinematic glass animation"
              className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 hover:bg-white/10 hover:text-white text-neutral-400 transition-colors border border-white/5 text-[10px]"
            >
              <RotateCcw className="w-2.5 h-2.5" />
              <span>Replay Intro</span>
            </button>
          </div>
          <span className="text-[var(--accent,#E5262B)] font-medium">LUCKNOW, IN</span>
        </div>
      </div>
    </div>
  );
}
