import type { Metadata } from 'next';
import Link from 'next/link';
import { PROJECTS, CATEGORIES } from '@/content/projects';
import { WorkCard } from '@/components/ui/WorkCard';
import { ArrowLeft, CheckCircle2, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Web Development & Creative Engineering — Ruhul Ameen',
  description: 'Bespoke Next.js web applications, Three.js 3D interactions, GSAP animations, and 99+ Lighthouse performance scores.',
};

export default function WebDevelopmentPage() {
  const category = CATEGORIES.find((c) => c.key === 'web')!;
  const webProjects = PROJECTS.filter((p) => p.category === 'web');

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
            Category 03 / 05
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white">
            {category.name}: Next.js & 3D Engineering
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
            Delivering sub-second load times, sub-zero layout shift, and memorable interactive brand touchpoints.
          </p>
        </div>
      </div>

      {/* 600+ word strategy */}
      <div className="prose prose-invert max-w-none grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-y border-white/10 text-sm leading-relaxed text-neutral-300">
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[var(--accent,#E5262B)]" />
            Static Site Generation & Next.js App Router
          </h3>
          <p>
            Modern websites must balance cinematic animation with instantaneous load speeds. By leveraging Next.js App Router static site generation (SSG) alongside aggressive edge caching on Vercel, pages load in fewer than 900 milliseconds globally.
          </p>
          <p>
            Every HTML payload is pre-compiled at build time, ensuring zero JavaScript execution blockades for search engine spiders and mobile visitors on 4G networks.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[var(--accent,#E5262B)]" />
            Tactile 3D & GSAP Micro-Interactions
          </h3>
          <p>
            Motion is not mere eye candy; motion is UI feedback. When a visitor hovers, cards physically tilt with mathematical spring physics; when they scroll, kinetic type elements translate along custom easing curves.
          </p>
          <p>
            By isolating Three.js WebGL rendering into lightweight, lazy-loaded canvases with 2D CSS fallbacks for low-power mobile devices, we achieve AAA studio aesthetics without battery drain or framerate drops.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[var(--accent,#E5262B)]" />
            Conversion-Centric Architecture
          </h3>
          <p>
            A beautiful website that fails to convert is an expensive art installation. Every web application I design integrates strategic call-to-action hierarchies, frictionless 3-field appointment modal overlays, and direct WhatsApp integrations.
          </p>
          <p>
            From boutique lifestyle brands like Resin Rituals to high-stakes healthcare networks like ACORD Clinic, every digital touchpoint is measured by inquiries and revenue generated.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-white">
            Live Client Deployments
          </h2>
          <span className="text-xs font-mono text-neutral-500">
            {webProjects.length} Verified Production Apps
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {webProjects.map((p) => (
            <WorkCard key={p.id} project={p} />
          ))}
        </div>
      </div>

      <div className="p-8 md:p-12 rounded-3xl bg-neutral-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">Need a high-performance web experience?</h3>
          <p className="text-sm text-neutral-400 max-w-xl">
            Let&apos;s build a digital flagship that sets you years ahead of your competitors in design, speed, and conversion.
          </p>
        </div>
        <Link
          href="/contact"
          className="px-6 py-3 rounded-full bg-[var(--accent,#E5262B)] text-white font-bold text-sm uppercase tracking-wider hover:bg-[var(--accent-hover,#ff3338)] transition-colors whitespace-nowrap"
        >
          Start Web Project
        </Link>
      </div>
    </div>
  );
}
