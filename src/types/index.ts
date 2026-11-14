export interface Project {
  id: string;
  category: 'video' | 'thumbnail' | 'web' | 'seo' | 'ai';
  title: string;
  thumbnail: string; // Drive link or URL
  videoUrl?: string; // Drive link or YouTube / external
  link?: string;     // Live URL
  problem: string;
  action: string;
  result: string;
  tools: string[];
  featured: boolean;
  slug: string;
  client?: string;
  year?: string;
  stats?: { label: string; value: string }[];
  anatomy?: {
    hook: string;
    edit: string;
    thumbnail: string;
    result: string;
  };
}

export type CategoryKey = 'video' | 'thumbnail' | 'web' | 'seo' | 'ai';

export interface CategoryInfo {
  key: CategoryKey;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  statsTeaser: string;
  iconName: string;
  color: string;
}
