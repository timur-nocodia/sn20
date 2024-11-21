"use client";

import { VideoIcon, MonitorSmartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { VideoType } from './index';

interface Step0VideoTypeProps {
  onBack: () => void;
  onNext: () => void;
  videoType: VideoType;
  setVideoType: (type: VideoType) => void;
}

const videoTypes = [
  {
    id: 'short',
    title: 'Короткое видео',
    description: 'Вертикальное видео для Instagram Reels, YouTube Shorts, TikTok',
    icon: MonitorSmartphone,
    platforms: ['Instagram Reels', 'YouTube Shorts', 'TikTok']
  },
  {
    id: 'long',
    title: 'Длинное видео',
    description: 'Горизонтальное видео для YouTube, Facebook, VK',
    icon: VideoIcon,
    platforms: ['YouTube', 'Facebook', 'VK']
  }
];

export default function Step0VideoType({
  onBack,
  onNext,
  videoType,
  setVideoType
}: Step0VideoTypeProps) {
  const handleSelect = (type: VideoType) => {
    setVideoType(type);
    onNext();
  };

  return (
    <>
      <div className="p-6 border-b border-border/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost"
              onClick={onBack}
            >
              ← Назад
            </Button>
            <div>
              <h2 className="text-lg font-semibold">Выберите тип видео</h2>
              <p className="text-sm text-muted-foreground">
                Выберите формат видео для создания
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 gap-6">
          {videoTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = videoType === type.id;
            
            return (
              <Card
                key={type.id}
                className={`p-6 cursor-pointer shadow-none bg-white/95 hover:bg-white transition-all duration-200 no-border hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] hover:scale-[1.02] hover:translate-y-[-2px] ${
                  isSelected ? 'ring-2 ring-primary bg-primary/5' : ''
                }`}
                onClick={() => handleSelect(type.id as VideoType)}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 bg-[#FFF3ED] rounded-lg flex items-center justify-center">
                    <Icon className="h-8 w-8 text-[#FF6B00]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{type.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {type.description}
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {type.platforms.map((platform) => (
                        <span
                          key={platform}
                          className="text-xs bg-[#FFF3ED] text-[#FF6B00] px-2 py-1 rounded-full"
                        >
                          {platform}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
}