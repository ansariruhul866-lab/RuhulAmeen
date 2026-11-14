'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';

export function AboutPinnedPhoto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: (y / (rect.height / 2)) * -8,
      y: (x / (rect.width / 2)) * 10,
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex flex-col items-center select-none py-6 [perspective:1000px]"
    >
      {/* Wall Pin / Thumbtack */}
      <div className="relative z-30 flex flex-col items-center -mb-3">
        <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[var(--accent,#E5262B)] to-rose-400 shadow-[0_4px_12px_rgba(229,38,43,0.6)] border border-white/40 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-white/90" />
        </div>
        {/* String/wire shadow */}
        <div className="w-0.5 h-6 bg-gradient-to-b from-white/30 to-white/5 shadow-sm" />
      </div>

      {/* Hanging Frame with Gentle Swing & Hover 3D Tilt */}
      <div
        className={`relative w-[280px] sm:w-[320px] aspect-[4/5] p-3 rounded-2xl bg-neutral-950/90 border-2 border-[var(--accent,#E5262B)]/60 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(229,38,43,0.2)] transition-transform duration-200 ease-out origin-top ${
          isHovered ? '' : 'animate-hanging-swing'
        }`}
        style={{
          transform: isHovered
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.02)`
            : undefined,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Inner photo container */}
        <div className="relative w-full h-[85%] rounded-xl overflow-hidden bg-neutral-900 border border-white/10">
          <Image
            src="/images/profile.jpg"
            alt="Ruhul Ameen — Creative Lead"
            fill
            sizes="(max-width: 768px) 280px, 320px"
            priority
            className="object-cover object-top filter contrast-[1.04] brightness-[1.02] transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-2.5 left-3 text-[11px] font-mono text-white/90 uppercase tracking-wider font-semibold">
            Ruhul Ameen • Lucknow, IN
          </div>
        </div>

        {/* Print caption banner at bottom */}
        <div className="h-[15%] flex items-center justify-between px-2 pt-2">
          <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">
            FOUNDER &amp; BUILDER
          </span>
          <span className="inline-block w-2 h-2 rounded-full bg-[var(--accent,#E5262B)] animate-ping" />
        </div>
      </div>
    </div>
  );
}
