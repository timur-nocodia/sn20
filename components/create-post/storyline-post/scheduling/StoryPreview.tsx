"use client";

import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import Image from 'next/image';
import type { Story } from '../types';

interface StoryPreviewProps {
  story: Story;
  onClose: () => void;
}

export default function StoryPreview({
  story,
  onClose
}: StoryPreviewProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] max-h-[90vh] p-0">
        <div className="relative h-[90vh] bg-black">
          {/* Background */}
          {story.background ? (
            <div className="relative w-full h-full">
              <Image
                src={story.background}
                alt="Story preview"
                fill
                className="object-contain"
                unoptimized
                priority
              />
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-white/50">
              Preview not available
            </div>
          )}

          {/* Content */}
          {story.content && (
            <div className="absolute inset-x-8 text-white text-center" style={{
              top: story.style?.position === 'top' ? '2rem' :
                   story.style?.position === 'bottom' ? 'auto' : '50%',
              bottom: story.style?.position === 'bottom' ? '2rem' : 'auto',
              transform: story.style?.position === 'center' ? 'translateY(-50%)' : 'none'
            }}>
              <p className={`text-2xl ${
                story.style?.font === 'modern' ? 'font-sans' :
                story.style?.font === 'classic' ? 'font-serif' :
                story.style?.font === 'handwritten' ? 'font-cursive' : 'font-mono'
              } ${
                story.style?.effects?.includes('shadow') ? 'drop-shadow-lg' : ''
              }`}>
                {story.content}
              </p>
            </div>
          )}

          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}