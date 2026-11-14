'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Project, CategoryKey } from '@/types';
import { Play, ExternalLink, ArrowUpRight, ChevronLeft, ChevronRight, Pause, RotateCw, Sparkles, Volume2 } from 'lucide-react';
import { playHoverSound, playClickSound } from '@/lib/sound';
import { getDriveImageUrl, getDriveEmbedUrl } from '@/lib/drive';

interface WorkCardScrollerProps {
  projects: Project[];
  onOpenVideo?: (videoUrl: string, title: string) => void;
  onOpenLightbox?: (project: Project) => void;
}

export function WorkCardScroller({ projects, onOpenVideo, onOpenLightbox }: WorkCardScrollerProps) {
  const [activeTab, setActiveTab] = useState<CategoryKey | 'all'>('all');
  const [rotation, setRotation] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const dragStartX = useRef(0);
  const startRotation = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  // Filter projects by active tab (8 cards for ideal cylinder geometry)
  const filteredProjects = projects.filter((p) => {
    if (activeTab === 'all') return p.featured;
    return p.category === activeTab;
  }).slice(0, 8);

  const cardCount = Math.max(filteredProjects.length, 6);
  const angleStep = 360 / cardCount;
  // Compact, calibrated card width & cylinder radius so videos are seen in full without clipping
  const cardWidth = 260;
  const cylinderRadius = Math.round(cardWidth / (2 * Math.tan(Math.PI / cardCount))) + 25;

  // Continuous smooth auto-rotation loop
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      if (!isPaused && !isDragging && hoveredCardId === null) {
        // Slowly rotate ~11 degrees per second
        setRotation((prev) => (prev - 11 * dt) % 360);
      }
      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPaused, isDragging, hoveredCardId]);

  const handleNext = () => {
    playClickSound();
    setRotation((prev) => Math.round((prev - angleStep) / angleStep) * angleStep);
  };

  const handlePrev = () => {
    playClickSound();
    setRotation((prev) => Math.round((prev + angleStep) / angleStep) * angleStep);
  };

  // Drag interaction for direct touch / mouse spin
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    startRotation.current = rotation;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartX.current;
    setRotation(startRotation.current + deltaX * 0.35);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    dragStartX.current = e.touches[0].clientX;
    startRotation.current = rotation;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - dragStartX.current;
    setRotation(startRotation.current + deltaX * 0.4);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const categoriesList: { key: CategoryKey | 'all'; label: string }[] = [
    { key: 'all', label: 'Featured' },
    { key: 'video', label: 'Video Editing' },
    { key: 'thumbnail', label: 'Thumbnails' },
    { key: 'web', label: 'Websites' },
    { key: 'seo', label: 'SEO & Growth' },
    { key: 'ai', label: 'AI Tools' },
  ];

  const handleCardClick = (project: Project) => {
    playClickSound();
    if (project.videoUrl && onOpenVideo) {
      onOpenVideo(project.videoUrl, project.title);
    } else if (onOpenLightbox) {
      onOpenLightbox(project);
    }
  };

  return (
    <div className="space-y-6 select-none">
      {/* Top Filter Bar + Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categoriesList.map((cat) => (
            <button
              key={cat.key}
              onClick={() => {
                playClickSound();
                setActiveTab(cat.key);
                setRotation(0);
              }}
              onMouseEnter={playHoverSound}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-300 ${
                activeTab === cat.key
                  ? 'bg-[var(--accent,#E5262B)] text-white shadow-lg shadow-[var(--accent,#E5262B)]/30 font-bold scale-105'
                  : 'bg-white/5 text-neutral-300 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Cylinder Controls */}
        <div className="flex items-center gap-2.5 self-end sm:self-auto">
          <button
            onClick={() => setIsPaused(!isPaused)}
            onMouseEnter={playHoverSound}
            aria-label={isPaused ? 'Resume auto-rotation' : 'Pause auto-rotation'}
            className="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-colors"
          >
            {isPaused ? <RotateCw className="w-4 h-4 text-[var(--accent,#E5262B)]" /> : <Pause className="w-4 h-4" />}
          </button>

          <button
            onClick={handlePrev}
            onMouseEnter={playHoverSound}
            aria-label="Previous card in cylinder"
            className="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={handleNext}
            onMouseEnter={playHoverSound}
            aria-label="Next card in cylinder"
            className="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3D CYLINDER STAGE — Compact, Calibrated Viewport */}
      <div
        className="relative w-full h-[440px] sm:h-[480px] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          perspective: '1200px',
        }}
      >
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-[var(--accent,#E5262B)]/20 via-rose-600/10 to-transparent blur-[100px] pointer-events-none" />

        {/* The Rotating 3D Cylinder Group */}
        <div
          className="relative w-[250px] sm:w-[270px] h-[370px] sm:h-[400px] transition-transform ease-out"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateY(${rotation}deg)`,
            transitionDuration: isDragging ? '0ms' : '120ms',
          }}
        >
          {filteredProjects.map((project, idx) => {
            const cardAngle = idx * angleStep;
            const normalizedAngle = ((cardAngle + rotation) % 360 + 360) % 360;
            const isFacingViewer = normalizedAngle < 85 || normalizedAngle > 275;
            const distanceFactor = Math.abs(180 - normalizedAngle) / 180;
            const isHovered = hoveredCardId === project.id;
            const embedUrl = project.videoUrl ? getDriveEmbedUrl(project.videoUrl) : '';

            return (
              <div
                key={project.id}
                onMouseEnter={() => {
                  setHoveredCardId(project.id);
                  playHoverSound();
                }}
                onMouseLeave={() => setHoveredCardId(null)}
                onClick={() => handleCardClick(project)}
                className={`absolute inset-0 rounded-2xl border bg-neutral-950 backdrop-blur-xl overflow-hidden shadow-2xl flex flex-col justify-between transition-all duration-300 group ${
                  isHovered
                    ? 'border-[var(--accent,#E5262B)] shadow-[0_0_40px_rgba(229,38,43,0.45)] scale-105 z-30'
                    : 'border-white/15 hover:border-white/30'
                }`}
                style={{
                  transform: `rotateY(${cardAngle}deg) translateZ(${cylinderRadius}px)`,
                  transformStyle: 'preserve-3d',
                  opacity: isFacingViewer ? Math.max(distanceFactor, 0.5) : 0.2,
                  pointerEvents: isFacingViewer ? 'auto' : 'none',
                }}
              >
                {/* Visual Video / Artwork Area (Takes 82% of card height for complete visibility) */}
                <div className="relative w-full h-[82%] bg-black overflow-hidden">
                  {isHovered && embedUrl ? (
                    <iframe
                      src={`${embedUrl}?autoplay=1`}
                      title={project.title}
                      className="w-full h-full border-0 pointer-events-none"
                      allow="autoplay; encrypted-media"
                    />
                  ) : (
                    <>
                      <Image
                        src={getDriveImageUrl(project.thumbnail)}
                        alt={project.title}
                        fill
                        sizes="(max-width: 640px) 250px, 270px"
                        className="object-contain sm:object-cover object-center filter contrast-[1.05] brightness-[1.02] group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                      {/* Category Pill Tag */}
                      <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[9px] font-mono uppercase font-bold text-neutral-200">
                        {project.category}
                      </div>

                      {/* Play Button Overlay */}
                      {project.videoUrl && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-11 h-11 rounded-full bg-[var(--accent,#E5262B)] text-white flex items-center justify-center shadow-xl shadow-[var(--accent,#E5262B)]/40 group-hover:scale-110 transition-transform">
                            <Play className="w-4 h-4 fill-current ml-0.5" />
                          </div>
                        </div>
                      )}

                      {project.link && (
                        <div className="absolute top-2.5 right-2.5 p-1 rounded-full bg-black/60 border border-white/10 text-white">
                          <ExternalLink className="w-3 h-3" />
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Streamlined Bottom Bar (18% height: title & client only) */}
                <div className="h-[18%] px-3.5 py-2 bg-neutral-950 border-t border-white/10 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-white leading-tight truncate group-hover:text-[var(--accent,#E5262B)] transition-colors">
                      {project.title}
                    </h4>
                    {project.client && (
                      <p className="text-[10px] font-mono text-neutral-400 truncate">
                        {project.client}
                      </p>
                    )}
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-[var(--accent,#E5262B)] shrink-0 transition-colors" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Cylinder Floor Shadow */}
        <div className="absolute bottom-2 w-2/3 h-6 bg-black/90 blur-xl rounded-full pointer-events-none" />
      </div>

      {/* Interactive Helper Hint */}
      <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-neutral-400">
        <Sparkles className="w-3.5 h-3.5 text-[var(--accent,#E5262B)]" />
        <span>Drag to rotate cylinder • Hover to play preview • Click to expand in 4K</span>
      </div>
    </div>
  );
}
