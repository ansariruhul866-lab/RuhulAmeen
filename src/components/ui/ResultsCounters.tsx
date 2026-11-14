'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ResultsCountersProps {
  stats: {
    value: number;
    suffix: string;
    label: string;
    description: string;
  }[];
}

export function ResultsCounters({ stats }: ResultsCountersProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const numbers = containerRef.current?.querySelectorAll('.counter-number');
      if (!numbers) return;

      numbers.forEach((el) => {
        const target = parseFloat(el.getAttribute('data-target') || '0');
        gsap.fromTo(
          el,
          { textContent: '0' },
          {
            textContent: target,
            duration: 1.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
            },
            snap: { textContent: target % 1 === 0 ? 1 : 0.1 },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [stats]);

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 p-6 sm:p-10 md:p-12 rounded-3xl border border-white/10 bg-neutral-950/85 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:border-[var(--accent,#E5262B)]/40 hover:shadow-[0_0_35px_rgba(229,38,43,0.15)] group"
    >
      {stats.map((stat, idx) => (
        <div key={idx} className="min-w-0 flex flex-col justify-between space-y-2.5 border-l border-white/10 pl-4 sm:pl-6 first:border-l-0 first:pl-0">
          <div className="flex items-baseline text-2xl sm:text-4xl md:text-5xl font-sans font-black text-white tracking-tight leading-none">
            <span
              className="counter-number text-[var(--accent,#E5262B)] accent-text-glow font-sans font-black"
              data-target={stat.value}
            >
              {stat.value}
            </span>
            <span className="text-[var(--accent,#E5262B)] font-sans font-black ml-0.5">{stat.suffix}</span>
          </div>
          <div className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-neutral-200 truncate">
            {stat.label}
          </div>
          <p className="text-[11px] sm:text-xs text-neutral-400 leading-relaxed font-sans line-clamp-2">
            {stat.description}
          </p>
        </div>
      ))}
    </div>
  );
}
