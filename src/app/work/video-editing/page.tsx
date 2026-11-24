import type { Metadata } from 'next';
import Link from 'next/link';
import { PROJECTS, CATEGORIES } from '@/content/projects';
import { VideoProjectsGrid } from '@/components/ui/VideoProjectsGrid';
import { ArrowLeft, CheckCircle2, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Video Editing & Retention Engineering — Ruhul Ameen',
  description: 'High-retention storytelling, kinetic pacing, audio micro-design, and hook science that keeps viewers engaged past the 60-second drop-off.',
};

export default function VideoEditingPage() {
  const category = CATEGORIES.find((c) => c.key === 'video')!;
  const videoProjects = PROJECTS.filter((p) => p.category === 'video');

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 space-y-20">
      {/* Back link */}
      <Link
        href="/work"
        className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 hover:text-[var(--accent,#E5262B)] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Disciplines</span>
      </Link>

      {/* Hero Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-8 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-[var(--accent,#E5262B)]/10 text-[var(--accent,#E5262B)] border border-[var(--accent,#E5262B)]/20">
            Category 01 / 05
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white">
            {category.name}: Retention-Driven Storytelling
          </h1>
          <p className="text-xl text-neutral-300 leading-relaxed">
            {category.description}
          </p>
        </div>

        {/* Stats Teaser Box */}
        <div className="lg:col-span-4 p-8 rounded-2xl border border-[var(--accent,#E5262B)]/30 bg-[var(--accent,#E5262B)]/5 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent,#E5262B)] uppercase font-bold tracking-wider">
            <Zap className="w-4 h-4" />
            <span>Benchmark Impact</span>
          </div>
          <div className="text-3xl font-black text-white">
            {category.statsTeaser}
          </div>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Verified across talking-head YouTube essays, high-conversion SaaS product promos, and vertical short-form reels.
          </p>
        </div>
      </div>

      {/* Deep-Dive Editorial Section (600+ words context) */}
      <div className="prose prose-invert max-w-none grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-y border-white/10 text-sm leading-relaxed text-neutral-300">
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[var(--accent,#E5262B)]" />
            The Hook Science (0:00 - 0:05)
          </h3>
          <p>
            The fate of any video is decided in the initial 180 frames. Most editors rely on generic sound whooshes and kinetic title cards. My editing methodology employs pattern-interrupt theory: visual mismatching, rapid tonal subversion, and multi-layered diegetic sound effects designed to break the viewer&apos;s auto-pilot scrolling state.
          </p>
          <p>
            By coupling the verbal thesis with an unexpected camera move or physical gesture, we systematically eliminate the 40% initial abandonment cliff typical of standard YouTube videos.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[var(--accent,#E5262B)]" />
            Audio Architecture & Sound Design
          </h3>
          <p>
            Viewers forgive mediocre footage; they instantly swipe away from poor audio pacing. Every timeline is constructed with a 4-tier audio pyramid: primary dialogue cleanup (iZotope spectral de-noise, EQ carve, surgical gating), ambient atmospheric beds, tactile micro-Foley (clicks, tape snaps, air rumbles), and dynamic score ducking that surges during emotional peaks.
          </p>
          <p>
            The result is an ASMR-adjacent clarity where every frame feels physically tangible to the audience.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[var(--accent,#E5262B)]" />
            Pacing Cadence & Visual Rhythm
          </h3>
          <p>
            A consistent cut every 3 seconds induces fatigue. Real retention stems from rhythmic tension and release: alternating high-velocity 0.8s micro-cuts with breath moments that let a profound statement sink in.
          </p>
          <p>
            Combined with custom 3D element integration via Cinema 4D and After Effects, the final edit functions not merely as entertainment, but as an engineered retention vehicle that algorithms reward with runaway organic reach.
          </p>
        </div>
      </div>

      {/* Projects Showcase */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-white">
            Featured Video Projects
          </h2>
          <span className="text-xs font-mono text-neutral-500">
            {videoProjects.length} Verified Case Studies
          </span>
        </div>

        <VideoProjectsGrid projects={videoProjects} />
      </div>

      {/* CTA Box */}
      <div className="p-8 md:p-12 rounded-3xl bg-neutral-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">Ready to engineer your channel&apos;s retention?</h3>
          <p className="text-sm text-neutral-400 max-w-xl">
            Whether you run an educational channel, a high-growth tech startup, or a founder-led podcast, let&apos;s build an editing system that stops thumbs.
          </p>
        </div>
        <Link
          href="/contact"
          className="px-6 py-3 rounded-full bg-[var(--accent,#E5262B)] text-white font-bold text-sm uppercase tracking-wider hover:bg-[var(--accent-hover,#ff3338)] transition-colors whitespace-nowrap"
        >
          Book Editing Discovery
        </Link>
      </div>
    </div>
  );
}
