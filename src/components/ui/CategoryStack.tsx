'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { CATEGORIES } from '@/content/projects';
import { Film, Image as ImageIcon, Globe, TrendingUp, Bot, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { playHoverSound, playClickSound } from '@/lib/sound';

export function CategoryStack() {
  const [explored, setExplored] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="space-y-8" ref={containerRef}>
      {/* Exploration Header & Progress Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/10 dark:border-white/10 pb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-neutral-900 dark:text-white">
            Core Disciplines
          </h2>
          <p className="text-xs text-neutral-500 font-mono mt-1">
            5 specialized creative and technical domains.
          </p>
        </div>

        {/* Explored Progress Bar */}
        <div className="flex items-center gap-3 bg-neutral-100 dark:bg-neutral-900 px-4 py-2 rounded-full border border-black/5 dark:border-white/5">
          <span className="text-xs font-mono font-bold text-neutral-800 dark:text-neutral-200">
            Explored: <span className="text-[var(--accent,#E5262B)]">{explored.length}</span>/5
          </span>
          <div className="w-24 h-2 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
            <div
              className="h-full bg-[var(--accent,#E5262B)] transition-all duration-500 rounded-full"
              style={{ width: `${(explored.length / 5) * 100}%` }}
            />
          </div>
          {explored.length === 5 && (
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          )}
        </div>
      </div>

      {/* 5-Card 3D Interactive Stack */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {CATEGORIES.map((cat, index) => {
          const Icon = getIcon(cat.iconName);
          const isViewed = explored.includes(cat.key);

          return (
            <Link
              key={cat.key}
              href={`/work/${cat.slug}`}
              onClick={() => handleCategoryClick(cat.key)}
              onMouseEnter={playHoverSound}
              data-cursor="Explore"
              className="group relative flex flex-col justify-between p-6 rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0c1017] hover:border-[var(--accent,#E5262B)] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl overflow-hidden min-h-[320px]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-black/5 dark:border-white/10 flex items-center justify-center text-neutral-800 dark:text-neutral-200 group-hover:text-[var(--accent,#E5262B)] group-hover:border-[var(--accent,#E5262B)]/40 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs text-neutral-400 font-bold">
                    0{index + 1}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white group-hover:text-[var(--accent,#E5262B)] transition-colors leading-tight">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-2 line-clamp-3 leading-relaxed">
                    {cat.tagline}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-black/5 dark:border-white/5 space-y-2">
                <div className="text-[11px] font-mono text-[var(--accent,#E5262B)] font-semibold leading-tight">
                  {cat.statsTeaser}
                </div>
                <div className="flex items-center justify-between text-xs text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
                  <span>{isViewed ? 'Explored' : 'Open Domain'}</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
