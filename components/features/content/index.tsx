"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Type, Video, Mic, BookOpen, X } from 'lucide-react';
import { Button } from '@/components/ui-components/button';
import { Card } from '@/components/ui-components/card';
import TextPost from '@/components/features/content/text-post/TextPost';
import VideoPost from '@/components/features/content/video-post';
import AudioPost from '@/components/features/content/audio-post';
import StorylinePost from '@/components/features/content/storyline-post';

type PostType = 'text' | 'video' | 'audio' | 'storyline' | null;

interface CreatePostProps {
  initialDate?: Date;
  initialTime?: string;
  initialType?: PostType;
  onClose?: () => void;
}

const postTypes = [
  {
    type: 'text' as const,
    icon: Type,
    title: 'Текстовый пост',
    description: 'Создайте пост с текстом'
  },
  {
    type: 'video' as const,
    icon: Video,
    title: 'Видео пост',
    description: 'Создайте пост с коротким видео, reels, shorts'
  },
  {
    type: 'audio' as const,
    icon: Mic,
    title: 'Аудио пост',
    description: 'Создайте аудио пост или подкаст'
  },
  {
    type: 'storyline' as const,
    icon: BookOpen,
    title: 'Сторилайн',
    description: 'Создайте связку историй'
  }
];

export default function CreatePost({ 
  initialDate,
  initialTime,
  initialType,
  onClose
}: CreatePostProps) {
  const [selectedType, setSelectedType] = useState<PostType>(initialType || null);
  const router = useRouter();

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  };

  const renderContent = () => {
    switch (selectedType) {
      case 'text':
        return (
          <TextPost 
            onBack={() => setSelectedType(null)} 
            initialDate={initialDate}
            initialTime={initialTime}
          />
        );
      case 'video':
        return (
          <VideoPost 
            onBack={() => setSelectedType(null)}
            initialDate={initialDate}
            initialTime={initialTime}
          />
        );
      case 'audio':
        return (
          <AudioPost 
            onBack={() => setSelectedType(null)}
            initialDate={initialDate}
            initialTime={initialTime}
          />
        );
      case 'storyline':
        return (
          <StorylinePost
            onBack={() => setSelectedType(null)}
            initialDate={initialDate}
            initialTime={initialTime}
          />
        );
      default:
        return (
          <div className="p-6 space-y-6">
            <div>
              <h1 className="text-2xl font-semibold">Создать пост</h1>
              <p className="text-sm text-muted-foreground">
                Выберите тип поста для создания
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {postTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <Card 
                    key={type.type}
                    className="p-6 cursor-pointer shadow-none bg-white/95 hover:bg-white transition-all duration-200 no-border hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] hover:scale-[1.02] hover:translate-y-[-2px]"
                    onClick={() => setSelectedType(type.type)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-[#FFF3ED] rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="h-5 w-5 text-[#FF6B00]" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{type.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {type.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        );
    }
  };

  return (
    <Card className="min-h-screen bg-background shadow-none border-none">
      <div className="p-6 border-b border-border/40">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Создать пост</h2>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {renderContent()}
    </Card>
  );
}