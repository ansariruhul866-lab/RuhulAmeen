'use client';

import React from 'react';
import { Sparkles, Code2, Video, Bot, Palette, TrendingUp, Megaphone, Search, Cpu, Film, Terminal } from 'lucide-react';
import { playHoverSound } from '@/lib/sound';

interface SkillItem {
  title: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  details: string[];
  tag: string;
}

export function ToolkitMarquee() {
  const skillsData: SkillItem[] = [
    {
      title: 'CapCut PC',
      badge: 'CC',
      icon: Film,
      tag: 'Video Production',
      details: ['Sound designing', 'Kinetic pacing', 'Motion design', 'Punch-in cuts & hooks'],
    },
    {
      title: 'Antigravity',
      badge: 'AGY',
      icon: Terminal,
      tag: 'Full-Stack Agentic AI',
      details: ['Web and AI tools development', 'Autonomous agent pipelines', 'IDE workflow automation'],
    },
    {
      title: 'Canva PC',
      badge: 'CNV',
      icon: Palette,
      tag: 'Visual Packaging',
      details: ['Template architecture', 'High-CTR thumbnail design', 'Product mockups & brand kits'],
    },
    {
      title: 'Web Development',
      badge: 'WEB',
      icon: Code2,
      tag: 'Engineering',
      details: ['Next.js 15 & React 19', 'TypeScript architecture', 'Tailwind CSS v4', 'Sub-second web performance'],
    },
    {
      title: 'AI Development',
      badge: 'AI',
      icon: Bot,
      tag: 'Intelligent Systems',
      details: ['Autonomous LLM agents', 'Python data scraping', 'Custom tool building', 'Multi-modal workflows'],
    },
    {
      title: 'Marketing',
      badge: 'MKT',
      icon: TrendingUp,
      tag: 'Growth Strategy',
      details: ['Audience psychology', 'Conversion funnel engineering', 'Brand positioning', 'Retention optimization'],
    },
    {
      title: 'Ads',
      badge: 'ADS',
      icon: Megaphone,
      tag: 'Paid Media',
      details: ['High-ROI video ad creatives', 'Split-testing hooks', 'Performance copy', 'Meta & YouTube campaigns'],
    },
    {
      title: 'Video Editing',
      badge: 'VID',
      icon: Video,
      tag: 'Cinematic Storytelling',
      details: ['Multi-cam editing', 'Audio mastering', '4K color grading', 'Narrative short & long-form'],
    },
    {
      title: 'SEO and Blogs',
      badge: 'SEO',
      icon: Search,
      tag: 'Organic Search',
      details: ['Technical search engine optimization', 'Programmatic blog architecture', 'Search Console & indexing', 'Entity keyword clusters'],
    },
    {
      title: 'Content and AI',
      badge: 'CNT',
      icon: Cpu,
      tag: 'Content Engineering',
      details: ['Advanced prompt engineering', 'Automated transcription', 'Programmatic content pipelines', 'Workflow scaling'],
    },
    {
      title: 'Gemini, Claude, ChatGPT',
      badge: 'LLM',
      icon: Sparkles,
      tag: 'Frontier AI Models',
      details: ['Multimodal API orchestration', 'Reasoning workflows', 'Autonomous agent tooling', 'Context optimization'],
    },
  ];

  const row1Tools = [
    { name: 'CapCut PC', category: 'Sound Design & Pacing', badge: 'CC' },
    { name: 'Antigravity', category: 'Web & AI Tools Development', badge: 'AGY' },
    { name: 'Canva PC', category: 'Templates & Mockups', badge: 'CNV' },
    { name: 'Next.js 15', category: 'Web Development', badge: 'NXT' },
    { name: 'TypeScript', category: 'Strict Type Systems', badge: 'TS' },
    { name: 'Tailwind CSS', category: 'Styling Engine', badge: 'TW' },
  ];

  const row2Tools = [
    { name: 'Gemini 2.0', category: 'Multimodal Frontier AI', badge: 'GEM' },
    { name: 'Claude 3.5 Sonnet', category: 'Complex Reasoning & Code', badge: 'CLD' },
    { name: 'ChatGPT Plus', category: 'Conversational Pipelines', badge: 'GPT' },
    { name: 'Google Search Console', category: 'SEO & Indexing', badge: 'GSC' },
    { name: 'Python', category: 'AI Development & Agents', badge: 'PY' },
    { name: 'Adobe Premiere Pro', category: 'Video Editing & Color', badge: 'PR' },
  ];

  return (
    <div className="space-y-16">
      {/* 1. CORE SKILLS GRID (Comprehensive details cards) */}
      <div className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-4xl md:text-6xl font-display font-black text-white tracking-tight">
            CORE SKILLS &amp; SYSTEMS.
          </h2>
          <p className="text-xs sm:text-sm font-mono text-neutral-400">
            11 specialized domains uniting video pacing, visual mockups, modern code, and frontier AI.
          </p>
        </div>

        {/* 11 Skills Grid with Curated Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {skillsData.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div
                key={index}
                onMouseEnter={playHoverSound}
                className="group p-6 rounded-3xl border border-white/10 bg-neutral-950/80 backdrop-blur-xl hover:border-[var(--accent,#E5262B)]/60 hover:shadow-[0_15px_40px_rgba(229,38,43,0.15)] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[var(--accent,#E5262B)] group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-white/5 text-neutral-300 border border-white/10">
                      {skill.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[var(--accent,#E5262B)] transition-colors">
                      {skill.title}
                    </h3>
                  </div>
                </div>

                {/* Detail Chips */}
                <div className="pt-3 border-t border-white/10 space-y-2">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                    Core Capabilities
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {skill.details.map((detail, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-sans font-medium bg-white/[0.04] text-neutral-200 border border-white/5 group-hover:border-white/10 transition-colors"
                      >
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. INFINITE TOOLKIT MARQUEE */}
      <div className="space-y-6">
        <h3 className="text-2xl md:text-3xl font-display font-black text-white tracking-tight">
          MY TOOLKIT.
        </h3>

        <div className="space-y-4 overflow-hidden relative py-2">
          {/* Edge gradient masks */}
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
                <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 text-neutral-300 font-mono font-bold text-xs flex items-center justify-center">
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
    </div>
  );
}
