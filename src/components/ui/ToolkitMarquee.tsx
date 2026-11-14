'use client';

import React from 'react';

interface ToolItem {
  name: string;
  category: string;
  badge: string;
}

export function ToolkitMarquee() {
  const skillChips = [
    '4K Narrative Pacing',
    '3D Specular Thumbnails',
    'Next.js 15 App Router',
    'TypeScript Architecture',
    'Tailwind CSS V4',
    'Technical Entity SEO',
    'LLM Agent Pipelines',
    'Spatial Sound Design',
    'Core Web Vitals 99+',
    'Blender 3D Modeling',
  ];

  const row1Tools: ToolItem[] = [
    { name: 'Adobe Premiere Pro', category: 'Editing', badge: 'PR' },
    { name: 'After Effects', category: 'VFX & Motion', badge: 'AE' },
    { name: 'Photoshop', category: '3D Thumbnails', badge: 'PS' },
    { name: 'Blender 3D', category: 'CGI & Specular', badge: '3D' },
    { name: 'CapCut Pro', category: 'High-Retention Short-Form', badge: 'CC' },
    { name: 'DaVinci Resolve', category: 'Color Grading', badge: 'DV' },
    { name: 'Figma', category: 'UI/UX Design', badge: 'FG' },
    { name: 'Midjourney', category: 'Visual Concepting', badge: 'MJ' },
  ];

  const row2Tools: ToolItem[] = [
    { name: 'Next.js 15', category: 'Full-Stack Framework', badge: 'NXT' },
    { name: 'React 19', category: 'UI Components', badge: 'RCT' },
    { name: 'TypeScript', category: 'Type Safety', badge: 'TS' },
    { name: 'Tailwind CSS', category: 'Styling Engine', badge: 'TW' },
    { name: 'Three.js / R3F', category: 'Interactive 3D Web', badge: '3JS' },
    { name: 'Python', category: 'AI Scraping & LLMs', badge: 'PY' },
    { name: 'GSAP', category: 'High-Performance Motion', badge: 'GSAP' },
    { name: 'Vercel Edge', category: 'Global Deployment', badge: 'VCL' },
    { name: 'Google Search Console', category: 'Technical Indexing', badge: 'GSC' },
    { name: 'Ahrefs', category: 'Keyword Intelligence', badge: 'AHR' },
  ];

  return (
    <div className="space-y-12">
      {/* Skill Chips Strip */}
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2.5">
          {skillChips.map((chip, idx) => (
            <span
              key={idx}
              className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] hover:border-[var(--accent,#E5262B)]/60 hover:bg-white/[0.08] text-xs font-mono text-neutral-200 transition-all hover:scale-105 select-none"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>

      {/* Marquee Header */}
      <h2 className="text-4xl md:text-6xl font-display font-black text-white tracking-tight">
        MY TOOLKIT.
      </h2>


      {/* Two Opposite-Direction Infinite Marquee Rows */}
      <div className="space-y-4 overflow-hidden relative py-2">
        {/* Soft edge gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0A0A0B] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0A0A0B] to-transparent z-10 pointer-events-none" />

        {/* Row 1: Leftward Marquee */}
        <div className="flex gap-4 w-max animate-marquee hover:[animation-play-state:paused]">
          {[...row1Tools, ...row1Tools, ...row1Tools].map((tool, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-white/10 bg-neutral-950/80 backdrop-blur-md hover:border-[var(--accent,#E5262B)]/60 transition-colors shrink-0 shadow-lg"
            >
              <div className="w-8 h-8 rounded-xl bg-[var(--accent,#E5262B)]/15 border border-[var(--accent,#E5262B)]/30 text-[var(--accent,#E5262B)] font-mono font-bold text-xs flex items-center justify-center">
                {tool.badge}
              </div>
              <div>
                <div className="text-xs font-bold text-white tracking-tight">
                  {tool.name}
                </div>
                <div className="text-[10px] font-mono text-neutral-400">
                  {tool.category}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2: Rightward Marquee */}
        <div className="flex gap-4 w-max animate-marquee-reverse hover:[animation-play-state:paused]">
          {[...row2Tools, ...row2Tools, ...row2Tools].map((tool, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-white/10 bg-neutral-950/80 backdrop-blur-md hover:border-[var(--accent,#E5262B)]/60 transition-colors shrink-0 shadow-lg"
            >
              <div className="w-8 h-8 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 font-mono font-bold text-xs flex items-center justify-center">
                {tool.badge}
              </div>
              <div>
                <div className="text-xs font-bold text-white tracking-tight">
                  {tool.name}
                </div>
                <div className="text-[10px] font-mono text-neutral-400">
                  {tool.category}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
