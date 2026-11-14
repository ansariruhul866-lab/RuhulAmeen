'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Film, Image as ImageIcon, Globe, TrendingUp, Bot, Sparkles } from 'lucide-react';
import { playHoverSound, playClickSound } from '@/lib/sound';

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  metrics: string;
  icon: React.ElementType;
  discussUrl: string;
}

export function ServicesRows() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [cursorX, setCursorX] = useState<number>(50);

  const services: ServiceItem[] = [
    {
      id: 'video',
      number: '01',
      title: 'VIDEO EDITING & RETENTION.',
      category: '4K Storytelling & Pacing',
      description: 'Pattern-interrupt hook architecture, 3D kinetic typography, and multi-layered sound design engineered to maximize average watch duration.',
      metrics: '48-72h Turnaround • 4.2M+ Views Benchmark',
      icon: Film,
      discussUrl: 'https://wa.me/919369389841?text=Hi%20Ruhul,%20I%20would%20like%20to%20discuss%20a%20Video%20Editing%20project.',
    },
    {
      id: 'thumbnail',
      number: '02',
      title: 'HIGH-CTR THUMBNAIL DESIGN.',
      category: 'Visual Psychology & 3D Lighting',
      description: 'Extreme mobile-feed contrast, 3D specular rim-lighting rendered with Blender/Photoshop, and curiosity-gap packaging tested for maximum click-through.',
      metrics: '14.8% YouTube CTR Average • Layered PSDs Included',
      icon: ImageIcon,
      discussUrl: 'https://wa.me/919369389841?text=Hi%20Ruhul,%20I%20would%20like%20to%20discuss%20Thumbnail%20Design.',
    },
    {
      id: 'web',
      number: '03',
      title: 'NEXT.JS & 3D WEB DEVELOPMENT.',
      category: 'Production Platforms & SSR Flagships',
      description: 'Bespoke Next.js App Router flagships with Three.js tactile motion, sub-second load times, and guaranteed 95+ mobile Lighthouse scores.',
      metrics: 'Sub-second LCP • Zero Layout Shift • Vercel Edge',
      icon: Globe,
      discussUrl: 'https://wa.me/919369389841?text=Hi%20Ruhul,%20I%20would%20like%20to%20discuss%20Web%20Development.',
    },
    {
      id: 'seo',
      number: '04',
      title: 'TECHNICAL SEO & DOMINANCE.',
      category: 'Entity Architecture & Core Web Vitals',
      description: 'Semantic schema.org JSON-LD graphs, Core Web Vitals remediation, and commercial keyword clustering that secure top organic rankings.',
      metrics: '+320% Traffic Spikes • Google Entity Validation',
      icon: TrendingUp,
      discussUrl: 'https://wa.me/919369389841?text=Hi%20Ruhul,%20I%20would%20like%20to%20discuss%20SEO%20and%20Search%20Growth.',
    },
    {
      id: 'ai',
      number: '05',
      title: 'AI AUTOMATIONS & CUSTOM ENGINES.',
      category: 'Programmatic Copilots & Webhooks',
      description: 'Automated video transcription, intelligent content clipping engines, and custom LLM copilots integrated into creator pipelines.',
      metrics: '35h Saved Weekly • Autonomous Cloud Pipelines',
      icon: Bot,
      discussUrl: 'https://wa.me/919369389841?text=Hi%20Ruhul,%20I%20would%20like%20to%20discuss%20AI%20Tools%20and%20Automation.',
    },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width) * 100;
    setCursorX(xPct);
  };

  return (
    <div className="w-full space-y-3">
      {services.map((service) => {
        const Icon = service.icon;
        const isHovered = hoveredId === service.id;

        return (
          <div
            key={service.id}
            onMouseEnter={() => {
              playHoverSound();
              setHoveredId(service.id);
            }}
            onMouseLeave={() => setHoveredId(null)}
            onMouseMove={handleMouseMove}
            className={`group relative rounded-2xl p-6 sm:p-8 transition-all duration-300 border overflow-hidden ${
              isHovered
                ? 'border-[var(--accent,#E5262B)] bg-white/[0.04] shadow-[0_10px_35px_-10px_rgba(229,38,43,0.3)]'
                : 'border-white/10 bg-neutral-950/60 hover:border-white/20'
            }`}
          >
            {/* Cursor-Follow Accent Radial Glow */}
            {isHovered && (
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle 350px at ${cursorX}% 50%, var(--accent-glow, rgba(229,38,43,0.25)) 0%, transparent 70%)`,
                }}
              />
            )}

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              {/* Left Column: Number, Title, Category */}
              <div className="space-y-2 lg:max-w-md">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-[var(--accent,#E5262B)] tracking-wider">
                    {service.number}
                  </span>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400">
                    {service.category}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-black text-white group-hover:text-[var(--accent,#E5262B)] transition-colors tracking-tight">
                  {service.title}
                </h3>
              </div>

              {/* Middle Column: Short Description & Metrics */}
              <div className="space-y-1.5 lg:max-w-md">
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                  {service.description}
                </p>
                <div className="inline-flex items-center gap-2 text-[11px] font-mono text-neutral-400">
                  <Sparkles className="w-3 h-3 text-[var(--accent,#E5262B)]" />
                  <span>{service.metrics}</span>
                </div>
              </div>

              {/* Right Column: Small "Discuss" Button */}
              <div className="shrink-0 flex items-center gap-3">
                <Link
                  href={service.discussUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClickSound}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-[var(--accent,#E5262B)] text-white text-xs font-mono font-bold uppercase tracking-wider border border-white/15 hover:border-[var(--accent,#E5262B)] transition-all shadow-md group/btn"
                >
                  <span>Discuss</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
