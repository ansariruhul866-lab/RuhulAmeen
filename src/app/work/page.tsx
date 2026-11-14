'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PROJECTS, CATEGORIES } from '@/content/projects';
import { WorkCard } from '@/components/ui/WorkCard';
import { ThumbnailMasonryGallery } from '@/components/ui/ThumbnailMasonryGallery';
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
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-neutral-900 dark:text-white">
          Engineered for Retention. Built for Conversions.
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Explore production client work across video editing, 3D thumbnails, modern web applications, programmatic SEO, and AI workflow automation. Every project is anchored in quantifiable impact: Problem, Action, and verifiable Result.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 pt-4 border-b border-black/10 dark:border-white/10 pb-6">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-full text-xs font-mono font-medium transition-all ${
            selectedCategory === 'all'
              ? 'bg-[var(--accent,#E5262B)] text-white shadow-md'
              : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
          }`}
        >
          All Domains ({PROJECTS.length})
        </button>
        {CATEGORIES.map((cat) => {
          const count = PROJECTS.filter((p) => p.category === cat.key).length;
          return (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-xs font-mono font-medium transition-all ${
                selectedCategory === cat.key
                  ? 'bg-[var(--accent,#E5262B)] text-white shadow-md'
                  : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
              }`}
            >
              {cat.name} ({count})
            </button>
          );
        })}
      </div>

      {/* Projects Grid or Dedicated Thumbnail Masonry Gallery */}
      {selectedCategory === 'thumbnail' ? (
        <ThumbnailMasonryGallery projects={filteredProjects} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <WorkCard
              key={project.id}
              project={project}
              onOpenVideo={(url, title) => setActiveVideo({ url, title })}
            />
          ))}
        </div>
      )}

      {/* Bottom Cross-Sell CTA */}
      <div className="p-8 md:p-12 rounded-3xl border border-black/10 dark:border-white/10 bg-neutral-100 dark:bg-[#0c1017] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
            Have a project outside these categories?
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2 max-w-xl">
            My hybrid background allows cross-pollinating skills—such as automated video clipping tools or 3D interactive web experiences that boost conversion.
          </p>
        </div>
        <Link
          href="/contact"
          className="px-6 py-3 rounded-full bg-[var(--accent,#E5262B)] text-white font-bold text-sm uppercase tracking-wider hover:bg-[var(--accent-hover,#ff3338)] transition-colors whitespace-nowrap"
        >
          Schedule Discovery Call
        </Link>
      </div>

      {/* Video Modal Player */}
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
