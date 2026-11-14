'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { playClickSound, playHoverSound } from '@/lib/sound';

export function CinematicHeroPanel() {
  const panelRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6">
      {/* ONE WIDE FRAMED GLASS PANEL */}
      <div
        ref={panelRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setMousePos({ x: 0, y: 0 });
        }}
        className="relative w-full rounded-[24px] sm:rounded-[36px] border border-white/15 bg-gradient-to-b from-white/[0.06] via-[#0c0c10]/92 to-[#07070a]/95 backdrop-blur-2xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_40px_rgba(229,38,43,0.12)] min-h-[480px] sm:min-h-[560px] md:min-h-[600px] flex flex-col justify-end sm:justify-center transition-all duration-300"
      >
        {/* Subtle holographic border reflection on hover */}
        <div
          className="absolute inset-0 rounded-[24px] sm:rounded-[36px] pointer-events-none transition-opacity duration-300 z-30"
          style={{
            background: isHovered
              ? `radial-gradient(circle 500px at ${50 + mousePos.x * 60}% ${
                  50 + mousePos.y * 60
                }%, rgba(255,255,255,0.08) 0%, transparent 70%)`
              : 'none',
          }}
        />

        {/* ============================================================ */}
        {/* RIGHT-CENTER: RED X-SHAPED GEOMETRIC SHARDS + CUTOUT PHOTO   */}
        {/* ============================================================ */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Intense red ambient backlight centered on the subject */}
          <div
            className="absolute right-[0%] sm:right-[10%] md:right-[14%] top-1/2 -translate-y-1/2 w-[280px] sm:w-[460px] h-[280px] sm:h-[460px] rounded-full bg-gradient-to-tr from-[var(--accent,#E5262B)]/40 via-rose-600/25 to-transparent blur-[80px] sm:blur-[90px] pointer-events-none"
            style={{
              transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`,
            }}
          />

          {/* -------------------------------------------------------- */}
          {/* LAYER 1: BACKGROUND GEOMETRIC RED X SHARDS (Behind Photo) */}
          {/* -------------------------------------------------------- */}
          <svg
            className="absolute right-0 top-0 w-full sm:w-[85%] md:w-[70%] h-full pointer-events-none z-10"
            viewBox="0 0 700 620"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="bgShardGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--accent, #E5262B)" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#800a0e" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#1a0103" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="bgShardGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--accent, #E5262B)" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#990d12" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#150102" stopOpacity="0.1" />
              </linearGradient>
              <filter id="shardGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Stroke 1 of the "X" (Top-Right down to Bottom-Left) */}
            <polygon
              points="490,0 690,0 350,620 170,620"
              fill="url(#bgShardGrad1)"
              filter="url(#shardGlow)"
              opacity="0.88"
              style={{
                transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)`,
              }}
            />
            {/* Fine specular glowing edge on Stroke 1 */}
            <line
              x1="490"
              y1="0"
              x2="170"
              y2="620"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="1.2"
              opacity="0.75"
            />

            {/* Stroke 2 of the "X" (Top-Left down to Bottom-Right) */}
            <polygon
              points="190,0 370,0 660,620 500,620"
              fill="url(#bgShardGrad2)"
              opacity="0.75"
              style={{
                transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -15}px)`,
              }}
            />
            {/* Fine specular glowing edge on Stroke 2 */}
            <line
              x1="370"
              y1="0"
              x2="660"
              y2="620"
              stroke="var(--accent, #E5262B)"
              strokeWidth="1.5"
              opacity="0.85"
            />

            {/* Faceted glass facets on the periphery */}
            <polygon
              points="570,70 690,130 630,310 530,230"
              fill="var(--accent, #E5262B)"
              opacity="0.35"
            />
            <polygon
              points="210,360 310,420 250,580 150,520"
              fill="#500508"
              opacity="0.4"
            />
          </svg>

          {/* -------------------------------------------------------- */}
          {/* LAYER 2: RUHUL'S CUTOUT PHOTO                            */}
          {/* -------------------------------------------------------- */}
          <div
            className="absolute bottom-0 right-[-15px] sm:right-[8%] md:right-[12%] lg:right-[14%] h-[62%] sm:h-[86%] md:h-[94%] w-[185px] sm:w-[350px] md:w-[430px] z-15 flex items-end justify-center pointer-events-none transition-transform duration-200 ease-out"
            style={{
              transform: `translate3d(${mousePos.x * 12}px, ${mousePos.y * 8}px, 0)`,
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src="/images/profile-cutout.png"
                alt="Ruhul Ameen"
                fill
                priority
                sizes="(max-width: 640px) 185px, (max-width: 768px) 350px, 430px"
                className="object-contain object-bottom filter contrast-[1.05] brightness-[1.02] drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
              />
            </div>
          </div>

          {/* -------------------------------------------------------- */}
          {/* LAYER 3: FOREGROUND RED X GLASS SHARDS (Across Chest)    */}
          {/* -------------------------------------------------------- */}
          <svg
            className="absolute right-0 top-0 w-full sm:w-[85%] md:w-[70%] h-full pointer-events-none z-20"
            viewBox="0 0 700 620"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="fgShardGlass" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
                <stop offset="25%" stopColor="var(--accent, #E5262B)" stopOpacity="0.65" />
                <stop offset="75%" stopColor="#800a0e" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#150102" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Slicing across suit chest & lapel (BELOW BEARD/FACE) */}
            <polygon
              points="190,490 440,410 570,455 290,560"
              fill="url(#fgShardGlass)"
              opacity="0.75"
              style={{
                transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 10}px)`,
              }}
            />
            {/* Top specular reflection rim line of foreground shard */}
            <line
              x1="190"
              y1="490"
              x2="440"
              y2="410"
              stroke="#ffffff"
              strokeWidth="1.2"
              opacity="0.85"
            />
            <line
              x1="440"
              y1="410"
              x2="570"
              y2="455"
              stroke="var(--accent, #E5262B)"
              strokeWidth="1.5"
              opacity="0.9"
            />

            {/* Lower crossing facet across lower jacket */}
            <polygon
              points="340,540 500,470 590,510 420,590"
              fill="var(--accent, #E5262B)"
              opacity="0.32"
              style={{
                transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 8}px)`,
              }}
            />
            <line
              x1="340"
              y1="540"
              x2="500"
              y2="470"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="0.8"
              opacity="0.75"
            />
          </svg>
        </div>

        {/* ============================================================ */}
        {/* OVERLAID LEFT CONTENT: HUGE NAME, ROLE LINE, TWO BUTTONS     */}
        {/* ============================================================ */}
        <div className="relative z-30 px-5 sm:px-10 md:px-16 py-8 sm:py-14 md:py-16 max-w-[220px] sm:max-w-xl space-y-3.5 sm:space-y-6">
          {/* Huge Name - Matching Reference Board Panel 2 (SANTHOSH M) */}
          <div className="space-y-1 sm:space-y-2">
            <h1 className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-black tracking-tight text-white leading-[0.95] select-none">
              RUHUL AMEEN
            </h1>
            {/* Role line */}
            <p className="text-[10px] sm:text-sm font-mono uppercase tracking-widest text-neutral-400 font-medium">
              Video Editor &amp; Creative Developer
            </p>
          </div>

          {/* Two Buttons - Minimal & Clean */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 pt-1">
            <Link
              href="#work"
              onClick={playClickSound}
              onMouseEnter={playHoverSound}
              className="px-4 sm:px-8 py-2.5 sm:py-3.5 rounded-full bg-[var(--accent,#E5262B)] hover:bg-[var(--accent-hover,#ff3338)] text-white text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider transition-all hover:scale-105 shadow-xl shadow-[var(--accent,#E5262B)]/30 inline-flex items-center gap-1.5 sm:gap-2 whitespace-nowrap"
            >
              <span>View my work</span>
              <ArrowUpRight className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            </Link>

            <Link
              href="#contact"
              onClick={playClickSound}
              onMouseEnter={playHoverSound}
              className="px-4 sm:px-8 py-2.5 sm:py-3.5 rounded-full border border-white/20 bg-white/[0.04] hover:bg-white/10 text-white text-[10px] sm:text-xs font-mono font-medium hover:border-[var(--accent,#E5262B)] transition-all inline-flex items-center gap-1.5 sm:gap-2 whitespace-nowrap"
            >
              <span>Get in touch</span>
              <ArrowUpRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[var(--accent,#E5262B)]" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
