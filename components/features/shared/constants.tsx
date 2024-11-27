import { Instagram, Facebook, Youtube, Type, Video, Mic, BookOpen } from 'lucide-react';

export const NetworkIcon = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
};

export const ContentTypeIcon = {
  text: Type,
  video: Video,
  audio: Mic,
  storyline: BookOpen,
};

export const NetworkColor = {
  instagram: 'bg-gradient-to-r from-purple-500 to-pink-500',
  facebook: 'bg-blue-600',
  youtube: 'bg-red-600',
};

export type NetworkType = keyof typeof NetworkIcon;
export type ContentType = keyof typeof ContentTypeIcon;
