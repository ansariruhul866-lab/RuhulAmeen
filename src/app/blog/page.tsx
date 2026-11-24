import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog & Technical Breakdowns — Ruhul Ameen',
  description: 'Deep dives on high-retention video editing systems, YouTube CTR psychology, Next.js 3D web development, and programmatic SEO.',
};

export const BLOG_POSTS = [
  {
    slug: 'mastering-high-ctr-youtube-thumbnails',
    title: 'The Visual Psychology Behind 14%+ YouTube Click-Through Rates',
    excerpt: 'How we engineered a 3D-depth packaging system with Blender specular passes, the 120-pixel mobile test, and curiosity-gap pairing to conquer saturated feeds.',
    date: 'February 2025',
    readTime: '6 min read',
    category: 'Visual Design',
    views: '3.4k views',
  },
  {
    slug: 'technical-seo-for-nextjs-sites',
    title: 'Zero to Page 1: Building Programmatic Semantic SEO with Next.js App Router',
    excerpt: 'Step-by-step breakdown of how structured JSON-LD entity schemas, Core Web Vitals optimization, and static generation replaced $8,000/month of paid ads for a medical clinic.',
    date: 'January 2025',
    readTime: '8 min read',
    category: 'SEO & Engineering',
    views: '4.8k views',
  },
  {
    slug: 'building-ai-workflows-for-creators',
    title: 'Autonomous Creator Engines: Repurposing 2-Hour Podcasts into 10 Viral Shorts in 18 Minutes',
    excerpt: 'A complete architectural walkthrough of combining OpenAI Whisper, Python FFmpeg pipelines, and webhook triggers to automate agency-scale content multiplication.',
    date: 'December 2024',
    readTime: '7 min read',
    category: 'AI Automation',
    views: '5.2k views',
  },
];

export default function BlogIndexPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 space-y-16">
      {/* Header */}
      <div className="space-y-6 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-[var(--accent,#E5262B)]/10 text-[var(--accent,#E5262B)] border border-[var(--accent,#E5262B)]/20">
          Knowledge Base & Case Notes
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white">
          Tactical Insights on Storytelling, Code & Organic Scale.
        </h1>
        <p className="text-lg text-neutral-300 leading-relaxed">
          Unfiltered case studies, algorithmic analyses, and production workflows written directly from the trenches of video editing timelines and code repositories.
        </p>
      </div>

      {/* Posts List */}
      <div className="space-y-6">
        {BLOG_POSTS.map((post) => (
          <article
            key={post.slug}
            className="group p-8 rounded-3xl border border-white/10 bg-neutral-950/80 hover:border-[var(--accent,#E5262B)]/50 transition-all shadow-sm"
          >
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-500 mb-3">
              <span className="px-2.5 py-0.5 rounded bg-[var(--accent,#E5262B)]/10 text-[var(--accent,#E5262B)] font-semibold">
                {post.category}
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {post.date}
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
            </div>

            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-2xl md:text-3xl font-bold text-white group-hover:text-[var(--accent,#E5262B)] transition-colors leading-snug">
                {post.title}
              </h2>
            </Link>

            <p className="text-sm text-neutral-300 mt-3 leading-relaxed">
              {post.excerpt}
            </p>

            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider font-bold text-[var(--accent,#E5262B)] group-hover:underline"
              >
                <span>Read Full Breakdown</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <span className="text-xs font-mono text-neutral-400">{post.views}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
