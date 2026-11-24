import type { Metadata } from 'next';
import Link from 'next/link';
import { PROJECTS, CATEGORIES } from '@/content/projects';
import { WorkCard } from '@/components/ui/WorkCard';
import { ArrowLeft, CheckCircle2, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Technical SEO & Organic Growth — Ruhul Ameen',
  description: 'Semantic architecture, Next.js metadata optimization, JSON-LD schema engineering, and local authority ranking strategies.',
};

export default function SEOPage() {
  const category = CATEGORIES.find((c) => c.key === 'seo')!;
  const seoProjects = PROJECTS.filter((p) => p.category === 'seo');

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
            Category 04 / 05
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white">
            {category.name}: Algorithmic Organic Dominance
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
            Eliminating wasteful pay-per-click budgets by establishing permanent organic dominance on high-commercial-intent keywords.
          </p>
        </div>
      </div>

      {/* 600+ word strategy */}
      <div className="prose prose-invert max-w-none grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-y border-white/10 text-sm leading-relaxed text-neutral-300">
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[var(--accent,#E5262B)]" />
            Semantic JSON-LD Entity Graph
          </h3>
          <p>
            Search engines no longer rank raw strings; they rank entities and verified relationships. I engineer comprehensive nested JSON-LD schemas (ProfessionalService, Physician, MedicalClinic, VideoObject, FAQPage) that communicate unambiguous authority to Google Knowledge Graph.
          </p>
          <p>
            This structural clarity frequently triggers rich snippet stars, author cards, and immediate carousel real estate on search engine results pages.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[var(--accent,#E5262B)]" />
            Core Web Vitals & Crawl Budget
          </h3>
          <p>
            A slow website is penalized by modern ranking algorithms. By guaranteeing a sub-second Largest Contentful Paint (LCP), 0 Cumulative Layout Shift (CLS), and rapid First Input Delay (FID), our pages pass all Core Web Vitals checks with flying colors.
          </p>
          <p>
            Simultaneously, clean dynamic sitemaps, robots rules, and canonical architectures ensure Googlebot expends zero crawl budget on non-canonical parameters.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[var(--accent,#E5262B)]" />
            Intent-Focused Content Clustering
          </h3>
          <p>
            Rather than spraying fragmented blog posts across unrelated topics, we build topical clusters centered around high-intent commercial hubs.
          </p>
          <p>
            Internal links pass PageRank directly to conversion landing pages, turning casual educational readers into high-ticket clients and qualified clinic inquiries.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-white">
            SEO Case Studies & Audits
          </h2>
          <span className="text-xs font-mono text-neutral-500">
            {seoProjects.length} Verified Case Studies
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {seoProjects.map((p) => (
            <WorkCard key={p.id} project={p} />
          ))}
        </div>
      </div>

      <div className="p-8 md:p-12 rounded-3xl bg-neutral-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">Ready to rank #1 on Google organically?</h3>
          <p className="text-sm text-neutral-400 max-w-xl">
            Let&apos;s analyze your competitors, fix critical technical roadblocks, and launch an organic acquisition strategy that compounds month over month.
          </p>
        </div>
        <Link
          href="/contact"
          className="px-6 py-3 rounded-full bg-[var(--accent,#E5262B)] text-white font-bold text-sm uppercase tracking-wider hover:bg-[var(--accent-hover,#ff3338)] transition-colors whitespace-nowrap"
        >
          Book SEO Audit
        </Link>
      </div>
    </div>
  );
}
