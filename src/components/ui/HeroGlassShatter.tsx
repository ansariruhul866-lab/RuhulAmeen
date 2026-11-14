'use client';

import React, { useMemo } from 'react';

export interface GlassShardDef {
  id: string;
  points: string; // e.g. "0,0 360,0 280,220 0,180"
  centroidX: number;
  centroidY: number;
  initDx: number;
  initDy: number;
  initRot: number;
  initScale: number;
}

export const GLASS_SHARDS: GlassShardDef[] = [
  {
    id: 'top_left',
    points: '0,0 360,0 280,220 0,180',
    centroidX: 160,
    centroidY: 100,
    initDx: -110,
    initDy: -80,
    initRot: -14,
    initScale: 0.9,
  },
  {
    id: 'top_mid',
    points: '360,0 700,0 620,200 280,220',
    centroidX: 490,
    centroidY: 100,
    initDx: 10,
    initDy: -110,
    initRot: 7,
    initScale: 0.92,
  },
  {
    id: 'top_right',
    points: '700,0 1000,0 1000,240 620,200',
    centroidX: 830,
    centroidY: 110,
    initDx: 120,
    initDy: -90,
    initRot: 16,
    initScale: 0.88,
  },
  {
    id: 'mid_left',
    points: '0,180 280,220 240,420 0,390',
    centroidX: 130,
    centroidY: 300,
    initDx: -120,
    initDy: 15,
    initRot: -10,
    initScale: 0.91,
  },
  {
    id: 'center_left',
    points: '280,220 520,210 490,410 240,420',
    centroidX: 380,
    centroidY: 315,
    initDx: -45,
    initDy: 20,
    initRot: -6,
    initScale: 0.94,
  },
  {
    id: 'center_right',
    points: '520,210 780,200 740,420 490,410',
    centroidX: 630,
    centroidY: 310,
    initDx: 50,
    initDy: -15,
    initRot: 9,
    initScale: 0.93,
  },
  {
    id: 'mid_right',
    points: '620,200 1000,240 1000,430 740,420 780,200',
    centroidX: 860,
    centroidY: 310,
    initDx: 130,
    initDy: 10,
    initRot: 12,
    initScale: 0.89,
  },
  {
    id: 'bot_left',
    points: '0,390 240,420 320,600 0,600',
    centroidX: 140,
    centroidY: 500,
    initDx: -105,
    initDy: 95,
    initRot: -12,
    initScale: 0.9,
  },
  {
    id: 'bot_mid_left',
    points: '240,420 490,410 580,600 320,600',
    centroidX: 410,
    centroidY: 510,
    initDx: -25,
    initDy: 110,
    initRot: -5,
    initScale: 0.92,
  },
  {
    id: 'bot_mid_right',
    points: '490,410 740,420 810,600 580,600',
    centroidX: 650,
    centroidY: 510,
    initDx: 35,
    initDy: 105,
    initRot: 7,
    initScale: 0.93,
  },
  {
    id: 'bot_right',
    points: '740,420 1000,430 1000,600 810,600',
    centroidX: 880,
    centroidY: 510,
    initDx: 115,
    initDy: 90,
    initRot: 15,
    initScale: 0.88,
  },
];

interface HeroGlassShatterProps {
  progress: number; // 0 (broken/scattered) -> 1 (fixed/assembled)
  seamFlash: number; // 1 (bright flash) -> 0 (dissolved)
}

export function HeroGlassShatter({ progress, seamFlash }: HeroGlassShatterProps) {
  // Cubic easing for realistic magnetic pull
  // Ease out cubic: 1 - pow(1 - p, 3)
  const p = Math.max(0, Math.min(1, progress));
  const easeFactor = 1 - Math.pow(1 - p, 3);
  const remaining = 1 - easeFactor;

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-40 overflow-hidden rounded-[28px] sm:rounded-[36px] md:rounded-[44px]">
      <svg
        viewBox="0 0 1000 600"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <defs>
          {/* Glass shard gradients */}
          <linearGradient id="shardGlassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
            <stop offset="40%" stopColor="#ffffff" stopOpacity="0.05" />
            <stop offset="80%" stopColor="var(--accent, #E5262B)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.6" />
          </linearGradient>

          {/* Crystalline specular rim */}
          <linearGradient id="specularRim" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="50%" stopColor="var(--accent, #E5262B)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
          </linearGradient>

          {/* Energy Weld Seam Glow Filter */}
          <filter id="seamGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. ANIMATED GLASS SHARDS (magnetic fly-in from scattered positions) */}
        {p < 1 && (
          <g>
            {GLASS_SHARDS.map((shard) => {
              const dx = shard.initDx * remaining;
              const dy = shard.initDy * remaining;
              const rot = shard.initRot * remaining;
              const scale = shard.initScale + (1 - shard.initScale) * easeFactor;
              const opacity = 0.5 + 0.5 * easeFactor;

              return (
                <g
                  key={shard.id}
                  transform={`translate(${shard.centroidX + dx}, ${shard.centroidY + dy}) rotate(${rot}) scale(${scale}) translate(${-shard.centroidX}, ${-shard.centroidY})`}
                  opacity={opacity}
                >
                  {/* Shard Glass Body */}
                  <polygon
                    points={shard.points}
                    fill="url(#shardGlassGrad)"
                    stroke="url(#specularRim)"
                    strokeWidth={1.4 * remaining + 0.8}
                    style={{
                      filter: `drop-shadow(0 15px 30px rgba(0,0,0,${0.6 * remaining}))`,
                    }}
                  />

                  {/* Crystalline Refraction Glint line */}
                  <line
                    x1={shard.centroidX - 30}
                    y1={shard.centroidY - 20}
                    x2={shard.centroidX + 40}
                    y2={shard.centroidY + 25}
                    stroke="#ffffff"
                    strokeWidth={0.8}
                    opacity={0.5 * remaining}
                  />
                </g>
              );
            })}
          </g>
        )}

        {/* 2. WELDED SEAMS FLASH (when glass gets fixed/assembled) */}
        {seamFlash > 0.01 && (
          <g filter="url(#seamGlow)" opacity={seamFlash}>
            {/* Fracture lines between all assembled shards */}
            <line x1="360" y1="0" x2="280" y2="220" stroke="#ffffff" strokeWidth="2.4" />
            <line x1="700" y1="0" x2="620" y2="200" stroke="#ffffff" strokeWidth="2.4" />
            <line x1="0" y1="180" x2="280" y2="220" stroke="var(--accent, #E5262B)" strokeWidth="2" />
            <line x1="280" y1="220" x2="620" y2="200" stroke="#ffffff" strokeWidth="2.8" />
            <line x1="620" y1="200" x2="1000" y2="240" stroke="var(--accent, #E5262B)" strokeWidth="2.2" />

            <line x1="280" y1="220" x2="520" y2="210" stroke="#ffffff" strokeWidth="2.2" />
            <line x1="520" y1="210" x2="780" y2="200" stroke="#ffffff" strokeWidth="2.2" />

            <line x1="0" y1="390" x2="240" y2="420" stroke="var(--accent, #E5262B)" strokeWidth="2.2" />
            <line x1="240" y1="420" x2="490" y2="410" stroke="#ffffff" strokeWidth="2.6" />
            <line x1="490" y1="410" x2="740" y2="420" stroke="#ffffff" strokeWidth="2.8" />
            <line x1="740" y1="420" x2="1000" y2="430" stroke="var(--accent, #E5262B)" strokeWidth="2.2" />

            <line x1="240" y1="420" x2="320" y2="600" stroke="#ffffff" strokeWidth="2.2" />
            <line x1="490" y1="410" x2="580" y2="600" stroke="var(--accent, #E5262B)" strokeWidth="2.2" />
            <line x1="740" y1="420" x2="810" y2="600" stroke="#ffffff" strokeWidth="2.4" />
          </g>
        )}
      </svg>
    </div>
  );
}
