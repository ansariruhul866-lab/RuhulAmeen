'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/types';
import { Maximize2, X, ChevronLeft, ChevronRight, ArrowUpRight, Sparkles } from 'lucide-react';
import { playClickSound } from '@/lib/sound';

interface ThumbnailMasonryGalleryProps {
  projects: Project[];
}

export function ThumbnailMasonryGallery({ projects }: ThumbnailMasonryGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const activeProject = lightboxIndex !== null ? projects[lightboxIndex] : null;

  const handleOpenLightbox = (index: number) => {
    playClickSound();
    setLightboxIndex(index);
  };

  const handleCloseLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const handlePrev = useCallback(() => {
    if (lightboxIndex === null) return;
    playClickSound();
    setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : projects.length - 1));
  }, [lightboxIndex, projects.length]);

  const handleNext = useCallback(() => {
    if (lightboxIndex === null) return;
    playClickSound();
    setLightboxIndex((prev) => (prev! < projects.length - 1 ? prev! + 1 : 0));
  }, [lightboxIndex, projects.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleCloseLightbox();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [lightboxIndex, handleCloseLightbox, handlePrev, handleNext]);

  return (
    <div className="space-y-6">
      {/* Visual Instruction Badge */}
      <div className="flex items-center justify-between text-xs font-mono text-neutral-400 pb-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[var(--accent,#E5262B)]" />
          <span>Click any artwork to inspect in ultra-high resolution lightbox</span>
        </div>
        <span>{projects.length} Visual Deployments</span>
      </div>

      {/* Masonry Columns Layout — Adapts dynamically to varied image aspect ratios */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5 [column-fill:_balance]">
        {projects.map((project, idx) => (
          <div
            key={project.id}
            onClick={() => handleOpenLightbox(idx)}
            className="break-inside-avoid mb-5 block relative group rounded-2xl overflow-hidden border border-white/10 bg-neutral-900/90 shadow-lg hover:shadow-2xl hover:shadow-[var(--accent,#E5262B)]/25 hover:border-[var(--accent,#E5262B)]/60 transition-all duration-300 cursor-pointer"
          >
            {/* High-Resolution Artwork Image (Natural aspect ratio, zero crop) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.thumbnail}
              alt={project.title}
              loading="lazy"
              className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.03]"
            />

            {/* Subtle Gradient Hover Glass Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-4 pointer-events-none">
              {/* Top pill */}
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[var(--accent,#E5262B)]/90 text-white shadow-md">
                  {project.client || 'Creative Showcase'}
                </span>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              {/* Bottom Title & Action */}
              <div className="space-y-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h4 className="text-sm font-bold text-white leading-snug drop-shadow-md">
                  {project.title}
                </h4>
                <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--accent,#E5262B)]">
                  <span>Click to expand</span>
                  <span>•</span>
                  <span>{project.year || '2025'}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activeProject && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-2xl animate-in fade-in-0 duration-200"
          onClick={handleCloseLightbox}
        >
          {/* Top Controls Bar */}
          <div
            className="absolute top-4 left-4 right-4 flex items-center justify-between text-white z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[var(--accent,#E5262B)]/30 text-[var(--accent,#E5262B)] border border-[var(--accent,#E5262B)]/40">
                {lightboxIndex + 1} / {projects.length}
              </span>
              <span className="text-xs font-mono text-neutral-400 hidden sm:inline">
                Use Left / Right arrows or Escape
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href={`/work/${activeProject.slug}`}
                onClick={playClickSound}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-[var(--accent,#E5262B)] text-xs font-mono font-bold text-white transition-colors border border-white/15"
              >
                <span>Read Full Case Study</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <button
                onClick={handleCloseLightbox}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/20"
                aria-label="Close image viewer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-[var(--accent,#E5262B)] text-white flex items-center justify-center transition-colors border border-white/15 z-10 shadow-2xl"
            aria-label="Previous artwork"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-[var(--accent,#E5262B)] text-white flex items-center justify-center transition-colors border border-white/15 z-10 shadow-2xl"
            aria-label="Next artwork"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Main Content Container */}
          <div
            className="relative max-w-6xl max-h-[85vh] flex flex-col items-center justify-center space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-neutral-950 shadow-2xl max-h-[75vh] flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeProject.thumbnail}
                alt={activeProject.title}
                className="max-h-[75vh] w-auto max-w-full object-contain block select-none"
              />
            </div>

            {/* Artwork Metadata Bar */}
            <div className="text-center space-y-1 max-w-2xl px-4">
              <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">
                {activeProject.title}
              </h3>
              <p className="text-xs font-mono text-neutral-400">
                {activeProject.client} • {activeProject.year} • Tools: {activeProject.tools.join(', ')}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
