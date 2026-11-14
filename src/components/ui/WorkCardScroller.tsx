'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Project, CategoryKey } from '@/types';
import { Play, ExternalLink, ArrowUpRight, ChevronLeft, ChevronRight, Sparkles, Eye, TrendingUp, Bot, Film, Globe } from 'lucide-react';
import { playHoverSound, playClickSound } from '@/lib/sound';
import { getDriveImageUrl } from '@/lib/drive';

interface WorkCardScrollerProps {
  projects: Project[];
  onOpenVideo?: (videoUrl: string, title: string) => void;
  onOpenLightbox?: (project: Project) => void;
}

export function WorkCardScroller({ projects, onOpenVideo, onOpenLightbox }: WorkCardScrollerProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<CategoryKey | 'all'>('all');
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Filter projects by active tab
  const filteredProjects = projects.filter((p) => {
    if (activeTab === 'all') return p.featured;
    return p.category === activeTab;
  });

  const checkScroll = () => {
    if (!scrollerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      setScrollProgress((scrollLeft / maxScroll) * 100);
    }
  };

  useEffect(() => {
    checkScroll();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [filteredProjects]);

  const handleScroll = (direction: 'left' | 'right') => {
    playClickSound();
    if (!scrollerRef.current) return;
    const cardWidth = 380;
    scrollerRef.current.scrollBy({
      left: direction === 'left' ? -cardWidth * 1.5 : cardWidth * 1.5,
      behavior: 'smooth',
    });
  };

  const categoriesList: { key: CategoryKey | 'all'; label: string }[] = [
    { key: 'all', label: 'Featured' },
    { key: 'video', label: 'Video Editing' },
    { key: 'thumbnail', label: 'Thumbnails' },
    { key: 'web', label: 'Websites' },
    { key: 'seo', label: 'SEO & Growth' },
    { key: 'ai', label: 'AI Tools' },
  ];

  return (
    <div className="space-y-8">
      {/* Top Bar: 5-Category Filter Pills + Carousel Navigation Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {categoriesList.map((cat) => (
            <button
              key={cat.key}
              onClick={() => {
                playClickSound();
                setActiveTab(cat.key);
              }}
              className={`px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all select-none ${
                activeTab === cat.key
                  ? 'bg-[var(--accent,#E5262B)] text-white shadow-lg shadow-[var(--accent,#E5262B)]/25 scale-105'
                  : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Carousel Arrow Controls */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <button
            onClick={() => handleScroll('left')}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            className="w-11 h-11 rounded-full border border-white/15 bg-white/5 hover:bg-[var(--accent,#E5262B)] hover:border-[var(--accent,#E5262B)] disabled:opacity-30 disabled:pointer-events-none text-white flex items-center justify-center transition-all shadow-md"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleScroll('right')}
            disabled={!canScrollRight}
            aria-label="Scroll right"
            className="w-11 h-11 rounded-full border border-white/15 bg-white/5 hover:bg-[var(--accent,#E5262B)] hover:border-[var(--accent,#E5262B)] disabled:opacity-30 disabled:pointer-events-none text-white flex items-center justify-center transition-all shadow-md"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroller Rail */}
      <div
        ref={scrollerRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 pt-2 no-scrollbar scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {filteredProjects.map((project) => {
          const imageUrl = getDriveImageUrl(project.thumbnail);
          const isWebsite = project.category === 'web' || project.thumbnail.includes('/images/websites/');
          const isVideo = !!project.videoUrl;
          const isThumbnail = project.category === 'thumbnail';
          const isSeo = project.category === 'seo';

          const cursorLabel = isVideo ? 'Play' : isWebsite ? 'View' : 'Open';

          return (
            <article
              key={project.id}
              data-cursor={cursorLabel}
              className="w-[310px] sm:w-[370px] md:w-[400px] shrink-0 snap-start flex flex-col rounded-3xl border border-white/12 bg-neutral-950/80 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[var(--accent,#E5262B)]/25 hover:border-[var(--accent,#E5262B)]/60 group relative [transform-style:preserve-3d]"
            >
              {/* Top Control Header Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#0c101a] border-b border-white/10 text-xs">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-[var(--accent,#E5262B)]/20 text-[var(--accent,#E5262B)] border border-[var(--accent,#E5262B)]/30 ml-1">
                    {project.category}
                  </span>
                </div>

                {project.link ? (
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-[var(--accent,#E5262B)] text-neutral-300 hover:text-white transition-all text-[11px] font-mono font-medium border border-white/10"
                  >
                    <span>Visit site</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                ) : isVideo ? (
                  <span className="flex items-center gap-1.5 text-[11px] font-mono text-[var(--accent,#E5262B)] font-bold">
                    <Play className="w-3 h-3 fill-current" />
                    <span>4K Preview</span>
                  </span>
                ) : (
                  <span className="text-[11px] font-mono text-neutral-400">
                    {project.year || '2025'}
                  </span>
                )}
              </div>

              {/* Media Canvas */}
              <div
                className="relative w-full overflow-hidden bg-neutral-950 border-b border-white/10 cursor-pointer"
                style={{ aspectRatio: isWebsite ? '1024 / 470' : '16 / 9' }}
                onClick={() => {
                  if (isVideo && onOpenVideo && project.videoUrl) {
                    onOpenVideo(project.videoUrl, project.title);
                  } else if (isThumbnail && onOpenLightbox) {
                    onOpenLightbox(project);
                  }
                }}
              >
                <Image
                  src={imageUrl}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 310px, 400px"
                  className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-[1.03]"
                />

                {/* Video Play Button Overlay */}
                {isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/35 group-hover:bg-black/15 transition-colors">
                    <div className="w-14 h-14 rounded-full bg-[var(--accent,#E5262B)] text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform shadow-[var(--accent,#E5262B)]/50">
                      <Play className="w-6 h-6 ml-0.5 fill-white" />
                    </div>
                  </div>
                )}

                {/* Thumbnail Lightbox Expand Indicator */}
                {isThumbnail && (
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white">
                      <Eye className="w-4 h-4" />
                    </div>
                  </div>
                )}
              </div>

              {/* Sleek Content Footer */}
              <div className="flex flex-1 flex-col p-5 space-y-3.5">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base font-bold text-white group-hover:text-[var(--accent,#E5262B)] transition-colors leading-snug line-clamp-1">
                      {project.title}
                    </h3>
                    <Link
                      href={`/work/${project.slug}`}
                      aria-label={`View ${project.title} case study`}
                      className="text-neutral-400 hover:text-[var(--accent,#E5262B)] transition-colors shrink-0"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                  {project.client && (
                    <p className="text-xs font-mono text-neutral-400 mt-1 line-clamp-1">
                      {project.client}
                    </p>
                  )}
                </div>

                {/* Performance Metric Pill */}
                <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between text-xs">
                  <span className="font-mono text-neutral-400 uppercase tracking-wider text-[10px]">
                    Impact:
                  </span>
                  <span className="font-bold text-[var(--accent,#E5262B)] font-mono text-[11px] truncate ml-2">
                    {project.result}
                  </span>
                </div>

                {/* Tool Pills */}
                <div className="mt-auto pt-3 flex flex-wrap gap-1.5 border-t border-white/10">
                  {project.tools.slice(0, 3).map((tool) => (
                    <span
                      key={tool}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/10 text-neutral-300 border border-white/5"
                    >
                      {tool}
                    </span>
                  ))}
                  {project.tools.length > 3 && (
                    <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono text-neutral-500">
                      +{project.tools.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Progress Bar & Counter Strip */}
      <div className="flex items-center justify-between gap-6 pt-2">
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <Sparkles className="w-3.5 h-3.5 text-[var(--accent,#E5262B)]" />
          <span>Showing {filteredProjects.length} verified projects in {activeTab === 'all' ? 'Featured' : activeTab}</span>
        </div>

        {/* Progress track */}
        <div className="w-36 sm:w-56 h-1 rounded-full bg-white/10 overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-[var(--accent,#E5262B)] to-amber-400 rounded-full transition-all duration-150"
            style={{ width: `${Math.max(15, scrollProgress)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
