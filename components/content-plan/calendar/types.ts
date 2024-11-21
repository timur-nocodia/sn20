export interface ContentItem {
  id: string;
  date: Date;
  time: string;
  type: 'text' | 'video' | 'audio';
  network: 'instagram' | 'facebook' | 'youtube';
  status: 'planned' | 'created';
  title: string;
}

export interface Story {
  id: string;
  date: Date;
  network: 'instagram' | 'facebook';
  status: 'planned' | 'created';
}

export interface NetworkConfig {
  color: string;
  gradient: string;
}