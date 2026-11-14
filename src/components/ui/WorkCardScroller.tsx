'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Project, CategoryKey } from '@/types';
import { Play, ExternalLink, ArrowUpRight, ChevronLeft, ChevronRight, Pause, RotateCw, Sparkles, Film, Globe } from 'lucide-react';
import { playHoverSound, playClickSound } from '@/lib/sound';
import { getDriveImageUrl } from '@/lib/drive';

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
  const dragStartX = useRef(0);
  const startRotation = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  // Filter projects by active tab (limit to best 8-10 cards for optimal cylinder geometry)
  const filteredProjects = projects.filter((p) => {
    if (activeTab === 'all') return p.featured;
    return p.category === activeTab;
  }).slice(0, 10);

  const cardCount = Math.max(filteredProjects.length, 6);
  const angleStep = 360 / cardCount;
  // Calculate cylinder radius based on card width (320px) and number of items
  const cardWidth = 320;
  const cylinderRadius = Math.round(cardWidth / (2 * Math.tan(Math.PI / cardCount))) + 40;

  // Continuous smooth auto-rotation loop
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      if (!isPaused && !isDragging) {
        // Slowly rotate ~12 degrees per second
        setRotation((prev) => (prev - 12 * dt) % 360);
      }
      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPaused, isDragging]);

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
    <div className="space-y-8 select-none">
      {/* Top Filter Bar + Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
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
              className={`px-4 py-2 rounded-full text-xs font-mono font-medium transition-all duration-300 ${
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
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <button
            onClick={() => setIsPaused(!isPaused)}
            onMouseEnter={playHoverSound}
            aria-label={isPaused ? 'Resume auto-rotation' : 'Pause auto-rotation'}
            className="p-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-colors"
          >
            {isPaused ? <RotateCw className="w-4 h-4 text-[var(--accent,#E5262B)]" /> : <Pause className="w-4 h-4" />}
          </button>

          <button
            onClick={handlePrev}
            onMouseEnter={playHoverSound}
            aria-label="Previous card in cylinder"
            className="p-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={handleNext}
            onMouseEnter={playHoverSound}
            aria-label="Next card in cylinder"
            className="p-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3D CYLINDER STAGE */}
      <div
        className="relative w-full h-[520px] sm:h-[580px] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          perspective: '1400px',
        }}
      >
        {/* Subtle Ambient Radial Glow behind the cylinder */}
        <div className="absolute w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] rounded-full bg-gradient-to-tr from-[var(--accent,#E5262B)]/20 via-rose-600/10 to-transparent blur-[120px] pointer-events-none" />

        {/* The Rotating 3D Cylinder Group */}
        <div
          className="relative w-[300px] sm:w-[320px] h-[420px] sm:h-[460px] transition-transform ease-out"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateY(${rotation}deg)`,
            transitionDuration: isDragging ? '0ms' : '150ms',
          }}
        >
          {filteredProjects.map((project, idx) => {
            const cardAngle = idx * angleStep;
            // Normalized facing angle to viewer (0 deg = straight ahead)
            const normalizedAngle = ((cardAngle + rotation) % 360 + 360) % 360;
            // Distinguish front from back: cards between 90 deg and 270 deg are in the rear
            const isFacingViewer = normalizedAngle < 90 || normalizedAngle > 270;
            const distanceFactor = Math.abs(180 - normalizedAngle) / 180; // 0 (back) to 1 (front)

            return (
              <div
                key={project.id}
                onClick={() => handleCardClick(project)}
                className="absolute inset-0 rounded-2xl border border-white/15 bg-neutral-950/90 backdrop-blur-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col justify-between transition-all duration-300 hover:border-[var(--accent,#E5262B)] hover:shadow-[0_0_40px_rgba(229,38,43,0.35)] group"
                style={{
                  transform: `rotateY(${cardAngle}deg) translateZ(${cylinderRadius}px)`,
                  transformStyle: 'preserve-3d',
                  opacity: isFacingViewer ? Math.max(distanceFactor, 0.45) : 0.2,
                  pointerEvents: isFacingViewer ? 'auto' : 'none',
                }}
              >
                {/* Visual Thumbnail Area */}
                <div className="relative w-full h-[56%] bg-neutral-900 overflow-hidden border-b border-white/10">
                  <Image
                    src={getDriveImageUrl(project.thumbnail)}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 300px, 320px"
                    className="object-cover object-center filter contrast-[1.05] brightness-[1.02] group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                  {/* Category Pill Tag */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-mono uppercase font-bold text-neutral-200">
                    {project.category}
                  </div>

                  {/* Play / View Button Overlay */}
                  {project.videoUrl && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-[var(--accent,#E5262B)] text-white flex items-center justify-center shadow-lg shadow-[var(--accent,#E5262B)]/40 group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>
                  )}

                  {project.link && (
                    <div className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 border border-white/10 text-white">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>

                {/* Card Details & Results */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-2">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase text-neutral-400">
                        {project.client}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-[var(--accent,#E5262B)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-white leading-snug line-clamp-1 group-hover:text-[var(--accent,#E5262B)] transition-colors">
                      {project.title}
                    </h4>
                  </div>

                  {/* Result Metric */}
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-0.5">
                    <div className="text-[9px] font-mono font-bold text-[var(--accent,#E5262B)] uppercase tracking-wider">
                      Result
                    </div>
                    <p className="text-[11px] text-neutral-300 font-medium line-clamp-2 leading-tight">
                      {project.result}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Cylinder Bottom Shadow & Floor Reflection */}
        <div className="absolute bottom-4 w-3/4 h-8 bg-black/80 blur-xl rounded-full pointer-events-none" />
      </div>

      {/* Interactive Helper Hint */}
      <div className="flex items-center justify-center gap-2 text-xs font-mono text-neutral-400">
        <Sparkles className="w-3.5 h-3.5 text-[var(--accent,#E5262B)]" />
        <span>Drag to spin cylinder • Hover to inspect • Click to play/view</span>
      </div>
    </div>
  );
}
