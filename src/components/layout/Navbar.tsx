'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';
import { setSoundState, getSoundState, playClickSound, playHoverSound } from '@/lib/sound';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const [soundOn, setSoundOn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setSoundOn(getSoundState());
  }, []);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundState(next);
    if (next) playClickSound();
  };

  const navLinks = [
    { label: 'WORK.', href: '/work' },
    { label: 'SERVICES.', href: '/services' },
    { label: 'ABOUT.', href: '/about' },
    { label: 'BLOG.', href: '/blog' },
    { label: 'CONTACT.', href: '/contact' },
  ];

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-5xl transition-all duration-300">
      <nav className="relative flex items-center justify-between px-5 py-2.5 rounded-full border border-white/12 bg-[#0c0c0f]/85 backdrop-blur-2xl shadow-2xl shadow-black/80">
        {/* Brand Monogram */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-sm font-black tracking-tighter"
          onMouseEnter={playHoverSound}
          onClick={playClickSound}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent,#E5262B)] group-hover:scale-125 transition-transform shadow-md shadow-[var(--accent-glow)]" />
          <span className="tracking-tight text-white font-display text-base">RUHUL AMEEN</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-neutral-400 font-mono hidden sm:inline-block border border-white/5">
            LUCKNOW
          </span>
        </Link>

        {/* Center Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={playHoverSound}
                onClick={playClickSound}
                className={cn(
                  'text-xs font-mono font-medium tracking-wider transition-colors hover:text-[var(--accent,#E5262B)]',
                  isActive ? 'text-[var(--accent,#E5262B)] font-bold' : 'text-neutral-400'
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right Actions: Sound + Single Accent "Hire me" CTA */}
        <div className="flex items-center gap-3">
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            aria-label={soundOn ? 'Disable audio feedback' : 'Enable audio feedback'}
            className="p-1.5 rounded-full text-neutral-400 hover:text-white transition-colors"
            title={soundOn ? 'Sound: On' : 'Sound: Off'}
          >
            {soundOn ? (
              <Volume2 className="w-3.5 h-3.5 text-[var(--accent,#E5262B)]" />
            ) : (
              <VolumeX className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Accent "Hire me" Button */}
          <Link
            href="/contact"
            onMouseEnter={playHoverSound}
            onClick={playClickSound}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[var(--accent,#E5262B)] hover:brightness-110 text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md shadow-[var(--accent-glow)] hover:scale-105"
          >
            <span>Hire me</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-neutral-300 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Glass Drawer */}
      {mobileMenuOpen && (
        <div className="mt-2 p-5 rounded-3xl border border-white/12 bg-[#0c0c0f]/95 backdrop-blur-2xl flex flex-col gap-3 md:hidden shadow-2xl animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => {
                playClickSound();
                setMobileMenuOpen(false);
              }}
              className="text-sm font-mono tracking-wider text-neutral-300 hover:text-[var(--accent,#E5262B)] py-1.5"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="https://wa.me/919369389841?text=Hi%20Ruhul,%20I'd%20like%20to%20discuss%20a%20project!"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 text-center py-2.5 rounded-full bg-[var(--accent,#E5262B)] text-white font-mono font-bold text-xs uppercase tracking-wider shadow-lg"
          >
            Direct WhatsApp Chat
          </Link>
        </div>
      )}
    </header>
  );
}
