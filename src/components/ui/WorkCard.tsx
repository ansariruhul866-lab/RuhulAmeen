'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Play, ExternalLink } from 'lucide-react';
import { Project } from '@/types';
import { getDriveImageUrl } from '@/lib/drive';

interface WorkCardProps {
  project: Project;
  onOpenVideo?: (videoUrl: string, title: string) => void;
}

export function WorkCard({ project, onOpenVideo }: WorkCardProps) {
  const imageUrl = getDriveImageUrl(project.thumbnail);
  const isWebsite =
    project.category === 'web' ||
    project.id === 'ai-outrank' ||
    project.thumbnail.includes('/images/websites/');

  const handleCardClick = () => {
    if (project.videoUrl && onOpenVideo) {
      onOpenVideo(project.videoUrl, project.title);
    }
  };

  return (
    <article
      className="group relative flex flex-col rounded-3xl border border-white/12 bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-transparent backdrop-blur-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[var(--accent,#E5262B)]/20 hover:border-[var(--accent,#E5262B)]/60 hover:-translate-y-1.5"
    >
      {/* Top Browser / Control Header Bar - Ensures thumbnail content is 100% visible with zero overlay obstruction */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0e1320] border-b border-white/10 text-xs">
        <div className="flex items-center gap-2">
          {/* Browser traffic dots */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-[var(--accent,#E5262B)]/20 text-[var(--accent,#E5262B)] border border-[var(--accent,#E5262B)]/30 ml-1">
            {project.category}
          </span>
        </div>

        {/* Live Site link or Video Badge */}
        {project.link ? (
          <Link
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-[var(--accent,#E5262B)] text-neutral-300 hover:text-white transition-all text-xs font-mono font-medium border border-white/10 shadow-sm"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        ) : project.videoUrl ? (
          <span className="flex items-center gap-1.5 text-xs font-mono text-neutral-400">
            <Play className="w-3 h-3 fill-[var(--accent,#E5262B)] text-[var(--accent,#E5262B)]" />
            <span>4K Reel</span>
          </span>
        ) : null}
      </div>

      {/* Unobstructed Media Canvas - Exact 1024x470 ratio for websites, 16:9 for videos */}
      <div
        className="relative w-full overflow-hidden bg-neutral-950 border-b border-white/10"
        style={{ aspectRatio: isWebsite ? '1024 / 470' : '16 / 9' }}
      >
        <Image
          src={imageUrl}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-[1.02]"
          priority={project.featured}
        />

        {/* Video Play Overlay */}
        {project.videoUrl && (
          <button
            onClick={handleCardClick}
            aria-label={`Watch ${project.title} preview`}
            className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors"
          >
            <div className="w-14 h-14 rounded-full bg-[var(--accent,#E5262B)] text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
              <Play className="w-6 h-6 ml-0.5 fill-white" />
            </div>
          </button>
        )}
      </div>

      {/* Structured Content: Problem -> Action -> Result */}
      <div className="flex flex-1 flex-col p-6 space-y-4">
        <div>
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-lg font-bold text-white group-hover:text-[var(--accent,#E5262B)] transition-colors leading-snug">
              {project.title}
            </h3>
            <Link
              href={`/work/${project.slug}`}
              aria-label={`View ${project.title} case study`}
              className="text-neutral-400 group-hover:text-[var(--accent,#E5262B)] transition-colors"
            >
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
          {project.client && (
            <p className="text-xs font-mono text-neutral-400 mt-1">Client: {project.client} • {project.year}</p>
          )}
        </div>

        {/* Clean, Streamlined Details — No Problem/Action/Result text clutter on video or thumbnail cards */}
        {project.category !== 'video' && project.category !== 'thumbnail' ? (
          <div className="space-y-2.5 text-xs text-neutral-300">
            <div>
              <span className="font-bold text-rose-400 uppercase tracking-wider">Problem: </span>
              <span className="text-neutral-300">{project.problem}</span>
            </div>
            <div>
              <span className="font-bold text-amber-300 uppercase tracking-wider">Action: </span>
              <span className="text-neutral-300">{project.action}</span>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 shadow-inner">
              <span className="font-bold uppercase tracking-wider text-emerald-400">Result: </span>
              <span className="font-semibold">{project.result}</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs">
            <span className="font-mono text-neutral-400">Verified Metric</span>
            <span className="font-bold text-[var(--accent,#E5262B)] font-mono">{project.result}</span>
          </div>
        )}

        {/* Tools Badges */}
        <div className="mt-auto pt-4 flex flex-wrap gap-1.5 border-t border-white/10">
          {project.tools.map((tool) => (
            <span
              key={tool}
              className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-white/10 text-neutral-200 border border-white/5"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
