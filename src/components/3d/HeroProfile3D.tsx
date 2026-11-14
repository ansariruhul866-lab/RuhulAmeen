'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { playHoverSound } from '@/lib/sound';

export function HeroProfile3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -10;
    const rotY = ((x - centerX) / centerX) * 12;

    setRotateX(rotX);
    setRotateY(rotY);

    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.35,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={playHoverSound}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[420px] mx-auto select-none py-4 [perspective:1200px]"
    >
      {/* Ambient Radial Backlight Glow */}
      <div
        className="absolute -inset-4 bg-gradient-to-tr from-[var(--accent,#E5262B)]/30 via-indigo-600/10 to-transparent rounded-[44px] blur-3xl opacity-70 transition-transform duration-300 -z-10 pointer-events-none"
        style={{
          transform: `translate3d(${rotateY * 1.5}px, ${-rotateX * 1.5}px, -20px)`,
        }}
      />

      {/* Main Framed Glass Panel */}
      <div
        className="relative rounded-[32px] p-2.5 bg-gradient-to-b from-white/15 via-white/[0.03] to-neutral-950/90 border border-white/15 shadow-2xl backdrop-blur-2xl transition-transform duration-150 ease-out overflow-hidden"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Holographic Specular Glare Reflection */}
        <div
          className="absolute inset-0 rounded-[32px] pointer-events-none transition-opacity duration-300 z-40"
          style={{
            background: `radial-gradient(circle 280px at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,${glarePos.opacity}) 0%, transparent 80%)`,
          }}
        />

        {/* Inner Canvas Container */}
        <div className="relative aspect-[3/4] w-full rounded-[26px] overflow-hidden bg-gradient-to-b from-[#111116] via-[#0c0c10] to-[#070709] border border-black/40">
          {/* Subtle Grid & Bokeh Particles in frame */}
          <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
          <div className="absolute top-8 right-8 w-32 h-32 rounded-full bg-[var(--accent,#E5262B)]/15 blur-2xl pointer-events-none" />

          {/* ACCENT-COLORED GEOMETRIC SHARDS (X-CUT) - Underneath cutout for backdrop depth */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-75"
            viewBox="0 0 100 133"
            preserveAspectRatio="none"
          >
            {/* Diagonal Slash 1 (Top-Left to Bottom-Right) */}
            <polygon
              points="0,15 85,133 100,133 15,0 0,0"
              fill="var(--accent, #E5262B)"
              opacity="0.22"
            />
            <line
              x1="0"
              y1="10"
              x2="90"
              y2="133"
              stroke="var(--accent, #E5262B)"
              strokeWidth="0.8"
              opacity="0.6"
            />

            {/* Diagonal Slash 2 (Top-Right to Bottom-Left) - Completing the X-Cut */}
            <polygon
              points="85,0 100,0 15,133 0,133"
              fill="var(--accent, #E5262B)"
              opacity="0.18"
            />
            <line
              x1="95"
              y1="0"
              x2="5"
              y2="133"
              stroke="#ffffff"
              strokeWidth="0.5"
              opacity="0.4"
            />
          </svg>

          {/* BACKGROUND-REMOVED CUTOUT PHOTO OF RUHUL AMEEN */}
          <div
            className="absolute inset-0 z-20 flex items-end justify-center transition-transform duration-300"
            style={{
              transform: `translate3d(${rotateY * 0.8}px, ${-rotateX * 0.8}px, 35px)`,
            }}
          >
            <Image
              src="/images/profile-cutout.png"
              alt="Ruhul Ameen — Cutout Portrait"
              fill
              sizes="(max-width: 768px) 100vw, 420px"
              priority
              className="object-contain object-bottom filter contrast-[1.05] brightness-[1.02] drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)]"
            />
          </div>

          {/* ACCENT-COLORED GEOMETRIC SHARDS (X-CUT FOREGROUND OVERLAY) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-30"
            viewBox="0 0 100 133"
            preserveAspectRatio="none"
            style={{
              transform: `translate3d(${-rotateY * 0.6}px, ${rotateX * 0.6}px, 55px)`,
            }}
          >
            {/* Floating Glass Shard across lower torso */}
            <polygon
              points="10,118 70,80 95,92 35,130"
              fill="url(#accentShardGrad)"
              opacity="0.4"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="0.4"
            />
            {/* Counter-angle shard top right */}
            <polygon
              points="75,10 98,22 90,40 68,28"
              fill="var(--accent, #E5262B)"
              opacity="0.55"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="0.4"
            />
            <defs>
              <linearGradient id="accentShardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--accent, #E5262B)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>

          {/* Top Status Pill */}
          <div
            className="absolute top-4 left-4 z-40 flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-mono text-white shadow-xl"
            style={{ transform: 'translateZ(45px)' }}
          >
            <span className="w-2 h-2 rounded-full bg-[var(--accent,#E5262B)] animate-pulse" />
            <span className="font-bold tracking-wider uppercase">LUCKNOW // CREATIVE DEV</span>
          </div>

          {/* Bottom Framed Plaque */}
          <div
            className="absolute bottom-4 left-4 right-4 z-40 p-4 rounded-2xl bg-[#09090c]/85 backdrop-blur-xl border border-white/15 text-white space-y-1 shadow-2xl"
            style={{ transform: 'translateZ(50px)' }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black tracking-tight text-white font-display">
                  RUHUL AMEEN.
                </h3>
                <p className="text-[11px] font-mono text-[var(--accent,#E5262B)] font-bold">
                  Video Editor • Social Strategist • Dev
                </p>
              </div>

              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white">
                <Sparkles className="w-3.5 h-3.5 text-[var(--accent,#E5262B)]" />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-neutral-400 border-t border-white/10">
              <span>B.Tech CSE (2025)</span>
              <span className="text-white font-bold">50+ Reels • 18+ Thumbs</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
