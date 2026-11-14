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
    <header className="fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-5xl transition-all duration-300">
      <nav className="relative flex items-center justify-between px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full border border-white/12 bg-[#0c0c0f]/85 backdrop-blur-2xl shadow-2xl shadow-black/80">
        {/* Brand Monogram */}
        <Link
          href="/"
          className="group flex items-center gap-2 sm:gap-2.5 text-xs sm:text-sm font-black tracking-tighter"
          onMouseEnter={playHoverSound}
          onClick={playClickSound}
        >
          <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[var(--accent,#E5262B)] group-hover:scale-125 transition-transform shadow-md shadow-[var(--accent-glow)] shrink-0" />
          <span className="tracking-tight text-white font-display text-xs sm:text-base">RUHUL AMEEN</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-neutral-400 font-mono hidden md:inline-block border border-white/5">
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

        {/* Right Actions: Sound (desktop) + Single Accent "Hire me" CTA + Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sound Toggle (desktop) */}
          <button
            onClick={toggleSound}
            aria-label={soundOn ? 'Disable audio feedback' : 'Enable audio feedback'}
            className="hidden sm:flex p-1.5 rounded-full text-neutral-400 hover:text-white transition-colors"
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
            className="inline-flex items-center gap-1 px-3 sm:px-4 py-1.5 rounded-full bg-[var(--accent,#E5262B)] hover:brightness-110 text-white text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md shadow-[var(--accent-glow)] shrink-0"
          >
            <span>Hire me</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-neutral-300 hover:text-white shrink-0"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
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
