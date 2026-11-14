'use client';

import React, { useState } from 'react';
import { Project } from '@/types';
import { VideoMasonryGallery } from './VideoMasonryGallery';
import { VideoModal } from './VideoModal';

interface VideoProjectsGridProps {
  projects: Project[];
}

export function VideoProjectsGrid({ projects }: VideoProjectsGridProps) {
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string } | null>(null);

  return (
    <>
      <VideoMasonryGallery
        projects={projects}
        onOpenVideo={(url, title) => setActiveVideo({ url, title })}
      />

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
