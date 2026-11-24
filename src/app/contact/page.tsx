'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, MessageSquare, Send, CheckCircle2, MapPin, ArrowUpRight } from 'lucide-react';
import { playClickSound } from '@/lib/sound';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playClickSound();
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 space-y-16">
      {/* Header */}
      <div className="space-y-6 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-[var(--accent,#E5262B)]/10 text-[var(--accent,#E5262B)] border border-[var(--accent,#E5262B)]/20">
          Initiate Collaboration
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white">
          Let&apos;s Build Something Memorable.
        </h1>
        <p className="text-lg text-neutral-300 leading-relaxed">
          Whether you need a full video retention overhaul, high-converting 3D thumbnails, a bespoke Next.js web application, or an automated AI workflow, I am currently accepting select projects.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        {/* Left Column: Direct Fast Channels */}
        <div className="md:col-span-5 space-y-8">
          {/* WhatsApp Direct Hero Card */}
          <div className="p-8 rounded-3xl border border-[var(--accent,#E5262B)]/30 bg-[var(--accent,#E5262B)]/5 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-[var(--accent,#E5262B)]">
              <MessageSquare className="w-4 h-4" />
              <span>Fastest Response (Under 2h)</span>
            </div>
            <h3 className="text-2xl font-bold text-white">
              Instant WhatsApp Chat
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Skip email back-and-forth. Send me a quick voice note or text with your timeline and goals.
            </p>
            <Link
              href="https://wa.me/919369389841?text=Hi%20Ruhul,%20I'd%20like%20to%20discuss%20a%20project!"
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClickSound}
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-full bg-[var(--accent,#E5262B)] text-white text-xs font-bold uppercase tracking-wider hover:bg-[var(--accent-hover,#ff3338)] transition-colors"
            >
              <span>Chat on WhatsApp (+91 9369389841)</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-4 text-sm text-neutral-300">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <Mail className="w-4 h-4 text-[var(--accent,#E5262B)]" />
              </div>
              <div>
                <div className="text-xs font-mono uppercase text-neutral-400">Direct Email</div>
                <Link href="mailto:ruhulansari7786@gmail.com" className="font-semibold text-white hover:text-[var(--accent,#E5262B)]">
                  ruhulansari7786@gmail.com
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <MapPin className="w-4 h-4 text-[var(--accent,#E5262B)]" />
              </div>
              <div>
                <div className="text-xs font-mono uppercase text-neutral-400">Location</div>
                <div className="font-semibold text-white">
                  Lucknow, Uttar Pradesh, India
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 3-Field Frictionless Form */}
        <div className="md:col-span-7 p-8 md:p-10 rounded-3xl border border-white/10 bg-neutral-950/80 shadow-xl">
          {submitted ? (
            <div className="text-center py-12 space-y-4 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white">
                Message Dispatched!
              </h3>
              <p className="text-sm text-neutral-500 max-w-sm mx-auto">
                Thank you for reaching out. Ruhul will review your project requirements and reply within 12 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-2xl font-bold text-white">
                Quick Project Brief
              </h3>
              <p className="text-xs text-neutral-500">
                3 simple fields. No spam or marketing newsletters ever.
              </p>

              {/* Field 1: Name */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-300 font-semibold">
                  1. Your Name / Company
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Rivera or Horizon Media"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.04] text-white text-sm focus:outline-none focus:border-[var(--accent,#E5262B)] transition-colors"
                />
              </div>

              {/* Field 2: Email */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-300 font-semibold">
                  2. Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.04] text-white text-sm focus:outline-none focus:border-[var(--accent,#E5262B)] transition-colors"
                />
              </div>

              {/* Field 3: Message / Scope */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-300 font-semibold">
                  3. Project Scope & Timeline
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Briefly describe what you are looking to achieve: YouTube channel revamp, web app build, or AI automation..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.04] text-white text-sm focus:outline-none focus:border-[var(--accent,#E5262B)] transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-[var(--accent,#E5262B)] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[var(--accent-hover,#ff3338)] transition-all hover:shadow-lg"
              >
                <span>Send Project Inquiry</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
