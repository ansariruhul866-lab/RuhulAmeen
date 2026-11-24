import type { Metadata } from 'next';
import Link from 'next/link';
import { PROJECTS, CATEGORIES } from '@/content/projects';
import { WorkCard } from '@/components/ui/WorkCard';
import { ArrowLeft, CheckCircle2, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI Tools & Automation Engineering — Ruhul Ameen',
  description: 'Custom generative pipelines, LLM copilots, automated video repurposing engines, and agentic workflows that 10x creative output.',
};

export default function AIToolsPage() {
  const category = CATEGORIES.find((c) => c.key === 'ai')!;
  const aiProjects = PROJECTS.filter((p) => p.category === 'ai');

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 space-y-20">
      <Link
        href="/work"
        className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 hover:text-[var(--accent,#E5262B)] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Disciplines</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-8 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-[var(--accent,#E5262B)]/10 text-[var(--accent,#E5262B)] border border-[var(--accent,#E5262B)]/20">
            Category 05 / 05
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white">
            {category.name}: Content Multiplier Systems
          </h1>
          <p className="text-xl text-neutral-300 leading-relaxed">
            {category.description}
          </p>
        </div>

        <div className="lg:col-span-4 p-8 rounded-2xl border border-[var(--accent,#E5262B)]/30 bg-[var(--accent,#E5262B)]/5 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent,#E5262B)] uppercase font-bold tracking-wider">
            <Zap className="w-4 h-4" />
            <span>Benchmark Impact</span>
          </div>
          <div className="text-3xl font-black text-white">
            {category.statsTeaser}
          </div>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Eliminating repetitive human tasks through programmatic LLMs, Whisper audio transcriptions, and webhook automations.
          </p>
        </div>
      </div>

      {/* 600+ word strategy */}
      <div className="prose prose-invert max-w-none grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-y border-white/10 text-sm leading-relaxed text-neutral-300">
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[var(--accent,#E5262B)]" />
            Autonomous Media Repurposing
          </h3>
          <p>
            Creators and media agencies waste dozens of hours every week re-encoding videos, clipping audio hooks, extracting transcripts, and manually reformatting social captions for LinkedIn, X, and YouTube Shorts.
          </p>
          <p>
            By integrating Python microservices with OpenAI Whisper, FFmpeg, and Google Drive Webhooks, raw podcast uploads are automatically split into 5 viral-ready vertical video cuts, transcribed, and captioned with zero human intervention.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[var(--accent,#E5262B)]" />
            Semantic Vector Embeddings & Clustering
          </h3>
          <p>
            Keyword research at scale requires analyzing tens of thousands of search queries. Conventional spreadsheet formulas fail to grasp intent nuance.
          </p>
          <p>
            Using vector embeddings (text-embedding-3-large) combined with dimensionality reduction algorithms, our tools instantly categorize 10,000 keywords into topical content clusters, highlighting untapped keyword cannibalization gaps in minutes.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[var(--accent,#E5262B)]" />
            Agentic Tool Integration & Next.js
          </h3>
          <p>
            An AI script is useless without an intuitive, responsive user interface. I package complex backend AI models into clean Next.js web dashboards featuring instant CSV exports, live streaming completions, and role-based workspace permissions.
          </p>
          <p>
            The outcome: tools that your non-technical team members can operate effortlessly from day one.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-white">
            Automations & AI Projects
          </h2>
          <span className="text-xs font-mono text-neutral-500">
            {aiProjects.length} Verified Case Studies
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {aiProjects.map((p) => (
            <WorkCard key={p.id} project={p} />
          ))}
        </div>
      </div>

      <div className="p-8 md:p-12 rounded-3xl bg-neutral-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">Have a repetitive workflow you want to automate?</h3>
          <p className="text-sm text-neutral-400 max-w-xl">
            Let&apos;s build a custom AI pipeline that cuts manual labor, eliminates human error, and supercharges your company&apos;s output.
          </p>
        </div>
        <Link
          href="/contact"
          className="px-6 py-3 rounded-full bg-[var(--accent,#E5262B)] text-white font-bold text-sm uppercase tracking-wider hover:bg-[var(--accent-hover,#ff3338)] transition-colors whitespace-nowrap"
        >
          Build An AI Workflow
        </Link>
      </div>
    </div>
  );
}
