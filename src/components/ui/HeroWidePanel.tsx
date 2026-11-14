'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { playClickSound, playHoverSound } from '@/lib/sound';

export function HeroWidePanel() {
  const panelRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotX: 0, rotY: 0, mouseX: 50, mouseY: 50 });

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

      {/* ONE WIDE FRAMED GLASS PANEL (matches Reference Board Panel 2) */}
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

        {/* 1. BACKGROUND X-SHARD LAYER (Under Cutout Photo) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-85"
          viewBox="0 0 1000 600"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="bgShardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--accent, #E5262B)" stopOpacity="0.55" />
              <stop offset="50%" stopColor="var(--accent, #E5262B)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.7" />
            </linearGradient>
            <linearGradient id="edgeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
              <stop offset="50%" stopColor="var(--accent, #E5262B)" stopOpacity="0.85" />
              <stop offset="100%" stopColor="var(--accent, #E5262B)" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Diagonal Slash 1 (Top-Left to Bottom-Right across center-right) */}
          <polygon
            points="500,0 740,0 950,600 710,600"
            fill="url(#bgShardGrad)"
          />
          <line
            x1="500"
            y1="0"
            x2="710"
            y2="600"
            stroke="url(#edgeGlow)"
            strokeWidth="1.8"
            opacity="0.8"
          />
          <line
            x1="740"
            y1="0"
            x2="950"
            y2="600"
            stroke="var(--accent, #E5262B)"
            strokeWidth="1.2"
            opacity="0.5"
          />

          {/* Ambient red flare behind portrait */}
          <circle cx="740" cy="300" r="200" fill="var(--accent, #E5262B)" opacity="0.3" filter="blur(65px)" />
        </svg>

        {/* 2. RIGHT-CENTER: CUTOUT PHOTO OF RUHUL AMEEN */}
        <div
          className="absolute right-0 sm:right-4 md:right-12 lg:right-20 bottom-0 w-[200px] sm:w-[360px] md:w-[460px] lg:w-[520px] h-[58%] sm:h-[80%] md:h-[94%] pointer-events-none z-20 flex items-end justify-center transition-transform duration-300 opacity-90 sm:opacity-100"
          style={{
            transform: `translate3d(${tilt.rotY * 0.7}px, ${-tilt.rotX * 0.7}px, 20px)`,
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

        {/* 3. FOREGROUND X-SHARDS (Crossing OVER the Cutout Photo) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-25"
          viewBox="0 0 1000 600"
          preserveAspectRatio="none"
          style={{
            transform: `translate3d(${-tilt.rotY * 0.5}px, ${tilt.rotX * 0.5}px, 40px)`,
          }}
        >
          <defs>
            <linearGradient id="fgShardSlash" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--accent, #E5262B)" stopOpacity="0.75" />
              <stop offset="45%" stopColor="var(--accent, #E5262B)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="accentBorderGlow" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="35%" stopColor="var(--accent, #E5262B)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Diagonal Slash 2 (Top-Right to Bottom-Left crossing OVER the photo to complete the X) */}
          <polygon
            points="930,0 810,0 560,600 680,600"
            fill="url(#fgShardSlash)"
            opacity="0.7"
          />
          <line
            x1="930"
            y1="0"
            x2="680"
            y2="600"
            stroke="url(#accentBorderGlow)"
            strokeWidth="2.2"
            opacity="0.9"
          />
          <line
            x1="810"
            y1="0"
            x2="560"
            y2="600"
            stroke="var(--accent, #E5262B)"
            strokeWidth="1.4"
            opacity="0.6"
          />

          {/* Sharp Angular Glass Shard Polygon across lower torso */}
          <polygon
            points="640,400 950,260 990,340 680,490"
            fill="var(--accent, #E5262B)"
            opacity="0.3"
          />
          <line
            x1="640"
            y1="400"
            x2="950"
            y2="260"
            stroke="#ffffff"
            strokeWidth="1.8"
            opacity="0.65"
          />
        </svg>

        {/* 4. LEFT OVERLAY: NAME + ROLE + TWO BUTTONS */}
        <div
          className="relative z-30 max-w-sm sm:max-w-lg md:max-w-xl my-auto space-y-3 sm:space-y-6 pt-2 sm:pt-4"
          style={{
            transform: `translate3d(${tilt.rotY * 0.4}px, ${-tilt.rotX * 0.4}px, 35px)`,
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

        {/* Subtle Bottom Accent Indicator */}
        <div className="relative z-30 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-neutral-500 pt-3 sm:pt-4 border-t border-white/5">
          <span>PORTFOLIO 2026</span>
          <span className="text-[var(--accent,#E5262B)]">LUCKNOW, IN</span>
        </div>
      </div>
    </div>
  );
}
