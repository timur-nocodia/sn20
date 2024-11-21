"use client";

import { Video, Mic, ImageIcon, FileText } from 'lucide-react';

export interface Tool {
  icon: React.ElementType;
  label: string;
  href: string;
  comingSoon?: boolean;
}

export interface Category {
  name: string;
  tools?: Tool[];
  href?: string;
}

export const aiToolCategories: Category[] = [
  {
    name: 'Ai аватары',
    tools: [
      { icon: Video, label: 'Видео аватары', href: '/ai-tools/avatar-video', comingSoon: false },
      { icon: Video, label: 'Фото аватары', href: '/ai-tools/avatar-photo', comingSoon: false },
      { icon: Mic, label: 'Клонирование голоса', href: '/ai-tools/voice-clone', comingSoon: false }
    ]
  },
  {
    name: 'Генерация текста',
    href: '/ai-tools/text'
  },
  {
    name: 'Работа с изображениями',
    href: '/ai-tools/image'
  },
  {
    name: 'Работа с видео',
    href: '/ai-tools/video'
  },
  {
    name: 'Работа с аудио',
    href: '/ai-tools/audio'
  }
];
