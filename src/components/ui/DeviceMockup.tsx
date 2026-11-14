import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, Globe } from 'lucide-react';

interface DeviceMockupProps {
  url: string;
  title: string;
  image: string;
  type?: 'laptop' | 'mobile';
}

export function DeviceMockup({ url, title, image }: DeviceMockupProps) {
  return (
    <div className="relative rounded-2xl border border-black/10 dark:border-white/10 bg-neutral-900 shadow-2xl overflow-hidden p-2 md:p-3">
      {/* Top Browser Bar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 mb-2">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/5 border border-white/5 text-[11px] font-mono text-neutral-400 max-w-[200px] truncate">
          <Globe className="w-3 h-3 text-neutral-500 shrink-0" />
          <span className="truncate">{url.replace('https://', '')}</span>
        </div>
        <Link
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[11px] font-mono text-[var(--accent,#E5262B)] hover:underline"
        >
          <span>Visit</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>

      {/* Screen Frame - dynamically scaled to full website screenshot (1024x470) */}
      <div
        className="relative aspect-[1024/470] w-full rounded-lg overflow-hidden bg-black"
        style={{ aspectRatio: '1024 / 470' }}
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 1200px"
          className="object-contain w-full h-full"
        />
      </div>
    </div>
  );
}
