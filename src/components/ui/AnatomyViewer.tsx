import Image from 'next/image';
import { Target, Scissors, Sparkles, TrendingUp } from 'lucide-react';

interface AnatomyViewerProps {
  image: string;
  title: string;
  anatomy: {
    hook: string;
    edit: string;
    thumbnail: string;
    result: string;
  };
}

export function AnatomyViewer({ image, title, anatomy }: AnatomyViewerProps) {
  const steps = [
    {
      label: '1. The Hook',
      desc: anatomy.hook,
      icon: Target,
      color: 'text-red-500',
      border: 'border-red-500/30',
      bg: 'bg-red-500/10',
    },
    {
      label: '2. The Edit / Architecture',
      desc: anatomy.edit,
      icon: Scissors,
      color: 'text-amber-500',
      border: 'border-amber-500/30',
      bg: 'bg-amber-500/10',
    },
    {
      label: '3. Packaging / Visual',
      desc: anatomy.thumbnail,
      icon: Sparkles,
      color: 'text-cyan-500',
      border: 'border-cyan-500/30',
      bg: 'bg-cyan-500/10',
    },
    {
      label: '4. Quantified Result',
      desc: anatomy.result,
      icon: TrendingUp,
      color: 'text-emerald-500',
      border: 'border-emerald-500/30',
      bg: 'bg-emerald-500/10',
    },
  ];

  const isWebsite = image.includes('/images/websites/');

  return (
    <div className="space-y-8 rounded-3xl border border-black/10 dark:border-white/10 bg-neutral-100 dark:bg-[#0c1017] p-6 md:p-10">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-[var(--accent,#E5262B)]/10 text-[var(--accent,#E5262B)]">
          Signature Feature
        </div>
        <h3 className="text-2xl font-black text-neutral-900 dark:text-white">
          Case Study Anatomy: Deconstructed Architecture
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          How individual creative choices, technical levers, and distribution mechanics compound into measurable outcomes.
        </p>
      </div>

      {/* Main Image with Annotation Overlays - dynamically sized to screenshot ratio */}
      <div
        className={`relative w-full rounded-2xl overflow-hidden bg-black border border-black/10 dark:border-white/10 shadow-xl ${
          isWebsite ? 'aspect-[1024/470]' : 'aspect-[16/9]'
        }`}
        style={{ aspectRatio: isWebsite ? '1024 / 470' : '16 / 9' }}
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 1200px) 100vw, 1200px"
          className="object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* Dynamic callout points */}
        <div className="absolute top-[20%] left-[15%] hidden md:flex items-center gap-2 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-red-500/40 text-xs text-white">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span>Hook Trigger</span>
        </div>
        <div className="absolute top-[50%] left-[55%] hidden md:flex items-center gap-2 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-amber-500/40 text-xs text-white">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span>Pacing Rhythm</span>
        </div>
        <div className="absolute bottom-[20%] right-[15%] hidden md:flex items-center gap-2 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-emerald-500/40 text-xs text-white">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Conversion Lift</span>
        </div>
      </div>

      {/* 4-Step Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.label}
              className={`p-5 rounded-2xl border ${step.border} ${step.bg} space-y-2`}
            >
              <div className="flex items-center gap-2">
                <Icon className={`w-4 h-4 ${step.color}`} />
                <h4 className={`text-xs font-mono uppercase tracking-wider font-bold ${step.color}`}>
                  {step.label}
                </h4>
              </div>
              <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium">
                {step.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
