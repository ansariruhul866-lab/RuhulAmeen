'use client';

import { useState } from 'react';
import { Project } from '@/types';
import { WorkCard } from './WorkCard';
import { VideoModal } from './VideoModal';

interface VideoProjectsGridProps {
  projects: Project[];
}

export function VideoProjectsGrid({ projects }: VideoProjectsGridProps) {
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string } | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((p) => (
          <WorkCard
            key={p.id}
            project={p}
            onOpenVideo={(url, title) => setActiveVideo({ url, title })}
          />
        ))}
      </div>

      {activeVideo && (
        <VideoModal
          url={activeVideo.url}
          title={activeVideo.title}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </>
  );
}
