'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { X, ArrowUpRight } from 'lucide-react';
import { ResultsCounters } from '@/components/ui/ResultsCounters';
import { WorkCardScroller } from '@/components/ui/WorkCardScroller';
import { VideoModal } from '@/components/ui/VideoModal';
import { HeroWidePanel } from '@/components/ui/HeroWidePanel';
import { AboutSection } from '@/components/ui/AboutSection';
import { ServicesRows } from '@/components/ui/ServicesRows';
import { ToolkitMarquee } from '@/components/ui/ToolkitMarquee';
import { ContactSection } from '@/components/ui/ContactSection';
import { PROJECTS } from '@/content/projects';
import { Project } from '@/types';

// Lazy-load the ambient 3D scene / soft particles
const HeroScene = dynamic(() => import('@/components/3d/HeroScene'), {
  ssr: false,
});

export default function HomePage() {
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string } | null>(null);
  const [activeLightbox, setActiveLightbox] = useState<Project | null>(null);

  const statsData = [
    { value: 4.2, suffix: 'M+', label: 'Organic Video Views', description: 'Generated across client reels, essays & shorts' },
    { value: 14.8, suffix: '%', label: 'Peak YouTube CTR', description: '3D depth & visual psychology benchmark' },
    { value: 99, suffix: '/100', label: 'Lighthouse Performance', description: 'Sub-second speeds with zero layout shifts' },
  ];

  return (
    <div className="relative space-y-32 md:space-y-48 pb-32 w-full max-w-full overflow-x-clip">
      {/* Background Ambient Soft Red Bokeh Orbs */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[10%] left-[15%] w-72 md:w-96 h-72 md:h-96 rounded-full bg-[var(--accent,#E5262B)]/10 blur-[120px]" />
        <div className="absolute top-[45%] right-[10%] w-80 md:w-[480px] h-80 md:h-[480px] rounded-full bg-[var(--accent,#E5262B)]/12 blur-[140px]" />
        <div className="absolute top-[75%] left-[20%] w-72 md:w-[400px] h-72 md:h-[400px] rounded-full bg-[var(--accent,#E5262B)]/10 blur-[130px]" />
      </div>

      {/* Ambient Canvas Layer */}
      <HeroScene />

      {/* 1. HERO SECTION: ONE WIDE FRAMED GLASS PANEL WITH X-SHARDS & CUTOUT PHOTO */}
      <section className="relative px-3 sm:px-6 md:px-12 pt-2 sm:pt-4 md:pt-8 w-full max-w-7xl mx-auto flex items-center justify-center min-h-[85vh] min-w-0 overflow-hidden">
        <HeroWidePanel />
      </section>

      {/* 2. HERO EXIT & GLASS STATS CARD (3 Counters) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12 py-12 w-full min-w-0 overflow-hidden">
        <ResultsCounters stats={statsData} />
      </section>

      {/* 3. WORK SECTION ("WORK."): HEADING ALONE ON DARK, LOTS OF EMPTY SPACE */}
      <section id="work" className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 space-y-12 w-full min-w-0 overflow-hidden">
        <div className="text-center md:text-left space-y-3">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-white tracking-tight">
            WORK.
          </h2>
        </div>

        {/* Work Grid Scroller */}
        <WorkCardScroller
          projects={PROJECTS}
          onOpenVideo={(url, title) => setActiveVideo({ url, title })}
          onOpenLightbox={(project) => setActiveLightbox(project)}
        />
      </section>

      {/* 4. ABOUT SECTION ("ABOUT RUHUL."): HEADING ALONE + GLASS TEXT CARD & PINNED HANGING PHOTO */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full min-w-0 overflow-hidden">
        <AboutSection />
      </section>

      {/* 5. SERVICES SECTION ("SERVICES."): HEADING ALONE + COMPACT ROWS */}
      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 space-y-10 w-full min-w-0 overflow-hidden">
        <div className="space-y-2">
          <h2 className="text-4xl md:text-6xl font-display font-black text-white tracking-tight">
            SERVICES.
          </h2>
        </div>
        <ServicesRows />
      </section>

      {/* 6. SKILLS + TOOLKIT ("MY TOOLKIT."): DUAL INFINITE MARQUEE ROWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full min-w-0 overflow-hidden">
        <ToolkitMarquee />
      </section>

      {/* 7. CONTACT SECTION ("CONTACT."): 3-FIELD GLASS FORM */}
      <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full min-w-0 overflow-hidden">
        <ContactSection />
      </section>

      {/* Video Modal Player (Direct on-site 4K playback) */}
      {activeVideo && (
        <VideoModal
          url={activeVideo.url}
          title={activeVideo.title}
          onClose={() => setActiveVideo(null)}
        />
      )}

      {/* Single Thumbnail Lightbox Modal */}
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
