'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowDown,
  ArrowUpRight,
  Sparkles,
  Flame,
  Globe,
  Video,
  Eye,
  X,
  ExternalLink,
} from 'lucide-react';
import { CategoryStack } from '@/components/ui/CategoryStack';
import { LogoMarquee } from '@/components/ui/LogoMarquee';
import { ResultsCounters } from '@/components/ui/ResultsCounters';
import { KineticScroll } from '@/components/ui/KineticScroll';
import { Testimonials3D } from '@/components/ui/Testimonials3D';
import { WorkCardScroller } from '@/components/ui/WorkCardScroller';
import { VideoModal } from '@/components/ui/VideoModal';
import { HeroProfile3D } from '@/components/3d/HeroProfile3D';
import { AboutSection } from '@/components/ui/AboutSection';
import { ServicesRows } from '@/components/ui/ServicesRows';
import { ToolkitMarquee } from '@/components/ui/ToolkitMarquee';
import { ContactSection } from '@/components/ui/ContactSection';
import { PROJECTS } from '@/content/projects';
import { playClickSound } from '@/lib/sound';
import { Project } from '@/types';

// Lazy-load the 3D scene (SSR: false)
const HeroScene = dynamic(() => import('@/components/3d/HeroScene'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-40">
      <div className="w-96 h-96 rounded-full bg-gradient-to-tr from-[var(--accent,#E5262B)]/25 via-indigo-500/15 to-transparent blur-3xl animate-pulse" />
    </div>
  ),
});

export default function HomePage() {
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string } | null>(null);
  const [activeLightbox, setActiveLightbox] = useState<Project | null>(null);

  const statsData = [
    { value: 4.2, suffix: 'M+', label: 'Organic Video Views', description: 'Generated across client reels, essays & shorts' },
    { value: 14.8, suffix: '%', label: 'Peak YouTube CTR', description: '3D depth & visual psychology benchmark' },
    { value: 99, suffix: '/100', label: 'Lighthouse Performance', description: 'Sub-second speeds with zero layout shifts' },
    { value: 68, suffix: '%', label: 'Conversion Lift', description: 'Verified jump in client inquiries and bookings' },
  ];

  const liveWebsites = [
    { name: 'ACORD Revamp', image: '/images/websites/acord-revamp.jpg', category: 'Health Tech', url: 'https://acord-revamp.vercel.app/' },
    { name: 'Resin Rituals', image: '/images/websites/resin-rituals.jpg', category: 'Luxury E-Com', url: 'https://resin-rituals.vercel.app/' },
    { name: 'Cult Thread', image: '/images/websites/cult-thread.jpg', category: 'Streetwear', url: 'https://cult-thread.vercel.app/' },
    { name: 'Outrank AI', image: '/images/websites/outrank-ai.png', category: 'SEO Intelligence', url: 'https://outreach-kohl-three.vercel.app/' },
    { name: 'NeuroSpine Clinic', image: '/images/websites/neurospine.jpg', category: 'Neurosurgery', url: 'https://neurospine-plum.vercel.app/' },
    { name: 'Dr. Ankita Pundir', image: '/images/websites/dr-ankita-pundir.jpg', category: 'Dermatology', url: 'https://drankitapundir.com/' },
    { name: 'Dr. Achal Gupta', image: '/images/websites/dr-achal-gupta.jpg', category: 'Spine Surgery', url: 'https://www.drachalgupta.com/' },
    { name: 'RBMF Healthcare', image: '/images/websites/rbmf-one.jpg', category: 'Foundation', url: 'https://rbmf-one.vercel.app/' },
    { name: 'Dorie Fashion', image: '/images/websites/dorie.jpg', category: 'Apparel', url: 'https://www.dorie.in/' },
    { name: 'ACORD Clinics', image: '/images/websites/acord-clinics.jpg', category: 'Clinical Practice', url: 'https://acordclinic.vercel.app/' },
  ];

  return (
    <div className="relative space-y-24 md:space-y-36 pb-28 overflow-hidden">
      {/* Dynamic Ambient Background Bokeh Glow Orbs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[var(--accent,#E5262B)]/15 via-rose-500/10 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-[30%] right-[-10%] w-[550px] h-[550px] bg-gradient-to-bl from-[var(--accent,#E5262B)]/10 via-indigo-600/10 to-transparent rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute top-[60%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-tr from-[var(--accent,#E5262B)]/12 via-neutral-900/40 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-[85%] right-1/4 w-[550px] h-[550px] bg-gradient-to-bl from-[var(--accent,#E5262B)]/15 to-transparent rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* 1. HERO SECTION WITH 3D CANVAS, SHARP GROTESQUE DISPLAY & RUHUL'S 3D CUTOUT PANEL */}
      <section className="relative min-h-[90vh] flex flex-col justify-between px-6 md:px-12 pt-6 md:pt-12 max-w-7xl mx-auto">
        <HeroScene />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-2 md:pt-6 relative z-10">
          {/* Left Column: Bold Name, Role Line, Subline & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider bg-white/[0.04] text-white border border-white/10 backdrop-blur-xl shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent,#E5262B)] animate-ping" />
              <span className="text-neutral-200 font-bold">Ruhul Ameen</span>
              <span className="text-neutral-600">•</span>
              <span className="text-[var(--accent,#E5262B)] font-semibold">Available for Work</span>
              <span className="text-neutral-600 hidden sm:inline">•</span>
              <span className="text-xs text-neutral-400 hidden sm:inline">Lucknow, India</span>
            </div>

            {/* Huge Bold Name in Grotesque Display font ending with period */}
            <div className="space-y-3">
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-8xl font-display font-black tracking-tighter text-white leading-[0.92]">
                RUHUL AMEEN.
              </h1>
              {/* Role Line */}
              <div className="text-xs sm:text-sm md:text-base font-mono uppercase tracking-widest text-[var(--accent,#E5262B)] font-bold">
                VIDEO EDITOR • THUMBNAIL DESIGNER • WEB DEVELOPER • AI SYSTEMS.
              </div>
            </div>

            {/* Subline */}
            <p className="text-base sm:text-lg text-neutral-300 max-w-xl font-normal leading-relaxed tracking-wide font-sans">
              High-retention video storytelling, 3D visual thumbnails, and Next.js digital platforms engineered for verified reach.
            </p>

            {/* Two Required Call to Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="#work"
                onClick={playClickSound}
                className="px-8 py-4 rounded-full bg-[var(--accent,#E5262B)] hover:bg-[var(--accent-hover,#ff3338)] text-white font-mono font-bold text-xs uppercase tracking-wider transition-all hover:scale-105 shadow-xl shadow-[var(--accent,#E5262B)]/30 flex items-center gap-2"
              >
                <span>View my work</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <Link
                href="#contact"
                onClick={playClickSound}
                className="px-8 py-4 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-xl text-xs font-mono font-medium hover:border-[var(--accent,#E5262B)] text-white transition-all shadow-lg flex items-center gap-2"
              >
                <span>Get in touch</span>
                <ArrowUpRight className="w-4 h-4 text-[var(--accent,#E5262B)]" />
              </Link>
            </div>

            {/* Quick Metrics Strip */}
            <div className="pt-4 flex flex-wrap gap-5 text-xs font-mono text-neutral-400 border-t border-white/10">
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-[var(--accent,#E5262B)]" />
                <span>50+ Retention Video Edits</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-amber-400" />
                <span>14.8% Peak CTR Thumbnails</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                <span>Next.js 3D Web Apps</span>
              </div>
            </div>
          </div>

          {/* Right Column: Framed Glass Panel with Ruhul's Cutout, Geometric X-Cut Shards & Parallax */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <HeroProfile3D />
          </div>
        </div>

        {/* Scroll Cue */}
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 pt-8 pb-2">
          <ArrowDown className="w-4 h-4 text-[var(--accent,#E5262B)] animate-bounce" />
          <span>Scroll to explore verified client deployments across 5 disciplines</span>
        </div>
      </section>

      {/* 2. HERO EXIT & GLASS STATS CARD */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <ResultsCounters stats={statsData} />
      </section>

      {/* 3. LOGO MARQUEE */}
      <section className="space-y-4">
        <div className="text-center">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
            Trusted by Creators, Medical Clinics &amp; Emerging Brands
          </span>
        </div>
        <LogoMarquee />
      </section>

      {/* 4. 5-CATEGORY 3D TILT STACK */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <CategoryStack />
      </section>

      {/* 5. KINETIC SCROLL DIVIDER */}
      <section>
        <KineticScroll text="Viral Pacing • 3D Thumbnails • Next.js Engineering • AI Automations" />
      </section>

      {/* 6. WORK SECTION ("WORK."): UPGRADED 3D TILT WORK SCROLLER WITH 5 FILTERS */}
      <section id="work" className="max-w-7xl mx-auto px-6 md:px-12 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-[var(--accent,#E5262B)]/15 text-[var(--accent,#E5262B)] border border-[var(--accent,#E5262B)]/30">
              <Flame className="w-3.5 h-3.5" />
              <span>Production Work Showcase</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-black text-white tracking-tight">
              WORK.
            </h2>
            <p className="text-sm text-neutral-400 max-w-xl font-sans">
              Filter by video editing, 3D thumbnails, full-stack websites, SEO growth, and AI engines. Click any video for 4K on-site playback.
            </p>
          </div>

          <Link
            href="/work"
            className="px-5 py-2.5 rounded-full border border-white/20 hover:border-[var(--accent,#E5262B)] text-xs font-mono uppercase tracking-wider text-white font-bold hover:text-[var(--accent,#E5262B)] inline-flex items-center gap-2 transition-colors whitespace-nowrap bg-white/5"
          >
            <span>View All 78+ Projects</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Dynamic Card Scroller */}
        <WorkCardScroller
          projects={PROJECTS}
          onOpenVideo={(url, title) => setActiveVideo({ url, title })}
          onOpenLightbox={(project) => setActiveLightbox(project)}
        />
      </section>

      {/* 7. LIVE WEBSITES HIGHLIGHT DECK */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-8">
        <div className="p-8 md:p-12 rounded-3xl bg-neutral-950/80 border border-white/15 backdrop-blur-2xl space-y-8 shadow-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-mono text-[var(--accent,#E5262B)] font-bold uppercase tracking-wider">
                Production Web Applications
              </span>
              <h3 className="text-2xl md:text-4xl font-display font-black text-white">
                LIVE CLIENT PLATFORMS.
              </h3>
              <p className="text-sm text-neutral-300 max-w-2xl font-sans">
                Explore real, live sites engineered with Next.js, sub-second load times, and custom brand visual language.
              </p>
            </div>
            <Link
              href="/work/web-development"
              className="px-6 py-3 rounded-full bg-[var(--accent,#E5262B)] hover:bg-[var(--accent-hover,#ff3338)] text-white font-bold text-xs font-mono uppercase tracking-wider transition-colors shadow-lg whitespace-nowrap"
            >
              See All Web Projects
            </Link>
          </div>

          {/* Visual Interactive Website Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-4">
            {liveWebsites.map((site) => (
              <Link
                key={site.url}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="View"
                className="group rounded-2xl border border-white/10 bg-black/40 hover:bg-black/70 hover:border-[var(--accent,#E5262B)]/60 transition-all overflow-hidden flex flex-col shadow-lg hover:-translate-y-1"
              >
                {/* Visual Screenshot Thumbnail */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-950 border-b border-white/10">
                  <Image
                    src={site.image}
                    alt={site.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 240px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="w-3 h-3 text-[var(--accent,#E5262B)]" />
                  </div>
                </div>

                <div className="p-3.5 space-y-1 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[var(--accent,#E5262B)] font-bold uppercase">
                      {site.category}
                    </span>
                    <h4 className="text-xs font-bold text-white group-hover:text-[var(--accent,#E5262B)] transition-colors truncate">
                      {site.name}
                    </h4>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 pt-2 border-t border-white/5">
                    <span>Live Portal</span>
                    <ArrowUpRight className="w-3 h-3 group-hover:text-[var(--accent,#E5262B)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. ABOUT SECTION ("ABOUT RUHUL.") WITH PINNED HANGING PHOTO */}
      <section id="about" className="max-w-7xl mx-auto px-6 md:px-12">
        <AboutSection />
      </section>

      {/* 9. SERVICES SECTION ("SERVICES."): 5 INTERACTIVE ROWS */}
      <section id="services" className="max-w-7xl mx-auto px-6 md:px-12 space-y-8">
        <div className="space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--accent,#E5262B)] font-bold">
            Disciplines &amp; Retainers
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black text-white tracking-tight">
            SERVICES.
          </h2>
          <p className="text-sm text-neutral-400 max-w-xl font-sans">
            5 specialized creative and technical disciplines. Hover over any row for details or click to initiate discussion.
          </p>
        </div>
        <ServicesRows />
      </section>

      {/* 10. SKILLS + TOOLKIT ("MY TOOLKIT."): DUAL INFINITE MARQUEE ROWS */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <ToolkitMarquee />
      </section>

      {/* 11. TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <Testimonials3D />
      </section>

      {/* 12. CONTACT SECTION ("CONTACT."): 3-FIELD GLASS FORM + DIRECT CHANNELS */}
      <section id="contact" className="max-w-7xl mx-auto px-6 md:px-12">
        <ContactSection />
      </section>

      {/* Video Modal Player (Zero Redirects, Plays Directly On Site) */}
      {activeVideo && (
        <VideoModal
          url={activeVideo.url}
          title={activeVideo.title}
          onClose={() => setActiveVideo(null)}
        />
      )}

      {/* Single Thumbnail Lightbox Modal (For Scroller clicks) */}
      {activeLightbox && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-2xl animate-in fade-in-0 duration-200"
          onClick={() => setActiveLightbox(null)}
        >
          <div
            className="absolute top-4 right-4 flex items-center gap-3 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <Link
              href={`/work/${activeLightbox.slug}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-[var(--accent,#E5262B)] text-xs font-mono font-bold text-white transition-colors border border-white/15"
            >
              <span>View Case Study</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setActiveLightbox(null)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/20"
              aria-label="Close viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div
            className="relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-neutral-950 shadow-2xl max-h-[75vh] flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeLightbox.thumbnail}
                alt={activeLightbox.title}
                className="max-h-[75vh] w-auto max-w-full object-contain block select-none"
              />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-white tracking-tight">
                {activeLightbox.title}
              </h3>
              <p className="text-xs font-mono text-neutral-400">
                {activeLightbox.client} • {activeLightbox.result}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
