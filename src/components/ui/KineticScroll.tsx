'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface KineticScrollProps {
  text: string;
  subtext?: string;
}

export function KineticScroll({ text, subtext }: KineticScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!textRef.current || !containerRef.current) return;
      gsap.to(textRef.current, {
        xPercent: -25,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden py-12 border-y border-white/10 select-none"
    >
      <div
        ref={textRef}
        className="flex whitespace-nowrap text-5xl md:text-8xl font-black uppercase tracking-tighter text-white/10"
      >
        <span className="mr-8">{text}</span>
        <span className="mr-8 text-[var(--accent,#E5262B)]/40">•</span>
        <span className="mr-8">{subtext || text}</span>
        <span className="mr-8 text-[var(--accent,#E5262B)]/40">•</span>
        <span className="mr-8">{text}</span>
        <span className="mr-8 text-[var(--accent,#E5262B)]/40">•</span>
        <span className="mr-8">{subtext || text}</span>
      </div>
    </div>
  );
}
