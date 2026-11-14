import Link from 'next/link';
import { ArrowUpRight, Mail, MapPin } from 'lucide-react';
import { CATEGORIES } from '@/content/projects';

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#08080a]/95 backdrop-blur-2xl text-neutral-400 py-16 px-4 sm:px-6 md:px-12 w-full max-w-full overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 min-w-0">
        {/* Bio & Location */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-2 text-xl font-black text-white tracking-tighter">
            <span className="w-3 h-3 rounded-full bg-[var(--accent,#E5262B)] shadow-md shadow-[var(--accent-glow)]" />
            <span className="font-display">RUHUL AMEEN.</span>
          </div>
          <p className="text-sm max-w-sm leading-relaxed text-neutral-300">
            Multi-disciplinary creative developer, video editor, and digital growth engineer based in Lucknow, India. Building high-retention video systems, 3D web applications, and AI automated engines.
          </p>
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 pt-2">
            <MapPin className="w-3.5 h-3.5 text-[var(--accent,#E5262B)]" />
            <span>Lucknow, Uttar Pradesh, India • Available Worldwide</span>
          </div>
        </div>

        {/* Categories */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold">
            Disciplines
          </h4>
          <ul className="space-y-2 text-sm">
            {CATEGORIES.map((cat) => (
              <li key={cat.key}>
                <Link
                  href={`/work/${cat.slug}`}
                  className="hover:text-[var(--accent,#E5262B)] transition-colors flex items-center justify-between group"
                >
                  <span className="text-neutral-300 group-hover:text-white">{cat.name}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--accent,#E5262B)]" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links & Direct Connect */}
        <div className="md:col-span-4 space-y-4 min-w-0">
          <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold">
            Initiate Collaboration
          </h4>
          <p className="text-sm text-neutral-300">
            Have a project or want to revamp your digital footprint? Let&apos;s engineer something memorable.
          </p>
          <div className="pt-1 flex flex-col sm:flex-row flex-wrap gap-2.5">
            <Link
              href="mailto:ruhulansari7786@gmail.com"
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-white/15 bg-white/5 hover:border-[var(--accent,#E5262B)] text-xs font-mono font-medium text-white transition-colors truncate max-w-full"
            >
              <Mail className="w-3.5 h-3.5 text-[var(--accent,#E5262B)] shrink-0" />
              <span className="truncate">ruhulansari7786@gmail.com</span>
            </Link>
            <Link
              href="https://wa.me/919369389841?text=Hi%20Ruhul,%20I%20saw%20your%20portfolio%20and%20would%20love%20to%20discuss%20a%20project!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[var(--accent,#E5262B)] text-white text-xs font-bold transition-opacity hover:opacity-90 shadow-md shadow-[var(--accent-glow)] truncate max-w-full"
            >
              <span className="truncate">WhatsApp (+91 9369389841)</span>
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
            </Link>
          </div>
          <div className="flex items-center gap-4 pt-4 text-xs font-mono text-neutral-400">
            <Link href="https://github.com/RuhulAmeenAnsari" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent,#E5262B)] transition-colors">
              GitHub ↗
            </Link>
            <Link href="https://linkedin.com/in/ruhul-ameen-eng936" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent,#E5262B)] transition-colors">
              LinkedIn ↗
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-4">
        <div>
          © 2025 Ruhul Ameen. Built with Next.js, Three.js &amp; Tailwind.
        </div>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:underline hover:text-white">Privacy Policy</Link>
          <Link href="/sitemap.xml" className="hover:underline hover:text-white">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
}
