'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { CATEGORIES } from '@/content/projects';
import { Film, Image as ImageIcon, Globe, TrendingUp, Bot, ArrowUpRight, CheckCircle2, Sparkles, Activity } from 'lucide-react';
import { playHoverSound, playClickSound } from '@/lib/sound';

export function CategoryStack() {
  const [explored, setExplored] = useState<string[]>([]);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState<{ [key: string]: { x: number; y: number } }>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem('ruhul_explored_categories');
      if (saved) {
        setExplored(JSON.parse(saved));
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const handleCategoryClick = (key: string) => {
    playClickSound();
    setExplored((prev) => {
      if (prev.includes(key)) return prev;
      const next = [...prev, key];
      try {
        localStorage.setItem('ruhul_explored_categories', JSON.stringify(next));
      } catch {
        // Fallback
      }
      return next;
    });
  };

  const handleMouseMove = (key: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos((prev) => ({
      ...prev,
      [key]: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      },
    }));
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'Film': return Film;
      case 'Image': return ImageIcon;
      case 'Globe': return Globe;
      case 'TrendingUp': return TrendingUp;
      case 'Bot': return Bot;
      default: return Globe;
    }
  };

  // Bespoke micro-interactive visualization for each discipline
  const renderVisualArtifact = (key: string) => {
    switch (key) {
      case 'video':
        return (
          <div className="flex items-end gap-1 h-6">
            <span className="w-1 bg-[var(--accent,#E5262B)] rounded-full animate-[pulse_1s_ease-in-out_infinite] h-3" />
            <span className="w-1 bg-[var(--accent,#E5262B)] rounded-full animate-[pulse_0.7s_ease-in-out_infinite_0.2s] h-6" />
            <span className="w-1 bg-[var(--accent,#E5262B)] rounded-full animate-[pulse_1.2s_ease-in-out_infinite_0.4s] h-4" />
            <span className="w-1 bg-[var(--accent,#E5262B)] rounded-full animate-[pulse_0.9s_ease-in-out_infinite_0.1s] h-5" />
            <span className="w-1 bg-[var(--accent,#E5262B)] rounded-full animate-[pulse_1.1s_ease-in-out_infinite_0.3s] h-3" />
          </div>
        );
      case 'thumbnail':
        return (
          <div className="relative w-8 h-5 rounded border border-white/20 bg-black/60 overflow-hidden flex items-center justify-center">
            <div className="absolute inset-y-0 left-0 w-1/2 bg-[var(--accent,#E5262B)]/30 border-r border-[var(--accent,#E5262B)]" />
            <span className="text-[8px] font-mono font-bold text-white relative z-10">CTR</span>
          </div>
        );
      case 'web':
        return (
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-mono text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>&lt;100ms</span>
          </div>
        );
      case 'seo':
        return (
          <div className="flex items-center gap-1 text-[10px] font-mono text-rose-400">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>+320%</span>
          </div>
        );
      case 'ai':
        return (
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-[10px] font-mono text-purple-300">
            <Sparkles className="w-3 h-3 text-purple-400" />
            <span>Auto</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Exploration Header & Progress Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
            CORE DISCIPLINES.
          </h2>
          <p className="text-xs text-neutral-400 font-mono mt-1.5">
            5 specialized creative and engineering systems engineered for maximal conversion.
          </p>
        </div>

        {/* Explored Progress Bar */}
        <div className="flex items-center gap-3 bg-neutral-900/90 px-4 py-2 rounded-full border border-white/10 shadow-lg">
          <span className="text-xs font-mono font-bold text-neutral-300">
            Explored: <span className="text-[var(--accent,#E5262B)]">{explored.length}</span>/5
          </span>
          <div className="w-24 h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-[var(--accent,#E5262B)] transition-all duration-500 rounded-full shadow-[0_0_8px_rgba(229,38,43,0.8)]"
              style={{ width: `${(explored.length / 5) * 100}%` }}
            />
          </div>
          {explored.length === 5 && (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          )}
        </div>
      </div>

      {/* 5-Card 3D Interactive Stack with Dynamic Cursor Spotlight */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {CATEGORIES.map((cat, index) => {
          const Icon = getIcon(cat.iconName);
          const isViewed = explored.includes(cat.key);
          const isHovered = hoveredCard === cat.key;
          const pos = mousePos[cat.key] || { x: 150, y: 150 };

          return (
            <Link
              key={cat.key}
              href={`/work/${cat.slug}`}
              onClick={() => handleCategoryClick(cat.key)}
              onMouseEnter={() => {
                setHoveredCard(cat.key);
                playHoverSound();
              }}
              onMouseLeave={() => setHoveredCard(null)}
              onMouseMove={(e) => handleMouseMove(cat.key, e)}
              data-cursor="Explore"
              className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl border border-white/10 bg-neutral-950/85 hover:border-[var(--accent,#E5262B)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(229,38,43,0.2)] overflow-hidden min-h-[340px]"
            >
              {/* Dynamic Mouse Spotlight Glow */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle 240px at ${pos.x}px ${pos.y}px, rgba(229, 38, 43, 0.22) 0%, transparent 70%)`,
                }}
              />

              {/* Ambient gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />

              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:text-[var(--accent,#E5262B)] group-hover:border-[var(--accent,#E5262B)]/50 group-hover:scale-110 group-hover:bg-[var(--accent,#E5262B)]/10 transition-all duration-300 shadow-md">
                    <Icon className="w-5 h-5" />
                  </div>
                  {renderVisualArtifact(cat.key)}
                </div>

                <div className="pt-2">
                  <div className="font-mono text-[10px] text-neutral-500 font-bold uppercase tracking-widest">
                    Phase 0{index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-[var(--accent,#E5262B)] transition-colors leading-tight mt-1">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-neutral-300 mt-2 line-clamp-3 leading-relaxed font-normal">
                    {cat.tagline}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2.5 relative z-10">
                <div className="text-[11px] font-mono text-[var(--accent,#E5262B)] font-bold leading-tight flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent,#E5262B)] animate-pulse" />
                  <span>{cat.statsTeaser}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400 group-hover:text-white transition-colors">
                  <span>{isViewed ? 'Explored ✓' : 'Explore Domain'}</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 text-[var(--accent,#E5262B)] transition-transform" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
