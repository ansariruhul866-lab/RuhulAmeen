import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { PROJECTS } from '@/content/projects';
import { AnatomyViewer } from '@/components/ui/AnatomyViewer';
import { DeviceMockup } from '@/components/ui/DeviceMockup';
import { ArrowLeft, ExternalLink, Calendar, User, CheckCircle2 } from 'lucide-react';
import { getDriveImageUrl, getDriveEmbedUrl } from '@/lib/drive';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return { title: 'Project Not Found — Ruhul Ameen' };
  }

  return {
    title: `${project.title} — Case Study by Ruhul Ameen`,
    description: `Detailed case study on ${project.title}: Problem, Action taken, and quantified Result (${project.result}).`,
  };
}

export default async function ProjectCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const imageUrl = getDriveImageUrl(project.thumbnail);

  return (
    <article className="max-w-5xl mx-auto px-6 md:px-12 py-16 space-y-16">
      {/* Back button */}
      <Link
        href="/work"
        className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 hover:text-[var(--accent,#E5262B)] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Work</span>
      </Link>

      {/* Case Study Header */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider font-semibold bg-[var(--accent,#E5262B)]/10 text-[var(--accent,#E5262B)] border border-[var(--accent,#E5262B)]/20">
            {project.category} Case Study
          </span>
          {project.client && (
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-500">
              <User className="w-3.5 h-3.5" />
              <span>{project.client}</span>
            </span>
          )}
          {project.year && (
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-500">
              <Calendar className="w-3.5 h-3.5" />
              <span>{project.year}</span>
            </span>
          )}
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
          {project.title}
        </h1>

        {/* Live Link Button */}
        {project.link && (
          <div>
            <Link
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--accent,#E5262B)] text-white text-xs font-bold uppercase tracking-wider hover:bg-[var(--accent-hover,#ff3338)] transition-colors"
            >
              <span>Visit Live Deployment</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>

      {/* Stats Callout Bar */}
      {project.stats && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-6 rounded-2xl bg-neutral-950/80 border border-white/10">
          {project.stats.map((stat) => (
            <div key={stat.label} className="space-y-1">
              <div className="text-2xl md:text-3xl font-black text-[var(--accent,#E5262B)]">{stat.value}</div>
              <div className="text-xs font-mono text-neutral-500 uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Hero Mockup or Video Player or Image Showcase */}
      {(project.category === 'web' || project.thumbnail.includes('/images/websites/')) && project.link ? (
        <DeviceMockup url={project.link} title={project.title} image={imageUrl} />
      ) : project.videoUrl ? (
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10">
          <iframe
            src={getDriveEmbedUrl(project.videoUrl)}
            title={project.title}
            className="w-full h-full border-0"
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
          />
        </div>
      ) : (
        <div
          className={`relative w-full rounded-2xl overflow-hidden bg-neutral-900 shadow-2xl ${
            project.thumbnail.includes('/images/websites/') ? 'aspect-[1024/470]' : 'aspect-[16/9]'
          }`}
          style={{ aspectRatio: project.thumbnail.includes('/images/websites/') ? '1024 / 470' : '16 / 9' }}
        >
          <Image
            src={imageUrl}
            alt={project.title}
            fill
            sizes="(max-width: 1200px) 100vw, 1000px"
            className="object-contain"
            priority
          />
        </div>
      )}

      {/* Deep-Dive Problem, Action, Result Sections (600+ words context) */}
      <div className="space-y-12 text-neutral-300 leading-relaxed text-base">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
            The Core Challenge & Context
          </h2>
          <p className="text-sm md:text-base">
            {project.problem}
          </p>
          <p className="text-sm md:text-base text-neutral-500">
            Prior to this initiative, audience engagement metrics suffered from high bounce rates and friction. The primary bottleneck was not a lack of interest, but an experience gap between expectation and actual delivery.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            Strategic Action & Implementation
          </h2>
          <p className="text-sm md:text-base">
            {project.action}
          </p>
          <p className="text-sm md:text-base text-neutral-500">
            We implemented a multi-stage execution framework: diagnosing cognitive drop-offs, standardizing asset delivery pipelines, and engineering micro-interactions that validate each user or viewer step.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="p-4 rounded-xl border border-white/10 bg-white/[0.03] space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase text-[var(--accent,#E5262B)]">Applied Tools & Stack</h4>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span key={tool} className="px-2.5 py-1 rounded bg-neutral-200 dark:bg-neutral-800 text-xs font-mono">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-4 rounded-xl border border-white/10 bg-white/[0.03] space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase text-emerald-500">Execution Velocity</h4>
              <p className="text-xs text-neutral-500">
                Delivered in targeted sprints with end-to-end performance benchmarks and zero regression across mobile browsers.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            Quantified Business & Algorithmic Result
          </h2>
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
              <span>Verified Outcome</span>
            </div>
            <p className="text-base font-semibold">
              {project.result}
            </p>
          </div>
        </section>
      </div>

      {/* Anatomy Viewer Signature Feature */}
      {project.anatomy && (
        <AnatomyViewer
          image={imageUrl}
          title={project.title}
          anatomy={project.anatomy}
        />
      )}

      {/* Case Study Bottom CTA */}
      <div className="p-8 md:p-12 rounded-3xl bg-neutral-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10">
        <div>
          <h3 className="text-2xl font-bold">Want similar results for your brand?</h3>
          <p className="text-sm text-neutral-400 mt-1">
            Let&apos;s build an engineered solution tailored to your growth goals.
          </p>
        </div>
        <Link
          href="/contact"
          className="px-6 py-3 rounded-full bg-[var(--accent,#E5262B)] text-white font-bold text-sm uppercase tracking-wider hover:bg-[var(--accent-hover,#ff3338)] transition-colors whitespace-nowrap"
        >
          Discuss Your Project
        </Link>
      </div>
    </article>
  );
}
