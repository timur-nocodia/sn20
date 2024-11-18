export type PostType = 'text' | 'video' | 'audio' | 'storyline';

export type NetworkType = 'instagram' | 'facebook' | 'youtube' | 'twitter';

export type PostStatus = 'draft' | 'scheduled' | 'published';

export interface PostNetwork {
  network: NetworkType;
  status: PostStatus;
}

export interface PostStats {
  likes?: number;
  comments?: number;
  shares?: number;
  views?: number;
  plays?: number;
}

export interface PostSchedule {
  date?: Date;
  time: string;
  networks?: NetworkType[];
}

export interface BasePost {
  id: string;
  title: string;
  type: PostType;
  networks: PostNetwork[];
  date: Date;
  stats: PostStats;
  schedule?: PostSchedule;
}

export interface MediaItem {
  id: string;
  type: 'image' | 'video' | 'text';
  title: string;
  url: string;
  thumbnail?: string;
  date: Date;
  size: string;
  source: 'uploaded' | 'generated';
}

export interface NetworkConfig {
  id: NetworkType;
  name: string;
  color: string;
  gradient: string;
  enabled: boolean;
  schedule: PostSchedule;
  bestHours: number[];
}
