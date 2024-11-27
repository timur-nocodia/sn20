"use client";

import { Button } from '@/ui/button';
import { Card } from '@/ui/card';
import { ScrollArea } from '@/ui/scroll-area';
import Image from 'next/image';

interface Step4ReviewProps {
  onBack: () => void;
  onNext: () => void;
  content: string;
  images: string[];
  hashtags: string[];
}

export default function Step4Review({
  onBack,
  onNext,
  content,
  images,
  hashtags
}: Step4ReviewProps) {
  return (
    <Card className="min-h-screen bg-background shadow-none border-none">
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
              <h2 className="text-lg font-semibold">Предпросмотр</h2>
              <p className="text-sm text-muted-foreground">
                Проверьте, как будет выглядеть ваш пост
              </p>
            </div>
          </div>
          <Button onClick={onNext}>
            Далее →
          </Button>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-[468px] mx-auto">
          <Card className="overflow-hidden">
            {/* Header */}
            <div className="p-4 flex items-center space-x-3 border-b">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-medium">S</span>
              </div>
              <span className="font-medium">Skillnetwork</span>
            </div>

            {/* Image Carousel */}
            {images && images.length > 0 && (
              <div className="relative aspect-square bg-gray-100">
                <Image
                  src={images[0]}
                  alt="Post image"
                  fill
                  className="object-cover"
                  unoptimized
                />
                {images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-1 z-10">
                    {images.map((_, index) => (
                      <div
                        key={index}
                        className={`w-1.5 h-1.5 rounded-full ${
                          index === 0
                            ? 'bg-primary'
                            : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Content */}
            <ScrollArea className="h-[200px] p-4">
              <div className="space-y-4">
                <p className="whitespace-pre-wrap">{content}</p>
                {hashtags.length > 0 && (
                  <p className="text-primary">
                    {hashtags.join(' ')}
                  </p>
                )}
              </div>
            </ScrollArea>
          </Card>
        </div>
      </div>
    </Card>
  );
}