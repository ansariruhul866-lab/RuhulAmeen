import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 space-y-6">
      <div className="text-8xl md:text-9xl font-black text-[var(--accent,#E5262B)] tracking-tighter">
        404
      </div>
      <h1 className="text-2xl md:text-4xl font-bold text-neutral-900 dark:text-white">
        Coordinates Lost in Space
      </h1>
      <p className="text-sm text-neutral-500 max-w-md">
        The portfolio page or case study you are looking for has been moved or does not exist.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--accent,#E5262B)] text-white text-xs font-bold uppercase tracking-wider hover:bg-[var(--accent-hover,#ff3338)] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Mission Control</span>
      </Link>
    </div>
  );
}
