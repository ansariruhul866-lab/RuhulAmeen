import type { Metadata } from 'next';
import Link from 'next/link';
import { PROJECTS, CATEGORIES } from '@/content/projects';
import { ThumbnailMasonryGallery } from '@/components/ui/ThumbnailMasonryGallery';
import { ArrowLeft, CheckCircle2, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Thumbnail Design & CTR Psychology — Ruhul Ameen',
  description: 'High-CTR thumbnail design, 3D visual depth, color harmony, and curiosity gap architecture engineered to win impressions on YouTube.',
};

export default function ThumbnailDesignPage() {
  const category = CATEGORIES.find((c) => c.key === 'thumbnail')!;
  const thumbProjects = PROJECTS.filter((p) => p.category === 'thumbnail');

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 space-y-20">
      <Link
        href="/work"
        className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 hover:text-[var(--accent,#E5262B)] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Disciplines</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-8 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-[var(--accent,#E5262B)]/10 text-[var(--accent,#E5262B)] border border-[var(--accent,#E5262B)]/20">
            Category 02 / 05
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-neutral-900 dark:text-white">
            {category.name}: Visual CTR Psychology
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {category.description}
          </p>
        </div>

        <div className="lg:col-span-4 p-8 rounded-2xl border border-[var(--accent,#E5262B)]/30 bg-[var(--accent,#E5262B)]/5 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent,#E5262B)] uppercase font-bold tracking-wider">
            <Zap className="w-4 h-4" />
            <span>Benchmark Impact</span>
          </div>
          <div className="text-3xl font-black text-neutral-900 dark:text-white">
            {category.statsTeaser}
          </div>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Consistently tested in A/B split-tests against conventional creator graphics to maximize algorithmic recommendation velocity.
          </p>
        </div>
      </div>

      {/* 600+ word strategy breakdown */}
      <div className="prose dark:prose-invert max-w-none grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-y border-black/10 dark:border-white/10 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[var(--accent,#E5262B)]" />
            The 120-Pixel Test
          </h3>
          <p>
            Over 78% of all YouTube traffic browses on mobile phones where thumbnails render at a physical size of less than two inches. If the focal point of the concept cannot be parsed within 250 milliseconds at 120px scale, the impression is lost.
          </p>
          <p>
            My process initiates with extreme thumbnail down-scaling, aggressive Gaussian contrast isolation, and silhouette verification before a single pixel of detail is rendered.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[var(--accent,#E5262B)]" />
            Curiosity Gap & Title Complement
          </h3>
          <p>
            A common amateur error is repeating the video title inside the thumbnail image. A high-performing thumbnail must create cognitive dissonance with the title: the title asks the question, but the thumbnail implies an unexpected, controversial, or shocking answer.
          </p>
          <p>
            This emotional delta creates the irresistible psychological urge to click without resorting to deceptive clickbait.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[var(--accent,#E5262B)]" />
            3D Specular Depth & Rim Lighting
          </h3>
          <p>
            Flat 2D graphics blend into the feed. By importing creator cutouts and key focal assets into Blender, I generate physically accurate rim lighting, depth-of-field volumetric bokeh, and specular highlights matched to the scene color palette.
          </p>
          <p>
            This elevates the packaging from feeling like a mundane graphic to an authentic cinematic film still.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-neutral-900 dark:text-white">
            Thumbnail Case Studies & Packs
          </h2>
          <span className="text-xs font-mono text-neutral-500">
            {thumbProjects.length} Verified Case Studies
          </span>
        </div>

        <ThumbnailMasonryGallery projects={thumbProjects} />
      </div>

      <div className="p-8 md:p-12 rounded-3xl bg-neutral-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">Struggling with low click-through rates?</h3>
          <p className="text-sm text-neutral-400 max-w-xl">
            Let&apos;s overhaul your thumbnail package and unlock the true organic ceiling of your video catalog.
          </p>
        </div>
        <Link
          href="/contact"
          className="px-6 py-3 rounded-full bg-[var(--accent,#E5262B)] text-white font-bold text-sm uppercase tracking-wider hover:bg-[var(--accent-hover,#ff3338)] transition-colors whitespace-nowrap"
        >
          Request Thumbnail Audit
        </Link>
      </div>
    </div>
  );
}
