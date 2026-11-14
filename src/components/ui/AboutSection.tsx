'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, ArrowUpRight, Award, GraduationCap, Briefcase } from 'lucide-react';
import { AboutPinnedPhoto } from './AboutPinnedPhoto';
import { playClickSound } from '@/lib/sound';

export function AboutSection() {
  const skillPills = [
    'Video Editing',
    '3D Thumbnails',
    'Next.js 15',
    'React 19',
    'TypeScript',
    'Tailwind CSS',
    'Technical SEO',
    'Python',
    'Blender 3D',
    'After Effects',
    'Photoshop',
    'CapCut Pro',
  ];

  return (
    <div className="space-y-12">
      <h2 className="text-4xl md:text-6xl font-display font-black text-white tracking-tight">
        ABOUT RUHUL.
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Glass Text Card with Skill Pills */}
        <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl border border-white/10 bg-neutral-950/80 backdrop-blur-xl shadow-2xl space-y-6">
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-white tracking-tight leading-snug">
              Bridging high-retention cinematic storytelling with modern software engineering.
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed font-normal">
              Based in <strong>Lucknow, India</strong>, I help creators, medical clinics, and growing brands capture audience attention and convert traffic into loyal clients. My workflow combines high-velocity video editing (CapCut, Premiere, After Effects), high-CTR visual packaging (Blender, Photoshop), and performant web architecture (Next.js, TypeScript, Tailwind).
            </p>
          </div>

          {/* Key Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
              <div className="text-lg font-black text-[var(--accent,#E5262B)] font-mono">50+</div>
              <div className="text-xs font-bold text-white">Videos Produced</div>
              <p className="text-[11px] text-neutral-400">Reels, shorts &amp; brand films</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
              <div className="text-lg font-black text-amber-400 font-mono">14.8%</div>
              <div className="text-xs font-bold text-white">Peak YouTube CTR</div>
              <p className="text-[11px] text-neutral-400">Visual psychology design</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
              <div className="text-lg font-black text-cyan-400 font-mono">10+</div>
              <div className="text-xs font-bold text-white">Next.js Web Apps</div>
              <p className="text-[11px] text-neutral-400">Live client deployments</p>
            </div>
          </div>

          {/* Skill Pills */}
          <div className="space-y-2.5 pt-2">
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">
              Primary Skillset
            </div>
            <div className="flex flex-wrap gap-2">
              {skillPills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-neutral-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Verified Contact Badges */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[var(--accent,#E5262B)]" />
              <span>Lucknow, Uttar Pradesh, India</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[var(--accent,#E5262B)]" />
              <Link href="tel:+919369389841" className="hover:text-white transition-colors">
                +91 9369389841
              </Link>
            </div>
            <div className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[var(--accent,#E5262B)]" />
              <Link href="mailto:ruhulansari7786@gmail.com" className="hover:text-white transition-colors">
                ruhulansari7786@gmail.com
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Pinned Hanging Print with Gentle Swing & Hover Tilt */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <AboutPinnedPhoto />
        </div>
      </div>
    </div>
  );
}
