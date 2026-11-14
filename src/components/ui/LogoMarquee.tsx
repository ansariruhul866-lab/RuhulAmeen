'use client';

import { CLIENT_LOGOS } from '@/content/projects';

export function LogoMarquee() {
  const allLogos = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <div className="relative w-full overflow-hidden py-8 border-y border-black/10 dark:border-white/10">
      {/* Gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--bg-main)] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--bg-main)] to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-[marquee_25s_linear_infinite] gap-12">
        {allLogos.map((client, index) => (
          <div
            key={index}
            className="flex items-center gap-3 shrink-0 px-4 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--accent,#E5262B)]" />
            <span className="font-bold text-sm text-neutral-800 dark:text-neutral-200">
              {client.name}
            </span>
            <span className="text-[11px] font-mono text-neutral-500 uppercase">
              ({client.type})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
