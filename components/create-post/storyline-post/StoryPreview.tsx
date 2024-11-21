"use client";

import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from '@/lib/utils';
import Image from 'next/image';
import type { Story } from './types';

interface StoryPreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stories: Story[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
}

export default function StoryPreview({
  open,
  onOpenChange,
  stories,
  currentIndex,
  onIndexChange
}: StoryPreviewProps) {
  const handlePrev = () => {
    onIndexChange((currentIndex - 1 + stories.length) % stories.length);
  };

  const handleNext = () => {
    onIndexChange((currentIndex + 1) % stories.length);
  };

  const currentStory = stories[currentIndex];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] max-h-[90vh] p-0">
        <div className="relative h-[90vh] bg-black">
          {/* Background */}
          {currentStory?.background && (
            <div className="relative w-full h-full">
              <Image
                src={currentStory.background}
                alt="Story background"
                fill
                className="object-contain"
                unoptimized
                priority
              />
            </div>
          )}

          {/* Content */}
          {currentStory?.content && (
            <div className={cn(
              "absolute inset-x-8 text-white text-center",
              currentStory.style?.position === 'top' && "top-8",
              currentStory.style?.position === 'center' && "top-1/2 -translate-y-1/2",
              currentStory.style?.position === 'bottom' && "bottom-8"
            )}>
              <p className={cn(
                "text-2xl",
                currentStory.style?.font === 'modern' && "font-sans",
                currentStory.style?.font === 'classic' && "font-serif",
                currentStory.style?.font === 'handwritten' && "font-cursive",
                currentStory.style?.font === 'minimal' && "font-mono",
                currentStory.style?.effects?.includes('shadow') && "drop-shadow-lg"
              )}>
                {currentStory.content}
              </p>
            </div>
          )}

          {/* Navigation */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white shadow-sm"
            onClick={handlePrev}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white shadow-sm"
            onClick={handleNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
          </Button>

          {/* Progress indicators */}
          <div className="absolute top-4 left-4 right-4">
            <div className="flex space-x-1">
              {stories.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex-1 h-1 rounded-full transition-all duration-200",
                    index === currentIndex ? "bg-white" : "bg-white/50"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}