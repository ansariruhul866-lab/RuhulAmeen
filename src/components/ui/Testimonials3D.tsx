'use client';

import Image from 'next/image';
import { TESTIMONIALS } from '@/content/projects';
import { Quote } from 'lucide-react';

export function Testimonials3D() {
  return (
    <div className="space-y-8">
      <div className="text-center max-w-xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-[var(--accent,#E5262B)]/10 text-[var(--accent,#E5262B)]">
          Verified Endorsements
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-neutral-900 dark:text-white">
          Client Proof of Work
        </h2>
        <p className="text-xs md:text-sm text-neutral-500">
          Direct words from founders, clinicians, and agency growth heads.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TESTIMONIALS.map((t, idx) => (
          <div
            key={idx}
            className="p-8 rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0c1017] flex flex-col justify-between space-y-6 hover:border-[var(--accent,#E5262B)]/40 transition-all shadow-sm"
          >
            <div className="space-y-4">
              <Quote className="w-8 h-8 text-[var(--accent,#E5262B)]/40" />
              <p className="text-sm md:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed italic">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-black/5 dark:border-white/5">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[var(--accent,#E5262B)]/40 shrink-0">
                <Image
                  src={t.avatar}
                  alt={t.author}
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold text-sm text-neutral-900 dark:text-white">
                  {t.author}
                </h4>
                <p className="text-xs text-neutral-500 font-mono">
                  {t.role} • {t.company}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
