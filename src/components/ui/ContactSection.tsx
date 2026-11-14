'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Send, CheckCircle2, MessageSquare, Mail, ArrowUpRight, Copy, Check, ExternalLink } from 'lucide-react';
import { playClickSound } from '@/lib/sound';
import confetti from 'canvas-confetti';

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const emailAddress = 'ruhulansari7786@gmail.com';

  const handleCopyEmail = () => {
    playClickSound();
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playClickSound();
    setLoading(true);

    const subject = encodeURIComponent(`[Portfolio Inquiry] ${form.name}`);
    const body = encodeURIComponent(
      `Hi Ruhul,\n\nName: ${form.name}\nEmail: ${form.email}\n\nProject Brief & Requirements:\n${form.message}\n\n---\nSent via ruhulameen.dev portfolio`
    );
    const mailtoUrl = `mailto:${emailAddress}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#E5262B', '#ffffff', '#ff6b6b'],
        });
      } catch {
        // Confetti fallback
      }

      // Automatically launch user's default email client pre-filled
      window.location.href = mailtoUrl;
    }, 600);
  };

  return (
    <div className="space-y-12">
      <h2 className="text-4xl md:text-6xl font-display font-black text-white tracking-tight">
        CONTACT.
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Fast Channels */}
        <div className="lg:col-span-5 space-y-4">
          {/* WhatsApp Direct Card */}
          <div className="p-6 sm:p-8 rounded-3xl border border-[var(--accent,#E5262B)]/30 bg-[var(--accent,#E5262B)]/5 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-[var(--accent,#E5262B)]">
              <MessageSquare className="w-4 h-4" />
              <span>Fastest Response (Under 2h)</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Instant WhatsApp
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Skip email latency. Send a brief voice note or text with your timeline and goals.
            </p>
            <Link
              href="https://wa.me/919369389841?text=Hi%20Ruhul,%20I%20saw%20your%20portfolio%20and%20would%20love%20to%20discuss%20a%20project!"
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClickSound}
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-full bg-[var(--accent,#E5262B)] hover:bg-[var(--accent-hover,#ff3338)] text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-lg shadow-[var(--accent,#E5262B)]/25"
            >
              <span>Chat on WhatsApp (+91 9369389841)</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Direct Email Card with 1-Click Copy */}
          <div className="p-6 rounded-3xl border border-white/10 bg-neutral-950/70 space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[var(--accent,#E5262B)]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase text-neutral-400">Direct Email</div>
                  <Link
                    href={`mailto:${emailAddress}`}
                    className="text-xs font-semibold text-white hover:text-[var(--accent,#E5262B)] transition-colors"
                  >
                    {emailAddress}
                  </Link>
                </div>
              </div>
              <button
                onClick={handleCopyEmail}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
                title="Copy email to clipboard"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#0077b5]/15 border border-[#0077b5]/30 flex items-center justify-center text-[#0077b5]">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.4 1.4 0 0 0 0-2.8 1.4 1.4 0 0 0 0 2.8m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase text-neutral-400">Professional Network</div>
                  <Link
                    href="https://linkedin.com/in/ruhul-ameen-eng936"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-white hover:text-[var(--accent,#E5262B)] transition-colors"
                  >
                    LinkedIn / ruhul-ameen-eng936
                  </Link>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-neutral-500" />
            </div>
          </div>
        </div>

        {/* Right Column: Direct Email Project Dispatch Form */}
        <div className="lg:col-span-7 p-6 sm:p-10 rounded-3xl border border-white/10 bg-neutral-950/80 backdrop-blur-xl shadow-2xl">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Email Dispatch Triggered.
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 max-w-sm mx-auto leading-relaxed">
                Your pre-filled brief is opening in your email app. If it didn&apos;t open automatically, click below to send directly:
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
                <a
                  href={`mailto:${emailAddress}?subject=${encodeURIComponent(`[Project Inquiry] ${form.name}`)}&body=${encodeURIComponent(form.message)}`}
                  className="px-6 py-2.5 rounded-full bg-[var(--accent,#E5262B)] text-white text-xs font-mono font-bold uppercase tracking-wider inline-flex items-center gap-2"
                >
                  <span>Open in Mail App</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="px-6 py-2.5 rounded-full border border-white/20 bg-white/5 text-white text-xs font-mono font-medium hover:bg-white/10 inline-flex items-center gap-2"
                >
                  <span>{copied ? 'Email Copied!' : 'Copy Email Address'}</span>
                </button>
              </div>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs font-mono text-neutral-400 hover:text-white pt-4 inline-block"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-[var(--accent,#E5262B)] focus:ring-1 focus:ring-[var(--accent,#E5262B)] transition-all text-sm font-sans"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-[var(--accent,#E5262B)] focus:ring-1 focus:ring-[var(--accent,#E5262B)] transition-all text-sm font-sans"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                  Project Brief &amp; Goals *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell me about your video editing, thumbnail packaging, website build, or timeline..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-[var(--accent,#E5262B)] focus:ring-1 focus:ring-[var(--accent,#E5262B)] transition-all text-sm font-sans resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-full bg-[var(--accent,#E5262B)] hover:bg-[var(--accent-hover,#ff3338)] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xl shadow-[var(--accent,#E5262B)]/25 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
              >
                {loading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Dispatch Project Brief Directly to Email</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
