'use client';

import React, { useState } from 'react';
import { Project } from '@/types';
import { Play, Maximize2, ExternalLink, Sparkles, Volume2 } from 'lucide-react';
import { playClickSound, playHoverSound } from '@/lib/sound';
import { getDriveImageUrl, getDriveEmbedUrl } from '@/lib/drive';

interface VideoMasonryGalleryProps {
  projects: Project[];
  onOpenVideo?: (videoUrl: string, title: string) => void;
}

export function VideoMasonryGallery({ projects, onOpenVideo }: VideoMasonryGalleryProps) {
  // hoveredVideoId: when null, all videos play ambiently.
  // when set to an ID, only that video plays and every other video stops.
  const [hoveredVideoId, setHoveredVideoId] = useState<string | null>(null);

  const handleCardClick = (project: Project) => {
    playClickSound();
    if (project.videoUrl && onOpenVideo) {
      onOpenVideo(project.videoUrl, project.title);
    }
  };

  return (
    <div className="space-y-6">
      {/* Visual Instruction Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-neutral-400 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[var(--accent,#E5262B)]" />
          <span>Hover on any video to isolate playback • Click to watch in 4K full-screen modal</span>
        </div>
        <span className="text-neutral-500 font-bold">{projects.length} Video Deployments</span>
      </div>

      {/* Dynamic Masonry Columns Layout with Staggered Random Floating Motion */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5 [column-fill:_balance]">
        {projects.map((project, idx) => {
          const isHovered = hoveredVideoId === project.id;
          const isAnyHovered = hoveredVideoId !== null;
          const isPausedByAnother = isAnyHovered && !isHovered;
          const embedUrl = project.videoUrl ? getDriveEmbedUrl(project.videoUrl) : '';
          const imageUrl = getDriveImageUrl(project.thumbnail);

          // Subtle organic floating animation classes based on index
          const floatDelay = (idx % 4) * 0.5;
          const floatDuration = 6 + (idx % 3) * 2;

          return (
            <div
              key={project.id}
              onMouseEnter={() => {
                setHoveredVideoId(project.id);
                playHoverSound();
              }}
              onMouseLeave={() => setHoveredVideoId(null)}
              onClick={() => handleCardClick(project)}
              className={`break-inside-avoid mb-5 block relative group rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer select-none ${
                isHovered
                  ? 'border-[var(--accent,#E5262B)] shadow-[0_20px_50px_rgba(229,38,43,0.35)] scale-[1.03] z-30'
                  : isPausedByAnother
                  ? 'border-white/5 opacity-40 grayscale-[40%] scale-[0.98]'
                  : 'border-white/10 bg-neutral-950/90 shadow-xl hover:border-white/20'
              }`}
              style={{
                animation: isHovered
                  ? 'none'
                  : `floatVideo ${floatDuration}s ease-in-out infinite ${floatDelay}s`,
              }}
            >
              {/* Media Container: Vertical Reel or Horizontal Video */}
              <div className="relative w-full bg-neutral-950 overflow-hidden min-h-[220px]">
                {/* Active Hover Player: when hovered, mounts live video preview */}
                {isHovered && embedUrl ? (
                  <div className="relative w-full aspect-[9/16] max-h-[460px] bg-black">
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
                  /* Ambient Poster Image */
                  <div className="relative w-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imageUrl}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-auto block object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Dark gradient vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                    {/* Centered Play Button Pill */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl ${
                          isHovered
                            ? 'bg-[var(--accent,#E5262B)] scale-110 shadow-[var(--accent,#E5262B)]/50'
                            : 'bg-black/60 backdrop-blur-md border border-white/20 text-white'
                        }`}
                      >
                        <Play className="w-5 h-5 ml-0.5 fill-current text-white" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Minimal Overlay Bar at bottom with Title and Client (NO cluttered text) */}
                <div className="p-3.5 bg-gradient-to-t from-black via-black/90 to-transparent flex items-center justify-between gap-2 border-t border-white/5">
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-white truncate group-hover:text-[var(--accent,#E5262B)] transition-colors">
                      {project.title}
                    </h4>
                    {project.client && (
                      <p className="text-[10px] font-mono text-neutral-400 truncate">
                        {project.client}
                      </p>
                    )}
                  </div>
                  <div className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-[var(--accent,#E5262B)] text-white flex items-center justify-center shrink-0 transition-colors">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style jsx global>{`
        @keyframes floatVideo {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
      `}</style>
    </div>
  );
}
