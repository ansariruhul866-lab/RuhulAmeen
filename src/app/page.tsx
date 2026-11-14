'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowUpRight,
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
import { CinematicHeroPanel } from '@/components/hero/CinematicHeroPanel';
import { AboutSection } from '@/components/ui/AboutSection';
import { ServicesRows } from '@/components/ui/ServicesRows';
import { ToolkitMarquee } from '@/components/ui/ToolkitMarquee';
import { ContactSection } from '@/components/ui/ContactSection';
import { PROJECTS } from '@/content/projects';
import { Project } from '@/types';

// Lazy-load the 3D scene (SSR: false)
const HeroScene = dynamic(() => import('@/components/3d/HeroScene'), {
  ssr: false,
  loading: () => null,
});

export default function HomePage() {
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string } | null>(null);
  const [activeLightbox, setActiveLightbox] = useState<Project | null>(null);

  const statsData = [
    { value: 4.2, suffix: 'M+', label: 'Organic Video Views', description: 'Generated across client reels, essays & shorts' },
    { value: 14.8, suffix: '%', label: 'Peak YouTube CTR', description: '3D depth & visual psychology benchmark' },
    { value: 10, suffix: '+', label: 'Production Platforms', description: 'Sub-second Next.js web applications in production' },
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
    <div className="relative space-y-32 md:space-y-48 pb-32 overflow-hidden">
      {/* Dynamic Ambient Background Bokeh Glow Orbs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[var(--accent,#E5262B)]/15 via-rose-500/10 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-[30%] right-[-10%] w-[550px] h-[550px] bg-gradient-to-bl from-[var(--accent,#E5262B)]/10 via-indigo-600/10 to-transparent rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute top-[60%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-tr from-[var(--accent,#E5262B)]/12 via-neutral-900/40 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-[85%] right-1/4 w-[550px] h-[550px] bg-gradient-to-bl from-[var(--accent,#E5262B)]/15 to-transparent rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* ============================================================ */}
      {/* 2. HERO: ONE WIDE FRAMED GLASS PANEL WITH RED X-SHARDS       */}
      {/* ============================================================ */}
      <section className="relative pt-4 sm:pt-8 md:pt-10 flex flex-col justify-center">
        <HeroScene />
        <CinematicHeroPanel />
      </section>

      {/* ============================================================ */}
      {/* 3. HERO EXIT & GLASS STATS CARD                              */}
      {/* ============================================================ */}
      <section className="max-w-6xl mx-auto px-6 md:px-12">
        <ResultsCounters stats={statsData} />
      </section>

      {/* 4. LOGO MARQUEE */}
      <section className="space-y-6">
        <LogoMarquee />
      </section>

      {/* 5. CORE DISCIPLINES */}
      <section className="max-w-6xl mx-auto px-6 md:px-12">
        <CategoryStack />
      </section>

      {/* 6. KINETIC SCROLL DIVIDER */}
      <section>
        <KineticScroll text="Viral Pacing • 3D Thumbnails • Next.js Engineering • AI Automations" />
      </section>

      {/* ============================================================ */}
      {/* 7. WORK SECTION ("WORK.")                                    */}
      {/* ============================================================ */}
      <section id="work" className="max-w-6xl mx-auto px-6 md:px-12 space-y-12">
        <div className="text-center md:text-left space-y-3">
          <h2 className="text-4xl md:text-6xl font-display font-black text-white tracking-tight">
            WORK.
          </h2>
        </div>

        {/* Dynamic 3D Cylinder Card Scroller */}
        <WorkCardScroller
          projects={PROJECTS}
          onOpenVideo={(url, title) => setActiveVideo({ url, title })}
          onOpenLightbox={(project) => setActiveLightbox(project)}
        />
      </section>

      {/* ============================================================ */}
      {/* 9. ABOUT SECTION ("ABOUT RUHUL.")                            */}
      {/* ============================================================ */}
      <section id="about" className="max-w-6xl mx-auto px-6 md:px-12">
        <AboutSection />
      </section>

      {/* ============================================================ */}
      {/* 10. SERVICES SECTION ("SERVICES.")                           */}
      {/* ============================================================ */}
      <section id="services" className="max-w-6xl mx-auto px-6 md:px-12 space-y-12">
        <h2 className="text-4xl md:text-6xl font-display font-black text-white tracking-tight">
          SERVICES.
        </h2>
        <ServicesRows />
      </section>

      {/* ============================================================ */}
      {/* 11. TOOLKIT MARQUEE ("MY TOOLKIT.")                          */}
      {/* ============================================================ */}
      <section className="max-w-6xl mx-auto px-6 md:px-12">
        <ToolkitMarquee />
      </section>

      {/* 12. TESTIMONIALS */}
      <section className="max-w-6xl mx-auto px-6 md:px-12">
        <Testimonials3D />
      </section>

      {/* ============================================================ */}
      {/* 13. CONTACT SECTION ("CONTACT.")                             */}
      {/* ============================================================ */}
      <section id="contact" className="max-w-6xl mx-auto px-6 md:px-12">
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
