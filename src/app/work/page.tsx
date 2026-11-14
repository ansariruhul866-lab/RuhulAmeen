'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PROJECTS, CATEGORIES } from '@/content/projects';
import { MasterMasonryGallery } from '@/components/ui/MasterMasonryGallery';
import { CategoryKey } from '@/types';
import { VideoModal } from '@/components/ui/VideoModal';

export default function WorkPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | 'all'>('all');
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string } | null>(null);

  const filteredProjects = selectedCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 space-y-16">
      {/* Page Header */}
      <div className="space-y-6 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-[var(--accent,#E5262B)]/10 text-[var(--accent,#E5262B)] border border-[var(--accent,#E5262B)]/20">
          Curated Proof of Work
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white font-display">
          WORK.
        </h1>
        <p className="text-base sm:text-lg text-neutral-400 leading-relaxed font-sans">
          A dynamic, living mosaic of high-retention video reels, 3D thumbnails, production web applications, and autonomous AI systems. Hover any video to isolate playback, or click any piece to inspect in 4K.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 pt-4 border-b border-white/10 pb-6">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-full text-xs font-mono font-medium transition-all ${
            selectedCategory === 'all'
              ? 'bg-[var(--accent,#E5262B)] text-white shadow-lg shadow-[var(--accent,#E5262B)]/30 font-bold scale-105'
              : 'bg-white/5 text-neutral-400 hover:text-white border border-white/10'
          }`}
        >
          All Deployments ({PROJECTS.length})
        </button>
        {CATEGORIES.map((cat) => {
          const count = PROJECTS.filter((p) => p.category === cat.key).length;
          return (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-xs font-mono font-medium transition-all ${
                selectedCategory === cat.key
                  ? 'bg-[var(--accent,#E5262B)] text-white shadow-lg shadow-[var(--accent,#E5262B)]/30 font-bold scale-105'
                  : 'bg-white/5 text-neutral-400 hover:text-white border border-white/10'
              }`}
            >
              {cat.name} ({count})
            </button>
          );
        })}
      </div>

      {/* Unified Master Masonry Gallery with Random Interleaved Tiles */}
      <MasterMasonryGallery
        projects={filteredProjects}
        isShuffled={selectedCategory === 'all'}
        onOpenVideo={(url, title) => setActiveVideo({ url, title })}
      />

      {/* Bottom Cross-Sell CTA */}
      <div className="p-8 md:p-12 rounded-3xl border border-white/10 bg-neutral-950/80 backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">
            Have a custom cross-domain project?
          </h2>
          <p className="text-sm text-neutral-400 max-w-xl leading-relaxed">
            I unite high-retention video packaging with modern software engineering—building high-converting client funnels, 3D web applications, and automated video workflows.
          </p>
        </div>
        <Link
          href="/contact"
          className="px-6 py-3.5 rounded-full bg-[var(--accent,#E5262B)] text-white font-bold text-xs font-mono uppercase tracking-wider hover:bg-[var(--accent-hover,#ff3338)] transition-all hover:scale-105 shadow-xl shadow-[var(--accent,#E5262B)]/30 whitespace-nowrap"
        >
          Schedule Discovery Call
        </Link>
      </div>

      {/* Full-Screen Video Modal Player */}
      {activeVideo && (
        <VideoModal
          url={activeVideo.url}
          title={activeVideo.title}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </div>
  );
}
