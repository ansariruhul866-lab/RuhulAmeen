'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/types';
import { Play, Maximize2, ExternalLink, Sparkles, Volume2, X, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { playClickSound, playHoverSound } from '@/lib/sound';
import { getDriveImageUrl, getDriveEmbedUrl } from '@/lib/drive';

interface MasterMasonryGalleryProps {
  projects: Project[];
  isShuffled?: boolean;
  onOpenVideo?: (videoUrl: string, title: string) => void;
}

// Deterministic pseudo-random shuffle to ensure SSR & client hydration match exactly
function deterministicShuffle<T>(array: T[], seed: number = 7786): T[] {
  const result = [...array];
  let m = result.length;
  let s = seed;
  while (m) {
    s = (s * 9301 + 49297) % 233280;
    const i = Math.floor((s / 233280) * m--);
    const t = result[m];
    result[m] = result[i];
    result[i] = t;
  }
  return result;
}

export function MasterMasonryGallery({
  projects,
  isShuffled = true,
  onOpenVideo,
}: MasterMasonryGalleryProps) {
  // hoveredVideoId: isolate playback to the hovered video, pausing all others
  const [hoveredVideoId, setHoveredVideoId] = useState<string | null>(null);
  const [lightboxProject, setLightboxProject] = useState<Project | null>(null);

  // Randomly arranged items when isShuffled is true
  const displayedProjects = useMemo(() => {
    if (isShuffled) {
      return deterministicShuffle(projects);
    }
    return projects;
  }, [projects, isShuffled]);

  const handleCardClick = (project: Project) => {
    playClickSound();
    if (project.category === 'video' && project.videoUrl && onOpenVideo) {
      onOpenVideo(project.videoUrl, project.title);
    } else if (project.category === 'web' && project.link) {
      window.open(project.link, '_blank');
    } else {
      // Open thumbnail / image / case study in high-res lightbox
      setLightboxProject(project);
    }
  };

  // Lightbox keyboard controls
  useEffect(() => {
    if (!lightboxProject) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxProject(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [lightboxProject]);

  return (
    <div className="space-y-6 select-none">
      {/* Top Gallery Instruction */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-neutral-400 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[var(--accent,#E5262B)]" />
          <span>Interactive Masonry: Videos isolate on hover • Artworks expand in 4K • Websites launch live</span>
        </div>
        <span className="text-neutral-500 font-bold">{displayedProjects.length} Deployments</span>
      </div>

      {/* Dynamic 4-Column Masonry Wall with Random Interleaved Tiles */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5 [column-fill:_balance]">
        {displayedProjects.map((project, idx) => {
          const isVideo = project.category === 'video';
          const isWeb = project.category === 'web';
          const isThumbnail = project.category === 'thumbnail';
          const isHovered = hoveredVideoId === project.id;
          const isAnyHovered = hoveredVideoId !== null;
          const isPausedByAnother = isAnyHovered && !isHovered && isVideo;
          const embedUrl = isVideo && project.videoUrl ? getDriveEmbedUrl(project.videoUrl) : '';
          const imageUrl = getDriveImageUrl(project.thumbnail);

          // Subtle organic floating motion offset
          const floatDelay = (idx % 5) * 0.4;
          const floatDuration = 6 + (idx % 4) * 1.5;

          return (
            <div
              key={project.id}
              onMouseEnter={() => {
                if (isVideo) {
                  setHoveredVideoId(project.id);
                  playHoverSound();
                }
              }}
              onMouseLeave={() => {
                if (isVideo) setHoveredVideoId(null);
              }}
              onClick={() => handleCardClick(project)}
              className={`break-inside-avoid mb-5 block relative group rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer ${
                isHovered
                  ? 'border-[var(--accent,#E5262B)] shadow-[0_20px_50px_rgba(229,38,43,0.35)] scale-[1.03] z-30'
                  : isPausedByAnother
                  ? 'border-white/5 opacity-40 grayscale-[40%] scale-[0.98]'
                  : 'border-white/10 bg-neutral-950 shadow-xl hover:border-[var(--accent,#E5262B)]/70 hover:shadow-2xl'
              }`}
              style={{
                animation: isHovered
                  ? 'none'
                  : `floatTile ${floatDuration}s ease-in-out infinite ${floatDelay}s`,
              }}
            >
              {/* Media Area: Pure artwork / video with NO cluttered text */}
              <div className="relative w-full bg-neutral-950 overflow-hidden">
                {/* When hovered video is active, mount live video player */}
                {isHovered && embedUrl ? (
                  <div className="relative w-full aspect-[9/16] max-h-[440px] bg-black">
                    <iframe
                      src={`${embedUrl}?autoplay=1`}
                      title={project.title}
                      className="w-full h-full border-0 pointer-events-none"
                      allow="autoplay; encrypted-media"
                    />
                    <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[var(--accent,#E5262B)]/40 text-[10px] font-mono text-[var(--accent,#E5262B)] flex items-center gap-1.5 shadow-lg">
                      <Volume2 className="w-3 h-3 animate-pulse" />
                      <span>Playing</span>
                    </div>
                  </div>
                ) : (
                  /* Ambient Poster Image (Preserves natural aspect ratio without cropping) */
                  <div className="relative w-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imageUrl}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-auto block object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    {/* Bottom vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

                    {/* Centered Play Button for Video */}
                    {isVideo && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div
                          className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl ${
                            isHovered
                              ? 'bg-[var(--accent,#E5262B)] scale-110 shadow-[var(--accent,#E5262B)]/50'
                              : 'bg-black/60 backdrop-blur-md border border-white/20 text-white'
                          }`}
                        >
                          <Play className="w-4 h-4 ml-0.5 fill-current text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Minimalist Glass Card Footer: Title, Category Pill, and Action Icon */}
                <div className="p-3.5 bg-neutral-950/95 border-t border-white/10 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="px-1.5 py-0.5 rounded text-[8px] font-mono uppercase font-bold tracking-wider bg-[var(--accent,#E5262B)]/20 text-[var(--accent,#E5262B)] border border-[var(--accent,#E5262B)]/30">
                        {project.category}
                      </span>
                      {project.client && (
                        <span className="text-[10px] font-mono text-neutral-400 truncate">
                          {project.client}
                        </span>
                      )}
                    </div>
                    <h4 className="text-xs font-bold text-white truncate group-hover:text-[var(--accent,#E5262B)] transition-colors">
                      {project.title}
                    </h4>
                  </div>

                  <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 group-hover:bg-[var(--accent,#E5262B)] group-hover:border-[var(--accent,#E5262B)] text-white flex items-center justify-center shrink-0 transition-colors">
                    {isVideo ? (
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    ) : isWeb ? (
                      <ExternalLink className="w-3.5 h-3.5" />
                    ) : (
                      <Maximize2 className="w-3.5 h-3.5" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal for Fullscreen Artwork Inspection */}
      {lightboxProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={() => setLightboxProject(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[92vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxProject(null)}
              className="absolute -top-12 right-0 p-2.5 rounded-full bg-white/10 hover:bg-[var(--accent,#E5262B)] text-white transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* High-Res Image Display */}
            <div className="relative max-h-[80vh] w-auto overflow-hidden rounded-2xl border border-white/15 bg-neutral-950 shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getDriveImageUrl(lightboxProject.thumbnail)}
                alt={lightboxProject.title}
                className="max-h-[78vh] w-auto object-contain block mx-auto"
              />
            </div>

            {/* Lightbox Caption Bar */}
            <div className="mt-4 px-6 py-3 rounded-full bg-neutral-900/90 border border-white/10 flex items-center justify-between gap-6 max-w-xl w-full text-xs font-mono">
              <span className="text-white font-bold truncate">{lightboxProject.title}</span>
              {lightboxProject.link && (
                <Link
                  href={lightboxProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent,#E5262B)] hover:underline inline-flex items-center gap-1 font-bold whitespace-nowrap"
                >
                  <span>Launch Live</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes floatTile {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-7px);
          }
        }
      `}</style>
    </div>
  );
}
