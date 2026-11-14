import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, ArrowRight, Zap, Shield, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Services & Deliverables — Ruhul Ameen',
  description: 'Production-ready creative development, high-retention video editing, thumbnail design, technical SEO, and automated AI tools tailored for high-growth brands and creators.',
};

export default function ServicesPage() {
  const serviceOfferings = [
    {
      category: 'Video Editing & Retention Systems',
      slug: 'video-editing',
      priceGuide: 'Retainers from $1,200/mo',
      turnaround: '48 - 72 Hours',
      features: [
        'Complete narrative pacing and 0-5s pattern-interrupt hook architecture',
        'Custom sound design (Foley, multi-layer ambient beds, spectral audio cleanup)',
        '3D kinetic typography and After Effects motion elements',
        'Short-form vertical re-edits for TikTok, Reels & YouTube Shorts',
        'Direct frame-by-frame review via Frame.io or Google Drive',
      ],
    },
    {
      category: 'Visual CTR Thumbnail Packages',
      slug: 'thumbnail-design',
      priceGuide: 'Packs from $450 (5 Thumbnails)',
      turnaround: '24 - 48 Hours',
      features: [
        'Extreme 120px mobile-feed contrast and silhouette testing',
        '3D specular rim-lighting rendered via Blender & Photoshop',
        'Curiosity-gap title pairing strategies to maximize click intention',
        'Multi-concept A/B split-test variations per video upload',
        'Layered source files (.PSD) with commercial asset licensing',
      ],
    },
    {
      category: 'Full-Stack Next.js & 3D Web Development',
      slug: 'web-development',
      priceGuide: 'Project-based from $2,500',
      turnaround: '2 - 4 Weeks',
      features: [
        'Next.js App Router with TypeScript and Tailwind CSS',
        'Tactile 3D Three.js/R3F interactive hero canvases and GSAP motion',
        'Static Site Generation (SSG) with guaranteed 95+ Mobile Lighthouse scores',
        'Conversion-optimized landing pages with zero layout shift',
        'Direct deployment to Vercel with global CDN and domain configuration',
      ],
    },
    {
      category: 'Technical SEO & Local Dominance',
      slug: 'seo',
      priceGuide: 'Audits from $800 | Retainers from $1,500/mo',
      turnaround: 'Ongoing Sprints',
      features: [
        'Complete JSON-LD semantic schema markup (Physician, Clinic, Organization)',
        'Core Web Vitals remediation (LCP < 1.2s, CLS = 0)',
        'High-intent commercial keyword clustering and cannibalization fixes',
        'Google Search Console indexing and technical crawl budget optimization',
        'Rank tracking dashboard with month-over-month ROI reports',
      ],
    },
    {
      category: 'AI Automated Engines & Creator Copilots',
      slug: 'ai-tools',
      priceGuide: 'Custom tools from $1,800',
      turnaround: '1 - 3 Weeks',
      features: [
        'Automated video transcription and multi-platform social snippet clipping',
        'Vector-based semantic keyword clustering engines using LLM embeddings',
        'Custom web apps connecting OpenAI/Gemini APIs to Google Drive workflows',
        'Bespoke internal dashboards built with Next.js and Tailwind',
        'Zero-maintenance automated cloud webhook deployments',
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 space-y-20">
      {/* Header */}
      <div className="space-y-6 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-[var(--accent,#E5262B)]/10 text-[var(--accent,#E5262B)] border border-[var(--accent,#E5262B)]/20">
          Services & Deliverables
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-neutral-900 dark:text-white">
          Engineered Creative Execution Across 5 High-Impact Domains.
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
          I don&apos;t sell generic hours or superficial deliverables. Every engagement is structured as an investment in audience retention, brand credibility, and measurable conversion growth.
        </p>
      </div>

      {/* Trust & Guarantee Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 rounded-3xl bg-neutral-100 dark:bg-[#0c1017] border border-black/10 dark:border-white/10">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-[var(--accent,#E5262B)]/10 text-[var(--accent,#E5262B)]">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-neutral-900 dark:text-white text-sm">Rapid Turnarounds</h4>
            <p className="text-xs text-neutral-500 mt-1">Disciplined production cycles with zero missed deadlines.</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-[var(--accent,#E5262B)]/10 text-[var(--accent,#E5262B)]">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-neutral-900 dark:text-white text-sm">Direct Collaboration</h4>
            <p className="text-xs text-neutral-500 mt-1">Work directly with Ruhul—no junior hand-offs or agency markups.</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-[var(--accent,#E5262B)]/10 text-[var(--accent,#E5262B)]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-neutral-900 dark:text-white text-sm">Measurable ROI</h4>
            <p className="text-xs text-neutral-500 mt-1">Every project is tied to specific retention, CTR, or lead benchmarks.</p>
          </div>
        </div>
      </div>

      {/* Service Cards */}
      <div className="space-y-8">
        {serviceOfferings.map((service, index) => (
          <div
            key={service.category}
            className="p-8 md:p-12 rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0c1017] flex flex-col lg:flex-row justify-between gap-8 hover:border-[var(--accent,#E5262B)]/40 transition-all shadow-sm"
          >
            <div className="space-y-4 max-w-xl">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[var(--accent,#E5262B)] font-bold">0{index + 1}</span>
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                  {service.turnaround}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-neutral-900 dark:text-white">
                {service.category}
              </h3>
              <ul className="space-y-2.5 pt-2">
                {service.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5 text-xs md:text-sm text-neutral-600 dark:text-neutral-400">
                    <Check className="w-4 h-4 text-[var(--accent,#E5262B)] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col justify-between items-start lg:items-end border-t lg:border-t-0 lg:border-l border-black/10 dark:border-white/10 pt-6 lg:pt-0 lg:pl-10 min-w-[240px] space-y-6">
              <div>
                <span className="text-xs font-mono text-neutral-400 uppercase">Estimated Investment</span>
                <div className="text-xl font-bold text-neutral-900 dark:text-white mt-1">
                  {service.priceGuide}
                </div>
              </div>

              <div className="flex flex-col w-full gap-2.5">
                <Link
                  href="/contact"
                  className="w-full text-center px-6 py-3 rounded-full bg-[var(--accent,#E5262B)] text-white text-xs font-bold uppercase tracking-wider hover:bg-[var(--accent-hover,#ff3338)] transition-colors"
                >
                  Inquire Now
                </Link>
                <Link
                  href={`/work/${service.slug}`}
                  className="w-full text-center px-6 py-2.5 rounded-full border border-black/10 dark:border-white/10 text-xs font-mono text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white flex items-center justify-center gap-1 group"
                >
                  <span>View Proof of Work</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center space-y-6 max-w-2xl mx-auto py-8">
        <h2 className="text-3xl font-black text-neutral-900 dark:text-white">
          Not sure which service suits your current stage?
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Book a 15-minute diagnostic call. We&apos;ll audit your current videos, website, or ranking bottlenecks and outline a practical roadmap with zero obligation.
        </p>
        <Link
          href="https://wa.me/919999999999"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--accent,#E5262B)] text-white font-bold text-sm uppercase tracking-wider hover:bg-[var(--accent-hover,#ff3338)] transition-transform hover:scale-105 shadow-xl"
        >
          <span>Chat on WhatsApp Directly</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
