import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Terminal, Award, GraduationCap, Briefcase, Phone, Mail, ArrowUpRight, Video, Code, Sparkles } from 'lucide-react';
import { TOOLS_LIST } from '@/content/projects';

export const metadata: Metadata = {
  title: 'About Ruhul Ameen — Social Media Manager, Video Editor & Frontend Developer',
  description: 'The background, experience, and production capabilities of Ruhul Ameen, a performance-driven video editor, social media manager, and frontend developer based in Lucknow, India.',
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 space-y-20">
      {/* Intro Hero */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-[var(--accent,#E5262B)]/10 text-[var(--accent,#E5262B)] border border-[var(--accent,#E5262B)]/20">
            About Ruhul Ameen
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Social Media Manager, Video Editor &amp; Frontend Developer.
          </h1>
          <p className="text-base text-neutral-300 leading-relaxed">
            Creative and performance-driven professional based in <strong>Lucknow, India</strong>. Experienced in engineering captivating short-form content, high-retention video storytelling, conversion-focused social media campaigns, and responsive web applications with Next.js &amp; React.
          </p>
          
          {/* Location & Quick Contact Badges */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400 pt-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[var(--accent,#E5262B)]" />
              <span>Lucknow, Uttar Pradesh, India</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[var(--accent,#E5262B)]" />
              <Link href="tel:+919369389841" className="hover:text-[var(--accent,#E5262B)] transition-colors">
                +91 9369389841
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[var(--accent,#E5262B)]" />
              <Link href="mailto:ruhulansari7786@gmail.com" className="hover:text-[var(--accent,#E5262B)] transition-colors">
                ruhulansari7786@gmail.com
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3 pt-2">
            <Link
              href="https://linkedin.com/in/ruhul-ameen-eng936"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 hover:border-[var(--accent,#E5262B)] text-xs font-mono text-neutral-300 hover:text-white transition-all"
            >
              <svg className="w-3.5 h-3.5 fill-[#0077b5]" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.4 1.4 0 0 0 0-2.8 1.4 1.4 0 0 0 0 2.8m1.39 9.74v-8.37H5.07v8.37h2.78z" />
              </svg>
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3 h-3 text-neutral-500" />
            </Link>
            <Link
              href="https://github.com/RuhulAmeenAnsari"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 hover:border-[var(--accent,#E5262B)] text-xs font-mono text-neutral-300 hover:text-white transition-all"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3 text-neutral-500" />
            </Link>
            <Link
              href="https://wa.me/919369389841?text=Hi%20Ruhul,%20I%20saw%20your%20portfolio%20and%20would%20love%20to%20discuss%20a%20project!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[var(--accent,#E5262B)] hover:bg-[var(--accent-hover,#ff3338)] text-xs font-mono font-bold text-white transition-all shadow-md"
            >
              <span>Direct WhatsApp</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Profile Card with Ruhul's Official Photo */}
        <div className="md:col-span-5 relative flex justify-center">
          <div
            className="relative w-full max-w-[400px] aspect-[3/4] rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-neutral-900 group"
          >
            <Image
              src="/images/profile.jpg"
              alt="Ruhul Ameen"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              style={{ objectFit: 'cover' }}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <div className="font-black text-xl tracking-tight">Ruhul Ameen</div>
              <div className="text-xs font-mono text-[var(--accent,#E5262B)]">
                Video Editor • Social Media Manager • Developer
              </div>
              <div className="text-[11px] font-mono text-neutral-400">
                B.Tech Computer Science &amp; Engineering (2025)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Verified Experience & Education Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/10 pt-12">
        {/* Work Experience */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-sm font-bold text-white uppercase font-mono tracking-wider">
            <Briefcase className="w-4 h-4 text-[var(--accent,#E5262B)]" />
            <span>Professional Experience</span>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-white">
                  Video Editor
                </h3>
                <span className="text-[11px] font-mono text-[var(--accent,#E5262B)] font-bold">May 2026 – Present</span>
              </div>
              <div className="text-xs font-mono text-neutral-500">Expansio Digital Marketing</div>
              <ul className="text-xs text-neutral-300 space-y-1.5 list-disc pl-4 pt-2 leading-relaxed">
                <li>Edited professional video content for healthcare practices, doctors, music companies, and commercial animation projects.</li>
                <li>Engineered high-retention short-form videos optimized for Instagram Reels, TikTok, and YouTube Shorts.</li>
                <li>Applied storytelling hooks, kinetic motion effects, sound design, and retention-maximizing editing techniques.</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-white">
                  Freelance Social Media Manager &amp; Content Creator
                </h3>
                <span className="text-[11px] font-mono text-neutral-400 font-bold">Dec 2025 – Present</span>
              </div>
              <div className="text-xs font-mono text-neutral-500">Independent Creator &amp; Brand Consultant</div>
              <ul className="text-xs text-neutral-300 space-y-1.5 list-disc pl-4 pt-2 leading-relaxed">
                <li>Managed end-to-end social media channels for real estate brands, healthcare clinics, and digital businesses.</li>
                <li>Authored hooks, promotional reels, branding creatives, and conversion-focused captions.</li>
                <li>Expanded audience reach and follower engagement through rigorous trend research and content psychology.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Education & Core Capabilities */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-sm font-bold text-white uppercase font-mono tracking-wider">
            <GraduationCap className="w-4 h-4 text-[var(--accent,#E5262B)]" />
            <span>Education &amp; Credentials</span>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-white">
                B.Tech in Computer Science &amp; Engineering
              </h3>
              <span className="text-[11px] font-mono text-emerald-400 font-bold">Graduation 2025</span>
            </div>
            <div className="text-xs font-mono text-neutral-500">
              Maharishi University of Information Technology, Lucknow
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed pt-1">
              Solid engineering foundation covering algorithms, data structures, responsive web architectures, database design, and software systems.
            </p>
          </div>

          {/* Languages & Impact Stats */}
          <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] space-y-4">
            <div className="text-xs font-mono uppercase text-neutral-400 font-bold">
              Languages &amp; Production Proof
            </div>
            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="text-[var(--accent,#E5262B)] font-black text-lg">50+</div>
                <div className="text-neutral-400">Produced Reels &amp; YouTube Videos</div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="text-[var(--accent,#E5262B)] font-black text-lg">English &amp; Hindi</div>
                <div className="text-neutral-400">Bilingual Fluent Creation</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Skills Breakdown (From CV) */}
      <div className="space-y-6 border-t border-white/10 pt-12">
        <h3 className="text-sm font-mono uppercase tracking-wider text-neutral-400 font-bold">
          Core Skills &amp; Domain Expertise
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 rounded-2xl border border-white/10 bg-neutral-900/60 space-y-3">
            <div className="flex items-center gap-2 text-[var(--accent,#E5262B)] font-bold text-sm">
              <Video className="w-4 h-4" />
              <span>Video Editing</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              CapCut, Premiere Pro, After Effects, Reels, Shorts, Motion Effects, Storytelling, Dynamic Transitions.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-neutral-900/60 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Sparkles className="w-4 h-4" />
              <span>Social Media</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Instagram, TikTok, Facebook, YouTube, Branding Creatives, Trend Research, Content Strategy.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-neutral-900/60 space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
              <Code className="w-4 h-4" />
              <span>Frontend Engineering</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              HTML5, CSS3, JavaScript, React.js, Next.js, Responsive Design, Tailwind CSS, Git.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-neutral-900/60 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <Terminal className="w-4 h-4" />
              <span>AI &amp; Creative Tools</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              ChatGPT, Canva, Prompt Writing, Midjourney, AI Content Generation, Automated Pipelines.
            </p>
          </div>
        </div>
      </div>

      {/* Production Tech Marquee */}
      <div className="space-y-4 border-t border-white/10 pt-12">
        <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-bold">
          Mastered Tools &amp; Frameworks
        </h3>
        <div className="flex flex-wrap gap-2.5">
          {TOOLS_LIST.map((tool) => (
            <span
              key={tool}
              className="px-4 py-2 rounded-xl border border-white/10 bg-neutral-900 text-xs font-mono font-medium text-neutral-200"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-8 md:p-12 rounded-3xl bg-neutral-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10 shadow-2xl">
        <div className="space-y-1">
          <h3 className="text-2xl font-bold">Ready to engineer high-retention content?</h3>
          <p className="text-sm text-neutral-400">
            Available for brand retainers, video editing, social media management, and custom web builds.
          </p>
        </div>
        <Link
          href="https://wa.me/919369389841?text=Hi%20Ruhul,%20I'd%20like%20to%20discuss%20a%20project!"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-full bg-[var(--accent,#E5262B)] text-white font-bold text-sm uppercase tracking-wider hover:bg-[var(--accent-hover,#ff3338)] transition-colors whitespace-nowrap shadow-lg flex items-center gap-2"
        >
          <span>Chat on WhatsApp</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
