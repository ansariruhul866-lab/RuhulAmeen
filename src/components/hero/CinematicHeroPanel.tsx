'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { playClickSound, playHoverSound } from '@/lib/sound';

export function CinematicHeroPanel() {
  const panelRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  // Animation Sequence Stage:
  const [stage, setStage] = useState<'converging' | 'assembled'>('converging');

  useEffect(() => {
    const t = setTimeout(() => {
      setStage('assembled');
    }, 450);

    return () => clearTimeout(t);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  // Flying glass particles/shards that join together to form the container
  const convergingShards = [
    { id: 1, initX: -350, initY: -220, initRot: -45, width: 140, height: 90 },
    { id: 2, initX: 420, initY: -260, initRot: 35, width: 180, height: 110 },
    { id: 3, initX: -400, initY: 180, initRot: 60, width: 160, height: 100 },
    { id: 4, initX: 380, initY: 240, initRot: -30, width: 150, height: 95 },
    { id: 5, initX: 0, initY: -320, initRot: 15, width: 200, height: 80 },
    { id: 6, initX: 0, initY: 340, initRot: -20, width: 210, height: 85 },
    { id: 7, initX: -500, initY: 0, initRot: -15, width: 120, height: 160 },
    { id: 8, initX: 520, initY: 10, initRot: 25, width: 130, height: 170 },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 relative">
      {/* ============================================================ */}
      {/* STAGE 1: GLASS PARTICLES / SHARDS CONVERGING ANIMATION       */}
      {/* ============================================================ */}
      <AnimatePresence>
        {stage !== 'assembled' && (
          <div className="absolute inset-0 pointer-events-none z-40 flex items-center justify-center overflow-visible">
            {convergingShards.map((shard) => (
              <motion.div
                key={shard.id}
                initial={{
                  x: shard.initX,
                  y: shard.initY,
                  rotate: shard.initRot,
                  opacity: 0,
                  scale: 0.4,
                }}
                animate={{
                  x: stage === 'converging' ? 0 : shard.initX,
                  y: stage === 'converging' ? 0 : shard.initY,
                  rotate: stage === 'converging' ? 0 : shard.initRot,
                  opacity: stage === 'converging' ? [0, 0.9, 0.4] : 0,
                  scale: stage === 'converging' ? 1 : 0.4,
                }}
                transition={{
                  duration: 1.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute rounded-2xl border border-[var(--accent,#E5262B)]/40 bg-gradient-to-br from-white/10 via-[var(--accent,#E5262B)]/15 to-transparent backdrop-blur-md shadow-[0_0_25px_rgba(229,38,43,0.3)]"
                style={{
                  width: `${shard.width}px`,
                  height: `${shard.height}px`,
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* STAGE 2 & 3: WIDE FRAMED GLASS CONTAINER FORMED              */}
      {/* ============================================================ */}
      <motion.div
        ref={panelRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setMousePos({ x: 0, y: 0 });
        }}
        initial={{ opacity: 0.3, scale: 0.97 }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full rounded-[24px] sm:rounded-[36px] border border-white/15 bg-gradient-to-b from-white/[0.06] via-[#0c0c10]/92 to-[#07070a]/95 backdrop-blur-2xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_40px_rgba(229,38,43,0.12)] min-h-[490px] sm:min-h-[560px] md:min-h-[600px] flex flex-col justify-end sm:justify-center transition-all duration-300"
      >
        {/* Flash of specular crystallization when formed */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0] }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none z-35"
        />

        {/* Subtle holographic border reflection on hover */}
        <div
          className="absolute inset-0 rounded-[24px] sm:rounded-[36px] pointer-events-none transition-opacity duration-300 z-30"
          style={{
            background: isHovered
              ? `radial-gradient(circle 500px at ${50 + mousePos.x * 60}% ${
                  50 + mousePos.y * 60
                }%, rgba(255,255,255,0.08) 0%, transparent 70%)`
              : 'none',
          }}
        />

        {/* ============================================================ */}
        {/* RIGHT-CENTER: RED X-SHAPED GEOMETRIC SHARDS + CUTOUT PHOTO   */}
        {/* ============================================================ */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Intense red ambient backlight centered on the subject */}
          <motion.div
            initial={{ opacity: 0.4, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, delay: 0.15 }}
            className="absolute right-[0%] sm:right-[10%] md:right-[14%] top-1/2 -translate-y-1/2 w-[280px] sm:w-[460px] h-[280px] sm:h-[460px] rounded-full bg-gradient-to-tr from-[var(--accent,#E5262B)]/40 via-rose-600/25 to-transparent blur-[80px] sm:blur-[90px] pointer-events-none"
            style={{
              transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`,
            }}
          />

          {/* -------------------------------------------------------- */}
          {/* LAYER 1: BACKGROUND GEOMETRIC RED X SHARDS (Behind Photo) */}
          {/* -------------------------------------------------------- */}
          <motion.svg
            initial={{ opacity: 0.3, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute right-0 top-0 w-full sm:w-[85%] md:w-[70%] h-full pointer-events-none z-10"
            viewBox="0 0 700 620"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="bgShardGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--accent, #E5262B)" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#800a0e" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#1a0103" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="bgShardGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--accent, #E5262B)" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#990d12" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#150102" stopOpacity="0.1" />
              </linearGradient>
              <filter id="shardGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Stroke 1 of the "X" (Top-Right down to Bottom-Left) */}
            <polygon
              points="490,0 690,0 350,620 170,620"
              fill="url(#bgShardGrad1)"
              filter="url(#shardGlow)"
              opacity="0.88"
              style={{
                transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)`,
              }}
            />
            {/* Fine specular glowing edge on Stroke 1 */}
            <line
              x1="490"
              y1="0"
              x2="170"
              y2="620"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="1.2"
              opacity="0.75"
            />

            {/* Stroke 2 of the "X" (Top-Left down to Bottom-Right) */}
            <polygon
              points="190,0 370,0 660,620 500,620"
              fill="url(#bgShardGrad2)"
              opacity="0.75"
              style={{
                transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -15}px)`,
              }}
            />
            {/* Fine specular glowing edge on Stroke 2 */}
            <line
              x1="370"
              y1="0"
              x2="660"
              y2="620"
              stroke="var(--accent, #E5262B)"
              strokeWidth="1.5"
              opacity="0.85"
            />

            {/* Faceted glass facets on the periphery */}
            <polygon
              points="570,70 690,130 630,310 530,230"
              fill="var(--accent, #E5262B)"
              opacity="0.35"
            />
            <polygon
              points="210,360 310,420 250,580 150,520"
              fill="#500508"
              opacity="0.4"
            />
          </motion.svg>

          {/* -------------------------------------------------------- */}
          {/* LAYER 2: RUHUL'S CUTOUT PHOTO (Animated Emergence)       */}
          {/* -------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0.3, y: 30, scale: 0.96 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-0 right-1 sm:right-[8%] md:right-[12%] lg:right-[14%] h-[68%] sm:h-[86%] md:h-[94%] w-[170px] sm:w-[350px] md:w-[430px] z-15 flex items-end justify-center pointer-events-none transition-transform duration-200 ease-out"
            style={{
              transform: `translate3d(${mousePos.x * 12}px, ${mousePos.y * 8}px, 0)`,
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src="/images/profile-cutout.png?v=3"
                alt="Ruhul Ameen"
                fill
                priority
                unoptimized
                sizes="(max-width: 640px) 170px, (max-width: 768px) 350px, 430px"
                className="object-contain object-bottom filter contrast-[1.05] brightness-[1.02] drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
              />
            </div>
          </motion.div>
        </div>

        {/* ============================================================ */}
        {/* OVERLAID LEFT CONTENT: ANIMATED NAME, ROLE LINE & BUTTONS   */}
        {/* ============================================================ */}
        <div className="relative z-30 px-5 sm:px-10 md:px-16 py-8 sm:py-14 md:py-16 max-w-[220px] sm:max-w-xl space-y-3.5 sm:space-y-6">
          {/* Animated Name */}
          <motion.div
            initial={{ opacity: 0.3, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-1 sm:space-y-2"
          >
            <h1 className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-black tracking-tight text-white leading-[0.95] select-none">
              RUHUL AMEEN
            </h1>
            {/* Animated Role line */}
            <p className="text-[10px] sm:text-sm font-mono uppercase tracking-widest text-neutral-400 font-medium">
              Video Editor &amp; Creative Developer
            </p>
          </motion.div>

          {/* Animated Two Buttons */}
          <motion.div
            initial={{ opacity: 0.3, y: 15 }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 pt-1"
          >
            <Link
              href="#work"
              onClick={playClickSound}
              onMouseEnter={playHoverSound}
              className="px-4 sm:px-8 py-2.5 sm:py-3.5 rounded-full bg-[var(--accent,#E5262B)] hover:bg-[var(--accent-hover,#ff3338)] text-white text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider transition-all hover:scale-105 shadow-xl shadow-[var(--accent,#E5262B)]/30 inline-flex items-center gap-1.5 sm:gap-2 whitespace-nowrap"
            >
              <span>View my work</span>
              <ArrowUpRight className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            </Link>

            <Link
              href="#contact"
              onClick={playClickSound}
              onMouseEnter={playHoverSound}
              className="px-4 sm:px-8 py-2.5 sm:py-3.5 rounded-full border border-white/20 bg-white/[0.04] hover:bg-white/10 text-white text-[10px] sm:text-xs font-mono font-medium hover:border-[var(--accent,#E5262B)] transition-all inline-flex items-center gap-1.5 sm:gap-2 whitespace-nowrap"
            >
              <span>Get in touch</span>
              <ArrowUpRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[var(--accent,#E5262B)]" />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
